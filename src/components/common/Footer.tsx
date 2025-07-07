import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFE7DB] text-black w-full ">
      <div className="container mx-auto px-16 xs:px-2 sm:px-2 md:px-2 lg:px-12 xl:px-16 2xl:pl-16 py-8 sm:py-12  lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8">

          {/* Column 1 - Logo & Contact */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 lg:mb-8">
              <img src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1751687784/public_assets_images/public_assets_images_logo.svg" alt="AUIN" className="h-8 sm:h-10" />
            </Link>

            <div className="space-y-3 lg:space-y-4 text-[13px] sm:text-[14px] font-light text-[#161616]">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-black mt-1 flex-shrink-0" />
                <span className="leading-tight">
                  1658 Rosewood Lane<br />New York city, NY
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#161616] flex-shrink-0" />
                <a href="tel:2129299953" className="text-[#F2631F] hover:text-white">212 929 9953</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#161616] flex-shrink-0" />
                <span className="text-[#F2631F]">************.com</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Shop */}
          <div className="lg:col-span-1">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#161616] mb-3 lg:mb-4">Shop</h4>
            <ul className="space-y-2 lg:space-y-3 text-[13px] sm:text-[14px] text-[#161616] font-light">
              <li><Link to="/new-product" className="hover:text-[#F2631F] transition-colors">New Product</Link></li>
              <li><Link to="/live-shop" className="hover:text-[#F2631F] transition-colors">Live Shop</Link></li>
              <li><Link to="/promo-products" className="hover:text-[#F2631F] transition-colors">Promotion</Link></li>
            </ul>
          </div>

          {/* Column 3 - Policies */}
          <div className="lg:col-span-1 lg:-ml-8 xl:-ml-20">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#161616] mb-3 lg:mb-4">Policies</h4>
            <ul className="space-y-2 lg:space-y-3 text-[13px] sm:text-[14px] text-[#161616] font-light">
              <li><Link to="/privacy-policy" className="hover:text-[#F2631F] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-[#F2631F] transition-colors">Cancellation Policy</Link></li>
              <li><Link to="/return-refund" className="hover:text-[#F2631F] transition-colors">Return & Refund</Link></li>
              <li><Link to="/shipping-delivery" className="hover:text-[#F2631F] transition-colors">Shipping & Delivery Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 - Customer Support */}
          <div className="lg:col-span-1 lg:-ml-8 xl:-ml-28">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#161616] mb-3 lg:mb-4">Customer Support</h4>
            <ul className="space-y-2 lg:space-y-3 text-[13px] sm:text-[14px] text-[#161616] font-light">
              <li>
                <div>Call us at</div>
                <a href="tel:2129299953" className="text-[#F2631F] hover:text-white transition-colors">212 929 9953</a>
              </li>
              <li><Link to="/faq" className="hover:text-[#F2631F] transition-colors">Frequently asked Questions</Link></li>
              <li><Link to="terms" className="hover:text-[#F2631F] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping" className="hover:text-[#F2631F] transition-colors">Shipping Methods</Link></li>
              <li className="mt-2">
                <div>Mail us at</div>
                <span className="text-[#F2631F]">******@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Column 5 - Follow Us & Newsletter */}
          <div className="lg:col-span-1 lg:-ml-8 xl:-ml-32">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#161616] mb-3 lg:mb-4">Follow Us</h4>
            <div className="flex space-x-4 lg:space-x-5 mb-4 lg:mb-6">
              <a href="#" className="text-[#F2631F] hover:text-white transition-colors"><Twitter size={18} className="sm:w-5 sm:h-5" /></a>
              <a href="#" className="text-[#F2631F] hover:text-white transition-colors"><Facebook size={18} className="sm:w-5 sm:h-5" /></a>
              <a href="#" className="text-[#F2631F] hover:text-white transition-colors"><Instagram size={18} className="sm:w-5 sm:h-5" /></a>
              <a href="#" className="text-[#F2631F] hover:text-white transition-colors"><Github size={18} className="sm:w-5 sm:h-5" /></a>
            </div>

            {/* Email Subscription */}
            <form className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm max-w-full lg:max-w-[330px]">
              <div className="flex items-center px-2 text-black">
                <Mail size={14} className="sm:w-4 sm:h-4" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 text-xs sm:text-sm text-gray-700 placeholder-black bg-white border-none outline-none py-2 px-2 text-left"
              />
              <button
                type="submit"
                className="bg-[#F2631F] hover:bg-[#d44f12] text-white px-4 py-2 lg:-ml-6 text-xs font-medium transition-colors"
              >
                Submit
              </button>
            </form>

            <p className="mt-3 lg:mt-4 text-[14px] sm:text-[16px] lg:text-[18px] text-[#161616] font-normal leading-snug">
              Receive our latest updates about our products&nbsp;& promotions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom White Bar */}
      <div className="bg-white py-3 lg:py-4  xl:pl-28 sm:pl-16">
        <div className="container mx-auto ">
          <p className="text-center sm:text-left text-[11px] sm:text-[13px] text-gray-400">
            © 2025, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
