import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash if present

// Currency formatter for INR
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  formattedTotalPrice: string;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  
  // Calculate derived values
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const formattedTotalPrice = formatCurrency(totalPrice);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!accessToken) return;
    
    try {
      console.log('Fetching cart items...');
      const response = await fetch(`${API_BASE_URL}/api/cart/items`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const data = await response.json();
      console.log('Cart API Response:', data);

      if (data.status === 'success') {
        const formattedCart = data.data.map((item: any) => {
          console.log('Processing cart item:', item);
          console.log('Product image URL:', item.product?.image_url);
          
          return {
            cart_item_id: item.cart_item_id,
            quantity: item.quantity,
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              image_url: item.product.image_url,
              stock: item.product.stock,
              is_deleted: item.product.is_deleted
            }
          };
        });

        console.log('Formatted cart items:', formattedCart);
        setCart(formattedCart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Load cart when auth token changes
  useEffect(() => {
    if (accessToken) {
      fetchCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [accessToken]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (!accessToken) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      console.log('Adding product to cart:', product);
      const payload = {
        product_id: product.id,
        quantity
      };

      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      const data = await response.json();
      console.log('Add to cart response:', data);
      
      if (data.status === 'success') {
        await fetchCart(); // Refresh cart after adding item
        toast.success(`${product.name} added to cart`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to add item to cart');
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/remove/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchCart(); // Refresh cart after removing item
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to remove item from cart');
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/update/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart item');
      }

      const data = await response.json();
      if (data.status === 'success') {
        await fetchCart(); // Refresh cart after updating quantity
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update cart item');
    }
  };

  const clearCart = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to clear cart');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setCart([]);
        toast.success('Cart cleared');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to clear cart');
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      formattedTotalPrice,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};