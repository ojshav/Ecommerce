import React from "react";

const Collaboration = () => {
  return (
    <div className="   w-screen h-[120vh] md:h-[120vh]  sm:h-[150vh] lg:h-[1024px] min-h-screen  bg-[#EBD6FF] font-sans overflow-hidden relative flex flex-col items-center">
      {/* Top Text */}
      <div className="text-center pt-8 sm:pt-10 mt-4 sm:mt-5 z-20">
        <p className="text-xs sm:text-sm font-semibold font-montserrat text-[#475F47] uppercase">
          in Collaboration with
        </p>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold tracking-wider mt-1">
          <span className="text-white font-bebas text-[48px] xs:text-[64px] sm:text-[94px] stroke-text">RICH BRIAN</span>
        </h1>
      </div>

      {/* Crossed Straps */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Strap 1 */}
        <div className="absolute w-[250vw] sm:w-[200vw] rotate-[8.56deg] top-[20vh] xs:top-[160px] sm:top-[220px] left-1/2 -translate-x-1/2 h-[80px] xs:h-[110px] sm:h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black font-extrabold text-[32px] xs:text-[48px] sm:text-[64px] lg:text-[80px]">
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -{" "}
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>

        {/* Strap 2 */}
        <div className="absolute w-[250vw] sm:w-[200vw] rotate-[-6.28deg] top-[180px] xs:top-[220px] sm:top-[220px] left-1/2 -translate-x-1/2 h-[80px] xs:h-[110px] sm:h-[154px] bg-white">
          <div className="flex items-center w-full h-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap text-black text-[32px] xs:text-[48px] sm:text-[64px] lg:text-[80px] font-bold">
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST - {" "}
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST
              </span>
              <span className="px-2 xs:px-4">
                STRITE - STYLIST - STREETWEAR - STYLIST -
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="relative z-20 mt-[220px] xs:mt-[300px] sm:mt-[400px] px-2 xs:px-4 sm:px-10 pb-10 sm:pb-20 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-8 md:gap-10 justify-items-center w-full max-w-[1440px]">
        {/* Card 1 */}
        <div className="text-center mt-2 xs:mt-3 md:mt-10">
          <img
            src="/assets/shop2/collaboration1.jpg"
            alt="Black Mamba Jacket"
            className="w-[180px] xs:w-[220px] sm:w-[274px] h-[220px] xs:h-[270px] sm:h-[344px] object-cover mx-auto"
          />
          <p className="mt-2 text-xs xs:text-sm font-semibold underline underline-offset-4">
            Black Mamba Jacket <span>↗</span>
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center -mt-6 xs:-mt-10 sm:-mt-14">
          <img
            src="/assets/shop2/collaboration2.jpg"
            alt="Dat-Stick Sweater"
            className="w-[190px] xs:w-[240px] sm:w-[293px] h-[240px] xs:h-[300px] sm:h-[369px] object-cover mx-auto"
          />
          <p className="mt-2 text-xs xs:text-sm font-semibold underline underline-offset-4">
            Dat-Stick Sweater <span>↗</span>
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center -mt-2  xs:-mt-2 sm:-mt-24 lg:-mt-24">
          <img
            src="/assets/shop2/collaboration3.jpg"
            alt="100 Degree Sweater"
            className="w-[180px] xs:w-[220px] sm:w-[278px] h-[220px] xs:h-[270px] sm:h-[349px] object-cover mx-auto"
          />
          <p className="mt-2 text-xs xs:text-sm font-semibold underline underline-offset-4">
            100 Degree Sweater <span>↗</span>
          </p>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-10 h-10 xs:w-[50px] xs:h-[50px] sm:w-[71px] sm:h-[71px] bg-black"></div>
      <div className="absolute top-8 left-8 w-8 h-8 xs:top-[40px] xs:left-[35px] xs:w-[30px] xs:h-[30px] sm:top-[60px] sm:left-[65px] sm:w-[50px] sm:h-[50px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-black"></div>
      <div className="absolute bottom-6 right-6 w-10 h-10 xs:bottom-10 xs:right-10 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-black"></div>

      <div className="absolute bottom-2 xs:bottom-6 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[1346px] h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </div>
  );
};

export default Collaboration;
