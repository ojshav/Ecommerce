import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const images = [
    "/assets/images/hero-image2.png",
    "/assets/images/hero-image3.png"
  ];

  return (
    <section className="relative bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Hero Text */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 space-y-4 md:space-y-0">
          {/* Text */}
          <div className="w-full md:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-boska text-gray-900 tracking-tight leading-[1.2] md:leading-[90px]">
              A NEW ERA OF<br />
              <em className="font-playfair italic font-medium text-gray-800">Elegance</em>{' '}
              <strong className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-boska text-gray-900 tracking-tight leading-[1.2] md:leading-[90px]">AWAITS</strong>
            </h1>
          </div>

          {/* Arrows */}
          <div className="flex space-x-3 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-left.png" 
                alt="Arrow Left" 
                className="w-8 h-8 sm:w-10 sm:h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
            <button 
              className="group w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-black transition-all shadow"
            >
              <img 
                src="/assets/images/arrow-right.png" 
                alt="Arrow Right" 
                className="w-8 h-8 sm:w-10 sm:h-10 transition-all group-hover:invert group-hover:brightness-200"
              />
            </button>
          </div>
        </div>

        {/* Image & Video Carousel */}
        <div className="overflow-hidden rounded-md shadow-md relative">
          <div className={styles.scrollContainer}>
            
            {/* 🔥 First Slide = Video */}
            <div className="relative flex-shrink-0 w-full">
              <video
                src="https://res.cloudinary.com/do3vxz4gw/video/upload/v1751691070/public_assets_videos/hero.mp4"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover rounded-md"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* 🖼️ Remaining Image Slides */}
            {images.map((src, index) => (
              <div 
                key={index}
                className="relative flex-shrink-0 w-full"
              >
                <img
                  src={src}
                  alt={`Elegant Fashion ${index + 2}`}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover object-center rounded-md"
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
