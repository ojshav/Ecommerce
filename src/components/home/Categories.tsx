import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const Categories: React.FC = () => {
  // Category data with icons
  const categories = [
    {
      id: 1,
      name: 'Motor vehicles',
      icon: '🛵',
      slug: 'motor-vehicles',
      bgColor: 'bg-[#f5f7f2]',
    },
    {
      id: 2,
      name: 'Technology',
      icon: '⏹️',
      slug: 'technology',
      bgColor: 'bg-[#f5f7f2]',
      isActive: true,
    },
    {
      id: 3,
      name: 'Watch',
      icon: '⌚',
      slug: 'watch',
      bgColor: 'bg-[#f5f7f2]',
    },
    {
      id: 4,
      name: 'Glasses',
      icon: '👓',
      slug: 'glasses',
      bgColor: 'bg-[#f5f7f2]',
    },
    {
      id: 5,
      name: 'Beauty',
      icon: '💄',
      slug: 'beauty',
      bgColor: 'bg-[#f5f7f2]',
    },
    {
      id: 6,
      name: 'Toys',
      icon: '🚚',
      slug: 'toys',
      bgColor: 'bg-[#f5f7f2]',
    },
  ];

  // Product data
  const products = [
    {
      id: 1,
      name: 'Apple Macbook Pro 2019 MWP42SA/A',
      price: 2013.54,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      tag: 'New',
    },
    {
      id: 2,
      name: 'Apple Watch Series 5 MWV62VN/A',
      price: 517.79,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
      tag: 'Favorite',
    },
    {
      id: 3,
      name: 'Apple Macbook Air MWTJ2SA/A (2020)',
      price: 1099,
      originalPrice: 1193.71,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
      tag: '- 15%',
    },
    {
      id: 4,
      name: 'Hand Watch Rossini – 5395T01G',
      price: 193.31,
      image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80',
      tag: 'Sold Out',
    },
    {
      id: 5,
      name: 'Apple Macbook Pro MWTJ2SA/A Space Grey',
      price: 1646.34,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 6,
      name: 'Apple Macbook Pro 2020 MWP42SA/A',
      price: 2142.98,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    },
  ];

  const getTagClass = (tag: string) => {
    switch(tag) {
      case 'New':
        return 'bg-orange-500 text-white';
      case 'Favorite':
        return 'bg-yellow-400 text-black';
      case '- 15%':
        return 'bg-orange-500 text-white';
      case 'Sold Out':
        return 'bg-gray-700 text-white';
      default:
        return '';
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Categories header with navigation */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop By Categories</h2>
          <div className="flex items-center">
            <Link to="/categories" className="text-orange-500 text-sm font-medium mr-4">
              See All
            </Link>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Categories slider */}
        <div className="flex space-x-4 overflow-x-auto pb-4 mb-8 pt-2 pl-2">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => {
                // navigate to shop by category page
              }}
              className={`flex-shrink-0 w-36 h-40 ${category.bgColor} rounded-lg flex flex-col items-center justify-center text-center p-4 transition duration-200 hover:scale-105 hover:border-2 hover:border-orange-500 hover:relative cursor-pointer`}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center">
                <span className="text-3xl">{category.icon}</span>
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 relative">
              {product.tag && (
                <span className={`absolute top-2 left-2 text-xs py-1 px-2 rounded ${getTagClass(product.tag)}`}>
                  {product.tag}
                </span>
              )}
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm">
                <Heart size={18} className="text-gray-500" />
              </button>
              <div className="h-40 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex space-x-2 items-baseline">
                  <span className="font-bold">${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  )}
                </div>
                <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Banner 1 - Camera */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Camera promotion" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center">
              <div className="max-w-xs">
                <span className="text-sm font-medium text-gray-800">Hot Deal</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-1">TOURS SAFE</h3>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">TRUE DISCOUNT</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Banner 2 - Living Room */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Living room promotion" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center">
              <div className="max-w-xs">
                <span className="text-sm font-medium text-gray-800">New Product</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-1">EXPERIENCE TECHNOLOGY</h3>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">RELAX HIGHLY</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;