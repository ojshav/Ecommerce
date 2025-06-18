import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, SlidersHorizontal, ArrowUpDown, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Category } from '../types';
import ProductCard from '../components/product/ProductCard';
import debounce from 'lodash/debounce';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get search parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'all';
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [discountFilter, setDiscountFilter] = useState<number>(0);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage] = useState(16);

  // Sort states
  const [selectedSort, setSelectedSort] = useState('newest');
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);
  const mobileSortRef = React.useRef<HTMLDivElement>(null);
  const desktopSortRef = React.useRef<HTMLDivElement>(null);

  // Sort options
  const sortOptions = [
    { label: 'Newest First', value: 'newest', sort_by: 'created_at', order: 'desc' },
    { label: 'Oldest First', value: 'oldest', sort_by: 'created_at', order: 'asc' },
    { label: 'Price: High to Low', value: 'price-desc', sort_by: 'selling_price', order: 'desc' },
    { label: 'Price: Low to High', value: 'price-asc', sort_by: 'selling_price', order: 'asc' }
  ];

  // Add new state for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  // Add price range presets
  const priceRanges = [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: 1000000 }
  ];

  // Add rating options
  const ratingOptions = [4, 3, 2, 1];

  // Fetch search results
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
        search: searchQuery,
        sort_by: sortOptions.find(opt => opt.value === selectedSort)?.sort_by || 'created_at',
        order: sortOptions.find(opt => opt.value === selectedSort)?.order || 'desc'
      });

      // Add filters
      if (selectedCategory) {
        params.append('category_id', selectedCategory);
      }
      if (selectedBrands.length > 0) {
        params.append('brand_id', selectedBrands.join(','));
      }
      if (priceRange[0] > 0) {
        params.append('min_price', priceRange[0].toString());
      }
      if (priceRange[1] < 1000000) {
        params.append('max_price', priceRange[1].toString());
      }
      if (ratingFilter > 0) {
        params.append('min_rating', ratingFilter.toString());
      }
      if (discountFilter > 0) {
        params.append('min_discount', discountFilter.toString());
      }

      const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.pagination.pages);
      setTotalProducts(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch results when search parameters change
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1); // Reset to first page on new search
      fetchSearchResults();
    }
  }, [searchQuery, currentPage, selectedSort, selectedCategory, selectedBrands, priceRange, ratingFilter, discountFilter]);

  // Handle sort change
  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsMobileSortOpen(false);
    setIsDesktopSortOpen(false);
  };

  // Handle product click
  const handleProductClick = async (productId: string | number) => {
    try {
      navigate(`/product/${productId}`);
      
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch(`${API_BASE_URL}/api/products/${productId}/details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  };

  // Add these functions
  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 1000000]);
    setRatingFilter(0);
    setDiscountFilter(0);
    setCurrentPage(1);
  };

  const handlePriceRangeSelect = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  // Add StarRating component
  const StarRating = ({ rating, onClick, selected }: { rating: number; onClick: () => void; selected: boolean }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 w-full text-left px-3 py-2 rounded-lg transition-colors ${
        selected ? 'bg-orange-50 text-[#F2631F]' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm ml-1">& Up</span>
    </button>
  );

  // Add fetchCategories and fetchBrands functions
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/`);
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  // Add useEffect for fetching categories and brands
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  // Add toggleCategoryExpand function
  const toggleCategoryExpand = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Add renderCategoryTree function
  const renderCategoryTree = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories[category.category_id] || false;
    const hasSubcategories = category.children && category.children.length > 0;
    const isSelected = selectedCategory === String(category.category_id);
    const isLeafCategory = !category.children || category.children.length === 0;

    let btnClass = 'w-full flex items-center justify-between py-2 px-2 transition-colors border-none text-left font-normal';
    let spanClass = 'text-sm font-normal';
    if (level === 0) {
      btnClass += ' bg-transparent text-black hover:bg-orange-50 rounded-none';
    } else if (hasSubcategories) {
      if (isSelected) {
        btnClass += ' bg-white border border-[#F2631F] text-black rounded-md shadow-sm';
      } else {
        btnClass += ' bg-transparent text-black hover:bg-orange-50 rounded-md';
      }
    } else {
      if (isSelected) {
        btnClass += ' bg-[#F2631F] text-white rounded-md shadow';
      } else {
        btnClass += ' bg-transparent text-black hover:bg-orange-50 rounded-md';
      }
    }

    return (
      <div key={category.category_id}>
        <button
          onClick={() => {
            if (hasSubcategories) {
              toggleCategoryExpand(category.category_id);
            } else {
              setSelectedCategory(String(category.category_id));
            }
          }}
          className={btnClass}
          style={{ paddingLeft: `${level * 1.25}rem` }}
        >
          <span className={spanClass}>{category.name}</span>
          {hasSubcategories && (
            <span className="flex items-center ml-auto">
              {isExpanded ? (
                <ChevronUp size={16} className="text-[#F2631F]" />
              ) : (
                <ChevronDown size={16} className="text-[#F2631F]" />
              )}
            </span>
          )}
        </button>
        {isExpanded && category.children && (
          <div className="ml-0">
            {category.children.map((subcategory: Category) => renderCategoryTree(subcategory, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error Loading Results</p>
          <p>{error}</p>
          <button 
            onClick={fetchSearchResults}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 sm:mb-6">
          <span>Home</span> / <span>Search Results</span>
        </div>

        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-600">
            Found {totalProducts} results
          </p>
        </div>

        {/* Mobile Filter and Sort Bar */}
        <div className="lg:hidden flex items-center gap-2 mb-4 sticky top-0 bg-white z-10 py-2">
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

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Sidebar - Hidden on mobile and tablet */}
          <aside className="hidden lg:block w-72 pr-6 border-r border-gray-100">
            <div className="sticky top-4">
              <div className="mb-8">
                <h3 className="font-semibold text-base mb-4 text-black">Category</h3>
                <div className="space-y-1">
                  {categories.map(category => renderCategoryTree(category))}
                </div>
              </div>
              
              {/* Brand Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-base mb-4 text-black">Brand</h3>
                <div className="flex flex-wrap gap-2">
                  {brands && brands.map((brand) => {
                    const isSelected = selectedBrands.includes(String(brand.brand_id || brand.id));
                    return (
                      <button
                        key={brand.brand_id || brand.id}
                        onClick={() => toggleBrand(String(brand.brand_id || brand.id))}
                        className={`px-3 py-1.5 rounded-full border text-xs font-normal transition-colors focus:outline-none ${
                          isSelected
                            ? 'bg-[#F2631F] text-white border-[#F2631F] shadow'
                            : 'bg-gray-100 border-gray-200 text-black hover:border-[#F2631F] hover:text-[#F2631F]'
                        }`}
                      >
                        {brand.name || brand.brand_name}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-base mb-4 text-black">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => handlePriceRangeSelect(range.min, range.max)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceRange[0] === range.min && priceRange[1] === range.max
                          ? 'bg-orange-50 text-[#F2631F]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-base mb-4 text-black">Discount</h3>
                <div className="space-y-2">
                  {[0, 10, 20, 30, 40, 50].map((discount) => (
                    <button
                      key={discount}
                      onClick={() => setDiscountFilter(discount === discountFilter ? 0 : discount)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        discountFilter === discount
                          ? 'bg-orange-50 text-[#F2631F]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {discount === 0 ? 'All Discounts' : `${discount}% and above`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-base mb-4 text-black">Customer Rating</h3>
                <div className="space-y-2">
                  {ratingOptions.map((rating) => (
                    <StarRating
                      key={rating}
                      rating={rating}
                      selected={ratingFilter === rating}
                      onClick={() => setRatingFilter(rating === ratingFilter ? 0 : rating)}
                    />
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm font-normal text-[#F2631F] border border-[#F2631F] rounded hover:bg-orange-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Rest of the existing content */}
          <div className="flex-1">
            {/* Desktop Sort Dropdown */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="relative" ref={desktopSortRef}>
                <button
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white hover:border-[#F2631F] transition-colors"
                  onClick={() => setIsDesktopSortOpen(!isDesktopSortOpen)}
                >
                  <span>Sort By: </span>
                  <span className="text-[#F2631F]">
                    {sortOptions.find(opt => opt.value === selectedSort)?.label}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {isDesktopSortOpen && (
                  <div className="absolute z-20 w-48 bg-white border rounded-lg shadow-lg top-full mt-1">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleSort(option.value)}
                        className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 ${
                          selectedSort === option.value ? 'bg-orange-50 text-[#F2631F]' : ''
                        }`}
                      >
                        {selectedSort === option.value && <Check size={16} className="mr-2 text-[#F2631F]" />}
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Grid */}
            {products.length === 0 ? (
              <div className="flex justify-center items-center py-16">
                <p className="text-gray-500">No products found matching your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="cursor-pointer transform transition-transform hover:scale-[1.02]"
                  >
                    <ProductCard 
                      product={product}
                      isNew={product.isNew ?? false}
                      isBuiltIn={product.isBuiltIn ?? false}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 my-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 hover:border-[#F2631F] transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors ${
                      currentPage === page 
                        ? 'bg-[#F2631F] text-white border-[#F2631F]' 
                        : 'border-gray-300 hover:border-[#F2631F]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 hover:border-[#F2631F] transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2">
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-1">
                    {categories.map(category => renderCategoryTree(category))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brand</h4>
                  <div className="flex flex-wrap gap-2">
                    {brands && brands.map((brand) => {
                      const isSelected = selectedBrands.includes(String(brand.brand_id || brand.id));
                      return (
                        <button
                          key={brand.brand_id || brand.id}
                          onClick={() => toggleBrand(String(brand.brand_id || brand.id))}
                          className={`px-3 py-1.5 rounded-full border text-xs font-normal transition-colors focus:outline-none ${
                            isSelected
                              ? 'bg-[#F2631F] text-white border-[#F2631F] shadow'
                              : 'bg-gray-100 border-gray-200 text-black hover:border-[#F2631F] hover:text-[#F2631F]'
                          }`}
                        >
                          {brand.name || brand.brand_name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => handlePriceRangeSelect(range.min, range.max)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          priceRange[0] === range.min && priceRange[1] === range.max
                            ? 'bg-orange-50 text-[#F2631F]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Customer Rating</h4>
                  <div className="space-y-2">
                    {ratingOptions.map((rating) => (
                      <StarRating
                        key={rating}
                        rating={rating}
                        selected={ratingFilter === rating}
                        onClick={() => setRatingFilter(rating === ratingFilter ? 0 : rating)}
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Discount Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Discount</h4>
                  <div className="space-y-2">
                    {[0, 10, 20, 30, 40, 50].map((discount) => (
                      <button
                        key={discount}
                        onClick={() => setDiscountFilter(discount === discountFilter ? 0 : discount)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          discountFilter === discount
                            ? 'bg-orange-50 text-[#F2631F]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {discount === 0 ? 'All Discounts' : `${discount}% and above`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#F2631F] transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-4 py-2 bg-[#F2631F] text-white rounded-lg hover:bg-[#e55a1a] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sort Dropdown */}
        {isMobileSortOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div ref={mobileSortRef} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl">
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
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
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
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage; 