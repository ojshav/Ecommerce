import React, { useEffect, useState } from 'react';

const Reflection = () => {
  const colors = ['#D5FF4F', '#02E6FF', '#F9A7DB']; // Your custom colors
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-[1024px] bg-[url('/assets/shop2/bg-image.png')] bg-cover bg-center flex items-center justify-center relative overflow-hidden">
      {/* Central container */}
      <div className="w-[1440px] h-[1024px] relative">

        {/* Gradient Title */}
        <div className="absolute top-[132px] left-1/2 -translate-x-1/2 z-10">
          <h1 className="text-[154px] font-bold tracking-wide font-zen text-transparent bg-clip-text bg-gradient-to-b from-[#17002C] to-[#4D0092] drop-shadow-[4px_0_0_#5C5353]">
            REFLECTION
          </h1>
        </div>

        {/* Center Circular Video */}
        <div className="absolute top-[262px] left-1/2 -translate-x-1/2 w-[469px] h-[520px] rounded-full overflow-hidden z-10">
          <video
            src="/assets/videos/Panther.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tagline Bottom Right with color changing */}
        <div
          className="absolute top-[845px] font-inter w-[365px] h-[101px] left-[1012px] text-left text-[28px] font-semibold leading-snug z-10 "
          style={{ color: colors[colorIndex] }}
        >
          <p>
            DESIGNED FOR <span className="underline">YOUR</span>
          </p>
          <p>
            <span className="underline">BEAUTIFUL</span> APPEARANCE
          </p>
        </div>

        {/* SEE ALL Button */}
        <button className="absolute top-[923px] w-[191px] h-[59px] left-1/2 font-zen text-[24px] -translate-x-1/2 text-white border border-[#4D107F] px-8 py-2 font-bold text-sm tracking-wide transition z-10">
          SEE ALL
        </button>
      </div>
    </div>
  );
};

export default Reflection;
