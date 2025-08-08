import React from 'react';

interface Shop2ProductCardProps {
  image: string;
  name: string;
  price: number;
  discount?: number;
  overlay?: number;
  onClick?: () => void;
}

const Shop2ProductCard: React.FC<Shop2ProductCardProps> = ({ image, name, price, discount, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center pb-7 relative group cursor-pointer"
      onClick={onClick}
    >
      {/* Product Image Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[519px] h-[320px] sm:h-[400px] md:h-[595px]">
        <img
          src={image}
          alt={name}
          className="rounded-t-xl w-full h-full object-cover bg-none border-none shadow-none transition-transform duration-300 hover:scale-100"
        />
        {/* Optional discount badge */}
        {discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{discount}% OFF</span>
        )}
      </div>
      {/* Product Info and Hover Add-to-Cart, with hover bg color */}
      <div className="w-full flex flex-col pt-10 items-center rounded-b-xl transition-colors duration-300 group-hover:bg-[#DFD1C6]">
        <span className="font-medium text-[30px] font-bebas text-center tracking-wider">{name}</span>
        <span className="font-semibold text-[25px] font-bebas mt-3 mb-4">${price}</span>
        {/* Hover Block: Add-to-cart only */}
        <div className="w-full flex flex-col items-center transition-all duration-300 max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100">
          <div className="flex items-center gap-2 w-full justify-center p-6">
            <button 
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold"
              onClick={(e) => {
                e.stopPropagation();
                // Handle quantity decrease
              }}
            >-</button>
            <span className="font-semibold">1</span>
            <button 
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold"
              onClick={(e) => {
                e.stopPropagation();
                // Handle quantity increase
              }}
            >+</button>
            <button 
              className="ml-2 sm:ml-4 bg-black text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-xs"
              onClick={(e) => {
                e.stopPropagation();
                // Handle add to cart
              }}
            >ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop2ProductCard; 