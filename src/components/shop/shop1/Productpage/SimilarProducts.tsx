import React, { useState } from 'react';
const products = [
  {
    title: 'NAUTICAL LOGO COAT',
    price: '$450',
    colors: ['bg-yellow-400', 'bg-pink-300', 'bg-yellow-300'],
    imgSrc: '/assets/images/sp1.jpg', // Replace with your image paths
  },
  {
    title: 'BEIGE STRAPLESS TOP',
    price: '$299',
    colors: ['bg-yellow-400', 'bg-pink-300', 'bg-yellow-300'],
    imgSrc: '/assets/images/sp2.jpg',
  },
  {
    title: 'BLUE EMBROIDERED COAT',
    price: '$540',
    colors: ['bg-yellow-400', 'bg-pink-300', 'bg-yellow-300'],
    imgSrc: '/assets/images/sp3.jpg',
  },
];

const SimilarProducts: React.FC = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822755/public_assets_shop1_LP/public_assets_images_arrow-right1.svg";
  const rightArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";
  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-[42px] font-bold font-playfair text-black leading-tight">
          Similar <em className="italic font-light font-playfair">products</em>
        </h2>
        <div className="flex space-x-4 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-12 h-12 object-contain  group-hover:w-24 group-hover:h-24"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
            >
              <img 
                src={rightHovered ? rightArrowHover : rightArrow}
                alt="Arrow Right"
                className="w-12 h-12 object-contain  group-hover:w-24 group-hover:h-24"
              />
            </button>
          </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, idx) => (
          <div key={idx} className="group">
            {/* Image */}
            <div className="bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 aspect-[4/5] relative">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Info */}
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-archivio text-black uppercase tracking-wide">
                  {product.title}
                </h3>
                <div className="text-lg sm:text-xl md:text-[24px] font-semibold text-[#F48063]">
                  {product.price}
                </div>
              </div>
              <div className="flex gap-1 md:gap-2">
                {product.colors.map((color, colorIdx) => (
                  <div
                    key={colorIdx}
                    className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-gray-200 ${color}`}
                  ></div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
