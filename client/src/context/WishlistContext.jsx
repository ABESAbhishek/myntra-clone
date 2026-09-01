import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistItems([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/wishlist');
      if (res.data.success) {
        setWishlistItems(res.data.items);
      }
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = (productId) => {
    const numId = Number(productId);
    return wishlistItems.some(item => item.product_id === numId);
  };

  const toggleWishlist = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, requireAuth: true, message: 'Please login to save items to your wishlist' };
    }
    try {
      const res = await api.post('/wishlist/toggle', { product_id: productId });
      await fetchWishlist();
      return res.data;
    } catch (err) {
      console.error('Error toggling wishlist', err);
      return { success: false, message: 'Failed to update wishlist' };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;
    try {
      await api.delete(`/wishlist/${productId}`);
      await fetchWishlist();
    } catch (err) {
      console.error('Error removing from wishlist', err);
    }
  };

  const moveToBag = async (productId, size) => {
    if (!isAuthenticated) return { success: false, requireAuth: true };
    try {
      const res = await api.post('/wishlist/move-to-bag', { product_id: productId, size });
      await fetchWishlist();
      return res.data;
    } catch (err) {
      console.error('Error moving to bag', err);
      return { success: false, message: 'Failed to move to bag' };
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      loading,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      moveToBag,
      refetchWishlist: fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
