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
  
  // Calculate sale percentage if original price exists
  const calculateSalePercentage = () => {
    if (product.originalPrice && product.price) {
      const percentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(percentage);
    }
    return 0;
  };
    
  return (
    <div className="bg-white group relative flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow">
      {/* Status label (New or Sold Out) */}
      {isNew && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white px-3 py-1 text-xs rounded">
          New
        </div>
      )}
      {product.stock === 0 && (
        <div className="absolute top-2 left-2 z-10 bg-gray-700 text-white px-3 py-1 text-xs rounded">
          Sold Out
        </div>
      )}
      {!isNew && product.stock > 0 && (salePercentage || calculateSalePercentage() > 0) && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-3 py-1 text-xs rounded">
          -{salePercentage || calculateSalePercentage()}%
        </div>
      )}
      
      {/* Wishlist button */}
      <div className="absolute top-2 right-2 z-10">
        <button 
          className="bg-white rounded-full p-1.5 hover:bg-gray-100 shadow-sm"
          onClick={handleWishlist}
        >
          <Heart className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      
      <Link to={`/product/${product.id}`} className="flex-grow">
        <div className="p-4 pt-8">
          <img 
            src={product.primary_image || product.image || '/placeholder-image.png'}
            alt={product.name} 
            className="w-full h-40 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.png';
            }}
          />
        </div>
        
        <div className="px-4 pb-2">
          <h3 className="text-base font-medium line-clamp-1">{product.name}</h3>
          
          <p className="text-xs text-gray-500 mt-1">
            SKU: {product.sku}
          </p>
          
          <div className="mt-2 mb-3">
            <span className="text-base font-bold">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4 mt-auto">
        <button 
          className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors font-medium"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;