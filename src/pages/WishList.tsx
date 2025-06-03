import React, { useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';

const WishList: React.FC = () => {
  const { wishlistItems, loading } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Add items to your wishlist to keep track of products you love</p>
          <button
            onClick={() => navigate('/all-products')}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-base font-medium">My Wishlist</h1>
        <span className="text-gray-500 text-sm">({wishlistItems.length} Items)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <ProductCard
            key={item.wishlist_item_id}
            product={{
              id: String(item.product_id),
              name: item.product.name,
              price: item.product.price,
              originalPrice: undefined,
              image: item.product.image_url,
              primary_image: item.product.image_url,
              sku: '',
              stock: item.product.stock,
              description: '',
              currency: 'INR',
              category: '',
              rating: 0,
              reviews: 0
            }}
            salePercentage={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList; 