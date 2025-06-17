import React from 'react';

const Reflection = () => {
  return (
    <div className="w-screen h-screen bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center relative overflow-hidden">
      
      {/* Inner layout wrapper (1440x1024 fixed) */}
      <div className="w-[1440px] h-[1024px] relative text-white">

        {/* Title */}
        <h1
          className="absolute top-[198px] left-[63px] 
                     w-[1314px] h-[108px]
                     text-[154px] leading-[120px] font-bold 
                     text-transparent bg-clip-text 
                     bg-gradient-to-b from-[#17002C] to-[#4D0092] 
                     font-zen tracking-normal z-10">
          REFLECTION
        </h1>

        {/* Circular video */}
        <div className="absolute top-[260px] left-[485px] w-[469px] h-[520px] rounded-full overflow-hidden border-8 border-black z-10 shadow-xl">
          <video
            src="/assets/videos/Panther.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tagline */}
        <div className="absolute bottom-28 right-64 text-right  text-[28px] font-semibold text-lime-400 z-10 leading-snug">
          <p>DESIGNED FOR</p>
          <p className="underline">YOUR BEAUTIFUL</p>
          <p>APPEARANCE</p>
        </div>

        {/* Button */}
        <button className="absolute bottom-10 justify-center text-center right-10 px-6 py-2 border border-purple-500 text-white font-bold text-sm tracking-wider hover:bg-purple-700 transition-all z-10">
          SEE ALL
        </button>

        {/* Dark overlay inside layout */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      </div>
    </div>
  );
};

export default Reflection;
