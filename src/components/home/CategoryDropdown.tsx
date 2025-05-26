import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface Category {
  category_id: number;
  name: string;
  slug: string;
  icon_url: string;
  parent_id: number | null;
  children?: Category[];
}

interface CategoryDropdownProps {
  isOpen: boolean;
  closeDropdown?: () => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ isOpen, closeDropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Update selected category when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category');
    setSelectedCategory(categoryId || '');
  }, [location.search]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/all`);
      
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

  const handleCategoryClick = (category: Category) => {
    if (closeDropdown) {
      closeDropdown();
    }
    setSelectedCategory(String(category.category_id));
    navigate(`/all-products?category=${category.category_id}`);
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="absolute left-0 top-full z-50 bg-[#fdf6ee] border border-[#e8e8e8] shadow-md rounded-md w-[90vw] md:w-auto md:max-w-[1000px] lg:max-w-[1000px]" 
           style={{ marginLeft: "10px" }}>
        <div className="p-4">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute left-0 top-full z-50 bg-[#fdf6ee] border border-[#e8e8e8] shadow-md rounded-md w-[90vw] md:w-auto md:max-w-[1000px] lg:max-w-[1000px]" 
           style={{ marginLeft: "10px" }}>
        <div className="p-4 text-red-500">Error loading categories: {error}</div>
      </div>
    );
  }

  const renderCategoryTree = (category: Category, level: number = 0) => {
    const isSelected = selectedCategory === String(category.category_id);
    
    return (
      <div key={category.category_id} className={`pl-${level * 4}`}>
        <button 
          onClick={() => handleCategoryClick(category)}
          className={`flex items-center justify-between px-3 md:px-5 py-2 md:py-3 hover:bg-[#f6eadd] text-gray-800 text-sm md:text-base w-full text-left ${
            isSelected ? 'bg-[#f47521] text-white' : ''
          }`}
        >
          <span>{category.name}</span>
          {category.children && category.children.length > 0 && <span>›</span>}
        </button>
        {category.children && category.children.length > 0 && (
          <div className="ml-4">
            {category.children.map(child => renderCategoryTree(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="absolute left-0 top-full z-50 bg-[#fdf6ee] border border-[#e8e8e8] shadow-md rounded-md w-[90vw] md:w-auto md:max-w-[1000px] lg:max-w-[1000px]" 
         style={{ marginLeft: "10px" }}>
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar categories */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#e8e8e8]">
          <button 
            onClick={() => {
              if (closeDropdown) closeDropdown();
              setSelectedCategory('');
              navigate('/products');
            }}
            className={`flex items-center justify-between px-3 md:px-5 py-2 md:py-3 hover:bg-[#f6eadd] text-gray-800 text-sm md:text-base w-full text-left ${
              selectedCategory === '' ? 'bg-[#f47521] text-white' : ''
            }`}
          >
            <span>All Products</span>
          </button>
          {categories.map(category => renderCategoryTree(category))}
        </div>
        
        {/* Right content area - Show subcategories of selected category */}
        <div className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-x-10">
            {categories.map(category => (
              category.children && category.children.length > 0 && (
                <div key={category.category_id}>
                  <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">
                    {category.name}
                  </h3>
                  <ul className="space-y-1 md:space-y-3">
                    {category.children.map(child => (
                      <li key={child.category_id}>
                        <button 
                          onClick={() => handleCategoryClick(child)}
                          className={`text-gray-600 hover:text-[#f47521] text-xs md:text-sm text-left w-full ${
                            selectedCategory === String(child.category_id) ? 'text-[#f47521] font-medium' : ''
                          }`}
                        >
                          {child.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
          
          <div className="mt-4 md:mt-8">
            <button 
              onClick={() => {
                if (closeDropdown) closeDropdown();
                setSelectedCategory('');
                navigate('/products');
              }}
              className="bg-[#f47521] text-white py-2 md:py-3 px-3 md:px-4 inline-block w-full text-center text-sm md:text-base"
            >
              All Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown; 