import React from 'react';

const ExclusiveDeals = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start px-4  pt-6 sm:pt-10 relative">
      
      {/* Header */}
      <div className="w-full flex flex-col items-end  sm:pr-10 md:pr-20 z-10">
        <h1 className="text-6xl sm:text-6xl font-[Corinthia,cursive] font-bold mb-2 mt-2 text-right leading-none">
          <img 
            src="/assets/images/ExclusiveDeals.png" 
            alt="Exclusive Deals" 
            className="w-[550px] sm:w-[280px] md:w-[400px] h-auto mx-auto sm:mx-0"
          />
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-10 md:gap-y-0 md:items-start mt-6 pl-7 sm:mt-10 z-10 relative px-2">

        {/* Floral Illustration */}
        <img
          src="/assets/images/ExclusiveDeals2.png"
          alt="Floral Illustration"
          className="absolute left-1/2 md:left-[40%] top-[-30px] sm:top-[-85px] w-28 sm:w-40 md:w-[267px] transform -translate-x-1/2 pointer-events-none select-none z-20"
        />

        {/* Left Image */}
        <div className="w-full md:w-[54%] flex justify-center md:justify-start">
          <img
            src="/assets/images/ExclusiveDeals1.png"
            alt="Ethnic Glamour Collection"
            className="w-full max-w-[90%] sm:max-w-[500px] md:max-w-[542px] h-auto sm:h-[480px] md:h-[729px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[38%] flex flex-col items-center md:items-start mt-6 md:mt-6 space-y-4 px-2 sm:px-4 md:-ml-6">
          
          {/* Text Section */}
          <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
            <p className="uppercase tracking-widest text-sm text-gray-700">
              A Glamour Collection
            </p>
            <p
              className="text-red-600 font-extrabold text-2xl sm:text-[28px] leading-tight"
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
            className="w-full max-w-[90%] sm:max-w-[400px] md:max-w-[418.67px] h-auto sm:h-[460px] md:h-[628px] object-cover rounded-lg shadow-lg bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
