import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
    
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
          
          {/* Category tag */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
            {product.category}
          </div>
          
          {/* Discount tag */}
          {discountPercentage > 0 && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
          
          {/* Quick actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100"
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <Heart size={16} className="text-gray-600" />
            </button>
            <button 
              className="p-1.5 bg-black rounded-full shadow hover:bg-gray-800"
              onClick={handleAddToCart}
              aria-label="Add to cart"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1 hover:text-primary-600 transition-colors">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-1">{product.description}</p>
          
          {/* Rating stars */}
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                <Star 
                  size={14}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                />
              </span>
            ))}
            <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
          </div>
          
          {/* Price */}
          <div className="mt-2 flex items-baseline">
            {product.originalPrice ? (
              <>
                <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;