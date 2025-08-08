import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import {
  ShopWishlistContextType,
  ShopWishlistItem,
  ShopWishlistError
} from '../types/shopWishlist';
import shopWishlistService from '../services/shopWishlistService';

const ShopWishlistContext = createContext<ShopWishlistContextType | undefined>(undefined);

export const ShopWishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Simplified state management
  const [wishlistItemsByShop, setWishlistItemsByShop] = useState<Record<number, ShopWishlistItem[]>>({});
  const [loadingByShop, setLoadingByShop] = useState<Record<number, boolean>>({});
  
  const { accessToken, user } = useAuth();

  /**
   * Set loading state for a specific shop
   */
  const setShopLoading = useCallback((shopId: number, loading: boolean) => {
    setLoadingByShop(prev => ({
      ...prev,
      [shopId]: loading
    }));
  }, []);

  /**
   * Handle errors consistently
   */
  const handleError = useCallback((error: ShopWishlistError, operation: string) => {
    console.error(`Shop Wishlist Error (${operation}):`, error);
    toast.error(error.message || `Failed to ${operation}`);
  }, []);

  /**
   * Check if user can perform wishlist operations
   */
  const canPerformWishlistOperations = useCallback(() => {
    if (!accessToken || !user) {
      toast.error('Please sign in to manage your wishlist');
      return false;
    }

    if (user.role !== 'customer') {
      toast.error('Only customers can manage wishlists');
      return false;
    }

    return true;
  }, [accessToken, user]);

  /**
   * Add product to shop wishlist
   */
  const addToShopWishlist = useCallback(async (shopId: number, productId: number) => {
    if (!canPerformWishlistOperations()) return;

    try {
      setShopLoading(shopId, true);
      
      const newItem = await shopWishlistService.addToWishlist(shopId, productId);
      
      setWishlistItemsByShop(prev => ({
        ...prev,
        [shopId]: [...(prev[shopId] || []), newItem]
      }));

      toast.success('Product added to wishlist');
    } catch (error) {
      handleError(error as ShopWishlistError, 'add product to wishlist');
      throw error;
    } finally {
      setShopLoading(shopId, false);
    }
  }, [canPerformWishlistOperations, setShopLoading, handleError]);

  /**
   * Remove product from shop wishlist
   */
  const removeFromShopWishlist = useCallback(async (shopId: number, wishlistItemId: number) => {
    if (!canPerformWishlistOperations()) return;

    try {
      setShopLoading(shopId, true);
      
      await shopWishlistService.removeFromWishlist(shopId, wishlistItemId);
      
      setWishlistItemsByShop(prev => ({
        ...prev,
        [shopId]: (prev[shopId] || []).filter(item => item.wishlist_item_id !== wishlistItemId)
      }));

      toast.success('Product removed from wishlist');
    } catch (error) {
      handleError(error as ShopWishlistError, 'remove product from wishlist');
      throw error;
    } finally {
      setShopLoading(shopId, false);
    }
  }, [canPerformWishlistOperations, setShopLoading, handleError]);

  /**
   * Get shop wishlist - simplified
   */
  const getShopWishlist = useCallback(async (shopId: number) => {
    if (!canPerformWishlistOperations()) return;

    try {
      setShopLoading(shopId, true);
      
      const wishlistItems = await shopWishlistService.getShopWishlist(shopId);
      
      setWishlistItemsByShop(prev => ({
        ...prev,
        [shopId]: wishlistItems
      }));
    } catch (error) {
      handleError(error as ShopWishlistError, 'fetch wishlist');
    } finally {
      setShopLoading(shopId, false);
    }
  }, [canPerformWishlistOperations, setShopLoading, handleError]);

  /**
   * Check if product is in shop wishlist
   */
  const isInShopWishlist = useCallback((shopId: number, productId: number): boolean => {
    const shopWishlist = wishlistItemsByShop[shopId] || [];
    return shopWishlist.some(item => item.shop_product_id === productId);
  }, [wishlistItemsByShop]);

  /**
   * Get wishlist item by product ID
   */
  const getWishlistItemByProductId = useCallback((shopId: number, productId: number): ShopWishlistItem | undefined => {
    const shopWishlist = wishlistItemsByShop[shopId] || [];
    return shopWishlist.find(item => item.shop_product_id === productId);
  }, [wishlistItemsByShop]);

  /**
   * Check wishlist status
   */
  const checkWishlistStatus = useCallback(async (shopId: number, productId: number): Promise<boolean> => {
    try {
      return await shopWishlistService.checkWishlistStatus(shopId, productId);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  }, []);

  /**
   * Get shop wishlist count
   */
  const getShopWishlistCount = useCallback((shopId: number): number => {
    return wishlistItemsByShop[shopId]?.length || 0;
  }, [wishlistItemsByShop]);

  /**
   * Clear shop wishlist
   */
  const clearShopWishlist = useCallback((shopId: number) => {
    setWishlistItemsByShop(prev => {
      const newState = { ...prev };
      delete newState[shopId];
      return newState;
    });
    setLoadingByShop(prev => {
      const newState = { ...prev };
      delete newState[shopId];
      return newState;
    });
  }, []);

  /**
   * Clear all wishlists
   */
  const clearAllShopWishlists = useCallback(() => {
    setWishlistItemsByShop({});
    setLoadingByShop({});
  }, []);

  const contextValue: ShopWishlistContextType = {
    // State
    wishlistItemsByShop,
    loadingByShop,
    globalLoading: false,

    // Actions
    addToShopWishlist,
    removeFromShopWishlist,
    getShopWishlist,
    checkWishlistStatus,
    isInShopWishlist,
    getShopWishlistCount,

    // Utilities
    clearShopWishlist,
    clearAllShopWishlists
  };

  return (
    <ShopWishlistContext.Provider value={contextValue}>
      {children}
    </ShopWishlistContext.Provider>
  );
};

export const useShopWishlist = (): ShopWishlistContextType => {
  const context = useContext(ShopWishlistContext);
  if (!context) {
    throw new Error('useShopWishlist must be used within a ShopWishlistProvider');
  }
  return context;
};
