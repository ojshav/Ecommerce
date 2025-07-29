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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 py-6 md:py-8">
        <div className="text-white text-sm md:text-base lg:text-lg font-light tracking-widest uppercase">
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
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 min-h-[calc(100vh-120px)] animate-fade-in-up">
        {/* Main Heading */}
        {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-thin tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-white uppercase leading-tight mb-4 md:mb-6">
          TIMELESS RITUALS.
        </h1> */}

        <h1
  className="md:text-[80px] leading-[1] tracking-[0.15em] font-normal uppercase text-white text-center mb-4  md:mb-6 text-[30px]"
  
>
  TIMELESS RITUALS.
</h1>

        
        {/* Sub Heading Line 1 */}

         
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight mb-2 md:mb-4">
          <span className="text-[#BB9D7B] italic text-[30px]  md:text-[50px]">CONTEMPORARY</span>{' '}
          <span className="text-[#BB9D7B] italic text-[30px] md:text-[50px]">DESIGN</span>
          <span className="text-white font-thin text-[30px] md:text-[50px]">.ONLY</span>
        </h2>
        
        {/* Sub Heading Line 2 */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase leading-tight mb-8 md:mb-12">
          <span className="text-white font-thin">AT</span>{' '}
          <span className="text-[#F26340] font-normal drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]">AOIN</span>
          <span className="text-white font-thin">.</span>
        </h2>
        
    <img src='https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462996/public_assets_shop4/public_assets_shop4_Group%201000006571.png' alt='' className=''/>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, rgba(55, 65, 81, 0.2) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 100%);
        }
      `}</style>
    </div>
  );
};

export default HeroOne;
    