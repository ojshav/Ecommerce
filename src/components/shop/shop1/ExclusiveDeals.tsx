import React from 'react';

const ExclusiveDeals = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto bg-white flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 lg:pt-12 relative">
      
      {/* Header */}
      <div className="w-full flex flex-col items-center md:items-end sm:pr-1 md:pr-1 lg:pr-1 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-[Corinthia,cursive] font-bold mb-2 mt-2 text-center md:text-right leading-none">
          <img 
            src="/assets/images/ExclusiveDeals.png" 
            alt="Exclusive Deals" 
            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
          />
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-6 sm:gap-y-8 md:gap-y-0 md:items-start mt-6 sm:mt-8 md:mt-10 lg:mt-12 z-10 relative px-2 sm:px-4 md:px-6">

        {/* Floral Illustration */}
        <img
          src="/assets/images/ExclusiveDeals2.png"
          alt="Floral Illustration"
          className="absolute left-1/2 md:left-[45%] top-[-15px] sm:top-[-30px] md:top-[-45px] lg:top-[-60px] w-16 sm:w-24 md:w-32 lg:w-[267px] transform -translate-x-1/2 pointer-events-none select-none z-40"
        />

        {/* Left Image */}
        <div className="w-full md:w-[54%] flex justify-center md:justify-start">
          <img
            src="/assets/images/ExclusiveDeals1.png"
            alt="Ethnic Glamour Collection"
            className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[542px] h-[250px] sm:h-[450px] md:h-[450px] lg:h-[729px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[38%] flex flex-col items-center md:items-start mt-6 sm:mt-8 md:mt-0 space-y-4 sm:space-y-5 px-2 sm:px-4 md:-ml-4 lg:-ml-6">
          
          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <p className="uppercase tracking-widest text-xs sm:text-sm md:text-base text-gray-700">
              A Glamour Collection
            </p>
            <p
              className="text-red-600 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-tight"
              style={{
                fontFamily: "'Nosifer', cursive",
                letterSpacing: '0',
              }}
            >
              STARTING @499/-
            </p>
          </div>

          {/* Right Image */}
          <img
            src="/assets/images/ExclusiveDeals3.png"
            alt="Modern Printed Outfit"
            className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[95%] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[628px] object-cover rounded-lg shadow-lg bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
