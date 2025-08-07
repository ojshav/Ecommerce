import React, { useState } from 'react';
import {  ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopWishlist } from '../../../context/ShopWishlistContext';

const SHOP_ID = 1;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getShopWishlistCount } = useShopWishlist();
  
  const wishlistCount = getShopWishlistCount(SHOP_ID);

  return (
    <header className="bg-white  top-0 z-50">
      <div className="w-[1280px] max-w-full mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-center space-x-16">
            <a href="#" className="text-sm font-medium font-poppins text-gray-900 hover:text-gray-600 transition-colors tracking-[0.1em]">
              SHOP
            </a>
            <a href="#" className="text-sm font-medium font-poppins text-gray-900 hover:text-gray-600 transition-colors tracking-[0.1em]">
              ABOUT
            </a>
          </nav>

          {/* Logo */}
          <div className="relative w-full h-[100px]">
            <Link to="/shop1">
              <h1
                className="absolute left-1/2 top-[38px] -translate-x-1/2 text-[24px] sm:text-[28px] md:text-[36px] leading-[100%] font-bold text-center tracking-normal font-playfair text-[#222222]"
              >
                AOIN
              </h1>
            </Link>
          </div>


          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/profile" className="text-gray-900 hover:text-gray-600 transition-colors">
              <User className="w-6 h-6" />
            </Link>
            <Link to="/shop1/wishlist" className="text-gray-900 hover:text-gray-600 transition-colors relative">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/shop1/cart" className="text-gray-900 hover:text-gray-600 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-6">
              <a href="#" className="text-sm font-medium text-gray-900 tracking-[0.1em]">SHOP</a>
              <a href="#" className="text-sm font-medium text-gray-900 tracking-[0.1em]">ABOUT</a>
            </nav>
            <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-100">
              <Link to="/profile">
                <User className="w-5 h-5 text-gray-900" />
              </Link>
              <Link to="/shop1/wishlist" className="relative">
                <Heart className="w-5 h-5 text-gray-900" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/shop1/cart">
                <ShoppingBag className="w-5 h-5 text-gray-900" />
              </Link>
              
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;