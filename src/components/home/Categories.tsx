import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
  // Expanded categories with real data and images
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      brands: ['Apple', 'Samsung', 'Sony', 'Dell', 'LG'],
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      slug: 'electronics',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Clothing',
      brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo'],
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: 'clothing',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Home Decor',
      brands: ['IKEA', 'Wayfair', 'West Elm', 'Pottery Barn', 'Crate & Barrel'],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80',
      slug: 'home-decor',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 4,
      name: 'Beauty',
      brands: ['Sephora', 'MAC', 'Fenty', 'L\'Oréal', 'Estée Lauder'],
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      slug: 'beauty',
      bgColor: 'bg-pink-50'
    },
    {
      id: 5,
      name: 'Sports',
      brands: ['Nike', 'Under Armour', 'Adidas', 'Puma', 'New Balance'],
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: 'sports',
      bgColor: 'bg-purple-50'
    },
    {
      id: 6,
      name: 'Books',
      brands: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Macmillan', 'Random House'],
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      slug: 'books',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop By Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className={`${category.bgColor} rounded-lg shadow-sm overflow-hidden`}>
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                    <Link to={`/categories/${category.slug}`} className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
                      View All <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-y-3">
                  {category.brands.map((brand, idx) => (
                    <Link 
                      key={idx} 
                      to={`/categories/${category.slug}/${brand.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                      className="text-sm text-gray-700 hover:text-primary-600 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="bg-gray-900 rounded-lg mt-10 overflow-hidden shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="p-8 text-white">
              <h3 className="text-lg font-bold text-gray-300 mb-2">SUMMER COLLECTION</h3>
              <p className="text-2xl md:text-3xl font-bold mb-4">New Arrivals for Summer</p>
              <p className="text-gray-300 mb-6">Discover the hottest products for the season</p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
            <div className="p-4 md:p-0">
              <img 
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Summer Collection" 
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;