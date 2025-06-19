import React from "react";

const Collaboration = () => {
  return (
    <div className="w-screen min-h-screen bg-[#EBD6FF] font-sans overflow-hidden relative flex flex-col items-center">
      {/* Top Text */}
      <div className="text-center pt-10 mt-5 z-20">
        <p className="text-xs font-semibold font-montserrat text-[#475F47] uppercase">
          in Collaboration with
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wider mt-1">
          <span className="text-white font-bebas text-[94px] stroke-text">RICH BRIAN</span>
        </h1>
      </div>

      {/* Crossed Straps */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Strap 1 */}
        <div className="absolute w-[200vw] rotate-[8.56deg] top-[220px] left-1/2 -translate-x-1/2 h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black font-extrabold text-[64px] lg:text-[80px]">
              <span className="px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -{" "}
              </span>
              <span className="px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>

        {/* Strap 2 */}
        <div className="absolute w-[200vw] rotate-[-6.28deg] top-[220px] left-1/2 -translate-x-1/2 h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black text-[64px] lg:text-[80px] font-bold">
              <span className="px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
              <span className="px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="relative z-20 mt-[400px] px-6 sm:px-10 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center w-full max-w-[1440px]">
        {/* Card 1 */}
        <div className="text-center mt-3">
          <img
            src="/assets/shop2/collaboration1.jpg"
            alt="Black Mamba Jacket"
            className="w-[274px] h-[344px] object-cover"
          />
          <p className="mt-2 text-sm font-semibold underline underline-offset-4">
            Black Mamba Jacket <span>↗</span>
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center -mt-14">
          <img
            src="/assets/shop2/collaboration2.jpg"
            alt="Dat-Stick Sweater"
            className="w-[293px] h-[369px] object-cover"
          />
          <p className="mt-2 text-sm font-semibold underline underline-offset-4">
            Dat-Stick Sweater <span>↗</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center -mt-24">
          <img
            src="/assets/shop2/collaboration3.jpg"
            alt="100 Degree Sweater"
            className="w-[278px] h-[349px] object-cover"
          />
          <p className="mt-2 text-sm font-semibold underline underline-offset-4">
            100 Degree Sweater <span>↗</span>
          </p>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-[71px] h-[71px] bg-black"></div>
      <div className="absolute top-[60px] left-[65px] w-[50px] h-[50px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-black"></div>
      
    </div>

  );
};

export default Collaboration;
