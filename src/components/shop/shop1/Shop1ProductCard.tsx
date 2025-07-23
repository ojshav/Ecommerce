import React from 'react';

interface Shop1ProductCardProps {
  image: string;
  category: string;
  name: string;
  price: number;
}

const Shop1ProductCard: React.FC<Shop1ProductCardProps> = ({ image, category, name, price }) => {
  return (
    <div className="rounded-lg flex flex-col items-center p-2 md:p-4">
      <img
        src={image}
        alt={name}
        className="w-full max-w-[302px] h-[220px] sm:h-[260px] md:h-[321px] object-cover rounded-md mb-2"
      />
      <div className="text-[12px] md:text-[14px] text-gray-400 mb-1.5 mt-2 uppercase font-poppins tracking-widest">{category}</div>
      <div className="font-semibold font-poppins text-center text-[16px] md:text-[18px]">{name}</div>
      <div className="text-red-500 font-poppins font-semibold text-[18px] md:text-[20px]">${price.toFixed(2)}</div>
    </div>
  );
};

export default Shop1ProductCard; 