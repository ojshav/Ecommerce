import React from 'react';

const outfits = [
  {
    image: '/assets/images/look1.png',
    bgColor: 'bg-[#89B6D9]', // Blue
  },
  {
    image: '/assets/images/look2.png',
    bgColor: 'bg-[#FFDE8C]', // Yellow
  },
  {
    image: '/assets/images/look3.png',
    bgColor: 'bg-[#A47B63]', // Brown
  },
];

const OutfitCards = () => {
  return (
    <div className="container mx-auto px-6 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 mb-32 sm:mb-40 lg:mb-48">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40 sm:gap-8 lg:gap-10">
        {outfits.map((outfit, index) => (
          <div
            key={index}
            className={`relative w-full aspect-[3/4] ${outfit.bgColor} rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] flex items-center justify-center overflow-visible mb-8 sm:mb-0`}
          >
            <img
              src={outfit.image}
              alt={`Look ${index + 1}`}
              className="absolute w-auto h-[120%] object-contain z-10 animate-float"
              style={{
                bottom: '-40%',
                left: '3%',
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitCards;
