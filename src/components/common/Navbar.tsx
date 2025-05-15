import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Facebook, Instagram, Twitter, Mail, LogOut, User, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CategoryDropdown from '../home/CategoryDropdown';
import NewProductDropdown from '../home/NewProductDropdown';

const Navbar: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isNewProductDropdownOpen, setIsNewProductDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lowerMobileMenuOpen, setLowerMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (isNewProductDropdownOpen) setIsNewProductDropdownOpen(false);
  };

  const toggleNewProductDropdown = () => {
    setIsNewProductDropdownOpen(!isNewProductDropdownOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLowerMobileMenu = () => {
    setLowerMobileMenuOpen(!lowerMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const closeNewProductDropdown = () => {
    setIsNewProductDropdownOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top navigation - black bar */}
      <div className="bg-black text-white pb-2 md:pb-3 lg:pb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:pl-20">
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
              <div className="mt-0">
                <Link to="/" className="inline-block">
                  <img src="/assets/images/logo.svg" alt="AUIN Logo" width="100" height="35" className="w-[90px] h-[30px] sm:w-[120px] sm:h-[42px]" />
                </Link>
              </div>
              

              {/* Mobile menu toggle */}
              <button 
                className="md:hidden text-white p-2" 
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Search and Actions - Hidden on mobile, shown in mobile menu */}
              <div className="hidden md:flex items-center space-x-5">
                {/* Search Bar with Category Dropdown */}
                <div className="flex rounded-md overflow-hidden bg-white">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full md:w-96 border-0 py-1.5 px-4 text-gray-900 focus:ring-0 focus:outline-none"
                  />
                  <div className="relative flex items-center border-l border-gray-200 bg-white">
                    <select 
                      className="h-full appearance-none bg-transparent py-1.5 pl-3 pr-8 text-gray-900 focus:ring-0 focus:outline-none"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option>Category</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Home & Garden</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                  </div>
                </div>

                <button className="bg-black hover:bg-gray-900 text-white py-1.5 px-6 rounded-md border border-white">
                  Search
                </button>

                {/* Icons */}
                <Link to="/wishlist" className="text-white hover:text-[#F2631F]">
                  <Heart className="w-5 h-5" />
                </Link>
                
                <Link to="/cart" className="text-white hover:text-[#F2631F] relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#F2631F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                <Link to="/profile" className="text-white hover:text-[#F2631F]">
                  <User className="w-5 h-5" />
                </Link>
                
                <Link 
                  to="/business/login" 
                  className="bg-[#F2631F] text-white rounded-md px-3 py-1.5 hover:bg-orange-600 transition-colors whitespace-nowrap text-sm"
                >
                  Become a Merchant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white border-t border-gray-800 py-3 px-4">
          {/* Mobile Search */}
          <div className="flex mb-4 rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border-0 py-1.5 px-4 text-gray-900 focus:ring-0 focus:outline-none"
            />
            <button className="bg-black text-white p-1.5">
              <Search size={18} />
            </button>
          </div>
          
          {/* Mobile action links */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Link to="/wishlist" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F]">
              <Heart className="w-4 h-4 mb-1" />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F] relative">
              <ShoppingCart className="w-4 h-4 mb-1" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-6 bg-[#F2631F] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span>Cart</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center py-1.5 text-xs hover:text-[#F2631F]">
              <User className="w-4 h-4 mb-1" />
              <span>Account</span>
            </Link>
          </div>
          
          <Link 
            to="/business/login" 
            className="w-full block text-center bg-[#F2631F] text-white rounded-md px-4 py-1.5 hover:bg-orange-600 mb-3 text-sm"
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
        <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
          {/* Mobile lower navigation toggle */}
          <div className="md:hidden flex items-center justify-between">
            <button
              className="flex items-center py-1.5 text-black" 
              onClick={toggleLowerMobileMenu}
              aria-label="Toggle lower navigation"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Menu</span>
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${lowerMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center space-x-2">
              <Link to="/track-order" className="flex items-center py-1.5 text-xs hover:text-[#F2631F]">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Track</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center py-1.5 text-xs text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                </button>
              ) : (
                <Link to="/sign-in" className="flex items-center py-1.5 text-xs hover:text-[#F2631F]">
                  <User className="w-4 h-4 mr-1" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile lower navigation dropdown */}
          {lowerMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-2 pb-1">
              <div className="mb-2">
                <button
                  className="flex items-center justify-between py-1.5 px-2 text-sm w-full text-left hover:bg-gray-50 rounded"
                  onClick={toggleCategoryDropdown}
                >
                  <span className="flex items-center font-medium">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Categories
                  </span>
                  <ChevronDown className={`ml-auto w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryDropdownOpen && (
                  <div className="pl-4 py-1.5 space-y-1.5">
                    <Link to="/category/electronics" className="block py-1 text-sm hover:text-[#F2631F]">Electronics</Link>
                    <Link to="/category/clothing" className="block py-1 text-sm hover:text-[#F2631F]">Clothing</Link>
                    <Link to="/category/home-garden" className="block py-1 text-sm hover:text-[#F2631F]">Home & Garden</Link>
                    <Link to="/categories" className="block py-1 text-sm text-[#F2631F]">View All Categories</Link>
                  </div>
                )}
              </div>
              
              <nav className="space-y-1.5">
                <Link to="/" className="block py-1.5 px-2 text-sm hover:bg-gray-50 rounded">
                  Home
                </Link>
                <Link to="/all-products" className="block py-1.5 px-2 text-sm hover:bg-gray-50 rounded">
                  All Products
                </Link>
                <button 
                  className="flex items-center justify-between py-1.5 px-2 text-sm hover:bg-gray-50 rounded w-full text-left"
                  onClick={toggleNewProductDropdown}
                >
                  <span>New Product</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isNewProductDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isNewProductDropdownOpen && lowerMobileMenuOpen && (
                  <div className="bg-gray-50 py-2 px-3 ml-3 rounded">
                    <div className="space-y-2">
                      <Link to="/new-product?category=smart-watch" className="block text-sm hover:text-[#F2631F]" onClick={closeNewProductDropdown}>
                        Smart Watch
                      </Link>
                      <Link to="/new-product?category=tablet" className="block text-sm hover:text-[#F2631F]" onClick={closeNewProductDropdown}>
                        Tablet
                      </Link>
                      <Link to="/new-product?category=accessories" className="block text-sm hover:text-[#F2631F]" onClick={closeNewProductDropdown}>
                        Accessories
                      </Link>
                      <Link to="/new-product?promotion=october-sale" className="block text-sm text-[#F2631F] font-medium" onClick={closeNewProductDropdown}>
                        Special Offers
                      </Link>
                    </div>
                  </div>
                )}
                <Link to="/promotion" className="flex items-center justify-between py-1.5 px-2 text-sm hover:bg-gray-50 rounded">
                  <span>Promotion</span>
                  <span className="bg-[#F2631F] text-white text-xs px-2 py-0.5 rounded ml-1">HOT</span>
                </Link>
              </nav>
            </div>
          )}
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center justify-between">
            {/* Categories Dropdown Button */}
            <div className="relative flex items-center">
              <button
                className="flex items-center py-1.5 px-4 text-black hover:text-gray-700"
                onClick={toggleCategoryDropdown}
                aria-expanded={isCategoryDropdownOpen}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="inline">Category</span>
                </span>
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Main Nav Links */}
            <nav className="flex items-center">
              <Link to="/" className="py-1.5 px-4 font-medium hover:text-[#F2631F]">
                Home
              </Link>
              <Link to="/all-products" className="py-1.5 px-4 font-medium hover:text-[#F2631F]">
                All Products
              </Link>
              <button 
                className="py-1.5 px-4 font-medium hover:text-[#F2631F] flex items-center bg-transparent border-none cursor-pointer"
                onClick={toggleNewProductDropdown}
              >
                New Product
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${isNewProductDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <Link to="/promotion" className="py-1.5 px-4 font-medium hover:text-[#F2631F] flex items-center">
                Promotion <span className="bg-[#F2631F] text-white text-xs px-2 py-0.5 rounded ml-1">HOT</span>
              </Link>
            </nav>
            
            {/* Right side links */}
            <div className="flex items-center space-x-6">
              <Link to="/track-order" className="flex items-center py-1.5 text-sm hover:text-[#F2631F]">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Track Your Order</span>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-1.5 text-sm text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to="/sign-in" className="flex items-center py-1.5 text-sm hover:text-[#F2631F]">
                  <User className="w-4 h-4 mr-1" />
                  <span>Sign In/Register</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category dropdown - for desktop */}
      {isCategoryDropdownOpen && !lowerMobileMenuOpen && (
        <CategoryDropdown 
          isOpen={isCategoryDropdownOpen} 
          closeDropdown={() => setIsCategoryDropdownOpen(false)} 
        />
      )}
      
      {/* New Product dropdown */}
      {isNewProductDropdownOpen && (
        <NewProductDropdown 
          isOpen={isNewProductDropdownOpen} 
          closeDropdown={() => setIsNewProductDropdownOpen(false)} 
        />
      )}
    </header>
  );
};

export default Navbar;