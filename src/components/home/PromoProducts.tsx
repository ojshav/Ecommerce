import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromoProducts: React.FC = () => {
  // Promo products data matching the image
  const promoProducts = [
    {
      id: 1,
      name: "Apple Macbook Air MWTJ2SA/A Space Grey (2020)",
      price: 1099,
      originalPrice: 1193.71,
      discount: 15,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      sold: 700,
      stock: 300,
      countdownDays: 123,
      countdownHours: 42,
      countdownMinutes: 0,
      countdownSeconds: 8
    },
    {
      id: 2,
      name: "Apple Watch Series 5 MWV62VN/A",
      price: 514.51,
      originalPrice: 539.05,
      discount: 12,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      sold: 700,
      stock: 300,
      countdownDays: 123,
      countdownHours: 42,
      countdownMinutes: 0,
      countdownSeconds: 8
    }
  ];

  // Banner data
  const banner = {
    title: "FASHIONABLE WALLETS",
    subtitle: "BIG GOOD SALE FOR HER",
    tag: "New Product",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Promo Product</h2>
          <div className="flex items-center">
            <Link to="/promotion" className="text-orange-500 text-sm font-medium mr-4">
              See All
            </Link>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronLeft size={20} />
              </button>
              <button className="p-1 rounded-full border border-gray-300">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Promo Products Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {promoProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row relative">
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-orange-500 text-white text-xs py-1 px-2 rounded">
                  - {product.discount}%
                </span>
              </div>
              
              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm">
                <Heart size={18} className="text-gray-500" />
              </button>
              
              {/* Product Image */}
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-base mb-2">{product.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through ml-3">${product.originalPrice.toFixed(2)}</span>
                  </div>
                  
                  {/* Sold/Stock Indicator */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sold: {product.sold}</span>
                      <span>In Stock: {product.stock}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                        style={{ width: `${(product.sold / (product.sold + product.stock)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Countdown Timer */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    <div className="text-center">
                      <div className="bg-gray-100 p-2 rounded">
                        <span className="text-base font-medium">{product.countdownDays}</span>
                      </div>
                      <span className="text-xs text-gray-500">Day</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-100 p-2 rounded">
                        <span className="text-base font-medium">{product.countdownHours}</span>
                      </div>
                      <span className="text-xs text-gray-500">Hour</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-100 p-2 rounded">
                        <span className="text-base font-medium">{product.countdownMinutes.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-gray-500">Min</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-100 p-2 rounded">
                        <span className="text-base font-medium">{product.countdownSeconds.toString().padStart(2, '0')}</span>
                      </div>
                      <span className="text-xs text-gray-500">Sec</span>
                    </div>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded transition">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width Banner */}
      </div>
      <div className="relative overflow-hidden h-96 w-screen -ml-[calc((100vw-100%)/2)]">
        <img 
          src={banner.image}
          alt="Promo banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center p-8">
          <div className="container mx-auto px-4">
            <div className="ml-auto mr-8">
              <span className="inline-block bg-white bg-opacity-90 px-3 py-1 text-sm mb-4">
                {banner.tag}
              </span>
              <h3 className="text-white text-3xl font-bold mb-2">{banner.title}</h3>
              <h4 className="text-white text-2xl font-bold mb-6">{banner.subtitle}</h4>
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
      </div>
    </section>
  );
};

export default PromoProducts; 