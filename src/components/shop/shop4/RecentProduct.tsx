import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import Shop4ProductCardWithWishlist, { Product } from './Shop4ProductCardWithWishlist';
import shop4ApiService, { Product as ApiProduct } from '../../../services/shop4ApiService';

// Convert API product to local Product interface
const mapApiProductToLocal = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.product_id,
  name: apiProduct.product_name,
  price: apiProduct.special_price || apiProduct.price,
  image: apiProduct.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png",
  discount: apiProduct.special_price ? 
    Math.round(((apiProduct.price - apiProduct.special_price) / apiProduct.price) * 100) : 
    undefined
});

function Recentproduct() {
  const [activeTab, setActiveTab] = useState('RITUAL KITS');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  // const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  // Navigation handled inside product card; no local navigate needed here

  // Responsive product display logic
  // Previously used to adjust how many products are visible; no longer needed here

  // Horizontal scroll functionality for mobile
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [mobileScrollLeft, setMobileScrollLeft] = useState(0);

  // const [maxVisibleProducts, setMaxVisibleProducts] = useState(getMaxVisibleProducts());

  // Update maxVisibleProducts on window resize (no-op after removal)
  useEffect(() => {
    const handleResize = () => {
      /* no-op */
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add scroll event listener to update current scroll index and scroll states
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        
  // setScrollPosition(scrollLeft);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < (scrollWidth - containerWidth));
  if (scrollLeft > 0 && showScrollHint) setShowScrollHint(false);
        
  // const newIndex = Math.floor(scrollLeft / containerWidth);
  // setCurrentScrollIndex(newIndex);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial call to set initial states
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [showScrollHint]);



  // Mobile horizontal scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setMobileScrollLeft(scrollContainerRef.current!.scrollLeft);
  if (showScrollHint) setShowScrollHint(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = mobileScrollLeft - walk;
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setMobileScrollLeft(scrollContainerRef.current!.scrollLeft);
  if (showScrollHint) setShowScrollHint(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = mobileScrollLeft - walk;
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await shop4ApiService.getProducts({
          page: 1,
          per_page: 10, // Fetch more than 3 to enable scrolling
          in_stock_only: true
        });
        
        if (response && response.success) {
          const mappedProducts = response.products.map(mapApiProductToLocal);
          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Hide scroll hint if there's no overflow or after a short delay
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if (el.scrollWidth <= el.clientWidth) {
      setShowScrollHint(false);
      return;
    }

    const t = setTimeout(() => setShowScrollHint(false), 4500);
    return () => clearTimeout(t);
  }, [products.length, loading]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = Math.max(0, currentScroll - containerWidth);
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const maxScroll = scrollContainerRef.current.scrollWidth - containerWidth;
      const newScroll = Math.min(maxScroll, currentScroll + containerWidth);
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  // Get visible products based on current screen size
  // const visibleProducts = products.slice(currentScrollIndex, currentScrollIndex + maxVisibleProducts);

  const handleAddToCart = (product: Product, quantity: number, selectedColor: number) => {
    console.log(`Added ${product.name} to cart:`, {
      product,
      quantity,
      selectedColor
    });
    // Here you can integrate with your cart context or API
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Header */}
      <div className="text-center py-12 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8">
        <p className="text-white text-center font-futura text-xs sm:text-sm md:text-[14px] font-normal font-weight-[450] leading-normal tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] lg:tracking-[3.5px] uppercase mb-2 sm:mb-3 md:mb-4">
          RECENT PRODUCTS
        </p>
        <h1 className="text-white font-abeezee text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-normal font-weight-[400] leading-tight sm:leading-snug md:leading-normal lg:leading-[70px] tracking-[2px] sm:tracking-[4px] md:tracking-[6px] lg:tracking-[7.5px] uppercase mb-4 sm:mb-6 md:mb-8 px-4">
          AOIN POOJA STORE
        </h1>
        
        {/* DIYAS, OIL LAMPS, RITUAL KITS Navigation */}
        <div className="flex justify-center mb-20 sm:mb-8 md:mb-10 lg:mb-12 px-4">
          <div className="flex items-center relative w-full max-w-4xl">
            {/* Horizontal line - hidden on mobile, visible on larger screens */}
            <div className="hidden md:block w-full max-w-[1040px] h-[2px] bg-[#D9D9D9] absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Navigation tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-2 sm:gap-4 md:gap-6 lg:gap-8 relative z-10">
              {/* Mobile: Stacked layout */}
              <div className="flex flex-col sm:hidden w-full space-y-2">
                <button
                  onClick={() => setActiveTab('DIYAS')}
                  className={`w-full text-sm font-abeezee font-normal tracking-[1.5px] uppercase text-white py-3 px-4 rounded-[35px] flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'DIYAS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300 border border-gray-600'
                  }`}
                >
                  DIYAS
                </button>
                <button
                  onClick={() => setActiveTab('OIL LAMPS')}
                  className={`w-full text-sm font-abeezee font-normal tracking-[1.5px] uppercase text-white py-3 px-4 rounded-[35px] flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'OIL LAMPS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300 border border-gray-600'
                  }`}
                >
                  OIL LAMPS
                </button>
                <button
                  onClick={() => setActiveTab('RITUAL KITS')}
                  className={`w-full text-sm font-abeezee font-normal tracking-[1.5px] uppercase text-white py-3 px-4 rounded-[35px] flex items-center justify-center transition-all duration-300 ${
                    activeTab === 'RITUAL KITS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300 border border-gray-600'
                  }`}
                >
                  RITUAL KITS
                </button>
              </div>

              {/* Tablet and Desktop: Horizontal layout with vertical lines */}
              <div className="hidden sm:flex items-center relative w-full justify-center">
                {/* Vertical line before DIYAS */}
                <div className="hidden lg:block w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-0" />
                
                {/* DIYAS */}
                <button
                  onClick={() => setActiveTab('DIYAS')}
                  className={`mx-2 sm:mx-4 md:mx-6 lg:mx-16 text-sm sm:text-base md:text-lg lg:text-[20px] font-abeezee font-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[150px] h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                    activeTab === 'DIYAS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  DIYAS
                </button>
                
                {/* Vertical line between DIYAS & OIL LAMPS */}
                <div className="hidden lg:block w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[280px]" />
                
                {/* OIL LAMPS */}
                <button
                  onClick={() => setActiveTab('OIL LAMPS')}
                  className={`mx-2 sm:mx-4 md:mx-6 lg:mx-4 text-sm sm:text-base md:text-lg lg:text-[20px] font-abeezee font-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[320px] h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                    activeTab === 'OIL LAMPS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  OIL LAMPS
                </button>
                
                {/* Vertical line between OIL LAMPS & RITUAL KITS */}
                <div className="hidden lg:block w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[620px]" />
                
                {/* RITUAL KITS */}
                <button
                  onClick={() => setActiveTab('RITUAL KITS')}
                  className={`mx-2 sm:mx-4 md:mx-6 lg:mx-4 text-sm sm:text-base md:text-lg lg:text-[20px] font-abeezee font-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[140px] sm:w-[180px] md:w-[240px] lg:w-[240px] h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                    activeTab === 'RITUAL KITS'
                      ? 'bg-[#BB9D7B] text-white'
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  RITUAL KITS
                </button>
                
                {/* Vertical line after RITUAL KITS */}
                <div className="hidden lg:block w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[890px]" />
              </div>
            </div>
          </div>
        </div>
       
      </div>

      {/* Product Carousel */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1920px] mx-auto pb-20 min-h-[800px]">
        {/* Mobile scroll hint overlay */}
        {showScrollHint && (
          <>
            <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-20 transition-opacity duration-300" />
            <div className="md:hidden pointer-events-none absolute bottom-6 right-6 z-30">
              <div className="bg-white/10 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 animate-pulse">
                <span>Swipe</span>
                <span aria-hidden>→</span>
              </div>
            </div>
          </>
        )}
        {/* Navigation Arrows - Show when there are more products than visible */}
        {products.length > 1 && (
          <>
            <button 
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className={`absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-colors ${
                canScrollLeft 
                  ? 'border-[#BB9D7B] hover:bg-gray-800 cursor-pointer' 
                  : 'border-gray-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            </button>
            <button 
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className={`absolute right-2 sm:right-4 md:right-8 lg:right-16 top-1/3 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-colors ${
                canScrollRight 
                  ? 'border-[#BB9D7B] hover:bg-gray-800 cursor-pointer' 
                  : 'border-gray-600 opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            </button>
          </>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg sm:text-xl">Loading products...</div>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-visible gap-4 sm:gap-6 md:gap-8 lg:gap-16 max-w-[1640px] mx-auto scrollbar-hide min-h-[700px]"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="relative flex flex-col cursor-pointer transition-transform flex-shrink-0 w-full sm:w-[320px] md:w-[400px] lg:w-[380px] h-auto"
              >
                <Shop4ProductCardWithWishlist 
                  product={product}
                  onAddToCart={handleAddToCart}
                  showColorOptions={true}
                  showQuantitySelector={true}
                />
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}

export default Recentproduct;