import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, ShoppingBag, Menu, X, ChevronRight, Sparkles, Package, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';

const navCategories = [
  { name: 'MEN', key: 'MEN', path: '/products?gender=men' },
  { name: 'WOMEN', key: 'WOMEN', path: '/products?gender=women' },
  { name: 'KIDS', key: 'KIDS', path: '/products?gender=kids' },
  { name: 'BEAUTY', key: 'BEAUTY', path: '/products?category=Beauty%20%26%20Personal%20Care' },
  { name: 'STUDIO', key: null, badge: 'NEW', path: '/products?sort=newest' }
];

const Navbar = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleDemoSignIn = async () => {
    await demoLogin();
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-myntra-border shadow-header select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-myntra-dark hover:text-myntra-pink"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff3f6c] via-[#ff527b] to-[#ff905a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-extrabold text-2xl tracking-tighter">M</span>
          </div>
          <span className="hidden sm:inline-block font-extrabold text-xl tracking-wider text-myntra-dark">
            MYNTRA
          </span>
        </Link>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4 h-full">
          {navCategories.map((cat) => (
            <div
              key={cat.name}
              onMouseEnter={() => cat.key && setActiveMenu(cat.key)}
              className="relative h-full flex items-center"
            >
              <Link
                to={cat.path}
                className="px-3.5 py-2 text-sm font-bold tracking-wider text-myntra-dark hover:text-myntra-pink transition-colors relative flex items-center gap-1.5"
              >
                {cat.name}
                {cat.badge && (
                  <span className="text-[10px] uppercase font-bold text-myntra-pink bg-myntra-pinkLight px-1.5 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                )}
                {/* Active Underline indicator on hover */}
                {activeMenu === cat.key && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-myntra-pink" />
                )}
              </Link>
            </div>
          ))}
        </nav>

        {/* Live Search Bar */}
        <SearchBar />

        {/* Action Icons: Profile, Wishlist, Bag */}
        <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
          
          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <button className="flex flex-col items-center justify-center text-myntra-dark hover:text-myntra-pink transition-colors py-1">
              <User className="w-5 h-5" />
              <span className="text-[11px] font-bold mt-1 tracking-tight">Profile</span>
            </button>

            {/* Profile Menu Popover */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-lg shadow-dropdown border border-gray-100 py-3 z-50 animate-fadeIn">
                {isAuthenticated ? (
                  <div>
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
                      <p className="text-xs text-myntra-muted">Welcome back,</p>
                      <p className="text-sm font-bold text-myntra-dark truncate">{user?.name}</p>
                      <p className="text-xs text-myntra-lightMuted truncate">{user?.email}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-myntra-muted hover:text-myntra-pink hover:bg-myntra-pinkLight transition-colors"
                      >
                        <Package className="w-4 h-4 text-myntra-muted" />
                        Orders & Returns
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-myntra-muted hover:text-myntra-pink hover:bg-myntra-pinkLight transition-colors"
                      >
                        <Heart className="w-4 h-4 text-myntra-muted" />
                        Wishlist ({wishlistCount})
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-myntra-muted hover:text-myntra-pink hover:bg-myntra-pinkLight transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-myntra-muted" />
                        Saved Addresses & Profile
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-gray-100 px-4">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left py-2 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3 space-y-3">
                    <div>
                      <p className="text-sm font-bold text-myntra-dark">Welcome</p>
                      <p className="text-xs text-myntra-muted">To access wishlist, bag and track orders</p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex-1 text-center py-2 text-xs font-bold text-myntra-pink border border-myntra-pink rounded hover:bg-myntra-pink hover:text-white transition-all"
                      >
                        LOGIN
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex-1 text-center py-2 text-xs font-bold bg-myntra-pink text-white rounded hover:bg-myntra-pinkDark transition-all"
                      >
                        SIGN UP
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={handleDemoSignIn}
                        className="w-full py-2 px-3 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                        1-Click Demo Login
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="flex flex-col items-center justify-center text-myntra-dark hover:text-myntra-pink transition-colors relative py-1"
          >
            <Heart className="w-5 h-5" />
            <span className="text-[11px] font-bold mt-1 tracking-tight">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-myntra-pink text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Bag Link */}
          <Link
            to="/bag"
            className="flex flex-col items-center justify-center text-myntra-dark hover:text-myntra-pink transition-colors relative py-1"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[11px] font-bold mt-1 tracking-tight">Bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-myntra-pink text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu activeCategory={activeMenu} onClose={() => setActiveMenu(null)} />

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm h-full bg-white p-6 overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-myntra-lightMuted">
                Categories
              </div>
              {navCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-bold text-myntra-dark border-b border-gray-100"
                >
                  {cat.name}
                  <ChevronRight className="w-4 h-4 text-myntra-lightMuted" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm font-semibold text-myntra-muted"
                  >
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm font-semibold text-myntra-muted"
                  >
                    <User className="w-4 h-4" /> My Profile & Addresses
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-2 text-sm font-bold text-red-500"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      demoLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    1-Click Demo Login
                  </button>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-myntra-pink text-white text-xs font-bold rounded"
                  >
                    Login / Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
