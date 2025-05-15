import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  model: string;
  price: number;
  image: string;
}

interface SearchResultsProps {
  isVisible: boolean;
  searchQuery: string;
}

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Apple Watch Series 5',
    model: 'MWV62VN/A',
    price: 517.79,
    image: '/assets/products/apple-watch-1.png'
  },
  {
    id: '2',
    name: 'Apple Watch Series 6',
    model: 'MWV62VN/A',
    price: 582.51,
    image: '/assets/products/apple-watch-2.png'
  },
  {
    id: '3',
    name: 'Apple Watch Series 5',
    model: 'MWV62VN/A',
    price: 720.58,
    image: '/assets/products/apple-watch-3.png'
  }
];

const SearchResults: React.FC<SearchResultsProps> = ({ isVisible, searchQuery }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute left-0 w-[24rem] bg-white shadow-lg rounded-b-md overflow-hidden z-50">
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-gray-500 mb-2">Offer</h4>
          <p className="text-black">Apple ({dummyProducts.length})</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-gray-500">Product</h4>
            <Link to="/all-products" className="text-[#F2631F] hover:text-orange-600 text-sm">
              See All
            </Link>
          </div>

          <div className="space-y-4">
            {dummyProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex items-center bg-white hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-28 h-28 mr-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-black">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.model}</p>
                  <p className="text-xl font-bold mt-1 text-black">${product.price.toFixed(2)}</p>
                  <button className="bg-[#F2631F] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 