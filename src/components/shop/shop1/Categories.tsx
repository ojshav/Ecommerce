import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import shop1ApiService, { Category } from '../../../services/shop1ApiService';
import { useTranslation } from 'react-i18next';
import { useAmazonTranslate } from '../../../hooks/useAmazonTranslate';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { translateBatch } = useAmazonTranslate();
  const [translatedCategories, setTranslatedCategories] = useState<Record<number, string>>({});

  // Predefined colors and images for categories (to maintain UI consistency)
  const categoryStyles = [
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745105/public_assets_shop1_LP/public_assets_images_Category1.1.svg',
      bgColor: '#5E919C',
      shadowColor: '#4D767F',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745108/public_assets_shop1_LP/public_assets_images_Category2.1.svg',
      bgColor: '#F0BBCD',
      shadowColor: '#A76D6A',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745110/public_assets_shop1_LP/public_assets_images_Category3.1.svg',
      bgColor: '#F5DB50',
      shadowColor: '#8C8353',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745113/public_assets_shop1_LP/public_assets_images_Category4.1.svg',
      bgColor: '#AB927B',
      shadowColor: '#706B50',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745115/public_assets_shop1_LP/public_assets_images_Category5.1.svg',
      bgColor: '#FFB998',
      shadowColor: '#716D57',
    },
    {
      image: 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745118/public_assets_shop1_LP/public_assets_images_Category6.1.svg',
      bgColor: '#A3C6A4',
      shadowColor: '#4D4A3B',
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await shop1ApiService.getCategories();
        setCategories(fetchedCategories.slice(0, 6)); // Show only first 6 categories to match UI
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback to empty array if API fails
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Translate category names when language changes
  useEffect(() => {
    const doTranslate = async () => {
      const lang = (i18n.language || 'en').split('-')[0];
      if (lang === 'en' || !categories.length) {
        setTranslatedCategories({});
        return;
      }
      try {
        const items = categories.map(cat => ({ 
          id: String(cat.category_id), 
          text: cat.name 
        }));
        const result = await translateBatch(items, lang, 'text/plain');
        const map: Record<number, string> = {};
        categories.forEach(cat => {
          const translated = result[String(cat.category_id)];
          if (translated) map[cat.category_id] = translated;
        });
        setTranslatedCategories(map);
      } catch {
        setTranslatedCategories({});
      }
    };
    doTranslate();
  }, [categories, i18n.language, translateBatch]);

  // Helper function to get category name (translated or original)
  const getCategoryName = (category: Category) => {
    const lang = (i18n.language || 'en').split('-')[0];
    if (lang === 'en') return category.name;
    return translatedCategories[category.category_id] || category.name;
  };

  const handleCategoryClick = (category: Category) => {
    // Navigate to all products page with category filter
    navigate(`/shop1-allproductpage?category=${category.category_id}`);
  };

  // Horizontal scroll controls (same behavior as FreshOffRunway)
  const [leftHovered, setLeftHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollAmount = window.innerWidth < 768 ? containerWidth : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // If loading, show skeleton or existing mock data temporarily
  if (loading) {
    return (
			<section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
				<div className="max-w-7xl mx-auto">
					{/* Mobile: horizontal scroll skeleton */}
					<div className="sm:hidden -mx-4 px-4 overflow-x-auto">
						<div className="flex space-x-4">
							{[...Array(8)].map((_, index) => (
								<div key={index} className="flex-shrink-0 w-28 flex flex-col items-center">
									<div className="h-4 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
									<div className="w-28 h-28 bg-gray-200 rounded-full animate-pulse"></div>
								</div>
							))}
						</div>
					</div>

					{/* Tablet/Desktop: grid skeleton */}
					<div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
						{[...Array(6)].map((_, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className="h-4 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
								<div className="w-[140px] h-[140px] md:w-[151px] md:h-[151px] bg-gray-200 rounded-full animate-pulse"></div>
							</div>
						))}
					</div>
				</div>
			</section>
    );
  }

  // Map categories with predefined styles
  const categoriesWithStyles = categories.map((category, index) => ({
    ...category,
    ...categoryStyles[index % categoryStyles.length], // Cycle through styles
  }));

	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-[1280px] mx-auto">
				{/* Controls row (arrows aligned to the right) */}
				<div className="flex justify-end mb-4">
					<div className="flex space-x-3">
						<button
							className="group rounded-full flex items-center justify-center"
							onMouseEnter={() => setLeftHovered(true)}
							onMouseLeave={() => setLeftHovered(false)}
							onClick={scrollLeft}
							aria-label="Scroll categories left"
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
							aria-label="Scroll categories right"
						>
							<img
								src={rightArrow}
								alt="Arrow Right"
								className="w-8 h-8 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 object-contain"
							/>
						</button>
					</div>
				</div>

				{/* Unified horizontal scroll container (all breakpoints) */}
				<div
					ref={scrollContainerRef}
					className="flex gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto pb-4 xs:pb-6 sm:pb-8"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{categoriesWithStyles.map((category, index) => (
						<div
							key={category.category_id || index}
							className="group cursor-pointer flex-shrink-0 w-28 sm:w-[140px] md:w-[151px]"
							onClick={() => handleCategoryClick(category)}
						>
							<h3 className="text-sm text-[#000000] mb-4 tracking-wide text-center font-platypi">
								{category.name}
							</h3>
							<div className="relative w-28 h-28 sm:w-[140px] sm:h-[140px] md:w-[151px] md:h-[151px]">
								<div
									className="absolute left-1 top-0.5 w-full h-full rounded-full z-0"
									style={{ backgroundColor: category.shadowColor }}
								/>
								<div
									className="w-full h-full rounded-full transition-transform left-3 duration-500 group-hover:scale-110 overflow-hidden relative flex items-center justify-center z-10"
									style={{ backgroundColor: category.bgColor }}
								>
									<img
										src={category.image}
										alt={category.name}
										className="w-[90%] h-[90%] object-contain"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
