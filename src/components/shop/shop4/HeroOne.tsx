// const Hero = () => {
//   return (
//     <>
//      <img src="/Sliders (1).png" alt=""/> 
//     </>
//   )
// }

// export default Hero



import { Search, ShoppingCart, Menu } from 'lucide-react';

const HeroOne = () => {
  return (
    <div className="min-h-screen mx-auto bg-black relative overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-10 max-w-[1920px] mx-auto flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-18 py-6 md:py-12">
      <div className="text-white font-junge text-[22px] font-normal tracking-[3.3px] uppercase bg-gradient-to-r from-[#383838] to-[#9e9e9e] bg-clip-text text-transparent" style={{ WebkitTextStroke: '1px', WebkitTextStrokeColor: '#aea8a8' }}>
          AOIN POOJA STORE
        </div>
        
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Search 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <ShoppingCart 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
          <Menu 
            className="w-5 h-5 md:w-6 md:h-6 text-white/80 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer" 
            strokeWidth={1.5}
          />
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center py-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-8 min-h-[calc(100vh-120px)] animate-fade-in-up">
        {/* Main Heading */}
        <h1
          className="md:text-[80px] leading-[1] tracking-[0.15em] font-normal uppercase text-white text-center mb-2  font-abeezee"
        >
          TIMELESS RITUALS.
        </h1>

        
        {/* Sub Heading Line 1 */}
        <h2 className="text-[80px] font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.15em] uppercase leading-tight">
          <span className="text-[#BB9D7B] italic font-abeezee text-[80px] font-normal  uppercase" style={{ fontStyle: 'italic', fontWeight: 400 }}>CONTEMPORARY</span>{' '}
          <span className="text-[#BB9D7B] italic font-abeezee text-[80px] font-normal   uppercase" style={{ fontStyle: 'italic', fontWeight: 400 }}>DESIGN</span>
          <span className="text-white font-abeezee" style={{ fontWeight: 100 }}>.ONLY</span>
        </h2>
        
        {/* Sub Heading Line 2 */}
        <h2 className="text-[80px] font-light tracking-[0.1em] sm:tracking-[0.15em] font-abeezee uppercase leading-[1] mb-8 md:mb-12">
          <span className="text-white font-abeezee text-[80px] font-normal leading-normal uppercase">AT</span>{' '}
          <span className="text-[#F26340] font-abeezee text-[80px] font-normal leading-normal  uppercase">
            AOIN
          </span>
          <span className="text-white font-abeezee" style={{ fontWeight: 100 }}>.</span>
        </h2>
        
        <div className="w-full max-w-[1920px] mx-auto p-4 sm:p-6 rounded-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Column 1 - Single image */}
            <div className="col-span-1">
              <img 
                src="/assets/shop4/Hero1.svg" 
                alt="Festive Diyas and Sweets" 
                className="w-full h-auto object-cover rounded-[16px]" 
              />
            </div>

            {/* Column 2 - Single image */}
            <div className="col-span-1 flex items-end">
              <img 
                src="/assets/shop4/Hero2.svg" 
                alt="Festive Table with Sweets and Flowers" 
                className="w-full h-auto object-cover rounded-[16px]" 
              />
            </div>

            {/* Column 3 - Two images stacked vertically */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-rows-2 gap-4">
              <img 
                src="/assets/shop4/Hero3.svg" 
                alt="Statue with Tea Lights" 
                className="w-full h-auto object-cover rounded-[16px]" 
              />
              <div className="relative">
                <img 
                  src="/assets/shop4/Hero4.svg" 
                  alt="Evil Eye Charms and Jewelry" 
                  className="w-full h-auto object-cover rounded-[16px]" 
                />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#BB9D7B] text-white font-futurapt transition-all duration-300 hover:scale-105 shadow-lg text-xs font-medium tracking-[3px] uppercase w-[120px] sm:w-[156px] h-[40px] sm:h-[50px] flex-shrink-0 rounded-[30px]">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroOne;
    