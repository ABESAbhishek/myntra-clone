import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    itemCount: 0,
    totalMRP: 0,
    totalDiscount: 0,
    subtotal: 0,
    deliveryFee: 0,
    convenienceFee: 20
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setCartSummary({
        itemCount: 0,
        totalMRP: 0,
        totalDiscount: 0,
        subtotal: 0,
        deliveryFee: 0,
        convenienceFee: 20
      });
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/cart');
      if (res.data.success) {
        setCartItems(res.data.items);
        setCartSummary(res.data.summary);
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToBag = async (productId, size, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, requireAuth: true, message: 'Please login to add items to your bag' };
    }
    try {
      const res = await api.post('/cart', {
        product_id: productId,
        size,
        quantity
      });
      await fetchCart();
      return res.data;
    } catch (err) {
      console.error('Add to bag error:', err);
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to add item to bag'
      };
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.put(`/cart/${cartId}`, { quantity });
      await fetchCart();
      return res.data;
    } catch (err) {
      console.error('Update quantity error:', err);
    }
  };

  const updateSize = async (cartId, size) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.put(`/cart/${cartId}`, { size });
      await fetchCart();
      return res.data;
    } catch (err) {
      console.error('Update size error:', err);
    }
  };

  const removeFromCart = async (cartId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.delete(`/cart/${cartId}`);
      await fetchCart();
      return res.data;
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  const moveToWishlist = async (cartId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.post(`/cart/move-to-wishlist/${cartId}`);
      await fetchCart();
      return res.data;
    } catch (err) {
      console.error('Move to wishlist error:', err);
    }
  };

  const applyCoupon = async (code) => {
    try {
      const res = await api.post('/coupons/validate', {
        code,
        orderAmount: cartSummary.subtotal
      });
      if (res.data.success) {
        setAppliedCoupon(res.data.coupon);
        return { success: true, message: res.data.message, coupon: res.data.coupon };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Invalid coupon code'
      };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    try {
      await api.delete('/cart');
      setCartItems([]);
      setAppliedCoupon(null);
      await fetchCart();
    } catch (err) {
      console.error('Clear cart error:', err);
    }
  };

  // Compute final payable
  const couponDiscountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalPayable = Math.max(
    0,
    cartSummary.subtotal +
    cartSummary.deliveryFee +
    (cartItems.length > 0 ? cartSummary.convenienceFee : 0) -
    couponDiscountAmount
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      cartSummary,
      itemCount: cartSummary.itemCount || 0,
      loading,
      appliedCoupon,
      couponDiscountAmount,
      finalPayable,
      addToBag,
      updateQuantity,
      updateSize,
      removeFromCart,
      moveToWishlist,
      applyCoupon,
      removeCoupon,
      clearCart,
      refetchCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
