import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { Product } from '../../types';

const TrendingDeals: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Convert trending deals to Product format
  const trendingDeals: Product[] = [
    {
      id: '1',
      name: "Apple Watch Series 8",
      price: 349.99,
      originalPrice: 399.99,
      currency: "USD",
      rating: 4.8,
      reviews: 245,
      stock: 15,
      description: "GPS, 41mm, health tracking features",
      image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      category: "electronics",
      isNew: true,
      sku: "AWS8-1"
    },
    {
      id: '2',
      name: "Levi's 501 Original Jeans",
      price: 49.99,
      originalPrice: 69.50,
      currency: "USD",
      rating: 4.5,
      reviews: 189,
      stock: 45,
      description: "Classic straight fit denim",
      image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      category: "clothing",
      sku: "LEV501-1"
    },
    {
      id: '3',
      name: "Ceramic Vase Set",
      price: 32.99,
      originalPrice: 49.99,
      currency: "USD",
      rating: 4.3,
      reviews: 156,
      stock: 28,
      description: "Minimalist design for home decor",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "home-decor",
      sku: "CVS-1"
    },
    {
      id: '4',
      name: "Vitamin C Serum",
      price: 19.99,
      originalPrice: 29.99,
      currency: "USD",
      rating: 4.9,
      reviews: 320,
      stock: 0,
      description: "Brightening skin treatment",
      image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "beauty",
      sku: "VCS-1"
    },
    {
      id: '5',
      name: "Harry Potter Box Set",
      price: 89.99,
      originalPrice: 120.00,
      currency: "USD",
      rating: 4.7,
      reviews: 1025,
      stock: 32,
      description: "Complete 7-book collection",
      image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      category: "books",
      sku: "HPBS-1"
    },
    {
      id: '6',
      name: "Resistance Bands Set",
      price: 19.99,
      originalPrice: 29.99,
      currency: "USD",
      rating: 4.6,
      reviews: 187,
      stock: 75,
      description: "5-piece home workout kit",
      image: "https://images.unsplash.com/photo-1598447559311-88c21ee17fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "sports",
      sku: "RBS-1"
    }
  ];

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm breakpoint
        setItemsPerView(1);
      } else if (width < 768) { // md breakpoint
        setItemsPerView(2);
      } else if (width < 1024) { // lg breakpoint
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? trendingDeals.length - itemsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerView >= trendingDeals.length ? 0 : prevIndex + 1
    );
  };

  // Calculate visible products
  const visibleProducts = trendingDeals.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <section className="pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Header with navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <h2 className="text-2xl font-semibold">Trending Deals</h2>
            
            {/* Navigation */}
            <div className="flex items-center w-full md:w-auto space-x-4">
              <Link to="/trending" className="text-orange-500 text-sm hover:underline">
                See all
              </Link>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePrevious}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Previous deals"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Next deals"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Products carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-transform duration-300">
              {visibleProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  isNew={product.isNew}
                  salePercentage={product.originalPrice && product.price < product.originalPrice 
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                    : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingDeals; 