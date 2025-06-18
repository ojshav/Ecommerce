import React from 'react';

const Reflection = () => {
  return (
    <div className="w-screen h-screen bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center relative overflow-hidden">

      {/* Central container */}
      <div className="w-[1440px] h-[1024px] relative">

        {/* Gradient Title */}
        <h1 className="absolute top-[100px] left-1/2 -translate-x-1/2 text-[120px] font-bold tracking-wide font-zen text-transparent bg-clip-text bg-gradient-to-b from-[#360063] to-[#7D2AE8] z-10">
          REFLECTIƎN
        </h1>

        {/* Center Circular Image/Video */}
        <div className="absolute top-[260px] left-1/2 -translate-x-1/2 w-[469px] h-[469px] rounded-full overflow-hidden border-[6px] border-black shadow-[6px_-1px_0_0_#B9B9B940]">
        <video src="/assets/videos/Panther.mp4" autoPlay loop muted className="w-full h-full object-cover" />

          {/* Replace above img with <video> if needed */}
        </div>

        {/* Tagline Bottom Right */}
        <div className="absolute bottom-[120px] right-[80px] text-right text-[20px] font-semibold text-lime-300 leading-snug z-10">
          <p>DESIGNED FOR <span className="text-lime-400 font-bold">YOUR</span></p>
          <p className="underline text-lime-400">BEAUTIFUL APPEARANCE</p>
        </div>

        {/* SEE ALL Button */}
        <button className="absolute bottom-[40px] left-1/2 -translate-x-1/2 text-white border border-purple-500 px-8 py-2 font-bold text-sm tracking-wide hover:bg-purple-700 transition z-10">
          SEE ALL
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      </div>
    </div>
  );
};

export default Reflection;
