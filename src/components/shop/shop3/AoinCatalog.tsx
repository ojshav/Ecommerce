import React from 'react';

const products = [
  {
    name: 'HERAHEUR SHOES',
    price: '$43',
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component5_Image1.svg",
  },
  {
    name: 'HERAHEUR BOTTOMS',
    price: '$43',
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component5_Image2.svg",
  },
  {
    name: 'HERAHEUR JACKETS',
    price: '$43',
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component5_Image3.svg",
  },
];

const AoinCatalog: React.FC = () => {
  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center py-10 px-2">
      <div className="w-full min-w-[100vw] bg-[#d4ff00] py-2 h-[60px] sm:h-[80px] md:h-[100px] px-2 mb-16 sm:mb-24 md:mb-32 flex items-center transform rotate-[-1.5deg] -mt-6 overflow-x-auto whitespace-nowrap">
        <span className="text-black text-[22px] sm:text-[32px] md:text-[43px] font-extrabold tracking-wider inline-block min-w-[200%] animate-marquee-pingpong">
          SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80% SHOP NOW!  DISCOUNT UP TO 80% 
        </span>
      </div>
      <h1 className="text-white text-center font-semibold uppercase text-[32px] sm:text-[40px] md:text-[64px] lg:text-[104px] leading-none mb-8 sm:mb-12 tracking-normal font-bebas">
        Best Our Aoin Catalog.
      </h1>
      <div className="flex flex-col md:flex-row md:gap-6 gap-4 w-full max-w-[1329px] justify-center items-stretch pb-4 md:pb-0">
        {products.map((product) => (
          <div
            key={product.name}
            className="rounded-3xl flex flex-col justify-between shadow-lg overflow-hidden w-full md:w-[429px] max-w-[95vw] mx-auto md:h-[549px] "
          >
            <img
              src={product.image}
              alt={product.name}
              width={427}
              height={500}
              className="object-cover w-full h-[55vw] sm:h-[300px] md:h-[500px] max-h-[500px]"
            />
            <div className="flex justify-between items-center py-3 sm:py-5 px-1 sm:px-1">
              <span className="text-white font-bold font-alexandria text-base sm:text-lg md:text-[19px] tracking-wide ">
                {product.name}
              </span>
              <span className="text-white font-extrabold text-base sm:text-lg md:text-[22px] font-clash">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AoinCatalog;
