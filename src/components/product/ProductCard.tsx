import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col max-w-[280px] w-full mx-auto">
      <div className="relative h-[160px] w-full">
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {isNew && (
            <span className="bg-[#F2631F] text-white text-[10px] px-1.5 py-0.5 rounded">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-400 text-black text-[10px] px-1.5 py-0.5 rounded">
              Sold Out
            </span>
          )}
          {!isNew && product.stock > 0 && (salePercentage || calculateSalePercentage() > 0) && (
            <span className="bg-[#F2631F] text-white text-[10px] px-1.5 py-0.5 rounded">
              -{salePercentage || calculateSalePercentage()}%
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button
          className="absolute top-2 right-2 p-1.5 z-10 text-gray-400 hover:text-[#F2631F] hover:bg-white hover:shadow-md rounded-full transition-all duration-300"
          onClick={handleWishlist}
        >
          <Heart className="w-4 h-4" />
        </button>
        
        {/* Product image */}
        <Link to={`/product/${product.id}`} className="block h-full">
          <img 
            src={product.primary_image || product.image || '/placeholder-image.png'}
            alt={product.name} 
            className="w-full h-full object-contain p-2 rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.png';
            }}
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500">
            SKU: {product.sku}
          </p>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-base font-bold">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="w-1/2 bg-[#F2631F] text-white py-1.5 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 text-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;