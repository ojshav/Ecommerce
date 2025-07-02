import React from 'react';
import Image1 from '/src/assets/Shop3/Component4/Image1.svg';

const SydneyCity: React.FC = () => {
  return (
    <section className="relative min-h-[800px] sm:h-[1000px] mx-auto lg:h-[1100px] w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image inside the bigger section */}
      <img
        src={Image1}
        alt="Sydney City Fashion"
        width={1400}
        height={750}
        className="absolute left-1/2 top-0 w-full sm:w-[1200px] lg:w-[1400px] h-[500px] sm:h-[600px] lg:h-[750px] -translate-x-1/2 object-cover object-top opacity-80 z-0"
      />
      {/* Inner Content Div */}
      <div className="relative w-full sm:w-[1200px] lg:w-[1400px] h-[700px] sm:h-[800px] lg:h-[960px] flex flex-col justify-start z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b z-10" />

        {/* Coordinates and Location Overlay on Image */}
        <span className="absolute left-4 sm:left-6 lg:left-10 top-[-60px] sm:top-[-80px] lg:top-[-2px] bg-opacity-60 text-white text-[10px] sm:text-xs font-bold tracking-wide px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full z-20 pointer-events-none">
          WE ARE READY TO HELP YOU, FIND OUR LOCATION HERE
        </span>
        <span className="absolute right-4 sm:right-6 lg:right-10 top-[-60px] sm:top-[-80px] lg:top-[-2px] bg-opacity-60 text-white text-[10px] sm:text-xs font-bold tracking-wide px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full z-20 pointer-events-none">
          -19.8723854 - 2112 + 0408248
        </span>
        <div className="relative z-20 flex justify-between items-start px-4 sm:px-6 lg:px-10 pt-6">
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-1 flex-col lg:flex-row items-center justify-between mt-20 sm:mt-28 lg:mt-64 px-4 sm:px-6 lg:px-10 h-full">
          {/* Left: Big Heading */}
          <div className="flex-1 flex w-full lg:w-[592px] flex-col lg:ml-8 justify-center">
            <h1 className="text-white font-normal font-bebas text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-[80%] tracking-tight uppercase text-center lg:text-left" >
              SYDNEY CITY:<br />
              INSIDE LOOK<br />
              SUMMER<br />
              FASHION - 2023.
            </h1>
          </div>
          {/* Right: Description and Button */}
          <div className="w-full lg:w-[565px] flex flex-col justify-center items-center lg:items-start mt-6 sm:mt-8 lg:mt-10 lg:-mb-80">
            <div className="bg-transparent text-white text-[14px] sm:text-[15px] lg:text-[16px] font-clash font-bold p-0 mb-4 sm:mb-6 text-center lg:text-left max-w-[500px] lg:max-w-none">
              "SYDNEY CITY: INSIDE LOOK SUMMER FASHION - 2023" IS YOUR ULTIMATE GUIDE TO EMBRACING THE ESSENCE OF SYDNEY SUMMER FASHION STYLE. SO GRAB YOUR SUNNIES AND GET READY TO BE INSPIRED BY THE THRILLING FASHION SHOW SCENE IN ONE OF AUSTRALIA'S MOST ICONIC CITIES.
            </div>
            <button className="border border-white text-white px-6 sm:px-7 lg:px-8 py-2 rounded-full text-[12px] sm:text-[13px] lg:text-[14px] font-bold hover:bg-white hover:text-black transition-all">
              EXPLORE COLLECTION
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-40px] left-0 w-screen z-30">
        <div className="w-[2220px] bg-black py-2 sm:py-3 lg:py-4 px-2 h-[50px] sm:h-[60px] md:h-[80px] lg:h-[100px] flex items-center overflow-x-auto transform rotate-[1.5deg] whitespace-nowrap">
          <span className="text-white text-[16px] sm:text-[20px] md:text-[28px] lg:text-[35px] xl:text-[43px] font-extrabold tracking-wider inline-block min-w-[200%]">
            SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%
          </span>
        </div>
      </div>
    </section>
  );
};

export default SydneyCity;
