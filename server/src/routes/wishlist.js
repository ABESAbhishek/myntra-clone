const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

// All wishlist routes require auth
router.use(authMiddleware);

// GET /api/wishlist
router.get('/', (req, res) => {
  try {
    const rawItems = db.findAll('wishlist', { user_id: req.user.id });
    const items = rawItems.map(item => {
      const product = db.findById('products', item.product_id);
      return {
        id: item.id,
        user_id: item.user_id,
        product_id: item.product_id,
        product: product || null,
        created_at: item.created_at
      };
    }).filter(item => item.product !== null);

    return res.json({
      success: true,
      items,
      count: items.length
    });
  } catch (err) {
    console.error('Fetch wishlist error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching wishlist.' });
  }
});

// POST /api/wishlist/toggle
router.post('/toggle', (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) {
      return res.status(400).json({ success: false, message: 'Product ID is required.' });
    }

    const prodId = Number(product_id);
    const existing = db.findOne('wishlist', {
      user_id: req.user.id,
      product_id: prodId
    });

    if (existing) {
      db.delete('wishlist', existing.id);
      return res.json({
        success: true,
        action: 'removed',
        message: 'Item removed from wishlist.'
      });
    }

    const product = db.findById('products', prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const newItem = db.insert('wishlist', {
      user_id: req.user.id,
      product_id: prodId
    });

    return res.json({
      success: true,
      action: 'added',
      message: 'Item added to wishlist!',
      item: { ...newItem, product }
    });
  } catch (err) {
    console.error('Toggle wishlist error:', err);
    return res.status(500).json({ success: false, message: 'Server error toggling wishlist.' });
  }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', (req, res) => {
  try {
    const prodId = Number(req.params.productId);
    const deletedCount = db.deleteMany('wishlist', {
      user_id: req.user.id,
      product_id: prodId
    });

    return res.json({
      success: true,
      message: 'Item removed from wishlist.',
      deleted: deletedCount > 0
    });
  } catch (err) {
    console.error('Delete wishlist item error:', err);
    return res.status(500).json({ success: false, message: 'Server error removing item from wishlist.' });
  }
});

// POST /api/wishlist/move-to-bag
router.post('/move-to-bag', (req, res) => {
  try {
    const { product_id, size } = req.body;
    if (!product_id || !size) {
      return res.status(400).json({ success: false, message: 'Product ID and size are required.' });
    }

    const prodId = Number(product_id);
    const product = db.findById('products', prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Add to cart or increment
    const existingCart = db.findOne('cart', {
      user_id: req.user.id,
      product_id: prodId,
      size
    });

    if (existingCart) {
      db.update('cart', existingCart.id, { quantity: existingCart.quantity + 1 });
    } else {
      db.insert('cart', {
        user_id: req.user.id,
        product_id: prodId,
        size,
        quantity: 1
      });
    }

    // Remove from wishlist
    db.deleteMany('wishlist', {
      user_id: req.user.id,
      product_id: prodId
    });

    return res.json({
      success: true,
      message: 'Item moved to bag!'
    });
  } catch (err) {
    console.error('Move to bag error:', err);
    return res.status(500).json({ success: false, message: 'Server error moving to bag.' });
  }
});

module.exports = router;
