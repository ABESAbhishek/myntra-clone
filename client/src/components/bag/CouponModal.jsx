import React, { useState, useEffect } from 'react';
import { X, Tag, Sparkles, Check, AlertCircle } from 'lucide-react';
import api from '../../api/client';
import { useCart } from '../../context/CartContext';

const CouponModal = ({ isOpen, onClose }) => {
  const [coupons, setCoupons] = useState([]);
  const [customCode, setCustomCode] = useState('');
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const { applyCoupon, appliedCoupon, cartSummary } = useCart();

  useEffect(() => {
    if (isOpen) {
      api.get('/coupons')
        .then(res => {
          if (res.data.success) setCoupons(res.data.coupons);
        })
        .catch(err => console.error('Error fetching coupons', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = async (codeToApply) => {
    const code = (codeToApply || customCode).trim().toUpperCase();
    if (!code) return;

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    const res = await applyCoupon(code);
    setLoading(false);

    if (res.success) {
      setStatusMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-myntra-dark">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-myntra-pinkLight text-myntra-pink flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-myntra-dark">Apply Coupon / Promo</h3>
            <p className="text-xs text-myntra-muted">Save more on your fashion cart</p>
          </div>
        </div>

        {/* Input Custom Coupon */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs uppercase font-bold text-myntra-dark focus:outline-none focus:border-myntra-pink"
          />
          <button
            onClick={() => handleApply()}
            disabled={loading || !customCode.trim()}
            className="px-5 py-2 bg-myntra-pink text-white text-xs font-bold rounded hover:bg-myntra-pinkDark disabled:opacity-50 transition-colors"
          >
            {loading ? 'Checking...' : 'APPLY'}
          </button>
        </div>

        {/* Status Alert */}
        {statusMsg.text && (
          <div className={`p-2.5 rounded text-xs mb-4 flex items-center gap-2 ${
            statusMsg.type === 'success' ? 'bg-teal-50 text-teal-700 font-semibold' : 'bg-red-50 text-red-600'
          }`}>
            {statusMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {statusMsg.text}
          </div>
        )}

        {/* Available Coupons List */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1">
          <p className="text-xs font-bold uppercase tracking-wider text-myntra-lightMuted">
            Available Offers
          </p>

          {coupons.map((c) => {
            const isSelected = appliedCoupon?.code === c.code;
            const isEligible = cartSummary.subtotal >= (c.min_order_amount || 0);

            return (
              <div
                key={c.id}
                className={`p-3.5 border rounded-lg transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/40'
                    : 'border-dashed border-gray-300 hover:border-myntra-pink bg-gray-50/50'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-myntra-pinkLight text-myntra-pink font-extrabold text-xs rounded border border-myntra-pink/30">
                      {c.code}
                    </span>
                    <p className="text-xs font-bold text-myntra-dark mt-1.5">{c.description}</p>
                    {c.min_order_amount && (
                      <p className="text-[11px] text-myntra-muted mt-0.5">
                        Minimum order value: ₹{c.min_order_amount}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleApply(c.code)}
                    disabled={isSelected || !isEligible}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                      isSelected
                        ? 'bg-teal-600 text-white cursor-default'
                        : isEligible
                        ? 'text-myntra-pink border border-myntra-pink hover:bg-myntra-pink hover:text-white'
                        : 'text-gray-400 border border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? 'APPLIED' : isEligible ? 'APPLY' : 'LOCKED'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
