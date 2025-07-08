import React from 'react';

const AoinTrendsSection = () => {
  return (
    <div className="relative w-full max-w-[1340px] mx-auto bg-white pt-8 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Mobile Layout: Stacked, no frames */}
      <div className="flex flex-col md:hidden items-center gap-6">
        <img
          src="/assets/images/Aoin1.jpg"
          alt="Headwrap"
          className="w-full max-w-xs rounded-lg object-contain"
        />
        <img
          src="/assets/images/Aoin2.jpg"
          alt="Orange skirt"
          className="w-full max-w-xs rounded-lg object-contain"
        />
        <h1 className="text-center font-normal leading-9 text-2xl font-playfair text-gray-900">
          Discover the trends that resonate with you. Dive into Aoin today.
        </h1>
        <video
          src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691055/public_assets_videos/Aoin3.mp4"
          className="w-full max-w-xs h-40 object-cover rounded-lg"
          autoPlay
          loop
          muted
          playsInline
        />
        <button className="bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition mt-2">
          SHOP NOW
        </button>
      </div>

      {/* Desktop Layout: Absolute, with frames */}
      <div className="hidden md:block">
        {/* Text overlay */}
        <div className="absolute top-0 left-0 w-full h-[728px] flex items-center justify-center pointer-events-none z-20 px-4">
          <h1 className="text-center font-normal leading-[60px] text-[48px] font-playfair text-gray-900 max-w-4xl">
            Discover the trends that resonate <br className="hidden sm:block" />
            with you. Dive into Aoin today.
          </h1>
        </div>

        {/* Left Image with Frame */}
        <div className="absolute top-40 left-16 z-10">
          <div className="relative w-[356px] h-[440px]">
            {/* Shifted Frame corners */}
            <div className="absolute inset-0 top-[36px] bottom-[36px]">
              <div className="absolute top-1 -left-1 w-24 h-[2.5px] bg-black" />
              <div className="absolute top-1 -left-1 h-24 w-[2.5px] bg-black" />
              <div className="absolute bottom-2 right-0 w-24 h-[2.5px] bg-black" />
              <div className="absolute bottom-2 right-0 h-24 w-[2.5px] bg-black" />
            </div>
            <img
              src="/assets/images/Aoin1.jpg"
              alt="Headwrap"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Image with Frame */}
        <div className="absolute top-12 right-16 z-10">
          <div className="relative w-[356px] h-[728px]">
            {/* Frame corners */}
            <div className="absolute inset-0 top-[56px] bottom-[36px]">
              <div className="absolute -top-2 -left-1 w-24 h-[2.5px] bg-black" />
              <div className="absolute -top-2 -left-1 h-24 w-[2.5px] bg-black" />
              <div className="absolute bottom-2 -right-1 w-24 h-[2.5px] bg-black" />
              <div className="absolute bottom-2 -right-1 h-24 w-[2.5px] bg-black" />
            </div>
            <img
              src="/assets/images/Aoin2.jpg"
              alt="Orange skirt"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Spacer for image section height */}
        <div className="h-[420px]" />

        {/* Center video below the image layer */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Button overlaps the top of the video */}
          <button className="absolute -top-6 bg-black text-white px-6 py-2 text-sm font-medium tracking-wide hover:bg-gray-800 transition z-10">
            SHOP NOW
          </button>

          <video
            src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691055/public_assets_videos/Aoin3.mp4"
            className="w-[356px] h-[320px] object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default AoinTrendsSection;
