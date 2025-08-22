import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import shop1ApiService, { Product, Category, Brand } from '../../../../services/shop1ApiService';
import Shop1ProductCard from '../Shop1ProductCard';

// Using real data from API instead of mock data
const ProductPage = () => {
  // URL search params
  const [searchParams] = useSearchParams();
  
  // API Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dynamic Price Range States
  // priceRange is the FILTER value; only set when user presses FILTER
  const [priceRange, setPriceRange] = useState<number[] | null>(null);
  const minPrice = 0;
  const [maxPrice, setMaxPrice] = useState(100000);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const itemsPerPage = 9;

  // UI States (keeping original behavior)
  const [price, setPrice] = useState([0, 100000]);
  // Discount filter (single-select chip)
  const [discountChip, setDiscountChip] = useState<string | null>(null);
  // Mobile UI controls
  // Mobile UI controls
  // Sort select is rendered directly on mobile; no extra toggle state
  const [discountOpen, setDiscountOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mobileFilterTab, setMobileFilterTab] = useState<'price' | 'categories' | 'brands' | 'discount'>('price');
  

  // Sidebar section toggles for mobile
  const [allFiltersOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  // const [colorsOpen, setColorsOpen] = useState(false); // hidden section
  // const [sizeOpen, setSizeOpen] = useState(false); // hidden section

  // Price slider is fixed to [0, maxPrice]; dynamic min/max not used for now.

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [categoriesData, brandsData] = await Promise.all([
          shop1ApiService.getCategories(),
          shop1ApiService.getBrands()
        ]);
        
        setCategories(categoriesData);
        setBrands(brandsData);

        // Check for category filter from URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
          setSelectedCategory(parseInt(categoryParam));
        }


        // Apply discount filter from URL if present (e.g., ?discount=30+ or ?discount=50+)
        const discountParam = searchParams.get('discount');
        const allowed = new Set(['lt10','10+','20+','30+','40+','50+']);
        const normalized = discountParam ? discountParam.replace(/\s/g, '+') : null; // handle '+' decoded as space
        if (normalized && allowed.has(normalized)) {
          setDiscountChip(normalized);
          setCurrentPage(1);
        }

        // Check for search term from URL
        const searchParam = searchParams.get('search');
        if (searchParam) {
          setSearchTerm(searchParam);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams]);

  // Load products when filters change
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Map discount chip to discount_min/discount_max
        let discount_min: number | undefined = undefined;
        let discount_max: number | undefined = undefined;
        switch (discountChip) {
          case 'lt10':
            discount_min = 0;
            discount_max = 9.99;
            break;
          case '10+':
            discount_min = 10;
            break;
          case '20+':
            discount_min = 20;
            break;
          case '30+':
            discount_min = 30;
            break;
          case '40+':
            discount_min = 40;
            break;
          case '50+':
            discount_min = 50;
            break;
        }

        const response = await shop1ApiService.getProducts({
          page: currentPage,
          per_page: itemsPerPage,
          category_id: selectedCategory || undefined,
          brand_id: selectedBrand || undefined,
          min_price: priceRange ? priceRange[0] : undefined,
          max_price: priceRange ? priceRange[1] : undefined,

          discount_min,
          discount_max,

          search: searchTerm || undefined,

          sort_by: sortBy,
          order: sortOrder
        });

        if (response.success) {
          setProducts(response.products);
          setTotalProducts(response.pagination.total_items);
          setTotalPages(response.pagination.total_pages);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

  }, [currentPage, itemsPerPage, selectedCategory, selectedBrand, searchTerm,priceRange, sortBy, sortOrder, discountChip]);

  // When page changes, scroll to top of results for better UX
  useEffect(() => {
    try {
      const listTop = document.querySelector('#shop1-products-top');
      if (listTop) {
        (listTop as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {}
  }, [currentPage]);


  // Ensure left bound is always 0 and initialize UI range
  useEffect(() => {
    // Force min to 0 in UI
    if (price[0] !== 0) setPrice([0, price[1]]);
    if (priceRange === null) {
      setPrice([0, maxPrice]);
    }
  }, [priceRange, maxPrice]);

  // Fetch global maximum product price once
  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const res = await shop1ApiService.getProducts({ page: 1, per_page: 1, sort_by: 'selling_price', order: 'desc' });
        if (res?.success && res.products?.length > 0) {
          const top = res.products[0];
          const highest = Math.ceil((top.selling_price ?? top.price) || 0);
          if (highest > 0) {
            setMaxPrice(highest);
          }
        }
      } catch (e) {
        // keep default
      }
    };
    fetchMaxPrice();
  }, []);

  // Handle category selection
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle brand selection
  const handleBrandChange = (brandId: number | null) => {
    setSelectedBrand(brandId);
    setCurrentPage(1);
  };

  const handleMaxSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), price[0] + 1);
    const newPrice = [price[0], value];
    setPrice(newPrice);
  };

  // Input handlers for price inputs
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const value = Number(inputValue);
    
    if (value > price[0] && value <= maxPrice) {
      const newPrice = [price[0], value];
      setPrice(newPrice);
    }
  };

  const handleMaxInputBlur = () => {
    // Ensure the value is within valid range
    const value = Math.min(maxPrice, Math.max(price[1], price[0] + 1));
    const newPrice = [price[0], value];
    setPrice(newPrice);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white mx-auto min-h-screen px-2 sm:px-4 md:px-8 lg:px-16 py-6 md:py-20 max-w-full md:max-w-[1440px]">
      {/* Mobile Filter Menu Icon moved into Controls for better alignment */}
      {/* Sidebar */}
      <aside className="w-full md:w-64 pr-0 md:pr-8 mb-8 md:mb-0">
        {/* All filter sections: show on desktop, or on mobile if allFiltersOpen is true */}
        <div className={`${allFiltersOpen ? 'block' : 'hidden'} md:block`}>
          {/* Categories */}
          <div className="mb-8">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setCategoryOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Categories</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Categories">
                {categoryOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${categoryOpen ? 'block' : 'hidden'} md:block`}>
              {categories.map((cat) => (
                <div key={cat.category_id} className="flex items-center mb-4">
                  <input 
                    type="radio" 
                    name="category" 
                    className="mr-2"
                    checked={selectedCategory === cat.category_id}
                    onChange={() => handleCategoryChange(cat.category_id)}
                  />
                  <span className="text-[16px] md:text-[18px] font-archivo font-medium">{cat.name}</span>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <input 
                  type="radio" 
                  name="category" 
                  className="mr-2"
                  checked={selectedCategory === null}
                  onChange={() => handleCategoryChange(null)}
                />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">All Categories</span>
              </div>
            </div>
          </div>
          {/* Brand */}
          <div className="mb-8 mt-10 md:mt-16">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setBrandOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Brand</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Brand">
                {brandOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${brandOpen ? 'block' : 'hidden'} md:block`}>
              {brands.map((brand) => (
                <div key={brand.brand_id} className="flex items-center mb-4">
                  <input 
                    type="radio" 
                    name="brand"
                    className="mr-2"
                    checked={selectedBrand === brand.brand_id}
                    onChange={() => handleBrandChange(brand.brand_id)}
                  />
                  <span className="text-[16px] md:text-[18px] font-archivo font-medium">{brand.name}</span>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <input 
                  type="radio" 
                  name="brand"
                  className="mr-2"
                  checked={selectedBrand === null}
                  onChange={() => handleBrandChange(null)}
                />
                <span className="text-[16px] md:text-[18px] font-archivo font-medium">All Brands</span>
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="mb-8">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setPriceOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Price</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Price">
                {priceOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${priceOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">₹</span>
                  <input
                    type="text"
                    value={0}
                    readOnly
                    className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal font-poppins bg-gray-100 text-gray-500 pl-4"
                    placeholder="Min"
                    aria-label="Minimum price fixed at 0"
                  />
                </div>
                <div className="flex-1 h-px bg-gray-300 mx-2 md:mx-4"></div>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">₹</span>
                  <input
                    type="text"
                    value={price[1]}
                    onChange={handleMaxInput}
                    onBlur={handleMaxInputBlur}
                    className="w-[50px] md:w-[63px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal bg-white shadow-sm focus:border-blue-500 focus:outline-none pl-4"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              {/* Price Range Slider */}
              <div className="relative mb-4" style={{ height: 20 }}>
                {/* Track */}
                <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-gray-200 rounded-full"></div>
                
                {/* Active range track */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${((0 - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%`,
                    right: `${100 - ((price[1] - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%`
                  }}
                ></div>
                
                {/* Max slider - covers right half */}
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={price[1]}
                  onChange={handleMaxSlider}
                  className="absolute opacity-0 cursor-pointer"
                  style={{ 
                    zIndex: 2,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
                
                {/* Slider thumbs */}
                <div 
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${((price[1] - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%`,
                    top: '50%'
                  }}
                ></div>
              </div>
              <button
                className="px-3 bg-black text-white py-1.5 rounded text-[14px] md:text-[16px] font-bold tracking-wide w-full md:w-auto"
                onClick={() => { setPriceRange(price); setCurrentPage(1); }}
              >
                FILTER
              </button>
            </div>
          </div>

          {/* Discount (mobile only) */}
          <div className="mb-8 md:hidden">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setDiscountOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-6">Discount</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Discount">
                {discountOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${discountOpen ? 'block' : 'hidden'} md:hidden`}>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'lt10', label: 'Less than 10%' },
                  { key: '10+', label: '10% or more' },
                  { key: '20+', label: '20% or more' },
                  { key: '30+', label: '30% or more' },
                  { key: '40+', label: '40% or more' },
                  { key: '50+', label: '50% or more' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setDiscountChip(discountChip === opt.key ? null : opt.key); setCurrentPage(1); }}
                    className={`px-3 py-1 rounded-full border ${discountChip === opt.key ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} text-sm`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Colors - hidden as requested */}
          {/**
          <div className="mb-12">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setColorsOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Colors</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Colors">
                {colorsOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${colorsOpen ? 'block' : 'hidden'} md:block`}>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-black inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Black</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-fuchsia-500 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Violet</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-blue-600 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Blue</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-yellow-400 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Yellow</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-600 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Red</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-lime-400 inline-block mr-3"></span>
                  <span className="text-[16px] md:text-[18px] font-archivo font-normal">Green</span>
                </div>
              </div>
            </div>
          </div>
          */}
          {/* Size - hidden as requested */}
          {/**
          <div className="mb-12">
            <div
              className="flex items-center justify-between md:block cursor-pointer md:cursor-default"
              onClick={() => setSizeOpen((open) => !open)}
            >
              <h2 className="font-playfair font-medium text-[20px] md:text-[24px] mb-8">Size</h2>
              <button type="button" className="md:hidden text-xl focus:outline-none" aria-label="Toggle Size">
                {sizeOpen ? '−' : '+'}
              </button>
            </div>
            <div className={`${sizeOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex gap-2 md:gap-3">
                {['S', 'M', 'L', 'XS'].map((size) => (
                  <button
                    key={size}
                    className="w-[40px] md:w-[51px] h-[33px] border-2 border-[#C4C4C4] rounded-xl text-[16px] md:text-[18px] font-bold text-black bg-white hover:bg-black hover:text-white transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          */}
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 w-full">
        <div id="shop1-products-top" />
        {/* Search Results Header */}
        {searchTerm && (
          <div className="mb-4 ml-0 md:ml-7">
            <p className="text-lg text-gray-700">
              Search results for "{searchTerm}" - {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
            </p>
          </div>
        )}
        
        {/* Controls */}
        <div className="ml-0 md:ml-7 mb-4">
          {/* Mobile: two buttons (Filters, Sort) and search */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-3">
            <button
              type="button"
              onClick={() => setShowMobileFilters((v) => !v)}
              className="flex items-center justify-center gap-2 py-2 rounded-xl border bg-white shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3"></polygon></svg>
              <span className="font-medium">Filters</span>
            </button>
            <select
              className="w-full border rounded-xl px-3 py-2 text-[16px] font-poppins"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="created_at-desc">Default Sorting</option>
              <option value="selling_price-asc">Price: Low to High</option>
              <option value="selling_price-desc">Price: High to Low</option>
              <option value="product_name-asc">Name: A to Z</option>
              <option value="product_name-desc">Name: Z to A</option>
            </select>
          </div>
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)}></div>
              {/* Bottom sheet */}
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} aria-label="Close" className="p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                {/* Tabs */}
                <div className="px-4 pt-3">
                  <div className="flex gap-4 border-b">
                    {(
                      [
                        { k: 'price', t: 'Price' },
                        { k: 'categories', t: 'Categories' },
                        { k: 'brands', t: 'Brands' },
                        { k: 'discount', t: 'Discount' },
                      ] as const
                    ).map(tab => (
                      <button key={tab.k} onClick={() => setMobileFilterTab(tab.k)} className={`pb-2 text-sm font-semibold uppercase tracking-wide ${mobileFilterTab === tab.k ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}>
                        {tab.t}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Content */}
                <div className="px-4 py-3">
                  {mobileFilterTab === 'price' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">₹</span>
                          <input type="text" value={0} readOnly className="w-[60px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal font-poppins bg-gray-100 text-gray-500 pl-4"/>
                        </div>
                        <div className="flex-1 h-px bg-gray-300 mx-2"></div>
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[12px]">₹</span>
                          <input type="text" value={price[1]} onChange={handleMaxInput} onBlur={handleMaxInputBlur} className="w-[60px] h-[33px] text-center border border-gray-300 rounded-xl text-[14px] font-normal bg-white shadow-sm focus:border-blue-500 focus:outline-none pl-4"/>
                        </div>
                      </div>
                      <div className="relative mb-3" style={{ height: 20 }}>
                        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2 bg-gray-200 rounded-full"></div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-yellow-400 rounded-full" style={{ left: `${((0 - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%`, right: `${100 - ((price[1] - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%` }}></div>
                        <input type="range" min={0} max={maxPrice} value={price[1]} onChange={handleMaxSlider} className="absolute opacity-0 cursor-pointer" style={{ zIndex: 2, left: 0, width: '100%', height: '100%' }} />
                        <div className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${((price[1] - minPrice) / Math.max(1, (maxPrice - minPrice))) * 100}%`, top: '50%' }}></div>
                      </div>
                    </div>
                  )}
                  {mobileFilterTab === 'categories' && (
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.category_id} className="flex items-center gap-2">
                          <input type="radio" name="m_category" checked={selectedCategory === cat.category_id} onChange={() => handleCategoryChange(cat.category_id)} />
                          <span>{cat.name}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2">
                        <input type="radio" name="m_category" checked={selectedCategory === null} onChange={() => handleCategoryChange(null)} />
                        <span>All Categories</span>
                      </label>
                    </div>
                  )}
                  {mobileFilterTab === 'brands' && (
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand.brand_id} className="flex items-center gap-2">
                          <input type="radio" name="m_brand" checked={selectedBrand === brand.brand_id} onChange={() => handleBrandChange(brand.brand_id)} />
                          <span>{brand.name}</span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2">
                        <input type="radio" name="m_brand" checked={selectedBrand === null} onChange={() => handleBrandChange(null)} />
                        <span>All Brands</span>
                      </label>
                    </div>
                  )}
                  {mobileFilterTab === 'discount' && (
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: 'lt10', label: 'Less than 10%' },
                        { key: '10+', label: '10% or more' },
                        { key: '20+', label: '20% or more' },
                        { key: '30+', label: '30% or more' },
                        { key: '40+', label: '40% or more' },
                        { key: '50+', label: '50% or more' },
                      ].map(opt => (
                        <button key={opt.key} onClick={() => { setDiscountChip(discountChip === opt.key ? null : opt.key); setCurrentPage(1); }} className={`px-3 py-1 rounded-full border ${discountChip === opt.key ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} text-sm`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Actions */}
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex items-center justify-between gap-3">
                  <button
                    onClick={() => { setSelectedCategory(null); setSelectedBrand(null); setDiscountChip(null); setPrice([0, maxPrice]); setPriceRange(null); setCurrentPage(1); setShowMobileFilters(false); }}
                    className="px-4 py-2 rounded-xl border w-1/2"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => { setPriceRange(price); setShowMobileFilters(false); setCurrentPage(1); }}
                    className="px-4 py-2 rounded-xl bg-black text-white w-1/2"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
          </div>
          )}
          {/* sort panel removed; select is inline above */}
          <div className="hidden md:flex items-center gap-2 w-full md:w-auto">
            <select
              className="border rounded px-2 py-1 text-[16px] md:text-[18px] font-poppins w-full md:w-auto flex-1"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="created_at-desc">Default Sorting</option>
              <option value="selling_price-asc">Price: Low to High</option>
              <option value="selling_price-desc">Price: High to Low</option>
              <option value="product_name-asc">Name: A to Z</option>
              <option value="product_name-desc">Name: Z to A</option>
            </select>
            {/*<select ... items per page ... />*/}
          <div className="text-[16px] md:text-[18px] font-poppins md:mr-10 text-black w-full md:w-auto">
            Show {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalProducts)} Of {totalProducts} Product{totalProducts !== 1 ? 's' : ''}
          </div>
        </div>
        </div>
        {/* Discount chips: only on desktop, mobile moved under Filters */}
        <div className="hidden md:flex flex-wrap gap-2 mb-4 md:ml-7">
          {[
            { key: 'lt10', label: 'Less than 10%' },
            { key: '10+', label: '10% or more' },
            { key: '20+', label: '20% or more' },
            { key: '30+', label: '30% or more' },
            { key: '40+', label: '40% or more' },
            { key: '50+', label: '50% or more' },
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => { setDiscountChip(discountChip === opt.key ? null : opt.key); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full border ${discountChip === opt.key ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} text-sm`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* Product Grid */}
        {loading ? (
          <div className="flex justify-center items-center w-full h-40">
            <div className="text-lg text-gray-600">Loading products...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 xm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-0">
            {products.map((product, idx) => (
              <Shop1ProductCard
                key={product.product_id || idx}
                id={product.product_id}
                image={product.primary_image || ''}
                category={product.category_name || ''}
                name={product.product_name}
                price={product.price}
              />
            ))}
          </div>
        )}
        {/* Mobile simple pagination */}
        {totalPages > 1 && (
          <div className="md:hidden flex items-center justify-between mt-6">
            <button
              className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-800 border-gray-300'} `}
              disabled={currentPage === 1}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            <button
              className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-800 border-gray-300'}`}
              disabled={currentPage === totalPages}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 pb-14 md:pb-0">
            <nav className="inline-flex items-center space-x-4">
              {/* Previous Button */}
              <button
                className={`w-12 h-12 rounded-xl ${currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                } text-xl font-bold flex items-center justify-center`}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="text-2xl">&lt;</span>
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`w-12 h-12 rounded-xl ${currentPage === pageNum
                      ? 'bg-[#E7AB3C] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    } text-xl font-bold flex items-center justify-center shadow`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Next Button */}
              <button
                className={`w-12 h-12 rounded-xl ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                } text-xl font-bold flex items-center justify-center`}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="text-2xl">&gt;</span>
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;