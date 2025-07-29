import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['HOME', 'PAGES', 'ACCESSORIES', 'PORTFOLIO', 'SHOP', 'ABOUT', 'CONTACT'];

  return (
    <header className="bg-black text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold font-poppins tracking-wider">
            AOIN POOJA STORE
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-black z-50 border-t border-gray-800">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-3 text-sm font-medium hover:bg-gray-900 hover:text-yellow-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-6 py-4 border-t border-gray-800 mt-2">
                <Search className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-400 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;