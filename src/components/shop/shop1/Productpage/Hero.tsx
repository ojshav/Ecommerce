import React, { useState } from 'react';
import { Minus, Plus, Star } from 'lucide-react';

const colorOptions = [
  { name: 'Yellow', value: 'yellow', className: 'bg-yellow-300' },
  { name: 'Pink', value: 'pink', className: 'bg-[#EABABA]' },
];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

const Hero: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="text-gray-500 text-sm sm:text-base flex flex-wrap gap-1">
          <span>Women fashion</span>
          <span>/</span>
          <span>Jacket & Coats</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Coat</span>
        </nav>
      </div>

      {/* Images */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start">
        {/* Left big image */}
        <div className="w-full lg:w-[607px] h-[607px] bg-gray-100 rounded-3xl overflow-hidden">
          <img
            src="/assets/images/Productcard/hero1.jpg"
            alt="Main model"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side images */}
        <div className="flex flex-col gap-3 w-full lg:w-[626px]">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src="/assets/images/Productcard/hero2.jpg"
                alt="Detail"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src="/assets/images/Productcard/hero3.jpg"
                alt="Back"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-full h-[303px] bg-gray-100 rounded-3xl overflow-hidden">
            <img
              src="/assets/images/Productcard/hero4.jpg"
              alt="Side view"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Title + Price (side-by-side) */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-12 mt-10 mb-6">
        {/* LEFT: Product Info */}
        <div className="flex-1 min-w-[220px]">
          {/* Product Name */}
          <h2 className="text-[42px] font-playfair font-semibold text-black">
            NADETTA COAT <span className="italic font-normal text-gray-800">Beige</span>
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex space-x-1 text-[#FFB800] text-lg">
              {[...Array(4)].map((_, i) => (
                <Star key={i} fill="#FFB800" stroke="#FFB800" size={20} />
              ))}
              <Star fill="none" stroke="#FFB800" size={20} />
            </div>
            <p className="text-gray-600 text-[18px] ml-2">(4.8 from 328 Reviews)</p>
          </div>

          {/* Color and Size Selection */}
          <div className="flex space-x-16 mb-10">
            {/* Color */}
            <div>
              <p className="text-[20px] font-semibold mb-4">Select color</p>
              <div className="flex space-x-6">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    aria-label={color.name}
                    onClick={() => handleColorSelect(color.value)}
                    className={`w-[48px] h-[48px] rounded-full border-4 transition-all duration-150 focus:outline-none shadow-md flex items-center justify-center ${
                      selectedColor === color.value
                        ? 'border-[#FEEBD8] scale-110'
                        : 'border-white opacity-80 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.value === 'yellow' ? '#FDE047' : '#EABABA' }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[20px] font-semibold mb-4">Select Size</p>
              <div className="flex space-x-4">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`w-[64px] h-[48px] rounded-full border text-[18px] font-semibold transition-all duration-150 focus:outline-none
                      ${selectedSize === size
                        ? 'bg-[#FEEBD8] border-[#FEEBD8] text-black shadow-md'
                        : 'bg-white border-black text-black hover:bg-gray-100'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Price, Quantity, Actions */}
        <div className="flex flex-col items-end min-w-[380px] w-full lg:w-auto">
          <div className="flex w-full justify-between items-end mb-6">
            {/* Total Price */}
            <div>
              <p className="text-gray-600 text-[20px] font-medium mb-1">Total Price</p>
              <div className="flex items-center space-x-3">
                <span className="text-[40px] font-bold text-[#FF6A3A]">$450</span>
                <span className="text-[28px] text-gray-500 line-through">$600</span>
              </div>
            </div>
            {/* Quantity */}
            <div className="flex flex-col items-center mb-4">
              <p className="text-gray-600 text-[20px] font-medium mb-4">Quantity</p>
              <div className="flex items-center space-x-4">
                <button
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={24} />
                </button>
                <span className="text-[22px] font-bold w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-lg transition-all duration-150 hover:bg-gray-800"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-6 w-full mt-6">
            <button className="bg-[#FEEBD8] hover:bg-[#fdd7b9] px-20 py-3 rounded-full font-semibold text-xl transition-all duration-150 shadow-md border-2 border-[#FEEBD8]">
              ADD TO CART
            </button>
            <button className="bg-black hover:bg-[#222] text-white px-20 py-3 rounded-full font-semibold text-xl transition-all duration-150 shadow-md border-2 border-black">
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>
      {/* Product Details Section */}
<div className="w-full mt-20 flex flex-col lg:flex-row justify-between gap-10">
  {/* Left - Description List */}
  <div className="flex-1">
    <h3 className="text-[32px] font-playfair font-bold text-black mb-6">
      Product <span className="italic font-normal">Details</span>
    </h3>
    <ul className="space-y-4">
      {[
        'Midnight womens fabric',
        'Regular Fit',
        'Peak lapels',
        'Dry clean',
      ].map((item, index) => (
        <li key={index} className="flex items-center text-[18px]">
          <span className="w-2 h-2 rounded-full bg-[#EABABA] mr-4"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* Right - Size Selector & Measurements */}
  <div className="flex-1">
    {/* Sizes */}
    <div className="flex space-x-4 mb-6 ">
      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
        <div
          key={size}
          className={`w-[50px] h-[50px] rounded-full flex items-center justify-center border-2 text-sm font-semibold 
            ${
              size === 'L'
                ? 'bg-black text-white border-black shadow'
                : 'border-gray-300 text-black'
            } relative`}
        >
          {size}
          <span
            className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-1 rounded-full ${
              size === 'L' ? 'bg-transparent' : 'bg-[#FEEBD8]'
            }`}
          />
        </div>
      ))}
    </div>

    {/* Measurement Table */}
    <div className="grid grid-cols-2 font-archivio gap-y-3 gap-x-4 mt-10 text-[16px]">
      <div className="font-semibold text-black">Shoulder</div>
      <div className="text-gray-500">50cm /19.75 in</div>

      <div className="font-semibold text-black">length</div>
      <div className="text-gray-500">124 cm /47.75 in</div>

      <div className="font-semibold text-black">Bust</div>
      <div className="text-gray-500">50cm /19.75 in</div>

      <div className="font-semibold text-black">Sleeve length</div>
      <div className="text-gray-500">50cm /19.75 in</div>
    </div>
  </div>
</div>

    </section>
  );
};

export default Hero;
