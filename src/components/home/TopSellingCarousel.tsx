import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

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
  },
];

const TopSellingCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [sliding, setSliding] = useState(false);
  const slideHeight = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topSellingProducts.length);
    }, 2000);// Change every 4 seconds (changed from 3000 to 4000)
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
    <div className="bg-gradient-to-b from-gray-50 to-white h-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border border-gray-100">
      <div className="p-4 flex flex-col items-center">
        <div className="flex items-center justify-center w-full mb-3">
          <div className="h-0.5 flex-grow bg-gray-100"></div>
          <h3 className="text-sm font-bold mx-2 flex items-center gap-1 relative">
            <span className="bg-black text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Star size={12} fill="white" strokeWidth={0} />
              TOP SELLERS
            </span>
          </h3>
          <div className="h-0.5 flex-grow bg-gray-100"></div>
        </div>
        
        <div className="relative h-64 w-full overflow-hidden">
          {topSellingProducts.map((product, idx) => (
            <div 
              key={product.id}
              className={`absolute top-0 left-0 w-full transform transition-transform duration-400 ease-in-out ${getItemStyle(idx)}`}
            >
              <div className="relative mb-1">
                <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs py-0.5 px-1.5 rounded-md">
                  #{idx + 1}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover rounded-md shadow-sm mb-3"
                />
                <div className="absolute bottom-3 left-2 bg-black bg-opacity-60 backdrop-blur-sm text-white text-xs py-0.5 px-1.5 rounded">
                  {product.sales}+ sold
                </div>
              </div>
              
              <div className="text-center w-full">
                <span className="block font-semibold text-base mb-1">{product.name}</span>
                <p className="text-xs text-gray-600 mb-1">{product.desc}</p>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-primary-600 font-bold">{product.price}</span>
                  <span className="text-gray-400 text-xs line-through">{product.originalPrice}</span>
                </div>
                
                <div className="flex items-center justify-center text-xs mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
                
                <Link 
                  to={product.link} 
                  className="bg-black hover:bg-gray-800 text-white text-xs px-4 py-2 rounded-md w-full inline-block transition-colors duration-200"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between px-3 py-2 border-t border-gray-100">
        <button 
          onClick={(e) => handlePrev(e)} 
          className="bg-gray-100 hover:bg-gray-200 rounded-md p-1.5 flex items-center justify-center transition-colors"
          disabled={sliding}
        >
          <ChevronUp size={16} />
        </button>
        <div className="flex items-center">
          {topSellingProducts.map((_, idx) => (
            <div 
              key={idx}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full ${current === idx ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <button 
          onClick={(e) => handleNext(e)} 
          className="bg-gray-100 hover:bg-gray-200 rounded-md p-1.5 flex items-center justify-center transition-colors"
          disabled={sliding}
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopSellingCarousel; 