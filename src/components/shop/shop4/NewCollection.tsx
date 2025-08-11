const NewCollection = () => {
  return (
    <div className="bg-black min-h-screen flex px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pb-20 sm:pb-32 md:pb-40 lg:pb-60 xl:pb-80 pt-16 sm:pt-20 md:pt-24 lg:pt-28 mx-auto justify-center">
      <div className="max-w-[1662px] w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-6 xl:gap-8 items-center">
        
        {/* Left Section - Text and Call to Action */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
          <div className="text-white">
            <p className="text-white text-left font-abeezee text-xs sm:text-sm md:text-base font-normal leading-normal tracking-[2px] sm:tracking-[3px] md:tracking-[3.5px] uppercase mb-2 sm:mb-4">NEW COLLECTIONS</p>
            <h1 className="text-white font-abeezee text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] 2xl:text-[60px] font-normal leading-tight sm:leading-snug tracking-[2px] sm:tracking-[3px] md:tracking-[5px] lg:tracking-[7.5px] uppercase mb-4 sm:mb-6 max-w-full lg:max-w-[521px]">
              PURITY MEETS<br />ELEGANCE
            </h1>
            <p className="text-white font-abezee text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-normal mb-4 sm:mb-6 lg:mb-8 leading-relaxed lg:leading-[35px] capitalize max-w-full lg:max-w-[521px]">
              Crafted For The Devoted. Designed For The Divine. Each Pooja Thali Reflects The Purity Of Tradition And The Elegance Of Craftsmanship.
            </p>
          </div>
          <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 h-12 sm:h-[50px] flex-shrink-0 rounded-[190px] bg-[#BB9D7B] text-white font-futura text-xs sm:text-[12px] md:text-sm font-medium leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] uppercase transition-colors duration-300 hover:bg-[#A88A6A]">
            BUY NOW
          </button>
        </div>

        {/* Central Section - Image */}
        <div className="flex w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[500px] xl:max-w-[607px] h-auto lg:h-[840px] flex-col justify-center items-center flex-shrink-0 order-2 lg:order-2 mx-auto lg:mx-0">
          <div className="relative w-full h-full flex items-center justify-center group">
            <img 
              src="https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144763/public_assets_shop4/public_assets_shop4_NewCollection.svg" 
              alt="New Collection" 
              className="w-full h-auto object-contain transition-all duration-300"
            />
            <div className="absolute inset-0 border-2 sm:border-4 md:border-6 lg:border-8 border-transparent group-hover:border-white transition-all duration-300 pointer-events-none"></div>
          </div>
        </div>

        {/* Right Section - Feature List */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 xl:space-y-16 2xl:space-y-28 order-3 lg:order-3">
          <div className="w-full lg:w-[450px] xl:w-[550px] h-auto min-h-[50px] sm:min-h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] uppercase flex items-center">
            CRAFTED FROM PREMIUM MATERIALS
          </div>
          <div className="w-full lg:w-[450px] xl:w-[550px] h-auto min-h-[50px] sm:min-h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] uppercase flex items-center lg:ml-8 xl:ml-28">
            HAND-ENGRAVED DETAILING
          </div>
          <div className="w-full lg:w-[450px] xl:w-[550px] h-auto min-h-[50px] sm:min-h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] uppercase flex items-center lg:ml-8 xl:ml-28">
            CURATED FOR SACRED PRECISION
          </div>
          <div className="w-full lg:w-[450px] xl:w-[550px] h-auto min-h-[50px] sm:min-h-[60px] flex-shrink-0 rounded-[190px] bg-[linear-gradient(90deg,#BB9D7B_0%,rgba(187,157,123,0.00)_63.77%)] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 text-left font-abeezee text-xs sm:text-sm md:text-base lg:text-[16px] font-normal leading-normal tracking-[1.5px] sm:tracking-[2px] md:tracking-[3px] lg:tracking-[4px] uppercase flex items-center">
            AESTHETIC MEETS DEVOTION
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewCollection
