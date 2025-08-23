import React, { useEffect, useMemo, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShopWishlistOperations } from '../../../hooks/useShopWishlist';
import { useShopCartOperations } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAmazonTranslate } from '../../../hooks/useAmazonTranslate';

const SHOP_ID = 1;

interface Shop1ProductCardProps {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
}

const Shop1ProductCard: React.FC<Shop1ProductCardProps> = ({ id, image, category, name, price }) => {
  const { isAuthenticated, user } = useAuth();
  const { toggleProductInWishlist, isProductInWishlist, isLoading } = useShopWishlistOperations(SHOP_ID);
  const { addToShopCart, canPerformShopCartOperations } = useShopCartOperations();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [translatedName, setTranslatedName] = useState('');
  const { i18n } = useTranslation();
  const { translateBatch } = useAmazonTranslate();
  
  // Use useMemo to avoid unnecessary re-calculations
  const isInWishlist = useMemo(() => isProductInWishlist(id), [isProductInWishlist, id]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      return;
    }

    if (user?.role !== 'customer') {
      toast.error('Only customers can manage wishlists');
      return;
    }

    try {
      await toggleProductInWishlist(id);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToShopCart(SHOP_ID, id, 1);
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Translate display name
  useEffect(() => {
    const doTranslate = async () => {
      const lang = (i18n.language || 'en').split('-')[0];
      if (lang === 'en' || !name) {
        setTranslatedName('');
        return;
      }
      try {
        const res = await translateBatch([{ id: 'name', text: name }], lang, 'text/plain');
        setTranslatedName(res['name'] || '');
      } catch {
        setTranslatedName('');
      }
    };
    doTranslate();
  }, [name, i18n.language, translateBatch]);

  return (
    <div className="relative rounded-lg flex flex-col items-center p-2 md:p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        disabled={isLoading}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isInWishlist
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-white/80 hover:bg-white text-gray-600 hover:text-orange-500 shadow-md'
        }`}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : (
          <Heart 
            className={`w-4 h-4  ${isInWishlist ? 'fill-current' : ''}`}
          />
        )}
      </button>

      {/* Product Link - excludes buttons */}
      <Link to={`/shop1/product/ ${id}`} className="w-full flex flex-col items-center" style={{ pointerEvents: 'auto' }}>
        <img
          src={image}
          alt={name}
          className="w-full max-w-[302px] h-[220px] sm:h-[260px] md:h-[321px] object-contain rounded-md mb-2"
        />
  <div className="text-[12px] md:text-[14px] text-gray-400 mb-1.5 mt-2 uppercase font-poppins tracking-widest">{category}</div>
  <div className="font-semibold font-poppins text-center text-[16px] md:text-[18px]">{translatedName || name}</div>
        <div className="text-red-500 font-poppins font-semibold text-[18px] md:text-[20px]">  ₹{price.toFixed(2)}</div>
      </Link>
      
      {/* Add to Cart Button - visible on hover */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="mt-3 w-full max-w-[200px] bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2 z-10"
      >
        {isAddingToCart ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default memo(Shop1ProductCard); 