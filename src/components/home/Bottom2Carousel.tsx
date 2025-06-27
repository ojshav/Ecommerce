import React, { useState, useEffect, useRef } from "react";
import svgImage1 from '/src/assets/bottom2crousel/Image1.svg';
import svgImage2 from '/src/assets/bottom2crousel/Image2.svg';
import svgImage3 from '/src/assets/bottom2crousel/Image3.svg';

const images = [svgImage1, svgImage2, svgImage3];

const CAROUSEL_HEIGHT = 172; // px, same as Bottom1Carousel

const Bottom2Carousel: React.FC = () => {
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
    <div
      style={{
        width: '100%',
        height: 172,
        overflow: "hidden",
        position: "relative",
        borderRadius: 8,
        border: "1px solid #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${current * CAROUSEL_HEIGHT}px)`,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            style={{
              height: CAROUSEL_HEIGHT,
              width: '100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={src} alt={`SVG ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bottom2Carousel;
