import { useState } from 'react';
import ProductCard from './ProductCard';
import ReviewsSection from './ReviewsSection';

const products = [
  {
    id: 1,
    name: 'Radha Locket Mala',
    price: 120,
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463005/public_assets_shop4/public_assets_shop4_one%20%281%29.png'
  },
  {
    id: 2,
    name: 'Antique Turtle Loban Dingali',
    price: 120,
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463048/public_assets_shop4/public_assets_shop4_two.png'
  },
  {
    id: 3,
    name: 'Antique Turtle Loban Dingali',
    price: 120,
    image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463046/public_assets_shop4/public_assets_shop4_thre.png'
  }
];

function HomeThreeScreen() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews');

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Rated Badge */}
        <div className="text-center mb-6">
          <span className="inline-block bg-amber-700/20 text-amber-300 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
            Top • Rated
          </span>
        </div>

        {/* Related Products Section */}
        <div className="mb-16">
          <h2 className="text-white text-3xl font-light text-center mb-12">
            Related Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <ReviewsSection/>
       
      </div>
    </div>
  );
}
export default HomeThreeScreen;