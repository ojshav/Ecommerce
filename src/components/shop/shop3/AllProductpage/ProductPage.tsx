import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Shop3ProductCard from '../Shop3ProductCard';
import shop3ApiService, { Product, Category } from '../../../../services/shop3ApiService';

const mapProductToCard = (product: Product) => ({
  id: product.product_id,
  name: product.product_name,
  image: product.primary_image || "/assets/images/Productcard/card-section1.jpg",
  price: product.price,
  originalPrice: product.originalPrice ?? product.special_price ?? null,
  badge: product.is_on_special_offer ? (product.special_price ? `-${Math.round(100 * (1 - product.special_price / product.price))}%` : "Special Offer") : null,
  badgeColor: product.is_on_special_offer ? "bg-pink-600 text-white" : "bg-lime-400 text-black",
  isNew: false, // Adjust if you have a field for newness
  discount: product.is_on_special_offer && product.special_price ? Math.round(100 * (1 - product.special_price / product.price)) : null,
});

// View filter options configuration
const viewFilterOptions = [
  { value: 'all', label: 'All Products' },
  { value: 'new', label: 'New Arrival' },
  { value: 'price:asc', label: 'Low to High' },
  { value: 'price:desc', label: 'High to Low' },
  { value: 'product_name:asc', label: 'A-Z' },
  { value: 'product_name:desc', label: 'Z-A' },
];

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewFilter, setViewFilter] = useState<string>('all'); // Default view filter
  const [isViewFilterOpen, setIsViewFilterOpen] = useState(false); // Dropdown state
  const viewFilterDesktopRef = useRef<HTMLDivElement>(null); // Ref for desktop dropdown
  const viewFilterMobileRef = useRef<HTMLDivElement>(null); // Ref for mobile dropdown
  
  // Search dropdown states
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideDesktop = !viewFilterDesktopRef.current?.contains(event.target as Node);
      const isOutsideMobile = !viewFilterMobileRef.current?.contains(event.target as Node);
      const isOutsideSearch = !searchInputRef.current?.contains(event.target as Node) && 
                             !searchDropdownRef.current?.contains(event.target as Node);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsViewFilterOpen(false);
      }
      
      if (isOutsideSearch) {
        setIsSearchDropdownOpen(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await shop3ApiService.searchProducts(searchTerm.trim(), {
            per_page: 5 // Limit suggestions to 5 items
          });
          if (response.success) {
            setSearchSuggestions(response.products);
            setIsSearchDropdownOpen(true);
            setSelectedSuggestionIndex(-1);
          }
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
          setSearchSuggestions([]);
        }
      }, 300); // 300ms debounce
    } else {
      setSearchSuggestions([]);
      setIsSearchDropdownOpen(false);
      setSelectedSuggestionIndex(-1);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Handle keyboard navigation for search dropdown
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchDropdownOpen || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < searchSuggestions.length) {
          const selectedProduct = searchSuggestions[selectedSuggestionIndex];
          handleSuggestionClick(selectedProduct);
        } else {
          // Submit the current search term
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setIsSearchDropdownOpen(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.product_name);
    setIsSearchDropdownOpen(false);
    setSelectedSuggestionIndex(-1);
    
    // Navigate to search results
    const params = new URLSearchParams();
    params.set('search', product.product_name);
    if (viewFilter !== 'all') {
      params.set('filter', viewFilter);
    }
    const qs = params.toString();
    navigate(qs ? `/shop3-allproductpage?${qs}` : '/shop3-allproductpage');
  };

  const handleSearchSubmit = () => {
    const term = (searchTerm || '').trim();
    if (term) {
      const params = new URLSearchParams();
      params.set('search', term);
      if (viewFilter !== 'all') {
        params.set('filter', viewFilter);
      }
      const qs = params.toString();
      navigate(qs ? `/shop3-allproductpage?${qs}` : '/shop3-allproductpage');
    }
    setIsSearchDropdownOpen(false);
    setSelectedSuggestionIndex(-1);
  };

  // Resolve selected category name for breadcrumbs
  const selectedCategoryName = selectedCategory
    ? categories.find(c => c.category_id === selectedCategory)?.name
    : undefined;

  const handleProductClick = (productId: number) => {
    navigate(`/shop3-productpage?id=${productId}`);
  };

  // Load categories once
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await shop3ApiService.getCategories();
        setCategories(cats);
      } catch (e) {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  // Load products whenever URL params (search/category) change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Read params from URL
        const searchParam = searchParams.get('search');
        const categoryParam = searchParams.get('category');
        const filterParam = searchParams.get('filter');
        const parsedCategory = categoryParam ? parseInt(categoryParam, 10) : NaN;

        if (searchParam) setSearchTerm(searchParam);
        if (filterParam) setViewFilter(filterParam);
        
        const effectiveCategoryId = !isNaN(parsedCategory) ? parsedCategory : selectedCategory ?? undefined;
        if (!isNaN(parsedCategory)) {
          // keep local state in sync for active chip styling
          setSelectedCategory(parsedCategory);
        }

        const res = await shop3ApiService.getProducts({
          per_page: 20,
          search: searchParam || undefined,
          category_id: effectiveCategoryId,
          sort_by: viewFilter === 'all' || viewFilter === 'new' ? 'created_at' : viewFilter.split(':')[0],
          order: viewFilter === 'all' || viewFilter === 'new' ? 'desc' : viewFilter.split(':')[1]
        });
        if (res && res.success) {
          setProducts(res.products);
          setTotalProducts(res.pagination.total_items);
        } else {
          setProducts([]);
          setTotalProducts(0);
        }
      } catch (e) {
        setProducts([]);
        setTotalProducts(0);
      }
      setLoading(false);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, viewFilter]);

  const handleCategoryClick = (catId: number) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(searchParams);
    params.set('category', String(catId));
    // Preserve filter parameter
    if (viewFilter !== 'all') {
      params.set('filter', viewFilter);
    }
    const qs = params.toString();
    navigate(qs ? `?${qs}` : '?');
  };

  const handleViewFilterChange = (filterValue: string) => {
    setViewFilter(filterValue);
    setIsViewFilterOpen(false);
    
    // Update URL with filter parameter
    const params = new URLSearchParams(searchParams);
    if (filterValue !== 'all') {
      params.set('filter', filterValue);
    } else {
      params.delete('filter');
    }
    const qs = params.toString();
    navigate(qs ? `?${qs}` : '?');
  };

  // Get current view filter option label
  const getCurrentViewFilterLabel = () => {
    const currentOption = viewFilterOptions.find(option => option.value === viewFilter);
    return currentOption ? currentOption.label : 'View filters';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-12 px-4 sm:px-8 2xl:px-6">
      {/* Header & Breadcrumbs */}
      <div className="pt-6 pb-2 flex flex-col gap-2 max-w-[1920px] mx-auto ">
        <div className="flex items-center text-sm gap-2 text-white">
          <span className="text-[18px] font-alexandria font-semibold">Home</span>
          <span className="mx-1">&gt;</span>
          <span className="text-lime-400 text-[18px] font-alexandria font-semibold">{selectedCategoryName || 'All Products'}</span>
        </div>
      </div>
      {/* Full-width horizontal line */}
      <div className="w-screen mt-2 mb-2 relative left-1/2 right-1/2 -mx-[50vw]">
        <svg className="block" width="100%" height="1" viewBox="0 0 1920 1" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 1V0H1920V1H0Z" fill="#E0E0E0" />
        </svg>
      </div>
      {/* Main content with padding */}
      <div className="max-w-[1920px] mx-auto ">
        {/* Search Results Header */}
        {searchTerm && (
          <div className="mb-4">
            <p className="text-lg text-white">
              Search results for "{searchTerm}" - {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
        
        {/* Controls: Sort on left, Search center, View filters right */}
        <div className="mt-5">
          {/* Mobile: Search bar above filters */}
          <div className="mb-4 sm:hidden">
            <div className="relative w-full">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => {
                  if (searchSuggestions.length > 0) {
                    setIsSearchDropdownOpen(true);
                  }
                }}
                placeholder="Search products..."
                className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded px-3 py-2 pr-10 w-full focus:outline-none focus:border-lime-400"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-lime-400 transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Mobile Search Dropdown */}
              {isSearchDropdownOpen && searchSuggestions.length > 0 && (
                <div 
                  ref={searchDropdownRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded shadow-lg z-50 max-h-60 overflow-y-auto"
                >
                  {searchSuggestions.map((product, index) => (
                    <button
                      key={product.product_id}
                      onClick={() => handleSuggestionClick(product)}
                      className={`w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors flex items-center gap-3 ${
                        selectedSuggestionIndex === index ? 'bg-zinc-800 text-lime-400' : 'text-white'
                      }`}
                    >
                      <img 
                        src={product.primary_image || "/assets/images/Productcard/card-section1.jpg"} 
                        alt={product.product_name}
                        className="w-10 h-10 object-cover rounded"
                      />
                                              <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{product.product_name}</div>
                          <div className="text-sm text-gray-400">₹{product.price}</div>
                        </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Desktop: All controls in same line */}
          <div className="hidden sm:flex items-center justify-between">
            {/* Search bar on the left */}
            <div className="flex-1 flex justify-start">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => {
                    if (searchSuggestions.length > 0) {
                      setIsSearchDropdownOpen(true);
                    }
                  }}
                  placeholder="Search products..."
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded px-3 py-2 pr-10 w-80 md:w-[500px] lg:w-[600px] xl:w-[700px] focus:outline-none focus:border-lime-400"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-lime-400 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {/* Desktop Search Dropdown */}
                {isSearchDropdownOpen && searchSuggestions.length > 0 && (
                  <div 
                    ref={searchDropdownRef}
                    className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded shadow-lg z-50 max-h-60 overflow-y-auto"
                  >
                    {searchSuggestions.map((product, index) => (
                      <button
                        key={product.product_id}
                        onClick={() => handleSuggestionClick(product)}
                        className={`w-full text-left px-4 py-3 hover:bg-zinc-800 transition-colors flex items-center gap-3 ${
                          selectedSuggestionIndex === index ? 'bg-zinc-800 text-lime-400' : 'text-white'
                        }`}
                      >
                        <img 
                          src={product.primary_image || "/assets/images/Productcard/card-section1.jpg"} 
                          alt={product.product_name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{product.product_name}</div>
                          <div className="text-sm text-gray-400">₹{product.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* View filters dropdown on the right */}
            <div className="flex gap-7 items-center">
              <div className="relative" ref={viewFilterDesktopRef}>
                <button 
                  onClick={() => setIsViewFilterOpen(!isViewFilterOpen)}
                  className="flex items-center justify-between bg-gray-600 border px-4 py-2 w-[192px] hover:bg-gray-700 transition-colors"
                  aria-label="View filters"
                >
                  <span className="font-bold text-white text-[14px] font-alexandria">{getCurrentViewFilterLabel()}</span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isViewFilterOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 8L10 13L15 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                {isViewFilterOpen && (
                  <div className="absolute top-full right-0 mt-1 w-[192px] bg-zinc-900 border border-zinc-700 rounded shadow-lg z-50">
                    {viewFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleViewFilterChange(option.value)}
                        className={`w-full text-left px-4 py-2 text-[14px] font-alexandria hover:bg-zinc-800 transition-colors ${
                          viewFilter === option.value ? 'text-lime-400 bg-zinc-800' : 'text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile: Filters row */}
          <div className="flex items-center justify-center sm:hidden">
            <div className="flex gap-7 items-center">
              {/* View filters dropdown for mobile */}
              <div className="relative" ref={viewFilterMobileRef}>
                <button 
                  onClick={() => setIsViewFilterOpen(!isViewFilterOpen)}
                  className="flex items-center justify-between bg-gray-600 border px-4 py-2 w-[192px] hover:bg-gray-700 transition-colors"
                  aria-label="View filters"
                >
                  <span className="font-bold text-white text-[14px] font-alexandria">{getCurrentViewFilterLabel()}</span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isViewFilterOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 8L10 13L15 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                {/* Dropdown menu for mobile */}
                {isViewFilterOpen && (
                  <div className="absolute top-full left-0 mt-1 w-[192px] bg-zinc-900 border border-zinc-700 rounded shadow-lg z-50">
                    {viewFilterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleViewFilterChange(option.value)}
                        className={`w-full text-left px-4 py-2 text-[14px] font-alexandria hover:bg-zinc-800 transition-colors ${
                          viewFilter === option.value ? 'text-lime-400 bg-zinc-800' : 'text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-10 2xl:gap-12 gap-y-12 sm:gap-y-6 md:gap-y-8 lg:gap-y-20 xl:gap-y-24 2xl:gap-y-24 mt-8 justify-center mx-auto items-center">
        {loading ? (
          <div className="col-span-full text-center py-10">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-10">No products found.</div>
        ) : (
          products.map((product) => {
            const card = mapProductToCard(product);
            return (
              <Shop3ProductCard
                key={card.id}
                id={card.id}
                image={card.image}
                name={card.name}
                price={card.price}
                originalPrice={card.originalPrice}
                badge={card.badge}
                badgeColor={card.badgeColor}
                isNew={card.isNew}
                discount={card.discount}
                onClick={() => handleProductClick(product.product_id)}
              />
            );
          })
        )}
      </div>
      {/* Section below product cards */}
      <div className="flex flex-col items-center w-full pt-24 py-12">
        {!loading && totalProducts > 0 && (
          <span className="text-[14px] font-alexandria text-gray-200 mb-6">
            Showing {products.length} of {totalProducts} items
          </span>
        )}
        <button className="bg-[#CCFF00] text-black font-semibold text-[16px] px-20 py-3 font-alexandria mb-8 shadow-lg  transition-all">Load More</button>
        {/* Full-width horizontal line below product cards */}
        <div className="w-screen mb-8 relative -mx-[50vw]">
          <svg className="block" width="100%" height="3" viewBox="0 0 1920 1" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 1V0H1920V1H0Z" fill="#E0E0E0" />
          </svg>
        </div>
        <div className="flex flex-wrap justify-center font-alexandria gap-4 w-full">
          {categories.length === 0 ? (
            <span className="text-gray-300 text-sm">No categories</span>
          ) : (
            categories.map((cat) => (
              <button
                key={cat.category_id}
                onClick={() => handleCategoryClick(cat.category_id)}
                className={`font-bold font-alexandria text-[12px] leading-[30px] px-4 py-1 mb-2 transition-all shadow text-center border border-transparent ${
                  selectedCategory === cat.category_id
                    ? 'bg-[#CCFF00] text-black'
                    : 'bg-[rgba(204,255,0,0.7)] text-white hover:bg-[#CCFF00] hover:text-black'
                }`}
                aria-pressed={selectedCategory === cat.category_id}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductPage;

