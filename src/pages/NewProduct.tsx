import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

const NewProduct: React.FC = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Sample new products data with real images
  const newProducts: Product[] = [
    {
      id: '1',
      name: 'Smart Watch Pro X',
      price: 299.99,
      category: 'Smart Watch',
      description: 'Advanced smartwatch with health monitoring and GPS tracking',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
      sku: 'SW-001',
      stock: 15,
      rating: 4.5,
      reviews: 24,
      currency: 'USD',
      primary_image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
      isNew: true
    },
    {
      id: '2',
      name: 'Wireless Noise Cancelling Headphones',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Accessories',
      description: 'Premium over-ear headphones with active noise cancellation',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
      sku: 'HP-001',
      stock: 10,
      rating: 4.8,
      reviews: 36,
      currency: 'USD',
      primary_image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '3',
      name: 'Ultra Slim Laptop',
      price: 1299.99,
      category: 'Laptop',
      description: 'Powerful and lightweight laptop for professionals',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop',
      sku: 'LP-001',
      stock: 8,
      rating: 4.7,
      reviews: 42,
      currency: 'USD',
      primary_image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '4',
      name: 'iPad Pro 12.9"',
      price: 999.99,
      category: 'Tablet',
      description: 'Ultra-fast tablet with stunning display',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
      sku: 'TB-001',
      stock: 12,
      rating: 4.9,
      reviews: 56,
      currency: 'USD',
      primary_image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const brand = queryParams.get('brand');
    
    let filtered = [...newProducts];
    
    // Apply filters based on query parameters
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase());
      setActiveFilter(category);
      setFilterType('category');
    } else if (brand) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === brand.toLowerCase());
      setActiveFilter(brand);
      setFilterType('brand');
    } else {
      setActiveFilter(null);
      setFilterType(null);
    }
    
    setFilteredProducts(filtered);
  }, [location.search]);

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : newProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">New Products</h1>
            {activeFilter && (
              <div className="text-sm text-gray-600 mt-1">
                {filterType === 'category' && `Category: ${activeFilter}`}
                {filterType === 'brand' && `Brand: ${activeFilter}`}
              </div>
            )}
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <label htmlFor="sort" className="mr-2 text-gray-600 text-sm whitespace-nowrap">Sort by:</label>
            <select 
              id="sort" 
              className="border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm w-full sm:w-auto bg-white"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {displayProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isNew={product.isNew}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {displayProducts.length > 0 && (
          <div className="flex justify-center mt-8 mb-8">
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-700">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 rounded bg-[#F15A24] text-white mx-1">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">2</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-700 mx-1">3</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-700">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* You May Also Like */}
        {displayProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">You May Also Like</h2>
              <div className="flex space-x-2">
                <button className="border border-gray-200 p-1.5 rounded hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="border border-gray-200 p-1.5 rounded hover:bg-gray-50">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {newProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isNew={product.isNew}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProduct; 