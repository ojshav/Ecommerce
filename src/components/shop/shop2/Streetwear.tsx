import React from 'react';

const Streetwear: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059234/public_assets_shop2/public_assets_shop2_bg-image.png')] bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Wrapper to center the content */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left: Model with purple background and vertical text */}
          <div className="relative flex items-center justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative bg-[#CD9CFF] w-full max-w-[280px] sm:max-w-[311px] h-[500px] sm:h-[600px] md:h-[697px] rounded-xl flex items-end mx-auto">
              {/* Vertical Text */}
              <div className="absolute left-[-120px] sm:left-[-150px] md:left-[-200px] lg:left-[-250px] xl:left-[-330px] top-1/2 transform -translate-y-1/2 rotate-[-90deg] overflow-hidden">
                <h2 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[90px] xl:text-[120px] font-black tracking-tight leading-none text-black whitespace-nowrap">
                  STREETWEAR
                </h2>
              </div>

              {/* Model image */}
              <img
                src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1752059274/public_assets_shop2/public_assets_shop2_street.svg"
                alt="Streetwear model"
                className="absolute bottom-0 left-[-10px] sm:left-[-20px] md:left-[-35px] w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[443px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] object-contain z-10 max-w-none"
              />
            </div>
          </div>

          {/* Right: Info cards */}
          <div className="space-y-6 sm:space-y-8 w-full max-w-[500px] lg:max-w-[562px] mx-auto order-2 lg:order-2">
            <div className="group bg-[#4AB4FF] rounded-xl p-5 sm:p-6 md:p-8 shadow-md w-full h-auto min-h-[140px] sm:min-h-[160px] md:min-h-[184px] border border-[#87CEEB] hover:bg-transparent group-hover:border-white transition-all duration-300">
              <h3 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px] font-extrabold text-black group-hover:text-white mb-2 sm:mb-3">
                EXCLUSIVE DESIGNS
              </h3>
              <p className="text-black text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-white">
                Our streetwear fashion is known for its exclusive designs, combining style and uniqueness to make you stand out from the crowd.
              </p>
            </div>

            <div className="group rounded-xl p-5 sm:p-6 md:p-8 border border-gray-500 bg-transparent w-full h-auto min-h-[140px] sm:min-h-[160px] md:min-h-[184px] hover:bg-[#E3A918] transition-colors duration-300">
              <h3 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px] font-extrabold text-white group-hover:text-black mb-2 sm:mb-3">
                PREMIUM MATERIALS
              </h3>
              <p className="text-gray-300 group-hover:text-black text-xs sm:text-sm md:text-base leading-relaxed">
                We use only the highest quality materials to ensure that our streetwear fashion is not only stylish but also durable and comfortable.
              </p>
            </div>

            <div className="group rounded-xl p-5 sm:p-6 md:p-8 border border-gray-500 bg-transparent w-full h-auto min-h-[140px] sm:min-h-[160px] md:min-h-[184px] hover:bg-[#81FF02] transition-colors duration-300">
              <h3 className="text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px] font-extrabold text-white group-hover:text-black mb-2 sm:mb-3">
                SUSTAINABILITY COMMITMENTS
              </h3>
              <p className="text-gray-300 group-hover:text-black text-xs sm:text-sm md:text-base leading-relaxed">
                We are committed to sustainability, using eco-friendly materials and ethical manufacturing processes to reduce our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-20 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] md:w-[95%] lg:w-[1346px] h-[1px] sm:h-[2px] bg-[#B285DE] z-50 scale-y-50" />
    </section>
  );
};

export default Streetwear;
