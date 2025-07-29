// import { useState } from 'react';
// import { ArrowLeft,  Plus, Minus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
// import HomeThreeScreen from './HomeThreeScreen';
// import Footer from '../../Footer';
// import Header from '../../ScreenTwo/Components/Header';
// import Hero from '../../ScreenTwo/Components/Hero';
// // import Footer from './components/Footer';

// function ShopFourScreenThreeLandingPage() {
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('L');
//   const [expandedSections, setExpandedSections] = useState<string[]>(['specifications', 'about']);

  

//   const sizes = ['S', 'M', 'L'];

//   const incrementQuantity = () => setQuantity(prev => prev + 1);
//   const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

//   const toggleSection = (sectionName: string) => {
//     setExpandedSections(prev => 
//       prev.includes(sectionName) 
//         ? prev.filter(s => s !== sectionName)
//         : [...prev, sectionName]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black text-white">
//         <Header />
//         <Hero />
//       <div className="border-b border-gray-800 p-4">
//         <button className="flex items-center gap-2 text-white hover:text-white transition-colors">
//           <ArrowLeft className="w-5 h-5" />
//           Back to: Diya Collection
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left Side - Image Gallery */}
//         <div className="w-full lg:w-1/2 bg-black">
//           <div className="sticky top-0 p-6">
//             {/* Main Product Image */}
//             <div className="mb-4">
//               <img
//                 src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462984/public_assets_shop4/public_assets_shop4_13.png"
//                 alt="Pure Brass Aarti Akhand Diya"
//                 className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
//               />
//             </div>
//              <div className="mb-4">
//               <img
//                 src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462986/public_assets_shop4/public_assets_shop4_14.png"
//                 alt="Pure Brass Aarti Akhand Diya"
//                 className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
//               />
//             </div>
//              <div className="mb-4">
//               <img
//                 src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462987/public_assets_shop4/public_assets_shop4_15.png"
//                 alt="Pure Brass Aarti Akhand Diya"
//                 className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
//               />
//             </div>
            
