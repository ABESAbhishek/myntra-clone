import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ChevronRight, ShieldCheck, RotateCcw, Truck, Check, Sparkles, MessageSquarePlus, Ruler } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ImageGallery from '../components/pdp/ImageGallery';
import SizeChartModal from '../components/pdp/SizeChartModal';
import PincodeChecker from '../components/pdp/PincodeChecker';
import WriteReviewModal from '../components/pdp/WriteReviewModal';
import ProductCard from '../components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated } = useAuth();
  const { addToBag } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
        setReviews(res.data.reviews || []);
        setSimilar(res.data.similar || []);
        if (res.data.product.sizes?.length > 0) {
          const available = res.data.product.sizes.find(s => s.stock > 0);
          if (available) setSelectedSize(available.size);
        }
      }
    } catch (err) {
      console.error('Error fetching product detail', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleAddToBag = async () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsAdding(true);
    const res = await addToBag(product.id, selectedSize, 1);
    setIsAdding(false);

    if (res.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-myntra-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-myntra-dark mb-4">Product Not Found</h2>
        <Link to="/products" className="px-6 py-2.5 bg-myntra-pink text-white font-bold text-xs rounded">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const selectedSizeObj = product.sizes?.find(s => s.size === selectedSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      
      {/* Breadcrumb Trail */}
      <nav className="flex items-center gap-1.5 text-xs text-myntra-muted mb-6">
        <Link to="/" className="hover:text-myntra-dark">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to={`/products?gender=${product.gender}`} className="hover:text-myntra-dark capitalize">
          {product.gender}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to={`/products?category=${encodeURIComponent(product.category_name)}`} className="hover:text-myntra-dark">
          {product.category_name}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-myntra-dark truncate max-w-[200px] sm:max-w-md">{product.title}</span>
      </nav>

      {/* Main PDP Grid: Left Gallery, Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery images={product.images || []} title={product.title} />
        </div>

        {/* Right: Product Details & Buying Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Title */}
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-myntra-dark tracking-wide">
              {product.brand}
            </h1>
            <p className="text-sm sm:text-base text-myntra-muted mt-1 leading-relaxed">
              {product.title}
            </p>

            {/* Rating Chip */}
            <div className="mt-3 flex items-center gap-2">
              <div className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-gray-200 shadow-sm text-xs font-bold text-myntra-dark">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600 inline" />
                <span className="text-gray-300 mx-1">|</span>
                <span className="text-myntra-muted font-normal">{product.rating_count} Ratings</span>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-myntra-dark">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="text-base text-myntra-lightMuted line-through">
                    MRP ₹{product.mrp}
                  </span>
                  <span className="text-base font-extrabold text-[#ff905a]">
                    ({product.discount_percent}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] font-bold text-teal-700 mt-1">
              inclusive of all taxes
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="border-b border-gray-200 pb-5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-xs font-bold uppercase tracking-wider text-myntra-dark flex items-center gap-1.5">
                  <span>Select Size</span>
                  {selectedSizeObj?.stock > 0 && selectedSizeObj.stock <= 5 && (
                    <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                      Only {selectedSizeObj.stock} left!
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-xs font-bold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  SIZE CHART
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={s.stock === 0}
                    onClick={() => {
                      setSelectedSize(s.size);
                      setSizeError(false);
                    }}
                    className={`min-w-[48px] h-12 px-3 text-xs font-extrabold rounded-full border transition-all flex items-center justify-center ${
                      selectedSize === s.size
                        ? 'border-myntra-pink text-myntra-pink bg-myntra-pinkLight ring-1 ring-myntra-pink shadow-sm'
                        : s.stock === 0
                        ? 'border-gray-200 text-gray-300 line-through bg-gray-50 cursor-not-allowed'
                        : 'border-gray-300 text-myntra-dark hover:border-myntra-pink hover:text-myntra-pink'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p className="text-xs font-bold text-red-500 animate-fadeIn">
                  Please select a size to proceed
                </p>
              )}
            </div>
          )}

          {/* Action Buttons: Add to Bag & Wishlist */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToBag}
              disabled={isAdding}
              className={`flex-1 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-md transition-all ${
                addedSuccess
                  ? 'bg-teal-600 text-white'
                  : 'bg-myntra-pink hover:bg-myntra-pinkDark text-white hover:shadow-lg'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  ADDED TO BAG
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  {isAdding ? 'ADDING...' : 'ADD TO BAG'}
                </>
              )}
            </button>

            <button
              onClick={handleWishlist}
              className={`px-6 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-md border flex items-center justify-center gap-2 transition-all ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-myntra-pink'
                  : 'border-gray-300 hover:border-myntra-dark text-myntra-dark hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-myntra-pink text-myntra-pink' : ''}`} />
              {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
            </button>
          </div>

          {/* Pincode Estimator */}
          <div className="border-t border-b border-gray-200 py-5">
            <PincodeChecker />
          </div>

          {/* Product Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-myntra-dark">
                Product Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="py-1">
                    <span className="text-myntra-lightMuted block text-[11px]">{key}</span>
                    <span className="font-semibold text-myntra-dark">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-myntra-dark">
                Customer Ratings & Reviews ({reviews.length})
              </h3>
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login');
                    return;
                  }
                  setIsReviewModalOpen(true);
                }}
                className="text-xs font-bold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Rate Product
              </button>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-teal-600 text-white font-bold text-[10px] rounded flex items-center gap-0.5">
                        {rev.rating} <Star className="w-2.5 h-2.5 fill-current inline" />
                      </span>
                      {rev.headline && <span className="font-bold text-myntra-dark">{rev.headline}</span>}
                    </div>
                    <p className="text-myntra-muted">{rev.comment}</p>
                    <p className="text-[10px] text-myntra-lightMuted">
                      {rev.user_name} &bull; Verified Buyer
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-myntra-muted italic">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Similar Products Recommendation Slider */}
      {similar.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-200 select-none">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-myntra-dark mb-6">
            Similar Products You May Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />

      <WriteReviewModal
        isOpen={isReviewModalOpen}
        productId={product.id}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={fetchProductData}
      />
    </div>
  );
};

export default ProductDetailPage;
