import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, X, SlidersHorizontal, ArrowUpDown, Package, Truck, DollarSign } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';

interface Category {
  category_id: number;
  name: string;
  slug: string;
  icon_url: string;
  parent_id: number | null;
  children?: Category[];
}

interface Brand {
  id: number;
  name: string;
  slug: string;
}

const Wholesale: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [minQuantity, setMinQuantity] = useState<number>(10);
  
  // Mobile filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('price_low_high');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  // Add new state for expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Demo categories for wholesale
  const categories: Category[] = [
    {
      category_id: 1,
      name: 'Electronics',
      slug: 'electronics',
      icon_url: '',
      parent_id: null,
      children: [
        { category_id: 11, name: 'Smartphones', slug: 'smartphones', icon_url: '', parent_id: 1 },
        { category_id: 12, name: 'Laptops', slug: 'laptops', icon_url: '', parent_id: 1 },
        { category_id: 13, name: 'Tablets', slug: 'tablets', icon_url: '', parent_id: 1 },
        { category_id: 14, name: 'Accessories', slug: 'accessories', icon_url: '', parent_id: 1 },
      ]
    },
    {
      category_id: 2,
      name: 'Fashion',
      slug: 'fashion',
      icon_url: '',
      parent_id: null,
      children: [
        { category_id: 21, name: 'Men\'s Clothing', slug: 'mens-clothing', icon_url: '', parent_id: 2 },
        { category_id: 22, name: 'Women\'s Clothing', slug: 'womens-clothing', icon_url: '', parent_id: 2 },
        { category_id: 23, name: 'Footwear', slug: 'footwear', icon_url: '', parent_id: 2 },
        { category_id: 24, name: 'Bags & Accessories', slug: 'bags-accessories', icon_url: '', parent_id: 2 },
      ]
    },
    {
      category_id: 3,
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon_url: '',
      parent_id: null,
      children: [
        { category_id: 31, name: 'Appliances', slug: 'appliances', icon_url: '', parent_id: 3 },
        { category_id: 32, name: 'Furniture', slug: 'furniture', icon_url: '', parent_id: 3 },
        { category_id: 33, name: 'Kitchenware', slug: 'kitchenware', icon_url: '', parent_id: 3 },
        { category_id: 34, name: 'Home Decor', slug: 'home-decor', icon_url: '', parent_id: 3 },
      ]
    },
    {
      category_id: 4,
      name: 'Sports & Fitness',
      slug: 'sports-fitness',
      icon_url: '',
      parent_id: null,
      children: [
        { category_id: 41, name: 'Fitness Equipment', slug: 'fitness-equipment', icon_url: '', parent_id: 4 },
        { category_id: 42, name: 'Sports Apparel', slug: 'sports-apparel', icon_url: '', parent_id: 4 },
        { category_id: 43, name: 'Outdoor Gear', slug: 'outdoor-gear', icon_url: '', parent_id: 4 },
        { category_id: 44, name: 'Team Sports', slug: 'team-sports', icon_url: '', parent_id: 4 },
      ]
    }
  ];

  // Demo brands for wholesale
  const brands: Brand[] = [
    { id: 1, name: 'Samsung', slug: 'samsung' },
    { id: 2, name: 'Apple', slug: 'apple' },
    { id: 3, name: 'Nike', slug: 'nike' },
    { id: 4, name: 'Adidas', slug: 'adidas' },
    { id: 5, name: 'Sony', slug: 'sony' },
    { id: 6, name: 'LG', slug: 'lg' },
    { id: 7, name: 'Whirlpool', slug: 'whirlpool' },
    { id: 8, name: 'Godrej', slug: 'godrej' },
    { id: 9, name: 'Boat', slug: 'boat' },
    { id: 10, name: 'OnePlus', slug: 'oneplus' },
  ];

  // Demo wholesale products with bulk pricing
  const wholesaleProducts: Product[] = [
    {
      id: 'w1',
      name: 'Samsung Galaxy A54 Bulk Pack',
      price: 25000,
      originalPrice: 28000,
      category: 'Smartphones',
      description: 'Bulk pack of Samsung Galaxy A54 smartphones. Minimum order: 10 units. Perfect for retailers and resellers.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      sku: 'WSG-A54-BULK',
      stock: 500,
      rating: 4.5,
      reviews: 89,
      currency: '₹',
      brand: 'Samsung',
      tags: ['bulk', 'wholesale', 'smartphones']
    },
    {
      id: 'w2',
      name: 'Nike Men\'s T-Shirt Wholesale Lot',
      price: 800,
      originalPrice: 1200,
      category: 'Men\'s Clothing',
      description: 'Wholesale lot of Nike men\'s t-shirts. Assorted sizes and colors. Minimum order: 50 pieces.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
      sku: 'WNK-TS-BULK',
      stock: 1000,
      rating: 4.3,
      reviews: 156,
      currency: '₹',
      brand: 'Nike',
      tags: ['bulk', 'wholesale', 'clothing']
    },
    {
      id: 'w3',
      name: 'Bluetooth Earphones Bulk Order',
      price: 1500,
      originalPrice: 2000,
      category: 'Accessories',
      description: 'High-quality Bluetooth earphones in bulk. Perfect for electronics retailers. Minimum order: 25 units.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
      sku: 'WBT-EP-BULK',
      stock: 750,
      rating: 4.4,
      reviews: 203,
      currency: '₹',
      brand: 'Boat',
      tags: ['bulk', 'wholesale', 'audio']
    },
    {
      id: 'w4',
      name: 'LED TV 43" Wholesale Pack',
      price: 22000,
      originalPrice: 25000,
      category: 'Electronics',
      description: 'LG 43" LED TV wholesale pack. Ideal for electronics dealers. Minimum order: 5 units.',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop',
      sku: 'WLG-TV43-BULK',
      stock: 200,
      rating: 4.7,
      reviews: 78,
      currency: '₹',
      brand: 'LG',
      tags: ['bulk', 'wholesale', 'tv']
    },
    {
      id: 'w5',
      name: 'Kitchen Appliance Combo Pack',
      price: 15000,
      originalPrice: 18000,
      category: 'Appliances',
      description: 'Combo pack of kitchen appliances - mixer, toaster, kettle. Great for home appliance retailers.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop',
      sku: 'WKA-COMBO-BULK',
      stock: 300,
      rating: 4.2,
      reviews: 124,
      currency: '₹',
      brand: 'Whirlpool',
      tags: ['bulk', 'wholesale', 'appliances']
    },
    {
      id: 'w6',
      name: 'Adidas Sports Shoes Bulk Lot',
      price: 3500,
      originalPrice: 4500,
      category: 'Footwear',
      description: 'Adidas sports shoes in bulk. Various sizes available. Minimum order: 20 pairs.',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      sku: 'WAD-SS-BULK',
      stock: 400,
      rating: 4.6,
      reviews: 167,
      currency: '₹',
      brand: 'Adidas',
      tags: ['bulk', 'wholesale', 'footwear']
    },
    {
      id: 'w7',
      name: 'Office Chair Wholesale Pack',
      price: 8000,
      originalPrice: 10000,
      category: 'Furniture',
      description: 'Ergonomic office chairs in bulk. Perfect for office furniture dealers. Minimum order: 10 chairs.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
      sku: 'WOC-BULK',
      stock: 150,
      rating: 4.1,
      reviews: 92,
      currency: '₹',
      brand: 'Godrej',
      tags: ['bulk', 'wholesale', 'furniture']
    },
    {
      id: 'w8',
      name: 'Laptop Bulk Order - i5 Processor',
      price: 45000,
      originalPrice: 50000,
      category: 'Laptops',
      description: 'Bulk order of laptops with i5 processor. Ideal for corporate sales. Minimum order: 5 units.',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=600&auto=format&fit=crop',
      sku: 'WLP-I5-BULK',
      stock: 100,
      rating: 4.8,
      reviews: 234,
      currency: '₹',
      brand: 'Dell',
      tags: ['bulk', 'wholesale', 'laptops']
    }
  ];

  // Handle product click
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Initialize products
  useEffect(() => {
    setFilteredProducts(wholesaleProducts);
  }, []);

  // Apply filters
  useEffect(() => {
    let products = [...wholesaleProducts];
    
    // Apply search filter
    if (searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      const category = categories.find(cat => cat.category_id === Number(selectedCategory));
      if (category) {
        products = products.filter(product =>
          product.category.toLowerCase().includes(category.name.toLowerCase())
        );
      }
    }
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      products = products.filter(product =>
        selectedBrands.some(brandId => {
          const brand = brands.find(b => b.id === Number(brandId));
          return brand && product.brand === brand.name;
        })
      );
    }
    
    // Apply price filter
    products = products.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (selectedSort) {
      case 'price_low_high':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'stock_high_low':
        products.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }
    
    setFilteredProducts(products);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, selectedSort, minQuantity]);

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
    const isSelected = selectedCategory === String(category.category_id);

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
          <div className="space-y-1">
            {category.children.map(child => renderCategoryTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Filter functions
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 500000]);
    setSearchQuery('');
    setMinQuantity(10);
  };

  const handleSort = (value: string) => {
    setSelectedSort(value);
    setIsSortOpen(false);
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Mobile components
  const MobileFilterSidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setIsFilterOpen(false)}>
            <X size={24} />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <div className="space-y-1">
            {categories.map(category => renderCategoryTree(category))}
          </div>
        </div>
        
        {/* Brands */}
        <div>
          <h4 className="font-semibold mb-3">Brands</h4>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => {
              const isSelected = selectedBrands.includes(String(brand.id));
              return (
                <button
                  key={brand.id}
                  onClick={() => toggleBrand(String(brand.id))}
                  className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                    isSelected
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-gray-100 border-gray-200 text-black hover:border-orange-500'
                  }`}
                >
                  {brand.name}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <h4 className="font-semibold mb-3">Price Range</h4>
          <div className="px-2">
            <div className="flex justify-between text-xs text-gray-700 mb-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="5000"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
        
        <button
          onClick={resetFilters}
          className="w-full px-4 py-2 text-orange-500 border border-orange-500 rounded hover:bg-orange-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  const MobileSortDropdown = () => (
    <div className={`fixed inset-0 z-50 ${isSortOpen ? 'block' : 'hidden'} md:hidden`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSortOpen(false)}></div>
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <div className="space-y-2">
          {[
            { value: 'price_low_high', label: 'Price: Low to High' },
            { value: 'price_high_low', label: 'Price: High to Low' },
            { value: 'name_asc', label: 'Name: A to Z' },
            { value: 'name_desc', label: 'Name: Z to A' },
            { value: 'stock_high_low', label: 'Stock: High to Low' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className={`w-full text-left p-3 rounded ${
                selectedSort === option.value ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-500">Home</Link> / 
          <span> Wholesale Products</span>
        </div>
        
        {/* Wholesale Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Wholesale Products</h1>
              <p className="text-gray-600 mb-4">Bulk orders at wholesale prices for retailers and resellers</p>
              
              {/* Wholesale Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Bulk Quantities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Wholesale Prices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Free Shipping</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white">
                B2B Sales
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Sidebar - Hidden on mobile */}
          <aside className="hidden md:block w-64 pr-4 border-r border-gray-100">
            <div className="mb-8">
              <h3 className="font-semibold text-base mb-3 text-black">Category</h3>
              <div className="space-y-1">
                {categories.map(category => renderCategoryTree(category))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-base mb-3 text-black">Brand</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => {
                  const isSelected = selectedBrands.includes(String(brand.id));
                  return (
                    <button
                      key={brand.id}
                      onClick={() => toggleBrand(String(brand.id))}
                      className={`px-3 py-1.5 rounded-full border text-xs font-normal transition-colors focus:outline-none ${
                        isSelected
                          ? 'bg-[#F2631F] text-white border-[#F2631F] shadow'
                          : 'bg-gray-100 border-gray-200 text-black hover:border-[#F2631F] hover:text-[#F2631F]'
                      }`}
                    >
                      {brand.name}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-semibold text-base mb-3 text-black">Price Range</h3>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-700 mb-2 font-normal">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <div className="relative pt-1">
                  <div className="w-full h-1 bg-gray-200 rounded-lg">
                    <div
                      className="absolute h-1 bg-[#F2631F] rounded-lg"
                      style={{ width: `${(priceRange[1] / 500000) * 100}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Minimum Quantity Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-base mb-3 text-black">Min Quantity</h3>
              <select
                value={minQuantity}
                onChange={(e) => setMinQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value={10}>10+ units</option>
                <option value={25}>25+ units</option>
                <option value={50}>50+ units</option>
                <option value={100}>100+ units</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="w-full px-4 py-2 text-sm font-normal text-[#F2631F] border border-[#F2631F] rounded hover:bg-orange-50 transition-colors"
            >
              Reset Filters
            </button>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
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
                onClick={() => setIsSortOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <ArrowUpDown size={20} />
                <span>Sort</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wholesale products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Desktop Sort Dropdown */}
            <div className="hidden md:flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">
                Showing {currentProducts.length} of {filteredProducts.length} wholesale products
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600 text-sm">Sort by:</label>
                <select
                  id="sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm bg-white"
                >
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                  <option value="stock_high_low">Stock: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Count Mobile */}
            <div className="md:hidden mb-4">
              <p className="text-sm text-gray-600">
                Showing {currentProducts.length} of {filteredProducts.length} wholesale products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {currentProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer relative"
                >
                  {/* Wholesale Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">WHOLESALE</span>
                  </div>
                  <ProductCard 
                    product={product}
                    isNew={false}
                    isBuiltIn={false}
                  />
                </div>
              ))}
            </div>
            
            {/* No Products Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Package className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No wholesale products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 my-6">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center border rounded ${
                      currentPage === i + 1
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <MobileFilterSidebar />
        
        {/* Mobile Sort Dropdown */}
        <MobileSortDropdown />

        {/* Wholesale Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our Wholesale Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Bulk Quantities</h3>
              <p className="text-sm text-gray-600">Large inventory available for bulk orders</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Competitive Prices</h3>
              <p className="text-sm text-gray-600">Best wholesale prices in the market</p>
            </div>
            <div className="text-center">
              <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">Free shipping on bulk orders above ₹50,000</p>
            </div>
            <div className="text-center">
              <ChevronRight className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick processing and delivery times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wholesale; 