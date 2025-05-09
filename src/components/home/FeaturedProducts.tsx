import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import { featuredProductsData } from '../../data/featuredProductsData';

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
  // Use the featuredProductsData from the separate file
  const featuredProducts = featuredProductsData;
  
  console.log('Featured products in component:', featuredProducts.map(p => ({ id: p.id, name: p.name })));

  // Function to render star ratings
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : i === fullStars && hasHalfStar ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
          </span>
        ))}
        <span className="ml-1 text-xs text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              See all
            </Link>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image with overlay */}
              <div className="relative">
                <Link 
                  to={`/product/${product.id}`}
                  onClick={() => console.log(`Navigating to product with ID: ${product.id}, Full URL: /product/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                
                {/* Category tag */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
                
                {/* Discount tag */}
                {product.originalPrice && product.price < product.originalPrice && (
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
                
                {/* Quick actions */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1.5 bg-black rounded-full shadow hover:bg-gray-800">
                    <ShoppingCart size={16} className="text-white" />
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <Link 
                  to={`/product/${product.id}`} 
                  className="block"
                  onClick={() => console.log(`Navigating to product from info with ID: ${product.id}, Full URL: /product/${product.id}`)}
                >
                  <h3 className="font-medium text-gray-800 mb-1 hover:text-primary-600 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  
                  {/* Rating stars */}
                  {renderRating(product.rating)}
                  
                  {/* Price */}
                  <div className="mt-2 flex items-baseline">
                    {product.originalPrice && product.price < product.originalPrice ? (
                      <>
                        <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;