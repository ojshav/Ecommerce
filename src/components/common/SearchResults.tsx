import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category?: string;
}

interface SearchResultsProps {
  isVisible: boolean;
  searchQuery: string;
  onItemClick?: () => void;
}

const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Apple Watch Series 5',
    category: 'Smart Watches'
  },
  {
    id: '2',
    name: 'Apple Watch Series 6',
    category: 'Smart Watches'
  },
  {
    id: '3',
    name: 'Apple Watch Series 7',
    category: 'Smart Watches'
  },
  {
    id: '4',
    name: 'Apple iPhone 13',
    category: 'Smartphones'
  },
  {
    id: '5',
    name: 'Apple MacBook Pro',
    category: 'Laptops'
  },
  {
    id: '6',
    name: 'Apple iPad Pro',
    category: 'Tablets'
  }
];

const SearchResults: React.FC<SearchResultsProps> = ({ isVisible, searchQuery, onItemClick }) => {
  if (!isVisible || !searchQuery) return null;

  // Filter products based on search query
  const filteredProducts = dummyProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for any click within the results
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="absolute left-0 right-0 w-full bg-white shadow-lg rounded-b-md overflow-hidden z-50 border border-gray-200 border-t-0">
      {filteredProducts.length > 0 ? (
        <div>
          <ul className="py-1 max-h-80 overflow-y-auto">
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link 
                  to={`/product/${product.id}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                  onClick={handleItemClick}
                >
                  <Search className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{product.name}</span>
                  {product.category && (
                    <span className="ml-2 text-xs text-gray-500">in {product.category}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 py-2 px-4">
            <Link 
              to={`/search?q=${searchQuery}`}
              className="text-[#F2631F] hover:text-orange-700 text-sm flex items-center"
              onClick={handleItemClick}
            >
              <Search className="w-4 h-4 mr-2" />
              See all results for "{searchQuery}"
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">No results found for "{searchQuery}"</div>
      )}
    </div>
  );
};

export default SearchResults; 