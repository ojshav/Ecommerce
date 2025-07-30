const TrendyDeals = () => {
  return (
    <div className="relative w-full h-[750px] mt-20 md:mt-56 mb-20 md:mb-24">
      {/* Base image */}
      <img 
        src="/assets/shop4/Trendy1.svg" 
        alt="Base watch offer" 
        className="w-[1922px] h-[750px] object-cover max-w-none"
      />
      
      {/* Second image overlapping */}
      <img 
        src="/assets/shop4/Trendy2.svg" 
        alt="Trendy deals" 
        className="absolute top-1/4 right-[-200px] transform -translate-x-1/4 -translate-y-1/4 w-[777px] h-[750px] z-10"
      />
      
      {/* Third image overlapping */}
      <img 
        src="/assets/shop4/Trendy3.svg" 
        alt="Trendy watch deals" 
        className="absolute top-1/2 right-[390px] transform -translate-x-1/2 -translate-y-1/2 w-[383px] h-[485px] z-20"
      />

      {/* Text Overlays */}
      <div className="absolute top-1/2 left-[100px] transform -translate-y-1/2 z-30 text-white w-[579px] h-[402px]">
              {/* TRENDY DEALS label */}
      <div className="text-xs font-normal mb-2 tracking-[3px] uppercase text-black font-['ABeeZee']">TRENDY DEALS</div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          UPTO 40% OFF ON POOJA SAMAGRI & FESTIVAL KITS!
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-200 mb-2">
          Divine essentials for every occasion, now at special prices.
        </p>
        
        {/* Description */}
        <p className="text-lg text-gray-200 mb-6">
          Shop now and save on tradition with every purchase.
        </p>
        
        {/* VIEW ALL Button */}
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
          VIEW ALL
        </button>
      </div>

      {/* Small text box on first image - centered */}
      <div className="absolute bottom-[200px] left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-3 z-30">
        <div className="px-1 pt-2">
          <div className="text-black font-['ABeeZee'] text-[12px] font-normal leading-normal tracking-[3px] uppercase mb-1">TRENDY DEALS</div>
          <div className="text-[14px] font-extralight font-sans leading-5">mystery, drama, or</div>
          <div className="text-[14px] font-extralight font-sans leading-5">alternative sensibility.</div>
        </div>
      </div>
    </div>
  )
}

export default TrendyDeals
