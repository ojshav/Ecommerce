import React from 'react';

const Categories = () => {
  
  const categories = [
    {
      name: 'CASUAL',
      image: '/assets/images/Category1.1.png',
      bgColor: '#5E919C',
      shadowColor: '#4D767F',
    },
    {
      name: 'COOL',
      image: '/assets/images/Category2.1.png',
      bgColor: '#F0BBCD',
      shadowColor: '#A76D6A',
    },
    {
      name: 'SUPER DEALS',
      image: '/assets/images/Category3.1.png',
      bgColor: '#F5DB50',
      shadowColor: '#8C8353',
    },
    {
      name: 'SPECIAL',
      image: '/assets/images/Category4.1.png',
      bgColor: '#AB927B',
      shadowColor: '#706B50',
    },
    {
      name: 'INDIAN',
      image: '/assets/images/Category5.1.png',
      bgColor: '#FFB998',
      shadowColor: '#716D57',
    },
    {
      name: 'WESTERN',
      image: '/assets/images/Category6.1.png',
      bgColor: '#A3C6A4',
      shadowColor: '#4D4A3B',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
  {categories.map((category, index) => (
    <div
      key={index}
      className="flex flex-col items-center group cursor-pointer"
    >
      {/* Label */}
      <h3 className="text-sm text-[#000000] mb-4 tracking-wide text-center font-platypi">
        {category.name}
      </h3>

      {/* Responsive circle wrapper */}
      <div className="relative w-32 h-32 md:top-6 sm:w-[140px] sm:h-[140px] md:w-[151px] md:h-[151px]">
        {/* Shadow */}
        <div
          className="absolute left-1 top-0.5 w-full h-full rounded-full z-0"
          style={{ backgroundColor: category.shadowColor }}
        />
        

        {/* Main Circle */}
        <div
          className="w-full h-full rounded-full transition-transform left-3 duration-500 group-hover:scale-110 overflow-hidden relative flex items-center justify-center z-10"
          style={{ backgroundColor: category.bgColor }}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-[90%] h-[90%] object-contain"
          />
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Categories;
