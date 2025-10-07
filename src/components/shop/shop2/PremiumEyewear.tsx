import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function PremiumEyewear() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694662/c0516a64-c398-4821-a6cf-225b2536dd33.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694689/f1ed116d-14f4-450e-a29c-f85413ef2be6.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694705/d539148b-3ba2-48ed-8498-c1ea0f3ba26e.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694708/2462f282-ac02-40c0-852d-1813985afba7.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694720/c21bef17-c345-4982-9626-8bece39d3e77.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694731/d352d167-c1b1-44b5-ae3e-cc3f7fafcba0.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694750/6ba21453-bab9-48f9-8f77-d5f84a116c5f.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694753/c5f14eff-028a-4c42-a6f7-e5ced4b531ba.png",
    "https://res.cloudinary.com/ddnb10zkq/image/upload/v1759694922/e36216e3-310d-4654-8966-c38575e286e3.png"
  ];

  const itemsToShow = 4;
  const maxIndex = images.length - itemsToShow;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              Premium eyewear
            </h2>
            <span className="bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full">
              New
            </span>
          </div>
          <p className="text-lg sm:text-xl text-gray-500">
            Revamp your closet
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4"
                >
                  <img
                    src={image}
                    alt={`Premium eyewear ${index + 1}`}
                    className="w-full h-auto rounded-3xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>
        </div>

        {/* View All Link */}
        {/* <div className="flex justify-end mt-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
            <span className="text-base sm:text-lg font-medium">View all</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div> */}
      </div>
    </div>
  );
}