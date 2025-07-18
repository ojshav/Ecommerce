import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#181818] h-[516px] text-white py-20 pb-4 px-4 md:px-16 lg:px-32">
      <div className="max-w-full w-full mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-12">
        {/* Brand & Newsletter */}
        <div className="flex-1 min-w-[220px] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">AOIN</h2>
            <p className="text-gray-300 mb-6 text-sm max-w-xs">
              Be The First To Hear About New Product Drops, Insider News, Exclusive Offers, And More.
            </p>
            <button className="bg-[#C7A17A] text-white px-8 py-3 rounded-none font-semibold tracking-widest text-sm mb-8 md:mb-12">
              SIGN UP NOW
            </button>
          </div>
          <div className="flex space-x-6 mt-2">
            {/* Social Icons */}
            <a href="#" aria-label="Facebook">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.01-4.52 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.55 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 010 21.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white"><rect width="20" height="20" x="2" y="2" rx="5" strokeWidth={2} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
        {/* Order Assistance */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-semibold tracking-[0.2em] mb-6 uppercase text-gray-200">Order Assistance</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">Book An Appointment</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Gift Wrapping</a></li>
            <li><a href="#">Follow Your Order</a></li>
            <li><a href="#">Stores</a></li>
          </ul>
        </div>
        {/* Company */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-semibold tracking-[0.2em] mb-6 uppercase text-gray-200">Company</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Made To Last</a></li>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Core Values</a></li>
            <li><a href="#">The Essentials Blog</a></li>
            <li><a href="#">Hire Me</a></li>
            <li><a href="#">Affiliates And Creators</a></li>
          </ul>
        </div>
        {/* Support */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-semibold tracking-[0.2em] mb-6 uppercase text-gray-200">Support</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping And Returns</a></li>
            <li><a href="#">Tracking</a></li>
            <li><a href="#">Size Charts</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>
        {/* Contact Us */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-sm font-semibold tracking-[0.2em] mb-6 uppercase text-gray-200">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li><a href="#">Shops</a></li>
            <li><a href="#">General Inquiries</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs gap-2">
        <div className="flex space-x-6 mb-2 md:mb-0">
          <a href="#">Cookies Settings</a>
          <a href="#">Terms & Privacy</a>
          <a href="#">Accessibility Statement</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
