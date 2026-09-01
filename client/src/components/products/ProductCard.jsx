import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import RatingBadge from '../ui/RatingBadge';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToBag } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'];
  const displayImage = isHovered && images.length > 1 ? images[1] : images[0];

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(product.id);
  };

  const handleQuickAdd = async (e, sizeObj) => {
    e.preventDefault();
    e.stopPropagation();
    if (sizeObj.stock === 0) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsAdding(true);
    const res = await addToBag(product.id, sizeObj.size, 1);
    setIsAdding(false);
    if (res.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedSize(null);
      }}
      className="group relative flex flex-col bg-white rounded-md overflow-hidden hover:shadow-dropdown transition-all duration-300 border border-transparent hover:border-gray-200"
    >
      {/* Product Image Container */}
      <Link to={`/product/${product.id}`} className="relative w-full pb-[133%] bg-gray-100 overflow-hidden block">
        <img
          src={displayImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Rating Badge Overlay */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <RatingBadge rating={product.rating} count={product.rating_count} />
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isWishlisted
              ? 'bg-myntra-pink text-white shadow-md scale-110'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-myntra-pink hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Size Selector Bar on Hover */}
        {isHovered && product.sizes && product.sizes.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-2.5 z-20 animate-fadeIn border-t border-gray-100">
            <div className="text-[11px] font-bold text-myntra-muted mb-1 text-center">
              {addedSuccess ? (
                <span className="text-teal-600 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Added to Bag!
                </span>
              ) : (
                'Select Size to Add'
              )}
            </div>
            <div className="flex justify-center items-center gap-1.5 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={s.stock === 0}
                  onClick={(e) => handleQuickAdd(e, s)}
                  className={`w-7 h-7 text-[11px] font-bold rounded-full border transition-all ${
                    s.stock === 0
                      ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                      : 'border-gray-300 text-myntra-dark hover:border-myntra-pink hover:text-myntra-pink hover:bg-myntra-pinkLight'
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-3 flex flex-col flex-1">
        {/* Brand Name */}
        <h3 className="font-extrabold text-sm text-myntra-dark tracking-wide truncate">
          {product.brand}
        </h3>

        {/* Product Title */}
        <p className="text-xs text-myntra-muted truncate mt-0.5" title={product.title}>
          {product.title}
        </p>

        {/* Price & Discount */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-bold text-myntra-dark">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <>
              <span className="text-[11px] sm:text-xs text-myntra-lightMuted line-through">
                ₹{product.mrp}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#ff905a]">
                ({product.discount_percent}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
