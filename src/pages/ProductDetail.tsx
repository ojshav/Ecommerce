import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Check, ShoppingCart, Heart, ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import RecentlyViewedProducts from '../components/product/RecentlyViewedProducts';
import { recentlyViewedData } from '../data/recentlyViewedData';

// Tab type
type TabType = 'product-details' | 'information' | 'reviews';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('product-details');
  const [selectedColor, setSelectedColor] = useState('black');
  
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    toast.success(`${product.name} added to cart`);
  };
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    } else if (newQuantity > product.stock) {
      toast.error(`Sorry, only ${product.stock} items in stock`);
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'product-details':
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium mb-2">Features</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>High-quality materials</li>
                  <li>Premium design</li>
                  <li>Durable construction</li>
                  <li>Versatile usage</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium mb-2">Specifications</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Brand</span>
                    <span className="font-medium">{product.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2">
                    <span>Category</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2">
                    <span>Warranty</span>
                    <span className="font-medium">1 Year</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2">
                    <span>In Stock</span>
                    <span className="font-medium">{product.stock} units</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'information':
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4">Product Information</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-lg mb-2">Description</h4>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">Care Instructions</h4>
                <p className="text-gray-700">Please refer to the product manual for detailed care instructions. For general maintenance, clean with a soft, dry cloth and store in a cool, dry place when not in use.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">Shipping Information</h4>
                <p className="text-gray-700">Products are shipped within 24-48 hours of order confirmation. Delivery typically takes 3-5 business days depending on your location.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">Return Policy</h4>
                <p className="text-gray-700">If you're not completely satisfied with your purchase, you may return it within 30 days for a full refund or replacement. Products must be in original condition with all packaging.</p>
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="py-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Write a Review
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          size={18}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                          className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{product.reviews} reviews</div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(num => {
                      const percentage = num === 5 ? 70 : num === 4 ? 20 : num === 3 ? 7 : num === 2 ? 2 : 1;
                      return (
                        <div key={num} className="flex items-center">
                          <div className="flex items-center w-28">
                            <span className="text-sm mr-2">{num}</span>
                            <Star size={14} className="text-amber-400" fill="currentColor" />
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-amber-400 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2 w-10">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                {[
                  { 
                    name: 'Sarah J.', 
                    date: '2 months ago', 
                    rating: 5,
                    comment: 'Absolutely love this product! The quality exceeded my expectations and it arrived earlier than expected. Would definitely recommend to anyone looking for a premium experience.'
                  },
                  { 
                    name: 'Michael T.', 
                    date: '1 month ago', 
                    rating: 4,
                    comment: 'Great product overall. Only giving 4 stars because the color is slightly different than shown in the pictures, but the quality and functionality are excellent.'
                  },
                  { 
                    name: 'Emma L.', 
                    date: '3 weeks ago', 
                    rating: 5,
                    comment: 'Perfect addition to my collection! The attention to detail is impressive and it fits my needs perfectly. Customer service was also excellent when I had a question.'
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          size={16}
                          fill={i < review.rating ? 'currentColor' : 'none'} 
                          className={i < review.rating ? 'text-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs mb-3">
          <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">Home</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <Link to="/technology" className="text-gray-500 hover:text-primary-600 transition-colors">Technology</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <Link to="/laptop" className="text-gray-500 hover:text-primary-600 transition-colors">Laptop</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <Link to="/apple" className="text-gray-500 hover:text-primary-600 transition-colors">Apple</Link>
          <ChevronRight size={12} className="mx-1 text-gray-400" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        
        {/* Product Overview Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Product Images */}
            <div className="space-y-2">
              <div className="rounded-lg overflow-hidden bg-gray-100 h-64 md:h-80 flex items-center justify-center border border-gray-200">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              <div className="flex space-x-2 justify-start">
                {product.images && product.images.length > 0 && (
                  <div className="flex space-x-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        className={`rounded-md overflow-hidden flex-shrink-0 w-16 h-16 border-2 ${
                          selectedImage === img ? 'border-primary-500' : 'border-gray-200'
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
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                Apple iPad Pro 11" (2020) Wifi 128Gb (Silver)-128Gb/ 11Inch/ Wifi
              </h1>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={14}
                      fill={i < 4 ? 'currentColor' : 'none'} 
                      className={i < 4 ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs">4.0 (632 reviews)</span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    $904.18
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="text-sm font-medium mb-1">Code: Apple iPad Pro 11" (2020) Wifi 128Gb Silver</div>
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium mr-1">Category:</span>
                  <span className="text-sm text-primary-600">Technology</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium mr-1">Keyword:</span>
                  <span className="text-sm text-primary-600 mr-1">Apple,</span>
                  <span className="text-sm text-primary-600 mr-1">Technology,</span>
                  <span className="text-sm text-primary-600">Tablet</span>
                </div>
              </div>
              
              <div className="space-y-1 mb-3 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-700">• Display: LED-Backlit, 11Inch</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">• Chipset/CPU: Apple A12Z Bionic 2.5Ghz</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">• RAM: 128Gb</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">• Operating System: iOS 13</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Color:</div>
                <div className="flex space-x-2">
                  <button 
                    className={`w-6 h-6 rounded-full bg-black ${selectedColor === 'black' ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                    onClick={() => setSelectedColor('black')}
                    aria-label="Black"
                  />
                  <button 
                    className={`w-6 h-6 rounded-full bg-pink-300 ${selectedColor === 'pink' ? 'ring-2 ring-offset-1 ring-pink-300' : ''}`}
                    onClick={() => setSelectedColor('pink')}
                    aria-label="Pink"
                  />
                  <button 
                    className={`w-6 h-6 rounded-full bg-gray-400 ${selectedColor === 'gray' ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                    onClick={() => setSelectedColor('gray')}
                    aria-label="Gray"
                  />
                  <button 
                    className={`w-6 h-6 rounded-full bg-yellow-200 ${selectedColor === 'yellow' ? 'ring-2 ring-offset-1 ring-yellow-200' : ''}`}
                    onClick={() => setSelectedColor('yellow')}
                    aria-label="Yellow"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium mr-1">Amount:</span>
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button 
                      className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button 
                      className="px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium text-sm"
                  >
                    Add To Cart
                  </button>
                  
                  <button 
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm text-gray-700">Special Offer:</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-600">Sold: 700</div>
                    <div className="text-xs text-gray-600">In Stock: 300</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                  <div className="bg-orange-500 h-1.5 rounded-full w-7/10"></div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold">10</div>
                    <div className="text-xs text-gray-500">Day</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">42</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">00</div>
                    <div className="text-xs text-gray-500">Min</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">08</div>
                    <div className="text-xs text-gray-500">Sec</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('product-details')}
                className={`py-2 px-4 text-xs font-medium border-b-2 ${
                  activeTab === 'product-details'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('information')}
                className={`py-2 px-4 text-xs font-medium border-b-2 ${
                  activeTab === 'information'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-4 text-xs font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Comment
              </button>
            </nav>
          </div>
          
          <div className="p-4">
            {renderTabContent()}
          </div>
        </div>
        
        {/* Recently Viewed Products */}
        <RecentlyViewedProducts products={recentlyViewedData} />
      </div>
    </div>
  );
};

export default ProductDetail;