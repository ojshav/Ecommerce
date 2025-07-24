import React, { useState } from 'react';
import { Minus, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  primary_image: string;
  category_name: string;
  product_description?: string;
  full_description?: string;
  short_description?: string;
  meta_description?: string;
  media?: {
    images: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    videos: Array<{
      url: string;
      type: string;
      is_primary: boolean;
    }>;
    primary_image: string;
    total_media: number;
  };
}

interface HeroProps {
  productData?: Product | null;
}

const colorOptions = [
  { name: 'Yellow', value: 'yellow', className: 'bg-yellow-300' },
  { name: 'Pink', value: 'pink', className: 'bg-[#EABABA]' },
];
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

const Hero: React.FC<HeroProps> = ({ productData }) => {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string): JSX.Element[] => {
    if (!text) return [];
    
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const content = trimmed.slice(2, -2);
        elements.push(
          <h4 key={index} className="text-xl font-bold text-black mb-2">
            {content}
          </h4>
        );
      }
      // Italic text
      else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
        const content = trimmed.slice(1, -1);
        elements.push(
          <p key={index} className="text-gray-600 italic mb-2">
            {content}
          </p>
        );
      }
      // Numbered lists
      else if (/^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s*/, '');
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#EABABA] text-white text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="text-gray-700">{content}</span>
          </div>
        );
      }
      // Bullet points
      else if (trimmed.startsWith('- ')) {
        const content = trimmed.slice(2);
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-2 h-2 rounded-full bg-[#EABABA] mr-4 mt-2"></span>
            <span className="text-gray-700">{content}</span>
          </div>
        );
      }
      // Regular text
      else if (trimmed) {
        elements.push(
          <p key={index} className="text-gray-700 mb-2">
            {trimmed}
          </p>
        );
      }
    });
    
    return elements;
  };

  // Get all media (images and videos) for the carousel
  const allMedia = productData?.media ? [
    ...productData.media.images,
    ...productData.media.videos
  ] : [];

  // Fallback images if no media
  const fallbackImages = [
    "/assets/images/Productcard/hero1.jpg",
    "/assets/images/Productcard/hero2.jpg", 
    "/assets/images/Productcard/hero3.jpg",
    "/assets/images/Productcard/hero4.jpg"
  ];

  const mediaToDisplay = allMedia.length > 0 ? allMedia : fallbackImages.map(url => ({ url, type: 'IMAGE' }));

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mediaToDisplay.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mediaToDisplay.length) % mediaToDisplay.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <nav className="text-gray-500 text-sm sm:text-base flex flex-wrap gap-1">
          <span>Shop1</span>
          <span>/</span>
          <span>{productData?.category_name || 'Category'}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{productData?.product_name || 'Product'}</span>
        </nav>
      </div>

      {/* Images */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start">
        {/* Left big image - Main carousel */}
        <div className="w-full lg:w-[607px] h-[607px] bg-gray-100 rounded-3xl overflow-hidden relative">
          {/* Main Image/Video Display */}
          {mediaToDisplay[currentImageIndex]?.type?.toLowerCase() === 'video' ? (
            <video
              src={mediaToDisplay[currentImageIndex].url}
              controls
              className="w-full h-full object-cover"
              poster={productData?.primary_image}
              style={{ backgroundColor: '#f3f4f6' }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaToDisplay[currentImageIndex]?.url || productData?.primary_image || "/assets/images/Productcard/hero1.jpg"}
              alt={productData?.product_name || "Product image"}
              className="object-cover w-full h-full"
            />
          )}
          
          {/* Navigation arrows */}
          {mediaToDisplay.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}

          {/* Image indicators */}
          {mediaToDisplay.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mediaToDisplay.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side thumbnails */}
        <div className="flex flex-col gap-3 w-full lg:w-[626px]">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Display next 2 images as thumbnails if available */}
            {mediaToDisplay.length > 1 && (
              <>
                <div 
                  className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => goToImage((currentImageIndex + 1) % mediaToDisplay.length)}
                >
                  {mediaToDisplay[(currentImageIndex + 1) % mediaToDisplay.length]?.type?.toLowerCase() === 'video' ? (
                    <video
                      src={mediaToDisplay[(currentImageIndex + 1) % mediaToDisplay.length].url}
                      className="object-cover w-full h-full"
                      muted
                      poster={productData?.primary_image}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={mediaToDisplay[(currentImageIndex + 1) % mediaToDisplay.length]?.url || "/assets/images/Productcard/hero2.jpg"}
                      alt="Thumbnail"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                {mediaToDisplay.length > 2 && (
                  <div 
                    className="w-full sm:w-1/2 h-[291px] bg-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => goToImage((currentImageIndex + 2) % mediaToDisplay.length)}
                  >
                    {mediaToDisplay[(currentImageIndex + 2) % mediaToDisplay.length]?.type?.toLowerCase() === 'video' ? (
                      <video
                        src={mediaToDisplay[(currentImageIndex + 2) % mediaToDisplay.length].url}
                        className="object-cover w-full h-full"
                        muted
                        poster={productData?.primary_image}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={mediaToDisplay[(currentImageIndex + 2) % mediaToDisplay.length]?.url || "/assets/images/Productcard/hero3.jpg"}
                        alt="Thumbnail"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          {/* Third thumbnail if available */}
          {mediaToDisplay.length > 3 && (
            <div 
              className="w-full h-[303px] bg-gray-100 rounded-3xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => goToImage((currentImageIndex + 3) % mediaToDisplay.length)}
            >
              {mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length]?.type?.toLowerCase() === 'video' ? (
                <video
                  src={mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length].url}
                  className="object-cover w-full h-full"
                  muted
                  poster={productData?.primary_image}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={mediaToDisplay[(currentImageIndex + 3) % mediaToDisplay.length]?.url || "/assets/images/Productcard/hero4.jpg"}
                  alt="Thumbnail"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Title + Price (side-by-side) */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-12 mt-10 mb-6">
        {/* LEFT: Product Info */}
        <div className="flex-1 min-w-[220px]">
          {/* Product Name */}
          <h2 className="text-[42px] font-playfair font-semibold text-black">
            {productData?.product_name || 'NADETTA COAT'}
          </h2>

          {/* Short Description / Meta Description */}
          {(productData?.short_description || productData?.meta_description) && (
            <div className="mb-4">
              <p className="text-gray-600 text-[18px] leading-relaxed">
                {productData.short_description || productData.meta_description}
              </p>
            </div>
          )}

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
                <span className="text-[40px] font-bold text-[#FF6A3A]">
                  ${productData?.price || 450}
                </span>
                <span className="text-[28px] text-gray-500 line-through">
                  ${(productData?.price ? productData.price * 1.33 : 600).toFixed(0)}
                </span>
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
    <div className="space-y-2">
      {productData?.full_description 
        ? parseMarkdown(productData.full_description)
        : (
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
        )
      }
    </div>
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
