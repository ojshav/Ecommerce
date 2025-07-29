// // // import  { useState } from 'react';
// // // import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

// // // interface Product {
// // //   id: number;
// // //   name: string;
// // //   price: number;
// // //   image: string;
// // //   background: string;
// // //   discount?: number;
// // //   selected?: boolean;
// // // }

// // // const products: Product[] = [
// // //   {
// // //     id: 1,
// // //     name: "Vamavarti Shankh",
// // //     price: 120,
// // //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png",
// // //     background: "bg-blue-400"
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Moti Shankh",
// // //     price: 120,
// // //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png",
// // //     background: "bg-slate-700",
// // //     selected: true
// // //   },
// // //   {
// // //     id: 3,
// // //     name: "Ganesha Shankh",
// // //     price: 120,
// // //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png",
// // //     background: "bg-teal-300"
// // //   },
// // //   {
// // //     id: 4,
// // //     name: "Pancha Shankh",
// // //     price: 120,
// // //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463035/public_assets_shop4/public_assets_shop4_Rectangle%2023.png",
// // //     background: "bg-red-500",
// // //     discount: 10
// // //   }
// // // ];

// // // function Recentproduct() {
// // //   const [activeTab, setActiveTab] = useState('RITUAL KITS');
// // //   // const [selectedProduct, setSelectedProduct] = useState(2);
// // //   const [quantity, setQuantity] = useState(1);

// // //   const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

// // //   const handleQuantityChange = (change: number) => {
// // //     setQuantity(Math.max(1, quantity + change));
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-black text-white">
// // //       {/* Header */}
// // //       <div className="text-center py-8 px-4">
// // //         <p className="text-sm tracking-wider text-gray-400 mb-4">RECENT PRODUCTS</p>
// // //         <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-8">
// // //           AOIN POOJA STORE
// // //         </h1>
        
       

// // // <div className="flex justify-center mb-12">
// // //   <div className="flex items-center border-b border-gray-600 relative space-x-4">
// // //     {tabs.map((tab, index) => (
// // //       <div key={tab} className="flex items-center">
// // //         <button
// // //           onClick={() => setActiveTab(tab)}
// // //           className={`px-6 md:px-12 py-3 text-sm tracking-wider transition-all duration-300 ${
// // //             activeTab === tab
// // //               ? 'bg-[#BB9D7B] text-white rounded-full -mb-px'
// // //               : 'text-gray-300 hover:text-white'
// // //           }`}
// // //         >
// // //           {tab}
// // //         </button>

// // //         {/* Vertical line between buttons */}
// // //         {index < tabs.length - 1 && (
// // //           <div className="w-[2px] h-[75px] bg-gray-500 mx-4" />
// // //         )}
// // //       </div>
// // //     ))}
// // //   </div>
// // // </div>
// // //       </div>
// // //       {/* Product Carousel */}
// // //       <div className="relative px-4 md:px-8 lg:px-16">
// // //         {/* Navigation Arrows */}
// // //         <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
// // //           <ChevronLeft size={20} />
// // //         </button>
// // //         <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
// // //           <ChevronRight size={20} />
// // //         </button>

// // //         {/* Products Grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
// // //           {products.map((product) => (
// // //             <div
// // //               key={product.id}
// // //               className={`relative transition-all duration-300 ${
// // //                 product.selected ? 'transform scale-105' : 'hover:transform hover:scale-102'
// // //               }`}
// // //             >
// // //               {/* Discount Badge */}
// // //               {product.discount && (
// // //                 <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-10">
// // //                   -{product.discount}%
// // //                 </div>
// // //               )}

// // //               {/* Product Image */}
// // //               <div className={`${product.background} rounded-2xl overflow-hidden aspect-square mb-4 relative group`}>
// // //                 <img
// // //                   src={product.image}
// // //                   alt={product.name}
// // //                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
// // //                 />
// // //               </div>

// // //               {/* Product Info */}
// // //               <div className="text-center mb-4">
// // //                 <h3 className="text-lg font-medium mb-2">{product.name}</h3>
// // //                 <p className="text-gray-400">${product.price}</p>
// // //               </div>

