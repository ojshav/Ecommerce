import React from 'react';

const Accessories: React.FC = () => {
  return (
    <section className="relative w-screen h-[60vh] md:h-[80vh]  sm:h-[70vh] lg:h-[1024px]  bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
      
      {/* Top Horizontal Line */}

      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8">

        {/* ACCESSORIES Text */}
        <h1 className="text-[8vw] xs:text-[7vw] sm:text-[6vw] top-[12vw] left-[20vw]  md:left-[20vw] xl:left-[20vw] md:text-[5vw] lg:text-[4vw] xl:text-[72px] font-normal tracking-wider text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-[#C28BF9] to-[#411271] relative text-center leading-none">
          ACCESSORIES
        </h1>

        {/* Models Container */}
        <div className="relative w-full h-full flex items-end justify-center">
          
          {/* Left Model */}
          <div className="absolute left-1 sm:left-4 md:left-8 lg:left-16 xl:left-28 bottom-[28vh] sm:bottom-[32vh] md:bottom-[48vh] lg:bottom-[520px]">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059220/public_assets_shop2/public_assets_shop2_accessories1.svg"
              alt="Left Model"
              className="w-[35vw] sm:w-[40vw] md:w-[25vw] lg:w-[20vw] xl:w-[317px] max-w-[317px] h-auto object-contain animate-shakeXGrow"
            />
          </div>

          {/* Center Model */}
          <div className="absolute left-[24%] -translate-x-1/2 bottom-[8vh] sm:bottom-[12vh] md:bottom-[12vh] lg:bottom-[100px]">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059220/public_assets_shop2/public_assets_shop2_accessories2.svg"
              alt="Center Model"
              className="w-[25vw] sm:w-[27vw] md:w-[18vw] lg:w-[15vw] xl:w-[254px] max-w-[254px] h-auto object-contain animate-shakeY"
            />
          </div>

          {/* Right Model */}
          <div className="absolute left-[60%] sm:left-[65%] md:left-[70%] lg:left-[75%] xl:left-[680px] bottom-[4vh] sm:bottom-[8vh] md:bottom-[10vh] lg:bottom-[50px] -translate-x-1/2">
            <img
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059220/public_assets_shop2/public_assets_shop2_accessories3.svg"
              alt="Right Model"
              className="w-[30vw] sm:w-[32vw] md:w-[22vw] lg:w-[18vw] xl:w-[364px] max-w-[364px] h-[490px] object-contain"
            />
          </div>

          {/* View More Button */}
         
        </div>
      </div>

      {/* Bottom Horizontal Line */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1346px] h-[1px] sm:h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default Accessories;
