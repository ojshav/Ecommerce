import React from 'react';
import { Link } from 'react-router-dom';

const PromoProducts: React.FC = () => {
  // Sample promo products
  const promoProducts = [
    {
      id: 1,
      name: "Smart Watch X1",
      price: 249.99,
      originalPrice: 299.99,
      discount: 17,
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Wireless Headset",
      price: 129.99,
      originalPrice: 169.99,
      discount: 24,
      image: "/placeholder.jpg"
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
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white flex">
              {/* Product Info */}
              <div className="w-2/3 p-6">
                <div className="mb-4">
                  <div className="h-1 w-20 bg-black mb-2"></div>
                  <div className="h-1 w-24 bg-black mb-2"></div>
                  <div className="h-1 w-16 bg-black mb-2"></div>
                </div>
                <button className="bg-gray-300 text-sm px-4 py-2 rounded mt-4">
                  Add to Cart
                </button>
              </div>
              
              {/* Product Image */}
              <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-2xl">img</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoProducts; 