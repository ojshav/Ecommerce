import React from 'react';

function AoinTrendsSection() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Left Product Image with Frame */}
      <div className="absolute left-16 top-24">
        <div className="relative">
          {/* Black geometric frame */}
          <div className="absolute -top-4 -left-4 w-32 h-4 bg-black"></div>
          <div className="absolute -top-4 -left-4 w-4 h-32 bg-black"></div>
          
          {/* Product image container */}
          <div className="w-80 h-96 bg-gray-100 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
              alt="Colorful draped top"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom right frame */}
          <div className="absolute -bottom-4 -right-4 w-32 h-4 bg-black"></div>
          <div className="absolute -bottom-4 -right-4 w-4 h-32 bg-black"></div>
        </div>
      </div>

      {/* Main Text Content */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-2xl">
        <h1 className="text-5xl font-light text-gray-800 leading-tight mb-8">
          Discover the trends that resonate<br />
          with you. Dive into Aoin today.
        </h1>
      </div>

      {/* Center Bottom Product Image with Shop Now Button */}
      <div className="absolute left-1/2 bottom-32 transform -translate-x-1/2">
        <div className="relative">
          {/* Product image */}
          <div className="w-64 h-80 bg-gray-100 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
              alt="Blue shirt with pattern"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Shop Now Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* Right Product Image with Frame */}
      <div className="absolute right-16 top-20">
        <div className="relative">
          {/* Top right frame */}
          <div className="absolute -top-4 -right-4 w-32 h-4 bg-black"></div>
          <div className="absolute -top-4 -right-4 w-4 h-32 bg-black"></div>
          
          {/* Product image container */}
          <div className="w-72 h-[500px] bg-gray-100 overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=350&h=600&fit=crop"
              alt="Orange draped skirt with fringe"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bottom left frame */}
          <div className="absolute -bottom-4 -left-4 w-32 h-4 bg-black"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-32 bg-black"></div>
        </div>
      </div>
    </div>
  );
}

export default AoinTrendsSection;