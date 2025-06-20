import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Facebook, Instagram, Twitter, Mail, LogOut, User, ChevronDown, Menu, X, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CategoryDropdown from '../home/CategoryDropdown';
import SearchResults from './SearchResults';
import useClickOutside from '../../hooks/useClickOutside';
import LogoutConfirmationPopup from '../LogoutConfirmationPopup';
import SpinWheel from '../promotional/SpinWheel';
import toast from 'react-hot-toast';
import '@fontsource/work-sans';

// Custom breakpoint for 968px
// const customBreakpoint = '@media (max-width: 968px)'; // Removed as unused

const Navbar: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState('Category'); // Removed as unused
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lowerMobileMenuOpen, setLowerMobileMenuOpen] = useState(false);
  const [isMobileCategoryDropdownOpen, setIsMobileCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchType, setSearchType] = useState<'all' | 'products' | 'categories'>('all');
  const location = useLocation();
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lowerMobileMenuRef = useRef<HTMLDivElement>(null);

  // Refs for toggle buttons to exclude them from outside click detection
  const desktopCategoryButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const lowerMobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCategoryButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(desktopSearchRef, () => {
    setShowSearchResults(false);
  });

  useClickOutside(mobileSearchRef, () => {
    setShowSearchResults(false);
  });

  useClickOutside(categoryDropdownRef, (event: MouseEvent | TouchEvent) => {
    if (desktopCategoryButtonRef.current && !desktopCategoryButtonRef.current.contains(event.target as Node)) {
      setIsCategoryDropdownOpen(false);
    }
  });

  useClickOutside(mobileMenuRef, (event: MouseEvent | TouchEvent) => {
    if (mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
      setMobileMenuOpen(false);
    }
  });

  useClickOutside(lowerMobileMenuRef, (event: MouseEvent | TouchEvent) => {
    if (lowerMobileMenuButtonRef.current && !lowerMobileMenuButtonRef.current.contains(event.target as Node)) {
      setLowerMobileMenuOpen(false);
    }
  });

  useEffect(() => {
    setIsCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    setLowerMobileMenuOpen(false);
    setIsMobileCategoryDropdownOpen(false);
    setShowSearchResults(false);
  }, [location.pathname]);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setLowerMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsMobileCategoryDropdownOpen(false);
    setShowSearchResults(false);
  };

  const toggleLowerMobileMenu = () => {
    setLowerMobileMenuOpen(!lowerMobileMenuOpen);
    setIsMobileCategoryDropdownOpen(false);
  };

  const toggleMobileCategoryDropdown = () => {
    setIsMobileCategoryDropdownOpen(!isMobileCategoryDropdownOpen);
  };

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true);
    setMobileMenuOpen(false);
    setLowerMobileMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutPopupOpen(false);
    setMobileMenuOpen(false);
    setLowerMobileMenuOpen(false);
    toast.success('Logged out successfully');
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams({
        q: searchQuery.trim(),
        type: searchType
      });
      window.location.href = `/search?${searchParams.toString()}`;
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const spinWheelSegments = [
    { id: '1', label: '10% OFF', value: 'SAVE10', color: '#FF6B6B', probability: 30 },
    { id: '2', label: '20% OFF', value: 'SAVE20', color: '#4ECDC4', probability: 25 },
    { id: '3', label: '30% OFF', value: 'SAVE30', color: '#45B7D1', probability: 20 },
    { id: '4', label: '40% OFF', value: 'SAVE40', color: '#96CEB4', probability: 15 },
    { id: '5', label: '50% OFF', value: 'SAVE50', color: '#FFEEAD', probability: 5 },
    { id: '6', label: 'FREE SHIP', value: 'FREESHIP', color: '#D4A5A5', probability: 5 },
  ];

  const handleSpinComplete = (segment: { label: string; value: string }) => {
    toast.success(
      <div className="text-center">
        <p className="font-bold">🎉 Congratulations! 🎉</p>
        <p>You won {segment.label}!</p>
        <p className="mt-2">Use code: <span className="font-bold">{segment.value}</span></p>
      </div>,
      {
        duration: 5000,
        style: {
          background: '#FFEDD5',
          color: '#EA580C',
          padding: '16px',
        },
      }
    );
    setIsSpinWheelOpen(false);
  };

  const searchBarContent = (
    <div ref={desktopSearchRef} className="relative">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="w-full xl:w-[580px] h-10 flex justify-between items-center rounded-lg overflow-hidden bg-white overflow-hidden">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full h-full md:w-52 nav:w-64 mid:w-80 xl:w-96 border-0 py-3 px-4 text-gray-900 focus:ring-0 focus:outline-none font-['Work_Sans'] font-normal text-sm leading-6 tracking-[0%] outline-none"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
          />
          <div className="relative w-[196px] flex items-center bg-gray-100">
            <select
              className="w-full h-full appearance-none bg-transparent py-3 pl-4 pr-[120px] text-gray-900 focus:ring-0 focus:outline-none font-['Work_Sans'] font-normal text-[14px] leading-6 tracking-[0%]"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'all' | 'products' | 'categories')}
            >
              <option value="all">All</option>
              <option value="products">Products</option>
              <option value="categories">Categories</option>
            </select>
          </div>
        </div>
      </form>
      <SearchResults
        isVisible={showSearchResults}
        setIsVisible={setShowSearchResults}
        searchQuery={searchQuery}
        searchType={searchType}
        onItemClick={() => {
          setShowSearchResults(false);
          setSearchQuery('');
        }}
      />
    </div>
  );

  const mobileSearchBar = (
    <div ref={mobileSearchRef} className="relative mb-4 px-2">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="flex flex-col rounded-md overflow-hidden bg-white shadow-sm">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full border-0 py-2.5 px-4 text-gray-900 focus:ring-0 focus:outline-none font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
          />
          <div className="relative flex items-center border-t border-gray-200 bg-white">
            <select
              className="w-full h-full appearance-none bg-transparent py-2.5 pl-4 pr-8 text-gray-900 focus:ring-0 focus:outline-none font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'all' | 'products' | 'categories')}
            >
              <option value="all">All</option>
              <option value="products">Products</option>
              <option value="categories">Categories</option>
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
        <SearchResults
          isVisible={showSearchResults}
          setIsVisible={setShowSearchResults}
          searchQuery={searchQuery}
          searchType={searchType}
          onItemClick={() => {
            setShowSearchResults(false);
            setSearchQuery('');
          }}
        />
        <button
          type="submit"
          className="w-full bg-[#F2631F] text-white py-2 rounded-md mt-2 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
        >
          Search
        </button>
      </form>
    </div>
  );

  const desktopSearchBar = (
    <div className="hidden md:block relative">
      {searchBarContent}
    </div>
  );

  // Add this CSS animation style at the top of the component
  const aoinLiveButtonStyle = {
    animation: 'colorChange 1.5s infinite',
    transition: 'background-color 0.5s ease-in-out',
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 mx-auto font-['Work_Sans']">
      <style>
        {`
          @keyframes colorChange {
            0% { background-color: #F2631F; }
            25% { background-color: #63BC86; }
            50% { background-color: #DB4173; }
            75% { background-color: #8B4CCE; }
            100% { background-color: #F2631F; }
          }
        `}
      </style>
      {/* Top navigation - black bar */}
      <div className="bg-black text-white pb-2 md:pb-3 lg:pb-4">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-4 xl:px-4 2xl:px-6 3xl:px-8 max-w-full md:max-w-[98%] mid:max-w-[92%] xl:max-w-[1200px] 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[1920px]">
          <div className="flex flex-col sm:pl-1 md:pl-0">
            <div className="flex flex-start py-2 sm:py-3">
              {/* Social Media Icons - Left top - Hidden on mobile */}
              <div className="hidden sm:flex items-center space-x-4">
                <Link to="#" className="text-[#F2631F] hover:text-orange-400">
                  <Facebook size={16} />
                </Link>
                <Link to="#" className="text-[#F2631F] hover:text-orange-400">
                  <Instagram size={16} />
                </Link>
                <Link to="#" className="text-[#F2631F] hover:text-orange-400">
                  <Twitter size={16} />
                </Link>
                <Link to="#" className="text-[#F2631F] hover:text-orange-400">
                  <Mail size={16} />
                </Link>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full pt-2 sm:pt-3">
              {/* Logo - Left below icons */}
              <div className="mt-0 flex-shrink-0 mr-2 md:mr-6 mid:mr-8">
                <Link to="/" className="inline-block">
                  <img src="/assets/images/logo.svg" alt="AUIN Logo" width="100" height="35" className="w-[90px] h-[30px] sm:w-[100px] sm:h-[35px] mid:w-[120px] mid:h-[42px]" />
                </Link>
              </div>

              {/* Mobile menu toggle - use custom breakpoint at 968px */}
              <button
                className="block nav:hidden text-white p-2 sm:ml-auto"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                ref={mobileMenuButtonRef}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Search and Actions - use custom breakpoint at 968px */}
              <div className="hidden nav:flex items-center justify-end flex-1">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 nav:gap-3 mid:gap-4">
                  <div className="w-full md:w-auto">
                    {desktopSearchBar}
                  </div>

                  <button
                    className="w-24 h-11 bg-black hover:bg-gray-900 text-white py-1.5 px-6 nav:px-3 mid:px-6 rounded-lg border border-white whitespace-nowrap font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery('');
                    }}
                  >
                    Search
                  </button>

                  {/* Icons */}
                  <div className="flex items-center gap-2 nav:gap-3 mid:gap-4">
                    <button
                      onClick={() => setIsSpinWheelOpen(true)}
                      className="flex items-center gap-2 text-white hover:text-[#F2631F] font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
                      title="Spin & Win Offers!"
                    >
                      <Gift className="w-5 h-5" />
                      <span className="hidden md:inline">Spin & Win</span>
                    </button>

                    <Link to="/wishlist" className="text-white hover:text-[#F2631F] font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]">
                      <Heart className="w-5 h-5" />
                    </Link>

                    <Link to="/cart" className="text-white hover:text-[#F2631F] relative font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]">
                      <ShoppingCart className="w-5 h-5" />
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#F2631F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>

                    <Link to="/profile" className="text-white hover:text-[#F2631F] font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]">
                      <User className="w-5 h-5" />
                    </Link>
                  </div>

                  <Link
                    to="/business/login"
                    className="w-40 h-10 flex justify-center items-center bg-[#F2631F] text-white rounded-md px-3 nav:px-2.5 mid:px-3 py-2 hover:bg-orange-600 transition-colors whitespace-nowrap font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
                  >
                    Become a Merchant
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown - use custom breakpoint at 968px */}
      {mobileMenuOpen && (
        <div className="nav:hidden bg-black text-white border-t border-gray-800 py-3 px-4" ref={mobileMenuRef}>
          {mobileSearchBar}

          {/* Mobile action links */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Link to="/wishlist" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F]" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
              <Heart className="w-4 h-4 mb-1" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F] relative" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
              <ShoppingCart className="w-4 h-4 mb-1" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-6 bg-[#F2631F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span>Cart</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F]" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
              <User className="w-4 h-4 mb-1" />
              <span>Account</span>
            </Link>
          </div>

          <Link
            to="/business/login"
            className="w-full block text-center bg-[#F2631F] text-white rounded-md px-4 py-1.5 hover:bg-orange-600 mb-3 text-sm"
            onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}
          >
            Become a Merchant
          </Link>

          {/* Social icons in mobile menu */}
          <div className="flex justify-center space-x-6 mb-2">
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Facebook size={16} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Instagram size={16} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Twitter size={16} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Mail size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Main navigation - white bar */}
      <div className="bg-white border-b shadow-sm py-1.5">
        <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-4 xl:px-4 2xl:px-6 3xl:px-8 max-w-full md:max-w-[98%] mid:max-w-[92%] xl:max-w-[1200px] 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[1920px]">
          {/* Mobile lower navigation toggle - use custom breakpoint at 968px */}
          <div className="nav:hidden flex items-center justify-between">
            <button
              className="flex items-center py-1.5 text-black"
              onClick={toggleLowerMobileMenu}
              aria-label="Toggle lower navigation"
              ref={lowerMobileMenuButtonRef}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Menu</span>
            </button>

            <div className="flex items-center space-x-2">
              <Link to="/track-order" className="hidden nav:flex items-center py-1.5 text-xs hover:text-[#F2631F]" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                <img src="/assets/images/track-order.png" alt="Track Order" className="w-4 h-4 mr-1" />
                <span>Track Your Order</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center py-1.5 text-xs text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                </button>

              ) : (
                <Link to="/sign-in" className="flex items-center py-1.5 text-xs hover:text-[#F2631F]" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                  <User className="w-4 h-4 mr-1" />
                  <span>Sign In</span>
                </Link>
              )}
              <Link
                to="/live-shop"
                style={aoinLiveButtonStyle}
                className="flex items-center text-white rounded-md px-3 py-1.5 hover:opacity-90 transition-opacity font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] ml-2"
              >
                Aoin Live
              </Link>
            </div>
          </div>

          {/* Mobile lower navigation dropdown - use custom breakpoint at 968px */}
          {lowerMobileMenuOpen && (
            <div className="nav:hidden border-t border-gray-200 pt-2 pb-1" ref={lowerMobileMenuRef}>
              <Link to="/track-order" className="flex items-center py-1.5 px-2 text-sm hover:text-[#F2631F] mb-2" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                <img src="/assets/images/track-order.png" alt="Track Order" className="w-4 h-4 mr-2" />
                <span>Track Your Order</span>
              </Link>

              <div className="mb-2">
                <button
                  className="flex items-center justify-between py-1.5 px-2 text-sm w-full text-left hover:bg-gray-50 rounded"
                  onClick={toggleMobileCategoryDropdown}
                  ref={mobileCategoryButtonRef}
                >
                  <span className="flex items-center font-medium">
                    Categories
                  </span>
                  <ChevronDown className={`ml-auto w-4 h-4 transition-transform duration-200 ${isMobileCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileCategoryDropdownOpen && (
                  <CategoryDropdown
                    isOpen={isMobileCategoryDropdownOpen}
                    closeDropdown={() => setIsMobileCategoryDropdownOpen(false)}
                    isMobile={true}
                  />
                )}
              </div>

              <nav className="space-y-1.5">
                <Link to="/" className="block py-1.5 px-2 text-sm hover:bg-gray-50 rounded" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                  Home
                </Link>
                <Link to="/all-products" className="block py-1.5 px-2 text-sm hover:bg-gray-50 rounded" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                  All Products
                </Link>
                <Link to="/new-product" className="block py-1.5 px-2 text-sm hover:bg-gray-50 rounded" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                  New Product
                </Link>
                <Link to="/promo-products" className="flex items-center justify-between py-1.5 px-2 text-sm hover:bg-gray-50 rounded" onClick={() => { setMobileMenuOpen(false); setLowerMobileMenuOpen(false); }}>
                  <span>Promotion</span>
                  <span className="bg-[#F2631F] text-white text-xs px-2 py-0.5 rounded-full ml-1">HOT</span>
                </Link>
              </nav>
            </div>
          )}

          {/* Desktop navigation */}
          <div className="hidden nav:flex items-center justify-between">
            {/* Categories Dropdown Button */}
            <div onClick={toggleCategoryDropdown} className="relative flex items-center group">
              <span className="mr-1 w-6 h-6 py-[5px] px-[3px] flex items-center">
                <img src="/assets/images/category.png" alt="Category" className="w-full h-full" />
              </span>
              <button
                className="flex items-center py-1.5 px-3 md:px-4 text-black group-hover:text-gray-700 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%]"
                onClick={toggleCategoryDropdown}
                aria-expanded={isCategoryDropdownOpen}
                ref={desktopCategoryButtonRef}
              >
                <span className="inline">Category</span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Main Nav Links */}
            <nav className="flex items-center">
              <Link to="/" className="py-1.5 px-2 md:px-3 mid:px-4 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F]">
                Home
              </Link>
              <Link to="/all-products" className="py-1.5 px-2 md:px-3 mid:px-4 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F]">
                All Products
              </Link>
              <Link to="/new-product" className="py-1.5 px-2 md:px-3 mid:px-4 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F]">
                New Product
              </Link>
              <Link to="/promo-products" className="py-1.5 px-2 md:px-3 mid:px-4 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F] flex items-center">
                Promotion <span className="bg-[#F2631F] text-white text-xs px-2 py-0.5 rounded-full ml-1">HOT</span>
              </Link>
            </nav>

            {/* Right side links */}
            <div className="flex items-center md:space-x-2 nav:space-x-3 mid:space-x-6">
              <Link to="/orders" className="flex items-center py-1.5 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F]">
                <img src="/assets/images/track-order.png" alt="Track Order" className="w-5 h-5 mr-1" />
                <span>Track Your Order</span>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center md:space-x-2 nav:space-x-3 mid:space-x-4">
                  <span className="font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] text-gray-600">
                    Welcome, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center py-1.5 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    <span>Logout</span>
                  </button>
                  <Link
                    to="/live-shop"
                    style={aoinLiveButtonStyle}
                    className="flex items-center text-white rounded-md px-3 py-1.5 hover:opacity-90 transition-opacity font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] ml-2"
                  >
                    Aoin Live
                  </Link>
                </div>
              ) : (
                <div className="flex items-center md:space-x-2 nav:space-x-3 mid:space-x-4">
                  <Link to="/sign-in" className="flex items-center py-1.5 font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] hover:text-[#F2631F]">
                    <User className="w-4 h-4 mr-1" />
                    <span>Sign In/Register</span>
                  </Link>
                  <Link
                    to="/live-shop"
                    style={aoinLiveButtonStyle}
                    className="flex items-center text-white rounded-md px-3 py-1.5 hover:opacity-90 transition-opacity font-['Work_Sans'] font-medium text-[14px] leading-6 tracking-[0%] ml-2"
                  >
                    Aoin Live
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category dropdown - for desktop */}
      {isCategoryDropdownOpen && !mobileMenuOpen && !lowerMobileMenuOpen && (
        <div ref={categoryDropdownRef} className="z-40">
          <CategoryDropdown
            isOpen={isCategoryDropdownOpen}
            closeDropdown={() => setIsCategoryDropdownOpen(false)}
          />
        </div>
      )}

      {/* Logout Confirmation Popup */}
      <LogoutConfirmationPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setIsLogoutPopupOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      {/* Add SpinWheel component */}
      <SpinWheel
        segments={spinWheelSegments}
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onSpinComplete={handleSpinComplete}
      />
    </header>
  );
};

export default Navbar;