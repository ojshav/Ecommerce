import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageClick = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };


  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1); // Loop back to first page
    }
  };

  const PaginationButton = ({ page, isActive, onClick  }) => (
    <button
      onClick={() => onClick(page)}
      className={`
        w-11 h-11 sm:w-10 sm:h-10 md:w-11 md:h-11
        rounded-full
        flex items-center justify-center
        font-medium text-base sm:text-sm md:text-base
        transition-all duration-300 ease-out
        transform hover:-translate-y-0.5 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
        ${isActive 
          ? 'bg-gradient-to-br from-amber-600 to-amber-500 text-black font-semibold shadow-lg shadow-amber-500/30 hover:from-amber-500 hover:to-amber-400 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {page}
    </button>
  );

  const NextButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="
        w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10
        rounded-full
        flex items-center justify-center
        text-white/70 hover:text-white hover:bg-white/10
        transition-all duration-300 ease-out
        transform hover:-translate-y-0.5 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-opacity-50
        group
      "
    >
      <ChevronRight 
        size={20} 
        className="sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5" 
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-5">
      <div className="text-center">
        {/* Demo Header */}
      

        {/* Pagination Container */}
        <div className="
          flex items-center gap-2 sm:gap-1.5 md:gap-2
          bg-white/5 backdrop-blur-md
          px-4 py-3 sm:px-3 sm:py-2.5 md:px-4 md:py-3
          rounded-full
          border border-white/10
          shadow-2xl
        ">
          {/* Page Numbers */}
          {[1, 2, 3, 4, 5].map((page) => (
            <PaginationButton
              key={page}
              page={page}
              isActive={currentPage === page}
              onClick={handlePageClick}
            />
          ))}
          
          {/* Next Arrow */}
          <NextButton onClick={handleNextClick} />
        </div>

        {/* Current Page Indicator */}
        {/* <div className="mt-6 text-white/40 text-sm">
          Page {currentPage} of {totalPages}
        </div> */}
      </div>
    </div>
  );
};
export default Pagination;