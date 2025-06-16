import React from 'react';
import { ArrowRight } from 'lucide-react';

const NewCollection = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 py-6 sm:py-10 flex flex-col lg:flex-row items-start justify-between gap-5">
      <div className="w-full lg:w-[491px] h-[400px] sm:h-[600px] lg:h-[881px] flex-shrink-0">
        <img
          src="/assets/images/New1.png"
          alt="Main Model"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-[75%] flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              NEW <br /> COLLECTION
            </h2>
            <p className="mt-6 sm:mt-12 text-sm sm:text-base text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap">
            <span>See more</span>
            <ArrowRight size={18} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-3 mt-0">
          <img 
            src="/assets/images/New2.png" 
            alt="Look 1" 
            className="w-full h-[291px] lg:w-[291px] sm:h-[292px] object-cover sm:mt-10" 
          />
          <img 
            src="/assets/images/New3.png" 
            alt="Look 2" 
            className="w-full h-[199px] sm:h-[199px] lg:w-[199px] object-cover sm:mt-32 sm:-ml-20 md:-ml-20 lg:-ml-16" 
          />
          <img 
            src="/assets/images/New4.png" 
            alt="Look 3" 
            className="w-full h-[291px] lg:w-[291px] sm:h-[292px] object-cover" 
          />
          <img 
            src="/assets/images/New5.png" 
            alt="Look 4" 
            className="w-full h-[291px] lg:w-[291px] sm:h-[292px] object-cover sm:-ml-16 md:-ml-16 lg:-ml-16" 
          />
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
