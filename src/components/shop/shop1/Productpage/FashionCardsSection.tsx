import React from 'react';

const FashionCardsSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout with responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* Left Card - Wider Image (817px) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-8 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[471px] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/Productcard/card-section1.jpg')" }}>
            {/* Overlay content */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <div className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#CC9A6D] font-archivio font-semibold mb-1">90% Polyester</div>
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[33px] font-bold text-[#505050] font-quicksand leading-tight">
                Signature Coats in Luxe <br className="hidden sm:block" />Fabrics
              </h3>
            </div>
          </div>

          {/* Right Card - Narrower Image (391px) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 h-[280px] sm:h-[350px] md:h-[400px] lg:h-[467px] rounded-2xl sm:rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/Productcard/card-section2.jpg')" }}>
            {/* Top overlay */}
            <div className="absolute top-2 left-2 p-2 sm:p-3 md:p-4 rounded-lg">
              <h3 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bebas text-[#FFFFFF] hover:text-[#DF272F] leading-none">
                FLASH<br />DEALS
              </h3>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-3 sm:left-4 md:left-6 p-2 sm:p-3 md:p-4 rounded-lg">
              <h4 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[33px] font-bold font-quicksand text-white leading-tight">
                Durable and strong stitching
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionCardsSection;
