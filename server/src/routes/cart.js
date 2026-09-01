const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

// All cart routes require auth
router.use(authMiddleware);

// GET /api/cart
router.get('/', (req, res) => {
  try {
    const rawItems = db.findAll('cart', { user_id: req.user.id });
    
    // Enrich cart items with product details
    const items = rawItems.map(item => {
      const product = db.findById('products', item.product_id);
      return {
        id: item.id,
        user_id: item.user_id,
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
        product: product || null
      };
    }).filter(item => item.product !== null); // Filter out deleted products

    // Calculate Summary
    const totalMRP = items.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const totalDiscount = totalMRP - subtotal;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return res.json({
      success: true,
      items,
      summary: {
        itemCount,
        totalMRP,
        totalDiscount,
        subtotal,
        deliveryFee: subtotal > 799 || subtotal === 0 ? 0 : 99,
        convenienceFee: 20
      }
    });
  } catch (err) {
    console.error('Fetch cart error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching cart.' });
  }
});

// POST /api/cart
router.post('/', (req, res) => {
  try {
    const { product_id, size, quantity = 1 } = req.body;
    if (!product_id || !size) {
      return res.status(400).json({ success: false, message: 'Product ID and size are required.' });
    }

    const product = db.findById('products', product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Check if item already exists in cart with same size
    const existing = db.findOne('cart', {
      user_id: req.user.id,
      product_id: Number(product_id),
      size
    });

    if (existing) {
      const updated = db.update('cart', existing.id, {
        quantity: existing.quantity + Number(quantity)
      });
      return res.json({
        success: true,
        message: 'Cart quantity updated!',
        item: { ...updated, product }
      });
    }

    const newItem = db.insert('cart', {
      user_id: req.user.id,
      product_id: Number(product_id),
      size,
      quantity: Number(quantity)
    });

    return res.status(201).json({
      success: true,
      message: 'Item added to bag!',
      item: { ...newItem, product }
    });
  } catch (err) {
    console.error('Add to cart error:', err);
    return res.status(500).json({ success: false, message: 'Server error adding to cart.' });
  }
});

// PUT /api/cart/:id
router.put('/:id', (req, res) => {
  try {
    const { quantity, size } = req.body;
    const item = db.findById('cart', req.params.id);

    if (!item || item.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    const updates = {};
    if (quantity !== undefined) {
      if (quantity <= 0) {
        db.delete('cart', item.id);
        return res.json({ success: true, message: 'Item removed from cart.' });
      }
      updates.quantity = Number(quantity);
    }
    if (size) {
      updates.size = size;
    }

    const updated = db.update('cart', item.id, updates);
    const product = db.findById('products', updated.product_id);

    return res.json({
      success: true,
      message: 'Cart updated successfully!',
      item: { ...updated, product }
    });
  } catch (err) {
    console.error('Update cart error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating cart.' });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', (req, res) => {
  try {
    const item = db.findById('cart', req.params.id);
    if (!item || item.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    db.delete('cart', item.id);
    return res.json({
      success: true,
      message: 'Item removed from bag.'
    });
  } catch (err) {
    console.error('Remove cart item error:', err);
    return res.status(500).json({ success: false, message: 'Server error removing item.' });
  }
});

// POST /api/cart/move-to-wishlist/:id
router.post('/move-to-wishlist/:id', (req, res) => {
  try {
    const item = db.findById('cart', req.params.id);
    if (!item || item.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Cart item not found.' });
    }

    // Add to wishlist if not already present
    const existingWishlist = db.findOne('wishlist', {
      user_id: req.user.id,
      product_id: item.product_id
    });

    if (!existingWishlist) {
      db.insert('wishlist', {
        user_id: req.user.id,
        product_id: item.product_id
      });
    }

    // Remove from cart
    db.delete('cart', item.id);

    return res.json({
      success: true,
      message: 'Moved to wishlist!'
    });
  } catch (err) {
    console.error('Move to wishlist error:', err);
    return res.status(500).json({ success: false, message: 'Server error moving to wishlist.' });
  }
});

// DELETE /api/cart (Clear Cart)
router.delete('/', (req, res) => {
  try {
    db.deleteMany('cart', { user_id: req.user.id });
    return res.json({
      success: true,
      message: 'Cart cleared.'
    });
  } catch (err) {
    console.error('Clear cart error:', err);
    return res.status(500).json({ success: false, message: 'Server error clearing cart.' });
  }
});

module.exports = router;
