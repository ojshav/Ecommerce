import { useState } from 'react';
import ProductCard from './ProductCard';
import ReviewsSection from './ReviewsSection';

const products = [
  {
    id: 1,
    name: 'Radha Locket Mala',
    price: 120,
    image: 'https://images.pexels.com/photos/1454190/pexels-photo-1454190.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Antique Turtle Loban Dingali',
    price: 120,
    image: 'https://images.pexels.com/photos/6307834/pexels-photo-6307834.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Antique Turtle Loban Dingali',
    price: 120,
    image: 'https://images.pexels.com/photos/7335267/pexels-photo-7335267.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews');

  return (
    <div className="min-h-screen bg-gray-900">
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

        {/* Tabs Section */}
        <div className="max-w-4xl mx-auto">
          <div className="border-b border-gray-700 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                  activeTab === 'reviews'
                    ? 'border-amber-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                  activeTab === 'questions'
                    ? 'border-amber-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                Questions (1)
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'reviews' && <ReviewsSection />}
            {activeTab === 'questions' && (
              <div className="text-center py-16">
                <h3 className="text-white text-xl mb-4">Questions & Answers</h3>
                <p className="text-gray-400 mb-8">
                  No questions have been asked about this product yet.
                </p>
                <button className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 rounded font-medium tracking-wide transition-colors duration-200 uppercase text-sm">
                  Ask a Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;