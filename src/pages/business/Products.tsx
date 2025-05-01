import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  FunnelIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: 'Bluetooth Wireless Earbuds',
    category: 'Electronics',
    price: 89.99,
    stock: 120,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 2,
    name: 'Ultra Slim Smartphone Case',
    category: 'Phone Accessories',
    price: 19.99,
    stock: 350,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 3,
    name: 'USB-C Fast Charging Cable',
    category: 'Electronics',
    price: 14.99,
    stock: 430,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 4,
    name: 'HD Bluetooth Speaker',
    category: 'Audio',
    price: 99.95,
    stock: 75,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 5,
    name: 'Portable Power Bank 10000mAh',
    category: 'Electronics',
    price: 49.99,
    stock: 200,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 6,
    name: 'Smartphone Pop Socket Grip',
    category: 'Phone Accessories',
    price: 9.99,
    stock: 520,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 7,
    name: 'Fitness Tracker Smartwatch',
    category: 'Wearables',
    price: 129.99,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 8,
    name: 'Noise Cancelling Headphones',
    category: 'Audio',
    price: 179.99,
    stock: 45,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 9,
    name: 'Wireless Charging Pad',
    category: 'Electronics',
    price: 29.99,
    stock: 180,
    status: 'Active',
    image: 'https://placehold.co/80x80',
  },
  {
    id: 10,
    name: 'Premium Leather Phone Case',
    category: 'Phone Accessories',
    price: 34.99,
    stock: 0,
    status: 'Discontinued',
    image: 'https://placehold.co/80x80',
  },
];

// Categories for filter dropdown
const CATEGORIES = [
  'All Categories',
  'Electronics',
  'Phone Accessories',
  'Audio',
  'Wearables',
];

// Status options
const STATUS_OPTIONS = [
  'All',
  'Active',
  'Out of Stock',
  'Discontinued',
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Out of Stock':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    case 'Discontinued':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  }>({
    key: null,
    direction: 'ascending',
  });
  
  // Handle sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter products based on search, category, and status
  const filteredProducts = PRODUCTS.filter((product) => {
    // Search filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory =
      selectedCategory === 'All Categories' || product.category === selectedCategory;
    
    // Status filter
    const matchesStatus =
      selectedStatus === 'All' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Sort products
  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...filteredProducts];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [filteredProducts, sortConfig]);
  
  // Generate sort indicator
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 ml-1" />
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Page Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <div className="flex space-x-3">
          <Link
            to="/business/products/import"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Import Products
          </Link>
          <Link
            to="/business/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </div>
      </div>
      
      {/* Search, Filter, and Sort */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search products..."
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    id="price-min"
                    placeholder="Min"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                  <input
                    type="number"
                    id="price-max"
                    placeholder="Max"
                    className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Status
                </label>
                <select
                  id="stock"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option>All</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                  <option>Low Stock</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Product List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('name')}>
                    Product
                    {getSortIndicator('name')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('category')}>
                    Category
                    {getSortIndicator('category')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('price')}>
                    Price
                    {getSortIndicator('price')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('stock')}>
                    Stock
                    {getSortIndicator('stock')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('status')}>
                    Status
                    {getSortIndicator('status')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-sm object-cover" src={product.image} alt={product.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: #{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/business/products/${product.id}`} className="text-gray-600 hover:text-gray-900">
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link to={`/business/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedStatus('All');
                }}
                className="mt-2 text-primary-600 font-medium hover:text-primary-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{sortedProducts.length}</span> of{' '}
                <span className="font-medium">{sortedProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-700 hover:bg-gray-50">
                  1
                </button>
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 