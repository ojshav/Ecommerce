import React from 'react';
import { Link } from 'react-router-dom';

const PromoProducts: React.FC = () => {
  // Updated promo products with real images and diverse products
  const promoProducts = [
    {
      id: 1,
      name: "Apple MacBook Pro M2",
      price: 1799.99,
      originalPrice: 1999.99,
      discount: 10,
      description: "Latest model with 16GB RAM and 512GB SSD",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80"
    },
    {
      id: 2,
      name: "Bose QuietComfort Earbuds",
      price: 199.99,
      originalPrice: 279.99,
      discount: 29,
      description: "Noise cancelling wireless earbuds",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Promo Products</h2>
          <Link to="/promotions" className="text-sm text-gray-600 hover:text-primary-600">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promoProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white flex shadow-sm hover:shadow-md transition-shadow">
              {/* Product Info */}
              <div className="w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded mb-2">
                    {product.discount}% OFF
                  </span>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-900 font-bold text-lg">${product.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block mb-2">Category: {product.category}</span>
                  <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Product Image */}
              <div className="w-1/2 bg-gray-50">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "250px" }}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoProducts; 