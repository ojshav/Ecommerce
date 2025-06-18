import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, ChevronDown, ChevronUp, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import debounce from 'lodash/debounce';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Category {
  category_id: number;
  name: string;
  slug: string;
  icon_url: string;
  parent_id: number | null;
  children?: Category[];
}

const Products: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage] = useState(16);

  // Add new state for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Mobile filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  const mobileSortRef = useRef<HTMLDivElement>(null);
  const desktopSortRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  // Sort options
  const sortOptions = [
    { label: 'Newest First', value: 'newest', sort_by: 'created_at', order: 'desc' },
    { label: 'Oldest First', value: 'oldest', sort_by: 'created_at', order: 'asc' },
    { label: 'Price: High to Low', value: 'price-desc', sort_by: 'selling_price', order: 'desc' },
    { label: 'Price: Low to High', value: 'price-asc', sort_by: 'selling_price', order: 'asc' }
  ];

  // Add a new state for price range changes
  const [priceRangeChanged, setPriceRangeChanged] = useState(false);

  // Add these to the existing state declarations
  const [discountFilter, setDiscountFilter] = useState<number>(0);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [productType, setProductType] = useState<string[]>([]);
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>([]);
  const [warrantyFilter, setWarrantyFilter] = useState<boolean>(false);
  const [shippingFilter, setShippingFilter] = useState<string[]>([]);

  // Add price range presets
  const priceRanges = [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
    { label: 'Above ₹50,000', min: 50000, max: 1000000 }
  ];

  // Add new state for filter changes
  const [filterChanged, setFilterChanged] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Add these functions after the state declarations
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
    setSearchQuery('');
    setRatingFilter(0);
    setDiscountFilter(0);
    setCurrentPage(1);
  };

  // Add debounced fetch products function
  const debouncedFetchProducts = useCallback(
    debounce(async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: currentPage.toString(),
          per_page: perPage.toString(),
          sort_by: 'created_at',
          order: 'desc'
        });

        // Get URL parameters
        const urlParams = new URLSearchParams(location.search);
        const categoryId = urlParams.get('category') || location.pathname.split('/').pop();
        const brandId = urlParams.get('brand');

        // Add filters if they exist
        if (categoryId && categoryId !== 'products') {
          params.append('category_id', categoryId);
        }
        if (brandId) {
          params.append('brand_id', brandId);
          setSelectedBrands([brandId]);
        } else if (selectedBrands.length > 0) {
          params.append('brand_id', selectedBrands.join(','));
        }
        if (priceRange[0] > 0) {
          params.append('min_price', priceRange[0].toString());
        }
        if (priceRange[1] < 1000000) {
          params.append('max_price', priceRange[1].toString());
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }
        if (ratingFilter > 0) {
          params.append('min_rating', ratingFilter.toString());
        }
        if (discountFilter > 0) {
          params.append('min_discount', discountFilter.toString());
        }

        const apiUrl = `${API_BASE_URL}/api/products?${params}`;
        console.log('Fetching products with URL:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        console.log('Products response:', data);
        
        setProducts(data.products);
        setTotalPages(data.pagination.pages);
        setTotalProducts(data.pagination.total);

        // Update selected category if coming from navigation
        if (categoryId && !selectedCategory) {
          setSelectedCategory(categoryId);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }, 500),
    [currentPage, selectedCategory, selectedBrands, priceRange, searchQuery, ratingFilter, discountFilter]
  );

  // Initial data fetch
  useEffect(() => {
    console.log('Initial data fetch started');
    console.log('API Base URL:', API_BASE_URL);
    fetchCategories();
    fetchBrands();
    fetchRecentlyViewed();
    setIsInitialLoad(false);
  }, []);

  // Effect for filter changes
  useEffect(() => {
    if (!isInitialLoad) {
      setFilterChanged(true);
      debouncedFetchProducts();
    }
  }, [currentPage, selectedCategory, selectedBrands, priceRange, searchQuery, ratingFilter, discountFilter]);

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [debouncedFetchProducts]);

  // Update handlers to use debounced fetch
  const handlePriceRangeSelect = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  // Add debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setCurrentPage(1); // Reset to first page on new search
    }, 500),
    []
  );

  // Update search handler
  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  // Add search suggestions state
  const [searchSuggestions, setSearchSuggestions] = useState<{
    products: Product[];
    categories: Category[];
    brands: any[];
  }>({
    products: [],
    categories: [],
    brands: []
  });

  // Add function to fetch search suggestions
  const fetchSearchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions({ products: [], categories: [], brands: [] });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/search-suggestions?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  };

  // Update search input to show suggestions
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value);
    fetchSearchSuggestions(value);
  };

  // Add star rating component
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

  // Add rating options
  const ratingOptions = [4, 3, 2, 1];

  // Add back the missing handler functions
  const handleRatingFilter = (rating: number) => {
    setRatingFilter(rating === ratingFilter ? 0 : rating);
  };

  const handleDiscountFilter = (discount: number) => {
    setDiscountFilter(discount === discountFilter ? 0 : discount);
  };

  // Update handleProductClick to handle string IDs
  const handleProductClick = async (productId: string | number) => {
    try {
      // Navigate to product detail page
      navigate(`/product/${productId}`);
      
      // Track the view if user is authenticated
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch(`${API_BASE_URL}/api/products/${productId}/details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        // Refresh recently viewed products
        fetchRecentlyViewed();
      }
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  };

  // Fetch recently viewed products
  const fetchRecentlyViewed = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/api/products/recently-viewed`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recently viewed products');
      }

      const data = await response.json();
      setRecentlyViewed(data);
    } catch (err) {
      console.error('Error fetching recently viewed products:', err);
    }
  };

  // Update selected category when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category');
    const pathCategoryId = location.pathname.split('/').pop(); // Get category ID from path

    // Handle both query parameter and path-based category IDs
    const finalCategoryId = categoryId || pathCategoryId;
    
    if (finalCategoryId) {
      setSelectedCategory(finalCategoryId);
      // Expand the parent category if it exists
      const category = categories.find(cat => cat.category_id === Number(finalCategoryId));
      if (category?.parent_id !== null && category?.parent_id !== undefined) {
        setExpandedCategories(prev => ({
          ...prev,
          [String(category.parent_id)]: true
        }));
      }
    } else {
      setSelectedCategory('');
    }
  }, [location.search, location.pathname, categories]);

  // Toggle category expansion
  const toggleCategoryExpand = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Helper: find category depth and if leaf
  const getCategoryDepth = (cat: Category, parentDepth = 0): number => {
    if (!cat.children || cat.children.length === 0) return parentDepth;
    return Math.max(...cat.children.map(child => getCategoryDepth(child, parentDepth + 1)));
  };
  const isLeaf = (cat: Category) => !cat.children || cat.children.length === 0;

  // Render category tree recursively (Figma style)
  const renderCategoryTree = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories[category.category_id] || false;
    const hasSubcategories = category.children && category.children.length > 0;
    const isSelected = selectedCategory === String(category.category_id);
    const isLeafCategory = !category.children || category.children.length === 0;

    // Style logic
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
              // Update URL with selected category
              navigate(`/products/${category.category_id}`);
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
            {category.children.map(subcategory => renderCategoryTree(subcategory, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Fetch products with filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
        sort_by: 'created_at',
        order: 'desc'
      });

      // Get URL parameters
      const urlParams = new URLSearchParams(location.search);
      const categoryId = urlParams.get('category') || location.pathname.split('/').pop();
      const brandId = urlParams.get('brand');

      // Add filters if they exist
      if (categoryId && categoryId !== 'products') {
        params.append('category_id', categoryId);
      }
      if (brandId) {
        params.append('brand_id', brandId);
        setSelectedBrands([brandId]);
      } else if (selectedBrands.length > 0) {
        params.append('brand_id', selectedBrands.join(','));
      }
      if (priceRange[0] > 0) {
        params.append('min_price', priceRange[0].toString());
      }
      if (priceRange[1] < 1000000) {
        params.append('max_price', priceRange[1].toString());
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      // Add rating filter
      if (ratingFilter > 0) {
        params.append('min_rating', ratingFilter.toString());
      }

      // Add discount filter
      if (discountFilter > 0) {
        params.append('min_discount', discountFilter.toString());
      }

      const apiUrl = `${API_BASE_URL}/api/products?${params}`;

      console.log('Fetching products with URL:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      console.log('Products response:', data);
      
      setProducts(data.products);
      setTotalPages(data.pagination.pages);
      setTotalProducts(data.pagination.total);

      // Update selected category if coming from navigation
      if (categoryId && !selectedCategory) {
        setSelectedCategory(categoryId);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Update URL when brand selection changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (selectedBrands.length > 0) {
      const brand = brands.find(b => String(b.brand_id) === selectedBrands[0]);
      if (brand) {
        params.set('brand', brand.slug);
      }
    } else {
      params.delete('brand');
    }
    navigate(`?${params.toString()}`);
  }, [selectedBrands, brands, navigate, location.search]);

  // Update fetchCategories to use the new categories endpoint
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('Categories data:', data);
      // No need to organize categories as they come pre-organized from the backend
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/`);
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      console.log('Brands data:', data);
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  // Sort products based on selected sort option
  const sortProducts = (productsToSort: Product[], sortValue: string) => {
    const sortedProducts = [...productsToSort];
    switch (sortValue) {
      case 'newest':
        return sortedProducts.sort((a, b) => 
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
      case 'oldest':
        return sortedProducts.sort((a, b) => 
          new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
        );
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      default:
        return sortedProducts;
    }
  };

  // Handle sort change
  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsMobileSortOpen(false);
    // Sort existing products without making a new API call
    setProducts(prevProducts => sortProducts(prevProducts, value));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileSortRef.current && !mobileSortRef.current.contains(event.target as Node)) {
        setIsMobileSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <p className="text-xl font-semibold mb-2">Error Loading Products</p>
          <p>{error}</p>
          <button 
            onClick={() => fetchProducts()}
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
          <span>Home</span> / <span>Products</span>
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
                      onClick={() => handleDiscountFilter(discount)}
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
                      onClick={() => handleRatingFilter(rating)}
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
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
              />
              {searchQuery && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {searchSuggestions.products.length > 0 && (
                    <div className="p-2">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">Products</h3>
                      {searchSuggestions.products.map(product => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
                        >
                          {product.primary_image && (
                            <img src={product.primary_image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-gray-500">₹{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchSuggestions.categories.length > 0 && (
                    <div className="p-2 border-t">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">Categories</h3>
                      {searchSuggestions.categories.map(category => (
                        <div
                          key={category.category_id}
                          onClick={() => {
                            setSelectedCategory(String(category.category_id));
                            setSearchQuery('');
                          }}
                          className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                        >
                          <p className="text-sm">{category.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchSuggestions.brands.length > 0 && (
                    <div className="p-2 border-t">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">Brands</h3>
                      {searchSuggestions.brands.map(brand => (
                        <div
                          key={brand.brand_id}
                          onClick={() => {
                            setSelectedBrands([String(brand.brand_id)]);
                            setSearchQuery('');
                          }}
                          className="p-2 hover:bg-gray-50 cursor-pointer rounded"
                        >
                          <p className="text-sm">{brand.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

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

            {products.length === 0 ? (
              <div className="flex justify-center items-center py-16">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => handleProductClick(String(product.id))}
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
                {/* Page numbers with ... */}
                {(() => {
                  const pages = [];
                  let start = Math.max(1, currentPage - 2);
                  let end = Math.min(totalPages, currentPage + 2);

                  if (currentPage <= 3) {
                    end = Math.min(5, totalPages);
                  }
                  if (currentPage >= totalPages - 2) {
                    start = Math.max(1, totalPages - 4);
                  }

                  if (start > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors ${
                          currentPage === 1 
                            ? 'bg-[#F2631F] text-white border-[#F2631F]' 
                            : 'border-gray-300 hover:border-[#F2631F]'
                        }`}
                      >
                        1
                      </button>
                    );
                    if (start > 2) {
                      pages.push(<span key="start-ellipsis" className="px-2">...</span>);
                    }
                  }

                  for (let i = start; i <= end; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors ${
                          currentPage === i 
                            ? 'bg-[#F2631F] text-white border-[#F2631F]' 
                            : 'border-gray-300 hover:border-[#F2631F]'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (end < totalPages) {
                    if (end < totalPages - 1) {
                      pages.push(<span key="end-ellipsis" className="px-2">...</span>);
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors ${
                          currentPage === totalPages 
                            ? 'bg-[#F2631F] text-white border-[#F2631F]' 
                            : 'border-gray-300 hover:border-[#F2631F]'
                        }`}
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}
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

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recently Viewed</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {recentlyViewed.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(String(product.id))}
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
          </div>
        )}
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
                      onClick={() => handleRatingFilter(rating)}
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
                      onClick={() => handleDiscountFilter(discount)}
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
  );
};

export default Products;