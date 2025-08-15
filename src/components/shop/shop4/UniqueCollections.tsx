import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import shop4ApiService, { Category } from '../../../services/shop4ApiService';

// Fallback images for categories - mapping by category name
const categoryImageMap: Record<string, string> = {
  'SHANKH COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463010/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%282%29.png",
  'DOOP COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463012/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%283%29.png",
  'ALL COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png",
  'PUJA DIYA COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463016/public_assets_shop4/public_assets_shop4_Property%201%3DDefault.png",
  'HAVAN COLLECTIONS': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463015/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%284%29.png",
  // Keep old mappings for backward compatibility
  'SHANKH': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463010/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%282%29.png",
  'DOOP': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463012/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%283%29.png",
  'ALL': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png",
  'PUJA DIYA': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463016/public_assets_shop4/public_assets_shop4_Property%201%3DDefault.png",
  'HAVAN': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463015/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%284%29.png",
  'DEFAULT': "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463009/public_assets_shop4/public_assets_shop4_Property%201%3DDefault%20%281%29.png"
};

function UniqueCollections() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        console.log('Fetching categories for Shop4...');
        const response = await shop4ApiService.getCategories({ per_page: 10, active_only: true });
        console.log('Full API response:', response);
        
        if (response && response.success) {
          console.log('Categories received:', response.categories);
          console.log('Number of categories:', response.categories.length);
          
          // Filter out categories with invalid names
          const validCategories = response.categories.filter(cat => {
            const isValid = cat && cat.category_name;
            if (!isValid) {
              console.warn('Invalid category found:', cat);
            }
            return isValid;
          });
          
          console.log('Valid categories after filtering:', validCategories);
          setCategories(validCategories);
        } else {
          console.error('API response unsuccessful or empty:', response);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Mobile scroll hint: hide on first interaction/scroll or after delay
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Hide hint if no overflow
    if (el.scrollWidth <= el.clientWidth) {
      setShowScrollHint(false);
      return;
    }

    const hide = () => setShowScrollHint(false);
    el.addEventListener('scroll', hide, { passive: true });
    el.addEventListener('touchstart', hide, { passive: true });
    el.addEventListener('mousedown', hide);

    const t = setTimeout(() => setShowScrollHint(false), 4500);
    return () => {
      el.removeEventListener('scroll', hide as any);
      el.removeEventListener('touchstart', hide as any);
      el.removeEventListener('mousedown', hide as any);
      clearTimeout(t);
    };
  }, [categories.length, loading]);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/shop4-allproductpage?category_id=${categoryId}`);
  };

  const getCategoryImage = (categoryName: string, categoryImage?: string): string => {
    // Use category image from backend if available
    if (categoryImage) {
      return categoryImage.startsWith('http') ? categoryImage : shop4ApiService.getImageUrl(categoryImage);
    }
    
    // Fallback to predefined images based on category name
    if (!categoryName) {
      return categoryImageMap['DEFAULT'];
    }
    
    const upperCaseName = categoryName.toUpperCase();
    
    // Try exact match first
    if (categoryImageMap[upperCaseName]) {
      return categoryImageMap[upperCaseName];
    }
    
    // Try partial matches for backward compatibility
    for (const [key, value] of Object.entries(categoryImageMap)) {
      if (upperCaseName.includes(key) || key.includes(upperCaseName)) {
        return value;
      }
    }
    
    return categoryImageMap['DEFAULT'];
  };

  // Take first 5 categories for display, with special handling for middle item
  const displayCategories = categories.slice(0, 5);
  
  return (
         <div className="h-auto bg-black text-white pb-10 sm:pb-20 md:pb-24 lg:pb-32 py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Main Content */}
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1640px]">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm md:text-[14px] font-light font-['Futura_PT'] tracking-[0.2em] text-white mb-4 sm:mb-6 md:mb-8">
            UNIQUE COLLECTIONS
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-poppins font-light tracking-wide mb-4 sm:mb-6 md:mb-8 px-4">
            Luxury Brands New Arrival
          </h1>
        </div>

        {/* Collections Section */}
        {loading ? (
          <div className="flex justify-center items-center h-40 sm:h-48 md:h-56">
            <div className="text-white text-lg sm:text-xl">Loading collections...</div>
          </div>
        ) : displayCategories.length === 0 ? (
          <div className="flex justify-center items-center h-40 sm:h-48 md:h-56">
            <div className="text-white text-lg sm:text-xl">No collections available</div>
          </div>
        ) : (
          <div className="relative max-w-full mx-auto">
            {/* Horizontal connecting line - hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-amber-200 transform -translate-y-1/2 z-0"></div>
            
            {/* Left endpoint circle - hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-2 h-2 bg-amber-200 rounded-full transform -translate-x-1 -translate-y-1/2 z-0"></div>
            
            {/* Right endpoint circle - hidden on mobile, visible on larger screens */}
            <div className="hidden lg:block absolute top-1/2 right-0 w-2 h-2 bg-amber-200 rounded-full transform translate-x-1 -translate-y-1/2 z-0"></div>
            
            {/* Mobile scroll hint overlays */}
            {/* Right gradient and "Swipe" pill only on mobile and only while hint is visible */}
            {showScrollHint && (
              <>
                <div className="md:hidden pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-20 transition-opacity duration-300" />
                <div className="md:hidden pointer-events-none absolute bottom-2 right-3 z-30">
                  <div className="bg-white/10 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1 animate-pulse">
                    <span>Swipe</span>
                    <span aria-hidden>→</span>
                  </div>
                </div>
              </>
            )}

            {/* Collections Container - Responsive Grid */}
            <div ref={scrollContainerRef} className="flex flex-row overflow-x-auto gap-4 sm:gap-6 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-4 xl:gap-8 relative z-10 items-center pt-4 sm:pt-6 md:pt-10 pb-4 md:pb-0">
              {displayCategories.map((category, index) => (
                <div 
                  key={category.category_id} 
                  className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-105 flex-shrink-0 md:flex-shrink" 
                  onClick={() => handleCategoryClick(category.category_id)}
                >
                  {/* Image Container */}
                  <div className="relative mb-2 sm:mb-3 md:mb-1">
                    {/* Main image circle - Responsive sizing */}
                    <div className={`relative rounded-full overflow-hidden border border-gray-600 transition-all duration-300 ease-in-out group-hover:border-transparent ${
                      // Mobile: smaller sizes, Desktop: original sizes with middle item larger
                      index === 2 
                        ? 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[200px] lg:h-[200px]' 
                        : 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[156px] lg:h-[156px]'
                    }`}>
                      <img
                        src={getCategoryImage(category.category_name, category.category_image)}
                        alt={category.category_name || 'Category'}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                      {/* White ring overlay on hover */}
                      <div className="absolute inset-0 rounded-full border-4 sm:border-6 lg:border-8 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="text-center mt-1 sm:mt-2">
                    <h3 className={`uppercase tracking-[0.2em] transition-colors duration-300 ease-in-out ${
                      index === 2 
                        ? 'font-futura text-white text-sm sm:text-base md:text-lg lg:text-[20px] font-[450] leading-tight sm:leading-normal' 
                        : 'font-poppins text-gray-500 text-sm sm:text-base md:text-lg lg:text-[20px] font-normal leading-tight sm:leading-normal'
                    }`}>
                      {category.category_name || 'Unknown Category'}
                    </h3>
                    <p className={`uppercase tracking-[0.2em] ${
                      index === 2 
                        ? 'font-futura text-white text-sm sm:text-base md:text-lg lg:text-[20px] font-[450] leading-tight sm:leading-normal' 
                        : 'font-poppins text-gray-500 text-sm sm:text-base md:text-lg lg:text-[20px] font-normal leading-tight sm:leading-normal'
                    }`}>
                     
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UniqueCollections;