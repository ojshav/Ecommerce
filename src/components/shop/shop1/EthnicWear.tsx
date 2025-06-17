import React from 'react';

const EthnicWear = () => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-wide">
            ETHNIC WEAR
          </h2>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          {/* Left Panel - Promotional Image with Discount */}
          <div className="lg:col-span-5 relative overflow-hidden max-w-[596px] h-[634.26px]">
            <video
                src="/assets/videos/ethnic1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            />

            
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8 text-white">
              <div className="mb-4">
                <p className="text-lg font-medium tracking-wide mb-2">BEST</p>
                <p className="text-lg font-medium tracking-wide">DISCOUNT</p>
              </div>
              
              <div className="mb-6">
                <span className="text-8xl font-bold">50</span>
                <span className="text-4xl font-bold">%</span>
              </div>
              
              <p className="text-sm leading-relaxed max-w-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu nunc ac purus 
                dapibus iaculis. Integer vel mattis ante. Praesent posuere dapibus lacus et...
              </p>
            </div>
          </div>

          {/* Center Panel - Main Model Image */}
          <div className="lg:col-span-4 relative max-w-[351px] h-[635px] overflow-hidden">
            <img
              src="/assets/images/ethnic2.jpg"
              alt="Model in elegant gold embroidered saree"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Panel - Two Stacked Images */}
          {/* Right Panel - Two Stacked Images */}
<div className="lg:col-span-3 flex flex-col gap-6">
  {/* Top Right Image */}
  <div className="overflow-hidden w-[312.817px] h-[312.817px]">
    <img
      src="/assets/images/ethnic3.jpg"
      alt="Model in blue and gold traditional lehenga"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Bottom Right Image */}
  <div className="overflow-hidden w-[312.817px] h-[312.817px]">
    <img
      src="/assets/images/ethnic4.jpg"
      alt="Model in pink and gold ethnic ensemble"
      className="w-full h-full object-cover"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default EthnicWear;