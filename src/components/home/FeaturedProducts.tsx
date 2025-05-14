import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProductsData } from '../../data/featuredProductsData';
import ProductCard from '../product/ProductCard';

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

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-sm hover:underline">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              salePercentage={product.originalPrice && product.price < product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;