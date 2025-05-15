import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

// Convert top-selling products to Product format
const topSellingProducts: Product[] = [
  {
    id: '1',
    name: 'Smart Watch',
    description: 'Track your fitness',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: 199,
    originalPrice: 249,
    currency: 'USD',
    rating: 4.8,
    reviews: 189,
    stock: 15,
    category: 'electronics',
  },
  {
    id: '2',
    name: 'Headphones',
    description: 'Premium sound',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    price: 99,
    originalPrice: 129,
    currency: 'USD',
    rating: 4.6,
    reviews: 146,
    stock: 22,
    category: 'electronics',
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    description: 'Ultimate gaming experience',
    image: 'https://images.unsplash.com/photo-1585790844043-5f2015e0dff1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    price: 899,
    originalPrice: 1049,
    currency: 'USD',
    rating: 4.9,
    reviews: 112,
    stock: 8,
    category: 'electronics',
  },
  {
    id: '4',
    name: 'Wireless Controller',
    description: 'Precision gaming control',
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    price: 59,
    originalPrice: 79,
    currency: 'USD',
    rating: 4.7,
    reviews: 178,
    stock: 34,
    category: 'electronics',
  },
  {
    id: '5',
    name: 'Gaming Mouse',
    description: 'High precision gaming',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80',
    price: 49,
    originalPrice: 69,
    currency: 'USD',
    rating: 4.5,
    reviews: 98,
    stock: 12,
    category: 'electronics',
  },
];

const TopSellingCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topSellingProducts.length);
    }, 2500); // Auto-scroll every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  const slide = (direction: 'prev' | 'next', targetIndex: number) => {
    if (sliding) return;
    
    setDirection(direction);
    setSliding(true);
    
    setTimeout(() => {
      setCurrent(targetIndex);
      setSliding(false);
    }, 400); // Match duration with CSS transition
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const targetIndex = (current - 1 + topSellingProducts.length) % topSellingProducts.length;
    slide('prev', targetIndex);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const targetIndex = (current + 1) % topSellingProducts.length;
    slide('next', targetIndex);
  };

  const getItemStyle = (index: number) => {
    // Only 3 items get special positioning: current, previous, and next
    if (index === current) {
      return 'translate-y-0 opacity-100 z-20';
    } else if (sliding && 
      ((direction === 'next' && index === (current + 1) % topSellingProducts.length) || 
       (direction === 'prev' && index === (current - 1 + topSellingProducts.length) % topSellingProducts.length))) {
      return `${direction === 'next' ? 'translate-y-full' : '-translate-y-full'} opacity-100 z-10`;
    }
    return 'translate-y-full opacity-0 -z-10';
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-lg shadow-sm overflow-hidden border border-gray-100">
      {/* Main carousel content with purple background */}
      <div className="flex-grow overflow-hidden relative">
        {topSellingProducts.map((product, idx) => (
          <div 
            key={product.id}
            className={`absolute inset-0 w-full h-full transform transition-transform duration-400 ease-in-out ${getItemStyle(idx)}`}
          >
            <div className="flex flex-col h-full bg-purple-500 text-white relative">
              {/* Brand Label */}
              <div className="pt-6 pb-1 px-6 text-center">
                <p className="text-sm font-medium text-white/80">
                  {product.category === 'electronics' ? 'Asus' : product.category}
                </p>
              </div>

              {/* Product Banner Content */}
              <div className="px-6 text-center">
                <h2 className="text-2xl font-semibold mb-1">
                  Supper Sale
                </h2>
                <h3 className="text-xl font-medium mb-6">
                  {product.name}
                </h3>
              </div>

              {/* Product Image */}
              <div className="flex-grow flex items-center justify-center px-6 py-4">
                <img 
                  src={product.image}
                  alt={product.name} 
                  className="max-h-44 object-contain"
                />
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-8 text-center">
                <Link 
                  to={`/product/${product.id}`}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition-colors"
                >
                  Order Now
                </Link>
              </div>

              {/* Navigation dots (now at bottom) */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center">
                {topSellingProducts.map((_, dotIdx) => (
                  <div 
                    key={dotIdx}
                    className={`w-2 h-2 mx-0.5 rounded-full transition-all duration-300 ${
                      current === dotIdx 
                        ? 'bg-white' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    onClick={() => !sliding && setCurrent(dotIdx)}
                    role="button"
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <button 
          onClick={(e) => handlePrev(e)} 
          className="bg-white/10 hover:bg-white/20 p-1 flex items-center justify-center transition-colors text-white"
          disabled={sliding}
        >
          <ChevronUp size={16} />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <button 
          onClick={(e) => handleNext(e)} 
          className="bg-white/10 hover:bg-white/20 p-1 flex items-center justify-center transition-colors text-white"
          disabled={sliding}
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopSellingCarousel; 