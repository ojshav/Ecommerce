import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewCollection = () => {
  return (
    <div className="w-full max-w-[1310px] mx-auto bg-white px-4 sm:px-6 py-8 sm:py-12 lg:py-16 flex flex-col md:flex-row gap-10 md:gap-6">
      
      {/* Left Main Image */}
      <div className="hidden md:block w-full md:w-[45%] lg:w-[491px] flex-shrink-0">
        <div className="w-full h-[600px] sm:h-[600px] md:h-[720px] lg:h-[881px] overflow-hidden">
          <img
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759501134/c3ea2c35-cad2-4de6-8f1b-a37a74a92d8b.png"
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
    Discover our latest range of premium wristwatches — where timeless
    craftsmanship meets modern design. Built for elegance, precision, and
    everyday confidence.
  </p>
</div>

          <Link to="/shop1-allproductpage" className="flex items-center gap-2 text-sm font-medium cursor-pointer mt-2 sm:mt-0 hover:opacity-80 transition-opacity">
            <span>See more</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid of Looks */}
        <div className="grid grid-cols-2 gap-4  lg:gap-4 mt-2 sm:mt-16 lg:mt-20 nav2:mt-16 xl:mt-16 2xl:mt-16">
          <img 
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759501062/929a5c3e-26ee-4534-9eba-03f7649cf483.png" 
            alt="Look 1" 
            className="w-full max-w-[291px] aspect-square object-cover" 
          />
          <img 
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759501178/b8325800-e4a5-4040-8de4-04d3f90980ff.png" 
            alt="Look 2" 
            className="w-full max-w-[199px] aspect-square object-cover self-end -ml-2 sm:-ml-2 md:ml-0 lg:-ml-1 nav2:-ml-8 xl:-ml-16" 
          />
          <img 
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759501304/bb7b90a4-6f9c-4c87-8171-a5f37c8bb558.png" 
            alt="Look 3" 
            className="w-full max-w-[291px] aspect-square object-cover" 
          />
          <img  
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759501228/62d29d60-e8ef-4ab7-8e82-7ffab3a4a2df.png" 
            alt="Look 4" 
            className="w-full max-w-[291px] aspect-square object-cover -ml-2 sm:-ml-2 md:ml-0 lg:-ml-1 nav2:-ml-8 xl:-ml-16" 
          />
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
