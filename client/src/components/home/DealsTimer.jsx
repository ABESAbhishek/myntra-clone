import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';

const DealsTimer = ({ deals = [] }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num) => String(num).padStart(2, '0');

  return (
    <section className="py-10 bg-gradient-to-b from-pink-50/60 to-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deal Header with Clock */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-pink-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-myntra-pink text-white flex items-center justify-center shadow-md animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-myntra-dark">
                Deal of the Day
              </h2>
              <p className="text-xs text-myntra-muted">Unbeatable prices on bestselling favorites</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-200">
            <Clock className="w-4 h-4 text-myntra-pink" />
            <span className="text-xs font-bold text-myntra-muted mr-1">Ends in:</span>
            <div className="flex items-center gap-1 font-mono text-xs font-extrabold text-myntra-dark">
              <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded">{formatDigits(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded">{formatDigits(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-myntra-pink text-white px-1.5 py-0.5 rounded">{formatDigits(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {deals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products?sort=discount_desc"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-myntra-pink hover:text-myntra-pinkDark border border-myntra-pink px-6 py-2.5 rounded-full hover:bg-myntra-pink hover:text-white transition-all shadow-sm"
          >
            View All Hot Deals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DealsTimer;
