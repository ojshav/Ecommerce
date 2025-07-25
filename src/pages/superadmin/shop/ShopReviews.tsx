import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

// Types
interface Shop {
  shop_id: number;
  name: string;
}
interface Product {
  product_id: number;
  name: string;
}
interface Review {
  id: number;
  rating: number;
  reviewer: string;
  comment: string;
  date: string;
}

// Dummy data for shops, products, and reviews
const DUMMY_SHOPS: Shop[] = [
  { shop_id: 1, name: 'Luxe Hub' },
  { shop_id: 2, name: 'Prime Store' },
  { shop_id: 3, name: 'Vault Fashion' },
  { shop_id: 4, name: 'Shop 4' },
  { shop_id: 5, name: 'Urban Style' },
  { shop_id: 6, name: 'Trendy Lane' },
];

const DUMMY_PRODUCTS: Record<string, Product[]> = {
  '1': [
    { product_id: 101, name: 'Luxe Dress' },
    { product_id: 102, name: 'Luxe Shoes' },
    { product_id: 103, name: 'Luxe Handbag' },
  ],
  '2': [
    { product_id: 201, name: 'Prime Watch' },
    { product_id: 202, name: 'Prime Bag' },
    { product_id: 203, name: 'Prime Sunglasses' },
  ],
  '3': [
    { product_id: 301, name: 'Vault Jacket' },
    { product_id: 302, name: 'Vault Boots' },
    { product_id: 303, name: 'Vault Scarf' },
  ],
  '4': [
    { product_id: 401, name: 'Shop4 Product1' },
    { product_id: 402, name: 'Shop4 Product2' },
    { product_id: 403, name: 'Shop4 Product3' },
  ],
  '5': [
    { product_id: 501, name: 'Urban Tee' },
    { product_id: 502, name: 'Urban Jeans' },
    { product_id: 503, name: 'Urban Sneakers' },
  ],
  '6': [
    { product_id: 601, name: 'Trendy Hat' },
    { product_id: 602, name: 'Trendy Dress' },
    { product_id: 603, name: 'Trendy Sandals' },
  ],
};

const DUMMY_REVIEWS: Record<string, Review[]> = {
  '101': [
    { id: 1, rating: 5, reviewer: 'Alice', comment: 'Amazing dress!', date: '2025-07-10' },
    { id: 2, rating: 4, reviewer: 'Bob', comment: 'Very nice.', date: '2025-07-09' },
    { id: 3, rating: 5, reviewer: 'Priya', comment: 'Loved the fabric and fit.', date: '2025-07-08' },
  ],
  '102': [
    { id: 4, rating: 3, reviewer: 'Carol', comment: 'Okay shoes.', date: '2025-07-08' },
    { id: 5, rating: 2, reviewer: 'David', comment: 'Not comfortable.', date: '2025-07-07' },
  ],
  '103': [
    { id: 6, rating: 4, reviewer: 'Emma', comment: 'Stylish and practical.', date: '2025-07-06' },
    { id: 7, rating: 5, reviewer: 'Frank', comment: 'Perfect for parties!', date: '2025-07-05' },
  ],
  '201': [
    { id: 8, rating: 5, reviewer: 'Dan', comment: 'Love this watch!', date: '2025-07-07' },
    { id: 9, rating: 4, reviewer: 'Eve', comment: 'Good value.', date: '2025-07-06' },
    { id: 10, rating: 3, reviewer: 'Grace', comment: 'Looks good but battery life is short.', date: '2025-07-05' },
  ],
  '202': [
    { id: 11, rating: 4, reviewer: 'Hannah', comment: 'Nice bag, lots of space.', date: '2025-07-04' },
    { id: 12, rating: 2, reviewer: 'Ivan', comment: 'Strap broke quickly.', date: '2025-07-03' },
  ],
  '203': [],
  '301': [
    { id: 13, rating: 2, reviewer: 'Frank', comment: 'Not great.', date: '2025-07-05' },
    { id: 14, rating: 3, reviewer: 'Jill', comment: 'Warm but heavy.', date: '2025-07-04' },
  ],
  '302': [
    { id: 15, rating: 5, reviewer: 'Kevin', comment: 'Best boots ever!', date: '2025-07-03' },
    { id: 16, rating: 4, reviewer: 'Liam', comment: 'Good for hiking.', date: '2025-07-02' },
  ],
  '303': [
    { id: 17, rating: 3, reviewer: 'Mona', comment: 'Soft but color faded.', date: '2025-07-01' },
  ],
  '401': [
    { id: 18, rating: 4, reviewer: 'Nina', comment: 'Nice quality.', date: '2025-06-30' },
    { id: 19, rating: 5, reviewer: 'Oscar', comment: 'Exceeded expectations.', date: '2025-06-29' },
  ],
  '402': [],
  '403': [
    { id: 20, rating: 2, reviewer: 'Paul', comment: 'Not as described.', date: '2025-06-28' },
  ],
  '501': [
    { id: 21, rating: 5, reviewer: 'Quinn', comment: 'Super comfy tee!', date: '2025-06-27' },
    { id: 22, rating: 4, reviewer: 'Rita', comment: 'Good for summer.', date: '2025-06-26' },
  ],
  '502': [
    { id: 23, rating: 3, reviewer: 'Sam', comment: 'Average jeans.', date: '2025-06-25' },
    { id: 24, rating: 1, reviewer: 'Tina', comment: 'Did not fit well.', date: '2025-06-24' },
  ],
  '503': [
    { id: 25, rating: 5, reviewer: 'Uma', comment: 'Great sneakers for running.', date: '2025-06-23' },
    { id: 26, rating: 4, reviewer: 'Vik', comment: 'Stylish and light.', date: '2025-06-22' },
    { id: 27, rating: 5, reviewer: 'Will', comment: 'My favorite shoes!', date: '2025-06-21' },
  ],
  '601': [
    { id: 28, rating: 3, reviewer: 'Xena', comment: 'Looks cool.', date: '2025-06-20' },
    { id: 29, rating: 2, reviewer: 'Yash', comment: 'Material feels cheap.', date: '2025-06-19' },
  ],
  '602': [
    { id: 30, rating: 5, reviewer: 'Zara', comment: 'Beautiful dress!', date: '2025-06-18' },
    { id: 31, rating: 4, reviewer: 'Amit', comment: 'Nice color and fit.', date: '2025-06-17' },
  ],
  '603': [],
};

function getShopAverageRating(shopId: string | number): number {
  const products: Product[] = DUMMY_PRODUCTS[String(shopId)] || [];
  let total = 0;
  let count = 0;
  products.forEach((p: Product) => {
    const reviews: Review[] = DUMMY_REVIEWS[String(p.product_id)] || [];
    reviews.forEach((r: Review) => {
      total += r.rating;
      count++;
    });
  });
  return count === 0 ? 0 : total / count;
}

function getProductAverageRating(productId: string | number): number {
  const reviews: Review[] = DUMMY_REVIEWS[String(productId)] || [];
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

const ShopReviewOverview: React.FC = () => {
  // Navigation state
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Filter state
  const [productRatingFilter, setProductRatingFilter] = useState<number | 'all'>('all');
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'all'>('all');

  // --- Shop List View ---
  if (!selectedShop) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Shop Reviews Overview</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DUMMY_SHOPS.map((shop: Shop) => {
              const avg = getShopAverageRating(shop.shop_id);
              return (
                <div
                  key={shop.shop_id}
                  className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition"
                  onClick={() => {
                    setSelectedShop(shop);
                    setProductRatingFilter('all');
                  }}
                >
                  <div className="text-lg font-bold mb-2">{shop.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-orange-500 font-bold">{avg.toFixed(1)}</span>
                    <div className="flex items-center">
                      {[1,2,3,4,5].map((i: number) => (
                        <StarIcon key={i} className={`h-5 w-5 ${i <= Math.round(avg) ? 'text-orange-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Product Table View ---
  if (selectedShop && !selectedProduct) {
    const products = DUMMY_PRODUCTS[String(selectedShop.shop_id)] || [];
    // Filter products by average rating
    const filteredProducts = productRatingFilter === 'all'
      ? products
      : products.filter(p => Math.round(getProductAverageRating(p.product_id)) === productRatingFilter);
    return (
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            className="mb-4 text-orange-600 hover:underline"
            onClick={() => setSelectedShop(null)}
          >
            ← Back to Shops
          </button>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Products in {selectedShop.name}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <label className="font-medium">Filter by Avg Rating:</label>
            <select
              className="border rounded px-2 py-1"
              value={productRatingFilter}
              onChange={e => setProductRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            >
              <option value="all">All</option>
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} Stars</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 && (
                  <tr><td colSpan={3} className="text-center py-6 text-gray-400">No products found.</td></tr>
                )}
                {filteredProducts.map(product => {
                  const avg = getProductAverageRating(product.product_id);
                  return (
                    <tr key={product.product_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap font-semibold">{product.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap flex items-center gap-2">
                        <span className="text-lg text-orange-500 font-bold">{avg.toFixed(1)}</span>
                        <div className="flex items-center">
                          {[1,2,3,4,5].map(i => (
                            <StarIcon key={i} className={`h-4 w-4 ${i <= Math.round(avg) ? 'text-orange-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          className="text-orange-600 hover:underline"
                          onClick={() => {
                            setSelectedProduct(product);
                            setReviewRatingFilter('all');
                          }}
                        >
                          View Reviews
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- Review Table View ---
  if (selectedShop && selectedProduct) {
    const reviews = DUMMY_REVIEWS[String(selectedProduct.product_id)] || [];
    const filteredReviews = reviewRatingFilter === 'all'
      ? reviews
      : reviews.filter(r => r.rating === reviewRatingFilter);
    return (
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <button
            className="mb-4 text-orange-600 hover:underline"
            onClick={() => setSelectedProduct(null)}
          >
            ← Back to Products
          </button>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Reviews for {selectedProduct.name} (in {selectedShop.name})
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <label className="font-medium">Filter by Rating:</label>
            <select
              className="border rounded px-2 py-1"
              value={reviewRatingFilter}
              onChange={e => setReviewRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            >
              <option value="all">All</option>
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} Stars</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReviews.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-6 text-gray-400">No reviews found.</td></tr>
                )}
                {filteredReviews.map(review => (
                  <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap font-semibold">{review.reviewer}</td>
                    <td className="px-4 py-4 whitespace-nowrap flex items-center gap-2">
                      <span className="text-lg text-orange-500 font-bold">{review.rating}</span>
                      <div className="flex items-center">
                        {[1,2,3,4,5].map(i => (
                          <StarIcon key={i} className={`h-4 w-4 ${i <= review.rating ? 'text-orange-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{review.comment}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{review.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ShopReviewOverview; 