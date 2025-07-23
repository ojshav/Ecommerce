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
      <header className="bg-black max-w-[1920px] w-full mx-auto text-white px-6 py-3 border-b border-gray-800">
        <div className=" mx-auto">
          <nav className="text-[22px] font-bebas">
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
        <div className="w-[1332px] ">
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
        <div className="w-[546px] px-4 text-white">
          {/* Reference Number */}
          <div className="text-left mb-4">
            <span className="text-sm text-[#FFFFFF] font-sans">Ref.1234567GH</span>
          </div>

          {/* Product Title */}
          <h1 className="text-[24px] font-bold mb-6 font-alexandria text-[#CCFF00]">
            Lavender Metallic Pleated <br /> Jumpsuit
          </h1>

          {/* Price Information */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-white line-through text-[20px] font-sans">$234</span>
              <span className="text-[20px] font-bold text-[#FE5335] font-sans">$200</span>
            </div>
            <p className="text-[14px] text-[#EDEAEA] font-sans">Tax free (21%) outside US</p>
          </div>

          {/* Product Description */}
          <p className="text-[#F4EDED] mb-8 text-[16px] leading-relaxed font-alexandria ">
            A stunning lavender metallic jumpsuit featuring soft pleats, a flattering silhouette, and a lustrous sheen that effortlessly blends elegance with modern edge.
          </p>

          {/* Product Links */}
          <div className="flex font-[14px] space-x-8 mb-8">
            <button className="text-white font-openSans underline">
              Product details
            </button>
            <button className="text-white font-openSans underline">
              Size guide
            </button>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-4">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded ${color.color} border-2 ${
                      selectedColor === color.value ? 'border-white' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[14px] text-[#757575] font-sans">
                {colorOptions.find(c => c.value === selectedColor)?.name}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-[#CCFF00] text-black font-medium py-2 px-4 rounded appearance-none cursor-pointer font-sans"
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
          <button className="w-full bg-black  border-white text-white py-3 px-6 font-medium font-openSans mb-4">
            Add to bag
          </button>

          {/* Bottom Section */}
          <div className="flex justify-between items-center pt-6">
            <span className="text-white font-openSans underline">Product details</span>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-sans">Share</span>
              <svg className="w-5 h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Product Details Section */}
      <div className="w-full flex justify-center items-start bg-black py-14">
        <div className="max-w-6xl w-full flex flex-row gap-16">
          {/* Left: Product Details */}
          <div className="flex-1">
            <h2 className="text-[18px] font-bold mb-6 font-alexandria text-white">Product details</h2>
            <p className="text-[#FAF8F8] font-openSans text-[16px] font-normal leading-[30px]">
              Lavender Metallic Pleated Jumpsuit, designed to make a statement.<br />
              Crafted from a luxe metallic fabric with delicate pleats, it offers a flattering silhouette with a cinched waist and flowing wide-leg design.<br />
              The subtle shimmer adds a touch of glamour, perfect for evening events, parties, or special occasions
            </p>
            <ul className="list-disc ml-5 mt-8 text-[#FAF8F8] mb-8 text-[16px] font-openSans font-normal leading-[26px] space-y-1">
              <li>Luxe metallic finish</li>
              <li>Delicate pleated texture</li>
              <li>Adjustable waist tie for a tailored fit</li>
            </ul>
            <div className="flex gap-4 font-montserrat mt-4">
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-3 rounded shadow-md font-sans whitespace-nowrap">Material &amp; Care</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-3 rounded shadow-md font-sans whitespace-nowrap">Fit &amp; Style</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-2 rounded shadow-md font-sans whitespace-nowrap">Design</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-4 rounded shadow-md font-sans whitespace-nowrap">metallic shine</button>
            </div>
          </div>
          {/* Right: Information */}
          <div className="flex-1">
            <h2 className="text-[18px] font-bold mb-6 font-alexandria text-white">Information</h2>
            <ul className="list-disc ml-4 mt-6 text-[#FAF8F8] mb-6 text-[16px] font-openSans font-normal leading-[26px] space-y-1">
              <li>Soft lavender hue with metallic shine</li>
              <li>V-neckline or halter neck (depending on design)</li>
              <li>Pleated throughout for texture and movement</li>
            </ul>
            <p className="text-white mb-8 text-[16px] font-openSans">
              Smooth, lightweight fabric with a glossy metallic <br /> finish for an elevated look.
            </p>
            <div className="flex font-montserrat gap-8 mt-8">
              <a href="#" className="underline text-white  text-[14px]">Delivery</a>
              <a href="#" className="underline text-white text-[14px]">Return</a>
              <a href="#" className="underline text-white text-[14px]">Help</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
