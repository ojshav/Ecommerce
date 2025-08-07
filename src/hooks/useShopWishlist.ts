import { useCallback, useEffect, useState } from 'react';
import { useShopWishlist } from '../context/ShopWishlistContext';
import { ShopWishlistItem } from '../types/shopWishlist';

/**
 * Custom hook for managing shop-specific wishlist operations
 */
export const useShopWishlistOperations = (shopId: number) => {
  const {
    wishlistItemsByShop,
    loadingByShop,
    addToShopWishlist,
    removeFromShopWishlist,
    getShopWishlist,
    checkWishlistStatus,
    isInShopWishlist,
    getShopWishlistCount
  } = useShopWishlist();

  // Get shop-specific data
  const shopWishlistItems = wishlistItemsByShop[shopId] || [];
  const isLoading = loadingByShop[shopId] || false;
  const wishlistCount = getShopWishlistCount(shopId);

  // Load wishlist when hook is first used for a shop
  useEffect(() => {
    // Only fetch if we haven't loaded data for this shop yet
    const hasBeenLoaded = wishlistItemsByShop.hasOwnProperty(shopId);
    
    if (!hasBeenLoaded && !isLoading) {
      getShopWishlist(shopId);
    }
  }, [shopId, getShopWishlist]); // Minimal dependencies to prevent loops

  // Shop-specific operations
  const addToWishlist = useCallback(async (productId: number) => {
    return addToShopWishlist(shopId, productId);
  }, [shopId, addToShopWishlist]);

  const removeFromWishlist = useCallback(async (wishlistItemId: number) => {
    return removeFromShopWishlist(shopId, wishlistItemId);
  }, [shopId, removeFromShopWishlist]);

  const checkProductInWishlist = useCallback(async (productId: number) => {
    return checkWishlistStatus(shopId, productId);
  }, [shopId, checkWishlistStatus]);

  const isProductInWishlist = useCallback((productId: number) => {
    return isInShopWishlist(shopId, productId);
  }, [shopId, isInShopWishlist]);

  const refreshWishlist = useCallback(() => {
    return getShopWishlist(shopId);
  }, [shopId, getShopWishlist]);

  // Find wishlist item by product ID
  const getWishlistItemByProductId = useCallback((productId: number): ShopWishlistItem | null => {
    return shopWishlistItems.find(item => item.shop_product_id === productId) || null;
  }, [shopWishlistItems]);

  // Toggle product in wishlist
  const toggleProductInWishlist = useCallback(async (productId: number) => {
    const wishlistItem = getWishlistItemByProductId(productId);
    
    if (wishlistItem) {
      await removeFromWishlist(wishlistItem.wishlist_item_id);
      return false; // Removed from wishlist
    } else {
      await addToWishlist(productId);
      return true; // Added to wishlist
    }
  }, [addToWishlist, removeFromWishlist, getWishlistItemByProductId]);

  return {
    // Data
    wishlistItems: shopWishlistItems,
    wishlistCount,
    isLoading,
    
    // Operations
    addToWishlist,
    removeFromWishlist,
    toggleProductInWishlist,
    refreshWishlist,
    
    // Checks
    isProductInWishlist,
    checkProductInWishlist,
    getWishlistItemByProductId,
    
    // Shop info
    shopId
  };
};

/**
 * Custom hook for multi-shop wishlist counts
 * Useful for navigation components that show counts for multiple shops
 */
export const useMultiShopWishlistCounts = (shopIds: number[]) => {
  const { getShopWishlistCount, wishlistItemsByShop, loadingByShop, getShopWishlist } = useShopWishlist();
  const [countsLoaded, setCountsLoaded] = useState<Record<number, boolean>>({});

  // Load wishlist for shops that haven't been loaded yet
  useEffect(() => {
    shopIds.forEach(shopId => {
      if (!countsLoaded[shopId] && !loadingByShop[shopId] && !(shopId in wishlistItemsByShop)) {
        getShopWishlist(shopId);
        setCountsLoaded(prev => ({ ...prev, [shopId]: true }));
      }
    });
  }, [shopIds, countsLoaded, loadingByShop, wishlistItemsByShop, getShopWishlist]);

  // Generate counts object
  const counts = shopIds.reduce((acc, shopId) => {
    acc[shopId] = getShopWishlistCount(shopId);
    return acc;
  }, {} as Record<number, number>);

  // Check if any shop is loading
  const isLoading = shopIds.some(shopId => loadingByShop[shopId]);

  // Get total count across all shops
  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return {
    counts,
    totalCount,
    isLoading,
    
    // Individual shop operations
    getCountForShop: (shopId: number) => counts[shopId] || 0,
    isShopLoading: (shopId: number) => loadingByShop[shopId] || false
  };
};

export default useShopWishlistOperations;