// // //               {/* Expanded Product Card */}
// // //               {product.selected && (
// // //                 <div className=" rounded-2xl p-6  absolute top-0 left-0 right-0 z-20 mt-20">
// // //                   <div className={` rounded-2xl overflow-hidden aspect-square mb-4`}>
                   
// // //                   </div>
// // //                   <div className="bg-[#212121] border border-[#BB9D7B] rounded-2xl p-3.5">
// // //                   <h3 className="text-lg font-medium mb-2 text-center">{product.name}</h3>
// // //                   <p className="text-gray-400 text-center mb-4">${product.price}</p>
                  
// // //                   {/* Color Variants */}
// // //                   <div className="flex justify-center mb-6">
// // //                     <div className="flex space-x-2">
// // //                       <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
// // //                       <div className="w-3 h-3 bg-amber-700 rounded-full border-2 border-white"></div>
// // //                       <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Quantity and Add to Cart */}
// // //                   <div className="flex items-center justify-center space-x-4 ">
// // //                     <div className="flex items-center space-x-3">
// // //                       <button
// // //                         onClick={() => handleQuantityChange(-1)}
// // //                         className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
// // //                       >
// // //                         <Minus size={16} />
// // //                       </button>
// // //                       <span className="w-8 text-center">{quantity}</span>
// // //                       <button
// // //                         onClick={() => handleQuantityChange(1)}
// // //                         className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
// // //                       >
// // //                         <Plus size={16} />
// // //                       </button>
// // //                     </div>
// // //                     <button className="bg-amber-700 hover:bg-amber-800 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
// // //                       <ShoppingCart size={20} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Mobile Responsive Adjustments */}
// // //       <style jsx>{`
// // //         @media (max-width: 768px) {
// // //           .grid {
// // //             grid-template-columns: repeat(2, 1fr);
// // //           }
// // //         }
// // //         @media (max-width: 480px) {
// // //           .grid {
// // //             grid-template-columns: 1fr;
// // //           }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }
// // // export default Recentproduct;

// // import { useState } from 'react';
// // import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

// // interface Product {
// //   id: number;
// //   name: string;
// //   price: number;
// //   image: string;
// //   background: string;
// //   discount?: number;
// //   selected?: boolean;
// // }

// // const products: Product[] = [
// //   {
// //     id: 1,
// //     name: "Vamavarti Shankh",
// //     price: 120,
// //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png",
// //     background: "bg-blue-400"
// //   },
// //   {
// //     id: 2,
// //     name: "Moti Shankh",
// //     price: 120,
// //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png",
// //     background: "bg-slate-700",
// //     selected: true
// //   },
// //   {
// //     id: 3,
// //     name: "Ganesha Shankh",
// //     price: 120,
// //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png",
// //     background: "bg-teal-300"
// //   },
// //   {
// //     id: 4,
// //     name: "Pancha Shankh",
// //     price: 120,
// //     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463035/public_assets_shop4/public_assets_shop4_Rectangle%2023.png",
// //     background: "bg-red-500",
// //     discount: 10
// //   }
// // ];

// // function Recentproduct() {
// //   const [activeTab, setActiveTab] = useState('RITUAL KITS');
// //   const [quantity, setQuantity] = useState(1);

// //   const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

// //   const handleQuantityChange = (change: number) => {
// //     setQuantity(Math.max(1, quantity + change));
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white">
// //       {/* Header */}
// //       <div className="text-center py-8 px-4">
// //         <p className="text-sm tracking-wider text-gray-400 mb-4">RECENT PRODUCTS</p>
// //         <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-8">
// //           AOIN POOJA STORE
// //         </h1>
        
// //         <div className="flex justify-center mb-12">
// //           <div className="flex items-center border-b border-gray-600 relative space-x-4">
// //             {tabs.map((tab, index) => (
// //               <div key={tab} className="flex items-center">
// //                 <button
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`px-6 md:px-12 py-3 text-sm tracking-wider transition-all duration-300 ${
// //                     activeTab === tab
// //                       ? 'bg-[#BB9D7B] text-white rounded-full -mb-px'
// //                       : 'text-gray-300 hover:text-white'
// //                   }`}
// //                 >
// //                   {tab}
// //                 </button>

