import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <section className="pt-8">
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
        <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 pl-2">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => {
                navigate('/all-products');
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
        
      </div>
    </section>
  );
};

export default Categories;