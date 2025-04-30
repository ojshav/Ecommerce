import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white min-h-[600px] flex items-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg 
            className="absolute top-0 left-0 opacity-20" 
            width="100%" height="100%" 
            viewBox="0 0 1440 800" 
            preserveAspectRatio="none"
          >
            <motion.path 
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="currentColor"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to <span className="text-white/90">ShopEasy</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover amazing products at unbeatable prices. Shop smart, shop easy - we've curated the best selection for you.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/products" 
                className="flex items-center justify-center sm:justify-between space-x-2 bg-white text-primary-600 hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors"
              >
                <ShoppingBag size={20} />
                <span>Shop Now</span>
                <ArrowRight size={18} className="hidden sm:block" />
              </Link>
              
              <Link 
                to="/categories" 
                className="flex items-center justify-center space-x-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
              >
                <span>Browse Categories</span>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Shopping experience" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-gray-900 font-semibold">New Arrivals</div>
                <div className="text-gray-600 text-sm">Check out what's new!</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-accent-500 p-4 rounded-full shadow-lg text-white">
                <div className="font-bold text-xl">30%</div>
                <div className="text-xs whitespace-nowrap">Summer Sale</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;