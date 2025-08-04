import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Shop4ProductCard, { Product } from './Shop4ProductCard';

const products: Product[] = [
  {
    id: 1,
    name: "Vamavarti Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463032/public_assets_shop4/public_assets_shop4_Rectangle%20111.png",
    background: "bg-blue-400"
  },
  {
    id: 2,
    name: "Moti Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463031/public_assets_shop4/public_assets_shop4_Rectangle%20110.png",
    background: "bg-slate-700",
    selected: true
  },
  {
    id: 3,
    name: "Ganesha Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png",
    background: "bg-teal-300"
  },
  {
    id: 4,
    name: "Pancha Shankh",
    price: 120,
    image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463035/public_assets_shop4/public_assets_shop4_Rectangle%2023.png",
    background: "bg-red-500",
    discount: 10
  }
];

function Recentproduct() {
  const [activeTab, setActiveTab] = useState('RITUAL KITS');

  const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

  const handleAddToCart = (product: Product, quantity: number, selectedColor: number) => {
    console.log(`Added ${product.name} to cart:`, {
      product,
      quantity,
      selectedColor
    });
    // Here you can integrate with your cart context or API
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-24 px-4">
        <p className="text-white text-center font-futura text-[14px] font-normal font-weight-[450] leading-normal tracking-[3.5px] uppercase mb-4">RECENT PRODUCTS</p>
        <h1 className="text-white font-abeezee text-[50px] font-normal font-weight-[400] leading-[70px] tracking-[7.5px] uppercase mb-8">
          AOIN POOJA STORE
        </h1>
        
        {/* DIYAS, OIL LAMPS, RITUAL KITS Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center relative">
            {/* Horizontal line */}
            <div className="w-[1040px] h-[2px] bg-[#D9D9D9] absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
            {/* Navigation tabs with 4 vertical lines */}
            <div className="flex items-center relative z-10">
              {/* Vertical line before DIYAS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-0" />
              {/* DIYAS */}
              <button
                onClick={() => setActiveTab('DIYAS')}
                className={`mx-12 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[200px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'DIYAS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                DIYAS
              </button>
              {/* Vertical line between DIYAS & OIL LAMPS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[290px]" />
              {/* OIL LAMPS */}
              <button
                onClick={() => setActiveTab('OIL LAMPS')}
                className={`mx-4 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[320px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'OIL LAMPS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                OIL LAMPS
              </button>
              {/* Vertical line between OIL LAMPS & RITUAL KITS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[650px]" />
              {/* RITUAL KITS */}
              <button
                onClick={() => setActiveTab('RITUAL KITS')}
                className={`mx-4 text-[20px] font-abeezee font-normal tracking-[3px] uppercase text-white mb-2 transition-all duration-300 w-[320px] h-[55px] flex-shrink-0 rounded-[70px] flex items-center justify-center ${
                  activeTab === 'RITUAL KITS'
                    ? 'bg-[#BB9D7B] text-white'
                    : 'text-white hover:text-gray-300'
                }`}
              >
                RITUAL KITS
              </button>
              {/* Vertical line after RITUAL KITS */}
              <div className="w-[2px] h-[75px] bg-[#D9D9D9] absolute top-0 left-[990px]" />
            </div>
          </div>
        </div>
       
      </div>

      {/* Product Carousel */}
      <div className="relative px-4 md:px-8 lg:px-16 max-w-[1920px] mx-auto">
        {/* Navigation Arrows */}
        <button className="hidden lg:flex absolute left-16 top-[200px] transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#BB9D7B] items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="hidden lg:flex absolute right-16 top-[200px] transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronRight size={20} />
        </button>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3 gap-4 max-w-[1640px] mx-auto">
          {products.map((product) => (
            <div key={product.id} className="relative h-[500px] flex items-center justify-center">
              <Shop4ProductCard 
                product={product}
                onAddToCart={handleAddToCart}
                showColorOptions={true}
                showQuantitySelector={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recentproduct;