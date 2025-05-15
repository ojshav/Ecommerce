import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';

interface RecentlyViewedProductsProps {
  products: Product[];
}

interface ProductDetail {
  name: string;
  price: string;
  originalPrice: string | null;
}

const RecentlyViewedProducts: React.FC<RecentlyViewedProductsProps> = ({ products }) => {
  if (!products || products.length === 0) return null;

  // Custom image URLs that match the image better
  const getImageUrl = (productId: string): string => {
    switch (productId) {
      case '1': return 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600';
      case '2': return 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600';
      case '3': return 'https://images.pexels.com/photos/5087257/pexels-photo-5087257.jpeg?auto=compress&cs=tinysrgb&w=600';
      case '4': return 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600';
      case '5': return 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600';
      case '6': return 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600';
      default: return '';
    }
  };

  // Define product details map with proper typing
  const productDetailsMap: Record<string, ProductDetail> = {
    '1': { 
      name: 'Apple Watch Series 5 MWV42SA/A', 
      price: '514.51', 
      originalPrice: '$599.99'
    },
    '2': { 
      name: 'Rossini wristwatch - 123RXYTA', 
      price: '146.71',
      originalPrice: '$189.99'
    },
    '3': { 
      name: 'Angel Whitewing Traminet Lafon', 
      price: '193.31',
      originalPrice: '$215.99'
    },
    '4': { 
      name: 'Apple MacBook Pro 2019 MWTK28AA', 
      price: '2013.54',
      originalPrice: '$2,499.99'
    },
    '5': { 
      name: 'Shop the Best at Seia Toy Park', 
      price: '32',
      originalPrice: null
    },
    '6': { 
      name: 'Citizen BK600-BTL Men\'s Watch', 
      price: '56.79',
      originalPrice: null
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-medium">Recently Viewed</h2>
        <div className="flex space-x-1">
          <button className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-100">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="w-5 h-5 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-100">
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-3">
        {products.map((product) => {
          // Get correct label and color for each product based on the image
          let label = null;
          
          if (product.id === '1') {
            label = { text: 'New', color: 'bg-orange-500' };
          } else if (product.id === '2') {
            label = { text: '-10%', color: 'bg-orange-500' };
          } else if (product.id === '3') {
            label = { text: '-8%', color: 'bg-orange-500' };
          } else if (product.id === '4') {
            label = { text: 'HOT', color: 'bg-orange-500' };
          } else if (product.id === '5') {
            label = { text: 'Sale', color: 'bg-orange-500' };
          }
          
          // Get the product details from our map with a fallback
          const productDetails = productDetailsMap[product.id] || {
            name: product.name,
            price: product.price.toString(),
            originalPrice: product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : null
          };
          
          return (
            <div key={product.id} className="bg-gray-100 rounded-sm overflow-hidden">
              <div className="relative">
                {/* Label */}
                {label && (
                  <div className={`absolute top-1 left-1 ${label.color} text-white text-xs px-1.5 py-0.5 rounded-sm`}>
                    {label.text}
                  </div>
                )}
                
                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="h-[76px] w-full flex items-center justify-center bg-gray-100">
                    <img 
                      src={getImageUrl(product.id)} 
                      alt={productDetails.name} 
                      className="h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
              
              <div className="p-1.5 bg-gray-100 text-left">
                {/* Product Name */}
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-[11px] font-normal line-clamp-2 mb-0.5 text-gray-900">
                    {productDetails.name}
                  </h3>
                </Link>
                
                {/* Price */}
                <div className="flex items-baseline flex-wrap mb-1">
                  <span className="text-xs font-semibold text-gray-900 mr-1">
                    ${productDetails.price}
                  </span>
                  {productDetails.originalPrice && (
                    <span className="text-[10px] text-gray-500 line-through">
                      {productDetails.originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full bg-orange-500 text-white text-[10px] py-1 px-0 text-center rounded-sm hover:bg-orange-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts; 