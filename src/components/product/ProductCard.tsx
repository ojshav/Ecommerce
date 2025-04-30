import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
              Sale
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
            <Heart size={18} className="text-gray-600 hover:text-accent-500 transition-colors" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center text-amber-400 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                  className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-baseline mb-2">
            <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded text-sm font-medium ${
                product.stock > 0 
                  ? 'bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;