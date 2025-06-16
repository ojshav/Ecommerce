import React from 'react';

const PromotionalBanners = () => {
  return (
    <section className="py-16 pb-10 w-full  mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ✅ Left Column with Video */}
          <div className="relative overflow-hidden">
            <div className="relative w-[522px] h-[600px]">
              <video
                src="/assets/videos/promo-video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
               
                playsInline
              />
              <div className="absolute top-8 left-8 text-white">
                <h3 className="text-4xl lg:text-5xl font-serif mb-2">
                  Warm Woolen
                </h3>
                <h3 className="text-4xl lg:text-5xl font-serif mb-8">
                  Sweater
                </h3>
                <div className="mb-4">
                  <span className="text-lg tracking-widest">NOW AT</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-6xl font-bold text-red-500">30</span>
                  <span className="text-3xl text-red-500 ml-1">%</span>
                </div>
                <div className="text-xl tracking-widest mt-2">OFF</div>
              </div>
            </div>
          </div>

          {/* ✅ Right Column (unchanged) */}
          <div className="relative bg-white overflow-hidden w-[738px] h-[600px]">
            <div className="relative h-[500px]">
              <img
                src="/assets/images/promo1.png"
                alt="Colorful silk scarves arranged artistically"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 right-8 text-gray-900 text-right">
                <h3 className="text-4xl lg:text-5xl font-serif mb-2">
                  Elegant Scarf
                </h3>
                <h3 className="text-4xl lg:text-5xl font-serif mb-16">
                  Series
                </h3>
              </div>
              <div className="absolute bottom-8 right-8 text-gray-900 text-right">
                <div className="mb-2">
                  <span className="text-lg tracking-widest">BUY ONE GET ONE</span>
                </div>
                <div className="flex items-baseline justify-end">
                  <span className="text-6xl font-bold text-red-500">50</span>
                  <span className="text-3xl text-red-500 ml-1">%</span>
                  <span className="text-4xl font-bold text-gray-900 ml-2">off!</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
