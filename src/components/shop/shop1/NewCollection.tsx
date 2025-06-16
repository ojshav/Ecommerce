import React from 'react';
import { ArrowRight } from 'lucide-react';

const NewCollection = () => {
  return (
   
    <div className="w-full max-w-[1280px] mx-auto bg-white  py-10 flex flex-col lg:flex-row items-start justify-between gap-5">
      
      
      <div className="w-[491px] h-[881px] -pr-5 flex-shrink-0">
        <img
          src="/assets/images/New1.png"
          alt="Main Model"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-[75%] flex flex-col gap-1">
       
        <div className="flex justify-between items-start w-full">
          <div>
            <h2 className="text-4xl sm:text-5xl font-semibold leading-tight">
              NEW <br /> COLLECTION
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap">
            <span>See more</span>
            <ArrowRight size={18} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-14 ">
         <img src="/assets/images/New2.png" alt="Look 1" className="w-[292px] h=[292px] object-cover mt-10" />
          <img src="/assets/images/New3.png" alt="Look 2" className="w-[199px] h-[199px] object-cover mt-32 -ml-20 pb-1.5 " />
          <img src="/assets/images/New4.png" alt="Look 3" className="w-[292px] h=[292px] object-cover" />
          <img src="/assets/images/New5.png" alt="Look 4" className="w-[292px] h=[292px] object-cover -ml-20" />
        </div>
      </div>
    </div>

  );
};

export default NewCollection;
