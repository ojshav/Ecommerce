import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ShopBanner {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  description: string;
  image: string;
  brands: string[];
  cta: string;
  openingTime: string;
  closingTime: string;
  shopId: string;
}

const Shop = () => {
  const navigate = useNavigate();

  // Shop data
  const shopBanners: ShopBanner[] = [
    {
      id: 1,
      title: "MIN. 50% OFF",
      subtitle: "Extra 20% off on",
      discount: "Indianwear for 9 to 5",
      description: "Ethnic elegance meets workplace chic",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["Libas", "W", "Biba", "Global Desi"],
      cta: "SHOP NOW",
      openingTime: "10:00 AM",
      closingTime: "10:00 PM",
      shopId: "fashion"
    },
    {
      id: 2,
      title: "UP TO 80% OFF",
      subtitle: "Stylish dials that will",
      discount: "get you compliments",
      description: "Premium timepieces for every occasion",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["TITAN", "FOSSIL", "TIMEX", "CASIO"],
      cta: "SHOP NOW",
      openingTime: "9:00 AM",
      closingTime: "9:00 PM",
      shopId: "watches"
    },
    {
      id: 3,
      title: "FLAT 60% OFF",
      subtitle: "Smart tech that",
      discount: "transforms your lifestyle",
      description: "Latest gadgets and electronics",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["SAMSUNG", "APPLE", "XIAOMI", "SONY"],
      cta: "SHOP NOW",
      openingTime: "8:00 AM",
      closingTime: "11:00 PM",
      shopId: "electronics"
    },
    {
      id: 4,
      title: "UPTO 70% OFF",
      subtitle: "Footwear that speaks",
      discount: "your style language",
      description: "Step up your shoe game",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      brands: ["NIKE", "ADIDAS", "PUMA", "REEBOK"],
      cta: "SHOP NOW",
      openingTime: "10:00 AM",
      closingTime: "9:30 PM",
      shopId: "footwear"
    }
  ];

  const handleShopClick = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {shopBanners.map((shop) => (
            <div 
              key={shop.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => handleShopClick(shop.shopId)}
            >
              {/* Shop Card */}
              <div className="relative h-80">
                <img
                  src={shop.image}
                  alt={shop.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-purple-900/30"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8">
                    {/* Left Content */}
                    <div className="text-white max-w-lg">
                      <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        {shop.title}
                      </h2>
                      <p className="text-xl md:text-2xl mb-1 font-medium">
                        {shop.subtitle}
                      </p>
                      <p className="text-xl md:text-2xl mb-4 font-medium">
                        {shop.discount}
                      </p>
                      
                      {/* Opening Hours */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 mb-6 inline-block">
                        <p className="text-sm font-medium text-white">
                          <span className="text-green-300">● Open:</span> {shop.openingTime} - {shop.closingTime}
                        </p>
                      </div>
                      
                      <button 
                        className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShopClick(shop.shopId);
                        }}
                      >
                        {shop.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Logos Section */}
              <div className="py-4 px-8 border-t">
                <div className="flex justify-center items-center space-x-8 md:space-x-12">
                  {shop.brands.map((brand, index) => (
                    <div
                      key={index}
                      className="text-gray-700 font-bold text-lg md:text-xl tracking-wide hover:text-orange-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // You can add brand-specific navigation here if needed
                      }}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop; 