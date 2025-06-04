import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, SlidersHorizontal, ArrowUpDown, X, Check, ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

const NewProduct: React.FC = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('date-desc'); // Default sort

  // Refs for dropdowns to detect outside clicks
  const desktopSortRef = useRef<HTMLDivElement>(null); // Ref for desktop sort dropdown container
  const mobileSortRef = useRef<HTMLDivElement>(null); // Ref for mobile sort dropdown container

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

  // Get unique categories from newProducts
  const categories = Array.from(new Set(newProducts.map(p => p.category)));

  // Sort options for mobile
  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'price-asc', label: 'Price: Low to High' },
  ];

  // Handle sort selection (used by mobile dropdown)
  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsMobileSortOpen(false); // Close mobile sort dropdown after selection
    setIsDesktopSortOpen(false); // Also close desktop sort dropdown if open (safety measure)
    // Add sorting logic here if needed, or rely on displayProducts sorting
  };

  // Reset filters (for mobile)
  const resetFilters = () => {
    setActiveFilter(null);
    setFilterType(null);
    setIsFilterOpen(false);
    // Reset sort as well if desired
    setSelectedSort('date-desc');
  };

  // Close dropdowns/modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close desktop sort dropdown
      if (desktopSortRef.current && !(desktopSortRef.current as Node).contains(event.target as Node)) {
        setIsDesktopSortOpen(false);
      }
      // Close mobile sort dropdown
      if (mobileSortRef.current && !(mobileSortRef.current as Node).contains(event.target as Node)) {
        setIsMobileSortOpen(false);
      }
      // The mobile filter sidebar does not close on outside click
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopSortOpen, isMobileSortOpen]); // Dependency array updated

  // Mobile Filter Sidebar Component
  const MobileFilterSidebar = () => (
    <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)} className="p-2">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-base mb-3 text-black">Category</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                    activeFilter === category ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    setActiveFilter(category);
                    setFilterType('category');
                    // setIsFilterOpen(false); // Keep filter open to apply multiple filters
                  }}
                >
                  {activeFilter === category && <Check size={16} className="mr-2 text-[#F2631F]" />}
                  <span className="capitalize">{category}</span>
                </button>
              ))}
              {/* Add option to show all */}
              <button
                className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  activeFilter === null ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setActiveFilter(null);
                  setFilterType(null);
                }}
              >
                {activeFilter === null && <Check size={16} className="mr-2 text-[#F2631F]" />}
                <span>All Categories</span>
              </button>
            </div>
          </div>
          {/* Add other potential filters here if needed for New Products */}
        </div>
        <div className="p-4 border-t">
          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 text-sm font-normal text-[#F2631F] border border-[#F2631F] rounded hover:bg-orange-50 transition-colors mb-2"
          >
            Reset Filters
          </button>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full px-4 py-2 text-sm font-normal text-white bg-[#F2631F] rounded hover:bg-[#e55a1a] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile Sort Dropdown Component
  const MobileSortDropdown = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isMobileSortOpen ? 'block' : 'hidden'}`}>
      <div ref={mobileSortRef} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl transform transition-transform duration-300 ease-in-out">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sort By</h3>
            <button onClick={() => setIsMobileSortOpen(false)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  selectedSort === option.value
                    ? 'bg-orange-50 text-[#F2631F]'
                    : 'hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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
          {/* Desktop Sort Dropdown */}
          <div className="hidden sm:flex relative" ref={desktopSortRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
              onClick={() => setIsDesktopSortOpen(!isDesktopSortOpen)}
            >
              <span>Sort By: </span>
              <span>
                {selectedSort === 'date-desc' && 'Newest First'}
                {selectedSort === 'date-asc' && 'Oldest First'}
                {selectedSort === 'price-desc' && 'Price: High to Low'}
                {selectedSort === 'price-asc' && 'Price: Low to High'}
              </span>
              <ChevronDown size={16} />
            </button>

            {isDesktopSortOpen && (
              <div className="absolute z-20 w-full bg-white border rounded-md shadow-lg top-full">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedSort(option.value);
                      setIsDesktopSortOpen(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      selectedSort === option.value ? 'bg-gray-100' : ''
                    }`}
                  >
                    {selectedSort === option.value && <Check size={16} className="mr-2 text-primary-600" />}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter and Sort Bar */}
        <div className="sm:hidden flex items-center gap-2 mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setIsMobileSortOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <ArrowUpDown size={20} />
            <span>Sort</span>
          </button>
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

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar />

      {/* Mobile Sort Dropdown */}
      <MobileSortDropdown />
    </div>
  );
};

export default NewProduct; 