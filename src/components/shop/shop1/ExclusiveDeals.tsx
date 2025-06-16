import React from 'react';

const ExclusiveDeals = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-2 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-10 relative">
      
      {/* Header */}
      <div className="w-full flex flex-col items-end sm:pr-6 md:pr-10 lg:pr-20 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-[Corinthia,cursive] font-bold mb-2 mt-2 text-right leading-none">
          <img 
            src="/assets/images/ExclusiveDeals.png" 
            alt="Exclusive Deals" 
            className="w-[280px] sm:w-[350px] md:w-[400px] lg:w-[400px] h-auto mx-auto sm:mx-0"
          />
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-6 sm:gap-y-8 md:gap-y-0 md:items-start mt-4 sm:mt-6 md:mt-8 lg:mt-10 z-10 relative px-2 sm:px-4 md:px-6">

        {/* Floral Illustration */}
        <img
          src="/assets/images/ExclusiveDeals2.png"
          alt="Floral Illustration"
          className="absolute left-1/2 md:left-[40%] top-[-20px] sm:top-[-40px] md:top-[-60px] lg:top-[-85px] w-20 sm:w-28 md:w-40 lg:w-[267px] transform -translate-x-1/2 pointer-events-none select-none z-40"
        />
        {/* Left Image */}
        <div className="w-full md:w-[54%] flex justify-center md:justify-start">
          <img
            src="/assets/images/ExclusiveDeals1.png"
            alt="Ethnic Glamour Collection"
            className="w-full max-w-[85%] sm:max-w-[90%] md:max-w-[542px] h-auto sm:h-[400px] md:h-[550px] lg:h-[729px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[38%] flex flex-col items-center md:items-start mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 px-2 sm:px-4 md:-ml-4 lg:-ml-6">
          
          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
            <p className="uppercase tracking-widest text-xs sm:text-sm md:text-base text-gray-700">
              A Glamour Collection
            </p>
            <p
              className="text-red-600 font-extrabold text-xl sm:text-2xl md:text-[28px] leading-tight"
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
            className="w-full max-w-[85%] sm:max-w-[90%] md:max-w-[95%] h-auto sm:h-[400px] md:h-[550px] lg:h-[628px] object-cover rounded-lg shadow-lg bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
