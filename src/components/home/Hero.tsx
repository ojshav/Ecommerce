import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopSellingCarousel from './TopSellingCarousel';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Add auto-scroll effect with 2-second delay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 2000); // Change slide every 2 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Updated offer data with real images
  const offers = [
    {
      id: 1,
      title: "Summer Sale",
      description: "Get up to 50% off on selected electronics",
      ctaText: "Shop Now",
      ctaLink: "/products?sale=summer",
      image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest tech collection",
      ctaText: "Explore",
      ctaLink: "/products?new=true",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Premium Audio",
      description: "Exclusive headphones collection",
      ctaText: "Buy Now",
      ctaLink: "/products?category=audio",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bgColor: "bg-purple-50"
    }
  ];

  // Sidebar product promotions
  const sidebarItems = [
    {
      id: 1,
      title: "Smart Watch",
      description: "Track your fitness",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      link: "/products/smart-watch"
    },
    {
      id: 2,
      title: "Headphones",
      description: "Premium sound",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
      link: "/products/headphones"
    },
    {
      id: 3,
      title: "Cameras",
      description: "Capture moments",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      link: "/products/cameras"
    }
  ];

  // Category shortcuts
  const categoryShortcuts = [
    { id: 1, name: "Smartphones", link: "/categories/smartphones" },
    { id: 2, name: "Laptops", link: "/categories/laptops" },
    { id: 3, name: "Tablets", link: "/categories/tablets" },
    { id: 4, name: "Accessories", link: "/categories/accessories" },
    { id: 5, name: "Audio", link: "/categories/audio" }
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

  const currentOffer = offers[currentSlide];

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="relative overflow-hidden">
            <div className="flex">
              <div className="grid grid-cols-12 gap-3 w-full">
                {/* Left sidebar - small offer */}
                <div className="col-span-2 hidden md:block">
                  <TopSellingCarousel />
                </div>
                
                {/* Main offer */}
                <div className="col-span-12 md:col-span-7">
                  <div className={`${currentOffer.bgColor} rounded-lg overflow-hidden shadow-sm`}>
                    <div className="p-4 md:p-6 flex items-center justify-between h-64 md:h-72">
                      <div className="w-1/2 pl-4">
                        <h2 className="text-xl md:text-3xl font-bold mb-2">{currentOffer.title}</h2>
                        <p className="text-sm md:text-base text-gray-700 mb-6">{currentOffer.description}</p>
                        <Link 
                          to={currentOffer.ctaLink}
                          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition inline-block"
                        >
                          {currentOffer.ctaText}
                        </Link>
                      </div>
                      <div className="w-1/2 flex justify-center">
                        <img 
                          src={currentOffer.image} 
                          alt={currentOffer.title}
                          className="h-48 md:h-56 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation controls */}
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={prevSlide}
                      className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex space-x-2">
                      {offers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-2 w-8 rounded-full transition-all ${
                            currentSlide === index ? 'bg-black' : 'bg-gray-300'
                          }`}
                        ></button>
                      ))}
                    </div>
                    <button 
                      onClick={nextSlide}
                      className="p-1 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  {/* Bottom row of category shortcuts */}
                  <div className="grid grid-cols-5 gap-2 mt-3">
                    {categoryShortcuts.map((category) => (
                      <Link 
                        key={category.id} 
                        to={category.link}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Right sidebar - two small offers */}
                <div className="col-span-3 space-y-3 hidden md:block">
                  {sidebarItems.slice(1, 3).map((item, index) => (
                    <Link 
                      key={item.id}
                      to={item.link}
                      className="block bg-gray-50 rounded-lg shadow-sm overflow-hidden h-[8.5rem]"
                    >
                      <div className="p-4 flex h-full">
                        <div className="w-1/2">
                          <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                          <p className="text-xs text-gray-600">{item.description}</p>
                          <button className="bg-black text-white text-xs px-3 py-1 rounded mt-2">
                            View
                          </button>
                        </div>
                        <div className="w-1/2 flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="h-24 w-full object-cover rounded"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
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