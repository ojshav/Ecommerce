import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';

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

  // Handle product click to track recently viewed
  const handleProductClick = async (productId: string) => {
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
    if (categoryId) {
      setSelectedCategory(categoryId);
      // Expand the parent category if it exists
      const category = categories.find(cat => cat.category_id === Number(categoryId));
      if (category?.parent_id !== null && category?.parent_id !== undefined) {
        setExpandedCategories(prev => ({
          ...prev,
          [String(category.parent_id)]: true
        }));
      }
      // Reset to first page when category changes
      setCurrentPage(1);
    } else {
      setSelectedCategory('');
    }
  }, [location.search, categories]);

  // Toggle category expansion
  const toggleCategoryExpand = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Render category tree recursively
  const renderCategoryTree = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories[category.category_id] || false;
    const hasSubcategories = category.children && category.children.length > 0;

    return (
      <div key={category.category_id}>
        <button
          onClick={() => setSelectedCategory(String(category.category_id))}
          className={`w-full flex items-center justify-between py-1.5 hover:text-gray-700 transition-colors ${
            selectedCategory === String(category.category_id) ? 'text-primary-500 font-medium' : ''
          }`}
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          <div className="flex items-center">
            {hasSubcategories && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryExpand(category.category_id);
                }}
                className="p-1 rounded-full hover:bg-gray-100 mr-1"
              >
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
            <span className="text-sm">{category.name}</span>
          </div>
          {!hasSubcategories && <ChevronRight className="h-4 w-4" />}
        </button>

        {isExpanded && category.children && (
          <div className="ml-2">
            {category.children.map(subcategory => 
              renderCategoryTree(subcategory, level + 1)
            )}
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

      // Add filters if they exist
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
      if (searchQuery) {
        params.append('search', searchQuery);
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
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

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

  // Initial data fetch
  useEffect(() => {
    console.log('Initial data fetch started');
    console.log('API Base URL:', API_BASE_URL);
    fetchProducts();
    fetchRecentlyViewed();
    fetchCategories();
    fetchBrands();
  }, []);

  // Refetch products when filters or pagination changes
  useEffect(() => {
    console.log('Refetching products due to filter/pagination change:', {
      currentPage,
      selectedCategory,
      selectedBrands,
      priceRange,
      searchQuery
    });
    fetchProducts();
  }, [currentPage, selectedCategory, selectedBrands, priceRange, searchQuery]);
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 1000000]);
    setCurrentPage(1);
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4">
          <span>Home</span> / <span>Products</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Sidebar */}
          <div className="w-full md:w-56 pr-4">
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Category</h3>
              <div className="space-y-1">
                {categories.map(category => renderCategoryTree(category))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Brand</h3>
              <div className="flex flex-wrap gap-2">
                {brands && brands.map((brand) => (
                  <button
                    key={brand.brand_id || brand.id}
                    onClick={() => toggleBrand(String(brand.brand_id || brand.id))}
                    className={`px-2 py-1.5 border rounded-sm text-xs transition-colors ${
                      selectedBrands.includes(String(brand.brand_id || brand.id))
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {brand.name || brand.brand_name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium text-base mb-3">Price</h3>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <div className="relative pt-1">
                  <div className="w-full h-1 bg-gray-200 rounded-lg">
                    <div 
                      className="absolute h-1 bg-primary-500 rounded-lg"
                      style={{ width: `${(priceRange[1] / 1000000) * 100}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 text-sm text-primary-500 border border-primary-500 rounded hover:bg-primary-50"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <ProductCard 
                    product={product}
                    isNew={product.isNew}
                    isBuiltIn={product.isBuiltIn}
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1 my-6">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
                >
                <ChevronLeft className="h-4 w-4" />
              </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-6 h-6 flex items-center justify-center border rounded ${
                      currentPage === i + 1
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
                >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            )}
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
        <div className="mt-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium">Recently Viewed</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <ProductCard
                    product={product}
                    isNew={product.isNew}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;