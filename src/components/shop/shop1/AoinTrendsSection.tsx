import React from 'react';

const AoinTrendsSection = () => {
  return (
    <section className="relative bg-white w-full max-w-[1280px] mx-auto py-12 px-6 md:px-20 overflow-hidden">
      {/* Decorative Corner Lines */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-black" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-black" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-black" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-black" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Image */}
        <div className="w-[150px] md:w-[200px]">
          <img
            src="/assets/images/look1.png"
            alt="Left Item"
            className="w-full object-cover"
          />
        </div>

        {/* Center Text & Button */}
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-serif font-medium leading-tight text-gray-800">
            Discover the trends that resonate with you. Dive into Aoin today.
          </h1>
          <div className="mt-6 flex justify-center md:justify-start">
            <button className="bg-black text-white px-6 py-2 text-sm font-semibold tracking-wide">
              SHOP NOW
            </button>
          </div>

          {/* Bottom Center Image */}
          <div className="mt-6 w-[200px] mx-auto md:mx-0">
            <img
              src="/assets/images/look2.png"
              alt="Center Bottom"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[150px] md:w-[200px]">
          <img
            src="/assets/images/look3.png"
            alt="Right Item"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AoinTrendsSection;