// //                 {/* Vertical line between buttons */}
// //                 {index < tabs.length - 1 && (
// //                   <div className="w-[2px] h-[75px] bg-gray-500 mx-4" />
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Product Carousel */}
// //       <div className="relative px-4 md:px-8 lg:px-16">
// //         {/* Navigation Arrows */}
// //         <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
// //           <ChevronLeft size={20} />
// //         </button>
// //         <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
// //           <ChevronRight size={20} />
// //         </button>

// //         {/* Products Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
// //           {products.map((product) => (
// //             <div key={product.id} className="relative">
// //               {/* Regular Product Card - Only show if not selected */}
// //               {!product.selected && (
// //                 <div className="transition-all duration-300 hover:transform hover:scale-102">
// //                   {/* Discount Badge */}
// //                   {product.discount && (
// //                     <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-10">
// //                       -{product.discount}%
// //                     </div>
// //                   )}

// //                   {/* Product Image */}
// //                   <div className={`${product.background} rounded-2xl overflow-hidden aspect-square mb-4 relative group`}>
// //                     <img
// //                       src={product.image}
// //                       alt={product.name}
// //                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
// //                     />
// //                   </div>

// //                   {/* Product Info */}
// //                   <div className="text-center mb-4">
// //                     <h3 className="text-lg font-medium mb-2">{product.name}</h3>
// //                     <p className="text-gray-400">${product.price}</p>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Expanded Product Card - Only show if selected */}
// //               {product.selected && (
// //                 <div className="transform scale-105 transition-all duration-300">
// //                   {/* Discount Badge */}
// //                   {product.discount && (
// //                     <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-10">
// //                       -{product.discount}%
// //                     </div>
// //                   )}

// //                   {/* Product Image */}
// //                   <div className={`${product.background} rounded-2xl overflow-hidden aspect-square  relative group`}>
// //                     <img
// //                       src={product.image}
// //                       alt={product.name}
// //                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
// //                     />
// //                   </div>

// //                   {/* Expanded Details */}
// //                   <div className="bg-[#212121] border border-[#BB9D7B] rounded-2xl p-3.5">
// //                     <h3 className="text-lg font-medium mb-2 text-center">{product.name}</h3>
// //                     <p className="text-white text-center mb-4">${product.price}</p>
                    
// //                     {/* Color Variants */}
// //                     <div className="flex justify-center mb-6">
// //                       <div className="flex space-x-2">
// //                         <div className="w-3 h-3 bg-black rounded-full"></div>
// //                         <div className="w-3 h-3 bg-white rounded-full border-4 border-white"></div>
// //                         <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
// //                       </div>
// //                     </div>

// //                     {/* Quantity and Add to Cart */}
// //                     <div className="flex items-center justify-center space-x-4">
// //                       <div className="flex items-center space-x-3">
// //                         <button
// //                           onClick={() => handleQuantityChange(-1)}
// //                           className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
// //                         >
// //                           <Minus size={16} />
// //                         </button>
// //                         <span className="w-8 text-center">{quantity}</span>
// //                         <button
// //                           onClick={() => handleQuantityChange(1)}
// //                           className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-700 transition-colors"
// //                         >
// //                           <Plus size={16} />
// //                         </button>
// //                       </div>
// //                       <button className="bg-[#BB9D7B] w-12 h-12 rounded-full flex items-center justify-center transition-colors">
// //                         <ShoppingCart size={20} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // export default Recentproduct;


// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   background: string;
//   discount?: number;
//   selected?: boolean;
// }

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Vamavarti Shankh",
//     price: 120,
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png",
//     background: "bg-blue-400"
//   },
//   {
//     id: 2,
//     name: "Moti Shankh",
//     price: 120,
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png",
//     background: "bg-slate-700",
//     selected: true
//   },
//   {
//     id: 3,
//     name: "Ganesha Shankh",
//     price: 120,
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png",
//     background: "bg-teal-300"
//   },
//   {
//     id: 4,
//     name: "Pancha Shankh",
//     price: 120,
//     image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463035/public_assets_shop4/public_assets_shop4_Rectangle%2023.png",
//     background: "bg-red-500",
//     discount: 10
//   }
// ];

