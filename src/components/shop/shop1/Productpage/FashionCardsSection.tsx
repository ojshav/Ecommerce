import React from 'react';

const FashionCardsSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto min-h-screen bg-white px-6 md:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout with 12 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Card - Wider Image (817px) */}
          <div className="col-span-12 lg:col-span-8 h-[471px] rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/card-section1.jpg')" }}>
            {/* Overlay content */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl">
              <div className="text-amber-600 text-sm font-semibold mb-1">90% Polyester</div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                Signature Coats in Luxe Fabrics
              </h3>
            </div>
          </div>

          {/* Right Card - Narrower Image (391px) */}
          <div className="col-span-12 lg:col-span-4 h-[467px] rounded-3xl overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/card-section2.jpg')" }}>
            {/* Top overlay */}
            <div className="absolute top-6 left-6 p-4 rounded-lg">
              <h3 className="text-4xl font-extrabold text-white leading-tight tracking-wider">
                FLASH<br />DEALS
              </h3>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-6 right-6 p-4 rounded-lg">
              <h4 className="text-[33px] font-bold text-white">
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
