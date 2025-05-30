import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopSellingCarousel from './TopSellingCarousel';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Add auto-scroll effect with 3-second delay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Main carousel slides
  const slides = [
    {
      id: 1,
      brand: "Asus",
      title: "Supper Sale",
      subtitle: "Laptop Gaming",
      ctaText: "Order Now",
      ctaLink: "/products/gaming-laptops",
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80",
      bgColor: "bg-purple-500",
    },
    {
      id: 2,
      brand: "New Product",
      title: "HAND WATCH",
      subtitle: "ROSSINI",
      ctaText: "Buy Now",
      ctaLink: "/products/watches",
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      bgColor: "bg-pink-400",
    },
    {
      id: 3,
      brand: "Big deal",
      title: "Black Friday",
      subtitle: "Buy 1 Get 1",
      ctaText: "Shop Now",
      ctaLink: "/black-friday",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      bgColor: "bg-orange-400",
    },
  ];

  // Side panels for featured categories
  const featuredCategories = [
    {
      id: 1,
      title: "Big deal",
      subtitle: "Black Friday",
      description: "Buy 1 Get 1",
      image: "https://images.unsplash.com/photo-1590637638224-03133977b2e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      link: "/black-friday-deals",
      bgColor: "bg-orange-50",
    },
    {
      id: 2,
      title: "Mobile Phones",
      subtitle: "Stay Connected",
      description: "Stay Ahead",
      extraText: "Power In Your Palm",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=727&q=80",
      link: "/mobile-phones",
      bgColor: "bg-green-50",
    },
  ];

  // Bottom category panels
  const categoryPanels = [
    {
      id: 1,
      title: "Toys",
      subtitle: "Play Beyond Limits!",
      extraText: "Where Fun Takes Shape!",
      image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/category/toys",
      bgColor: "bg-gray-700",
    },
    {
      id: 2,
      title: "Cosmetics",
      subtitle: "MAXIMI",
      extraText: "Sale 50%",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/category/cosmetics",
      bgColor: "bg-orange-100",
    },
    {
      id: 3,
      title: "Sunglasses",
      subtitle: "Authentic",
      extraText: "Sale off 50%",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80",
      link: "/category/sunglasses",
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Party Accessories",
      subtitle: "Party Anytime",
      extraText: "Ready, Anytime",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/category/party-accessories",
      bgColor: "bg-green-100",
    },
    {
      id: 5,
      title: "Fashion",
      subtitle: "Nice bag",
      extraText: "Nice style",
      image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1531&q=80",
      link: "/category/fashion",
      bgColor: "bg-pink-100",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="w-full">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative overflow-hidden">
            {/* Responsive flex: column on mobile, row on desktop */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {/* Side carousel - always visible, responsive width */}
              <div className="w-full md:w-1/5 min-w-[220px] max-w-xs mx-auto md:mx-0">
                <TopSellingCarousel />
              </div>
              {/* Main carousel - always visible, responsive width */}
              <div className="flex-1">
                <div className="w-full">
                  <div className="flex flex-col">
                    {/* Main carousel - center */}
                    <div className="w-full">
                      <div className={`${currentSlideData.bgColor} rounded-lg overflow-hidden relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]`}>
                        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-center text-white">
                          <div className="z-10 max-w-[60%] md:max-w-[50%]">
                            <span className="text-sm uppercase tracking-wider">{currentSlideData.brand}</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">{currentSlideData.title}</h2>
                            <h3 className="text-xl sm:text-2xl mt-1">{currentSlideData.subtitle}</h3>
                            <Link 
                              to={currentSlideData.ctaLink}
                              className="bg-white text-black mt-4 md:mt-6 px-4 sm:px-6 py-2 rounded inline-block font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                            >
                              {currentSlideData.ctaText}
                            </Link>
                          </div>
                        </div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-center">
                          <img 
                            src={currentSlideData.image}
                            alt={currentSlideData.title}
                            className="h-full w-auto object-cover object-center"
                          />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                          {slides.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className={`h-1.5 sm:h-2 w-6 sm:w-8 rounded-full transition-all ${
                                currentSlide === index ? 'bg-white' : 'bg-white/50'
                              }`}
                            ></button>
                          ))}
                        </div>
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2 sm:px-4">
                          <button 
                            onClick={prevSlide}
                            className="p-1 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                          >
                            <ChevronLeft size={16} className="sm:hidden" />
                            <ChevronLeft size={20} className="hidden sm:block" />
                          </button>
                          <button 
                            onClick={nextSlide}
                            className="p-1 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                          >
                            <ChevronRight size={16} className="sm:hidden" />
                            <ChevronRight size={20} className="hidden sm:block" />
                          </button>
                        </div>
                      </div>
                    </div>
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