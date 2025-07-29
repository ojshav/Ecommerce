import React from 'react';
import { Star } from 'lucide-react';

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

export default StarRating;