// // import React from 'react';
// // import { ShoppingCart } from 'lucide-react';

// // interface Product {
// //   id: number;
// //   name: string;
// //   price: number;
// //   image: string;
// //   saleTag?: string;
// // }

// // interface ProductCardProps {
// //   product: Product;
// // }

// // const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
// //   return (
// //     <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
// //       <div className="relative overflow-hidden">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
// //         />
// //         {product.saleTag && (
// //           <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
// //             {product.saleTag}
// //           </span>
// //         )}
// //         <button className="absolute bottom-3 right-3 bg-yellow-400 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-yellow-500 transform translate-y-2 group-hover:translate-y-0">
// //           <ShoppingCart className="w-4 h-4" />
// //         </button>
// //       </div>
// //       <div className="p-4">
// //         <h3 className="text-white font-medium mb-2 text-sm md:text-base">{product.name}</h3>
// //         <p className="text-yellow-400 font-bold text-lg">${product.price}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;


// import React, { useState } from 'react';
// import { ShoppingCart } from 'lucide-react';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   discount: string;
//   image: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
  

//   const handleAddToCart = () => {
//     console.log(`Added ${product.title} to cart`);
//   };
//   return (
//     <div 
//       className="bg-black text-white relative group cursor-pointer"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Product Image Container */}
//       <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
        
//         {/* Discount Badge */}
//         <div className="absolute top-3 left-3 bg-[#BB9D7B] text-white px-2 py-1 rounded text-sm font-medium">
//           {product.discount}
//         </div>
        
//         {/* Shopping Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           className={`absolute bottom-4 right-4 w-12 h-12 bg-tan rounded-full flex items-center justify-center transition-all duration-300 ${
//             isHovered ? 'bg-tan-hover scale-110' : 'bg-tan'
//           }`}
//           style={{ backgroundColor: isHovered ? '#B8965F' : '#C4A57B' }}
//         >
//           <ShoppingCart size={20} className="text-white" />
//         </button>
//       </div>
      
//       {/* Product Info */}
//       <div className="px-1">
//         <h3 className="text-white text-base font-medium mb-2 leading-tight font-poppins">
//           {product.title}
//         </h3>
//         <p className="text-white text-lg font-semibold">
//           ${product.price}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;