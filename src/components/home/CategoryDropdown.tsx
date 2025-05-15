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
    <div className="absolute left-0 right-0 z-50 bg-[#fdf6ee] border-b border-[#e8e8e8] shadow-md">
      <div className="container mx-auto">
        <div className="flex">
          {/* Left sidebar categories */}
          <div className="w-64 border-r border-[#e8e8e8]">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={category.link}
                className={`flex items-center justify-between px-5 py-3 hover:bg-[#f6eadd] ${
                  category.active ? 'bg-[#f47521] text-white' : 'text-gray-800'
                }`}
                onClick={closeDropdown}
              >
                <span>{category.name}</span>
                <span>›</span>
              </Link>
            ))}
          </div>
          
          {/* Right content area */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-3 gap-x-10">
              {/* First column */}
              <div>
                <h3 className="text-gray-800 font-medium mb-4">{subcategories.mainCategories[0].name}</h3>
                
                <div className="mb-8 mt-6">
                  <h3 className="text-gray-800 font-medium mb-4">{subcategories.laptopCategory.name}</h3>
                  <ul className="space-y-3">
                    {subcategories.laptopCategory.brands.map((brand, index) => (
                      <li key={index}>
                        <Link 
                          to={`/category/laptop/${brand.toLowerCase()}`} 
                          className="text-gray-600 hover:text-[#f47521]"
                          onClick={closeDropdown}
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-gray-800 font-medium mb-4">{subcategories.desktopCategory.name}</h3>
                  <ul className="space-y-3">
                    {subcategories.desktopCategory.items.map((item, index) => (
                      <li key={index}>
                        <Link 
                          to={`/category/desktop/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                          className="text-gray-600 hover:text-[#f47521]"
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
                <h3 className="text-gray-800 font-medium mb-4">{subcategories.mainCategories[1].name}</h3>
                <ul className="space-y-3">
                  {subcategories.mainCategories[1].brands?.map((brand, index) => (
                    <li key={index}>
                      <Link 
                        to={`/category/tablet/${brand.toLowerCase()}`} 
                        className="text-gray-600 hover:text-[#f47521]"
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
                <h3 className="text-gray-800 font-medium mb-4">{subcategories.mainCategories[2].name}</h3>
                <ul className="space-y-3">
                  {subcategories.mainCategories[2].items?.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={`/category/accessories/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="text-gray-600 hover:text-[#f47521]"
                        onClick={closeDropdown}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                to="/categories" 
                className="bg-[#f47521] text-white py-3 px-4 inline-block w-full text-center"
                onClick={closeDropdown}
              >
                All of Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown; 