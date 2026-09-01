import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#fafbfc] border-t border-myntra-border mt-16 pt-12 pb-8 text-xs text-myntra-muted select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          
          {/* Col 1: Online Shopping */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-myntra-dark">
              Online Shopping
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/products?gender=men" className="hover:text-myntra-dark transition-colors">Men's Fashion</Link></li>
              <li><Link to="/products?gender=women" className="hover:text-myntra-dark transition-colors">Women's Fashion</Link></li>
              <li><Link to="/products?gender=kids" className="hover:text-myntra-dark transition-colors">Kids Wear</Link></li>
              <li><Link to="/products?category=Beauty%20%26%20Personal%20Care" className="hover:text-myntra-dark transition-colors">Beauty & Grooming</Link></li>
              <li><Link to="/products?search=watch" className="hover:text-myntra-dark transition-colors">Watches & Accessories</Link></li>
              <li><Link to="/products?sort=discount_desc" className="hover:text-myntra-pink font-semibold transition-colors">Deals of the Day</Link></li>
            </ul>
          </div>

          {/* Col 2: Customer Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-myntra-dark">
              Customer Policies
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#contact" className="hover:text-myntra-dark">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-myntra-dark">FAQ</a></li>
              <li><a href="#terms" className="hover:text-myntra-dark">Terms of Use</a></li>
              <li><Link to="/orders" className="hover:text-myntra-dark">Track Orders</Link></li>
              <li><a href="#shipping" className="hover:text-myntra-dark">Shipping & Delivery</a></li>
              <li><a href="#returns" className="hover:text-myntra-dark">Cancellation & Returns</a></li>
              <li><a href="#privacy" className="hover:text-myntra-dark">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Col 3: Experience App */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-myntra-dark">
              Experience Myntra App On Mobile
            </h4>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors w-fit">
                <span className="text-lg"></span>
                <div className="text-[10px]">
                  <p className="text-gray-400 leading-none">Download on the</p>
                  <p className="font-bold text-xs leading-tight">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors w-fit">
                <span className="text-lg">▶</span>
                <div className="text-[10px]">
                  <p className="text-gray-400 leading-none">GET IT ON</p>
                  <p className="font-bold text-xs leading-tight">Google Play</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="font-bold text-myntra-dark mb-1">KEEP IN TOUCH</p>
              <div className="flex gap-3 text-base text-gray-500">
                <span className="cursor-pointer hover:text-myntra-pink">f</span>
                <span className="cursor-pointer hover:text-myntra-pink">t</span>
                <span className="cursor-pointer hover:text-myntra-pink">in</span>
                <span className="cursor-pointer hover:text-myntra-pink">yt</span>
              </div>
            </div>
          </div>

          {/* Col 4: Trust Guarantees */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 text-myntra-pink">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-myntra-dark">100% ORIGINAL</p>
                <p className="text-[11px] text-myntra-muted">guarantee for all products at myntra.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 text-myntra-pink">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-myntra-dark">Return within 14days</p>
                <p className="text-[11px] text-myntra-muted">of receiving your order</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 text-myntra-pink">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-myntra-dark">Get free delivery</p>
                <p className="text-[11px] text-myntra-muted">for all orders above ₹799</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="py-6 border-b border-gray-200">
          <p className="text-xs font-bold uppercase text-myntra-dark mb-2">
            Popular Searches
          </p>
          <p className="text-[11px] text-myntra-lightMuted leading-relaxed">
            Roadster Shirts | HRX T-Shirts | Levi's 511 Slim Jeans | Puma Smash Sneakers | Libas Anarkali Kurtas | Anouk Ethnic Wear | Carlton London Pumps | Lavie Handbags | Minimalist Niacinamide Serum | SUGAR Matte Lipsticks | Philips Grooming Kit | Floral Summer Dresses | Mens Cargo Pants | Silk Sarees
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-myntra-lightMuted">
          <p>© 2026 www.myntra.com. All rights reserved.</p>
          <p>Crafted with ♥ for Fashion Lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
