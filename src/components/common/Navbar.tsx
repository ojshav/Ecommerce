import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Facebook, Instagram, Twitter, Mail, LogOut, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CategoryDropdown from '../home/CategoryDropdown';

const Navbar: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top navigation - black bar */}
      <div className="bg-black text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Social Media Icons - Left side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="text-[#F2631F] hover:text-orange-400">
              <Mail size={18} />
            </Link>
          </div>

          {/* Logo - Center for mobile, left for desktop */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="inline-block">
              <img src="/assets/images/logo.svg" alt="AUIN Logo" width="100" height="35" />
            </Link>
          </div>

          {/* Search Bar & Actions - Right side */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Search Bar with Category Dropdown */}
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full min-w-[400px] border-0 py-2 px-4 text-gray-900 focus:ring-0 focus:outline-none"
              />
              <div className="relative flex items-center border-l border-gray-200 bg-white">
                <select 
                  className="h-full appearance-none bg-transparent py-2 pl-3 pr-10 text-gray-900 focus:ring-0 focus:outline-none"
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

            <button className="bg-black hover:bg-gray-900 text-white py-2 px-6 rounded-md">
              Search
            </button>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              <Link to="/wishlist" className="text-black hover:text-[#F2631F]">
                <Heart className="w-6 h-6" />
              </Link>
              <Link to="/cart" className="text-black hover:text-[#F2631F] relative">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F2631F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="text-black hover:text-[#F2631F]">
                <User className="w-6 h-6" />
              </Link>
              <Link 
                to="/business/login" 
                className="bg-[#F2631F] text-white rounded-md px-4 py-2 hover:bg-orange-600 transition-colors whitespace-nowrap"
              >
                Become a Merchant
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation - white bar */}
      <div className="bg-white border-b shadow-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown Button */}
            <div className="relative flex items-center">
              <button
                className="flex items-center py-2 px-4 text-black hover:text-gray-700"
                onClick={toggleCategoryDropdown}
                aria-expanded={isCategoryDropdownOpen}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Category
                </span>
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
            
            {/* Main Nav Links */}
            <nav className="hidden md:flex items-center">
              <Link to="/" className="py-2 px-4 font-medium hover:text-[#F2631F]">
                Home
              </Link>
              <Link to="/all-products" className="py-2 px-4 font-medium hover:text-[#F2631F]">
                All Products
              </Link>
              <Link to="/new-product" className="py-2 px-4 font-medium hover:text-[#F2631F] flex items-center">
                New Product
                <ChevronDown className="ml-1 w-4 h-4" />
              </Link>
              <Link to="/promotion" className="py-2 px-4 font-medium hover:text-[#F2631F] flex items-center">
                Promotion <span className="bg-[#F2631F] text-white text-xs px-2 py-0.5 rounded ml-1">HOT</span>
              </Link>
            </nav>
            
            {/* Right side links */}
            <div className="flex items-center space-x-6">
              <Link to="/track-order" className="flex items-center py-2 text-sm hover:text-[#F2631F]">
                <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Track Your Order
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/sign-in" className="flex items-center py-2 text-sm hover:text-[#F2631F]">
                  <User className="w-5 h-5 mr-1" />
                  Sign In/Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search - only shown on mobile */}
      <div className="lg:hidden px-4 py-2 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 focus:ring-2 focus:ring-[#F2631F]"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Category dropdown */}
      {isCategoryDropdownOpen && (
        <CategoryDropdown isOpen={isCategoryDropdownOpen} />
      )}
    </header>
  );
};

export default Navbar;