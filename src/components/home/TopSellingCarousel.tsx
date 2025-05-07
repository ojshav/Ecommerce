import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Example top-selling products (replace with real data or props as needed)
const topSellingProducts = [
  {
    id: 1,
    name: 'Smart Watch',
    desc: 'Track your fitness',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: '$199',
    link: '/products/smart-watch',
  },
  {
    id: 2,
    name: 'Headphones',
    desc: 'Premium sound',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    price: '$99',
    link: '/products/headphones',
  },
  {
    id: 3,
    name: 'Camera',
    desc: 'Capture moments',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    price: '$299',
    link: '/products/cameras',
  },
];

const TopSellingCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % topSellingProducts.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + topSellingProducts.length) % topSellingProducts.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % topSellingProducts.length);
  };

  const product = topSellingProducts[current];

  return (
    <div className="bg-gray-50 h-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between">
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-sm font-bold mb-1 flex items-center gap-1">🔝 Top-Selling</h3>
        <p className="text-xs text-gray-600 mb-2">{product.desc}</p>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-28 object-cover rounded mb-2"
        />
        <div className="text-center w-full">
          <span className="block font-semibold text-base mb-1">{product.name}</span>
          <span className="block text-primary-600 font-bold mb-2">{product.price}</span>
          <Link to={product.link} className="bg-black text-white text-xs px-4 py-2 rounded-md w-full inline-block">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 pb-2">
        <button onClick={handlePrev} className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-lg">▲</button>
        <button onClick={handleNext} className="bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-lg">▼</button>
      </div>
    </div>
  );
};

export default TopSellingCarousel; 