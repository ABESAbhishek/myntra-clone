const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

// GET /api/orders
router.get('/', (req, res) => {
  try {
    const orders = db.findAll('orders', { user_id: req.user.id })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({
      success: true,
      orders
    });
  } catch (err) {
    console.error('Fetch orders error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching orders.' });
  }
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  try {
    const order = db.findById('orders', req.params.id);
    if (!order || order.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    return res.json({
      success: true,
      order
    });
  } catch (err) {
    console.error('Fetch single order error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching order details.' });
  }
});

// POST /api/orders (Create/Place Order)
router.post('/', (req, res) => {
  try {
    const {
      address_id,
      items, // Array of { product_id, size, quantity }
      payment_method = 'UPI',
      coupon_code = null,
      coupon_discount = 0
    } = req.body;

    if (!address_id) {
      return res.status(400).json({ success: false, message: 'Delivery address is required.' });
    }

    const address = db.findById('addresses', address_id);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found.' });
    }

    // Determine items to order
    let orderItemsData = [];
    if (items && Array.isArray(items) && items.length > 0) {
      orderItemsData = items;
    } else {
      // Pull items from user's cart
      const cartItems = db.findAll('cart', { user_id: req.user.id });
      if (cartItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Your cart is empty.' });
      }
      orderItemsData = cartItems;
    }

    // Format and calculate totals
    let totalMRP = 0;
    let subtotal = 0;
    const finalItems = [];

    for (const item of orderItemsData) {
      const product = db.findById('products', item.product_id);
      if (!product) continue;

      const qty = Number(item.quantity) || 1;
      totalMRP += product.mrp * qty;
      subtotal += product.price * qty;

      finalItems.push({
        product_id: product.id,
        title: product.title,
        brand: product.brand,
        image: product.images && product.images[0] ? product.images[0] : '',
        size: item.size,
        price: product.price,
        mrp: product.mrp,
        quantity: qty
      });
    }

    if (finalItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid products in order.' });
    }

    const deliveryFee = subtotal > 799 ? 0 : 99;
    const convenienceFee = 20;
    const discountAmount = totalMRP - subtotal;
    const finalAmount = Math.max(0, subtotal + deliveryFee + convenienceFee - Number(coupon_discount));

    const orderNumber = 'MYN-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
    
    // Delivery date calculation (approx 4-5 days from now)
    const estDelivery = new Date();
    estDelivery.setDate(estDelivery.getDate() + 4);
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const deliveryString = `Expected delivery by ${estDelivery.toLocaleDateString('en-IN', dateOptions)}`;

    const newOrder = db.insert('orders', {
      order_number: orderNumber,
      user_id: req.user.id,
      address,
      items: finalItems,
      total_mrp: totalMRP,
      discount_amount: discountAmount,
      coupon_code: coupon_code || null,
      coupon_discount: Number(coupon_discount) || 0,
      delivery_fee: deliveryFee,
      convenience_fee: convenienceFee,
      final_amount: finalAmount,
      payment_method,
      payment_status: payment_method === 'COD' ? 'Pending' : 'Paid',
      order_status: 'Placed',
      delivery_date: deliveryString,
      timeline: [
        { status: 'Placed', time: new Date().toISOString(), completed: true, label: 'Order Placed' },
        { status: 'Packed', time: null, completed: false, label: 'Order Packed' },
        { status: 'Shipped', time: null, completed: false, label: 'Shipped' },
        { status: 'Out for Delivery', time: null, completed: false, label: 'Out for Delivery' },
        { status: 'Delivered', time: null, completed: false, label: 'Delivered' }
      ]
    });

    // Clear user's cart on successful order
    db.deleteMany('cart', { user_id: req.user.id });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({ success: false, message: 'Server error creating order.' });
  }
});

// PATCH /api/orders/:id/cancel
router.patch('/:id/cancel', (req, res) => {
  try {
    const order = db.findById('orders', req.params.id);
    if (!order || order.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    if (order.order_status === 'Delivered' || order.order_status === 'Cancelled') {
      return res.status(400).json({ success: false, message: `Cannot cancel an order that is ${order.order_status}.` });
    }

    const updated = db.update('orders', order.id, {
      order_status: 'Cancelled',
      cancelled_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Order has been cancelled.',
      order: updated
    });
  } catch (err) {
    console.error('Cancel order error:', err);
    return res.status(500).json({ success: false, message: 'Server error cancelling order.' });
  }
});

module.exports = router;
