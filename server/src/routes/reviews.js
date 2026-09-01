const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

// GET /api/reviews/:productId
router.get('/:productId', (req, res) => {
  try {
    const prodId = Number(req.params.productId);
    const reviews = db.findAll('reviews', { product_id: prodId })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({
      success: true,
      reviews
    });
  } catch (err) {
    console.error('Fetch reviews error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching reviews.' });
  }
});

// POST /api/reviews (Add new review)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { product_id, rating, headline, comment } = req.body;
    if (!product_id || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Product ID, rating (1-5), and review text are required.' });
    }

    const prodId = Number(product_id);
    const product = db.findById('products', prodId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const numRating = Math.max(1, Math.min(5, Number(rating)));

    const newReview = db.insert('reviews', {
      product_id: prodId,
      user_id: req.user.id,
      user_name: req.user.name,
      rating: numRating,
      headline: (headline || '').trim(),
      comment: comment.trim(),
      created_at: new Date().toISOString()
    });

    // Update product average rating & count
    const allReviews = db.findAll('reviews', { product_id: prodId });
    const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
    
    db.update('products', prodId, {
      rating: parseFloat(avgRating),
      rating_count: (product.rating_count || 0) + 1
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your review!',
      review: newReview
    });
  } catch (err) {
    console.error('Add review error:', err);
    return res.status(500).json({ success: false, message: 'Server error adding review.' });
  }
});

module.exports = router;
