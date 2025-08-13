import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './AllProductpage/Footer';

const IMAGE1_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Component6_Image1.svg";
const UNION_URL = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1751544854/svg_assets/Shop3_Union.svg";

const compositeImage = IMAGE1_URL;

const AoinJoinUs: React.FC = () => {
  return (
    <div className="bg-black w-full mx-auto min-h-screen text-white font-sans pb-10">
      {/* Top Section */}
      <div className="flex justify-center pb-80 w-full px-2 sm:px-4 md:px-0">
        <div className="relative w-full max-w-[1400px] h-[340px] sm:h-[420px] md:h-[600px] lg:h-[750px] rounded-3xl">
          {/* Ellipse and Union SVG Backgrounds (responsive position) */}
          <div
            className="absolute left-1/2 top-[60px] sm:left-[120px] sm:top-[300px] md:top-[800px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={{
              width: 556,
              height: 556,
              borderRadius: 556,
              background: 'rgba(204, 255, 0, 0.25)',
              filter: 'blur(80px)',
              opacity: 1,
            }}
          />
          <img
            src={UNION_URL}
            alt="Union Background"
            className="hidden lg:block absolute left-1/2 top-[100px] sm:left-[130px] sm:top-[750px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={{ width: 581, height: 581, opacity: 1 }}
          />
          {/* Background Image */}
          <img
            src={compositeImage}
            alt="Aoin Join Us Composite"
            className="w-full h-full rounded-3xl object-cover shadow-lg border border-gray-800 z-10 relative"
          />

          {/* Overlay Content */}
          <div className="absolute bottom-2  md:bottom-[-70px] lg:bottom-[-170px] sm:right-[50px] md:right-[50px] flex flex-col justify-end items-end text-left px-2 sm:px-4 md:px-8 pb-4 sm:pb-8 space-y-2 sm:space-y-6 rounded-2xl w-auto md:w-full h-auto md:h-full z-20">
            <h1 className="text-2xl sm:text-4xl md:text-[80px] lg:text-[104px] font-bebas font-normal leading-[1.1] md:leading-[0.85] hover:text-[#CCFF00] tracking-tight md:tracking-[-3.12px] uppercase drop-shadow-xl text-left">
              JOIN US TO GET<br />
              NOTIFIED OF THE<br />
              LATEST STYLE<br />
              TRENDS
            </h1>
          </div> 
          {/* Top Left Join Section */}
          <div className="absolute top-6 left-0 w-[90vw] max-w-[95vw] sm:w-[350px] md:w-[457px] md:left-5 p-3 sm:p-6 flex flex-col items-start text-left space-y-2 sm:space-y-4 z-20">
            <p className="max-w-xl text-xs sm:text-sm md:text-[16px] font-clash font-semibold text-gray-100 leading-snug drop-shadow">
              GALLEY OF TYPE HAS BEEN THE INDUSTRY'S STANDARD DUMMY TEXT EVER SINCE THE 1500S,
              WHEN AN UNKNOWN PRINTER TOOK A GALLEY OF TYPE AND SCRAMBLED IT TO MAKE A TYPE SPECIMEN BOOK.
            </p>
            <Link 
              to="https://www.instagram.com/aoin.in/?igsh=NGk3dml2ZHk2cjM4#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-border-white text-white font-normal py-1.5 sm:py-2 px-4 rounded-full text-xs sm:text-sm shadow font-clash transition-colors duration-300 border border-white hover:bg-[#3D5914] inline-block"
            >
              JOIN WITH US
            </Link>
          </div>
        </div>
      </div>
      

      {/* Footer Component */}
      <Footer />
      {/* Promo Bar */}
      <div className="relative w-full h-[40px] sm:h-[55px] md:h-[73px] mt-12 sm:mt-24  md:mt-48">
        <div className="absolute left-0 right-0 bottom-0 top-6 bg-[#d4ff00] h-full rotate-[-1deg] flex items-center overflow-hidden">
          <span className="text-black text-[14px] sm:text-[22px] md:text-[32px] lg:text-[43px] font-extrabold tracking-wider whitespace-nowrap ">
            SHOP NOW! DISCOUNT UP TO 80% SHOP NOW! DISCOUNT UP TO 80% SHOP NOW! DISCOUNT UP TO 80%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AoinJoinUs;