//             {/* Thumbnail Images */}
//             {/* <div className="flex gap-3 justify-center lg:justify-start">
//               {productImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
//                     selectedImageIndex === index 
//                       ? 'border-orange-400' 
//                       : 'border-gray-700 hover:border-gray-500'
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`Product view ${index + 2}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div> */}
//           </div>
//         </div>

//         {/* Right Side - Product Details */}
//         <div className="w-full lg:w-1/2 p-6 lg:p-8 space-y-6">
//           {/* Product Category */}
//           <div className="text-white text-sm font-medium">
//             Metal Diya
//           </div>

//           {/* Product Title */}
//           <h1 className="text-2xl lg:text-3xl font-normal leading-tight">
//             Pure Brass Aarti Akhand Diya With Ring Holder
//           </h1>

//           {/* Pricing */}
//           <div className="flex items-center gap-4">
//             <span className="text-white line-through text-lg">Actual Price $200.00</span>
//             <span className="text-xl font-medium">Our price</span>
//             <span className="text-xl font-medium text-[#00FF2F]">$120.00</span>

//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//            <img src="/Group.png" alt=""/>
//             <span className="text-white text-sm">( 1 Customer review )</span>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-800"></div>

//           {/* Size Selection */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-4 flex-wrap">
//               <span className="text-sm">Size :</span>
//               <div className="flex gap-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`w-10 h-10  rounded transition-all text-sm ${
//                       selectedSize === size
//                         ? 'border-[#BB9D7B] bg-[#BB9D7B] text-white'
//                         : 'border-gray-600 border-2 hover:border-gray-400 bg-[#515151]'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <button className="text-white text-sm underline hover:text-orange-300 transition-colors">
//                 File Size Chart
//               </button>
//             </div>
//           </div>

//           {/* Countdown Timer */}
//           <div className="text-sm">
//             <span className="text-gray-300">Hurry up! Deals end up :</span>
//             <div className="flex items-center gap-1 mt-2 flex-wrap">
//               <span className="px-2 py-1 rounded text-xs">300D</span>
//               <span>:</span>
//               <span className="px-2 py-1 rounded text-xs">14Hours</span>
//               <span>:</span>
//               <span className="px-2 py-1 rounded text-xs">35 Mins</span>
//               <span>:</span>
//               <span className="px-2 py-1 rounded text-xs">23 Sec</span>
//             </div>
//           </div>

//           {/* Quantity and Actions */}
//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="flex items-center border border-gray-500 rounded bg-[#2B2B2B]">
//               <button
//                 onClick={decrementQuantity}
//                 className="p-2 hover:bg-gray-800 transition-colors  border-r min-h-[2.5rem]"
//               >
//                 <Minus className="w-4 h-4"/>
//               </button>
//               <span className="px-4 py-2 min-w-[3rem] text-center  border-r">{quantity}</span>
//               <button
//                 onClick={incrementQuantity}
//                 className="p-2 hover:bg-gray-800 transition-colors "
//               >
//                 <Plus className="w-4 h-4"/>
//               </button>
//             </div>
//             <button className="bg-[#BB9D7B] text-white px-4 py-4 rounded-full  flex items-center gap-2 transition-colors">
//               <ShoppingCart className="w-4 h-4" />
//             </button>
//             <button className="p-4 border border-gray-600 bg-[#515151] rounded hover:bg-gray-800 transition-colors">
//               <img className="w-5 h-4" src="/Vector (3).png" alt=""/>
//             </button>
//             {/* <button className="p-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
//               <Share2 className="w-5 h-5" />
//             </button> */}
//           </div>
//           {/* Shipping Info */}
//           <div className="text-sm text-gray-300 space-y-1">
//             <p>Worldwide Shipping in all order $200, Delivery in 2-5 working days</p>
//             <button className="text-white hover:text-orange-300 transition-colors">
//               Shipping & Return
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-800"></div>

//           {/* Specifications Section */}
//           <div className="space-y-4">
//             <button
//               onClick={() => toggleSection('specifications')}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <h3 className="text-lg font-medium">Specifications:</h3>
//               {expandedSections.includes('specifications') ? (
//                 <ChevronUp className="w-5 h-5 text-white" />
//               ) : (
//                 <ChevronDown className="w-5 h-5 text-white" />
//               )}
//             </button>
            
//             {expandedSections.includes('specifications') && (
//               <div className="space-y-2 text-gray-300 text-sm pl-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                   <span>Pure Brass Aarti Akhand Diya</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                   <span>Made with Virgin Quality of Brass</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                   <span>Small: Height: 4.4cm, Length: 8.2cm</span>
//                 </div>
//               <div className="border-t border-gray-800"></div>
//               </div>
              
//             )}
//           </div>

//           {/* About The Ring Section */}
//           <div className="space-y-4">
//             <button
//               onClick={() => toggleSection('about')}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <h3 className="text-lg font-medium">About The Ring:</h3>
//               {expandedSections.includes('about') ? (
//                 <ChevronUp className="w-5 h-5 text-white" />
//               ) : (
//                 <ChevronDown className="w-5 h-5 text-white" />
//               )}
//             </button>
            
//             {expandedSections.includes('about') && (
//               <div className="space-y-4 text-gray-300 text-sm">
//                 <p className="leading-relaxed">
//                   Diyas are an essential part of Diwali decoration. This is beautiful Page Rank 1 
//                   product.Considering this we come with the beautiful range of Diwali Collections. 
//                   You can decor your home on Diwali festival with Diya Tech-light holders, oil lamp, 
//                   earthen Dil / diya, traditional diya, natural diya, colorful diya, designer diya, clay 
//                   diya, terracotta diya, plain diya, stone diya
//                 </p>
                
//                 <div className="space-y-2 pl-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                     <span>Free shipping for orders $75.00 USD+</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                     <span>2-year warranty</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                     <span>30-day returns</span>
//                   </div>
//                 </div>
//                 <div className="border-t border-gray-800"></div>
//               </div>
//             )}
//           </div>

//           {/* Additional Details Section */}
//           <div className="space-y-4">
//             <button
//               onClick={() => toggleSection('details')}
//               className="flex items-center justify-between w-full text-left"
//             >
//               <h3 className="text-lg font-medium">Additional Details</h3>
//               {expandedSections.includes('details') ? (
//                 <ChevronUp className="w-5 h-5 text-white" />
//               ) : (
//                 <ChevronDown className="w-5 h-5 text-white" />
//               )}
//             </button>
            
//             {expandedSections.includes('details') && (
//               <div className="text-gray-300 text-sm">
//                 <p>Additional product details and care instructions would appear here.</p>
//               </div>
//             )}
//           </div>
//           <div className="border-t border-gray-800"></div>
//         </div>
        
//       </div>
      
//       <HomeThreeScreen/>  
//       <Footer/>
//     </div>
//   );
// }
// export default ShopFourScreenThreeLandingPage;



import { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import HomeThreeScreen from './HomeThreeScreen';
import Header from '../../ScreenTwo/Components/Header';
import Hero from '../../ScreenTwo/Components/Hero';
import Footer from '../../Footer';

function ShopFourScreenThreeLandingPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [expandedSections, setExpandedSections] = useState(['specifications', 'about']);

  const sizes = ['S', 'M', 'L'];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
         <Header/>
         <Hero/>
      <div className="border-b border-gray-800 px-4 py-3 md:px-6 md:py-4">
        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-sm md:text-base">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back to: Diya Collection
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Side - Image Gallery */}
        <div className="w-full lg:w-1/2 bg-black">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Main Product Images */}
            <div className="space-y-4 md:space-y-6">
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462984/public_assets_shop4/public_assets_shop4_13.png"
                alt="Pure Brass Aarti Akhand Diya"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] object-cover rounded-lg"
              />
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462986/public_assets_shop4/public_assets_shop4_14.png"
                alt="Pure Brass Aarti Akhand Diya"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] object-cover rounded-lg"
              />
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462987/public_assets_shop4/public_assets_shop4_15.png"
                alt="Pure Brass Aarti Akhand Diya"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          {/* Product Category */}
          <div className="text-gray-300 text-xs md:text-sm font-medium tracking-wide">
            Metal Diya
          </div>

          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light leading-tight text-white">
            Pure Brass Aarti Akhand Diya With Ring Holder
          </h1>

          {/* Pricing */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-gray-400 line-through text-sm md:text-base">Actual Price $200.00</span>
            <span className="text-sm md:text-base text-white">Our price</span>
            <span className="text-lg md:text-xl font-medium text-[#00FF2F]">$120.00</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm md:text-base">
              ★★★★★
            </div>
            <span className="text-gray-400 text-xs md:text-sm">( 1 Customer review )</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <span className="text-sm md:text-base text-white">Size :</span>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded text-xs md:text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-2 border-[#BB9D7B] bg-[#BB9D7B] text-white'
                        : 'border-2 border-gray-600 bg-[#515151] text-white hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-white text-xs md:text-sm underline hover:text-gray-300 transition-colors">
                File Size Chart
              </button>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-2">
            <span className="text-gray-300 text-xs md:text-sm">Hurry up! Deals end up :</span>
            <div className="flex items-center gap-1 text-xs md:text-sm">
              <span className="text-white">300D</span>
              <span className="text-gray-400">:</span>
              <span className="text-white">14Hours</span>
              <span className="text-gray-400">:</span>
              <span className="text-white">35 Mins</span>
              <span className="text-gray-400">:</span>
              <span className="text-white">23 Sec</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center border border-gray-600 rounded bg-[#2B2B2B] overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white border-r border-gray-600"
              >
                <Minus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
              <span className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-white bg-[#2B2B2B] border-r border-gray-600 min-w-[2.5rem] md:min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 md:p-3 hover:bg-gray-700 transition-colors text-white"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4"/>
              </button>
            </div>
            
            <button className="bg-[#BB9D7B] hover:bg-[#a8896a] text-white p-2 md:p-3 rounded-full transition-colors">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            
            <button className="p-2 md:p-3 border border-gray-600 bg-[#515151] hover:bg-gray-700 rounded transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="text-xs md:text-sm text-gray-300 space-y-1">
            <p>Worldwide Shipping in all order $200, Delivery in 2-5 working days</p>
            <button className="text-white hover:text-gray-300 transition-colors underline">
              Shipping & Return
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Specifications Section */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => toggleSection('specifications')}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-base md:text-lg font-medium text-white">Specifications:</h3>
              {expandedSections.includes('specifications') ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              )}
            </button>
            
            {expandedSections.includes('specifications') && (
              <div className="space-y-2 md:space-y-3 text-gray-300 text-xs md:text-sm pl-0">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Pure Brass Aarti Akhand Diya</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Made with Virgin Quality of Brass</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Small: Height: 4.4cm, Length: 8.2cm</span>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* About The Ring Section */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-base md:text-lg font-medium text-white">About The Ring:</h3>
              {expandedSections.includes('about') ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              )}
            </button>
            
            {expandedSections.includes('about') && (
              <div className="space-y-3 md:space-y-4 text-gray-300 text-xs md:text-sm">
                <p className="leading-relaxed">
                  Diyas are an essential part of Diwali decoration. This is beautiful Page Rank 1 
                  product.Considering this we come with the beautiful range of Diwali Collections. 
                  You can decor your home on Diwali festival with Diya Tech-light holders, oil lamp, 
                  earthen Dil / diya, traditional diya, natural diya, colorful diya, designer diya, clay 
                  diya, terracotta diya, plain diya, stone diya
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Free shipping for orders $75.00 USD+</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>2-year warranty</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>30-day returns</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700"></div>

          {/* Additional Details Section */}
          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => toggleSection('details')}
              className="flex items-center justify-between w-full text-left group"
            >
              <h3 className="text-base md:text-lg font-medium text-white">Additional Details</h3>
              {expandedSections.includes('details') ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-gray-300" />
              )}
            </button>
            
            {expandedSections.includes('details') && (
              <div className="text-gray-300 text-xs md:text-sm">
                <p>Additional product details and care instructions would appear here.</p>
              </div>
            )}
          </div>

          {/* Final Divider */}
          <div className="border-t border-gray-700"></div>
        </div>
      </div>
           <HomeThreeScreen/>  
     <Footer/>
    </div>
  );
}

export default ShopFourScreenThreeLandingPage;