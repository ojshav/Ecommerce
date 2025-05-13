import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Facebook, Instagram, Twitter, Mail, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CategoryDropdown from '../home/CategoryDropdown';

const Navbar: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
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
      <div className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Social Media Icons - Left side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="#" className="text-white hover:text-gray-300">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-300">
              <Mail size={18} />
            </Link>
          </div>

          {/* Logo - Center for mobile, left for desktop */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link to="/" className="text-3xl font-bold">
              Logo
            </Link>
          </div>

          {/* Search Bar & Actions - Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex relative w-64">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-md border-0 py-2 px-4 text-gray-900 focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1 rounded">
                <Search size={16} />
              </button>
            </div>

            {/* Actions */}
            <Link to="/wishlist" className="hidden md:block text-white hover:text-gray-300">
              Wishlist
            </Link>
            <Link to="/cart" className="hidden md:block text-white hover:text-gray-300 relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {!isAuthenticated && (
              <Link 
                to="/business/login" 
                className="hidden md:block text-white border border-white rounded-md px-3 py-1 hover:bg-white hover:text-black transition-colors"
              >
                Become a Merchant
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Main navigation - white bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown Button */}
            <div className="relative">
              <button
                className="flex items-center py-3 px-4 text-black hover:text-gray-700"
                onClick={toggleCategoryDropdown}
                aria-expanded={isCategoryDropdownOpen}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Categories
                </span>
                <svg className={`ml-2 w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            
            {/* Main Nav Links */}
            <nav className="hidden md:flex items-center">
              <Link to="/" className="py-3 px-4 font-medium hover:text-primary-600">
                Home
              </Link>
              <Link to="/new-product" className="py-3 px-4 font-medium hover:text-primary-600 flex items-center">
                New Product
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/all-products" className="py-3 px-4 font-medium hover:text-primary-600">
                All Products
              </Link>
              <Link to="/promotion" className="py-3 px-4 font-medium hover:text-primary-600 flex items-center">
                Promotion <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded ml-1">HOT</span>
              </Link>
            </nav>
            
            {/* Right side links */}
            <div className="flex items-center space-x-4">
              <Link to="/track-order" className="flex items-center py-3 text-sm hover:text-primary-600">
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
                    className="flex items-center py-3 text-sm text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-5 h-5 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/sign-in" className="flex items-center py-3 text-sm hover:text-primary-600">
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sign In/Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search - only shown on mobile */}
      <div className="md:hidden px-4 py-2 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full rounded-md border-0 py-1.5 px-4 text-gray-900 focus:ring-2 focus:ring-primary-500"
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