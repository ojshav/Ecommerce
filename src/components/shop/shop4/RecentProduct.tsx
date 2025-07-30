import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  background: string;
  discount?: number;
  selected?: boolean;
}

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

// ProductImage component for displaying only the product image
function ProductImage({ image, name, price, background }: { image: string; name: string; price: number; background?: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

      return (
      <div className="relative group cursor-pointer">
        <div className={`w-[338px] h-[450px] rounded-lg overflow-hidden flex items-center justify-center ${background || ''} transition-all duration-300 group-hover:border-4 group-hover:border-white`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Always visible product name and price - hidden on hover */}
        <div className="mt-12 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-normal mb-1">{name}</h3>
          <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal">${price}</p>
        </div>
        
        {/* Hover card that replaces the name and price */}
        <div className="absolute top-[calc(100%-200px)] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-[#BB9D7B] p-6 w-[427px] h-[270px]">
            {/* Product Name */}
            <h3 className="text-white text-center font-abeezee text-[30px] font-normal leading-normal mb-1">{name}</h3>
            
            {/* Product Price */}
            <p className="mt-4 text-white text-center font-futura text-[25px] font-[450] leading-normal mb-4">${price}</p>
            
            {/* Color Options */}
            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={() => setSelectedColor(0)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 0 ? 'border-white bg-black' : 'border-gray-400 bg-black'
                }`}
              />
              <button
                onClick={() => setSelectedColor(1)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 1 ? 'border-white bg-[#F5F5DC]' : 'border-gray-400 bg-[#F5F5DC]'
                }`}
              />
              <button
                onClick={() => setSelectedColor(2)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === 2 ? 'border-white bg-gray-600' : 'border-gray-400 bg-gray-600'
                }`}
              />
            </div>
            
            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center justify-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-white rounded-full px-3 py-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white mx-3 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button className="w-12 h-12 rounded-full bg-[#BB9D7B] flex items-center justify-center hover:bg-[#A08B6A] transition-colors drop-shadow-[0_6.413px_17.013px_#7E7061]">
                <ShoppingCart size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

function Recentproduct() {
  const [activeTab, setActiveTab] = useState('RITUAL KITS');
  const [quantity, setQuantity] = useState(1);

  const tabs = ['DIYAS', 'OIL LAMPS', 'RITUAL KITS'];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
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
        {/* <button className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#BB9D7B] flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors">
          <ChevronRight size={20} />
        </button> */}
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
              <ProductImage image={product.image} name={product.name} price={product.price} background={product.background} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recentproduct;