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
    
<div className="flex w-full flex-col sm:flex-row items-center justify-center py-24 mb-48 px-4 sm:px-6 gap-6 sm:gap-6 lg:gap-8 overflow-visible">
{outfits.map((outfit, index) => (
        <div
          key={index}
          className={`relative w-full sm:w-[300px] md:w-[350px] lg:w-[410px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[536px] ${outfit.bgColor} rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] flex items-center justify-center overflow-visible`}
        >
          <img
            src={outfit.image}
            alt={`Look ${index + 1}`}
            className="absolute w-auto h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] object-contain z-10 animate-float"
            style={{
              bottom: '-30%',
              left: '3%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      ))}
    </div>
   
  );
};

export default OutfitCards;
