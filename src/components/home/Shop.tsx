import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your SVG files
const Prime = '/assets/shop/Prime.svg';
const Exclusive = '/assets/shop/Exclusive.svg';
const Vault = '/assets/shop/vault.svg';
const LuxeHub = '/assets/shop/Luxe Hub.svg';

interface ShopBanner {
  id: number;
  title: string;
  timeLeft: string;
  navigationPath: string;
  bannerImage: string;
}

const Shop = () => {
  const navigate = useNavigate();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      title: "AOIN PRIME",
      timeLeft: "3hrs 40mins",
      navigationPath: "/shop",
      bannerImage: Prime
    },
    {
      id: 2,
      title: "AOIN EXCLUSIVE",
      timeLeft: "3hr 46 mins",
      navigationPath: "/shop2",
      bannerImage: Exclusive
    },
    {
      id: 3,
      title: "AOIN VAULT",
      timeLeft: "3hr 46 mins",
      navigationPath: "/shop/vault",
      bannerImage: Vault
    }
  ];

  // Check if shop is open (9 AM to 10 PM)
  const checkShopStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 23; // 9 AM to 10 PM (22:00)
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
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Innovation Window Section */}
      <div className="bg-white py-8 px-4 sm:py-12 md:py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            9 to 10 – The Innovation Window
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-0">
            Every day from 9 to 10, AOIN opens its shutters to offer exclusive, handpicked products for a limited time only.
            <br className="hidden sm:block" />
            <span className="block sm:inline"> Whether it's lifestyle, tech, fashion, or home essentials</span>
          </p>
          
          {/* Current Time and Status */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">
              Current Time: {formatTime(currentTime)}
            </p>
            <p className={`text-lg font-bold mt-2 ${isShopOpen ? 'text-green-600' : 'text-red-600'}`}>
              Shop Status: {isShopOpen ? 'OPEN' : 'CLOSED'}
            </p>
            {!isShopOpen && (
              <p className="text-sm text-gray-600 mt-2">
                Next opening: {formatTime(getNextOpenTime())}
              </p>
            )}
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
                  className={`cursor-pointer transform transition-all duration-300 ${isShopOpen ? 'hover:scale-[1.001] hover:shadow-lg' : 'cursor-not-allowed'}`}
                  onClick={() => handleShopClick(shop.navigationPath)}
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
                    className="relative flex items-center justify-center overflow-hidden w-full"
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
                      <div className="absolute top-2 left-3 sm:top-4 sm:left-6 text-white text-xs sm:text-sm font-medium z-20">
                        Time left : {shop.timeLeft}
                      </div>
                    )}

                    {/* SVG Banner Image - Full Banner Coverage */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <img 
                        src={shop.bannerImage} 
                        alt={shop.title}
                        className="w-full h-full object-cover object-center"
                        style={{ 
                          minWidth: '100%',
                          minHeight: '100%'
                        }}
                      />
                    </div>

                    {/* Texture overlay */}
                    <div 
                      className="absolute inset-0 opacity-10 z-15"
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
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300 z-20"></div>
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
                      9:00 AM - 1:00 PM
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