import React, { useState } from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Ralph Edwards',
    date: 'October 20, 2020',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    tags: ['Purchased by 247 supplier', 'Gold color'],
    content:
      'Absolutely loved the fabric and fit! The dress hugged all the right places without being uncomfortable. Perfect for both casual outings and dressy events — totally worth the price',
  },
  {
    id: 2,
    name: 'Savannah Nguyen',
    date: 'October 15, 2020',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    tags: ['Purchased by 247 supplier', 'Sliver color'],
    content:
      'Absolutely loved the fabric and fit! The dress hugged all the right places without being uncomfortable. Perfect for both casual outings and dressy events — totally worth the price',
  },
];

export default function RatingsReviews() {
  const [selectedRating, setSelectedRating] = useState(5);

  const handleChange = (e) => {
    setSelectedRating(parseInt(e.target.value));
  };

  return (
    <div className="relative w-full max-w-[1280px] mx-auto bg-white px-2 sm:px-4 py-10 sm:py-16 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-[42px] font-bold font-playfair mb-2">Ratings & Reviews (322)</h1>
      <p className="text-[#222121] text-sm sm:text-base font-poppins mt-4 sm:mt-7">Now showing 4 results of 24 items</p>

      {/* Filter Section */}
      <div className="flex justify-end sm:mr-16 md:mr-32 mb-1">
        <div className="flex items-center space-x-2 relative">
          <span className="text-sm sm:text-base font-semibold">Filters by</span>

          {/* Star with rating number */}
          <div className="flex items-center text-sm sm:text-base font-semibold text-yellow-500">
            <Star size={18} fill="currentColor" className="mr-1" />
            {selectedRating}
          </div>

          {/* Hidden native dropdown */}
          <select
            value={selectedRating}
            onChange={handleChange}
            className="absolute right-0 w-8 h-8 opacity-0 z-10 cursor-pointer"
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>

          {/* Custom visible box with dropdown arrow */}
          <div className="w-10 h-8 bg-gray-200 rounded-md flex items-center justify-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.map((review) => (
        <div key={review.id} className="mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center mt-1 gap-2 sm:gap-10">
                <p className="font-semibold font-worksans text-sm sm:text-base">{review.name}</p>
                <div className="flex flex-wrap mt-2 sm:mt-4 gap-2">
                  {review.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#FFF0EB] text-[#FF8154] px-2 py-1 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] sm:text-[12px] font-worksans text-gray-500">{review.date}</p>
            </div>
          </div>

          <div className="flex space-x-1 mt-2 ml-0 sm:ml-16 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>

          <p className="mt-2 w-full sm:w-4/5 md:w-2/3 font-worksans text-[#000000] text-sm sm:text-base">{review.content}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 space-y-2 sm:space-y-0 sm:space-x-4 text-gray-500 text-xs sm:text-sm">
            <button className="flex items-center space-x-1 hover:text-gray-800">
              <span>👍</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-800">
              <span>💬</span>
              <span>Reply</span>
            </button>
          </div>
        </div>
      ))}

      <button className="bg-[#FFB998] text-[#000000] font-semibold px-5 py-2 rounded-full text-xs sm:text-sm hover:bg-orange-200 w-full sm:w-auto">
        See More <span className="ml-2 relative bottom-1">⌄</span>
      </button>
    </div>
  );
}
