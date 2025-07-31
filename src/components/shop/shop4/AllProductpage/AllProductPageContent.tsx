import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard, { Product } from '../ProductCard';

const products: Product[] = [
    {
        id: 1,
        title: "Crystal Red Beads Four Layer",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753462993/public_assets_shop4/public_assets_shop4_Group%201000006564.png"
    },
    {
        id: 2,
        title: "Crystal Red sindoor",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png"
    },
    {
        id: 3,
        title: "Radha Locket Mala",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463019/public_assets_shop4/public_assets_shop4_Rectangle%20103.png"
    },
    {
        id: 4,
        title: "108 Dana Rudraksha Mala",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463020/public_assets_shop4/public_assets_shop4_Rectangle%20104.png"
    },
    {
        id: 5,
        title: "Ganesha Shankh",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463021/public_assets_shop4/public_assets_shop4_Rectangle%20105.png"
    },
    {
        id: 6,
        title: "Pure Cow Ghee Diya",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463023/public_assets_shop4/public_assets_shop4_Rectangle%20106.png"
    },
    {
        id: 7,
        title: "Panchmukhi Rudraksha jaap",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463025/public_assets_shop4/public_assets_shop4_Rectangle%20107.png"
    },
    {
        id: 8,
        title: "1 Inch Dhoop Candle",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463027/public_assets_shop4/public_assets_shop4_Rectangle%20108.png"
    },
    {
        id: 9,
        title: "Antique Turtle Loban Dingali",
        price: 120,
        discount: "11%",
        image: "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463029/public_assets_shop4/public_assets_shop4_Rectangle%20109.png"
    }
];



// --- Sidebar ---
const Sidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState([280, 7500]);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setPriceRange([280, value]);
    };

    return (
        <div className="bg-[#1a1a1a] text-white min-h-screen w-full max-w-sm mx-auto lg:mx-0">
            <div className="p-4 sm:p-6">
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                        <span className="text-gray-300 text-sm sm:text-base">Home/Pooja Items</span>
                        <button className="border border-white text-[#895200] px-4 py-2 rounded text-sm hover:bg-[#BB9D7B] hover:text-white transition-colors self-start">
                            Clear Filters
                        </button>
                    </div>
                    <div className="w-full h-px bg-white"></div>
                </div>
                <div className="mb-8 sm:mb-10">
                    <h3 className="text-white text-lg sm:text-xl font-medium mb-6">Filter By Price</h3>
                    <div className="mb-6 relative">
                        <div className="relative">
                            <input
                                type="range"
                                min="280"
                                max="7500"
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer price-slider"
                                style={{
                                    background: `linear-gradient(to right, #BB9D7B 0%, #BB9D7B ${((priceRange[1] - 280) / (7500 - 280)) * 100}%, #374151 ${((priceRange[1] - 280) / (7500 - 280)) * 100}%, #374151 100%)`
                                }} />
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#BB9D7B] rounded-full border-2 border-white shadow-lg pointer-events-none"
                                style={{ left: `${((priceRange[0] - 280) / (7500 - 280)) * 100}%`, marginLeft: '-10px' }}
                            ></div>
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-[#BB9D7B] rounded-full border-2 border-white shadow-lg pointer-events-none"
                                style={{ left: `${((priceRange[1] - 280) / (7500 - 280)) * 100}%`, marginLeft: '-10px' }}
                            ></div>
                        </div>
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base mb-6">
                        Price: ${priceRange[0]} — ${priceRange[1]}
                    </div>
                    <button className="w-full bg-black text-white py-3 px-4 text-sm font-medium tracking-wider hover:bg-gray-900 transition-colors border border-gray-800">
                        FILTER
                    </button>
                </div>
                <div>
                    <h3 className="text-white text-lg sm:text-xl font-medium mb-6">Availability</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center text-gray-300 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={inStock}
                                        onChange={(e) => setInStock(e.target.checked)}
                                        className="sr-only" />
                                    <div className={`w-4 h-4 border-2 border-white rounded-sm mr-3 flex items-center justify-center transition-colors ${inStock ? 'bg-[#BB9D7B] border-[#BB9D7B]' : 'bg-transparent'
                                        }`}>
                                        {inStock && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm sm:text-base group-hover:text-white text-white transition-colors">In Stock</span>
                            </label>
                            <div className="w-full h-px bg-white mt-4"></div>
                        </div>
                        <div>
                            <label className="flex items-center text-white cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={outOfStock}
                                        onChange={(e) => setOutOfStock(e.target.checked)}
                                        className="sr-only" />
                                    <div className={`w-4 h-4 border-2 border-white rounded-sm mr-3 flex items-center justify-center transition-colors ${outOfStock ? 'bg-[#BB9D7B] border-[#BB9D7B]' : 'bg-transparent'
                                        }`}>
                                        {outOfStock && (
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm sm:text-base group-hover:text-white text-white transition-colors">Out Of Stock</span>
                            </label>
                            <div className="w-full h-px bg-white mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
        .price-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #BB9D7B;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .price-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #BB9D7B;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .price-slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }

        .price-slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

// --- ProductGrid ---
const ProductGrid: React.FC = () => {
    return (
        <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto mb-6">
                <p className="text-white text-sm opacity-80">
                    Showing 1–9 of 15 Results
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 flex justify-center">
                <Pagination />
            </div>
        </div>
    );
};

// --- Pagination ---
const Pagination: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1); // Loop back to first page
        }
    };

    const PaginationButton = ({ page, isActive, onClick }: { page: number, isActive: boolean, onClick: (page: number) => void }) => (
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

    const NextButton = ({ onClick }: { onClick: () => void }) => (
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
        <div className="flex items-center gap-2 sm:gap-1.5 md:gap-2 bg-white/5 backdrop-blur-md px-4 py-3 sm:px-3 sm:py-2.5 md:px-4 md:py-3 rounded-full border border-white/10 shadow-2xl">
            {[1, 2, 3, 4, 5].map((page) => (
                <PaginationButton
                    key={page}
                    page={page}
                    isActive={currentPage === page}
                    onClick={handlePageClick}
                />
            ))}
            <NextButton onClick={handleNextClick} />
        </div>
    );
};


// --- Hero ---
const Hero: React.FC = () => {
    return (
        <section className="text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-poppins">
                    AOIN POOJA STORE
                </h1>
                <div className="text-sm md:text-base text-gray-300">
                    <span className="hover:text-yellow-400 cursor-pointer transition-colors">HOME</span>
                    <span className="mx-2">-</span>
                    <span className="text-white">POOJA SHOP</span>
                </div>
            </div>
        </section>
    );
};

// --- Combined Page Component ---
const AllProductPageContent: React.FC = () => {
    return (
        <>
            <Hero />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-80 order-2 lg:order-1">
                        <div className="sticky top-8">
                            <Sidebar />
                        </div>
                    </aside>
                    <div className="flex-1 order-1 lg:order-2">
                        <ProductGrid />
                    </div>
                </div>
            </main>
        </>
    );
}

export default AllProductPageContent;
