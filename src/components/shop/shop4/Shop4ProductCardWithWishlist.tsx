import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShopWishlistOperations } from '../../../hooks/useShopWishlist';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';

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
  const SHOP_ID = 4; // Shop 4 - Footwear Store
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const {
    addToWishlist,
    removeFromWishlist,
    toggleProductInWishlist,
    isProductInWishlist,
    getWishlistItemByProductId,
    isLoading: wishlistLoading
  } = useShopWishlistOperations(SHOP_ID);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, selectedColor);
    } else {
      console.log(`Added ${product.name} to cart with quantity ${quantity} and color ${selectedColor}`);
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
    navigate('/shop4-productpage');
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
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Always visible product name and price - hidden on hover */}
      <div className="mt-12 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-[1.2] mb-1 break-words hyphens-auto">{product.name}</h3>
        <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal">₹{product.price}</p>
      </div>
      
      {/* Hover card that replaces the name and price */}
      <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <div className="rounded-[20px] border-2 border-[#BB9D7B] bg-[#212121] p-6 w-full">
          {/* Product Name */}
          <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-[1.2] mb-1 break-words hyphens-auto">{product.name}</h3>
          
          {/* Product Price */}
          <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal mb-4">₹{product.price}</p>
          
          {/* Color Options */}
          {showColorOptions && (
            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={() => setSelectedColor(0)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 0 ? 'border-white bg-black' : 'border-gray-400 bg-black'
                }`}
              />
              <button
                onClick={() => setSelectedColor(1)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 1 ? 'border-white bg-[#F5F5DC]' : 'border-gray-400 bg-[#F5F5DC]'
                }`}
              />
              <button
                onClick={() => setSelectedColor(2)}
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
                  onClick={() => handleQuantityChange(-1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white mx-3 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-[#BB9D7B] flex items-center justify-center hover:bg-[#A08B6A] transition-colors drop-shadow-[0_6.413px_17.013px_#7E7061]"
              title="Add to cart"
            >
              <ShoppingCart size={20} className="text-white" />
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
