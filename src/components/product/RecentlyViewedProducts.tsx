import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Product } from '../../types';

interface RecentlyViewedProductsProps {
  products: Product[];
}

interface ProductDetail {
  name: string;
  price: string;
  originalPrice: string | null;
  discountPercent?: string;
  model: string;
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
      name: 'Apple Watch Series 5',
      model: 'MWV62VN/A',
      price: '514.51', 
      originalPrice: '$599.99',
      discountPercent: '29%'
    },
    '2': { 
      name: 'Rossini wristwatch',
      model: '1328W01A',
      price: '146.71',
      originalPrice: '$189.99',
      discountPercent: '12%'
    },
    '3': { 
      name: 'Angel Whitening Treament Lotion',
      model: '',
      price: '193.31',
      originalPrice: '$199.99',
      discountPercent: '5%'
    },
    '4': { 
      name: 'Apple MacBook Pro 2019',
      model: 'MWP42SA/A',
      price: '2013.54',
      originalPrice: '$199.99',
    },
    '5': { 
      name: 'Shop the Best at Gela Toy Park',
      model: '',
      price: '32',
      originalPrice: null
    },
    '6': { 
      name: 'Citizen BI5000-87L Men\'s Watch',
      model: '',
      price: '66.79',
      originalPrice: null
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Recently Viewed</h2>
        <div className="flex space-x-1">
          <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-4">
        {products.map((product) => {
          // Get the product details from our map with a fallback
          const productDetails = productDetailsMap[product.id] || {
            name: product.name,
            model: '',
            price: product.price.toString(),
            originalPrice: product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : null
          };
          
          // Determine if product has a "New" tag or discount percentage
          let tagContent = null;
          let tagColor = "bg-orange-500";
          
          if (product.id === '4' || product.id === '5') {
            tagContent = "New";
          } else if (productDetails.discountPercent) {
            tagContent = `- ${productDetails.discountPercent}`;
          }
          
          return (
            <div key={product.id} className="bg-white rounded-md overflow-hidden group relative shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              {/* Wishlist Icon */}
              <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              
              {/* Label */}
              {tagContent && (
                <div className={`absolute top-2 left-2 ${tagColor} text-white text-xs px-2 py-0.5 rounded-sm z-10`}>
                  {tagContent}
                </div>
              )}
              
              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-[130px] w-full flex items-center justify-center bg-gray-50 p-4">
                  <img 
                    src={getImageUrl(product.id)} 
                    alt={productDetails.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </Link>
              
              <div className="p-3 flex flex-col h-[calc(100%-130px)]">
                {/* Product Name and Model Number */}
                <Link to={`/product/${product.id}`} className="block flex-grow">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10">
                    {productDetails.name}
                  </h3>
                  {productDetails.model && (
                    <p className="text-xs text-gray-500 mb-2">{productDetails.model}</p>
                  )}
                </Link>
                
                {/* Price */}
                <div className="flex items-baseline mb-3">
                  <span className="text-base font-semibold text-gray-900">
                    ${productDetails.price}
                  </span>
                  {productDetails.originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      {productDetails.originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Color options */}
                <div className="flex space-x-1 mb-3">
                  <div className="w-4 h-4 rounded-full bg-black ring-1 ring-gray-200"></div>
                  <div className="w-4 h-4 rounded-full bg-gray-400 ring-1 ring-gray-200"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-200 ring-1 ring-gray-200"></div>
                </div>
                
                {/* Add to Cart Button */}
                <button className="w-full bg-orange-500 text-white text-xs py-2 px-3 rounded hover:bg-orange-600 transition-colors font-medium">
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