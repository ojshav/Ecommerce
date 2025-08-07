const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

export interface ShopCartItem {
  cart_item_id: number;
  shop_product_id: number;
  quantity: number;
  selected_attributes: { [key: number]: string | string[] };
  product: {
    id: number;
    name: string;
    price: number;
    original_price: number;
    special_price: number | null;
    image_url: string;
    stock: number;
    is_deleted: boolean;
  };
}

export interface ShopCart {
  cart_id: number;
  user_id: number;
  shop_id: number;
  items: ShopCartItem[];
}

export const shopCartService = {
  // Get shop cart
  async getShopCart(shopId: number, accessToken: string): Promise<ShopCart> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get shop cart');
    }

    const data = await response.json();
    return data.data;
  },

  // Get shop cart items
  async getShopCartItems(shopId: number, accessToken: string): Promise<ShopCartItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/items`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get shop cart items');
    }

    const data = await response.json();
    return data.data;
  },

  // Add item to shop cart
  async addToShopCart(
    shopId: number,
    shopProductId: number,
    quantity: number,
    selectedAttributes: { [key: number]: string | string[] } = {},
    accessToken: string
  ): Promise<ShopCart> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shop_product_id: shopProductId,
        quantity,
        selected_attributes: selectedAttributes
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add item to shop cart');
    }

    const data = await response.json();
    return data.data;
  },

  // Update cart item quantity
  async updateShopCartItem(
    shopId: number,
    cartItemId: number,
    quantity: number,
    accessToken: string
  ): Promise<ShopCartItem> {
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
      throw new Error(errorData.message || 'Failed to update cart item');
    }

    const data = await response.json();
    return data.data;
  },

  // Remove item from shop cart
  async removeFromShopCart(
    shopId: number,
    cartItemId: number,
    accessToken: string
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/remove/${cartItemId}`, {
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
  },

  // Clear shop cart
  async clearShopCart(shopId: number, accessToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/${shopId}/clear`, {
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
  },

  // Get all user carts across shops
  async getUserShopCarts(accessToken: string): Promise<ShopCart[]> {
    const response = await fetch(`${API_BASE_URL}/api/shop-cart/user/carts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get user carts');
    }

    const data = await response.json();
    return data.data;
  }
};
