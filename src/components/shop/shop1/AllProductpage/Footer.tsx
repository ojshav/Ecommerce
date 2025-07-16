import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#e18a4b] text-white py-16 px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Brand Info */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-4xl font-bold mb-8 text-white">AOIN</h2>
          <div className="mb-6">
            <p className="font-semibold mb-1">Address : <span className="font-normal">40-60 Road 11378</span></p>
            <p className="ml-[90px]">New York</p>
          </div>
          <div className="mb-6">
            <p className="font-semibold">Phone ; <span className="font-normal">(+91)7-723-4608</span></p>
          </div>
          <div className="mb-6">
            <p className="font-semibold">Email : <span className="font-normal">Aoin@gmail.com</span></p>
          </div>
          <div className="flex gap-6 mt-6">
            {/* Facebook */}
            <a href="#" className="bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors">
              <svg fill="#3b5998" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors">
              <svg fill="#E1306C" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.278-.33-2.451-1.297-3.418-.967-.967-2.14-1.239-3.418-1.297C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            {/* Twitter */}
            <a href="#" className="bg-white rounded-full p-3 shadow-md hover:bg-gray-200 transition-colors">
              <svg fill="#1DA1F2" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
            </a>
          </div>
        </div>
        {/* Information */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-3xl font-semibold mb-2 text-white">Information</h3>
          <div className="w-10 h-1 bg-white mb-4" />
          <ul className="space-y-4 text-lg">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Checkout</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
          </ul>
        </div>
        {/* My Account */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-3xl font-semibold mb-2 text-white">My Account</h3>
          <div className="w-10 h-1 bg-white mb-4" />
          <ul className="space-y-4 text-lg">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Shopping Cart</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
          </ul>
        </div>
        {/* Categories */}
        <div className="flex-1 min-w-[180px]">
          <h3 className="text-3xl font-semibold mb-2 text-white">Categories</h3>
          <div className="w-10 h-1 bg-white mb-4" />
          <ul className="space-y-4 text-lg">
            <li><a href="#" className="hover:underline">Clothes</a></li>
            <li><a href="#" className="hover:underline">Dress</a></li>
            <li><a href="#" className="hover:underline">Shirt</a></li>
            <li><a href="#" className="hover:underline">Shoes</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/30 mt-12" />
    </footer>
  );
};

export default Footer;
