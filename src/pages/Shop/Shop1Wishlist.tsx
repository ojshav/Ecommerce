import React, { useEffect } from 'react';
import Shop1ProductCard from '../../components/shop/shop1/Shop1ProductCard';
import { useShopWishlist } from '../../context/ShopWishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2, ShoppingBag, ArrowRight } from 'lucide-react';

const SHOP_ID = 1;

const Shop1Wishlist: React.FC = () => {
  const { wishlistItemsByShop, loadingByShop } = useShopWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shop1WishlistItems = wishlistItemsByShop[SHOP_ID] || [];
  const loading = loadingByShop[SHOP_ID] || false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
          <p className="text-gray-500">Loading your Shop 1 wishlist...</p>
        </div>
      </div>
    );
  }

  if (!shop1WishlistItems.length) {
    return (
      <div className="container mx-auto w-full py-6">
        <div className="flex flex-col max-w-[1440px] items-center justify-center min-h-[60vh] text-center bg-white rounded-lg shadow-sm p-8 mx-auto">
          <div className="bg-orange-50 p-4 rounded-full mb-6">
            <Heart className="w-16 h-16 text-orange-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Your Shop 1 wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Save your favorite Shop 1 products to your wishlist to keep track of items you love and want to purchase later.
          </p>
          <button
            onClick={() => navigate('/shop1')}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 group"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Shop 1 Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto px-4 py-6">
      <div className="bg-white max-w-[1440px] rounded-lg shadow-sm p-6 mb-8 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">My Shop 1 Wishlist</h1>
            <p className="text-gray-500">{shop1WishlistItems.length} {shop1WishlistItems.length === 1 ? 'Item' : 'Items'}</p>
          </div>
          <button
            onClick={() => navigate('/shop1')}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-2 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shop1WishlistItems.map((item) => (
            <div key={item.wishlist_item_id} className="transform transition-all duration-300 hover:scale-[1.02]">
              <Shop1ProductCard
                id={item.shop_product_id}
                image={item.product.image_url || '/placeholder-image.jpg'}
                category="Fashion"
                name={item.product.name}
                price={item.product.special_price || item.product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop1Wishlist;
