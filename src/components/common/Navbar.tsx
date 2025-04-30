import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Package, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, isBusinessAccount, logout } = useAuth();
  const location = useLocation();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-primary-600 text-white flex items-center justify-center">
              <Store size={24} />
            </div>
            <span className="text-xl font-semibold text-gray-900">ShopEasy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                location.pathname.includes('/products') ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right side - cart, login, etc. */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-medium rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Actions */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to={isBusinessAccount ? "/business/dashboard" : "/account"} 
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {isBusinessAccount ? 'Dashboard' : 'My Account'}
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to="/signin" 
                  className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/business-login" 
                  className="text-sm font-medium text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Business Login
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 animate-slideDown">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-base font-medium ${
                  location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-base font-medium ${
                  location.pathname.includes('/products') ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`text-base font-medium ${
                  location.pathname === '/about' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-base font-medium ${
                  location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-700'
                }`}
              >
                Contact
              </Link>

              {/* Auth mobile */}
              {isAuthenticated ? (
                <>
                  <Link 
                    to={isBusinessAccount ? "/business/dashboard" : "/account"} 
                    className="text-base font-medium text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {isBusinessAccount ? 'Dashboard' : 'My Account'}
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-base font-medium text-left text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="text-base font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/business-login" 
                    className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Business Login
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;