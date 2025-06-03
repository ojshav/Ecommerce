import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash if present

interface WishlistItem {
  wishlist_item_id: number;
  product_id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    stock: number;
    is_deleted: boolean;
  };
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (wishlistItemId: number) => Promise<void>;
  clearWishlist: () => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, user } = useAuth();

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    if (!accessToken || user?.role !== 'customer') {
      setWishlistItems([]);
      setLoading(false);
      return;
    }
    
    try {
      console.log('Fetching wishlist items...');
      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }

      const data = await response.json();
      console.log('Wishlist API Response:', data);

      if (data.status === 'success') {
        setWishlistItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist when auth token or user role changes
  useEffect(() => {
    if (accessToken && user?.role === 'customer') {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [accessToken, user?.role]);

  const addToWishlist = async (productId: number) => {
    if (!accessToken || user?.role !== 'customer') {
      toast.error('Only customers can add items to wishlist');
      return;
    }

    try {
      const payload = {
        product_id: productId
      };

      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to wishlist');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchWishlist();
        toast.success('Product added to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add item to wishlist');
      throw error;
    }
  };

  const removeFromWishlist = async (wishlistItemId: number) => {
    if (!accessToken || user?.role !== 'customer') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/${wishlistItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from wishlist');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchWishlist();
        toast.success('Item removed from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove item from wishlist');
      throw error;
    }
  };

  const clearWishlist = async () => {
    if (!accessToken || user?.role !== 'customer') return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear wishlist');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setWishlistItems([]);
        toast.success('Wishlist cleared');
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to clear wishlist');
      throw error;
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      loading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 