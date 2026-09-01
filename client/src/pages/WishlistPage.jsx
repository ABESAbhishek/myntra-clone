import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const WishlistPage = () => {
  const { wishlistItems, wishlistCount, loading, removeFromWishlist, moveToBag } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizeErrors, setSizeErrors] = useState({});
  const navigate = useNavigate();

  const handleMoveToBag = async (productId, sizes = []) => {
    const size = selectedSizes[productId] || (sizes.length > 0 ? sizes[0].size : 'M');
    if (!size) {
      setSizeErrors(prev => ({ ...prev, [productId]: true }));
      return;
    }

    const res = await moveToBag(productId, size);
    if (res.success) {
      setSizeErrors(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-myntra-pink mx-auto flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          PLEASE LOG IN
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          Login to view and save items in your wishlist
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-myntra-pink text-white text-xs font-extrabold uppercase tracking-wider rounded shadow-md hover:bg-myntra-pinkDark transition-all"
        >
          LOGIN NOW
        </Link>
      </div>
    );
  }

  if (wishlistCount === 0 && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          YOUR WISHLIST IS EMPTY
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          Add items that you like to your wishlist. Review them anytime and easily move them to the bag.
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-myntra-pink text-white text-xs font-extrabold uppercase tracking-wider rounded shadow-md hover:bg-myntra-pinkDark transition-all"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
        <h1 className="text-lg font-extrabold text-myntra-dark uppercase tracking-wider">
          My Wishlist <span className="font-normal text-myntra-muted">({wishlistCount} {wishlistCount === 1 ? 'Item' : 'Items'})</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {wishlistItems.map((item) => {
          const product = item.product;
          if (!product) return null;

          const sizes = product.sizes || [];
          const currentSelectedSize = selectedSizes[product.id] || (sizes[0]?.size || 'M');

          return (
            <div
              key={item.id}
              className="relative flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-card transition-all group"
            >
              {/* Remove Cross Button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 flex items-center justify-center shadow-sm backdrop-blur-sm transition-colors"
                title="Remove from wishlist"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="relative pb-[130%] bg-gray-100 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Product Info */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xs text-myntra-dark truncate">{product.brand}</h3>
                  <p className="text-[11px] text-myntra-muted truncate mt-0.5">{product.title}</p>
                  
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-extrabold text-myntra-dark">₹{product.price}</span>
                    {product.mrp && product.mrp > product.price && (
                      <>
                        <span className="text-[10px] text-myntra-lightMuted line-through">₹{product.mrp}</span>
                        <span className="text-[10px] font-bold text-[#ff905a]">({product.discount_percent}% OFF)</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Size Selector + Move To Bag CTA */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 space-y-2">
                  {sizes.length > 0 && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-myntra-lightMuted">Size:</span>
                      <select
                        value={currentSelectedSize}
                        onChange={(e) => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}
                        className="bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 font-bold text-myntra-dark focus:outline-none text-[11px]"
                      >
                        {sizes.map((s) => (
                          <option key={s.size} value={s.size} disabled={s.stock === 0}>
                            {s.size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={() => handleMoveToBag(product.id, sizes)}
                    className="w-full py-2 bg-myntra-pinkLight hover:bg-myntra-pink text-myntra-pink hover:text-white font-extrabold text-xs uppercase tracking-wider rounded border border-myntra-pink/30 hover:border-myntra-pink transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    MOVE TO BAG
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
