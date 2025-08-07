import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { shopCartService, ShopCartItem } from '../services/shopCartService';

interface ShopCartContextType {
  // Shop cart operations
  getShopCartItems: (shopId: number) => Promise<ShopCartItem[]>;
  addToShopCart: (shopId: number, shopProductId: number, quantity?: number, selectedAttributes?: { [key: number]: string | string[] }) => Promise<void>;
  updateShopCartItem: (shopId: number, cartItemId: number, quantity: number) => Promise<void>;
  removeFromShopCart: (shopId: number, cartItemId: number) => Promise<void>;
  clearShopCart: (shopId: number) => Promise<void>;
  
  // Shop cart state
  getShopCartCount: (shopId: number) => Promise<number>;
  isItemInShopCart: (shopId: number, shopProductId: number) => Promise<boolean>;
  
  // Utility functions
  canPerformShopCartOperations: () => boolean;
}

const ShopCartContext = createContext<ShopCartContextType | undefined>(undefined);

export const ShopCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, accessToken } = useAuth();
  
  // Cache for cart data to avoid excessive API calls
  const [cartCache, setCartCache] = useState<{ [shopId: number]: { items: ShopCartItem[], timestamp: number } }>({});
  
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const canPerformShopCartOperations = useCallback((): boolean => {
    return !!(user && accessToken && user.role === 'customer');
  }, [user, accessToken]);

  const clearCacheForShop = useCallback((shopId: number) => {
    setCartCache(prev => {
      const newCache = { ...prev };
      delete newCache[shopId];
      return newCache;
    });
  }, []);

  const isCacheValid = useCallback((shopId: number): boolean => {
    const cached = cartCache[shopId];
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }, [cartCache]);

  const getShopCartItems = useCallback(async (shopId: number): Promise<ShopCartItem[]> => {
    if (!canPerformShopCartOperations()) {
      return [];
    }

    try {
      // Check cache first
      if (isCacheValid(shopId)) {
        return cartCache[shopId].items;
      }

      const items = await shopCartService.getShopCartItems(shopId, accessToken!);
      
      // Update cache
      setCartCache(prev => ({
        ...prev,
        [shopId]: {
          items,
          timestamp: Date.now()
        }
      }));
      
      return items;
    } catch (error) {
      console.error(`Error getting shop ${shopId} cart items:`, error);
      return [];
    }
  }, [canPerformShopCartOperations, accessToken, cartCache, isCacheValid]);

  const addToShopCart = useCallback(async (
    shopId: number, 
    shopProductId: number, 
    quantity: number = 1, 
    selectedAttributes: { [key: number]: string | string[] } = {}
  ) => {
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      await shopCartService.addToShopCart(shopId, shopProductId, quantity, selectedAttributes, accessToken!);
      
      // Clear cache to force refresh
      clearCacheForShop(shopId);
      
      toast.success('Item added to cart');
    } catch (error) {
      console.error(`Error adding item to shop ${shopId} cart:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to add item to cart');
      throw error;
    }
  }, [canPerformShopCartOperations, accessToken, clearCacheForShop]);

  const updateShopCartItem = useCallback(async (shopId: number, cartItemId: number, quantity: number) => {
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to update cart');
      return;
    }

    try {
      await shopCartService.updateShopCartItem(shopId, cartItemId, quantity, accessToken!);
      
      // Clear cache to force refresh
      clearCacheForShop(shopId);
      
      toast.success('Cart updated');
    } catch (error) {
      console.error(`Error updating shop ${shopId} cart item:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to update cart item');
      throw error;
    }
  }, [canPerformShopCartOperations, accessToken, clearCacheForShop]);

  const removeFromShopCart = useCallback(async (shopId: number, cartItemId: number) => {
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to remove items from cart');
      return;
    }

    try {
      await shopCartService.removeFromShopCart(shopId, cartItemId, accessToken!);
      
      // Clear cache to force refresh
      clearCacheForShop(shopId);
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error(`Error removing item from shop ${shopId} cart:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove item from cart');
      throw error;
    }
  }, [canPerformShopCartOperations, accessToken, clearCacheForShop]);

  const clearShopCart = useCallback(async (shopId: number) => {
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to clear cart');
      return;
    }

    try {
      await shopCartService.clearShopCart(shopId, accessToken!);
      
      // Clear cache
      clearCacheForShop(shopId);
      
      toast.success('Cart cleared');
    } catch (error) {
      console.error(`Error clearing shop ${shopId} cart:`, error);
      toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
      throw error;
    }
  }, [canPerformShopCartOperations, accessToken, clearCacheForShop]);

  const getShopCartCount = useCallback(async (shopId: number): Promise<number> => {
    try {
      const items = await getShopCartItems(shopId);
      return items.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error(`Error getting shop ${shopId} cart count:`, error);
      return 0;
    }
  }, [getShopCartItems]);

  const isItemInShopCart = useCallback(async (shopId: number, shopProductId: number): Promise<boolean> => {
    try {
      const items = await getShopCartItems(shopId);
      return items.some(item => item.shop_product_id === shopProductId);
    } catch (error) {
      console.error(`Error checking if item is in shop ${shopId} cart:`, error);
      return false;
    }
  }, [getShopCartItems]);

  const value: ShopCartContextType = {
    getShopCartItems,
    addToShopCart,
    updateShopCartItem,
    removeFromShopCart,
    clearShopCart,
    getShopCartCount,
    isItemInShopCart,
    canPerformShopCartOperations
  };

  return (
    <ShopCartContext.Provider value={value}>
      {children}
    </ShopCartContext.Provider>
  );
};

export const useShopCartOperations = (): ShopCartContextType => {
  const context = useContext(ShopCartContext);
  if (context === undefined) {
    throw new Error('useShopCartOperations must be used within a ShopCartProvider');
  }
  return context;
};
