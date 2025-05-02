import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const TrendingDeals: React.FC = () => {
  // Diverse trending deals with real images from different categories
  const trendingDeals = [
    {
      id: 1,
      name: "Apple Watch Series 8",
      price: 399.99,
      salePrice: 349.99,
      discount: "13%",
      description: "GPS, 41mm, health tracking features",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
    },
    {
      id: 2,
      name: "Levi's 501 Original Jeans",
      price: 69.50,
      salePrice: 49.99,
      discount: "28%",
      description: "Classic straight fit denim",
      category: "Clothing",
      image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
    },
    {
      id: 3,
      name: "Ceramic Vase Set",
      price: 49.99,
      salePrice: 32.99,
      discount: "34%",
      description: "Minimalist design for home decor",
      category: "Home Decor",
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 4,
      name: "Vitamin C Serum",
      price: 29.99,
      salePrice: 19.99,
      discount: "33%",
      description: "Brightening skin treatment",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1593487568720-92097fb460fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      name: "Harry Potter Box Set",
      price: 120.00,
      salePrice: 89.99,
      discount: "25%",
      description: "Complete 7-book collection",
      category: "Books",
      image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
      id: 6,
      name: "Resistance Bands Set",
      price: 29.99,
      salePrice: 19.99,
      discount: "33%",
      description: "5-piece home workout kit",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1598447559311-88c21ee17fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Deals</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Trending Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trendingDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
              {/* Product Image */}
              <div className="w-1/3 relative">
                <Link to={`/product/${deal.id}`}>
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "140px" }}
                  />
                </Link>
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{deal.discount}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="w-2/3 p-4">
                <div className="mb-1 text-xs font-medium text-gray-500">{deal.category}</div>
                <Link to={`/product/${deal.id}`} className="block">
                  <h3 className="font-medium text-gray-800 mb-1 truncate hover:text-primary-600">{deal.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{deal.description}</p>
                </Link>
                
                {/* Price */}
                <div className="flex items-center mb-2">
                  <span className="text-gray-900 font-bold mr-2">${deal.salePrice}</span>
                  <span className="text-gray-400 text-sm line-through">${deal.price}</span>
                </div>
                
                {/* Add to Cart Button */}
                <button className="flex items-center bg-black text-white px-3 py-1.5 rounded-md text-xs hover:bg-gray-800">
                  <ShoppingCart size={14} className="mr-1" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDeals; 