import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProductsData } from '../../data/featuredProductsData';
import ProductCard from '../product/ProductCard';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

// Product type for exported featured products
export type FeaturedProduct = {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  currency: string;
  tags: string[];
  originalPrice: number;
};

const FeaturedProducts: React.FC = () => {
  const [itemsPerView, setItemsPerView] = useState(4);
  const {
    containerRef,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    handleWheel,
    scroll
  } = useHorizontalScroll();

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

  return (
    <section className="pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Header with navigation */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            
            {/* Navigation */}
            <div className="flex items-center w-full md:w-auto space-x-4">
              <Link to="/all-products" className="text-sm hover:underline">
                See all
              </Link>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => scroll('left')}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Previous products"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  aria-label="Next products"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Products carousel */}
          <div className="relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onWheel={handleWheel}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {featuredProductsData.map((product) => (
                <div 
                  key={product.id} 
                  className="flex-none"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 16 / itemsPerView}px)` }}
                >
                  <ProductCard 
                    product={product}
                    salePercentage={product.originalPrice && product.price < product.originalPrice 
                      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                      : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;