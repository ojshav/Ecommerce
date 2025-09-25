import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAmazonTranslate } from '../../hooks/useAmazonTranslate';

interface Category {
  category_id: number;
  name: string;
  slug: string;
  icon_url: string;
}

const Categories: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translateBatch } = useAmazonTranslate();
  const [translatedCategories, setTranslatedCategories] = useState<Record<number, string>>({});

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  useEffect(() => {
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

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/with-icons`);

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="pt-8">
        <div className="container mx-auto px-4 xl:px-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('home.sections.categoriesTitle')}</h2>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 pl-2">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-36 h-40 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-8">
        <div className="container mx-auto px-4 xl:px-14">
          <div className="text-red-500 text-center">
            <p>{t('common.error')}: {error}</p>
            <button 
              onClick={fetchCategories}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              {t('common.retry', 'Try Again')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 py-4">
      <div className="container mx-auto px-4 xl:px-14">
        {/* Categories header with navigation */}
        <div className="flex justify-between items-center mb-6">
      <h6 className="text-xl font-medium font-worksans">{t('home.sections.categoriesTitle')}</h6>
          <div className="flex items-center">
            <Link to="/all-products" className="text-orange-500 text-sm font-medium mr-3 sm:mr-10">
        {t('home.seeAll')}
            </Link>
            <div className="flex items-center space-x-1 sm:space-x-3">
              <button
                onClick={scrollLeft}
                className="focus:outline-none"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={20} className="text-gray-500 hover:text-black duration-300" />
              </button>
              <button
                onClick={scrollRight}
                className="focus:outline-none"
                aria-label="Scroll Right"
              >
                <ChevronRight size={20} className="text-gray-500 hover:text-black duration-300" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Categories slider */}
        <div 
          ref={scrollRef}
          className="flex gap-9 overflow-x-auto pb-4 pt-2 pl-2 scroll-smooth"
        >
          {categories.map((category) => (
            <div 
            key={category.category_id} 
            onClick={() => {
              navigate(`/all-products?category=${category.category_id}`);
            }}
            className="  hover:category-hover-shadow relative overflow-hidden z-10 flex-shrink-0 w-[155px] h-[155px] bg-[#FFEEE2] rounded-full shadow-[4px_4px_4px_0px_rgba(205,160,160,0.25)] flex flex-col items-center justify-center text-center px-2 py-[26px] transition duration-300 hover:bg-[#FFDADE]"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center p-[6px] z-10">
              {category.icon_url ? (
                <img 
                  src={category.icon_url} 
                  alt={getCategoryName(category)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-3xl">📦</span>
              )}
            </div>
            <h3 className="font-semibold text-lg font-worksans z-10">{getCategoryName(category)}</h3>
          </div>
          
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
