import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import shop2ApiService, { Product } from '../../../../services/shop2ApiService';
import { useShopCartOperations } from '../../../../context/ShopCartContext';

interface SimilarProductsProps {
  currentProductId?: number;
  relatedProducts?: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ 
  currentProductId, 
  relatedProducts 
}) => {
  const navigate = useNavigate();
  const { addToShopCart, canPerformShopCartOperations } = useShopCartOperations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [addingToCart, setAddingToCart] = useState<Set<number>>(new Set());
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  const SHOP_ID = 2; // Shop2 ID

  // Fetch similar products if not provided via props
  useEffect(() => {
    if (relatedProducts && relatedProducts.length > 0) {
      setProducts(relatedProducts.slice(0, 4)); // Limit to 4 products
    } else if (currentProductId) {
      fetchSimilarProducts();
    }
  }, [currentProductId, relatedProducts]);

  const fetchSimilarProducts = async () => {
    if (!currentProductId) return;
    
    setLoading(true);
    try {
      // Try to get the current product details which includes related products
      const productResponse = await shop2ApiService.getProductById(currentProductId);
      
      if (productResponse?.related_products && productResponse.related_products.length > 0) {
        setProducts(productResponse.related_products.slice(0, 4));
      } else {
        // Fallback: Get products from the same category or recent products
        const currentProduct = productResponse?.product;
        if (currentProduct?.category_id) {
          const categoryProducts = await shop2ApiService.getProductsByCategory(
            currentProduct.category_id,
            { per_page: 5 }
          );
          
          // Filter out the current product and limit to 4
          const filteredProducts = categoryProducts.products
            .filter((p: Product) => p.product_id !== currentProductId)
            .slice(0, 4);
          
          setProducts(filteredProducts);
        } else {
          // Final fallback: Get featured products
          const featuredProducts = await shop2ApiService.getFeaturedProducts(4);
          const filteredProducts = featuredProducts.filter((p: Product) => p.product_id !== currentProductId);
          setProducts(filteredProducts);
        }
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
      // Fallback to featured products on error
      try {
        const featuredProducts = await shop2ApiService.getFeaturedProducts(4);
        setProducts(featuredProducts.filter((p: Product) => p.product_id !== currentProductId));
      } catch (fallbackError) {
        console.error('Error fetching fallback products:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/shop2/product/${productId}`);
  };

  const toggleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  // Initialize quantity for a product
  const getQuantity = (productId: number) => {
    return quantities[productId] || 1;
  };

  // Handle quantity change
  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + change);
      return { ...prev, [productId]: newQty };
    });
  };

  // Handle add to cart
  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to add items to cart');
      navigate('/sign-in');
      return;
    }

    const productId = product.product_id;
    const quantity = getQuantity(productId);

    try {
      setAddingToCart(prev => new Set(prev).add(productId));
      await addToShopCart(SHOP_ID, productId, quantity);
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // Handle buy now
  const handleBuyNow = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!canPerformShopCartOperations()) {
      toast.error('Please sign in to purchase items');
      navigate('/sign-in');
      return;
    }

    const productId = product.product_id;
    const quantity = getQuantity(productId);

    try {
      setAddingToCart(prev => new Set(prev).add(productId));
      await addToShopCart(SHOP_ID, productId, quantity);
      toast.success('Added to cart successfully!');
      // Navigate to cart page
      navigate('/shop2/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 text-black">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[47px] font-normal font-bebas mb-4 sm:mb-6 lg:mb-12">SIMILAR PRODUCTS</h2>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't render if no similar products
  }
  return (
    <section className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16 text-black">
      <h2 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[47px] font-normal font-bebas mb-4 sm:mb-6 lg:mb-12">SIMILAR PRODUCT</h2>

      <div className="flex overflow-x-auto xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-7 pb-4 sm:pb-0 scrollbar-hide snap-x snap-mandatory">
        {products.map((product, idx) => (
          <div 
            key={product.product_id} 
            className="relative rounded-xl overflow-hidden cursor-pointer group flex-shrink-0 w-full sm:w-auto snap-start"
            onClick={() => handleProductClick(product.product_id)}
          >
            <div className="relative">
              <img
                src={product.primary_image || '/assets/shop2/ProductPage/pd1.svg'}
                alt={product.product_name}
                className="w-full h-[400px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover rounded-xl  transition-transform duration-200"
              />
              <div 
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-lg sm:text-xl z-10 cursor-pointer"
                onClick={(e) => toggleLike(product.product_id, e)}
              >
                {likedProducts.has(product.product_id) ? (
                  <span className="text-red-600">❤️</span>
                ) : (
                  <span className="text-white hover:text-red-300 transition-colors">🤍</span>
                )}
              </div>
              

              
              {/* Action buttons - show on hover */}
              <div className="absolute bottom-0 font-bebas left-0 w-full flex flex-col sm:flex-row justify-between items-center px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className={`px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto transition-colors ${
                    addingToCart.has(product.product_id)
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={addingToCart.has(product.product_id)}
                >
                  {addingToCart.has(product.product_id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent mx-auto" />
                  ) : (
                    'ADD TO CART'
                  )}
                </button>
                <button 
                  className={`border-2 border-white text-white px-5 sm:px-4 lg:px-10 xl:px-10 py-1.5 sm:py-2 lg:py-3 rounded-full text-xs sm:text-sm font-semibold w-full sm:w-auto transition-colors ${
                    addingToCart.has(product.product_id)
                      ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-white hover:text-black'
                  }`}
                  onClick={(e) => handleBuyNow(product, e)}
                  disabled={addingToCart.has(product.product_id)}
                >
                  {addingToCart.has(product.product_id) ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-current border-t-transparent mx-auto" />
                  ) : (
                    'BUY NOW'
                  )}
                </button>
              </div>
              
              {/* Sale badge for special offers */}
              {product.is_on_special_offer && product.special_price && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                  SALE
                </div>
              )}
            </div>

            <div className="pb-3 sm:pb-4 font-bebas mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs sm:text-sm lg:text-base xl:text-[17px] text-[#8E8F94] font-normal uppercase">
                {product.category_name || 'PRODUCT'}
              </p>
              <div className="flex justify-between items-center">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal uppercase truncate">
                  {product.product_name}
                </h3>
                <div className="flex flex-col items-end">
                  {product.is_on_special_offer && product.special_price ? (
                    <>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal text-red-600">
                        ₹{product.special_price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        ₹{product.selling_price.toLocaleString('en-IN')}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[31px] font-normal">
                      ₹{product.selling_price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
              
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
