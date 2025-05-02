import React from 'react';

const WishList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Your wishlist is currently empty.</p>
        <p className="mt-4">Add items to your wishlist by clicking the heart icon on product pages.</p>
      </div>
    </div>
  );
};

export default WishList; 