import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-poppins">
          AOIN POOJA STORE
        </h1>
        <div className="text-sm md:text-base text-gray-300">
          <span className="hover:text-yellow-400 cursor-pointer transition-colors">HOME</span>
          <span className="mx-2">-</span>
          <span className="text-white">POOJA SHOP</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;