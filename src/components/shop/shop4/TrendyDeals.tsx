import { Link } from 'react-router-dom';

const TrendyDeals = () => {
  return (
    <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[750px] mt-6 xs:mt-8 sm:mt-10 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 mb-6 xs:mb-8 sm:mb-10 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-24 overflow-hidden">
      {/* Base image */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy1.svg" 
        alt="Base watch offer" 
        className="w-full h-full object-cover"
      />
      
      {/* Second image overlapping */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy2.svg" 
        alt="Trendy deals" 
        className="absolute top-1/4 right-[-20px] xs:right-[-30px] sm:right-[-50px] md:right-[-100px] lg:right-[-150px] xl:right-[-200px] 2xl:right-[-200px] transform -translate-x-1/4 -translate-y-1/4 w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] 2xl:w-[777px] 2xl:h-[750px] z-10 object-contain"
      />
      
      {/* Third image overlapping */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144778/public_assets_shop4/public_assets_shop4_Trendy3.svg" 
        alt="Trendy watch deals" 
        className="absolute top-1/2 right-[50px] xs:right-[70px] sm:right-[100px] md:right-[150px] lg:right-[200px] xl:right-[300px] 2xl:right-[390px] transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[130px] xs:w-[120px] xs:h-[160px] sm:w-[150px] sm:h-[200px] md:w-[200px] md:h-[250px] lg:w-[250px] lg:h-[300px] xl:w-[300px] xl:h-[350px] 2xl:w-[383px] 2xl:h-[485px] z-20 object-contain"
      />

      {/* SVG Circle over 3rd image */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[60px] xs:top-[70px] sm:top-[80px] md:top-[100px] lg:top-[120px] xl:top-[150px] 2xl:top-[175px] right-[120px] xs:right-[150px] sm:right-[200px] md:right-[300px] lg:right-[400px] xl:right-[600px] 2xl:right-[775px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Second SVG Circle */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[120px] xs:top-[140px] sm:top-[160px] md:top-[180px] lg:top-[220px] xl:top-[260px] 2xl:top-[360px] right-[80px] xs:right-[100px] sm:right-[120px] md:right-[150px] lg:right-[200px] xl:right-[250px] 2xl:right-[600px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Third SVG Circle */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-[150px] xs:top-[170px] sm:top-[190px] md:top-[220px] lg:top-[270px] xl:top-[320px] 2xl:top-[450px] right-[100px] xs:right-[120px] sm:right-[140px] md:right-[180px] lg:right-[250px] xl:right-[300px] 2xl:right-[810px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Text Overlays */}
      <div className="absolute top-1/2 left-[10px] xs:left-[15px] sm:left-[20px] md:left-[40px] lg:left-[60px] xl:left-[80px] 2xl:left-[140px] transform -translate-y-1/2 z-30 text-white w-[200px] xs:w-[240px] sm:w-[280px] md:w-[350px] lg:w-[450px] xl:w-[500px] 2xl:w-[579px] h-auto">
        {/* TRENDY DEALS label */}
        <div className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[13px] xl:text-[13px] 2xl:text-[14px] font-normal mb-1 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2 tracking-[1.5px] xs:tracking-[1.8px] sm:tracking-[2px] md:tracking-[2.5px] lg:tracking-[3px] xl:tracking-[3px] 2xl:tracking-[3.5px] uppercase text-white font-abeezee leading-normal">TRENDY DEALS</div>
        
        {/* Main headline */}
        <h1 className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[24px] lg:text-[32px] xl:text-[42px] 2xl:text-[50px] font-normal font-abeezee leading-[1.1] xs:leading-[1.15] sm:leading-[1.2] md:leading-[1.25] lg:leading-[1.3] xl:leading-[1.4] 2xl:leading-[61px] tracking-[1px] xs:tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[5px] 2xl:tracking-[7.5px] uppercase text-white mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-4">
          UPTO 40% OFF ON POOJA SAMAGRI & FESTIVAL KITS!
        </h1>
        
        {/* Subtitle */}
        <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-normal font-abeezee leading-[1.3] xs:leading-[1.35] sm:leading-[1.4] md:leading-[1.45] lg:leading-[1.5] xl:leading-[1.55] 2xl:leading-[30px] text-white mb-1 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2">
          Divine essentials for every occasion, now at special prices.
        </p>
        
        {/* Description */}
        <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-lg text-gray-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">
          Shop now and save on tradition with every purchase.
        </p>
        
        {/* VIEW ALL Button */}
        <Link 
          to="/shop4-Allproductpage"
          className="inline-block w-[80px] h-[28px] xs:w-[85px] xs:h-[30px] sm:w-[90px] sm:h-[32px] md:w-[100px] md:h-[35px] lg:w-[110px] lg:h-[40px] xl:w-[120px] xl:h-[45px] 2xl:w-[136px] 2xl:h-[50px] rounded-[190px] bg-[#BB9D7B] text-white text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[11px] 2xl:text-[12px] font-medium tracking-[1px] xs:tracking-[1.2px] sm:tracking-[1.5px] md:tracking-[2px] lg:tracking-[2.5px] xl:tracking-[2.5px] 2xl:tracking-[3px] uppercase font-futura transition-colors hover:bg-[#A88A6A] text-center flex items-center justify-center"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Small text box on first image - centered */}
      <div className="absolute bottom-[60px] xs:bottom-[70px] sm:bottom-[80px] md:bottom-[100px] lg:bottom-[120px] xl:bottom-[140px] 2xl:bottom-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-1.5 xs:p-2 sm:p-2 md:p-2.5 lg:p-3 xl:p-3 2xl:p-3 z-30 w-[80px] xs:w-[90px] sm:w-[100px] md:w-[120px] lg:w-[120px] xl:w-[120px] 2xl:w-[160px]">
        <div className="px-0.5 xs:px-1 sm:px-1 md:px-1 lg:px-1 xl:px-1 2xl:px-1 pt-0.5 xs:pt-1 sm:pt-1 md:pt-1.5 lg:pt-2 xl:pt-2 2xl:pt-2">
          <div className="text-black font-['ABeeZee'] text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-[11px] xl:text-[11px] 2xl:text-[12px] font-normal leading-normal tracking-[1px] xs:tracking-[1.2px] sm:tracking-[1.5px] md:tracking-[2px] lg:tracking-[2.5px] xl:tracking-[2.5px] 2xl:tracking-[3px] uppercase mb-0.5 xs:mb-0.5 sm:mb-0.5 md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1">TRENDY DEALS</div>
          <div className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] font-light font-sans leading-3 xs:leading-3.5 sm:leading-4 md:leading-4 lg:leading-5 xl:leading-5 2xl:leading-5">mystery, drama, or</div>
          <div className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[11px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px] font-light font-sans leading-3 xs:leading-3.5 sm:leading-4 md:leading-4 lg:leading-5 xl:leading-5 2xl:leading-5">alternative sensibility.</div>
        </div>
      </div>
    </div>
  )
}

export default TrendyDeals
