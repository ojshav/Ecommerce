import React, { useState } from 'react';

const ProductPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('');

  const colorOptions = [
    { name: 'Black', value: 'black', color: 'bg-gradient-to-br from-gray-800 to-gray-600' },
    { name: 'Brown', value: 'brown', color: 'bg-amber-800' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-900' },
    { name: 'Gray', value: 'gray', color: 'bg-gray-700' }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="w-full mx-auto min-h-screen bg-black">
      {/* Header Navigation */}
      <header className="bg-black max-w-[1900px] w-full mx-auto text-white px-6 py-3 border-b border-gray-800">
        <div className=" mx-auto">
          <nav className="text-sm font-sans">
            <span className="text-gray-400">HOME</span>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-400">MEN</span>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-400">SHOE</span>
            <span className="mx-2 text-gray-400">{'>'}</span>
            <span className="text-white">FASHION AXE VEGAN SINGLE-ORIGIN COFFEE KEFFIYEH</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex max-w-[1920px] w-full mx-auto">
        {/* Left Section - Product Images */}
        <div className="w-full ">
          <div className=" px-6 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left Image */}
              <div className="border border-black">
                <img 
                  src="assets/shop3/ProductPage/pd1.svg" 
                  alt="Product front view"
                  className="w-[720px] h-[896px] object-cover"
                />
              </div>
              
              {/* Top Right Image */}
              <div className="border border-black">
                <img 
                  src="assets/shop3/ProductPage/pd2.svg" 
                  alt="Product side view"
                  className="w-[720px] h-[896px] object-cover"
                />
              </div>
              
              {/* Bottom Left Image */}
              <div className="border border-black">
                <img 
                  src="assets/shop3/ProductPage/pd3.svg" 
                  alt="Product back view"
                  className="w-[720px] h-[896px] object-cover"
                />
              </div>
              
              {/* Bottom Right Image */}
              <div className="border border-black">
                <img 
                  src="assets/shop3/ProductPage/pd4.svg" 
                  alt="Product angled view"
                  className="w-[720px] h-[896px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-1/3 p-2 text-white">
          {/* Reference Number */}
          <div className="text-left mb-4">
            <span className="text-sm text-gray-400 font-sans">Ref.1234567GH</span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-bold mb-6 font-sans text-lime-400">
            Lavender Metallic Pleated Jumpsuit
          </h1>

          {/* Price Information */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-white line-through text-2xl font-sans">$234</span>
              <span className="text-2xl font-bold text-white font-sans">$200</span>
            </div>
            <p className="text-sm text-white font-sans">Tax free (21%) outside US</p>
          </div>

          {/* Product Description */}
          <p className="text-white mb-8 leading-relaxed font-sans">
            A stunning lavender metallic jumpsuit featuring soft pleats, a flattering silhouette, and a lustrous sheen that effortlessly blends elegance with modern edge.
          </p>

          {/* Product Links */}
          <div className="flex space-x-8 mb-8">
            <button className="text-white font-sans underline">
              Product details
            </button>
            <button className="text-white font-sans underline">
              Size guide
            </button>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded ${color.color} border-2 ${
                    selectedColor === color.value ? 'border-white' : 'border-transparent'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-400 font-sans">
                {colorOptions.find(c => c.value === selectedColor)?.name}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-lime-400 text-black font-medium py-3 px-4 rounded appearance-none cursor-pointer font-sans"
            >
              <option value="">Choose youre size</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size} className="bg-white text-black">
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Bag Button */}
          <button className="w-full bg-black border border-white text-white py-3 px-6 font-medium font-sans mb-8">
            Add to bag
          </button>

          {/* Bottom Section */}
          <div className="flex justify-between items-center pt-6">
            <span className="text-white font-sans underline">Product details</span>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-sans">Share</span>
              <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
