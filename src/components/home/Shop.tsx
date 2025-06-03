import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShopBanner {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  discount?: string;
}

const Shop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock data for shop banners - you can replace this with API data
  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      name: "Electronics Mega Store",
      description: "Latest gadgets and electronics with amazing deals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      category: "Electronics",
      discount: "Up to 50% OFF"
    },
    {
      id: 2,
      name: "Fashion Hub",
      description: "Trendy clothing and accessories for every style",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      category: "Fashion",
      discount: "New Collection"
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Transform your space with our home decor collection",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      category: "Home & Garden",
      discount: "30% OFF"
    },
    {
      id: 4,
      name: "Sports & Fitness",
      description: "Gear up for your fitness journey with top brands",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      category: "Sports",
      discount: "Free Shipping"
    },
    {
      id: 5,
      name: "Beauty & Health",
      description: "Premium beauty products and health essentials",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      category: "Beauty",
      discount: "Buy 2 Get 1"
    }
  ];

  const totalSlides = shopBanners.length;
  const slidesToShow = 3; // Number of banners to show at once
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-600 mt-2">Discover amazing deals across all categories</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              width: `${(totalSlides / slidesToShow) * 100}%`
            }}
          >
            {shopBanners.map((shop) => (
              <div
                key={shop.id}
                className="w-full px-3"
                style={{ width: `${100 / totalSlides}%` }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform">
                  <div className="relative h-64">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="space-y-2">
                        <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                          {shop.category}
                        </span>
                        <h3 className="text-xl font-bold">{shop.name}</h3>
                        <p className="text-sm text-gray-200 line-clamp-2">{shop.description}</p>
                        {shop.discount && (
                          <div className="flex items-center space-x-2">
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                              {shop.discount}
                            </span>
                          </div>
                        )}
                        <button className="mt-3 bg-white text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors w-fit">
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop; 