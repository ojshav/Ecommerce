import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShopWishlist } from '../../../../context/ShopWishlistContext';

const SHOP_ID = 3;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getShopWishlistCount } = useShopWishlist();
  
  const wishlistCount = getShopWishlistCount(SHOP_ID);

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
          {/* Search icon */}
          <button className="text-white hover:text-gray-300 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Language and currency - hidden on mobile */}
          <span className="hidden sm:block text-gray-400 text-sm">
            En | USD
          </span>
          
          {/* Shopping cart with badge */}
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
          
          <div className="relative">
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            {/* Cart badge */}
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gray-700 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              1
            </div>
          </div>
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
