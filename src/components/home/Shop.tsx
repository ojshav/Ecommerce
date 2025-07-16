import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import your SVG files
const Prime = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058892/public_assets_banner/public_assets_Banner_Shutter.svg';
const Exclusive = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058892/public_assets_banner/public_assets_Banner_Shutter.svg';
const Vault = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058892/public_assets_banner/public_assets_Banner_Shutter.svg';
const LuxeHub = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058892/public_assets_banner/public_assets_Banner_Shutter.svg';

// Import inner banner SVG files
const PrimeInner = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058616/public_assets_banner/public_assets_Banner_Shop1_banner.svg';
const ExclusiveInner = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058616/public_assets_banner/public_assets_Banner_Shop2_banner.svg';
const VaultInner = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058616/public_assets_banner/public_assets_Banner_Shop3_banner.svg';
const LuxeHubInner = 'https://res.cloudinary.com/do3vxz4gw/image/upload/v1752058616/public_assets_banner/public_assets_Banner_Shop4_banner.svg';

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

  // Calculate time remaining until closing (22:00)
  const calculateTimeLeft = () => {
    const now = new Date();
    const closingTime = new Date(now);
    closingTime.setHours(22, 0, 0, 0);
    
    const diff = closingTime.getTime() - now.getTime();
    
    if (diff <= 0) return "Closed";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}hr ${minutes}min`;
  };

  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      title: "AOIN PRIME",
      timeLeft: calculateTimeLeft(),
      navigationPath: "/shop1",
      bannerImage: Prime,
      innerBannerImage: PrimeInner
    },
    {
      id: 2,
      title: "AOIN EXCLUSIVE",
      timeLeft: calculateTimeLeft(),
      navigationPath: "/shop2",
      bannerImage: Exclusive,
      innerBannerImage: ExclusiveInner
    },
    {
      id: 3,
      title: "AOIN VAULT",
      timeLeft: calculateTimeLeft(),
      navigationPath: "/shop3",
      bannerImage: Vault,
      innerBannerImage: VaultInner
    },
    {
      id: 4,
      title: "LUXE HUB",
      timeLeft: calculateTimeLeft(),
      navigationPath: "/shop/luxehub",
      bannerImage: LuxeHub,
      innerBannerImage: LuxeHubInner
    }
  ];

  // Check if shop is open (5 AM to 10 PM)
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

  const handleBannerClick = (bannerId: number, navigationPath: string) => {
    if (isShopOpen) {
      navigate(navigationPath);
    }
  };

  const handleMouseEnter = (bannerId: number) => {
    if (isShopOpen) {
      setHoveredBanner(bannerId);
    }
  };

  const handleMouseLeave = () => {
    if (isShopOpen) {
      setHoveredBanner(null);
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
    <div className="w-full min-h-screen mb-16 sm:mb-20 md:mb-24 lg:mb-32" style={{ background: 'linear-gradient(135deg, #F2631F 0%, #F2631F 100%)' }}>
      {/* Innovation Window Section with Decorative Frame */}
      <div className="relative py-6 px-4 sm:py-8 md:py-12 lg:py-16 sm:px-6 lg:px-8">
        {/* Decorative Frame */}
        <div className="absolute inset-0 z-0">
          {/* Main Frame Border */}
          <div className="absolute inset-4 border-[2px] border-yellow-300/30 rounded-lg">
            {/* Corner Ornaments */}
            <div className="absolute -left-3 -top-3 w-12 h-12 animate-corner-pulse">
              <div className="absolute inset-0 rotate-45 border-t-4 border-l-4 border-yellow-300/50"></div>
              <div className="absolute inset-1 rotate-45 border-t-2 border-l-2 border-white/20"></div>
            </div>
            <div className="absolute -right-3 -top-3 w-12 h-12 animate-corner-pulse">
              <div className="absolute inset-0 rotate-45 border-t-4 border-r-4 border-yellow-300/50"></div>
              <div className="absolute inset-1 rotate-45 border-t-2 border-r-2 border-white/20"></div>
            </div>
            <div className="absolute -left-3 -bottom-3 w-12 h-12 animate-corner-pulse">
              <div className="absolute inset-0 rotate-45 border-b-4 border-l-4 border-yellow-300/50"></div>
              <div className="absolute inset-1 rotate-45 border-b-2 border-l-2 border-white/20"></div>
            </div>
            <div className="absolute -right-3 -bottom-3 w-12 h-12 animate-corner-pulse">
              <div className="absolute inset-0 rotate-45 border-b-4 border-r-4 border-yellow-300/50"></div>
              <div className="absolute inset-1 rotate-45 border-b-2 border-r-2 border-white/20"></div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
            <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
            <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-yellow-300/30 to-transparent"></div>
            <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-yellow-300/30 to-transparent"></div>

            {/* Inner Frame Accent */}
            <div className="absolute inset-4 border border-white/10 rounded-lg"></div>
          </div>

          {/* Animated Corner Lights */}
          <div className="absolute -left-1 -top-1 w-8 h-8">
            <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-glow"></div>
          </div>
          <div className="absolute -right-1 -top-1 w-8 h-8">
            <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-glow delay-100"></div>
          </div>
          <div className="absolute -left-1 -bottom-1 w-8 h-8">
            <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-glow delay-200"></div>
          </div>
          <div className="absolute -right-1 -bottom-1 w-8 h-8">
            <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-glow delay-300"></div>
          </div>
        </div>

        {/* Main Content with Background */}
        <div className="bg-[#F2631F] relative overflow-hidden rounded-lg shadow-2xl">
          {/* Innovation Window Section */}
          <div className="max-w-4xl mx-auto text-center relative">
            {/* 3D Floating Title Container */}
            <div className="transform-gpu hover:scale-105 transition-transform duration-500 mb-8 perspective-1000">
              <div className="flex items-center justify-center space-x-2 mb-2 animate-float">
                {/* Mystic Shopping Icon Left */}
                <div className="relative group">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-yellow-300 animate-mystic-spin">
                    <path
                      d="M20 7h-4V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-pulse"></div>
                </div>
                
                {/* Title with Gradient Animation */}
                <div className="relative group perspective">
                  <span className="text-white font-bold tracking-wider text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Work Sans] block transform transition-all duration-500 hover:transform-gpu hover:rotate-y-12 relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative inline-block animate-text-shimmer bg-gradient-to-r from-white via-yellow-100/10 to-white bg-clip-text">
                      THE INNOVATION WINDOW
                    </span>
                  </span>
                </div>
                
                {/* Mystic Shopping Icon Right */}
                <div className="relative group">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-yellow-300 animate-mystic-spin-reverse">
                    <path
                      d="M20 7h-4V6c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Animated Time Badge */}
            <div className="flex justify-center mb-6 transform-gpu hover:scale-105 transition-all duration-500">
              <span className="bg-white/20 border border-white/40 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base shadow-lg backdrop-blur-sm font-[Work Sans] relative overflow-hidden group">
                <span className="relative z-10 animate-text-fade">9 AM to 10 PM Daily</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-white/20 to-yellow-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </span>
            </div>
            
            {/* Animated Description with Floating Icons */}
            <div className="relative">
              <p className="text-white text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8 font-[Work Sans] relative transform hover:scale-105 transition-all duration-500">
                <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white/30 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500">
                  Every day from 9 to 10, AOIN opens its shutters to offer exclusive, handpicked products for a limited time only.
                </span>
              </p>
            </div>

            <style>{`
              @keyframes float-bag {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
              }

              @keyframes mystic-spin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
              }

              @keyframes mystic-spin-reverse {
                0% { transform: rotate(360deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(0deg) scale(1); }
              }

              @keyframes text-shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }

              @keyframes text-fade {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
              }

              .animate-mystic-spin {
                animation: mystic-spin 6s infinite linear;
              }

              .animate-mystic-spin-reverse {
                animation: mystic-spin-reverse 6s infinite linear;
              }

              .animate-text-shimmer {
                animation: text-shimmer 3s infinite linear;
                background-size: 200% auto;
              }

              .animate-text-fade {
                animation: text-fade 3s infinite ease-in-out;
              }

              .perspective {
                perspective: 1000px;
              }
            `}</style>

            {/* Current Time and Status Section remains unchanged */}
            <div className="flex items-center justify-center mt-2 transform-gpu hover:scale-105 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-center bg-white/90 rounded-xl shadow-2xl px-4 sm:px-6 py-2 sm:py-3 space-y-2 sm:space-y-0 sm:space-x-8 border border-white/20 backdrop-blur-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="flex items-center space-x-2 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-orange-500 inline-block animate-pulse"></span>
                  <span className="text-gray-700 font-semibold text-sm sm:text-base">Current Time:</span>
                  <span className="text-gray-900 font-bold text-sm sm:text-base">{formatTime(currentTime)}</span>
                </div>
                
                <div className="flex items-center space-x-2 relative z-10">
                  <span className={`w-3 h-3 rounded-full ${isShopOpen ? 'bg-green-500' : 'bg-red-500'} inline-block animate-pulse`}></span>
                  <span className="text-gray-700 font-semibold text-sm sm:text-base">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    isShopOpen 
                      ? 'bg-green-100 text-green-700 animate-status-open' 
                      : 'bg-red-100 text-red-700 animate-status-closed'
                  }`}>
                    {isShopOpen ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frame Animation Styles */}
        <style>{`
          @keyframes corner-pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }

          @keyframes glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }

          .animate-corner-pulse {
            animation: corner-pulse 3s infinite ease-in-out;
          }

          .animate-glow {
            animation: glow 4s infinite ease-in-out;
          }
        `}</style>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes lightning {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        @keyframes lightning-delayed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-lightning {
          animation: lightning 2s ease-in-out infinite;
        }
        
        .animate-lightning-delayed {
          animation: lightning 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg);
        }

        @keyframes status-open {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes status-closed {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-status-open {
          animation: status-open 2s ease-in-out infinite;
        }

        .animate-status-closed {
          animation: status-closed 2s ease-in-out infinite;
        }
      `}</style>

      {/* Banners Section with Shutter */}
      <div className="bg-gray-100 py-4 sm:py-6 md:py-8 mt-10 sm:mt-16 md:mt-20 lg:mt-24 mb-10 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto">
        <div className="relative">
          {/* Shop Banners */}
          <div className={`space-y-4 sm:space-y-6 md:space-y-8 transition-all duration-1000 ${!isShopOpen ? 'opacity-30' : 'opacity-100'}`}>
            {shopBanners.map((shop, index) => (
              <div key={shop.id} className="w-full">
                {/* Banner */}
                <div 
                  className={`cursor-pointer transform transition-all duration-300 hover:shadow-2xl group ${isShopOpen ? 'hover:scale-[1.01]' : 'cursor-not-allowed'}`}
                  onClick={() => handleBannerClick(shop.id, shop.navigationPath)}
                  onMouseEnter={() => handleMouseEnter(shop.id)}
                  onMouseLeave={handleMouseLeave}
                  onMouseOut={handleMouseLeave}
                  role="button"
                  tabIndex={isShopOpen ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isShopOpen && (e.key === 'Enter' || e.key === ' ')) {
                      handleBannerClick(shop.id, shop.navigationPath);
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
                    className="relative flex items-center justify-center w-full group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/5 after:via-transparent after:to-black/5 after:transition-opacity after:duration-300 h-[150px] sm:h-[321px]"
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      margin: '0 auto',
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
                      <div className="absolute top-1 left-2 sm:top-4 sm:left-6 text-white text-[10px] xs:text-xs sm:text-sm font-medium z-20 bg-black/50 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-sm transform group-hover:translate-y-1 transition-transform duration-300">
                        Time left : {calculateTimeLeft()}
                      </div>
                    )}

                    {/* SVG Banner Images with Hover Effect */}
                    <div className="mt-10 sm:mt-16 md:mt-20 lg:mt-24 mb-10 sm:mb-16 md:mb-20 lg:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
                      {/* Default Banner Image */}
                      <img 
                        src={shop.bannerImage} 
                        alt={shop.title}
                        className={`absolute w-full h-full object-contain md:object-cover object-center transition-all duration-1500 ease-in-out transform-gpu ${
                          hoveredBanner === shop.id ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectPosition: 'center',
                          willChange: 'transform, opacity'
                        }}
                      />
                      
                      {/* Inner Banner Image (shown on hover) */}
                      <img 
                        src={shop.innerBannerImage} 
                        alt={`${shop.title} Inner`}
                        className={`absolute w-full h-full object-contain md:object-cover object-center transition-all duration-1500 ease-in-out transform-gpu ${
                          hoveredBanner === shop.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectPosition: 'center',
                          willChange: 'transform, opacity'
                        }}
                      />

                      {/* Single Frame Shutter Effect */}
                      <div 
                        className={`absolute inset-0 w-full bg-[#1a1a1a] transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu origin-bottom ${
                          hoveredBanner === shop.id ? 'translate-y-[-100%]' : 'translate-y-0'
                        }`}
                        style={{
                          background: `
                            linear-gradient(0deg, 
                              rgba(26,26,26,0.95) 0%,
                              rgba(38,38,38,0.95) 50%,
                              rgba(26,26,26,0.95) 100%
                            )
                          `,
                          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
                          borderBottom: '2px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        {/* Shutter Lines Pattern */}
                        <div className="absolute inset-0 opacity-40">
                          <div 
                            className="w-full h-full"
                            style={{
                              background: `
                                repeating-linear-gradient(
                                  0deg,
                                  transparent,
                                  transparent 8px,
                                  rgba(255,255,255,0.05) 8px,
                                  rgba(255,255,255,0.05) 16px
                                ),
                                repeating-linear-gradient(
                                  90deg,
                                  transparent,
                                  transparent 40px,
                                  rgba(255,255,255,0.02) 40px,
                                  rgba(255,255,255,0.02) 80px
                                )
                              `
                            }}
                          ></div>
                        </div>
                        
                        {/* Metallic Edge Effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-b from-white/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/40"></div>
                      </div>

                      {/* Responsive Container Sizes */}
                      <div className="hidden xs:block sm:hidden w-[350px] h-[150px]"></div>
                      <div className="hidden sm:block md:hidden w-[480px] h-[200px]"></div>
                      <div className="hidden md:block lg:hidden w-[720px] h-[250px]"></div>
                      <div className="hidden lg:block xl:hidden w-[960px] h-[300px]"></div>
                      <div className="hidden xl:block w-[1200px] h-[321px]"></div>
                    </div>

                    {/* Texture overlay with responsive padding */}
                    <div 
                      className={`absolute inset-0 opacity-10 z-15 transition-all duration-1000 p-2 sm:p-3 md:p-4 lg:p-5 ${
                        hoveredBanner === shop.id ? 'opacity-0' : 'opacity-10'
                      }`}
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
                      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 z-20 ${
                        hoveredBanner === shop.id ? 'opacity-20' : 'opacity-0'
                      }`}></div>
                    )}
                  </div>
                </div>

                {/* Gray spacer between banners (except after last banner) */}
                {index < shopBanners.length - 1 && (
                  <div className="w-full h-12 sm:h-16 md:h-20 lg:h-24 bg-gray-100"></div>
                )}
              </div>
            ))}
          </div>

          {/* Shutter Overlay */}
          {!isShopOpen && (
            <div 
              className="absolute inset-0 z-30 flex items-center justify-center"
              style={{
                background: `url('https://res.cloudinary.com/do3vxz4gw/image/upload/v1751689863/public_assets_shop/public_assets_shop_shutter.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {/* Closed Sign 
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg border-4 border-gray-800 shadow-2xl transform rotate-2">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    SORRY! WE'RE
                  </h3>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                    CLOSED
                  </h2>
                  <div className="border-t-2 border-gray-400 pt-4">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
                      Shop opens daily from
                    </p>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                      9:00 AM - 10:00 PM
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      Come back during opening hours!
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;