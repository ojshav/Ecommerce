import React from 'react';
import { ArrowRight } from 'lucide-react';

const QualityShowcase = () => {
  return (
    <section className="relative w-full min-h-screen bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6 pt-20 sm:pt-24 lg:pt-28 font-sans text-white">
      {/* Top Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-40 md:gap-40 lg:gap-8 mb-12 sm:mb-16 lg:mb-24">
        {/* Left Image Box */}
        <div className="lg:col-span-2 relative rounded-xl sm:rounded-2xl overflow-hidden h-[250px] sm:h-[350px] md:h-[400px] lg:h-[511px] bg-black/50">
          <img
            src="/assets/shop2/quality1.jpg"
            alt="Guaranteed Quality"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute z-10 p-4 sm:p-6 lg:p-10">
            <h2 className="text-[28px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[80px] mt-8 sm:mt-12 lg:mt-20 xl:mt-36 leading-[0.9] tracking-tighter font-inter font-extrabold text-[#D5FF4F] max-w-[95%] lg:max-w-[500px]">
              WE DESIGN <br />
              WITH <br />
              GUARANTEED <br />
              QUALITY
            </h2>
          </div>
        </div>

        {/* Right Vertical Box */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[511px] w-full">
          {/* Background card */}
          <div className="absolute inset-0 bg-[#F9FFCE] rounded-xl sm:rounded-2xl z-0" />

          {/* Image */}
          <img
            src="/assets/shop2/quality2.png"
            alt="New Look"
            className="absolute top-[-60px]  sm:top-[-50px] md:top-[-50px] lg:top-[-120px] xl:top-[-150px] w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[661px] object-cover rounded-xl sm:rounded-2xl z-10"
          />

          {/* Text */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[50px] xl:text-[65px] font-extrabold tracking-tighter text-[#D4FF00] leading-[0.85]">
              NEW <br /> LOOK <br /> NEW <br /> STYLE
            </h2>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-10 flex justify-center lg:justify-end -mt-6 sm:-mt-8 lg:-mt-12 xl:-mt-20">
        <button className="flex items-center gap-3 sm:gap-6 bg-transparent border border-[#D4FF00] text-white px-4 sm:px-5 pr-2 py-2 rounded-full text-xs sm:text-sm hover:bg-[#D4FF00]/10 transition">
          <span className="-ml-1">MORE ABOUT US</span>
          <span className="bg-[#D4FF00] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-black rotate-45" />
          </span>
        </button>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto mt-16 sm:mt-20 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-[200px] items-center text-center lg:text-left">
      {/* Left Heading */}
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] mt-24 xl:text-[60px] tracking-tighter font-extrabold font-archivio leading-tight">
          STAY UPDATED <br />
          WITH EXCLUSIVE <br />
          STREETWEAR
        </h2>

        {/* Right Input */}
        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-40 w-full max-w-[429px] items-center mx-auto lg:mx-0">
          <p className="text-gray-300 font-archivio text-sm sm:text-base">
            Subscribe to our newsletter for the latest drops <br className="hidden sm:block" />
            and insider news.
          </p>
          <div className="flex flex-col items-center sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 sm:px-4 py-2 rounded-none text-black focus:outline-none text-sm sm:text-base"
            />
            <button className="bg-[#A023EC] px-4 sm:px-6 py-2 text-white font-semibold hover:bg-[#8d1cd1] transition text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityShowcase;
