import { useState, useEffect, useRef } from 'react';

import { ShoppingBag, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useShopWishlistOperations } from '../../../hooks/useShopWishlist';
import { useShopCartOperations } from '../../../context/ShopCartContext';
import { toast } from 'react-hot-toast';
import shop1ApiService, { Product } from '../../../services/shop1ApiService';
import { useTranslation } from 'react-i18next';
import { useAmazonTranslate } from '../../../hooks/useAmazonTranslate';

const SHOP_ID = 1;

const FreshOffRunway = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<Record<number, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const { translateBatch } = useAmazonTranslate();
  const [nameMap, setNameMap] = useState<Record<number, string>>({});
  
  // Wishlist functionality
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const {
    toggleProductInWishlist,
    isProductInWishlist,
    isLoading: wishlistLoading
  } = useShopWishlistOperations(SHOP_ID);

  // Cart functionality
  const { addToShopCart, canPerformShopCartOperations } = useShopCartOperations();

  // Handle cart click
  const handleCartClick = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to add items to cart');
      navigate('/sign-in');
      return;
    }

    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await addToShopCart(SHOP_ID, productId, 1);
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

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
  
  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products with a limit for fresh items
        const response = await shop1ApiService.getProducts({
          page: 1,
          per_page: 6, // Get more than 3 to enable scrolling
          sort_by: 'created_at',
          order: 'desc' // Get newest products for "fresh off runway"
        });
        
        if (response?.products) {
          setProducts(response.products);
        } else {
          setError('No products found');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Translate product names display-only
  useEffect(() => {
    const lang = (i18n.language || 'en').split('-')[0];
    if (lang === 'en' || products.length === 0) {
      setNameMap({});
      return;
    }
    const run = async () => {
      try {
        const items = products
          .filter(p => p.product_name)
          .map(p => ({ id: String(p.product_id), text: p.product_name }));
        if (items.length === 0) return;
        const res = await translateBatch(items, lang, 'text/plain');
        const m: Record<number, string> = {};
        for (const p of products) {
          const t = res[String(p.product_id)];
          if (t) m[p.product_id] = t;
        }
        setNameMap(m);
      } catch {
        setNameMap({});
      }
    };
    run();
  }, [products, i18n.language, translateBatch]);

  // Scroll functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Format price display
  const formatPrice = (product: Product) => {
    if (product.is_on_special_offer && product.special_price) {
      return `₹${product.special_price}`;
    }
    return `₹${product.selling_price || product.price}`;
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-center py-8 xs:py-10 sm:py-12">
            <div className="text-base xs:text-lg sm:text-xl text-gray-600">Loading fresh products...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-center py-8 xs:py-10 sm:py-12">
            <div className="text-base xs:text-lg sm:text-xl text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-18 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-row lg:flex-row lg:items-start justify-between mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14">
          <div className="mb-0 lg:mb-0">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-semibold font-playfair text-[#222222] leading-tight tracking-tight">
              FRESH OFF THE
              <br />
              <span className="italic text-[#222222] font-normal font-playfair text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">Runway</span>
            </h2>
          </div>
          <div className="flex space-x-3 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group rounded-full flex items-center justify-center"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              onClick={scrollLeft}
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-7 h-7 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 object-contain"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center"
              onClick={scrollRight}
            >
              <img 
                src={rightArrow}
                alt="Arrow Right"
                className="w-8 h-8 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 object-contain"
              />
            </button>
          </div>
        </div>
        
        {/* Scrollable Products Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto pb-4 xs:pb-6 sm:pb-8"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {products.map((product) => (
            <div key={product.product_id} className="group cursor-pointer flex-shrink-0 w-full sm:w-[320px] md:w-[300px] lg:w-[350px] xl:w-[380px]">
              <div className="relative overflow-hidden mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                <Link to={`/shop1/product/${product.product_id}`}>
                  <img
                    src={product.primary_image || product.media?.primary_image || '/assets/images/placeholder.jpg'}
                    alt={nameMap[product.product_id] || product.product_name}
                    className="w-full h-[300px] xs:h-[350px] sm:h-[290px] md:h-[300px] lg:h-[350px] xl:h-[370px] object-contain  group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Wishlist button - positioned at top right */}
                <button
                  onClick={(e) => handleWishlistClick(e, product.product_id)}
                  disabled={wishlistLoading}
                  className={`absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-10 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isProductInWishlist(product.product_id) 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'
                  } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={isProductInWishlist(product.product_id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlistLoading ? (
                    <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 border-b-2 border-current"></div>
                  ) : (
                    <Heart 
                      size={window.innerWidth < 640 ? 12 : window.innerWidth < 768 ? 16 : 20} 
                      className={isProductInWishlist(product.product_id) ? 'fill-current' : ''} 
                    />
                  )}
                </button>

                <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4">
                  <button 
                    onClick={(e) => handleCartClick(e, product.product_id)}
                    disabled={addingToCart[product.product_id]}
                    className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingToCart[product.product_id] ? (
                      <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    ) : (
                      <ShoppingBag className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-medium text-gray-900 mb-1 xs:mb-2 tracking-wide leading-tight">
                  {(nameMap[product.product_id] || product.product_name).toUpperCase()}
                </h3>
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600">
                  {formatPrice(product)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshOffRunway;