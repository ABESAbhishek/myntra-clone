import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Plus, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PaymentSelector from '../components/checkout/PaymentSelector';
import AddressModal from '../components/checkout/AddressModal';
import PriceBreakup from '../components/bag/PriceBreakup';

const CheckoutPage = () => {
  const { cartItems, cartSummary, appliedCoupon, couponDiscountAmount, finalPayable, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/addresses');
      if (res.data.success) {
        setAddresses(res.data.addresses);
        if (res.data.addresses.length > 0 && !selectedAddressId) {
          const defaultAddr = res.data.addresses.find(a => a.is_default) || res.data.addresses[0];
          setSelectedAddressId(defaultAddr.id);
        }
      }
    } catch (err) {
      console.error('Error fetching checkout addresses', err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (cartItems.length === 0) {
      navigate('/bag');
    }
  }, [isAuthenticated, cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setErrorMsg('Please select or add a delivery address.');
      return;
    }

    try {
      setIsPlacingOrder(true);
      setErrorMsg('');

      const res = await api.post('/orders', {
        address_id: selectedAddressId,
        payment_method: selectedPaymentMethod,
        coupon_code: appliedCoupon ? appliedCoupon.code : null,
        coupon_discount: couponDiscountAmount
      });

      if (res.data.success) {
        navigate(`/order-success/${res.data.order.order_number}`, {
          state: { order: res.data.order }
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Checkout Stepper */}
      <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest pb-8 border-b border-gray-200 mb-8">
        <Link to="/bag" className="text-teal-700 flex items-center gap-1 hover:underline">
          <CheckCircle2 className="w-3.5 h-3.5" /> 1. BAG
        </Link>
        <span className="text-gray-300">----------</span>
        <span className="text-myntra-pink border-b-2 border-myntra-pink pb-1">2. ADDRESS & PAYMENT</span>
        <span className="text-gray-300">----------</span>
        <span className="text-gray-400">3. CONFIRMATION</span>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Address Selection + Payment Options */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Address Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-myntra-dark flex items-center gap-2">
                <MapPin className="w-4 h-4 text-myntra-pink" />
                Select Delivery Address
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="text-xs font-bold text-myntra-pink hover:text-myntra-pinkDark flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> ADD NEW ADDRESS
              </button>
            </div>

            {/* Address Cards Grid */}
            <div className="space-y-3">
              {addresses.map((addr) => (
                <label
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'border-myntra-pink bg-myntra-pinkLight/40 ring-1 ring-myntra-pink shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="addressSelection"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-1 text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
                  />
                  <div className="flex-1 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-myntra-dark">{addr.name}</span>
                      <span className="px-1.5 py-0.5 bg-gray-200 text-gray-800 text-[10px] font-bold rounded uppercase">
                        {addr.type}
                      </span>
                      {addr.is_default && (
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-myntra-muted">{addr.address_line}, {addr.locality}</p>
                    <p className="text-myntra-muted">{addr.city}, {addr.state} - <strong className="text-myntra-dark font-bold">{addr.pincode}</strong></p>
                    <p className="text-myntra-dark font-semibold mt-1">Mobile: {addr.phone}</p>
                  </div>
                </label>
              ))}

              {addresses.length === 0 && (
                <div className="text-center py-6 text-xs text-myntra-muted">
                  <p>No saved addresses found.</p>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="mt-2 px-4 py-2 bg-myntra-pink text-white font-bold rounded text-xs"
                  >
                    Add Delivery Address
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. Payment Section */}
          <PaymentSelector
            selectedMethod={selectedPaymentMethod}
            onSelectMethod={setSelectedPaymentMethod}
            amount={finalPayable}
          />

        </div>

        {/* Right: Order Summary & Place Order */}
        <div className="lg:col-span-5 sticky top-24">
          <PriceBreakup
            onProceed={handlePlaceOrder}
            buttonText={isPlacingOrder ? 'PROCESSING ORDER...' : `PAY & PLACE ORDER (₹${finalPayable})`}
            isProceedDisabled={isPlacingOrder || !selectedAddressId}
          />
        </div>

      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSaved={fetchAddresses}
      />
    </div>
  );
};

export default CheckoutPage;
