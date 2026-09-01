import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import CartItemRow from '../components/bag/CartItemRow';
import PriceBreakup from '../components/bag/PriceBreakup';
import AddressModal from '../components/checkout/AddressModal';

const BagPage = () => {
  const { cartItems, loading, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchDefaultAddress = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/addresses');
      if (res.data.success && res.data.addresses.length > 0) {
        const def = res.data.addresses.find(a => a.is_default) || res.data.addresses[0];
        setDefaultAddress(def);
      }
    } catch (err) {
      console.error('Error fetching address for bag', err);
    }
  };

  useEffect(() => {
    fetchDefaultAddress();
  }, [isAuthenticated]);

  const handleProceed = () => {
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-myntra-pink mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          PLEASE LOG IN
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          Login to view items in your bag and explore personalized offers
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

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          Hey, your bag feels so light!
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          There is nothing in your bag. Let's add some items.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wishlist"
            className="px-6 py-3 border border-myntra-pink text-myntra-pink hover:bg-myntra-pink hover:text-white text-xs font-extrabold uppercase tracking-wider rounded transition-all"
          >
            ADD FROM WISHLIST
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 bg-myntra-pink text-white hover:bg-myntra-pinkDark text-xs font-extrabold uppercase tracking-wider rounded shadow-md transition-all"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Step Indicator Header */}
      <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest text-myntra-muted pb-8 border-b border-gray-200 mb-8">
        <span className="text-myntra-pink border-b-2 border-myntra-pink pb-1">1. BAG</span>
        <span className="text-gray-300">----------</span>
        <span>2. ADDRESS</span>
        <span className="text-gray-300">----------</span>
        <span>3. PAYMENT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery Address Bar + Cart Items */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Deliver To Address Strip */}
          <div className="p-3.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 text-xs min-w-0">
              <MapPin className="w-4 h-4 text-myntra-pink flex-shrink-0" />
              <div className="truncate">
                {defaultAddress ? (
                  <p className="text-myntra-dark truncate">
                    Deliver to: <strong className="font-bold">{defaultAddress.name}, {defaultAddress.pincode}</strong>
                    <span className="text-myntra-muted block text-[11px] truncate">{defaultAddress.address_line}</span>
                  </p>
                ) : (
                  <p className="text-myntra-muted">No delivery address selected</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="px-3 py-1.5 border border-myntra-pink text-myntra-pink text-xs font-bold rounded hover:bg-myntra-pinkLight transition-colors flex-shrink-0"
            >
              {defaultAddress ? 'CHANGE' : 'ADD ADDRESS'}
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Add More from Wishlist CTA */}
          <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold text-myntra-dark">
              <Heart className="w-4 h-4 text-myntra-pink" />
              <span>Add More From Wishlist</span>
            </div>
            <Link
              to="/wishlist"
              className="text-myntra-pink font-extrabold hover:underline"
            >
              VIEW WISHLIST &rarr;
            </Link>
          </div>

        </div>

        {/* Right Column: Price Summary & Checkout Action */}
        <div className="lg:col-span-5 sticky top-24">
          <PriceBreakup onProceed={handleProceed} buttonText="PLACE ORDER" />
        </div>

      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSaved={fetchDefaultAddress}
      />
    </div>
  );
};

export default BagPage;
