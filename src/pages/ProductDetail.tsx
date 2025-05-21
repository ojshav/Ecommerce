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
            <h3 className="text-xl font-medium mb-4 text-gray-900">Thin and light design, thin 5.9mm, soft rounded edges, elegant silver color</h3>
            
            <p className="text-gray-700 mb-4">
              Apple iPad Pro 11 "(2020) Wifi 128Gb (Silver) has the same design as its predecessor, but there are changes 
              such as the rear camera system is placed in a square and weight 471g for a feeling of weight. Size 247.6 x 178.5 
              mm and a thickness of only 5.9mm, iPad Pro 11 2020 will be extremely thin and light, convenient to carry and 
              use on the go.
            </p>
            
            <p className="text-gray-700 mb-6">
              Soft rounded edges provide a comfortable, solid hand feel, creating harmony in design. iPad Pro 11 2020 
              comes in elegant and classy silver.
            </p>
            
            <h3 className="text-xl font-medium mb-4 text-gray-900">120Hz screen, 16 million colors, 11-inch IPS LCD panel</h3>
            
            <p className="text-gray-700 mb-4">
              Using a screen with a frequency of 120Hz will give iPad Pro the ability to display sharp images, fast image 
              processing speed. In addition, the 120Hz frequency screen for Apple also symbolizes touch sensitivity, helping 
              to scan finger movements and respond quickly. As a result, users will have a better experience, fast and 
              responsive operations, avoiding image glitches and delay.
            </p>
            
            <p className="text-gray-700 mb-6">
              Apple also equips the iPad Pro 11 2020 with an IPS LCD panel of 16 million colors, with a resolution of 
              1668x2388 pixels on an 11-inch screen size to help display sharp, vivid colors, high contrast. In addition, the 
              screen technologies like ProMotion, True Tone give users authentic and wonderful experiences. In addition, 
              the iPad Pro 11 2020's screen is also covered with an oleophobic coating that helps prevent fingerprints and 
              glare effectively when used outdoors.
            </p>
            
            <h3 className="text-xl font-medium mb-4 text-gray-900">Perfect Experience</h3>
            
            <p className="text-gray-700 mb-4">
              Everything you experience on iPad (2019) 10.2 "Wifi + Cellular 32GB MW6D2ZA / A (Gold) has great picture and 
              sound quality.
            </p>
          </div>
        );
      case 'information':
        return (
          <div className="py-6">
            <h3 className="text-xl font-medium mb-6 text-gray-900">Technical Specifications</h3>
            
            <div className="border-t border-gray-200">
              <table className="min-w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700 w-1/3">Information</td>
                    <td className="py-3 text-gray-800"></td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700 w-1/3">Product</td>
                    <td className="py-3 text-gray-800">iPad</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Manufacturer</td>
                    <td className="py-3 text-gray-800">Apple</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Model</td>
                    <td className="py-3 text-gray-800">iPad Pro 11" (2020) Wifi 128Gb</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Screen</td>
                    <td className="py-3 text-gray-800">LED-Backlit, 11inch</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Resolution</td>
                    <td className="py-3 text-gray-800">2388x1668</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Chipset/ CPU</td>
                    <td className="py-3 text-gray-800">Apple A12Z Bionic, 2.5GHz</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">RAM</td>
                    <td className="py-3 text-gray-800">6Gb</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">ROM</td>
                    <td className="py-3 text-gray-800">128Gb</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Memory card support</td>
                    <td className="py-3 text-gray-800">No</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Camera</td>
                    <td className="py-3 text-gray-800">Rear camera: 12MP / Front camera: 7MP</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Connect</td>
                    <td className="py-3 text-gray-800">WiFi + Bluetooth 5.0</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Fingerprint security</td>
                    <td className="py-3 text-gray-800">No</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Operating system</td>
                    <td className="py-3 text-gray-800">iOS 13</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Battery capacity</td>
                    <td className="py-3 text-gray-800">0 mAh</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Weight</td>
                    <td className="py-3 text-gray-800">0.471 kg</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Size</td>
                    <td className="py-3 text-gray-800">24.7 x 17.8 x 0.59 cm</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Color</td>
                    <td className="py-3 text-gray-800">Silver</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Communication port</td>
                    <td className="py-3 text-gray-800">USB Type C</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Accessories included</td>
                    <td className="py-3 text-gray-800">Charger (18W), Type C cable (1m), instruction manual</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-medium text-gray-700">Other</td>
                    <td className="py-3 text-gray-800">Face ID</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="py-6">
            <div className="flex items-start mb-6">
              <h3 className="text-xl font-semibold">Review</h3>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={20}
                      fill={i < 4.5 ? 'currentColor' : 'none'} 
                      className={i < 4.5 ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">4.5</span>
                <span className="text-gray-500 text-sm ml-2">632 reviews</span>
              </div>
              
              <div className="space-y-1">
                {[
                  { stars: 5, count: 750, percentage: 75 },
                  { stars: 4, count: 32, percentage: 22 },
                  { stars: 3, count: 29, percentage: 18 },
                  { stars: 2, count: 6, percentage: 6 },
                  { stars: 1, count: 2, percentage: 2 }
                ].map(item => (
                  <div key={item.stars} className="flex items-center">
                    <div className="flex items-center w-20">
                      <span className="text-sm mr-1">{item.stars}</span>
                      <Star size={14} className="text-amber-400" fill="currentColor" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                      <div 
                        className="bg-amber-400 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 w-10">{item.count} stars</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="py-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?u=ralph" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Ralph Edwards</div>
                    <div className="text-gray-500 text-xs">October 30, 2020</div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full">Purchased by 24h supplier</span>
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full ml-2">Gold seller</span>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">Watch the movie very loud, very sharp. Paper wrap - protect the environment. There is a stamp on fragile goods, but the more is is - the more the courier will throw ... :D</p>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
              
              <div className="py-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?u=savannah" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Savannah Nguyen</div>
                    <div className="text-gray-500 text-xs">October 10, 2020</div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full">Purchased by 24h supplier</span>
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full ml-2">Silver seller</span>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">I bought and used very well compared to the price range. It is advised that you should use Asin Fast Delivery service which will be faster and avoid more distortion than standard Delivery. Before, I bought it for my brother-paid 57.2919. standard delivery, the box a bit dented.</p>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>

              <div className="py-6">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                    <img src="https://i.pravatar.cc/100?u=cody" alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Cody Fisher</div>
                    <div className="text-gray-500 text-xs">September 3, 2020</div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full">Purchased by 24h supplier</span>
                    <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-full ml-2">White seller</span>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      size={16}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">Venture to buy a valuable technology product online for the first time! I have to say KhongNguoi (CNH) is too good, I book on September 3, there is no fast delivery so 9/9 deadline is available, but there is a busy job so thanks to early delivery support, today 9/9 it's in stock! Hope using its products later ...</p>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like
                  </button>
                  <button className="flex items-center text-gray-500 text-sm hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button className="flex items-center text-orange-500 border border-orange-500 rounded-md px-4 py-2 hover:bg-orange-50 transition-colors">
                See More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
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
              
              {/* Share buttons */}
              <div className="mb-3">
                <div className="text-sm font-medium mb-2">Share:</div>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-lg bg-white text-orange-500 border border-orange-500 flex items-center justify-center hover:bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white text-orange-500 border border-orange-500 flex items-center justify-center hover:bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white text-orange-500 border border-orange-500 flex items-center justify-center hover:bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white text-orange-500 border border-orange-500 flex items-center justify-center hover:bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
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
            <nav className="flex">
              <button
                onClick={() => setActiveTab('product-details')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'product-details'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('information')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'information'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-4 font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-500'
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