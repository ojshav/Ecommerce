import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrendingDeals: React.FC = () => {
  // Sample trending deals
  const trendingDeals = [
    {
      id: 1,
      name: "Smart Watch Pro",
      price: 199.99,
      description: "Track fitness, health, and stay connected",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 79.99,
      description: "Portable speaker with amazing sound quality",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "Wireless Mouse",
      price: 39.99,
      description: "Ergonomic design for all-day comfort",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 149.99,
      description: "Tactile feedback for gaming and typing",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      name: "Wireless Charger",
      price: 29.99,
      description: "Fast charging for compatible devices",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      name: "USB-C Hub",
      price: 59.99,
      description: "Connect all your devices with one hub",
      image: "/placeholder.jpg"
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Deals</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full bg-white border border-gray-300">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-full bg-white border border-gray-300">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Trending Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingDeals.map((deal) => (
            <div key={deal.id} className="border rounded-lg overflow-hidden flex">
              {/* Product Image */}
              <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">img</div>
              </div>
              
              {/* Product Info */}
              <div className="w-2/3 p-4">
                <div className="space-y-1 mb-3">
                  <div className="h-1 w-24 bg-black"></div>
                  <div className="h-1 w-20 bg-black"></div>
                  <div className="h-1 w-16 bg-black"></div>
                </div>
                
                {/* Bullet Points */}
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3].map((dot) => (
                    <div key={dot} className="h-1 w-1 rounded-full bg-black"></div>
                  ))}
                </div>
                
                {/* Button */}
                <div className="mt-2">
                  <button className="bg-gray-300 text-xs px-3 py-1 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDeals; 