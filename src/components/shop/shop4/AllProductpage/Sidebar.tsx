// import React, { useState } from 'react';

// const Sidebar: React.FC = () => {
//   const [priceRange, setPriceRange] = useState([200, 7500]);
//   const [inStock, setInStock] = useState(false);
//   const [outOfStock, setOutOfStock] = useState(false);

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     setPriceRange([200, value]);
//   };

//   return (
//     <div className="bg-[#161616] p-6 rounded-lg">
//       {/* Category Navigation */}
//       <div className="mb-8">
//         <div className="flex flex-wrap gap-2">
//           <button className="px-4 py-2  text-white text-sm  hover:bg-gray-600 transition-colors">
//             Home/pooja items
//           </button>
//           <button className="px-4 py-2 border border-white text-[#895200] text-sm  rounded hover:bg-gray-700 transition-colors ">
//             Clear Filters
//           </button>
//         </div>
//           <div className="border-t border-gray-50 mt-4"></div>
//       </div>
//       {/* Price Filter */}
//       <div className="mb-8">
//         <h3 className="text-white font-medium mb-4">Filter By Price</h3>
//         <div className="mb-4">
//           <input
//             type="range"
//             min="200"
//             max="7500"
//             value={priceRange[1]}
//             onChange={handlePriceChange}
//             className="w-full h-2 bg-[#895200] rounded-lg appearance-none cursor-pointer slider"
//           />
//         </div>
//         <div className="text-white text-sm mb-4">
//           Price: ${priceRange[0]} — ${priceRange[1]}
//         </div>
//         <button className="w-full bg-black text-white py-2 px-4 rounded font-medium hover:bg-yellow-500 transition-colors font-future">
//           FILTER
//         </button>
//       </div>
//       {/* Availability Filter */}
//       <div>
//         <h3 className="text-white font-medium mb-4">Availability</h3>
//         <div className="space-y-3">
//           <label className="flex items-center text-gray-300 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={inStock}
//               onChange={(e) => setInStock(e.target.checked)}
//               className="mr-3 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
//             />
//             In Stock
//           </label>
//           <div className="border-t border-gray-50"></div>
//           <label className="flex items-center text-gray-300 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={outOfStock}
//               onChange={(e) => setOutOfStock(e.target.checked)}
//               className="mr-3 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
//             />
//             Out of Stock
//           </label>
//           <div className="border-t border-gray-50"></div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Sidebar;


import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [priceRange, setPriceRange] = useState([280, 7500]);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([280, value]);
  };

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen w-full max-w-sm mx-auto lg:mx-0">
      <div className="p-4 sm:p-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <span className="text-gray-300 text-sm sm:text-base">Home/Pooja Items</span>
            <button className="border border-white text-[#895200] px-4 py-2 rounded text-sm hover:bg-[#BB9D7B] hover:text-white transition-colors self-start">
              Clear Filters
            </button>
          </div>
          <div className="w-full h-px bg-white"></div>
        </div>

        {/* Price Filter Section */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-white text-lg sm:text-xl font-medium mb-6">Filter By Price</h3>
          {/* Custom Range Slider */}
          <div className="mb-6 relative">
            <div className="relative">
              <input
                type="range"
                min="280"
                max="7500"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer price-slider"
                style={{
                  background: `linear-gradient(to right, #BB9D7B 0%, #BB9D7B ${((priceRange[1] - 280) / (7500 - 280)) * 100}%, #374151 ${((priceRange[1] - 280) / (7500 - 280)) * 100}%, #374151 100%)`
                }}
              />
              {/* Slider thumbs */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#BB9D7B] rounded-full border-2 border-white shadow-lg pointer-events-none"
                style={{ left: `${((priceRange[0] - 280) / (7500 - 280)) * 100}%`, marginLeft: '-10px' }}
              ></div>
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#BB9D7B] rounded-full border-2 border-white shadow-lg pointer-events-none"
                style={{ left: `${((priceRange[1] - 280) / (7500 - 280)) * 100}%`, marginLeft: '-10px' }}
              ></div>
            </div>
          </div>

          {/* Price Display */}
          <div className="text-gray-300 text-sm sm:text-base mb-6">
            Price: ${priceRange[0]} — ${priceRange[1]}
          </div>

          {/* Filter Button */}
          <button className="w-full bg-black text-white py-3 px-4 text-sm font-medium tracking-wider hover:bg-gray-900 transition-colors border border-gray-800">
            FILTER
          </button>
        </div>

        {/* Availability Section */}
        <div>
          <h3 className="text-white text-lg sm:text-xl font-medium mb-6">Availability</h3>
          
          <div className="space-y-4">
            {/* In Stock Option */}
            <div>
              <label className="flex items-center text-gray-300 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 border-white rounded-sm mr-3 flex items-center justify-center transition-colors ${
                    inStock ? 'bg-[#BB9D7B] border-[#BB9D7B]' : 'bg-transparent'
                  }`}>
                    {inStock && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm sm:text-base group-hover:text-white text-white transition-colors">In Stock</span>
              </label>
              <div className="w-full h-px bg-white mt-4"></div>
            </div>

            {/* Out of Stock Option */}
            <div>
              <label className="flex items-center text-white cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={outOfStock}
                    onChange={(e) => setOutOfStock(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 border-white rounded-sm mr-3 flex items-center justify-center transition-colors ${
                    outOfStock ? 'bg-[#BB9D7B] border-[#BB9D7B]' : 'bg-transparent'
                  }`}>
                    {outOfStock && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm sm:text-base group-hover:text-white text-white transition-colors">Out Of Stock</span>
              </label>
              <div className="w-full h-px bg-white mt-4"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .price-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #BB9D7B;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .price-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #BB9D7B;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .price-slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }

        .price-slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;