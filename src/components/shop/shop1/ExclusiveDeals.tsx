import React from 'react';

const ExclusiveDeals = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:pt-12 relative">
      
      {/* Header */}
      <div className="w-full flex flex-col items-center md:items-end z-10">
        <h1 className="font-[Corinthia,cursive] font-bold mb-2 mt-2 ml-10 text-center md:text-right leading-none">
          <img 
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745120/public_assets_shop1_LP/public_assets_images_ExclusiveDeals.svg" 
            alt="Exclusive Deals" 
            className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[500px] h-auto"
          />
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-6 md:gap-y-0 md:items-start mt-10 sm:mt-8 md:mt-10 lg:mt-12 z-10 relative">

        {/* Floral Illustration */}
        <img
          src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745125/public_assets_shop1_LP/public_assets_images_ExclusiveDeals2.svg"
          alt="Floral Illustration"
          className="absolute left-1/2 md:left-[40%] top-[-15px] sm:top-[-40px] md:top-[-60px] lg:top-[-80px] w-16 sm:w-24 md:w-32 lg:w-[267px] transform -translate-x-1/2 pointer-events-none select-none z-40"
        />

        {/* Left Image */}
        <div className="w-full sm:w-[80%] md:w-[55%] max-w-[524px] aspect-[524/729] overflow-hidden  shadow-lg">
          <img
            src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745122/public_assets_shop1_LP/public_assets_images_ExclusiveDeals1.svg"
            alt="Ethnic Glamour Collection"
            className="w-[524px] h-[729px] object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[44%] flex flex-col items-center md:items-start mt-2 md:mt-5 space-y-4 px-2 sm:pr-20">
          
          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <p
              className="text-right text-[#222] font-[Poppins] text-[20px] font-medium leading-[38px] tracking-[0.375em] not-italic"
            >
              A Glamour Collection
            </p>
            <p
              className="text-red-600 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-tight"
              style={{
                fontFamily: "'Nosifer', cursive",
              }}
            >
              STARTING @499/-
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full sm:w-[80%] md:w-[90%] max-w-[418px] aspect-[418/628] overflow-hidden shadow-lg relative top-3">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745128/public_assets_shop1_LP/public_assets_images_ExclusiveDeals3.svg"
              alt="Modern Printed Outfit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
