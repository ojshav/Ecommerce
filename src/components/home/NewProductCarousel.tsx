import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import svgImage1 from '/src/assets/newproductcarousel/Image1.svg';
import svgImage2 from '/src/assets/newproductcarousel/Image2.svg';
import svgImage3 from '/src/assets/newproductcarousel/Image3.svg';
import { Link } from 'react-router-dom';

const images = [svgImage1, svgImage2, svgImage3];

const NewProductCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="w-full relative mb-16 sm:mb-20 md:mb-24 lg:mb-32">
      <div 
        className="relative overflow-hidden mx-auto"
        style={{
          width: '1680px',
          height: '560px',
          margin: '0 auto'
        }}
      >
        <motion.div
          className="flex h-full"
          style={{
            width: `${images.length * 1680}px`,
          }}
          animate={{
            x: -current * 1680,
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
                width: '1680px',
                height: '560px'
              }}
            >
              <Link to="/new-product">
                <img 
                  src={src} 
                  alt={`Carousel ${idx + 1}`} 
                  style={{
                    width: '1680px',
                    height: '560px',
                    objectFit: 'cover'
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
