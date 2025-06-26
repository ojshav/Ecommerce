import React from 'react';

const Tshirt: React.FC = () => {
  return (
    <section
      className="relative w-screen h-[1024px] bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden"
    >
<div className="absolute top-[46px] left-1/2 font-extrabold -translate-x-1/2 w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />

      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4">

        {/* T-SHIRTS Text */}
        <h1 className="text-[96px] sm:text-[96px] bottom-[170px] left-[264px] font-normal tracking-wider text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 relative">
          T-SHIRTS
          {/* Drip effect mimic using bottom shadows */}
          
        </h1>

        {/* Models Layer */}
        <div className="absolute left-16 bottom-[280px]">
          <img
            src="/assets/shop2/tshirt1.png"
            alt="Left Model"
            className="w-[408px] h-[612px] object-contain animate-shakeXGrow"
          />
        </div>

        <div className="absolute left-[600px] bottom-[100px]  translate-x-[-50%]">
          <img
            src="/assets/shop2/tshirt2.png"
            alt="Right Model"
            className="w-[339px] h-[453px] object-contain animate-shakeY"
          />
        </div>

        {/* View More Button */}
        <div className="absolute bottom-[300px] right-[380px]">
          <button className="px-6 font-quicksand w-[199px] h-[58px]  text-[28px] font-semibold text-[#AB3DFF] border border-[#423780] hover:bg-purple-500/20 transition-all duration-300">
            View More
          </button>
        </div>
        
      </div>
      {/* Bottom horizontal line */}
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />

    </section>
  );
};

export default Tshirt;
