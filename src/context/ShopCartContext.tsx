import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

interface ShopCartItem {
  cart_item_id: number;
  shop_product_id: number;
  quantity: number;
  selected_attributes: { [key: number]: string | string[] };
  product: {
    name: string;
    price: number;
    original_price: number;
    special_price?: number;
    image_url: string;
    stock: number;
    is_deleted: boolean;
  };
}

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

      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/items`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shop cart items');
      }

      const data = await response.json();
      const items = data.status === 'success' ? data.data : [];
      
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
      const payload = {
        shop_product_id: shopProductId,
        quantity,
        selected_attributes: selectedAttributes
      };

      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Clear cache to force refresh
        clearCacheForShop(shopId);
        toast.success('Item added to cart');
      }
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
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/update/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update shop cart item');
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Clear cache to force refresh
        clearCacheForShop(shopId);
        toast.success('Cart updated');
      }
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
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Clear cache to force refresh
        clearCacheForShop(shopId);
        toast.success('Item removed from cart');
      }
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
      const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear shop cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        // Clear cache
        clearCacheForShop(shopId);
        toast.success('Cart cleared');
      }
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
