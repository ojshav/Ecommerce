import React from 'react';
import { Link } from 'react-router-dom';

interface Shop1ProductCardProps {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
}

const Shop1ProductCard: React.FC<Shop1ProductCardProps> = ({ id, image, category, name, price }) => {
  return (
    <Link to={`/shop1/product/${id}`} className="rounded-lg flex flex-col items-center p-2 md:p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full max-w-[302px] h-[220px] sm:h-[260px] md:h-[321px] object-contain rounded-md mb-2"
      />
      <div className="text-[12px] md:text-[14px] text-gray-400 mb-1.5 mt-2 uppercase font-poppins tracking-widest">{category}</div>
      <div className="font-semibold font-poppins text-center text-[16px] md:text-[18px]">{name}</div>
      <div className="text-red-500 font-poppins font-semibold text-[18px] md:text-[20px]">${price.toFixed(2)}</div>
    </Link>
  );
};

export default Shop1ProductCard; 