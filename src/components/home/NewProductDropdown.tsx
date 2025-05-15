import React from 'react';
import { Link } from 'react-router-dom';

interface NewProductDropdownProps {
  isOpen: boolean;
  closeDropdown: () => void;
}

const NewProductDropdown: React.FC<NewProductDropdownProps> = ({ isOpen, closeDropdown }) => {
  // Product categories for new products
  const categories = [
    { name: 'Smart Watch', link: '/new-product?category=smart-watch' },
    { name: 'Tablet', link: '/new-product?category=tablet' },
    { name: 'Accessories', link: '/new-product?category=accessories' },
  ];

  const brands = [
    { name: 'Apple', link: '/new-product?brand=apple' },
    { name: 'Huawei', link: '/new-product?brand=huawei' },
    { name: 'Microsoft', link: '/new-product?brand=microsoft' },
    { name: 'Samsung', link: '/new-product?brand=samsung' },
  ];

  const accessories = [
    { name: 'Keyboard', link: '/new-product?accessory=keyboard' },
    { name: 'Camera', link: '/new-product?accessory=camera' },
    { name: 'Mouse', link: '/new-product?accessory=mouse' },
    { name: 'USB', link: '/new-product?accessory=usb' },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-6 p-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">{categories[0].name}</h3>
            <ul className="space-y-3">
              {brands.map((brand, index) => (
                <li key={index}>
                  <Link 
                    to={brand.link} 
                    className="text-gray-600 hover:text-[#f47521]"
                    onClick={closeDropdown}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">{categories[1].name}</h3>
            <ul className="space-y-3">
              {brands.map((brand, index) => (
                <li key={index}>
                  <Link 
                    to={brand.link} 
                    className="text-gray-600 hover:text-[#f47521]"
                    onClick={closeDropdown}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">{categories[2].name}</h3>
            <ul className="space-y-3">
              {accessories.map((accessory, index) => (
                <li key={index}>
                  <Link 
                    to={accessory.link} 
                    className="text-gray-600 hover:text-[#f47521]"
                    onClick={closeDropdown}
                  >
                    {accessory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Promotion Box */}
          <div className="bg-gray-100 p-6 rounded">
            <div className="mb-4">
              <h3 className="text-gray-900 font-bold uppercase mb-1">GENUINE ACCESSORIES</h3>
              <h4 className="text-gray-800 font-bold uppercase">SUPER SALE OCTOBER</h4>
            </div>
            <Link 
              to="/new-product?promotion=october-sale" 
              className="bg-[#f47521] text-white py-2 px-4 inline-block rounded hover:bg-[#e26a19] text-sm font-medium"
              onClick={closeDropdown}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductDropdown; 