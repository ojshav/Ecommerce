import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopWishlistOperations } from '../../../hooks/useShopWishlist';
import { useAuth } from '../../../context/AuthContext';

interface ShopWishlistIconProps {
  shopId: number;
  className?: string;
  iconSize?: number;
  showCount?: boolean;
  href?: string;
}

/**
 * Shop-specific wishlist icon with count
 * Shows wishlist count for a specific shop
 */
const ShopWishlistIcon: React.FC<ShopWishlistIconProps> = ({ 
  shopId, 
  className = "", 
  iconSize = 20,
  showCount = true,
  href
}) => {
  const { isAuthenticated, user } = useAuth();
  const { wishlistCount, isLoading } = useShopWishlistOperations(shopId);

  // Don't show wishlist for non-customers
  if (!isAuthenticated || user?.role !== 'customer') {
    return null;
  }

  const content = (
    <div className={`relative flex items-center ${className}`}>
      <Heart size={iconSize} className="text-current" />
      {showCount && wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {isLoading ? '...' : wishlistCount > 99 ? '99+' : wishlistCount}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="hover:scale-110 transition-transform duration-200">
        {content}
      </Link>
    );
  }

  return content;
};

export default ShopWishlistIcon;
