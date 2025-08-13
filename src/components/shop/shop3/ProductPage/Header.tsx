import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShopWishlist } from '../../../../context/ShopWishlistContext';
import { useShopCartOperations } from '../../../../context/ShopCartContext';
import shop3ApiService, { Product } from '../../../../services/shop3ApiService';

const SHOP_ID = 3;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { getShopWishlistCount } = useShopWishlist();
  const { getShopCartCount } = useShopCartOperations();
  const navigate = useNavigate();
  
  const wishlistCount = getShopWishlistCount(SHOP_ID);

  // Search functionality
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const loadCartCount = async () => {
    try {
      const count = await getShopCartCount(SHOP_ID);
      setCartCount(count);
    } catch (error) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();
    // Refresh cart count periodically
    const interval = setInterval(loadCartCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Search functionality
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setSearchLoading(true);
      const response = await shop3ApiService.searchProducts(query, {
        page: 1,
        per_page: 5 // Limit results for dropdown
      });
      
      if (response.success) {
        setSearchResults(response.products);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(search);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Handle search result click
  const handleSearchResultClick = (product: Product) => {
    setSearch('');
    setShowSearchResults(false);
    setShowSearchInput(false);
    navigate(`/shop3-productpage?id=${product.product_id}`);
  };

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setShowSearchResults(false);
      setShowSearchInput(false);
      navigate(`/shop3-allproductpage?search=${encodeURIComponent(search.trim())}`);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
        setShowSearchInput(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="bg-black w-full  text-white px-4 sm:px-8 2xl:px-6 py-4">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Left side - Dots and Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* Colored dots - hidden on mobile */}
          <div className="hidden sm:flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-lime-400"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="sm:hidden text-white hover:text-gray-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop Navigation links */}
          <nav className="hidden sm:flex space-x-4 lg:space-x-8">
            <a href="#" className="text-white uppercase font-sans text-sm hover:text-gray-300 transition-colors">
              SALE
            </a>
            <a href="#" className="text-white uppercase font-sans text-sm border-b-2 border-white pb-1">
              MEN
            </a>
            <a href="#" className="text-white uppercase font-sans text-sm hover:text-gray-300 transition-colors">
              WOMAN
            </a>
          </nav>
        </div>

        {/* Center - Brand name */}
        <div className="flex-1 flex mt-2 justify-center">
          <h1 className="text-[#CF0] font-bebas font-normal text-[50.667px] leading-[0.9] tracking-[-0.02em] uppercase">
            AOIN
          </h1>
        </div>

        {/* Right side - Icons and text */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Search functionality */}
          <div className="relative" ref={searchRef}>
            {showSearchInput ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded px-3 py-2 w-48 sm:w-64 focus:outline-none focus:border-lime-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-lime-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                {/* Search Results Dropdown */}
                {showSearchResults && (searchResults.length > 0 || searchLoading) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchLoading ? (
                      <div className="p-4 text-center text-gray-400">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lime-400 mx-auto"></div>
                        <p className="mt-2 text-sm">Searching...</p>
                      </div>
                    ) : (
                      <>
                        {searchResults.map((product) => (
                          <div
                            key={product.product_id}
                            onClick={() => handleSearchResultClick(product)}
                            className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-700 last:border-b-0"
                          >
                            <img
                              src={product.primary_image}
                              alt={product.product_name}
                              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/assets/shop3/ProductPage/pd1.svg';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">
                                {product.product_name}
                              </h4>
                              <p className="text-xs text-gray-400 truncate">
                                {product.category_name}
                              </p>
                              <p className="text-sm font-semibold text-lime-400">
                                ₹{Number(product.price).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                        {searchResults.length > 0 && (
                          <div className="p-3 border-t border-zinc-700">
                            <button
                              type="submit"
                              className="w-full text-center text-sm text-lime-400 hover:text-lime-300 font-medium"
                            >
                              View all results for "{search}"
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </form>
            ) : (
              <button 
                className="text-white hover:text-lime-400 transition-colors"
                onClick={() => setShowSearchInput(true)}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Language and currency - hidden on mobile */}
          <span className="hidden sm:block text-gray-400 text-sm">
            En | USD
          </span>
          
          {/* Wishlist with badge */}
          <Link to="/shop3/wishlist" className="relative">
            <button className="text-white hover:text-gray-300 transition-colors mr-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            {/* Wishlist badge */}
            {wishlistCount > 0 && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </div>
            )}
          </Link>
          
          {/* Shopping cart with badge */}
          <Link to="/shop3/cart" className="relative">
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            {/* Cart badge */}
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-4 pb-4 border-t border-gray-700">
          <nav className="flex flex-col space-y-4 pt-4">
            <a href="#" className="text-white uppercase font-sans text-sm hover:text-gray-300 transition-colors">
              SALE
            </a>
            <a href="#" className="text-white uppercase font-sans text-sm border-b-2 border-white pb-1 w-fit">
              MEN
            </a>
            <a href="#" className="text-white uppercase font-sans text-sm hover:text-gray-300 transition-colors">
              WOMAN
            </a>
            <div className="text-gray-400 text-sm pt-2">
              En | USD
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
