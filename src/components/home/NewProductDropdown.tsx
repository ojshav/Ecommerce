import React from 'react';
import { Link } from 'react-router-dom';

interface NewProductDropdownProps {
  isOpen: boolean;
  closeDropdown: () => void;
}

const NewProductDropdown: React.FC<NewProductDropdownProps> = ({ isOpen, closeDropdown }) => {
  // Product categories and items
  const categories = {
    smartWatch: {
      name: 'Smart Watch',
      items: []
    },
    tablet: {
      name: 'Tablet',
      items: ['Apple', 'Huawei', 'Microsoft', 'Samsung']
    },
    accessories: {
      name: 'Accessories',
      items: ['Keyboard', 'Camera', 'Mouse', 'Speak', 'USB']
    },
    laptop: {
      name: 'Laptop',
      items: ['Apple', 'DELL']
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-50 bg-white border border-gray-200 shadow-md rounded-md w-[90vw] md:w-[570px] max-w-[570px]" 
         style={{ 
           top: "100%", 
           left: "50%", 
           transform: "translateX(-50%)",
           right: 0
         }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Column 1 */}
        <div className="p-3 md:p-4 bg-[#fff5eb]">
          <h3 className="text-gray-800 font-medium mb-2 md:mb-3 text-sm md:text-base">{categories.smartWatch.name}</h3>
          
          <div className="mt-3 md:mt-5">
            <h3 className="text-gray-800 font-medium mb-2 md:mb-3 text-sm md:text-base">{categories.laptop.name}</h3>
            <ul className="space-y-1 md:space-y-2">
              {categories.laptop.items.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/new-product?category=laptop&brand=${item.toLowerCase()}`} 
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

        {/* Column 2 */}
        <div className="p-3 md:p-4 bg-[#fff5eb]">
          <h3 className="text-gray-800 font-medium mb-2 md:mb-3 text-sm md:text-base">{categories.tablet.name}</h3>
          <ul className="space-y-1 md:space-y-2">
            {categories.tablet.items.map((item, index) => (
              <li key={index}>
                <Link 
                  to={`/new-product?category=tablet&brand=${item.toLowerCase()}`} 
                  className="text-gray-600 hover:text-[#f47521] text-xs md:text-sm"
                  onClick={closeDropdown}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div className="p-3 md:p-4 bg-[#fff5eb]">
          <h3 className="text-gray-800 font-medium mb-2 md:mb-3 text-sm md:text-base">{categories.accessories.name}</h3>
          <ul className="space-y-1 md:space-y-2">
            {categories.accessories.items.map((item, index) => (
              <li key={index}>
                <Link 
                  to={`/new-product?category=accessories&accessory=${item.toLowerCase()}`} 
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

      {/* Promotion Box */}
      <div className="p-4 md:p-6 bg-gray-100 mt-2">
        <div className="flex justify-between">
          <div>
            <h3 className="text-gray-900 font-bold uppercase mb-1 text-xs md:text-sm">GENUINE ACCESSORIES</h3>
            <h4 className="text-gray-800 font-bold uppercase text-xs md:text-sm">SUPER SALE OCTOBER</h4>
            <Link 
              to="/new-product?promotion=october-sale" 
              className="bg-[#f47521] text-white py-1 md:py-2 px-3 md:px-4 inline-block rounded mt-2 md:mt-3 hover:bg-[#e26a19] text-xs md:text-sm font-medium"
              onClick={closeDropdown}
            >
              Buy Now
            </Link>
          </div>
          <div className="opacity-20 hidden sm:block">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductDropdown; 