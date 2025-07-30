import { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import shop1ApiService, { Product } from '../../../services/shop1ApiService';

const FreshOffRunway = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
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

  // Scroll functionality
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400, // Scroll by approximately one product width
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400, // Scroll by approximately one product width
        behavior: 'smooth'
      });
    }
  };

  // Format price display
  const formatPrice = (product: Product) => {
    if (product.is_on_special_offer && product.special_price) {
      return `$${product.special_price}`;
    }
    return `$${product.selling_price || product.price}`;
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-9xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-gray-600">Loading fresh products...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-9xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" w-full max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-9xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-6xl lg:text-7xl font-semibold font-playfair text-#222222 leading-tight tracking-tight">
              FRESH OFF THE
              <br />
              <span className="italic  text-#222222 font-normal font-playfair">Runway</span>
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
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center"
              onClick={scrollRight}
            >
              <img 
                src={rightArrow}
                alt="Arrow Right"
              />
            </button>
          </div>
        </div>
        
        {/* Scrollable Products Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {products.map((product) => (
            <div key={product.product_id} className="group cursor-pointer flex-shrink-0 min-w-[300px] md:min-w-[400px]">
              <div className="relative overflow-hidden mb-6">
                <Link to={`/shop1/product/${product.product_id}`}>
                  <img
                    src={product.primary_image || product.media?.primary_image || '/assets/images/placeholder.jpg'}
                    alt={product.product_name}
                    className="w-[413px] h-[370px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="absolute bottom-0 right-0">
                  <button className="w-12 h-12 bg-gray-900 text-white rounded-sm flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-wide">
                  {product.product_name.toUpperCase()}
                </h3>
                <p className="text-xl text-gray-600">
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