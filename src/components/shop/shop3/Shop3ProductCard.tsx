import React from 'react';

interface Shop3ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  badge?: string | null;
  badgeColor?: string;
  isNew?: boolean;
  discount?: number | null;
  onClick?: () => void;
}

const Shop3ProductCard: React.FC<Shop3ProductCardProps> = ({ image, name, price, originalPrice, badge, badgeColor, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center group w-[436px] h-[600px] cursor-pointer"
      onClick={onClick}
    >
      {/* Image with Badge Overlay */}
      <div className="relative w-full h-[553px] aspect-[3/4] overflow-hidden">
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${badgeColor} z-10`}
          >
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Info: show by default, hide on hover */}
      <div className="w-full flex flex-col items-start font-alexandria mt-6 group-hover:hidden">
        <div className="text-[16px] font-semibold mb-1 truncate">
          {name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lime-400 text-base font-bold">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-pink-400 text-sm line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
      {/* Add button: hidden by default, show on hover */}
      <button className="w-full mt-6 bg-lime-400 text-black font-semibold py-2 rounded transition hover:bg-lime-300 max-w-md hidden group-hover:flex items-center justify-center">
        Add
      </button>
    </div>
  );
};

export default Shop3ProductCard; 