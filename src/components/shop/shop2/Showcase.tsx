import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

const Showcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-postcard-16sep25.png",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/e/lenskart-blu-lb-e13737-c2-eyeglasses_17_september_feamle_shot-_lk_blu4307.jpg"
  ];

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const slideWidth = container.scrollWidth / images.length;
        container.scrollTo({
          left: (currentSlide - 1) * slideWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const slideWidth = container.scrollWidth / images.length;
        container.scrollTo({
          left: (currentSlide + 1) * slideWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] xl:min-h-[1024px] text-white font-sans flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      
      {/* Carousel Section */}
      <div className="w-full max-w-[1364px] relative flex items-center justify-end overflow-hidden px-2 xl:ml-48  sm:px-4 md:px-6 mb-6 sm:mb-8">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePreviousSlide}
          disabled={currentSlide === 0}
          className={`absolute left-1 sm:left-2 md:left-0 top-1/2 transform -translate-y-1/2 rounded-full p-2 sm:p-3 border border-[#05002e] transition-colors duration-200 z-10 ${
            currentSlide === 0 
              ? 'bg-black/30 cursor-not-allowed' 
              : 'bg-black/60 hover:bg-black/80 cursor-pointer'
          }`}
        >
          <ArrowLeft size={16} className={`sm:w-12 sm:h-12 ${
            currentSlide === 0 ? 'text-gray-500' : 'text-white'
          }`} />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={handleNextSlide}
          disabled={currentSlide === images.length - 1}
          className={`absolute right-1 sm:right-2 md:right-4 lg:right-16 2xl:right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 sm:p-3 border border-[#05002e] transition-colors duration-200 z-10 ${
            currentSlide === images.length - 1 
              ? 'bg-black/30 cursor-not-allowed' 
              : 'bg-black/60 hover:bg-black/80 cursor-pointer'
          }`}
        >
          <ArrowLeft size={16} className={`sm:w-5 sm:h-5 rotate-180 ${
            currentSlide === images.length - 1 ? 'text-gray-500' : 'text-white'
          }`} />
        </button>

        {/* Image Slides */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full justify-center sm:px-12 md:px-16 lg:px-20 xl:px-2"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Model ${index + 1}`}
              className={`rounded-xl object-cover h-[473px] flex-shrink-0 ${
                index === 0 
                  ? 'w-full max-w-full' 
                  : 'w-[425px] max-w-[40vw] sm:max-w-[50vw] md:max-w-[40vw] lg:max-w-[35vw] xl:max-w-[425px]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[1100px] h-1.5 sm:h-2  bg-gray-300 rounded-full mb-6 sm:mb-8 lg:mb-10 mt-4 sm:mt-6">
        <div 
          className="h-full bg-[#05002e] rounded-full transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
        ></div>
      </div>

    </section>
  );
};

export default Showcase;
