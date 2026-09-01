import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../api/client';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if canvas is not available
    }

    if (!order) {
      // Fetch order by number/id
      api.get('/orders')
        .then((res) => {
          if (res.data.success) {
            const found = res.data.orders.find(o => o.order_number === orderNumber);
            if (found) setOrder(found);
          }
        })
        .catch(err => console.error('Error fetching order', err))
        .finally(() => setLoading(false));
    }
  }, [order, orderNumber]);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-myntra-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 select-none">
      
      {/* Header Success Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center shadow-lg space-y-4">
        <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center shadow-sm animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Placed Successfully!
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-myntra-dark">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-myntra-muted mt-1">
            Order ID: <strong className="font-mono text-myntra-dark font-extrabold">{orderNumber}</strong>
          </p>
        </div>

        {/* Expected Delivery Banner */}
        <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl flex items-center justify-center gap-3 text-xs text-teal-900 font-bold">
          <Truck className="w-5 h-5 text-teal-600 flex-shrink-0" />
          <span>{order?.delivery_date || 'Expected delivery in 3-4 business days'}</span>
        </div>

        {/* Ordered Items List */}
        {order?.items && order.items.length > 0 && (
          <div className="text-left pt-4 border-t border-gray-100 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-myntra-dark">
              Items in this Order ({order.items.length})
            </p>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 bg-white flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-myntra-dark truncate">{item.brand}</h4>
                    <p className="text-myntra-muted truncate text-[11px]">{item.title}</p>
                    <p className="text-myntra-lightMuted text-[10px] mt-0.5">
                      Size: <strong className="text-myntra-dark">{item.size}</strong> &bull; Qty: <strong className="text-myntra-dark">{item.quantity}</strong>
                    </p>
                  </div>
                  <div className="font-extrabold text-myntra-dark">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Address & Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs pt-4 border-t border-gray-100">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-bold text-myntra-dark mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-myntra-pink" /> Delivery Address
            </p>
            {order?.address && (
              <p className="text-myntra-muted leading-relaxed">
                <strong className="text-myntra-dark">{order.address.name}</strong><br />
                {order.address.address_line}, {order.address.locality}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
            )}
          </div>

          <div className="p-3 bg-gray-50 rounded-lg space-y-1">
            <p className="font-bold text-myntra-dark mb-1 flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-myntra-pink" /> Payment Summary
            </p>
            <p className="text-myntra-muted flex justify-between">
              <span>Payment Mode:</span>
              <strong className="text-myntra-dark">{order?.payment_method || 'UPI'}</strong>
            </p>
            <p className="text-myntra-muted flex justify-between">
              <span>Total Amount Paid:</span>
              <strong className="text-myntra-dark font-extrabold text-sm">₹{order?.final_amount}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Package className="w-4 h-4" />
            TRACK IN MY ORDERS
          </Link>
          <Link
            to="/products"
            className="px-6 py-3 bg-myntra-pink hover:bg-myntra-pinkDark text-white text-xs font-extrabold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            CONTINUE SHOPPING
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPage;
