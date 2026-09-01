import React, { useState } from 'react';
import { Tag, ShieldCheck, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CouponModal from './CouponModal';

const PriceBreakup = ({ onProceed, buttonText = 'PLACE ORDER', isProceedDisabled = false }) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const { cartSummary, appliedCoupon, couponDiscountAmount, finalPayable, removeCoupon, cartItems } = useCart();

  const totalMRP = cartSummary.totalMRP || 0;
  const discountOnMRP = cartSummary.totalDiscount || 0;
  const deliveryFee = cartSummary.deliveryFee || 0;
  const convenienceFee = cartItems.length > 0 ? (cartSummary.convenienceFee || 20) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm select-none">
      
      {/* Coupons Section */}
      <div className="pb-4 mb-4 border-b border-gray-200">
        <p className="text-xs font-bold uppercase tracking-wider text-myntra-dark mb-2">
          Coupons
        </p>
        
        {appliedCoupon ? (
          <div className="flex items-center justify-between p-2.5 bg-teal-50 border border-teal-200 rounded-md">
            <div className="flex items-center gap-2 text-xs">
              <Tag className="w-4 h-4 text-teal-600" />
              <div>
                <span className="font-extrabold text-teal-800">{appliedCoupon.code}</span>
                <p className="text-[11px] text-teal-700">You saved ₹{couponDiscountAmount}!</p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-gray-400 hover:text-red-500 p-1"
              title="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-myntra-dark font-semibold">
              <Tag className="w-4 h-4 text-myntra-pink" />
              <span>Apply Coupons</span>
            </div>
            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="px-3 py-1 text-xs font-bold text-myntra-pink border border-myntra-pink rounded hover:bg-myntra-pinkLight transition-colors"
            >
              APPLY
            </button>
          </div>
        )}
      </div>

      {/* Price Details */}
      <div className="space-y-3 pb-4 border-b border-gray-200 text-xs">
        <p className="font-extrabold uppercase tracking-wider text-myntra-dark">
          Price Details ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})
        </p>

        <div className="flex justify-between text-myntra-muted">
          <span>Total MRP</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="flex justify-between text-teal-700">
          <span>Discount on MRP</span>
          <span>- ₹{discountOnMRP}</span>
        </div>

        {couponDiscountAmount > 0 && (
          <div className="flex justify-between text-teal-700 font-semibold">
            <span>Coupon Discount</span>
            <span>- ₹{couponDiscountAmount}</span>
          </div>
        )}

        <div className="flex justify-between text-myntra-muted">
          <span>Convenience Fee</span>
          <span>₹{convenienceFee}</span>
        </div>

        <div className="flex justify-between text-myntra-muted">
          <span>Shipping Fee</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-teal-700 font-bold uppercase">FREE</span>
            ) : (
              `₹${deliveryFee}`
            )}
          </span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="pt-4 pb-4 flex justify-between items-center text-sm font-extrabold text-myntra-dark">
        <span>Total Amount</span>
        <span className="text-base">₹{finalPayable}</span>
      </div>

      {/* Call to Action */}
      {onProceed && (
        <button
          onClick={onProceed}
          disabled={isProceedDisabled || cartItems.length === 0}
          className="w-full py-3.5 bg-myntra-pink text-white font-extrabold text-sm uppercase tracking-wider rounded-md hover:bg-myntra-pinkDark transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText}
        </button>
      )}

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-myntra-lightMuted">
        <ShieldCheck className="w-4 h-4 text-teal-600" />
        Safe and Secure Payments &bull; 100% Authentic Products
      </div>

      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />
    </div>
  );
};

export default PriceBreakup;
