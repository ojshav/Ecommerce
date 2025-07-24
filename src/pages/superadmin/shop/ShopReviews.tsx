import React from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

// Dummy shop and review data
type Review = {
  id: number;
  rating: number;
  reviewer: string;
  comment: string;
  date: string;
};

const DUMMY_SHOPS = [
  { shop_id: 1, name: 'Luxe Hub' },
  { shop_id: 2, name: 'Prime Store' },
  { shop_id: 3, name: 'Vault Fashion' },
];

const DUMMY_REVIEWS: Record<string, Review[]> = {
  '1': [], // No reviews for Luxe Hub
  '2': [
    {
      id: 1,
      rating: 5,
      reviewer: 'John Doe',
      comment: 'Great shop!',
      date: '2025-07-10',
    },
    {
      id: 2,
      rating: 4,
      reviewer: 'Jane Smith',
      comment: 'Good selection of products.',
      date: '2025-07-09',
    },
  ],
  '3': [],
};

type RatingStats = { avg: number; count: number; breakdown: number[] };

const getRatingStats = (reviews: Review[]): RatingStats => {
  const total = reviews.length;
  if (total === 0) return { avg: 0, count: 0, breakdown: [0, 0, 0, 0, 0] };
  const breakdown = [0, 0, 0, 0, 0];
  let sum = 0;
  reviews.forEach((r: Review) => {
    breakdown[r.rating - 1]++;
    sum += r.rating;
  });
  return {
    avg: sum / total,
    count: total,
    breakdown,
  };
};

const ShopReviews: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const shop = DUMMY_SHOPS.find(s => String(s.shop_id) === String(shopId));
  const reviews = DUMMY_REVIEWS[shopId || ''] || [];
  const stats = getRatingStats(reviews);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Product Reviews</h1>
          <select className="border rounded px-4 py-2 text-sm">
            <option>All Ratings</option>
            <option>5 Stars</option>
            <option>4 Stars</option>
            <option>3 Stars</option>
            <option>2 Stars</option>
            <option>1 Star</option>
          </select>
        </div>
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="font-semibold text-lg mb-4">Rating Overview</div>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex flex-col items-center w-32">
              <span className="text-4xl font-bold text-orange-500">{stats.avg.toFixed(1)}</span>
              <div className="flex items-center mb-1">
                {[1,2,3,4,5].map((i: number) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i <= Math.round(stats.avg) ? 'text-orange-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-xs text-gray-500">{stats.count} reviews</span>
            </div>
            <div className="flex-1">
              {[5,4,3,2,1].map((star: number) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">{star} <StarIcon className="h-4 w-4 text-orange-500" /></span>
                  <div className="flex-1 bg-gray-100 rounded h-2 mx-2">
                    <div className="bg-orange-400 h-2 rounded" style={{width: stats.count ? `${(stats.breakdown[5-star]/stats.count)*100}%` : '0%'}}></div>
                  </div>
                  <span className="text-xs text-gray-500 w-4 text-right">{stats.breakdown[5-star]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm min-h-[100px]">
          {reviews.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No reviews found</div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r: Review) => (
                <div key={r.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-1">
                    {[1,2,3,4,5].map((i: number) => (
                      <StarIcon key={i} className={`h-4 w-4 ${i <= r.rating ? 'text-orange-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">{r.date}</span>
                  </div>
                  <div className="text-sm text-gray-800 font-medium">{r.reviewer}</div>
                  <div className="text-gray-700 text-sm">{r.comment}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopReviews; 