import React from 'react';
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

  const handleShopClick = (navigationPath: string) => {
    console.log(`Navigating to: ${navigationPath}`);
    navigate(navigationPath);
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Innovation Window Section */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            9 to 10 – The Innovation Window
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every day from 9 to 10, AOIN opens its shutters to offer exclusive, handpicked products for a limited time only.
            <br />
            Whether it's lifestyle, tech, fashion, or home essentials
          </p>
        </div>
      </div>

      {/* Banners Section */}
      <div className="bg-gray-100 py-8">
        <div className="space-y-8">
          {shopBanners.map((shop, index) => (
            <div key={shop.id} className="w-full">
              {/* Banner */}
              <div 
                className="cursor-pointer transform transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl"
                onClick={() => handleShopClick(shop.navigationPath)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleShopClick(shop.navigationPath);
                  }
                }}
                aria-label={`Navigate to ${shop.title}`}
                style={{
                  width: '100vw',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div 
                  className="relative flex items-center justify-center overflow-hidden"
                  style={{
                    width: '1504px',
                    height: '321px',
                    marginLeft: '-24px',
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
                  <div className="absolute top-4 left-6 text-white text-sm font-medium z-20">
                    Time left : {shop.timeLeft}
                  </div>

                  {/* SVG Banner Image - Full Banner Coverage */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img 
                      src={shop.bannerImage} 
                      alt={shop.title}
                      className="w-full h-full object-cover"
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
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300 z-20"></div>
                </div>
              </div>

              {/* Gray spacer between banners (except after last banner) */}
              {index < shopBanners.length - 1 && (
                <div className="w-full h-12 bg-gray-100"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;