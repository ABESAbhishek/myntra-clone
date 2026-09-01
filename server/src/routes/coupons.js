const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/coupons
router.get('/', (req, res) => {
  try {
    const coupons = db.findAll('coupons');
    return res.json({
      success: true,
      coupons
    });
  } catch (err) {
    console.error('Fetch coupons error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching coupons.' });
  }
});

// POST /api/coupons/validate
router.post('/validate', (req, res) => {
  try {
    const { code, orderAmount = 0 } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Coupon code is required.' });
    }

    const coupon = db.findOne('coupons', c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid coupon code.' });
    }

    const amount = Number(orderAmount);
    if (coupon.min_order_amount && amount < coupon.min_order_amount) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum cart value of ₹${coupon.min_order_amount}. Add items worth ₹${coupon.min_order_amount - amount} more to apply.`
      });
    }

    let discount = 0;
    if (coupon.discount_type === 'fixed') {
      discount = Math.min(amount, coupon.discount_value);
    } else if (coupon.discount_type === 'percent') {
      discount = Math.round((amount * coupon.discount_value) / 100);
      if (coupon.max_discount && discount > coupon.max_discount) {
        discount = coupon.max_discount;
      }
    }

    return res.json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully! You saved ₹${discount}.`,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        discountAmount: discount
      }
    });
  } catch (err) {
    console.error('Validate coupon error:', err);
    return res.status(500).json({ success: false, message: 'Server error validating coupon.' });
  }
});

module.exports = router;
