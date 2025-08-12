const CelebrateFestival = () => {
  return (
    <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[750px] mt-6 xs:mt-8 sm:mt-12 md:mt-16 lg:mt-24 xl:mt-56 mb-6 xs:mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 overflow-hidden">
      {/* Base image (2nd image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales1.svg" 
        alt="Base festival celebration" 
        className="w-full h-full object-cover"
      />
      
      {/* First image overlapping (1st image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales2.svg" 
        alt="Festival celebration" 
        className="absolute bottom-0 left-[-120px] xs:left-[0px] transform xs:-translate-x-1/8 xs:-translate-y-1/8 w-full h-full xs:w-[200px] xs:h-full sm:w-[300px] sm:h-full md:w-[400px] md:h-full lg:w-[550px] lg:h-full xl:min-w-[769px] xl:min-h-[750px] xl:w-[769px] xl:h-full z-20 object-cover"
      />
      
      {/* Third image overlapping (3rd image) */}
      <img 
        src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144765/public_assets_shop4/public_assets_shop4_Sales3.svg" 
        alt="Festival celebration details" 
        className="hidden 2xl:block absolute top-1/2 right-2 xs:right-4 sm:right-8 md:right-12 lg:right-20 xl:left-[770px] transform -translate-y-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 w-[60px] h-[80px] xs:w-[80px] xs:h-[100px] sm:w-[100px] sm:h-[120px] md:w-[120px] md:h-[150px] lg:w-[150px] lg:h-[180px] xl:w-[383px] xl:h-[485px] z-20 object-contain"
      />

      {/* SVG Circle over 3rd image */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 28 28" 
        fill="none"
        className="absolute top-4 xs:top-6 sm:top-8 md:top-10 lg:top-12 xl:top-[200px] right-2 xs:right-3 sm:right-4 md:right-6 lg:right-8 xl:left-[760px] transform -translate-x-1/2 -translate-y-1/2 z-30 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7"
      >
        <circle cx="14" cy="14" r="13.5" stroke="#FFFCFC" strokeWidth="1"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>

      {/* Second SVG Circle */}
     

      {/* Text Overlays */}
      <div className="absolute top-1/2 right-2 xs:right-4 sm:right-6 md:right-8 lg:right-12 xl:right-[220px] transform -translate-y-1/2 z-30 text-white w-[180px] xs:w-[220px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[579px] h-auto">
        {/* SALES MODELS label */}
        <div className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] font-normal mb-1 xs:mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 xl:mb-2 tracking-[1.5px] xs:tracking-[1.8px] sm:tracking-[2px] md:tracking-[2.2px] lg:tracking-[2.5px] xl:tracking-[3.5px] uppercase text-white font-abeezee leading-normal">SALES MODELS</div>
        
        {/* Main headline */}
        <h1 className="text-white font-abeezee text-[14px] xs:text-[16px] sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[50px] font-normal leading-tight tracking-[1px] xs:tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] xl:tracking-[7.5px] uppercase mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-2 xl:w-[740px]">
          Celebrate Festivals with Upto 30% OFF on Spiritual Essentials
        </h1>
        
        {/* Subtitle */}
        <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[16px] font-normal font-futura leading-[1.3] xs:leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] xl:leading-[30px] text-white mb-1 xs:mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 xl:mb-1">
          often carries a sense of mystery, drama, or alternative sensibility.
        </p>
        
        {/* Description */}
        <p className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[16px] font-futura text-gray-200 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-6">
          It's a fashion
        </p>
        
        {/* VIEW ALL Button */}
        <button className="w-[60px] h-[24px] xs:w-[70px] xs:h-[28px] sm:w-[80px] sm:h-[32px] md:w-[90px] md:h-[36px] lg:w-[100px] lg:h-[40px] xl:w-[136px] xl:h-[50px] rounded-[190px] bg-[#BB9D7B] text-white text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] font-medium tracking-[0.8px] xs:tracking-[1px] sm:tracking-[1.2px] md:tracking-[1.5px] lg:tracking-[1.8px] xl:tracking-[3px] uppercase font-futura leading-normal transition-colors hover:bg-[#A88A6A]">
          VIEW ALL
        </button>
      </div>

      {/* Small text box on first image - centered */}
      <div className=" hidden xl:block absolute bottom-6 xs:bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-20 xl:bottom-[30px] 2xl:bottom-[160px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(181,181,181,0.90)] rounded-[5px] p-1.5 xs:p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-2 z-30 w-[80px] h-[40px] xs:w-[100px] xs:h-[50px] sm:w-[120px] sm:h-[60px] md:w-[140px] md:h-[70px] lg:w-[160px] lg:h-[80px] xl:w-[169px] xl:h-[87px] flex-shrink-0">
        <div className="px-1 pt-1 xs:pt-1.5 sm:pt-2 md:pt-2.5 lg:pt-3 xl:pt-1">
          <div className="text-black font-['ABeeZee'] text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] font-normal leading-normal tracking-[0.8px] xs:tracking-[1px] sm:tracking-[1.2px] md:tracking-[1.5px] lg:tracking-[1.8px] xl:tracking-[3px] uppercase mb-0.5 xs:mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-1">Diya</div>
          <div className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] font-light font-sans leading-3 xs:leading-3.5 sm:leading-4 md:leading-4.5 lg:leading-5 xl:leading-5">A spark of faith in</div>
          <div className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] font-light font-sans leading-3 xs:leading-3.5 sm:leading-4 md:leading-4.5 lg:leading-5 xl:leading-5">every flame.</div>
        </div>
      </div>
    </div>
  )
}

export default CelebrateFestival
