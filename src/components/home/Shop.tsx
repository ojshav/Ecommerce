import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopBanner {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  description: string;
  image: string;
  brands: string[];
  cta: string;
  openingTime: string;
  closingTime: string;
}

const Shop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Updated banner data to match the style shown
  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      title: "MIN. 50% OFF",
      subtitle: "Extra 20% off on",
      discount: "Indianwear for 9 to 5",
      description: "Ethnic elegance meets workplace chic",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["Libas", "W", "Biba", "Global Desi"],
      cta: "SHOP NOW",
      openingTime: "10:00 AM",
      closingTime: "10:00 PM"
    },
    {
      id: 2,
      title: "UP TO 80% OFF",
      subtitle: "Stylish dials that will",
      discount: "get you compliments",
      description: "Premium timepieces for every occasion",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["TITAN", "FOSSIL", "TIMEX", "CASIO"],
      cta: "SHOP NOW",
      openingTime: "9:00 AM",
      closingTime: "9:00 PM"
    },
    {
      id: 3,
      title: "FLAT 60% OFF",
      subtitle: "Smart tech that",
      discount: "transforms your lifestyle",
      description: "Latest gadgets and electronics",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["SAMSUNG", "APPLE", "XIAOMI", "SONY"],
      cta: "SHOP NOW",
      openingTime: "8:00 AM",
      closingTime: "11:00 PM"
    },
    {
      id: 4,
      title: "UPTO 70% OFF",
      subtitle: "Footwear that speaks",
      discount: "your style language",
      description: "Step up your shoe game",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["NIKE", "ADIDAS", "PUMA", "REEBOK"],
      cta: "SHOP NOW",
      openingTime: "10:00 AM",
      closingTime: "9:30 PM"
    }
  ];

  const totalSlides = shopBanners.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentBanner = shopBanners[currentIndex];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Main Banner Container */}
        <div 
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Banner Image and Content */}
          <div className="relative h-80 md:h-96">
            <img
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-full object-cover transition-all duration-1000"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-purple-900/30"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                {/* Left Content */}
                <div className="text-white max-w-lg">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {currentBanner.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-1 font-medium">
                    {currentBanner.subtitle}
                  </p>
                  <p className="text-xl md:text-2xl mb-4 font-medium">
                    {currentBanner.discount}
                  </p>
                  
                  {/* Opening Hours */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-6 inline-block">
                    <p className="text-sm font-medium text-white">
                      <span className="text-green-300">● Open:</span> {currentBanner.openingTime} - {currentBanner.closingTime}
                    </p>
                  </div>
                  
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                    {currentBanner.cta}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Brand Logos Section */}
          <div className="bg-white py-4 px-8 border-t">
            <div className="flex justify-center items-center space-x-8 md:space-x-12">
              {currentBanner.brands.map((brand, index) => (
                <div
                  key={index}
                  className="text-gray-700 font-bold text-lg md:text-xl tracking-wide hover:text-orange-500 transition-colors cursor-pointer"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-3">
          {shopBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop; 