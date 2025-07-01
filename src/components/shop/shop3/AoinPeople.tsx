import React from 'react';
import Image1 from '/src/assets/Shop3/Image1.svg';
import Image2 from '/src/assets/Shop3/Image2.svg';

const AoinPeople: React.FC = () => {
  return (
    <div className="relative w-screen h-[1100px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-screen h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${Image1})` }}
      />

      {/* Overlay for darkening or color effect if needed */}
      <div className="absolute inset-0 w-screen h-full  bg-opacity-40 z-10" />

      {/* Main Centered Content */}
      <div className="relative z-20 mx-auto max-w-[1440px] h-full">
        {/* Top Navigation Bar */}
        <nav className="relative top-0 left-0 w-auto flex space-x-12 items-center p-4 ml-12 z-20">
          <div className="text-white font-bold font-bebas text-[31px]">AOIN</div>
          <div className="flex space-x-8 font-bebas text-white text-[21px] uppercase font-semibold">
            <a href="#">Home</a>
            <a href="#">Collections</a>
            <a href="#">Shop</a>
            <a href="#">Lookbook</a>
            <a href="#">About</a>
          </div>
        </nav>

        {/* Vertical Side Texts */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 z-20">
          <div className="text-white text-[16px] tracking-widest rotate-[-90deg] origin-left pl-2">SINCE 2023</div>
        </div>
        <div className="absolute right-16 top-2/3 -translate-y-1/2 z-20">
          <div className="text-white text-[16px] tracking-widest rotate-90 origin-right pr-2">1801 THORNRIDGE CIR. SHILOH, HAWAII 81063</div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
          <div className="relative mt-10 flex flex-col items-center justify-center">
            <h1
              className="text-[325px] font-bebas font-normal text-[#CF0] text-center uppercase drop-shadow-lg"
              style={{
                lineHeight: '75%',
                letterSpacing: '-19.5px',
                fontWeight: 400,
                fontStyle: 'normal',
                fontFamily: 'Bebas Neue',
              }}
            >
              AOIN
              <span className="align-super text-[25px] ml-2">®</span>
              <br />
              FOR PEOPLE
            </h1>
            {/* Small Rotated Image Overlay */}
            <div className="absolute top-[21.5vw] right-[9vw] w-[320px] h-[380px] transform translate-x-1/2 -translate-y-1/2 rotate-[1deg]">
              <img src={Image2} alt="model" className="w-full h-full rounded-lg" />
            </div>
          </div>
          {/* Subtitle Text */}
          <div className="mt-8 text-white font-bold text-center text-[16px] max-w-[618px] mx-auto tracking-wide">
            NEQUE PORRO QUISQUAM EST, QUI DOLOREM IPSUM QUIA DOLOR SIT AMET, CONSECTETUR, ADIPISCI VELIT, SED QUO, NEQUE PORRO QUISQUAM EST, QUI DOLOREM IPSUM QUIA DOLOR SIT AMET.
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="absolute bottom-0 left-0 w-full z-30">
          <div className="w-full bg-black py-4 px-2 h-[80px] flex items-center overflow-x-auto transform rotate-[1deg] whitespace-nowrap">
            <span className="text-white text-2xl font-extrabold tracking-wider inline-block min-w-[200%] ">
              SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%
            </span>
          </div>
          <div className="w-full bg-[#d4ff00] py-2 h-[80px] px-2 flex items-center transform rotate-[-3deg] overflow-x-auto whitespace-nowrap">
            <span className="text-black text-xl font-extrabold tracking-wider inline-block min-w-[200%] animate-marquee">
              SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%  SHOP NOW!  DISCOUNT UP TO 80%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AoinPeople;
