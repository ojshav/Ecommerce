import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Star, TrendingUp, ShoppingBag } from 'lucide-react';

// Example top-selling products (replace with real data or props as needed)
const topSellingProducts = [
  {
    id: 1,
    name: 'Smart Watch',
    desc: 'Track your fitness',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: '$199',
    originalPrice: '$249',
    rating: 4.8,
    sales: 152,
    link: '/products/smart-watch',
    discount: '20%',
  },
  {
    id: 2,
    name: 'Headphones',
    desc: 'Premium sound',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    price: '$99',
    originalPrice: '$129',
    rating: 4.6,
    sales: 98,
    link: '/products/headphones',
    discount: '23%',
  },
  {
    id: 3,
    name: 'Camera',
    desc: 'Capture moments',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: '$299',
    originalPrice: '$349',
    rating: 4.9,
    sales: 87,
    link: '/products/cameras',
    discount: '14%',
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    desc: 'Crystal clear audio',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
    price: '$79',
    originalPrice: '$109',
    rating: 4.5,
    sales: 113,
    link: '/products/wireless-earbuds',
    discount: '28%',
  },
  {
    id: 5,
    name: 'Tablet Pro',
    desc: 'Work and play',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1247&q=80',
    price: '$399',
    originalPrice: '$449',
    rating: 4.7,
    sales: 76,
    link: '/products/tablet-pro',
    discount: '11%',
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

  // Calculate star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          // For half stars
          if (ratingValue <= rating) {
            return <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />;
          } else if (ratingValue - 0.5 <= rating) {
            return (
              <div key={i} className="relative">
                <Star size={12} className="text-gray-300" />
                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} size={12} className="text-gray-300" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-lg shadow-sm overflow-hidden border border-gray-100 bg-white">
      {/* Header with TOP TRENDING label */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100">
        <div className="flex items-center justify-center w-full">
          <span className="bg-black text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <TrendingUp size={12} className="text-yellow-400" strokeWidth={2} />
            TOP TRENDING
          </span>
        </div>
      </div>
      
      {/* Main carousel content */}
      <div className="flex-grow overflow-hidden relative">
        {topSellingProducts.map((product, idx) => (
          <div 
            key={product.id}
            className={`absolute inset-0 w-full h-full transform transition-transform duration-400 ease-in-out ${getItemStyle(idx)}`}
          >
            <div className="flex flex-col h-full">
              {/* Product image with badges */}
              <div className="relative w-full h-[36%] sm:h-[40%] md:h-[45%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-0 left-0 right-0 px-2 py-1 flex justify-between items-center">
                  <div className="bg-black text-white text-[10px] py-0.5 px-1.5 rounded-md flex items-center">
                    <Star size={10} fill="white" className="mr-0.5" />
                    {product.rating}
                  </div>
                  <div className="bg-red-500 text-white text-[10px] py-0.5 px-1.5 rounded-md">
                    -{product.discount}
                  </div>
                </div>
                
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md border border-gray-100">
                  <span className="text-xs font-bold">#{idx + 1}</span>
                </div>
              </div>
              
              {/* Product details */}
              <div className="flex-grow flex flex-col justify-between px-3 pt-5 pb-3">
                <div>
                  <h4 className="font-semibold text-base text-center">{product.name}</h4>
                  <p className="text-xs text-gray-500 text-center mt-1">{product.desc}</p>
                </div>
                
                <div className="space-y-3">
                  {/* Price and ratings */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-black">{product.price}</span>
                        <span className="text-[10px] text-gray-400 line-through ml-1.5">{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center mt-0.5">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <ShoppingBag size={11} className="mr-0.5" />
                      <span className="whitespace-nowrap">{product.sales}+ sold</span>
                    </div>
                  </div>
                  
                  {/* Shop now button */}
                  <Link 
                    to={product.link} 
                    className="group bg-black hover:bg-gray-800 text-white text-xs px-4 py-2 rounded-md w-full inline-block transition-colors duration-200 text-center"
                  >
                    <span className="inline-flex items-center justify-center">
                      Shop Now 
                      <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-100 bg-white mt-auto">
        <button 
          onClick={(e) => handlePrev(e)} 
          className="bg-gray-100 hover:bg-gray-200 rounded-md p-1.5 flex items-center justify-center transition-colors disabled:opacity-50"
          disabled={sliding}
        >
          <ChevronUp size={16} />
        </button>
        <div className="flex items-center">
          {topSellingProducts.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 mx-0.5 rounded-full transition-all duration-300 ${
                current === idx 
                  ? 'bg-black w-4' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => !sliding && setCurrent(idx)}
              role="button"
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button 
          onClick={(e) => handleNext(e)} 
          className="bg-gray-100 hover:bg-gray-200 rounded-md p-1.5 flex items-center justify-center transition-colors disabled:opacity-50"
          disabled={sliding}
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopSellingCarousel; 