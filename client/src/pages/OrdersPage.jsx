import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, XCircle, ChevronRight, AlertCircle, ShoppingBag } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const res = await api.get('/orders');
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      setCancellingId(orderId);
      const res = await api.patch(`/orders/${orderId}/cancel`);
      if (res.data.success) {
        await fetchOrders();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancellingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-myntra-pink mx-auto flex items-center justify-center mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          PLEASE LOG IN
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          Login to view and track your orders
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

  if (orders.length === 0 && !loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <div className="w-20 h-20 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-lg font-extrabold text-myntra-dark mb-1">
          YOU HAVE NO ORDERS YET
        </h2>
        <p className="text-xs text-myntra-muted mb-6">
          Explore our wide range of fashion collections and place your first order today!
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-myntra-pink text-white text-xs font-extrabold uppercase tracking-wider rounded shadow-md hover:bg-myntra-pinkDark transition-all"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="pb-4 border-b border-gray-200 mb-6">
        <h1 className="text-lg font-extrabold text-myntra-dark uppercase tracking-wider">
          My Orders <span className="font-normal text-myntra-muted">({orders.length})</span>
        </h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const isCancelled = order.order_status === 'Cancelled';
          const isDelivered = order.order_status === 'Delivered';

          const steps = [
            { label: 'Placed', isReached: true },
            { label: 'Packed', isReached: order.order_status !== 'Placed' && !isCancelled },
            { label: 'Shipped', isReached: (order.order_status === 'Shipped' || order.order_status === 'Delivered') && !isCancelled },
            { label: 'Delivered', isReached: isDelivered }
          ];

          return (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-card transition-shadow"
            >
              {/* Order Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-[11px] text-myntra-muted">
                    Order Placed: <strong className="text-myntra-dark">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                  </p>
                  <p className="font-mono text-myntra-dark font-extrabold text-xs">
                    {order.order_number}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase flex items-center gap-1 ${
                    isCancelled
                      ? 'bg-red-100 text-red-700'
                      : isDelivered
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isCancelled ? <XCircle className="w-3.5 h-3.5" /> : isDelivered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {order.order_status}
                  </span>
                  <span className="font-extrabold text-sm text-myntra-dark">₹{order.final_amount}</span>
                </div>
              </div>

              {/* Order Tracking Progress Stepper (if not cancelled) */}
              {!isCancelled && (
                <div className="px-6 py-4 bg-white border-b border-gray-100">
                  <div className="relative flex justify-between items-center max-w-lg mx-auto">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                    {steps.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          step.isReached
                            ? 'bg-teal-600 text-white shadow-sm ring-4 ring-teal-50'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.isReached ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[10px] font-bold mt-1.5 uppercase ${
                          step.isReached ? 'text-teal-800' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="p-4 divide-y divide-gray-100 space-y-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="pt-3 first:pt-0 flex items-center gap-4 text-xs">
                    <Link to={`/product/${item.product_id}`} className="w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-myntra-dark truncate">{item.brand}</h4>
                      <p className="text-myntra-muted truncate text-[11px]">{item.title}</p>
                      <p className="text-myntra-lightMuted text-[10px] mt-1">
                        Size: <strong className="text-myntra-dark">{item.size}</strong> &bull; Qty: <strong className="text-myntra-dark">{item.quantity}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-myntra-dark text-sm">₹{item.price * item.quantity}</p>
                      <Link
                        to={`/product/${item.product_id}`}
                        className="text-[11px] font-bold text-myntra-pink hover:underline block mt-1"
                      >
                        Buy Again
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer with Delivery Address and Cancel Action */}
              <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="text-myntra-muted text-[11px]">
                  <span>Delivery to: <strong>{order.address?.name}</strong>, {order.address?.city} ({order.address?.pincode})</span>
                  <span className="block text-teal-700 font-bold mt-0.5">{order.delivery_date}</span>
                </div>

                {!isCancelled && !isDelivered && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingId === order.id}
                    className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold rounded transition-colors"
                  >
                    {cancellingId === order.id ? 'Cancelling...' : 'Cancel Order'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
