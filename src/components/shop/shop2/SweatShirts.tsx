import React from 'react';

const SweatShirts: React.FC = () => {
  return (
    <section
      className="relative w-screen h-[1024px] bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center overflow-hidden"
    >

      {/* Content Wrapper */}
      <div className="relative w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4">

        {/* T-SHIRTS Text */}
        <h1 className="text-[80px] sm:text-[80px] bottom-[340px] left-[254px] font-normal text-transparent font-nosifer bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 relative">
          Sweatshirts
          {/* Drip effect mimic using bottom shadows */}
          
        </h1>

        {/* Models Layer */}
        <div className="absolute left-40 bottom-[400px]">
          <img
            src="/assets/shop2/Sweatshirt1.png"
            alt="Left Model"
            className="w-[326px] h-[489px] object-contain animate-shakeY"
          />
        </div>

        <div className="absolute left-[650px] bottom-[100px]  translate-x-[-50%]">
          <img
            src="/assets/shop2/Sweatshirt2.png"
            alt="Right Model"
            className="w-[283px] h-[425px] object-contain animate-leftRightFastSecond"
          />
        </div>

        {/* View More Button */}
        <div className="absolute bottom-[300px] right-[380px]">
          <button className="px-6 font-quicksand w-[199px] h-[58px]  text-[28px] font-semibold text-[#AB3DFF] border border-[#423780] hover:bg-purple-500/20 transition-all duration-300">
            View More
          </button>
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default SweatShirts;
