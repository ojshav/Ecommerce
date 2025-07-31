import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

// --- StarRating ---
interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', showNumber = false }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center gap-1">
       {showNumber && (
        <span className="text-white text-lg font-semibold ml-2">{rating}</span>
      )}
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-[#CCE208] fill-yellow-400' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

// --- ProductCard ---
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square mb-4 transition-transform duration-300 group-hover:scale-105">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>
      <h3 className="text-white text-lg font-medium text-center mb-2 group-hover:text-gray-300 transition-colors">
        {product.name}
      </h3>
      <p className="text-white text-xl font-semibold text-center">
        ${product.price}
      </p>
    </div>
  );
};


// --- ReviewCard ---
interface Review {
  id: number;
  userName: string;
  userInfo: string;
  rating: number;
  comment: string;
  helpful: number;
  notHelpful: number;
  timeAgo: string;
  initials: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [voted, setVoted] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleVote = (type: 'helpful' | 'not-helpful') => {
    if (voted) return; // Prevent multiple votes
    
    if (type === 'helpful') {
      setHelpfulCount(prev => prev + 1);
    } else {
      setNotHelpfulCount(prev => prev + 1);
    }
    setVoted(type);
  };

  return (
    <div className="border-b border-gray-700 pb-6 mb-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {review.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <h4 className="text-white font-medium">{review.userName}</h4>
              <p className="text-gray-400 text-sm">{review.userInfo}</p>
            </div>
            <span className="text-gray-400 text-sm mt-1 sm:mt-0">{review.timeAgo}</span>
          </div>
          
          <div className="mb-3">
            <StarRating rating={review.rating} size="sm" />
          </div>
          
          <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">Was this helpful?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('helpful')}
                disabled={voted !== null}
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                  voted === 'helpful' 
                    ? 'text-green-400 bg-green-400/10' 
                    : voted
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{helpfulCount}</span>
              </button>
              
              <button
                onClick={() => handleVote('not-helpful')}
                disabled={voted !== null}
                className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors ${
                  voted === 'not-helpful' 
                    ? 'text-red-400 bg-red-400/10' 
                    : voted
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                }`}
              >
                <ThumbsDown className="w-3 h-3" />
                <span>{notHelpfulCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ReviewsSection ---
const reviewsData: Review[] = [
    {
      id: 1,
      userName: 'Sabrina P',
      userInfo: 'Verified Buyer • Germany',
      rating: 5,
      comment: 'Awesome Product, The Products is Excellent',
      helpful: 1,
      notHelpful: 0,
      timeAgo: '8 months ago',
      initials: 'SP'
    }
  ];

const ReviewsSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('reviews');
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [newReview, setNewReview] = useState({
      rating: 5,
      comment: ''
    });
    const averageRating = 4.9;
    const totalReviews = reviewsData.length;

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle review submission logic here
        console.log('Submitting review:', newReview);
        setShowWriteReview(false);
        setNewReview({ rating: 5, comment: '' });
    };

    return (
        <div className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="border-b border-gray-700 mb-8">
                    <nav className="flex space-x-0">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 px-6 border-b-2 font-medium text-base transition-colors duration-200 ${activeTab === 'reviews' ? 'border-white text-white bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`py-4 px-6 border-b-2 font-medium text-base transition-colors duration-200 ${activeTab === 'questions' ? 'border-white text-white bg-gray-900' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
                        >
                            Questions (1)
                        </button>
                    </nav>
                </div>

                <div className="min-h-[500px]">
                    {activeTab === 'reviews' && (
                        <div>
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center mb-2">
                                    <StarRating rating={averageRating} size="lg" />
                                    <span className="text-4xl sm:text-5xl font-bold text-white">{averageRating}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-6">
                                    Based On {totalReviews} Review{totalReviews !== 1 ? 's' : ''}, Rating Is Calculated
                                </p>
                                <button 
                                    onClick={() => setShowWriteReview(!showWriteReview)}
                                    className="bg-[#C4A57B] hover:bg-[#B8965F] text-white px-8 py-3 rounded font-medium transition-colors duration-200 uppercase text-sm tracking-wide">
                                    WRITE A REVIEW
                                </button>
                            </div>
                            
                            {showWriteReview && (
                                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                                <h3 className="text-white text-lg font-medium mb-4">Write Your Review</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                            className="p-1"
                                        >
                                            <StarRating rating={star <= newReview.rating ? 5 : 0} size="lg" />
                                        </button>
                                        ))}
                                    </div>
                                    </div>
                                    <div>
                                    <label className="block text-gray-300 text-sm mb-2">Your Review</label>
                                    <textarea
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                        className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-amber-500 focus:outline-none resize-vertical min-h-[120px]"
                                        placeholder="Share your thoughts about this product..."
                                        required
                                    />
                                    </div>
                                    
                                    <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowWriteReview(false)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                </form>
                                </div>
                            )}

                            <div className="space-y-6">
                                {reviewsData.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'questions' && (
                        <div className="text-center py-16">
                            <h3 className="text-white text-xl mb-4">Questions & Answers</h3>
                            <p className="text-gray-400 mb-8">
                                No questions have been asked about this product yet.
                            </p>
                            <button className="bg-[#C4A57B] hover:bg-[#B8965F] text-white px-8 py-3 rounded font-medium tracking-wide transition-colors duration-200 uppercase text-sm">
                                Ask a Question
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Combined Component ---
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

const CombinedProductPageComponent = () => {
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

export default CombinedProductPageComponent;
