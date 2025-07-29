// // import React, { useState } from 'react';
// // import ProductCard from './ProductCard';
// // import { ChevronDown } from 'lucide-react';

// // const products = [
// //   {
// //     id: 1,  
// //     name: "Crystal Red Beads Four Layer",
// //     price: 80,
// //     image: "https://images.pexels.com/photos/6076475/pexels-photo-6076475.jpeg?auto=compress&cs=tinysrgb&w=400"
// //   },
// //   {
// //     id: 2,
// //     name: "Crystal Red sandoor",
// //     price: 120,
// //     image: "https://images.pexels.com/photos/6992981/pexels-photo-6992981.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     saleTag: "SALE"
// //   },
// //   {
// //     id: 3,
// //     name: "Radha Locket Mala",
// //     price: 100,
// //     image: "https://images.pexels.com/photos/6992982/pexels-photo-6992982.jpeg?auto=compress&cs=tinysrgb&w=400"
// //   },
// //   {
// //     id: 4,
// //     name: "108 Dana Rudraksha Mala",
// //     price: 90,
// //     image: "https://images.pexels.com/photos/6992950/pexels-photo-6992950.jpeg?auto=compress&cs=tinysrgb&w=400"
// //   },
// //   {
// //     id: 5,
// //     name: "Ganesha Shansh",
// //     price: 120,
// //     image: "https://images.pexels.com/photos/6992926/pexels-photo-6992926.jpeg?auto=compress&cs=tinysrgb&w=400",
// //     saleTag: "SALE"
// //   },
// //   {
// //     id: 6,
// //     name: "Pure Cow Ghee Diya",
// //     price: 100,
// //     image: "https://images.pexels.com/photos/6992984/pexels-photo-6992984.jpeg?auto=compress&cs=tinysrgb&w=400"
// //   }
// // ];

// // const ProductGrid: React.FC = () => {
// //   const [sortBy, setSortBy] = useState('featured');

// //   return (
// //     <div className="flex-1">
// //       {/* Results Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
// //         <p className="text-gray-300 text-sm">
// //           Showing 1–6 of 15 Results
// //         </p>
// //         <div className="relative">
// //           <select
// //             value={sortBy}
// //             onChange={(e) => setSortBy(e.target.value)}
// //             className="bg-yellow-400 text-black px-4 py-2 pr-8 rounded font-medium appearance-none cursor-pointer hover:bg-yellow-500 transition-colors min-w-[140px]"
// //           >
// //             <option value="featured">Sort By Featured</option>
// //             <option value="price-low">Price: Low to High</option>
// //             <option value="price-high">Price: High to Low</option>
// //             <option value="name">Name A-Z</option>
// //           </select>
// //           <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black pointer-events-none" />
// //         </div>
// //       </div>

// //       {/* Product Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {products.map((product) => (
// //           <ProductCard key={product.id} product={product} />
// //         ))}
// //       </div>

// //       {/* Pagination could go here */}
// //       <div className="mt-12 flex justify-center">
// //         <div className="flex space-x-2">
// //           {[1, 2, 3].map((page) => (
// //             <button
// //               key={page}
// //               className={`w-10 h-10 rounded ${
// //                 page === 1
// //                   ? 'bg-yellow-400 text-black'
// //                   : 'bg-gray-700 text-white hover:bg-gray-600'
// //               } transition-colors`}
// //             >
// //               {page}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductGrid;


// import React from 'react';
// import ProductCard from './ProductCard';

