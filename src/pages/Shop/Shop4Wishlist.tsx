import React, { useEffect } from 'react';
import Shop4ProductCardWithWishlist from '../../components/shop/shop4/Shop4ProductCardWithWishlist';
import { useShopWishlistOperations } from '../../hooks/useShopWishlist';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Loader2, ShoppingBag, ArrowRight } from 'lucide-react';

const SHOP_ID = 4;

const Shop4Wishlist: React.FC = () => {
  const { wishlistItems: shop4WishlistItems, isLoading: loading } = useShopWishlistOperations(SHOP_ID);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


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
          <p className="text-gray-500">Loading your Shop 4 wishlist...</p>
        </div>
      </div>
    );
  }

  if (!shop4WishlistItems.length) {
    return (
      <div className="container mx-auto w-full py-6">
        <div className="flex flex-col max-w-[1440px] items-center justify-center min-h-[60vh] text-center bg-white rounded-lg shadow-sm p-8 mx-auto">
          <div className="bg-orange-50 p-4 rounded-full mb-6">
            <Heart className="w-16 h-16 text-orange-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Your Shop 4 wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Save your favorite Shop 4 products to your wishlist to keep track of items you love and want to purchase later.
          </p>
          <button
            onClick={() => navigate('/shop4')}
            className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 group"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Shop 4 Products
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
            <h1 className="text-2xl font-semibold mb-1">My Shop 4 Wishlist</h1>
            <p className="text-gray-500">{shop4WishlistItems.length} {shop4WishlistItems.length === 1 ? 'Item' : 'Items'}</p>
          </div>
          <button
            onClick={() => navigate('/shop4')}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-2 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shop4WishlistItems.map((item) => (
            <div key={item.wishlist_item_id} className="transform transition-all duration-300 hover:scale-[1.02]">
              <Shop4ProductCardWithWishlist
                product={{
                  id: item.shop_product_id,
                  name: item.product.name,
                  price: item.product.special_price || item.product.price,
                  image: item.product.image_url || '/placeholder-image.jpg',
                  discount: item.product.discount_pct || 0
                }}
                onAddToCart={(product, quantity, color) => {
                  console.log('Add to cart:', product, quantity, color);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop4Wishlist;
