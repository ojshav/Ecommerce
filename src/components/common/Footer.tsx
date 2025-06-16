import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Facebook, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-12">

          {/* Column 1 - Logo & Contact */}
          <div>
            <Link to="/" className="inline-block mb-8">
              <img src="/assets/images/logo.svg" alt="AUIN" className="h-10" />
            </Link>

            <div className="space-y-4 text-[14px] font-light text-white">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <span className="leading-tight">
                  1658 Rosewood Lane<br />New York city, NY
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <a href="tel:2129299953" className="text-[#F2631F] hover:text-white">212 929 9953</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-[#F2631F]">************.com</span>
              </div>
            </div>
          </div>


          {/* Column 2 - Shop */}
          <div>
            <h4 className="text-[18px] font-medium text-white mb-4">Shop</h4>
            <ul className="space-y-3 text-[14px] text-white font-light">
              <li><Link to="/new-product">New Product</Link></li>
              <li><Link to="/live-shop">Live Shop</Link></li>
              <li><Link to="/promo-products">Promotion</Link></li>
           {/* <li><Link to="#">Top Brands</Link></li> */}

            </ul>
          </div>

          {/* Column 3 - Policies */}
          <div className="md:-ml-20">
            <h4 className="text-[18px] font-medium text-white mb-4">Policies</h4>
            <ul className="space-y-3 text-[14px] text-white font-light">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
              <li><Link to="/return-refund">Return & Refund</Link></li>
              <li><Link to="/shipping-delivery">Shipping & Delivery Policy</Link></li>
            </ul>
          </div>

          {/* Column 4 - Customer Support */}
          <div className="md:-ml-28">
            <h4 className="text-[18px] font-medium text-white mb-4">Customer Support</h4>
            <ul className="space-y-3 text-[14px] text-white font-light">
              <li>
                <div>Call us at</div>
                <a href="tel:2129299953" className="text-[#F2631F]">212 929 9953</a>
              </li>
              <li><Link to="/faq">Frequently asked Questions</Link></li>
              <li><Link to="terms">Terms & Conditions</Link></li>
              <li><Link to="/shipping">Shipping Methods</Link></li>
              <li className="mt-2">
                <div>Mail us at</div>
                <span className="text-[#F2631F]">******@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Column 5 - Follow Us & Newsletter */}
          <div className="md:-ml-32">
            <h4 className="text-[18px] font-medium text-white mb-4">Follow Us</h4>
            <div className="flex space-x-5 mb-6">
              <a href="#" className="text-[#F2631F] hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-[#F2631F] hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-[#F2631F] hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="text-[#F2631F] hover:text-white"><Github size={20} /></a>
            </div>

            {/* Email Subscription */}
            <form className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm max-w-[330px]">
              <div className="flex items-center px-2 text-black">
                <Mail size={16} />
              </div>
              <input
              type="email"
              placeholder="Enter your email"
              className="w-40 text-sm text-gray-700 placeholder-black bg-white border-none outline-none py-1 px-0 text-left"
            />

              <button
                type="submit"
                className="bg-[#F2631F] hover:bg-[#d44f12] text-white px-3 ml-9 my-1 text-xs font-medium"
              >
                Submit
              </button>
            </form>


            <p className="mt-4 text-[18px] text-white font-normal leading-snug">
              Receive our latest updates about our products&nbsp;& promotions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom White Bar */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-[13px] text-gray-400">
            © 2000–2021, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
