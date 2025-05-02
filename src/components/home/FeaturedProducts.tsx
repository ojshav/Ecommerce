import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  // Diverse range of featured products with real images
  const featuredProducts = [
    {
      id: 1,
      name: "Sony WH-1000XM4",
      price: 349.99,
      discountPrice: 299.99,
      rating: 4.8,
      description: "Wireless noise-cancelling headphones",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: 150.00,
      discountPrice: 129.99,
      rating: 4.7,
      description: "Men's athletic shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "Clothing"
    },
    {
      id: 3,
      name: "Modern Table Lamp",
      price: 79.99,
      discountPrice: 59.99,
      rating: 4.5,
      description: "Contemporary design for home decor",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Home Decor"
    },
    {
      id: 4,
      name: "Fenty Beauty Foundation",
      price: 38.00,
      discountPrice: null,
      rating: 4.9,
      description: "Pro Filt'r Soft Matte Foundation",
      image: "https://images.unsplash.com/photo-1631214503851-d45e5c72df1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=709&q=80",
      category: "Beauty"
    },
    {
      id: 5,
      name: "The Alchemist",
      price: 16.99,
      discountPrice: 12.99,
      rating: 4.7,
      description: "Bestselling novel by Paulo Coelho",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Books"
    },
    {
      id: 6,
      name: "Yoga Mat",
      price: 29.99,
      discountPrice: 24.99,
      rating: 4.6,
      description: "Non-slip exercise yoga mat",
      image: "https://images.unsplash.com/photo-1599447292180-45d51e69d456?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Sports"
    }
  ];

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
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image with overlay */}
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                
                {/* Category tag */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
                
                {/* Discount tag */}
                {product.discountPrice && (
                  <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
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
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-medium text-gray-800 mb-1 hover:text-primary-600 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  
                  {/* Rating stars */}
                  {renderRating(product.rating)}
                  
                  {/* Price */}
                  <div className="mt-2 flex items-baseline">
                    {product.discountPrice ? (
                      <>
                        <span className="text-gray-900 font-bold">${product.discountPrice.toFixed(2)}</span>
                        <span className="text-gray-400 text-sm line-through ml-2">${product.price.toFixed(2)}</span>
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