import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import { useShopWishlistOperations } from '../../../../hooks/useShopWishlist';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAmazonTranslate } from '../../../../hooks/useAmazonTranslate';

const SHOP_ID = 3;

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  special_price?: number;
  primary_image: string;
  category_name?: string;
}

interface SimilarProductsProps {
  relatedProducts?: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ relatedProducts = [] }) => {
  const { i18n } = useTranslation();
  const { translateBatch } = useAmazonTranslate();
  const [tNames, setTNames] = useState<Record<number, string>>({});
  // Wishlist functionality
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const {
    toggleProductInWishlist,
    isProductInWishlist,
    isLoading: wishlistLoading
  } = useShopWishlistOperations(SHOP_ID);

  // Handle wishlist click
  const handleWishlistClick = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      navigate('/sign-in');
      return;
    }

    if (user?.role !== 'customer') {
      toast.error('Only customers can manage wishlists');
      return;
    }

    try {
      const wasInWishlist = isProductInWishlist(productId);
      await toggleProductInWishlist(productId);
      
      if (wasInWishlist) {
        toast.success('Removed from wishlist');
      } else {
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  // Translate names/categories for related products (display only)
  useEffect(() => {
    const doTranslate = async () => {
      const lang = i18n.language || 'en';
      if (!relatedProducts?.length || lang.toLowerCase() === 'en') {
        setTNames({});
        return;
      }
      try {
        const items: { id: string; text: string }[] = [];
        relatedProducts.forEach((p) => {
          if (p.product_name) items.push({ id: `n:${p.product_id}`, text: p.product_name });
          if (p.category_name) items.push({ id: `c:${p.product_id}`, text: p.category_name });
        });
  if (items.length === 0) { setTNames({}); return; }
        const res = await translateBatch(items, lang, 'text/plain');
        const nm: Record<number, string> = {};
  relatedProducts.forEach((p) => { nm[p.product_id] = res[`n:${p.product_id}`] || ''; });
        setTNames(nm);
      } catch (e) {
        // fail open
      }
    };
    doTranslate();
  }, [relatedProducts, i18n.language, translateBatch]);

  // Don't render the section if there are no related products
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return `$${price}`;
  };

  return (
    <section className="w-full mx-auto h-full bg-black flex flex-col items-center justify-center py-4 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-[1920px] md:h-[842px] mx-auto flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1820"
          height="4"
          viewBox="0 0 1820 4"
          fill="none"
          className="mb-8 flex-shrink-0 hidden md:block"
        >
          <rect width="1820" height="1" fill="#E0E0E0" />
        </svg>
        <div className="w-full max-w-[1190px] pt-8 md:pt-14 mb-2 mx-auto">
          <h2
            className="text-white text-3xl sm:text-4xl md:text-[56.882px] leading-tight md:leading-[63.992px] font-normal mb-6 md:mb-12 text-left font-bebas "
          >
            THE PERFECT FINISHING TOUCH
          </h2>
        </div>
        <div className="relative w-full flex items-center">
          {/* Cards */}
          <div className="flex gap-4 md:gap-6 w-full justify-start nav2:justify-center overflow-x-auto md:overflow-visible px-1 scrollbar-thin scrollbar-thumb-lime-400 scrollbar-track-black snap-x snap-mandatory">
            {relatedProducts.slice(0, 3).map((product) => (
              <Link 
                key={product.product_id} 
                to={`/shop3-productpage?id=${product.product_id}`}
                className="group flex-shrink-0"
              >
                <div
                  className={`rounded-2xl shadow-lg flex flex-col w-[calc(100vw-2rem)] sm:w-[340px] md:w-[373px] min-w-[calc(100vw-2rem)] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] transition-transform duration-300 hover:scale-105 snap-center`}
                >
                  <div className="relative w-full h-[400px] xs:h-[380px] sm:h-[420px] md:h-[461px] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.primary_image || "/assets/images/Productcard/hero3.jpg"}
                      alt={tNames[product.product_id] || product.product_name}
                      className="w-full h-full object-contain sm:object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Wishlist button */}
                    <button
                      onClick={(e) => handleWishlistClick(e, product.product_id)}
                      disabled={wishlistLoading}
                      className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isProductInWishlist(product.product_id) 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'
                      } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''} shadow-md hover:shadow-lg`}
                      title={isProductInWishlist(product.product_id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {wishlistLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      ) : (
                        <Heart 
                          size={16} 
                          className={isProductInWishlist(product.product_id) ? 'fill-current' : ''} 
                        />
                      )}
                    </button>

                    {/* Special Price Badge */}
                    {product.special_price && product.special_price < product.price && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold bg-lime-400 text-black">
                        -{Math.round(((product.price - product.special_price) / product.price) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="px-0.5 pb-4 flex flex-col flex-1">
                    <div className="text-white text-base sm:text-[16px] font-alexandria font-semibold mb-2 leading-tight">
                      {tNames[product.product_id] || product.product_name}
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      {product.special_price && product.special_price < product.price ? (
                        <>
                          <span className="text-white text-base sm:text-lg font-semibold line-through">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-lime-400 text-base sm:text-lg font-bold">
                            {formatPrice(product.special_price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lime-400 text-base sm:text-lg font-bold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
