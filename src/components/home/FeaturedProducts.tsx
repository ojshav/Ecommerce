import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      description: "Premium sound quality with noise cancellation",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Smartphone X",
      price: 799.99,
      description: "Latest model with advanced camera system",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "Fitness Tracker",
      price: 59.99,
      description: "Track your health metrics 24/7",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "Laptop Pro",
      price: 1299.99,
      description: "Powerful performance for professionals",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 129.99,
      description: "Crystal clear audio in a compact form",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      name: "Smart Speaker",
      price: 79.99,
      description: "Voice-controlled home assistant",
      image: "/placeholder.jpg"
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full bg-white border border-gray-300">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-full bg-white border border-gray-300">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">img</div>
              </div>
              
              {/* Product Info */}
              <div className="p-3">
                <div className="h-1 w-12 bg-black mb-2"></div>
                <div className="h-1 w-16 bg-black mb-2"></div>
                <div className="h-1 w-8 bg-black mb-2"></div>
                <div className="h-1 w-10 bg-black"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;