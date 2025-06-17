import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your SVG files
const Prime = '/assets/shop/Prime.svg';
const Exclusive = '/assets/shop/Exclusive.svg';
const Vault = '/assets/shop/vault.svg';
const LuxeHub = '/assets/shop/Luxe Hub.svg';

// Import inner banner SVG files
const PrimeInner = '/assets/shop/primeinner.svg';
const ExclusiveInner = '/assets/shop/exclusiveinner.svg';
const VaultInner = '/assets/shop/vaultinner.svg';
const LuxeHubInner = '/assets/shop/luxehubinner.svg';

interface ShopBanner {
  id: number;
  title: string;
  timeLeft: string;
  navigationPath: string;
  bannerImage: string;
  innerBannerImage: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredBanner, setHoveredBanner] = useState<number | null>(null);

  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      title: "AOIN PRIME",
      timeLeft: "3hrs 40mins",
      navigationPath: "/shop",
      bannerImage: Prime,
      innerBannerImage: PrimeInner
    },
    {
      id: 2,
      title: "AOIN EXCLUSIVE",
      timeLeft: "3hr 46 mins",
      navigationPath: "/shop2",
      bannerImage: Exclusive,
      innerBannerImage: ExclusiveInner
    },
    {
      id: 3,
      title: "AOIN VAULT",
      timeLeft: "3hr 46 mins",
      navigationPath: "/shop/vault",
      bannerImage: Vault,
      innerBannerImage: VaultInner
    },
    {
      id: 4,
      title: "LUXE HUB",
      timeLeft: "2hr 15 mins",
      navigationPath: "/shop/luxehub",
      bannerImage: LuxeHub,
      innerBannerImage: LuxeHubInner
    }
  ];

  // Check if shop is open (9 AM to 10 PM)
  const checkShopStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 5 && hour < 22; // 9 AM to 10 PM (22:00)
  };

  // Update time and shop status
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      setCurrentTime(now);
      setIsShopOpen(checkShopStatus());
    };

    updateStatus(); // Initial check
    const interval = setInterval(updateStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleShopClick = (navigationPath: string) => {
    if (isShopOpen) {
      console.log(`Navigating to: ${navigationPath}`);
      navigate(navigationPath);
    }
  };

  const handleMouseEnter = (bannerId: number) => {
    if (isShopOpen) {
      setHoveredBanner(bannerId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredBanner(null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getNextOpenTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    
    if (now.getHours() < 9) {
      const today = new Date(now);
      today.setHours(9, 0, 0, 0);
      return today;
    }
    
    return tomorrow;
  };

  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #F2631F 0%, #F2631F 100%)' }}>
      {/* Innovation Window Section */}
      <div className=" bg-[#F2631F] py-8 px-4 sm:py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-2 font-[Work Sans]">
            <span className="text-yellow-300 text-lg font-[Work Sans]">⚡</span>
            <span className="text-white font-bold tracking-wider text-lg sm:text-xl font-[Work Sans]">THE INNOVATION WINDOW</span>
            <span className="text-yellow-300 text-lg font-[Work Sans]">⚡</span>
          </div>
          <div className="flex justify-center mb-4 font-[Work Sans]">
            <span className="bg-white/20 border border-white/40 text-white font-semibold px-6 py-2 rounded-full text-base shadow-sm backdrop-blur-sm font-[Work Sans]">
              9 AM to 10 PM Daily
            </span>
          </div>
          
          <p className="text-white text-base sm:text-lg font-medium mb-8 font-[Work Sans]">
          Every day from 9 to 10, AOIN opens its shutters to offer exclusive, handpicked products for a limited time only.
          Whether it's lifestyle, tech, fashion, or home essentials.
          </p>
          
          {/* Current Time and Status */}
          <div className="flex items-center justify-center mt-2 font-[Work Sans]">
            <div className="flex items-center bg-white/90 rounded-xl shadow-lg px-6 py-3 space-x-8 border border-gray-200 font-[Work Sans]">
              <div className="flex items-center space-x-2 font-[Work Sans]">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block font-[Work Sans]"></span>
                <span className="text-gray-700 font-semibold font-[Work Sans]">Current Time:</span>
                <span className="text-gray-900 font-bold font-[Work Sans]">{formatTime(currentTime)}</span>
              </div>
              <div className="flex items-center space-x-2 font-[Work Sans]">
                <span className={`w-3 h-3 rounded-full ${isShopOpen ? 'bg-green-500' : 'bg-red-500'} inline-block font-[Work Sans]`}></span>
                <span className="text-gray-700 font-semibold font-[Work Sans]">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${isShopOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-[Work Sans]`}>
                  {isShopOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banners Section with Shutter */}
      <div className="bg-gray-100 py-4 sm:py-6 md:py-8">
        <div className="relative">
          {/* Shop Banners */}
          <div className={`space-y-4 sm:space-y-6 md:space-y-8 transition-all duration-1000 ${!isShopOpen ? 'opacity-30' : 'opacity-100'}`}>
            {shopBanners.map((shop, index) => (
              <div key={shop.id} className="w-full">
                {/* Banner */}
                <div 
                  className={`cursor-pointer transform transition-all duration-300 hover:shadow-2xl group ${isShopOpen ? 'hover:scale-[1.01]' : 'cursor-not-allowed'}`}
                  onClick={() => handleShopClick(shop.navigationPath)}
                  onMouseEnter={() => handleMouseEnter(shop.id)}
                  onMouseLeave={handleMouseLeave}
                  role="button"
                  tabIndex={isShopOpen ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isShopOpen && (e.key === 'Enter' || e.key === ' ')) {
                      handleShopClick(shop.navigationPath);
                    }
                  }}
                  aria-label={`Navigate to ${shop.title}`}
                  style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    position: 'relative'
                  }}
                >
                  <div 
                    className="relative flex items-center justify-center overflow-hidden w-full group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/5 after:via-transparent after:to-black/5 after:transition-opacity after:duration-300"
                    style={{
                      width: '100%',
                      height: 'clamp(200px, 25vw, 400px)',
                      background: `
                        linear-gradient(90deg, 
                          rgba(15,15,15,1) 0%, 
                          rgba(25,25,25,1) 25%, 
                          rgba(20,20,20,1) 50%, 
                          rgba(25,25,25,1) 75%, 
                          rgba(15,15,15,1) 100%
                        ),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 1px,
                          rgba(255,255,255,0.02) 1px,
                          rgba(255,255,255,0.02) 2px
                        )
                      `,
                      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.7)'
                    }}
                  >
                    {/* Time Left Badge */}
                    {isShopOpen && (
                      <div className="absolute top-2 left-3 sm:top-4 sm:left-6 text-white text-xs sm:text-sm font-medium z-20 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm transform group-hover:translate-y-1 transition-transform duration-300">
                        Time left : {shop.timeLeft}
                      </div>
                    )}

                    {/* SVG Banner Images with Hover Effect */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                      {/* Default Banner Image */}
                      <img 
                        src={shop.bannerImage} 
                        alt={shop.title}
                        className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${
                          hoveredBanner === shop.id ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{ 
                          minWidth: '100%',
                          minHeight: '100%'
                        }}
                      />
                      
                      {/* Inner Banner Image (shown on hover) */}
                      <img 
                        src={shop.innerBannerImage} 
                        alt={`${shop.title} Inner`}
                        className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${
                          hoveredBanner === shop.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ 
                          minWidth: '100%',
                          minHeight: '100%'
                        }}
                      />
                    </div>

                    {/* Texture overlay */}
                    <div 
                      className="absolute inset-0 opacity-10 z-15 group-hover:opacity-5 transition-opacity duration-300"
                      style={{
                        background: `
                          repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(255,255,255,0.05) 2px,
                            rgba(255,255,255,0.05) 4px
                          )
                        `
                      }}
                    ></div>

                    {/* Hover effect overlay */}
                    {isShopOpen && (
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-20"></div>
                    )}
                  </div>
                </div>

                {/* Gray spacer between banners (except after last banner) */}
                {index < shopBanners.length - 1 && (
                  <div className="w-full h-6 sm:h-8 md:h-12 bg-gray-100"></div>
                )}
              </div>
            ))}
          </div>

          {/* Shutter Overlay */}
          {!isShopOpen && (
            <div 
              className="absolute inset-0 z-30 flex items-center justify-center"
              style={{
                background: `url('/assets/shop/shutter.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {/* Closed Sign */}
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border-4 border-gray-800 shadow-2xl transform rotate-2">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    SORRY! WE'RE
                  </h3>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
                    CLOSED
                  </h2>
                  <div className="border-t-2 border-gray-400 pt-4">
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">
                      Shop opens daily from
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      9:00 AM - 10:00 PM
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Come back during opening hours!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;