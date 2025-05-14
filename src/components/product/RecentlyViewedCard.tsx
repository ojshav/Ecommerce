import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

interface RecentlyViewedCardProps {
  product: Product;
  label?: {
    text: string;
    colorClass: string;
  };
  modelNumber?: string;
  displayPrice: string;
  originalPrice?: string;
}

const RecentlyViewedCard: React.FC<RecentlyViewedCardProps> = ({ 
  product, 
  label,
  modelNumber,
  displayPrice,
  originalPrice
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist`);
  };
    
  return (
    <div className="border border-gray-200 relative">
      {/* Product Labels */}
      {label && (
        <span className={`absolute top-2 left-2 ${label.colorClass} text-white text-xs px-2 py-0.5 rounded z-10`}>
          {label.text}
        </span>
      )}
      
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
          onClick={handleWishlist}
        >
          <Heart className="h-3 w-3 text-gray-500" />
        </button>
      </div>
      
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-full h-24 object-cover"
          />
        </div>
        
        <div className="p-2">
          <h3 className="text-xs truncate">{product.name}</h3>
          {modelNumber && (
            <p className="text-[10px] text-gray-500 mt-0.5 truncate">{modelNumber}</p>
          )}
          
          <div className="mt-1">
            <span className="text-xs font-bold">${displayPrice}</span>
            {originalPrice && (
              <span className="text-[10px] text-gray-400 line-through ml-1">${originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      
      <button 
        className="w-full bg-orange-500 text-white text-[10px] py-1 px-2 hover:bg-orange-600 transition-colors"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default RecentlyViewedCard; 