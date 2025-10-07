import { useNavigate } from 'react-router-dom';

const EthnicWear = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full max-w-[1340px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1340px] mx-auto">
        {/* Section Title */}
        <div className="mb-6 sm:mb-12 ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-normal text-gray-900 tracking-wide">
            ETHNIC WEAR
          </h2>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Video Panel */}
          <div
            className="relative w-full lg:w-[596px] aspect-[3/3.2] lg:aspect-[596/634.26] overflow-hidden cursor-pointer"
            onClick={() => {
              const sp = new URLSearchParams({ discount: '50+' });
              navigate(`/shop1-allproductpage?${sp.toString()}`);
            }}
            title="Shop 50% or more"
          >
            <video
              src="https://res.cloudinary.com/ddnb10zkq/video/upload/v1759502289/Omega_Watch_Ad_-_Cinematic_B-Roll_plktip.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end items-start p-4 sm:p-8 text-white">
              <div className="ml-1 sm:ml-2">
                <p className="uppercase text-[18px] sm:text-[26px] font-extralight leading-tight">BEST</p>
                <p className="uppercase text-[18px] sm:text-[26px] font-extralight leading-tight mt-1">DISCOUNT</p>
              </div>
              <div className="ml-1 sm:ml-2">
                <span className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-black font-inter leading-none">
                  50%
                </span>
              </div>
              {/* Removed placeholder text; clicking the block goes to 50%+ deals */}
            </div>
          </div>

          {/* Center Image */}
          <div className="hidden md:block w-full lg:w-[351px] aspect-[351/635] overflow-hidden">
            <img
              src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759502384/8fe2fc5a-ea0a-4261-b36b-bd5c326b6c84.png"
              alt="Center Ethnic Wear"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Images */}
          <div className="hidden md:flex flex-col gap-4 w-full lg:w-[312px]">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759502588/78abc061-a034-4ded-8dfc-5d8eee3b780c.png"
                alt="Top Right Ethnic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759502672/17dc31eb-b64a-4f96-84ae-a01ac4739864.png"
                alt="Bottom Right Ethnic"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EthnicWear;
