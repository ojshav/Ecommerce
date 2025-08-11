const NewlyUpdated = () => {
  return (
    <div className="w-full py-10">
      {/* Header Section - Black Background */}
              <div className="w-full bg-black pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="w-full max-w-[1725px] h-auto sm:h-[59px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:ml-[38px] 2xl:ml-[100px] xl:px-0 flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6 lg:gap-0 py-4 sm:py-0">
            <span className="text-white uppercase font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[40px] leading-tight sm:leading-normal tracking-wide sm:tracking-[2px] md:tracking-[3px] lg:tracking-[5px] xl:tracking-[6px] 2xl:tracking-[7.5px] text-center sm:text-left whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: 'ABeeZee' }}>
              FREE SHIPPING ABOVE $40
            </span>
            <span className="text-white uppercase font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[44px] leading-tight sm:leading-normal tracking-wide sm:tracking-[2px] md:tracking-[3px] lg:tracking-[5px] xl:tracking-[6px] 2xl:tracking-[7.5px] text-center sm:text-left whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: 'ABeeZee' }}>
              30 DAYS RETURN POLICY
            </span>
          </div>
        </div>

      {/* Hero Section - Pink Background */}
      <div className="w-full h-[500px] sm:h-[750px] mx-auto relative overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1754144761/public_assets_shop4/public_assets_shop4_HeroBanner.svg')]">
        <div className="container w-full h-full relative">
          {/* Main Content */}
          <div className="absolute top-[230px] xs:top-[300px] sm:top-[350px] right-20 xs:right-40 sm:right-[100px] lg:right-[180px] xl:right-[12px] 2xl:right-[12px] mx-auto transform -translate-y-1/2 z-10">
            <div className="text-left max-w-64 sm:max-w-lg lg:max-w-3xl ">
              <p className="text-left mb-3  sm:mb-3 text-[#960B0B] font-poppins text-[14px] sm:text-[16px] font-medium tracking-[4px] uppercase">
                NEWLY UPDATED
              </p>
              <h1 className="mb-3 sm:mb-4 uppercase font-normal text-[20px] sm:text-[28px] md:text-[28px] lg:text-[32px] xl:text-[39px] leading-[24px] sm:leading-[70px] tracking-[5.85px] bg-gradient-to-r from-[#960B0B] to-[#300404] bg-clip-text text-transparent" style={{ fontFamily: 'ABeeZee' }}>
                <span className="block sm:inline">ONLINE PUJA,</span>
                <span className="block sm:inline">REAL BLESSINGS</span>
              </h1>
              <p className="text-[#960B0B] text-[16px] font-normal leading-[30px] mb-4 sm:mb-12 max-w-xl " style={{ fontFamily: 'ABeeZee' }}>
                often carries a sense of mystery, drama, or alternative sensibility. It's a fashion
              </p>
              <button className="w-[156px] h-[50px] rounded-[30px] border border-white bg-transparent font-bold  transition-colors duration-300 text-[#960B0B] text-xs font-futura  tracking-[3px] uppercase" >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewlyUpdated;
