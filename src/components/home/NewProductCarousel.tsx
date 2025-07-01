import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import svgImage1 from '/src/assets/newproductcarousel/Image1.svg';
import svgImage2 from '/src/assets/newproductcarousel/Image2.svg';
import svgImage3 from '/src/assets/newproductcarousel/Image3.svg';
import { Link } from 'react-router-dom';

const images = [svgImage1, svgImage2, svgImage3];

const NewProductCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="w-full relative mb-8 sm:mb-12 md:mb-16 lg:mb-20">
      <div 
        ref={containerRef}
        className="relative overflow-hidden mx-auto w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[560px]"
      >
        <motion.div
          className="flex h-full"
          style={{
            width: `${images.length * 100}%`,
          }}
          animate={{
            x: -current * containerWidth,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 32,
            mass: 1.5,
            ease: "easeInOut",
            duration: 1.2,
          }}
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0"
              style={{
                width: `${100 / images.length}%`,
                height: '100%'
              }}
            >
              <Link to="/new-product" className="block h-full">
                <img 
                  src={src} 
                  alt={`Carousel ${idx + 1}`} 
                  className="w-full h-full"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'left center',
                    backgroundColor: '#f8f8f8'
                  }}
                />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NewProductCarousel;