// function Recentproduct() {
//   const [activeTab, setActiveTab] = useState('RITUAL KITS');
//   const [quantity, setQuantity] = useState(1);

//   const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

//   const handleQuantityChange = (change: number) => {
//     setQuantity(Math.max(1, quantity + change));
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <div className="text-center py-8 px-4">
//         <p className="text-sm tracking-wider text-gray-400 mb-4">RECENT PRODUCTS</p>
//         <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-8">
//           AOIN POOJA STORE
//         </h1>
        
//         <div className="flex justify-center mb-12">
//           <div className="flex items-center border-b border-gray-600 relative space-x-4">
//             {tabs.map((tab, index) => (
//               <div key={tab} className="flex items-center">
//                 <button
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 md:px-12 py-3 text-sm tracking-wider transition-all duration-300 ${
//                     activeTab === tab
//                       ? 'bg-[#BB9D7B] text-white rounded-full -mb-px'
//                       : 'text-gray-300 hover:text-white'
//                   }`}
//                 >
//                   {tab}
//                 </button>

//                 {/* Vertical line between buttons */}
//                 {index < tabs.length - 1 && (
//                   <div className="w-[2px] h-[75px] bg-gray-500 mx-4" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Product Carousel */}
//       <div className="relative px-4 md:px-8 lg:px-16">
//         {/* Navigation Arrows */}
//         <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
//           <ChevronLeft size={20} />
//         </button>
//         <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
//           <ChevronRight size={20} />
//         </button>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {products.map((product) => (
//             <div key={product.id} className="relative">
//               {/* Regular Product Card - Only show if not selected */}
//               {!product.selected && (
//                 <div className="transition-all duration-300 hover:transform hover:scale-102">
//                   {/* Discount Badge */}
//                   {product.discount && (
//                     <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-10">
//                       -{product.discount}%
//                     </div>
//                   )}

//                   {/* Product Image */}
//                   <div className={`${product.background} rounded-2xl overflow-hidden aspect-square mb-4 relative group`}>
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
//                     />
//                   </div>

//                   {/* Product Info */}
//                   <div className="text-center mb-4">
//                     <h3 className="text-lg font-medium mb-2">{product.name}</h3>
//                     <p className="text-gray-400">${product.price}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Expanded Product Card - Only show if selected */}
//               {product.selected && (
//                 <div className="relative transform scale-105 transition-all duration-300">
//                   {/* Discount Badge */}
//                   {product.discount && (
//                     <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-30">
//                       -{product.discount}%
//                     </div>
//                   )}

//                   {/* Product Image */}
//                   <div className={`${product.background} rounded-t-4xl overflow-hidden relative group`} style={{aspectRatio: '1/1.2'}}>
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
//                     />
//                   </div>

//                   {/* Expanded Details Card - Below image */}
//                   <div className="bg-[#212121] backdrop-blur-sm border border-[#BB9D7B] rounded-b-3xl p-4 sm:p-5 md:p-6 shadow-2xl">
//                     <h3 className="text-lg sm:text-xl font-medium mb-2 text-center text-white">{product.name}</h3>
//                     <p className="text-white text-center mb-6 text-base sm:text-lg font-medium">${product.price}</p>
                    
//                     {/* Color Variants */}
//                     <div className="flex justify-center mb-6">
//                       <div className="flex space-x-3">
//                         <div className="w-4 h-4 bg-black rounded-full border-2 border-gray-600"></div>
//                         <div className="w-4 h-4 bg-white rounded-full border-2 border-white ring-2 ring-[#BB9D7B]"></div>
//                         <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-gray-400"></div>
//                       </div>
//                     </div>

//                     {/* Quantity and Add to Cart */}
//                     <div className="flex items-center justify-center space-x-4">
//                       <div className="flex items-center bg-[#212121] rounded-full px-4 py-2 border border-white">
//                         <button
//                           onClick={() => handleQuantityChange(-1)}
//                           className="text-white hover:text-[#BB9D7B] transition-colors px-2"
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="text-white mx-4 min-w-[20px] text-center font-medium">{quantity}</span>
//                         <button
//                           onClick={() => handleQuantityChange(1)}
//                           className="text-white hover:text-[#BB9D7B] transition-colors px-2"
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                       <button className="bg-[#BB9D7B] hover:bg-[#A58B6F] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
//                         <ShoppingCart size={20} className="text-white" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Recentproduct;

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  background: string;
  discount?: number;
  selected?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Vamavarti Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png",
    background: "bg-blue-400"
  },
  {
    id: 2,
    name: "Moti Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png",
    background: "bg-slate-700",
    selected: true
  },
  {
    id: 3,
    name: "Ganesha Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png",
    background: "bg-teal-300"
  },
  {
    id: 4,
    name: "Pancha Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463035/public_assets_shop4/public_assets_shop4_Rectangle%2023.png",
    background: "bg-red-500",
    discount: 10
  }
];

