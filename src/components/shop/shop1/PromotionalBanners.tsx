import { useNavigate } from 'react-router-dom';

const PromotionalBanners = () => {
  const navigate = useNavigate();
  const goThirtyPlus = () => {
    const sp = new URLSearchParams({ discount: '30+' });
    navigate(`/shop1-allproductpage?${sp.toString()}`);
  };
  return (
    <section className="py-8 md:py-12 lg:py-16 w-full  mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-3 justify-center items-center lg:items-start">
          {/* Video Block */}
          <div className="relative w-full lg:w-[522px] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden cursor-pointer" onClick={goThirtyPlus}>
            <div className="relative h-full">
              <video
                src="https://res.cloudinary.com/ddnb10zkq/video/upload/v1759500706/Watch_product_video_for_Easycase_iih0fz.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-10 text-white">
                <div className='flex flex-col'>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-1 md:mb-2">
                    Timeless Classic
                  </h3>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-8">
                    Wrist Watch
                  </h3>
                </div>
              </div>
              <div className="absolute top-[250px] md:top-[300px] lg:top-[400px] left-4 md:left-6 lg:left-10 text-white">
                <div className='flex flex-col'>
                  <div className="mb-2 md:mb-4">
                    <span className="text-base md:text-lg tracking-widest">NOW AT</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-500">30</span>
                    <span className="text-2xl md:text-3xl text-red-500 ml-1">%</span>
                  </div>
                  <div className="text-lg md:text-xl tracking-widest mt-1 md:mt-2">OFF</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Block (Elegant scarf series) */}
          <div
            className="relative w-full lg:w-[738px] h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-white mt-6 lg:mt-0 cursor-pointer"
            onClick={() => {
              const sp = new URLSearchParams({ discount: '50+' });
              navigate(`/shop1-allproductpage?${sp.toString()}`);
            }}
            title="Shop 50% or more"
          >
            <div className="relative h-full">
              <img
                src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759500904/1c988b90-0e44-48cf-8d43-853d4bf99302.png"
                alt="Colorful silk scarves arranged artistically"
                className="w-full h-full object-contain md:object-cover"
              />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
