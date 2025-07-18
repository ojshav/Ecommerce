import React, { useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const leftArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745143/public_assets_shop1_LP/public_assets_images_arrow-left.svg";
  const leftArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822752/public_assets_shop1_LP/public_assets_images_arrow-left1.svg";
  const rightArrow = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752822755/public_assets_shop1_LP/public_assets_images_arrow-right1.svg";
  const rightArrowHover = "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745145/public_assets_shop1_LP/public_assets_images_arrow-right.svg";

  const images = [
    "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752746041/public_assets_shop1_LP/public_assets_images_hero-image2.png",
    "https://res.cloudinary.com/do3vxz4gw/image/upload/v1752745156/public_assets_shop1_LP/public_assets_images_hero-image3.svg"
  ];

  return (
    <section className="relative bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Text */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 sm:pt-12 md:pt-14 pb-4 sm:pb-12 space-y-4 md:space-y-0">
          {/* Text */}
          <div className="w-full md:w-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-boska text-gray-900 tracking-tight leading-[1.2] md:leading-[90px]">
              A NEW ERA OF<br />
              <em className="font-playfair italic font-medium text-gray-800">Elegance</em>{' '}
              <strong className="text-4xl sm:text-5xl md:text-6xl lg:text-display font-boska text-gray-900 tracking-tight leading-[1.2] md:leading-[90px]">AWAITS</strong>
            </h1>
          </div>

          {/* Arrows */}
          <div className="flex space-x-4 md:ml-8 md:mt-[38px] md:pb-3 self-end">
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
            >
              <img 
                src={leftHovered ? leftArrowHover : leftArrow}
                alt="Arrow Left"
                className="w-12 h-12 object-contain  group-hover:w-24 group-hover:h-24"
              />
            </button>
            <button 
              className="group rounded-full flex items-center justify-center w-14 h-14"
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
            >
              <img 
                src={rightHovered ? rightArrowHover : rightArrow}
                alt="Arrow Right"
                className="w-12 h-12 object-contain  group-hover:w-24 group-hover:h-24"
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
