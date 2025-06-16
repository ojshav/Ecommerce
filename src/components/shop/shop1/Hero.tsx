import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const images = [
    "/assets/images/hero-image1.png",
    "/assets/images/hero-image2.png",
    "/assets/images/hero-image3.png"
  ];

  return (
    <section className="relative bg-white">
      <div className="w-full max-w-[1280px]  mx-auto px-6 sm:px-8">
        {/* Hero Text */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-16 pb-6 space-y-4 md:space-y-0">
          {/* Text */}
          <div>
            <h1 className="text-display font-boska text-gray-900 tracking-tight leading-[90px]">
              A NEW ERA OF<br />
              <em className="font-playfair italic font-medium text-gray-800 ">Elegance</em>{' '}
              <strong className="text-display font-boska text-gray-900 tracking-tight leading-[90px]">AWAITS</strong>
            </h1>
          </div>

          {/* Arrows on Right - Slightly Lowered */}
          <div className="flex space-x-3 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-left.png" 
                alt="Arrow Left" 
                className="w-10 h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
            <button 
              className="group w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-right.png" 
                alt="Arrow Right" 
                className="w-10 h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="overflow-hidden rounded-md shadow-md relative">
          <div className={styles.scrollContainer}>
            {images.map((src, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0"
                style={{ width: '100%' }}
              >
                <img
                  src={src}
                  alt={`Elegant Fashion ${index + 1}`}
                  className="w-full h-[650px] object-cover object-center rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
