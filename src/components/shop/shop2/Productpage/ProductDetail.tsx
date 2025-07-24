import React, { useState } from 'react';
import { Heart, ShoppingCart, Image as ImageIcon, ChevronDown, ChevronUp, Star } from 'lucide-react';

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Light Beige');
  // For accordion
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Light Beige', 'Light Coral', 'Burgundy'];
  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Description/Review data and component logic
  const sections = [
    { title: "Overview", content: "This is the product overview." },
    { title: "Materials", content: "Made from eco-friendly materials." },
    { title: "Return Policy", content: "Returns accepted within 30 days." },
  ];

  const reviews = [
    {
      name: "Marvin McKinney",
      rating: 4,
      content: "I love this store's shirt! It's so comfortable and easy to wear with anything. I ended up buying one in every color during their sale. The quality is great too. Thank you!",
      daysAgo: "2 days ago"
    },
    {
      name: "Savannah Nguyen",
      rating: 5,
      content: "I'm so impressed with the customer service at this store! The staff was friendly and helpful, and I found the perfect shirt. It looks and feels amazing. I'll definitely be shopping here again!",
      daysAgo: "19 days ago"
    },
    {
      name: "Wade Warren",
      rating: 2,
      content: "Unfortunately, I didn't have a great experience with this store's product. The quality wasn't what I expected and it didn't fit well. I wouldn't recommend it.",
      daysAgo: "22 days ago"
    },
  ];

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-6 sm:pb-8 lg:pb-10 flex flex-col gap-0">
      <hr className="border-black border-t-1 mb-4 sm:mb-6" />
      {/* Top Container: Responsive grid for images and details */}
      <div className="grid grid-cols-1 max-w-[1580px]  md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-4 2xl:gap-2 items-start lg:items-center">
        {/* First image */}
        <div className="flex justify-center order-1 md:order-1 lg:order-1">
          <img 
            src="/assets/shop2/ProductPage/pd1.svg" 
            alt="Front View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[390px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
        </div>
        
        {/* Second image with Heart Icon */}
        <div className="relative flex justify-center order-2 md:order-2 lg:order-2">
          <img 
            src="/assets/shop2/ProductPage/pd1.svg" 
            alt="Back View" 
            className="rounded-2xl w-full max-w-[320px] sm:max-w-[360px] lg:w-[390px] h-[300px] sm:h-[380px] lg:h-[456px] object-cover" 
          />
          <button className="absolute top-4 right-4 sm:right-8 p-2 rounded-full transition-all">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </button>
        </div>

        {/* Product Details */}
        <div className="relative flex flex-col justify-center min-w-0 lg:min-w-[340px] h-auto lg:h-[456px] px-2 mb-4 lg:mb-8 self-center order-3 md:order-3 lg:order-3">
          <div className="text-xs sm:text-sm uppercase text-gray-400 mb-2 sm:mb-4 font-bebas font-semibold tracking-wide">MENS FASHION</div>
          <p className="text-2xl sm:text-3xl lg:text-[42px] font-normal font-bebas leading-tight mb-2 sm:mb-3">HIGH-WAISTED DENIM</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">$790</p>

          {/* Size Selection */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-[14px] font-bebas font-bold tracking-wide">SIZE</span>
              <span className="text-xs sm:text-[13px] text-black underline cursor-pointer font-medium">Size Guide</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-[10px] sm:text-[12px] font-semibold shadow-sm transition-all focus:outline-none ${selectedSize === size ? 'bg-orange-100 border-orange-400 shadow-md' : 'bg-white border-gray-300'} ${selectedSize === size ? 'text-black' : 'text-gray-700'}`}
                  style={{ boxShadow: selectedSize === size ? '0 2px 8px rgba(255, 165, 0, 0.15)' : undefined }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-2">
            <div className="text-sm sm:text-base font-bebas font-bold mb-2 tracking-wide">COLOR</div>
            <div className="flex flex-wrap font-gilroy gap-2 sm:gap-3">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-2 py-1.5 sm:py-2 rounded-lg border font-gilroy text-[10px] sm:text-[12px] font-semibold flex items-center gap-1 sm:gap-2 shadow-sm transition-all focus:outline-none ${selectedColor === color ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-white'}`}
                  style={{ boxShadow: selectedColor === color ? '0 2px 8px rgba(0,0,0,0.08)' : undefined }}
                >
                  {/* Color dot */}
                  <span className={`inline-block font-gilroy w-3 h-3 sm:w-4 sm:h-4 rounded-full ml-1 sm:ml-2 ${color === 'Light Beige' ? 'bg-blue-200' : color === 'Light Coral' ? 'bg-lime-200' : 'bg-purple-300'}`}></span>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <button className="w-full sm:flex-1 bg-black text-[16px] font-gilroy text-white px-3 py-1 rounded-full font-bold flex items-center justify-center gap-2 text-base  shadow hover:bg-gray-900 transition-all">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
            </button>
            <button className="w-full sm:flex-1 border-2 border-black text-black px-3 py-3 sm:py-4 rounded-full font-bold text-base  hover:bg-gray-100 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Container: Next two images */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1230px] mx-auto items-center mt-4 sm:mt-6 lg:mt-1 gap-4">
        <img 
          src="/assets/shop2/ProductPage/pd3.svg" 
          alt="Side View" 
          className="rounded-xl w-full lg:w-[486px] h-[250px] sm:h-[300px] lg:h-[412px] object-cover" 
        />
        <div className="relative rounded-xl overflow-hidden flex-1 h-[250px] sm:h-[300px] lg:h-[412px] w-full lg:ml-0">
          <img 
            src="/assets/shop2/ProductPage/pd4.svg" 
            alt="Closeup" 
            className="rounded-xl w-full h-full object-cover" 
          />
          <button className="absolute bottom-8 sm:bottom-14 left-6 sm:left-12 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 shadow-lg border border-gray-200">
            <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" /> See All Photos
          </button>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className="max-w-[1310px]  pt-8 sm:pt-10 lg:pt-12 flex flex-col items-start">
        {/* Accordion Section */}
        <div className="max-w-3xl w-full  pt-8 sm:pt-10 lg:pt-12 pl-0 text-left self-start">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold mb-3 sm:mb-4 text-left font-bebas">DESCRIPTION</h2>
          <div className="divide-y border-t border-b">
            {sections.map((section, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex font-gilroy items-center justify-between py-3 sm:py-4 text-left"
                >
                  <span className="text-sm sm:text-base font-medium">{section.title}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 text-left">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-3xl w-full mt-8 sm:mt-12 lg:mt-16 pl-0 pt-6 sm:pt-8 lg:pt-9 text-left self-start">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-normal text-left font-bebas">REVIEWS</h2>
              <p className="underline text-xs sm:text-sm">Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}</p>
            </div>
            <button className="px-4 sm:px-6 py-2 bg-black text-white rounded-full font-gilroy text-sm sm:text-lg font-semibold w-full sm:w-auto">Write Review</button>
          </div>

          {reviews.map((review, index) => (
            <div key={index} className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold font-bebas text-lg sm:text-xl uppercase truncate text-left">{review.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-base text-gray-400 font-gilroy whitespace-nowrap self-start sm:self-auto text-left">{review.daysAgo}</p>
              </div>
              <p className="text-xs sm:text-sm text-black font-gilroy leading-relaxed text-left">{review.content}</p>
              <hr className="mt-3 sm:mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
