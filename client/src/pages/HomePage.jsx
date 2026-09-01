import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Tag, ShieldCheck, RotateCcw, Truck } from 'lucide-react';
import api from '../api/client';
import HeroSlider from '../components/home/HeroSlider';
import DealsTimer from '../components/home/DealsTimer';
import CategoryPills from '../components/home/CategoryPills';
import BrandShowcase from '../components/home/BrandShowcase';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  const [dealProducts, setDealProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [dealsRes, featuredRes] = await Promise.all([
          api.get('/products/deal-of-the-day'),
          api.get('/products/featured')
        ]);

        if (dealsRes.data.success) setDealProducts(dealsRes.data.products);
        if (featuredRes.data.success) setFeaturedProducts(featuredRes.data.products);
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Carousel */}
      <HeroSlider />

      {/* 2. Coupon Promotion Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white rounded-xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base tracking-wide">
                FLAT ₹200 OFF ON YOUR FIRST ORDER!
              </p>
              <p className="text-xs text-pink-100">
                Use code <span className="font-mono font-black text-yellow-200">MYNTRA200</span> on checkout above ₹999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyCoupon('MYNTRA200')}
              className="px-4 py-2 bg-white text-myntra-dark text-xs font-black rounded-lg hover:bg-yellow-300 transition-colors shadow-sm"
            >
              {copiedCoupon === 'MYNTRA200' ? 'COPIED!' : 'COPY CODE'}
            </button>
            <Link
              to="/products"
              className="px-4 py-2 bg-black/30 hover:bg-black/50 text-white text-xs font-bold rounded-lg transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Deal of the Day with Live Countdown */}
      <DealsTimer deals={dealProducts} />

      {/* 4. Circular Category Navigator */}
      <CategoryPills />

      {/* 5. Brand Showcase */}
      <BrandShowcase />

      {/* 6. Trending & Featured Collection */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-myntra-dark">
              Trending Styles & New Arrivals
            </h2>
            <p className="text-xs text-myntra-muted mt-0.5">
              Handpicked fashion must-haves for this season
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-extrabold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1 uppercase tracking-wider"
          >
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Bottom Value Proposition Grid */}
      <section className="bg-gray-50 border-t border-b border-gray-200 py-8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-myntra-pink flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-myntra-dark uppercase">100% Genuine Brands</h4>
            <p className="text-[11px] text-myntra-muted mt-0.5">Sourced directly from verified brand partners</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-myntra-pink flex items-center justify-center mb-2">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-myntra-dark uppercase">Hassle-Free 14 Days Return</h4>
            <p className="text-[11px] text-myntra-muted mt-0.5">Instant doorstep pickup and refund</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-myntra-pink flex items-center justify-center mb-2">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-xs text-myntra-dark uppercase">Express Fast Delivery</h4>
            <p className="text-[11px] text-myntra-muted mt-0.5">Safe contactless delivery across 19,000+ pin codes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
