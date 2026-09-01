import React, { useState } from 'react';
import { X, Star, Sparkles, Check } from 'lucide-react';
import api from '../../api/client';

const WriteReviewModal = ({ isOpen, onClose, productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please provide your review feedback.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await api.post('/reviews', {
        product_id: productId,
        rating,
        headline,
        comment
      });

      if (res.data.success) {
        onReviewSubmitted();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-myntra-dark">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-myntra-dark">Rate & Review Product</h3>
            <p className="text-xs text-myntra-muted">Share your verified shopping experience</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-600 rounded text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Selection */}
          <div>
            <label className="block text-xs font-bold text-myntra-dark mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-myntra-dark ml-2">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Average'}
                {rating === 2 && 'Below Average'}
                {rating === 1 && 'Poor'}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-bold text-myntra-dark mb-1">
              Review Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Great quality and perfect fit!"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-myntra-dark focus:outline-none focus:border-myntra-pink"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-myntra-dark mb-1">
              Detailed Feedback *
            </label>
            <textarea
              rows={4}
              placeholder="Tell other shoppers about the material, comfort, size accuracy, etc."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs text-myntra-dark focus:outline-none focus:border-myntra-pink resize-none"
              required
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-xs font-bold rounded hover:bg-gray-50 text-myntra-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-myntra-pink text-white text-xs font-bold rounded hover:bg-myntra-pinkDark transition-colors flex items-center gap-1.5"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
