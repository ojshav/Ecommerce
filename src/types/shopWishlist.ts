// Shop Wishlist Type Definitions
export interface ShopWishlistItem {
  wishlist_item_id: number;
  user_id: number;
  shop_id: number;
  shop_product_id: number;
  product: {
    name: string;
    sku: string;
    price: number;
    discount_pct: number;
    special_price: number | null;
    image_url: string | null;
    stock: number;
  };
  added_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface ShopWishlistResponse {
  message: string;
  data: {
    wishlist_items: ShopWishlistItem[];
    total_items: number;
  };
}

export interface ShopWishlistStatusResponse {
  message: string;
  data: {
    is_in_wishlist: boolean;
    shop_id: number;
    product_id: number;
  };
}

export interface ShopWishlistAddResponse {
  message: string;
  data: ShopWishlistItem;
}

export interface ShopWishlistRemoveResponse {
  message: string;
}

// Shop information for wishlist context
export interface ShopInfo {
  shop_id: number;
  name: string;
  description?: string;
}

// Shop wishlist context state
export interface ShopWishlistContextType {
  // Wishlist items by shop ID
  wishlistItemsByShop: Record<number, ShopWishlistItem[]>;
  
  // Loading states by shop ID
  loadingByShop: Record<number, boolean>;
  
  // Global loading state
  globalLoading: boolean;
  
  // Actions
  addToShopWishlist: (shopId: number, productId: number) => Promise<void>;
  removeFromShopWishlist: (shopId: number, wishlistItemId: number) => Promise<void>;
  getShopWishlist: (shopId: number) => Promise<void>;
  checkWishlistStatus: (shopId: number, productId: number) => Promise<boolean>;
  isInShopWishlist: (shopId: number, productId: number) => boolean;
  getShopWishlistCount: (shopId: number) => number;
  
  // Clear shop wishlist from state (for logout etc.)
  clearShopWishlist: (shopId: number) => void;
  
  // Clear all shop wishlists from state
  clearAllShopWishlists: () => void;
}

// Error types
export interface ShopWishlistError {
  message: string;
  status?: number;
  shopId?: number;
  productId?: number;
}
