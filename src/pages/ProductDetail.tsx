import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, ShoppingCart, Heart, ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import { getProductById } from '../data/products';
import { featuredProductsData } from '../data/featuredProductsData';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Tab type
type TabType = 'product-details' | 'information' | 'reviews';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log('Product ID from URL:', productId);
  
  // Use the enhanced getProductById which will search in both data sources
  const product = getProductById(productId || '');
  console.log('Product found:', product);
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('product-details');
  
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for does not exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    } else if (newQuantity > product.stock) {
      toast.error(`Sorry, only ${product.stock} items in stock`);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-8">
          <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-primary-600 transition-colors">Products</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-lg overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      className={`rounded-md overflow-hidden flex-shrink-0 w-20 h-20 border-2 ${
                        selectedImage === img ? 'border-primary-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.originalPrice && (
                <span className="inline-block bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                  Sale
                </span>
              )}
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                      className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">{product.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">{product.reviews} reviews</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-green-600 font-medium text-sm mt-1 block">
                    Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <div className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
                  {product.stock > 0 ? (
                    <div className="flex items-center">
                      <Check size={18} className="mr-1" />
                      <span>{product.stock > 5 ? 'In Stock' : `Only ${product.stock} left in stock`}</span>
                    </div>
                  ) : 'Out of Stock'}
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <div className="flex-1 flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`flex-1 flex items-center justify-center space-x-2 rounded-md py-3 px-6 font-medium ${
                      product.stock > 0 
                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Product Meta */}
              <div className="border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600">
                <div className="flex">
                  <span className="font-medium w-24">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                
                {product.tags && (
                  <div className="flex">
                    <span className="font-medium w-24">Tags:</span>
                    <div className="flex flex-wrap">
                      {product.tags.map((tag, index) => (
                        <span key={tag} className="capitalize">
                          {tag}
                          {index < product.tags!.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;