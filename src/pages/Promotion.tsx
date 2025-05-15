import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingCart, Heart, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Promotion: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Enhanced promotional products with more items for the dedicated page
  const promoProducts = [
    {
      id: "promo1",
      name: "Apple MacBook Pro M2",
      price: 1799.99,
      originalPrice: 1999.99,
      discount: 10,
      description: "Latest model with 16GB RAM and 512GB SSD",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      rating: 4.9,
      stock: 15
    },
    {
      id: "promo2",
      name: "Bose QuietComfort Earbuds",
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      description: "Noise cancelling wireless earbuds",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      rating: 4.7,
      stock: 22
    },
    {
      id: "promo3",
      name: "Samsung QLED 4K Smart TV",
      price: 899.99,
      originalPrice: 1299.99,
      discount: 30,
      description: "55-inch display with Quantum HDR",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
      rating: 4.8,
      stock: 7
    },
    {
      id: "promo4",
      name: "Nike Air Jordan Retro",
      price: 129.99,
      originalPrice: 180.00,
      discount: 28,
      description: "Classic basketball shoes with iconic style",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      rating: 4.6,
      stock: 18
    },
    {
      id: "promo5",
      name: "Dyson V11 Vacuum",
      price: 499.99,
      originalPrice: 699.99,
      discount: 28,
      description: "Cordless vacuum with powerful suction",
      category: "Home",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4.9,
      stock: 5
    },
    {
      id: "promo6",
      name: "Sony PlayStation 5",
      price: 449.99,
      originalPrice: 499.99,
      discount: 10,
      description: "Next-gen gaming console with SSD",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80",
      rating: 4.9,
      stock: 3
    },
    {
      id: "promo7",
      name: "Organic Skincare Set",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      description: "Natural ingredients for all skin types",
      category: "Beauty",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: 4.5,
      stock: 20
    },
    {
      id: "promo8",
      name: "Le Creuset Dutch Oven",
      price: 249.99,
      originalPrice: 369.99,
      discount: 32,
      description: "Premium enameled cast iron cookware",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1585442231025-b77a6349cbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 4.8,
      stock: 12
    }
  ];

  // Get unique categories
  const categories = ['all', ...new Set(promoProducts.map(p => p.category))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? promoProducts 
    : promoProducts.filter(p => p.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      default: // popularity - we'll use rating as a proxy for popularity
        return b.rating - a.rating;
    }
  });

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

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Special Promotions</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Discover incredible deals with up to 50% off on our premium products. Limited time offers!</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-4 items-center">
            <h2 className="text-2xl font-bold">Promotional Products</h2>
            <span className="text-gray-500">({filteredProducts.length} products)</span>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Filter size={16} />
                <span>Category: {selectedCategory === 'all' ? 'All' : selectedCategory}</span>
                <ChevronDown size={16} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        selectedCategory === category ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {selectedCategory === category && <Check size={16} className="mr-2 text-primary-600" />}
                      <span className="capitalize">{category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sort Filter */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span>Sort By: </span>
                <span>
                  {sortBy === 'popularity' && 'Popularity'}
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'discount' && 'Discount'}
                </span>
                <ChevronDown size={16} />
              </button>
              
              {isSortOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  {[
                    { value: 'popularity', label: 'Popularity' },
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'discount', label: 'Discount' }
                  ].map(option => (
                    <button
                      key={option.value}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        sortBy === option.value ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {sortBy === option.value && <Check size={16} className="mr-2 text-primary-600" />}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image with overlay */}
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                </Link>
                
                {/* Category tag */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
                
                {/* Discount tag */}
                <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
                
                {/* Quick actions */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <button className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition-colors">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                  <button 
                    className="p-1.5 bg-black rounded-full shadow hover:bg-gray-800 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
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
                    <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </Link>
                
                {/* Stock status */}
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm">
                    {product.stock > 0 ? (
                      <span className={`${product.stock < 5 ? 'text-orange-500' : 'text-green-600'}`}>
                        {product.stock < 5 ? `Only ${product.stock} left` : 'In Stock'}
                      </span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </div>
                  
                  <button 
                    className={`px-3 py-1.5 rounded text-sm font-medium ${
                      product.stock > 0 
                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                        : 'bg-gray-300 cursor-not-allowed'
                    } transition-colors`}
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No promotional products found</h3>
            <p className="text-gray-500 mb-6">Try changing your filter options to find products</p>
            <button 
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              onClick={() => setSelectedCategory('all')}
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Newsletter Signup */}
        <div className="mt-16 py-10 px-6 bg-gray-800 text-white rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Get Exclusive Promotions</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter to get notified about upcoming deals and discounts</p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md flex-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-3 bg-primary-600 rounded-md font-medium hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

 