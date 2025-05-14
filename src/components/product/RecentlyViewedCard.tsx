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
  
  // Generate model number based on product id if not provided
  const getModelNumber = () => {
    if (modelNumber) return modelNumber;
    if (product.id === '1') return 'MWP42SA/A';
    if (product.id === '2') return 'MWT32SA/A Space Grey';
    if (product.id === '3') return 'MWTK2SA/A Silver';
    return `MW${product.id}${product.id}SA/A`;
  };
  
  return (
    <div className="bg-white group relative flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow">
      {/* Status label */}
      {label && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white px-2 py-0.5 text-xs rounded">
          {label.text}
        </div>
      )}
      
      {/* Wishlist button */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="bg-white rounded-full p-1 hover:bg-gray-100 shadow-sm"
          onClick={handleWishlist}
        >
          <Heart className="h-3 w-3 text-gray-500" />
        </button>
      </div>
      
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="p-3 pt-7">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-full h-28 object-contain"
          />
        </div>
        
        <div className="px-3 pb-2">
          <h3 className="text-xs font-medium line-clamp-1">{product.name}</h3>
          
          <p className="text-[10px] text-gray-500 mt-0.5">
            {getModelNumber()}
          </p>
          
          <div className="mt-1 mb-2">
            <span className="text-sm font-bold">${displayPrice}</span>
            {originalPrice && (
              <span className="text-[10px] text-gray-400 line-through ml-1">${originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-3 pb-3 mt-auto">
        <button 
          className="w-full bg-orange-500 text-white py-1 px-3 rounded text-xs hover:bg-orange-600 transition-colors font-medium"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecentlyViewedCard; 