import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShopWishlistOperations } from '../../../hooks/useShopWishlist';
import { useShopCartOperations } from '../../../context/ShopCartContext';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAmazonTranslate } from '../../../hooks/useAmazonTranslate';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  background?: string;
  discount?: number;
  selected?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number, selectedColor: number) => void;
  showColorOptions?: boolean;
  showQuantitySelector?: boolean;
  showWishlist?: boolean;
  className?: string;
}

const Shop4ProductCardWithWishlist: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  showColorOptions = true,
  showQuantitySelector = true,
  showWishlist = true,
  className = ""
}) => {
  const SHOP_ID = 4;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [translatedName, setTranslatedName] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toggleProductInWishlist, isProductInWishlist, isLoading: wishlistLoading } = useShopWishlistOperations(SHOP_ID);
  const { addToShopCart, canPerformShopCartOperations } = useShopCartOperations();
  const { i18n } = useTranslation();
  const { translateBatch } = useAmazonTranslate();

  // Translate product name on language change (display-only)
  useEffect(() => {
    const doTranslate = async () => {
      const lang = (i18n.language || 'en').split('-')[0];
      if (lang === 'en' || !product?.name) {
        setTranslatedName('');
        return;
      }
      try {
        const res = await translateBatch([{ id: 'name', text: product.name }], lang, 'text/plain');
        setTranslatedName(res['name'] || '');
      } catch {
        setTranslatedName('');
      }
    };
    doTranslate();
  }, [product?.name, i18n.language, translateBatch]);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to add items to cart');
      navigate('/sign-in');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToShopCart(SHOP_ID, product.id, quantity);
      toast.success('Added to cart successfully!');
      if (onAddToCart) onAddToCart(product, quantity, selectedColor);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };
  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      navigate('/sign-in');
      return;
    }

    if (user?.role !== 'customer') {
      toast.error('Only customers can manage wishlists');
      return;
    }

    try {
  const wasInWishlist = isProductInWishlist(product.id);
  await toggleProductInWishlist(product.id);
      
      if (wasInWishlist) {
        toast.success('Removed from wishlist');
      } else {
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
      // Error is already handled by the hook with toast, so we don't need to show another one
    }
  };

  const handleImageClick = () => {
  navigate(`/shop4-productpage?id=${product.id}`);
  };

  const isInWishlist = isProductInWishlist(product.id);

  return (
    <div className={`relative group cursor-pointer overflow-visible h-auto ${className}`}>
      {/* Wishlist button - positioned at top right */}
      {showWishlist && (
        <button
          onClick={handleWishlistClick}
          disabled={wishlistLoading}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isInWishlist 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'
          } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlistLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          ) : (
            <Heart 
              size={16} 
              className={isInWishlist ? 'fill-current' : ''} 
            />
          )}
        </button>
      )}

      {/* Product Image Container */}
      <div 
        className={`w-full h-[450px] rounded-lg overflow-hidden flex items-center justify-center ${product.background || ''} transition-all duration-300 group-hover:border-4 group-hover:border-white cursor-pointer`}
        onClick={handleImageClick}
      >
        <img
          src={product.image}
          alt={translatedName || product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Always visible product name and price - hidden on hover */}
      <div className="mt-12 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-[1.2] mb-1 break-words hyphens-auto">{translatedName || product.name}</h3>
        <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal">₹{product.price}</p>
      </div>
      
      {/* Hover card that replaces the name and price */}
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="rounded-[20px] border-2 border-[#BB9D7B] bg-[#212121] p-6 w-full">
          {/* Product Name */}
          <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-[1.2] mb-1 break-words hyphens-auto">{translatedName || product.name}</h3>
          
          {/* Product Price */}
          <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal mb-4">₹{product.price}</p>
          
          {/* Color Options */}
          {showColorOptions && (
            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(0); }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 0 ? 'border-white bg-black' : 'border-gray-400 bg-black'
                }`}
              />
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(1); }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 1 ? 'border-white bg-[#F5F5DC]' : 'border-gray-400 bg-[#F5F5DC]'
                }`}
              />
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColor(2); }}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 2 ? 'border-white bg-gray-600' : 'border-gray-400 bg-gray-600'
                }`}
              />
            </div>
          )}
          
          {/* Quantity Selector and Actions */}
          <div className="flex items-center justify-center gap-4">
            {/* Quantity Selector */}
            {showQuantitySelector && (
              <div className="flex items-center border border-white rounded-full px-3 py-1">
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuantityChange(-1); }}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white mx-3 font-medium">{quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuantityChange(1); }}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <button 
              onClick={(e) => handleAddToCart(e)}
              disabled={isAddingToCart}
              className="w-12 h-12 rounded-full bg-[#BB9D7B] flex items-center justify-center hover:bg-[#A08B6A] transition-colors drop-shadow-[0_6.413px_17.013px_#7E7061] disabled:opacity-50"
              title="Add to cart"
            >
              {isAddingToCart ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent text-white" />
              ) : (
                <ShoppingCart size={20} className="text-white" />
              )}
            </button>

            {/* Wishlist Button (in hover card) */}
            {showWishlist && (
              <button
                onClick={handleWishlistClick}
                disabled={wishlistLoading}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isInWishlist 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/20 border border-white text-white hover:bg-white hover:text-red-500'
                } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {wishlistLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <Heart 
                    size={18} 
                    className={isInWishlist ? 'fill-current' : ''} 
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop4ProductCardWithWishlist;
