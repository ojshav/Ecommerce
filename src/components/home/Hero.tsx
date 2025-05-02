import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder offer data
  const offers = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Get up to 30% off on selected items",
      ctaText: "Buy Now",
      ctaLink: "/products?sale=summer",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest collection",
      ctaText: "Shop Now",
      ctaLink: "/products?new=true",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Limited Edition",
      description: "Exclusive products for a limited time",
      ctaText: "Order Now",
      ctaLink: "/products?limited=true",
      image: "/placeholder.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Sliding Offers</h2>
        
        <div className="relative">
          {/* Main carousel */}
          <div className="relative overflow-hidden">
            <div className="flex">
              <div className="grid grid-cols-12 gap-3 w-full">
                {/* Left sidebar - small offer */}
                <div className="col-span-2 hidden md:block">
                  <div className="bg-gray-100 h-full rounded-lg p-4 flex flex-col justify-between">
                    <div>
                      <div className="h-1 w-8 bg-black mb-2"></div>
                      <div className="h-1 w-16 bg-black mb-2"></div>
                      <div className="h-1 w-12 bg-black"></div>
                    </div>
                    <div className="text-center mt-auto">
                      <div className="font-bold mb-2">img</div>
                      <button className="bg-gray-300 text-black px-4 py-2 rounded-md w-full mt-2">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Main offer */}
                <div className="col-span-12 md:col-span-7">
                  <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex items-center justify-between h-64 md:h-72">
                    <div className="w-1/3">
                      <div className="h-1 w-8 bg-black mb-2"></div>
                      <div className="h-1 w-24 bg-black mb-2"></div>
                      <div className="h-1 w-16 bg-black mb-4"></div>
                      <button className="bg-gray-300 text-black px-4 py-2 rounded-md">
                        Buy Now
                      </button>
                    </div>
                    <div className="w-2/3 flex justify-center">
                      <div className="text-center text-2xl font-bold">img</div>
                    </div>
                  </div>
                  
                  {/* Navigation controls */}
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={prevSlide}
                      className="p-1 rounded-full bg-white border border-gray-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div className="flex space-x-1">
                      {offers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 w-2 rounded-full ${
                            currentSlide === index ? 'bg-black' : 'bg-gray-300'
                          }`}
                        ></button>
                      ))}
                    </div>
                    <button 
                      onClick={nextSlide}
                      className="p-1 rounded-full bg-white border border-gray-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  {/* Bottom row of offers */}
                  <div className="grid grid-cols-5 gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="bg-gray-100 p-2 rounded-lg h-16 flex flex-col justify-center">
                        <div className="h-1 w-12 bg-black mb-1"></div>
                        <div className="h-1 w-16 bg-black mb-1"></div>
                        <div className="h-1 w-8 bg-black"></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right sidebar - two small offers */}
                <div className="col-span-3 space-y-3 hidden md:block">
                  <div className="bg-gray-100 rounded-lg p-4 h-[8.5rem]">
                    <div className="h-1 w-16 bg-black mb-2"></div>
                    <div className="h-1 w-12 bg-black mb-2"></div>
                    <div className="h-1 w-8 bg-black mb-2"></div>
                    <div className="text-right text-lg font-bold">img</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 h-[8.5rem]">
                    <div className="h-1 w-16 bg-black mb-2"></div>
                    <div className="h-1 w-12 bg-black mb-2"></div>
                    <div className="h-1 w-8 bg-black mb-2"></div>
                    <div className="text-right text-lg font-bold">img</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;