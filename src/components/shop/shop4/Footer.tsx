import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#222121] text-white">
      {/* Top section with service features */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Delivery */}
            <div className="flex items-center space-x-4">
                <img className="w-30 h-16" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463004/public_assets_shop4/public_assets_shop4_Layer_4.png' alt=''/>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide">FREE DELIVERY</h3>
                <p className="text-gray-400 text-sm">PRODUCTS</p>
              </div>
            </div>

            {/* Free & Easy Returns */}
            <div className="flex items-center space-x-4">
               <img className="w-17 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463001/public_assets_shop4/public_assets_shop4_Layer_4%20%281%29.png' alt=''/>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide">FREE & EASY</h3>
                <p className="text-gray-400 text-sm">RETURNS</p>
              </div>
            </div>

            {/* 24/7 Service */}
            <div className="flex items-center space-x-4">
                <img className="w-17 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463002/public_assets_shop4/public_assets_shop4_Layer_4%20%282%29.png' alt=''/>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide">24/7 NON-STOP</h3>
                <p className="text-gray-400 text-sm">SERVICE</p>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="flex items-center space-x-4">
                <img className="w-20 h-18" src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463003/public_assets_shop4/public_assets_shop4_Layer_4%20%283%29.png' alt=''/>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide">100% SECURE</h3>
                <p className="text-gray-400 text-sm">CHECKOUT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4 tracking-wide">AOIN POOJA STORE</h2>
            <p className="text-gray-400 text-sm mb-6">The Essence Of Every Pooja, In One Place</p>
            
            {/* <button className="bg-[#BB9D7B] text-[#FFFFFF]  font-medium px-6 py-2 text-sm uppercase tracking-wide transition-colors duration-200 mb-6 ">
              SIGN UP NOW
            </button> */}

            <button
  className="w-[125px] h-[35px] bg-[#BB9D7B] text-[#FFFFFF] font-[400] text-[10px] leading-[100%] tracking-[0.25em] text-center capitalize"
>
  Sign Up Now
</button>


            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/profile.php?id=61578809217780" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/AOIN111111" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/aoin.in?igsh=NGk3dml2ZHk2cjM4" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/aoinstore" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                <div className="w-5 h-5 bg-red-500 rounded"></div>
              </a>
            </div>
          </div>

          {/* Order Assistance */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">ORDER ASSISTANCE</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Book An Appointment</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Return & Refunds</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Gift Wrapping</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Follow Your Order</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Stores</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Made To Last</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Core Values</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">The Essentials Blog</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Hire Me</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Affiliates And Creators</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">SUPPORT</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shipping And Returns</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Tracking</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Size Charts</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Shops</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">General Inquiries</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2023 Aoin Pooja Store, All Rights Reserved</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Cookies Settings</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms & Privacy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;