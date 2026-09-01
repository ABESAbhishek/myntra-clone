import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ChevronDown, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartItemRow = ({ item }) => {
  const { updateQuantity, updateSize, removeFromCart, moveToWishlist } = useCart();
  const product = item.product;

  if (!product) return null;

  const availableSizes = product.sizes || [{ size: item.size, stock: 10 }];

  return (
    <div className="relative flex gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-card transition-shadow">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover object-top"
        />
      </Link>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="font-extrabold text-sm text-myntra-dark tracking-wide">{product.brand}</h4>
              <p className="text-xs text-myntra-muted truncate mt-0.5" title={product.title}>{product.title}</p>
            </div>
            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              title="Remove item"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Size & Quantity Selectors */}
          <div className="flex items-center gap-3 mt-3">
            {/* Size Dropdown */}
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-bold text-myntra-dark">
              <span className="text-myntra-lightMuted font-normal mr-1">Size:</span>
              <select
                value={item.size}
                onChange={(e) => updateSize(item.id, e.target.value)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {availableSizes.map((s) => (
                  <option key={s.size} value={s.size} disabled={s.stock === 0}>
                    {s.size} {s.stock === 0 ? '(Out of stock)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Dropdown */}
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-bold text-myntra-dark">
              <span className="text-myntra-lightMuted font-normal mr-1">Qty:</span>
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm font-bold text-myntra-dark">₹{product.price * item.quantity}</span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-xs text-myntra-lightMuted line-through">
                  ₹{product.mrp * item.quantity}
                </span>
                <span className="text-xs font-bold text-[#ff905a]">
                  ({product.discount_percent}% OFF)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Return Guarantee & Move to Wishlist */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-myntra-muted">
            <RotateCcw className="w-3.5 h-3.5 text-myntra-dark" />
            <span><strong className="font-semibold text-myntra-dark">14 days</strong> return available</span>
          </div>

          <button
            onClick={() => moveToWishlist(item.id)}
            className="text-xs font-bold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1 transition-colors"
          >
            <Heart className="w-3.5 h-3.5" />
            MOVE TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
