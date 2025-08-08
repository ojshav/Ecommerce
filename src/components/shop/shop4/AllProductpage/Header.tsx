import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['HOME', 'PAGES', 'ACCESSORIES', 'PORTFOLIO', 'SHOP', 'ABOUT', 'CONTACT'];

  return (
    <header className="bg-black text-white relative">
      <div className="container max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-4 sm:pt-6 lg:pt-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Logo */}
          <div className="text-white font-junge text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] xl:tracking-[3.3px] uppercase bg-gradient-to-r from-[#383838] to-[#9e9e9e] bg-clip-text text-transparent" style={{ WebkitTextStroke: '0.5px', WebkitTextStrokeColor: '#aea8a8' }}>
            AOIN POOJA STORE
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex px-4 xl:px-10 space-x-4 xl:space-x-8 2xl:space-x-16">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-white font-poppins text-[12px] xl:text-[14px] font-normal leading-normal tracking-[1.5px] xl:tracking-[2.1px] uppercase hover:text-yellow-400 transition-colors duration-200 whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
            <Search 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
              strokeWidth={1.5}
            />
            <ShoppingCart 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
              strokeWidth={1.5}
            />
            <Menu 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
              strokeWidth={1.5}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black z-50 border-t border-gray-800 shadow-lg">
            <nav className="flex flex-col py-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-4 py-3 text-white font-poppins text-[14px] sm:text-[16px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] uppercase hover:bg-gray-900 hover:text-yellow-400 transition-colors duration-200 border-b border-gray-800 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-8 py-4 border-t border-gray-800 mt-2">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-yellow-400 transition-colors" />
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-yellow-400 transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
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