function Recentproduct() {
  const [activeTab, setActiveTab] = useState('RITUAL KITS');
  const [quantity, setQuantity] = useState(1);

  const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <p className="text-sm tracking-wider text-gray-400 mb-4">RECENT PRODUCTS</p>
        <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-8">
          AOIN POOJA STORE
        </h1>
        
        <div className="flex justify-center mb-12">
          <div className="flex items-center border-b border-gray-600 relative space-x-4">
            {tabs.map((tab, index) => (
              <div key={tab} className="flex items-center">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 md:px-12 py-3 text-sm tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#BB9D7B] text-white rounded-full -mb-px'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>

                {/* Vertical line between buttons */}
                {index < tabs.length - 1 && (
                  <div className="w-[2px] h-[75px] bg-gray-500 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Carousel */}
      <div className="relative px-4 md:px-8 lg:px-16">
        {/* Navigation Arrows */}
        {/* <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#BB9D7B] flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronRight size={20} />
        </button> */}
        <button className="hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#BB9D7B] items-center justify-center hover:bg-gray-800 transition-colors">
  <ChevronLeft size={20} />
</button>
<button className="hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 items-center justify-center hover:bg-gray-800 transition-colors">
  <ChevronRight size={20} />
</button>


        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="relative h-[400px] sm:h-[450px] md:h-[500px]">
              {/* Regular Product Card - Only show if not selected */}
              {!product.selected && (
                <div className="h-full flex flex-col transition-all duration-300 hover:transform hover:scale-102">
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-10">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Product Image */}
                  <div className={`${product.background} rounded-2xl overflow-hidden flex-1 relative group`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover  group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-center mt-4 mb-4">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-white">${product.price}</p>
                  </div>
                </div>
              )}

              {/* Expanded Product Card - Only show if selected */}
              {product.selected && (
                <div className="h-full relative transform scale-105 transition-all duration-300">
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-[-1.5rem] right-4 bg-[#BB9D7B] text-white px-3 py-1 rounded-full text-sm z-30">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Product Image */}
                  <div className={`${product.background} rounded-t-3xl overflow-hidden relative group h-[60%]`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Expanded Details Card - Below image */}
                  <div className="bg-[#212121] backdrop-blur-sm border border-[#BB9D7B] rounded-b-3xl p-3 sm:p-4 md:p-5 shadow-2xl h-[40%] flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2 text-center text-white">{product.name}</h3>
                      <p className="text-white text-center mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-medium">${product.price}</p>
                      
                      {/* Color Variants */}
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="flex space-x-2 sm:space-x-3">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#212121] rounded-full border-2 border-gray-600"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 border-white ring-2 ring-[#BB9D7B]"></div>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-500 rounded-full border-2 border-gray-400"></div>
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                      <div className="flex items-center bg-[#212121] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-600">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="text-white hover:text-[#BB9D7B] transition-colors px-1 sm:px-2"
                        >
                          <Minus size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <span className="text-white mx-2 sm:mx-4 min-w-[16px] sm:min-w-[20px] text-center font-medium text-sm sm:text-base">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="text-white hover:text-[#BB9D7B] transition-colors px-1 sm:px-2"
                        >
                          <Plus size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <button className="bg-[#BB9D7B] hover:bg-[#A58B6F] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl">
                        <ShoppingCart size={16} className="sm:w-5 sm:h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recentproduct;