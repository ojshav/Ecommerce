import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart, Heart, ChevronDown, Check, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

interface PromoProduct extends Product {
  discount: number;
  category: string;
}

const Promotion: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // Refs for dropdowns to detect outside clicks
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const mobileSortRef = useRef<HTMLDivElement>(null);

  // Enhanced promotional products with more items for the dedicated page
  const promoProducts: PromoProduct[] = [
    {
      id: "1001",
      name: "Apple MacBook Pro M2",
      price: 1799.99,
      originalPrice: 1999.99,
      discount: 10,
      description: "Latest model with 16GB RAM and 512GB SSD",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      primary_image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      rating: 4.9,
      reviews: 128,
      stock: 15,
      sku: "MAC-M2-001",
      currency: "USD"
    },
    {
      id: "1002",
      name: "Bose QuietComfort Earbuds",
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      description: "Noise cancelling wireless earbuds",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      primary_image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      rating: 4.7,
      reviews: 89,
      stock: 22,
      sku: "BOSE-QC-001",
      currency: "USD"
    },
    {
      id: "1003",
      name: "Samsung QLED 4K Smart TV",
      price: 899.99,
      originalPrice: 1299.99,
      discount: 30,
      description: "55-inch display with Quantum HDR",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
      primary_image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
      rating: 4.8,
      reviews: 156,
      stock: 7,
      sku: "SAM-TV-001",
      currency: "USD"
    },
    {
      id: "1004",
      name: "Nike Air Jordan Retro",
      price: 129.99,
      originalPrice: 180.00,
      discount: 28,
      description: "Classic basketball shoes with iconic style",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      primary_image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      rating: 4.6,
      reviews: 245,
      stock: 18,
      sku: "NIKE-AJ-001",
      currency: "USD"
    },
    {
      id: "1005",
      name: "Dyson V11 Vacuum",
      price: 499.99,
      originalPrice: 699.99,
      discount: 28,
      description: "Cordless vacuum with powerful suction",
      category: "Home",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      primary_image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4.9,
      reviews: 178,
      stock: 5,
      sku: "DYS-V11-001",
      currency: "USD"
    },
    {
      id: "1006",
      name: "Sony PlayStation 5",
      price: 449.99,
      originalPrice: 499.99,
      discount: 10,
      description: "Next-gen gaming console with SSD",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
      primary_image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
      rating: 4.9,
      reviews: 312,
      stock: 3,
      sku: "SONY-PS5-001",
      currency: "USD"
    },
    {
      id: "1007",
      name: "Organic Skincare Set",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      description: "Natural ingredients for all skin types",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      primary_image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4.5,
      reviews: 89,
      stock: 20,
      sku: "ORG-SKN-001",
      currency: "USD"
    },
    {
      id: "1008",
      name: "Le Creuset Dutch Oven",
      price: 249.99,
      originalPrice: 369.99,
      discount: 32,
      description: "Premium enameled cast iron cookware",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1585442231025-b77a6349cbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      primary_image: "https://images.unsplash.com/photo-1585442231025-b77a6349cbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 4.8,
      reviews: 134,
      stock: 12,
      sku: "LC-DO-001",
      currency: "USD"
    }
  ];

  // Get unique categories
  const categories = ['all', ...new Set(promoProducts.map(p => p.category))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? promoProducts 
    : promoProducts.filter(p => p.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      default: // popularity - we'll use rating as a proxy for popularity
        return b.rating - a.rating;
    }
  });

  // Sort options for mobile
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'discount', label: 'Discount' }
  ];

  // Handle sort selection
  const handleSort = (value: string) => {
    setSortBy(value);
    setIsSortOpen(false); // Close desktop dropdown
    setIsMobileSortOpen(false); // Close mobile dropdown
  };

  // Reset filters (for mobile)
  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('popularity'); // Or a default sort
    setIsFilterOpen(false);
  };

  // Close dropdowns/modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !(categoryRef.current as Node).contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !(sortRef.current as Node).contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (mobileSortRef.current && !(mobileSortRef.current as Node).contains(event.target as Node)) {
        setIsMobileSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoryOpen, isSortOpen, isMobileSortOpen]);

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
                    selectedCategory === category ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    // setIsFilterOpen(false); // Keep filter open to apply multiple filters
                  }}
                >
                  {selectedCategory === category && <Check size={16} className="mr-2 text-[#F2631F]" />}
                  <span className="capitalize">{category}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Add other potential filters here if needed for Promotions */}
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
            <button onClick={() => setIsSortOpen(false)} className="p-2">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  sortBy === option.value
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

  // Function to render star ratings
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : i === fullStars && hasHalfStar ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
          </span>
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <h2 className="text-2xl font-bold">Promotional Products</h2>
            <span className="text-gray-500">({filteredProducts.length} products)</span>
          </div>
          
          {/* Desktop Filter and Sort */}
          <div className="hidden md:flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Filter size={16} />
                <span>Category: {selectedCategory === 'all' ? 'All' : selectedCategory}</span>
                <ChevronDown size={16} />
              </button>
              
              {isCategoryOpen && (
                <div
                  ref={categoryRef}
                  className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
                >
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        selectedCategory === category ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {selectedCategory === category && <Check size={16} className="mr-2 text-[#F2631F]" />}
                      <span className="capitalize">{category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sort Filter */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span>Sort By: </span>
                <span>
                  {sortBy === 'popularity' && 'Popularity'}
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'discount' && 'Discount'}
                </span>
                <ChevronDown size={16} />
              </button>
              
              {isSortOpen && (
                <div
                  ref={sortRef}
                  className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        sortBy === option.value ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {sortBy === option.value && <Check size={16} className="mr-2 text-primary-600" />}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter and Sort Bar */}
        <div className="md:hidden flex items-center gap-2 mb-4">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              salePercentage={product.discount}
            />
          ))}
        </div>
        
        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No promotional products found</h3>
            <p className="text-gray-500 mb-6">Try changing your filter options to find products</p>
            <button 
              className="px-4 py-2 bg-[#F2631F] text-white rounded-md hover:bg-[#e55a1a] transition-colors"
              onClick={() => setSelectedCategory('all')}
            >
              Reset Filters
            </button>
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

export default Promotion;

 