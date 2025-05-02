import React from 'react';
import { Link } from 'react-router-dom';

const NewProduct: React.FC = () => {
  // Sample new products data
  const newProducts = [
    {
      id: 1,
      name: 'Smart Watch Pro X',
      price: 299.99,
      category: 'Wearables',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-15'
    },
    {
      id: 2,
      name: 'Wireless Noise Cancelling Headphones',
      price: 199.99,
      category: 'Audio',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-14'
    },
    {
      id: 3,
      name: 'Ultra Slim Laptop',
      price: 1299.99,
      category: 'Computers',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-12'
    },
    {
      id: 4,
      name: 'Home Smart Speaker',
      price: 79.99,
      category: 'Smart Home',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-10'
    },
    {
      id: 5,
      name: '4K Action Camera',
      price: 249.99,
      category: 'Photography',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-08'
    },
    {
      id: 6,
      name: 'Ergonomic Gaming Mouse',
      price: 59.99,
      category: 'Gaming',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-05'
    },
    {
      id: 7,
      name: 'Bluetooth Portable Speaker',
      price: 89.99,
      category: 'Audio',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-03'
    },
    {
      id: 8,
      name: 'Curved Gaming Monitor',
      price: 349.99,
      category: 'Monitors',
      image: '/placeholder.jpg',
      dateAdded: '2023-10-01'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">New Products</h1>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
          <select 
            id="sort" 
            className="border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                NEW
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <div className="text-lg font-bold mb-3">${product.price.toFixed(2)}</div>
              <div className="flex justify-between items-center">
                <Link 
                  to={`/product/${product.id}`} 
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View Details
                </Link>
                <button className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProduct; 