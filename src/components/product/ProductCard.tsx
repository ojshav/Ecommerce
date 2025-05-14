import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  isBuiltIn?: boolean;
  salePercentage?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isNew = false, 
  isBuiltIn = false,
  salePercentage
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
    <div className="border border-gray-200 relative group">
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-100"
          onClick={handleWishlist}
        >
          <Heart className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      {/* Labels */}
      {isNew && (
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded z-10">New</span>
      )}
      {isBuiltIn && (
        <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded z-10">Built-in</span>
      )}
      {salePercentage && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded z-10">-{salePercentage}%</span>
      )}
      
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-full h-40 object-cover"
          />
        </div>
        
        <div className="p-3">
          <h3 className="text-xs font-medium truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {product.id.toUpperCase()}
          </p>
          
          <div className="mt-2">
            <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <button 
        className="w-full bg-orange-500 text-white text-xs py-1.5 px-3 hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;