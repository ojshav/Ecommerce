import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

const ReviewsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sabina F.",
      location: "Germany",
      rating: 5,
      date: "8 months ago",
      title: "Awesome Product. The Products is Excellent",
      content: "Awesome Product. The Products is Excellent",
      verified: true,
      helpful: 1,
      notHelpful: 0,
      avatar: "SF"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-0">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 border-b-2 font-medium text-base transition-colors duration-200 ${
                activeTab === 'reviews'
                  ? 'border-white text-white bg-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 px-6 border-b-2 font-medium text-base transition-colors duration-200 ${
                activeTab === 'questions'
                  ? 'border-white text-white bg-gray-900'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Questions (1)
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'reviews' && (
            <div>
              {/* Rating Summary */}
              <div className="text-center mb-12">
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-white">4.9</span>
                  <div className="flex justify-center mt-2">
                    {renderStars(5)}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Based On 1 Review, Rating Is Calculated
                </p>
                <button className="bg-[#C4A57B] hover:bg-[#B8965F] text-white px-8 py-3 rounded font-medium transition-colors duration-200 uppercase text-sm tracking-wide">
                  WRITE A REVIEW
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-800 pb-8 last:border-b-0">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Avatar and User Info */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {review.avatar}
                        </div>
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium">{review.name}</h4>
                              {review.verified && (
                                <span className="text-xs text-green-500">Verified Buyer</span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{review.location}</p>
                            <div className="flex items-center gap-2 mt-2">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm mt-2 sm:mt-0">{review.date}</span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-white leading-relaxed">{review.content}</p>
                        </div>
                        
                        {/* Helpful Section */}
                        <div className="flex items-center gap-4">
                          <span className="text-gray-400 text-sm">Was this helpful?</span>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors">
                              <ThumbsUp size={16} />
                              <span className="text-sm">{review.helpful}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                              <ThumbsDown size={16} />
                              <span className="text-sm">{review.notHelpful}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default ReviewsSection;