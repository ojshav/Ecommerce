import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
  // Sample categories data
  const categories = [
    {
      id: 1,
      name: 'Smart Watch',
      brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei'],
      image: '/placeholder.jpg',
      slug: 'smart-watch'
    },
    {
      id: 2,
      name: 'Tablet',
      brands: ['Apple', 'Samsung', 'Lenovo', 'Microsoft'],
      image: '/placeholder.jpg',
      slug: 'tablet'
    },
    {
      id: 3,
      name: 'Accessories',
      brands: ['Keyboard', 'Mouse', 'Camera', 'Charger', 'Cable'],
      image: '/placeholder.jpg',
      slug: 'accessories'
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop By Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <Link to={`/categories/${category.slug}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                  View All <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3">
                {category.brands.map((brand, idx) => (
                  <Link 
                    key={idx} 
                    to={`/categories/${category.slug}/${brand.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-primary-600"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="bg-gray-100 rounded-lg mt-8 p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold uppercase mb-2">GENUINE ACCESSORIES</h3>
              <p className="text-xl font-bold mb-4">SUPER SALE OCTOBER</p>
              <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
                Buy Now
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              {/* Placeholder for image */}
              <div className="w-64 h-32 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-400">Promotional Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;