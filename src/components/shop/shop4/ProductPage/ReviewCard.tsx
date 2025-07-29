import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import StarRating from './StartRating';

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

export default ReviewCard;