import React from 'react';
import { ArrowRight } from 'lucide-react';

const NewCollection = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto bg-white px-4 sm:px-6 py-8 sm:py-12 lg:py-16 flex flex-col md:flex-row gap-10 md:gap-6">
      
      {/* Left Main Image */}
      <div className="w-full md:w-[45%] lg:w-[491px] flex-shrink-0">
        <div className="w-full h-[600px] sm:h-[600px] md:h-[720px] lg:h-[881px] overflow-hidden">
          <img
            src="/assets/images/New1.png"
            alt="Main Model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:flex-1 flex flex-col gap-6">
        
        {/* Header + CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              NEW <br /> COLLECTION
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium cursor-pointer mt-2 sm:mt-0">
            <span>See more</span>
            <ArrowRight size={18} />
          </div>
        </div>

        {/* Grid of Looks */}
        <div className="grid grid-cols-2 gap-4 sm:gap-4 mt-10 sm:mt-16">
          <img 
            src="/assets/images/New2.png" 
            alt="Look 1" 
            className="w-full max-w-[291px] aspect-square object-cover" 
          />
          <img 
            src="/assets/images/New3.png" 
            alt="Look 2" 
            className="w-full max-w-[199px] aspect-square object-cover self-end -ml-2 sm:-ml-2 md:-ml-16" 
          />
          <img 
            src="/assets/images/New4.png" 
            alt="Look 3" 
            className="w-full max-w-[291px] aspect-square object-cover" 
          />
          <img 
            src="/assets/images/New5.png" 
            alt="Look 4" 
            className="w-full max-w-[291px] aspect-square object-cover -ml-2 sm:-ml-2 md:-ml-16" 
          />
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
