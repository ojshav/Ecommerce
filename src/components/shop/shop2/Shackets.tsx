import React from 'react';

const Shackets: React.FC = () => {
  return (
    <section
      className="relative w-screen h-[1024px] bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden"
    >

      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4">

        {/* T-SHIRTS Text */}
        <h1 className="text-[96px] sm:text-[96px] bottom-[280px] left-[300px] font-normal  text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 relative">
        Shackets
          {/* Drip effect mimic using bottom shadows */}
          
        </h1>

        {/* Models Layer */}
        <div className="absolute left-24 bottom-[250px]">
          <img
            src="/assets/shop2/shackets1.png"
            alt="Left Model"
            className="w-[472px] h-[582px] object-contain animate-shakeY"
          />
        </div>

        <div className="absolute left-[680px] bottom-[55px]  translate-x-[-50%]">
          <img
            src="/assets/shop2/shackets2.png"
            alt="Right Model"
            className="w-[317px] h-[421px] object-contain animate-shakeXGrow"
          />
        </div>

        {/* View More Button */}
        <div className="absolute bottom-[330px] right-[360px]">
          <button className="px-6 font-quicksand w-[199px] h-[58px]  text-[28px] font-semibold text-[#AB3DFF] border border-[#423780] hover:bg-purple-500/20 transition-all duration-300">
            View More
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />

    </section>
  );
};

export default Shackets;
