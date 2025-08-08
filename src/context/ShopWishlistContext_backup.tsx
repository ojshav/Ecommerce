import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
  // Simplified state management - no loadedShops tracking
  const [wishlistItemsByShop, setWishlistItemsByShop] = useState<Record<number, ShopWishlistItem[]>>({});
  const [loadingByShop, setLoadingByShop] = useState<Record<number, boolean>>({});
  const [globalLoading, setGlobalLoading] = useState(false);
  
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
      throw error; // Re-throw to allow component-level error handling
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
   * Get shop wishlist items
   */
  const getShopWishlist = useCallback(async (shopId: number, forceRefresh = false) => {
    if (!canPerformWishlistOperations()) return;

    // Skip if already loaded and not forcing refresh
    if (!forceRefresh && loadedShops.has(shopId)) {
      return;
    }

    try {
      setShopLoading(shopId, true);
      
      const items = await shopWishlistService.getShopWishlist(shopId);
      
      setWishlistItemsByShop(prev => ({
        ...prev,
        [shopId]: items
      }));
      
      // Mark this shop as loaded
      setLoadedShops(prev => new Set([...prev, shopId]));
    } catch (error) {
      handleError(error as ShopWishlistError, 'fetch wishlist');
      // Don't throw here as this is used in useEffect
    } finally {
      setShopLoading(shopId, false);
    }
  }, [canPerformWishlistOperations, setShopLoading, handleError, loadedShops]);

  /**
   * Check if product is in shop wishlist
   */
  const checkWishlistStatus = useCallback(async (shopId: number, productId: number): Promise<boolean> => {
    if (!canPerformWishlistOperations()) return false;

    try {
      return await shopWishlistService.checkWishlistStatus(shopId, productId);
    } catch (error) {
      console.warn(`Failed to check wishlist status for shop ${shopId}, product ${productId}:`, error);
      return false;
    }
  }, [canPerformWishlistOperations]);

  /**
   * Check if product is in shop wishlist (from local state)
   */
  const isInShopWishlist = useCallback((shopId: number, productId: number): boolean => {
    const shopItems = wishlistItemsByShop[shopId];
    if (!shopItems || shopItems.length === 0) {
      return false;
    }
    return shopItems.some(item => item.shop_product_id === productId);
  }, [wishlistItemsByShop]);

  /**
   * Get shop wishlist count
   */
  const getShopWishlistCount = useCallback((shopId: number): number => {
    return (wishlistItemsByShop[shopId] || []).length;
  }, [wishlistItemsByShop]);

  /**
   * Check if shop wishlist has been loaded
   */
  const isShopLoaded = useCallback((shopId: number): boolean => {
    return loadedShops.has(shopId);
  }, [loadedShops]);

  /**
   * Clear shop wishlist from state
   */
  const clearShopWishlist = useCallback((shopId: number) => {
    setWishlistItemsByShop(prev => {
      const updated = { ...prev };
      delete updated[shopId];
      return updated;
    });
    
    setLoadingByShop(prev => {
      const updated = { ...prev };
      delete updated[shopId];
      return updated;
    });

    // Remove from loaded shops
    setLoadedShops(prev => {
      const updated = new Set(prev);
      updated.delete(shopId);
      return updated;
    });
  }, []);

  /**
   * Clear all shop wishlists from state
   */
  const clearAllShopWishlists = useCallback(() => {
    setWishlistItemsByShop({});
    setLoadingByShop({});
    setLoadedShops(new Set());
    setGlobalLoading(false);
  }, []);

  /**
   * Initialize/clear wishlists based on auth state
   */
  useEffect(() => {
    if (!accessToken || !user || user.role !== 'customer') {
      clearAllShopWishlists();
    }
  }, [accessToken, user, clearAllShopWishlists]);

  /**
   * Context value
   */
  const contextValue: ShopWishlistContextType = {
    wishlistItemsByShop,
    loadingByShop,
    globalLoading,
    addToShopWishlist,
    removeFromShopWishlist,
    getShopWishlist,
    checkWishlistStatus,
    isInShopWishlist,
    getShopWishlistCount,
    clearShopWishlist,
    clearAllShopWishlists
  };

  return (
    <ShopWishlistContext.Provider value={contextValue}>
      {children}
    </ShopWishlistContext.Provider>
  );
};

/**
 * Hook to use shop wishlist context
 */
export const useShopWishlist = (): ShopWishlistContextType => {
  const context = useContext(ShopWishlistContext);
  if (context === undefined) {
    throw new Error('useShopWishlist must be used within a ShopWishlistProvider');
  }
  return context;
};

export default ShopWishlistContext;