// const products = [
//   {
//     id: 1,
//     title: "Crystal Red Beads Four Layer",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462993/public_assets_shop4/public_assets_shop4_Group%201000006564.png"
//   },
//   {
//     id: 2,
//     title: "Crystal Red sindoor",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png"
//   },
//   {
//     id: 3,
//     title: "Radha Locket Mala",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463019/public_assets_shop4/public_assets_shop4_Rectangle%20103.png"
//   },
//   {
//     id: 4,
//     title: "108 Dana Rudraksha Mala",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463020/public_assets_shop4/public_assets_shop4_Rectangle%20104.png"
//   },
//   {
//     id: 5,
//     title: "Ganesha Shankh",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png"
//   },
//   {
//     id: 6,
//     title: "Pure Cow Ghee Diya",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463023/public_assets_shop4/public_assets_shop4_Rectangle%20106.png"
//   },
//    {
//     id: 7,
//     title: "Panchmukhi Rudraksha jaap ",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463025/public_assets_shop4/public_assets_shop4_Rectangle%20107.png"
//   },
//     {
//     id: 8,
//     title: "1 Inch Dhoop Candle",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463027/public_assets_shop4/public_assets_shop4_Rectangle%20108.png"
//   },
//     {
//     id: 9,
//     title: "Antique Turtle Loban Dingali",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463029/public_assets_shop4/public_assets_shop4_Rectangle%20109.png"
//   },
//    {
//     id: 10,
//     title: "Crystal Red Beads Four Layer",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png"
//   },
//    {
//     id: 11,
//     title: "Ganesha Shankh",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png"
//   },
//    {
//     id: 12,
//     title: "Radha Locket Mala",
//     price: 120,
//     discount: "11%",
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463033/public_assets_shop4/public_assets_shop4_Rectangle%20112.png"
//   }
// ];

// const ProductGrid: React.FC = () => {
//   return (
//     <>
//     <span className='text-[#FFFFFF] md:mx-20'>Showing 1–9 of 15 results</span>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-20 py-16">
      
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//     </>
//   );
// };
// export default ProductGrid;


import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  discount: string;
  image: string;
}

const products = [
  {
    id: 1,
    title: "Crystal Red Beads Four Layer",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462993/public_assets_shop4/public_assets_shop4_Group%201000006564.png"
  },
  {
    id: 2,
    title: "Crystal Red sindoor",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png"
  },
  {
    id: 3,
    title: "Radha Locket Mala",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463019/public_assets_shop4/public_assets_shop4_Rectangle%20103.png"
  },
  {
    id: 4,
    title: "108 Dana Rudraksha Mala",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463020/public_assets_shop4/public_assets_shop4_Rectangle%20104.png"
  },
  {
    id: 5,
    title: "Ganesha Shankh",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png"
  },
  {
    id: 6,
    title: "Pure Cow Ghee Diya",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463023/public_assets_shop4/public_assets_shop4_Rectangle%20106.png"
  },
  {
    id: 7,
    title: "Panchmukhi Rudraksha jaap",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463025/public_assets_shop4/public_assets_shop4_Rectangle%20107.png"
  },
  {
    id: 8,
    title: "1 Inch Dhoop Candle",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463027/public_assets_shop4/public_assets_shop4_Rectangle%20108.png"
  },
  {
    id: 9,
    title: "Antique Turtle Loban Dingali",
    price: 120,
    discount: "11%",
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463029/public_assets_shop4/public_assets_shop4_Rectangle%20109.png"
  }
];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[280px] overflow-hidden rounded-lg mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-[#BB9D7B] text-white px-2 py-1 rounded text-xs font-medium">
          {product.discount}
        </div>
        
        {/* Shopping Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-3 right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'bg-[#B8965F] scale-110' : 'bg-[#C4A57B]'
          }`}
        >
          <ShoppingCart size={16} className="text-white sm:w-5 sm:h-5" />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-white text-sm sm:text-base font-medium mb-1 leading-tight">
          {product.title}
        </h3>
        <p className="text-white text-base sm:text-lg font-semibold">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

const ProductGrid: React.FC = () => {
  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <p className="text-white text-sm opacity-80">
          Showing 1–9 of 15 Results
        </p>
      </div>
      
      {/* Product Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3,4,5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded ${
                page === 1
                  ? 'bg-[#C4A57B] text-black font-medium'
                  : ' text-white hover:bg-gray-600'
              } transition-colors text-sm`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;