import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryDropdownProps {
  isOpen: boolean;
  closeDropdown?: () => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ isOpen, closeDropdown }) => {
  // Categories data structure
  const categories = [
    { name: 'All Products', link: '/products' },
    { name: 'Technology', link: '/category/technology', active: true },
    { name: 'Beauty & Personal care', link: '/category/beauty-personal-care' },
    { name: 'Fashion & apparel', link: '/category/fashion-apparel' },
    { name: 'Toys and hobbies', link: '/category/toys-hobbies' },
    { name: 'Motors Vehicle parts', link: '/category/motors-vehicle-parts' },
    { name: 'Clothes', link: '/category/clothes' },
    { name: 'Nailcare', link: '/category/nailcare' },
    { name: 'Pet Supplies', link: '/category/pet-supplies' },
    { name: 'Party Accessories', link: '/category/party-accessories' },
  ];

  const subcategories = {
    mainCategories: [
      {
        name: 'Smart Watch',
        slug: 'smart-watch',
      },
      {
        name: 'Tablet',
        slug: 'tablet',
        brands: ['Apple', 'Huawei', 'Lenovo', 'Microsoft', 'Samsung']
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        items: ['Keyboard', 'Camera', 'Mouse', 'Speak', 'Hard Drive', 'Charger , Cable', 'Network Equipment', 'USB']
      },
    ],
    laptopCategory: {
      name: 'Laptop',
      slug: 'laptop',
      brands: ['Apple', 'DELL']
    },
    desktopCategory: {
      name: 'Desktop',
      slug: 'desktop',
      items: ['IMac', 'Mac Mini', 'Dell Monitor', 'Pc Radiator']
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 bg-[#fdf6ee] border border-[#e8e8e8] shadow-md rounded-md w-[90vw] md:w-auto md:max-w-[1000px] lg:max-w-[1000px]" 
         style={{ marginLeft: "10px" }}>
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar categories */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#e8e8e8]">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={category.link}
              className={`flex items-center justify-between px-3 md:px-5 py-2 md:py-3 hover:bg-[#f6eadd] ${
                category.active ? 'bg-[#f47521] text-white' : 'text-gray-800'
              } text-sm md:text-base`}
              onClick={closeDropdown}
            >
              <span>{category.name}</span>
              <span>›</span>
            </Link>
          ))}
        </div>
        
        {/* Right content area */}
        <div className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-x-10">
            {/* First column */}
            <div>
              <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">{subcategories.mainCategories[0].name}</h3>
              
              <div className="mb-4 md:mb-8 mt-3 md:mt-6">
                <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">{subcategories.laptopCategory.name}</h3>
                <ul className="space-y-1 md:space-y-3">
                  {subcategories.laptopCategory.brands.map((brand, index) => (
                    <li key={index}>
                      <Link 
                        to={`/category/laptop/${brand.toLowerCase()}`} 
                        className="text-gray-600 hover:text-[#f47521] text-xs md:text-sm"
                        onClick={closeDropdown}
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">{subcategories.desktopCategory.name}</h3>
                <ul className="space-y-1 md:space-y-3">
                  {subcategories.desktopCategory.items.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={`/category/desktop/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="text-gray-600 hover:text-[#f47521] text-xs md:text-sm"
                        onClick={closeDropdown}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Second column */}
            <div>
              <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">{subcategories.mainCategories[1].name}</h3>
              <ul className="space-y-1 md:space-y-3">
                {subcategories.mainCategories[1].brands?.map((brand, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/tablet/${brand.toLowerCase()}`} 
                      className="text-gray-600 hover:text-[#f47521] text-xs md:text-sm"
                      onClick={closeDropdown}
                    >
                      {brand}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Third column */}
            <div>
              <h3 className="text-gray-800 font-medium mb-2 md:mb-4 text-sm md:text-base">{subcategories.mainCategories[2].name}</h3>
              <ul className="space-y-1 md:space-y-3">
                {subcategories.mainCategories[2].items?.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/accessories/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-gray-600 hover:text-[#f47521] text-xs md:text-sm"
                      onClick={closeDropdown}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-4 md:mt-8">
            <Link 
              to="/categories" 
              className="bg-[#f47521] text-white py-2 md:py-3 px-3 md:px-4 inline-block w-full text-center text-sm md:text-base"
              onClick={closeDropdown}
            >
              All of Category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown; 