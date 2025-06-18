import React from 'react';

const Bottom: React.FC = () => {
  return (
    <section
      className="relative w-screen h-[1024px] bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden"
    >

      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4">

        {/* T-SHIRTS Text */}
        <h1 className="text-[96px] sm:text-[96px] bottom-[260px] left-[300px] font-normal  text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 relative">
        BOTTOMS
          {/* Drip effect mimic using bottom shadows */}
          
        </h1>

        {/* Models Layer */}
        <div className="absolute left-32 bottom-[250px]">
          <img
            src="/assets/shop2/bottom1.png"
            alt="Left Model"
            className="w-[433px] h-[577px] object-contain animate-shakeX"
          />
        </div>

        <div className="absolute left-[700px] bottom-[50px]  translate-x-[-50%]">
          <img
            src="/assets/shop2/bottom2.png"
            alt="Right Model"
            className="w-[308px] h-[547px] object-contain animate-shakeY"
          />
        </div>

        {/* View More Button */}
        <div className="absolute bottom-[330px] right-[360px]">
          <button className="px-6 font-quicksand w-[199px] h-[58px]  text-[28px] font-semibold text-[#AB3DFF] border border-[#423780] hover:bg-purple-500/20 transition-all duration-300">
            View More
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />

    </section>
  );
};

export default Bottom;
