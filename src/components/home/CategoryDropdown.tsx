import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryDropdownProps {
  isOpen: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ isOpen }) => {
  // Sample categories data structure
  const categoryData = {
    technology: {
      name: 'Technology',
      subcategories: [
        { name: 'Product A', slug: 'product-a' },
        { name: 'Product B', slug: 'product-b' },
        { name: 'Product C', slug: 'product-c' },
        { name: 'Product D', slug: 'product-d' },
        { name: 'Product E', slug: 'product-e' },
        { name: 'Product F', slug: 'product-f' },
        { name: 'Product G', slug: 'product-g' },
        { name: 'Product H', slug: 'product-h' },
        { name: 'Product I', slug: 'product-i' }
      ]
    },
    mainCategories: [
      {
        name: 'Smart Watch',
        brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei'],
        slug: 'smart-watch'
      },
      {
        name: 'Tablet',
        brands: ['Apple', 'Huawei', 'Lenovo', 'Microsoft', 'Samsung'],
        slug: 'tablet'
      },
      {
        name: 'Accessories',
        brands: ['Keyboard', 'Camera', 'Mouse', 'Dongle'],
        slug: 'accessories'
      },
      {
        name: 'Laptop',
        brands: ['Apple', 'HP', 'Dell'],
        slug: 'laptop'
      },
      {
        name: 'Desktop',
        brands: ['iMac', 'Mac Mini', 'Dell Monitor', 'Hard Drive', 'Charger, Cable', 'Network Equipment', 'USB'],
        slug: 'desktop'
      }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 z-50 bg-white border-b shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Technology Category with subcategories */}
          <div className="col-span-3 border-r pr-6">
            <h3 className="font-semibold mb-3">All Products</h3>
            <ul>
              {categoryData.technology.subcategories.map((product, index) => (
                <li key={index} className="py-1">
                  <Link 
                    to={`/products/${product.slug}`} 
                    className="text-gray-700 hover:text-primary-600 flex items-center"
                  >
                    <span className="mr-1">›</span> {product.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link 
                to="/categories" 
                className="bg-gray-800 text-white text-sm py-2 px-4 rounded block text-center hover:bg-gray-700"
              >
                All of Category
              </Link>
            </div>
          </div>

          {/* Main Categories */}
          <div className="col-span-9 grid grid-cols-4 gap-6">
            {categoryData.mainCategories.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-3">{category.name}</h3>
                <ul>
                  {category.brands.map((brand, brandIndex) => (
                    <li key={brandIndex} className="py-1">
                      <Link 
                        to={`/categories/${category.slug}/${brand.toLowerCase().replace(/,\s+/g, '-')}`} 
                        className="text-gray-600 hover:text-primary-600"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown; 