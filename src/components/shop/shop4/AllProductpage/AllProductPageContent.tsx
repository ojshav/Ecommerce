import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, X, Filter } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Shop4ProductCardWithWishlist, { Product } from '../Shop4ProductCardWithWishlist';
import shop4ApiService, { Product as ApiProduct } from '../../../../services/shop4ApiService';

// Convert API product to local Product interface
const mapApiProductToLocal = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.product_id,
  name: apiProduct.product_name,
  price: apiProduct.special_price || apiProduct.price,
  discount: apiProduct.special_price ? 
    Math.round(((apiProduct.price - apiProduct.special_price) / apiProduct.price) * 100) : 
    0,
  image: apiProduct.primary_image || "https://res.cloudinary.com/do3vxz4gw/image/upload/v1753463036/public_assets_shop4/public_assets_shop4_Rectangle%205.png"
});

// --- Sidebar Component (Desktop) ---
const Sidebar: React.FC = () => {
    const [priceRange, setPriceRange] = useState([0, 7500]);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const minPrice = 0;
    const maxPrice = 7500;

    const handleMouseDown = (e: React.MouseEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(handle);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleHandleClick = (e: React.MouseEvent, _handle: 'min' | 'max') => {
        e.preventDefault();
        e.stopPropagation();
        // Don't start dragging on click, just prevent the track click
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = minPrice + percentage * (maxPrice - minPrice);

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        setIsDragging(handle);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = Math.round(minPrice + percentage * (maxPrice - minPrice));

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    const getMinPosition = () => ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const getMaxPosition = () => ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

    const handleClearFilters = () => {
        setPriceRange([0, 7500]);
        setInStock(false);
        setOutOfStock(false);
        const next = new URLSearchParams(searchParams);
        next.delete('min_price');
        next.delete('max_price');
        next.set('page', '1');
        setSearchParams(next);
    };

    const applyPriceFilter = () => {
        const next = new URLSearchParams(searchParams);
        const roundedMin = Math.round(priceRange[0]);
        const roundedMax = Math.round(priceRange[1]);
        
        if (roundedMin > minPrice) next.set('min_price', String(roundedMin)); else next.delete('min_price');
        if (roundedMax < maxPrice) next.set('max_price', String(roundedMax)); else next.delete('max_price');
        next.set('page', '1');
        setSearchParams(next);
    };

    return (
        <div className="bg-[#161616] text-white w-full max-w-[350px] 2xl:max-w-[455px] h-[638px] rounded-[5px]">
            <div className="p-6 lg:p-10">
                {/* Top Section - Breadcrumbs and Clear Filters */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-white font-poppins text-[12px] 2xl:text-[16px] font-normal leading-[30px] tracking-[2.4px] capitalize">Home/Pooja Items</span>
                        <button 
                            onClick={handleClearFilters}
                            className="w-[110px] 2xl:w-[168px] h-[40px] 2xl:h-[50px] flex-shrink-0 border border-white text-[#895200] font-poppins text-[12px] 2xl:text-[14px] font-normal leading-normal tracking-[2.1px] capitalize hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div className="w-full h-px bg-[#E0E0E0]"></div>
                </div>

                {/* Filter By Price Section */}
                <div className="mb-6">
                    <h3 className="text-white font-futura text-[25px] font-[450] leading-[30px] capitalize mb-6">Filter By Price</h3>
                    <div className="mb-6">
                        <div className="relative" ref={sliderRef}>
                            {/* Track */}
                            <div 
                                className="w-full h-2 bg-[#374151] rounded-lg relative cursor-pointer"
                                onClick={(e) => {
                                    // Don't handle clicks if we're clicking on a handle
                                    if ((e.target as HTMLElement).closest('[data-handle]')) return;
                                    
                                    if (!sliderRef.current) return;
                                    const rect = sliderRef.current.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const width = rect.width;
                                    const percentage = Math.max(0, Math.min(1, x / width));
                                    const value = minPrice + percentage * (maxPrice - minPrice);
                                    
                                    // Determine which handle to move based on which is closer
                                    const minDistance = Math.abs(value - priceRange[0]);
                                    const maxDistance = Math.abs(value - priceRange[1]);
                                    
                                    if (minDistance < maxDistance) {
                                        const newMin = Math.min(value, priceRange[1] - 100);
                                        setPriceRange([newMin, priceRange[1]]);
                                    } else {
                                        const newMax = Math.max(value, priceRange[0] + 100);
                                        setPriceRange([priceRange[0], newMax]);
                                    }
                                }}
                            >
                                {/* Active track */}
                                <div 
                                    className="absolute h-2 bg-[#A06020] rounded-lg"
                                    style={{
                                        left: `${getMinPosition()}%`,
                                        width: `${getMaxPosition() - getMinPosition()}%`,
                                        transition: isDragging ? 'none' : 'left 0.3s ease-out, width 0.3s ease-out'
                                    }}
                                />
                            </div>
                            
                            {/* Min Handle */}
                            <div
                                data-handle="min"
                                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                style={{ 
                                    left: `calc(${getMinPosition()}% - 12px)`,
                                    transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'min')}
                                onClick={(e) => handleHandleClick(e, 'min')}
                                onTouchStart={(e) => handleTouchStart(e, 'min')}
                            />
                            
                            {/* Max Handle */}
                            <div
                                data-handle="max"
                                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                style={{ 
                                    left: `calc(${getMaxPosition()}% - 12px)`,
                                    transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'max')}
                                onClick={(e) => handleHandleClick(e, 'max')}
                                onTouchStart={(e) => handleTouchStart(e, 'max')}
                            />
                        </div>
                    </div>
                    <div className="text-[#E0E0E0] text-sm mb-6">
                        Price: ${Math.round(priceRange[0])} – ${Math.round(priceRange[1])}
                    </div>
                    <button className="flex w-[197px] h-[50px] px-[31px] py-[21px] justify-center items-center gap-[11px] flex-shrink-0 bg-black text-white font-futura text-[14px] font-normal leading-normal tracking-[3.5px] uppercase hover:bg-gray-900 transition-colors">
                        FILTER
                    </button>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-[#E0E0E0] mb-6"></div>

                {/* Availability Section */}
                <div className="mb-6">
                    <h3 className="text-white font-poppins text-[25px] font-normal leading-[30px] capitalize mb-6">Availability</h3>
                    
                    {/* In Stock Option */}
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id="inStock"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="inStock" className="ml-3 mt-2.5 !font-poppins !text-base !font-medium !leading-[30px] !capitalize !cursor-pointer !text-white">
                            In Stock
                        </label>
                    </div>
                    
                    {/* Separator Line */}
                    <div className="w-full h-px bg-[#CCCCCC] mb-2"></div>
                    
                    {/* Out Of Stock Option */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="outOfStock"
                            checked={outOfStock}
                            onChange={(e) => setOutOfStock(e.target.checked)}
                            className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="outOfStock" className="ml-3 mt-2.5 !font-poppins !text-base !font-normal !leading-normal !cursor-pointer !text-white">
                            Out Of Stock
                        </label>
                    </div>
                    
                    {/* Separator Line */}
                    <div className="w-full h-px bg-[#CCCCCC] mt-4"></div>
                </div>
            </div>
            <style>{`
                /* Custom checkbox styling */
                input[type="checkbox"] {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid white;
                    background: transparent;
                    cursor: pointer;
                    position: relative;
                }

                input[type="checkbox"]:checked {
                    background: #A06020;
                    border-color: #A06020;
                }

                input[type="checkbox"]:checked::after {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }

                /* Ensure label text is white */
                label[for="inStock"], label[for="outOfStock"] {
                    color: white !important;
                }
            `}</style>
        </div>
    );
};

// --- Mobile Filter Modal ---
const MobileFilterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [priceRange, setPriceRange] = useState([0, 7500]);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const minPrice = 0;
    const maxPrice = 7500;

    const handleMouseDown = (e: React.MouseEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(handle);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = minPrice + percentage * (maxPrice - minPrice);

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent, handle: 'min' | 'max') => {
        e.preventDefault();
        setIsDragging(handle);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, x / width));
        const value = Math.round(minPrice + percentage * (maxPrice - minPrice));

        if (isDragging === 'min') {
            const newMin = Math.min(value, priceRange[1] - 100);
            setPriceRange([newMin, priceRange[1]]);
        } else {
            const newMax = Math.max(value, priceRange[0] + 100);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };

    const getMinPosition = () => ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100;
    const getMaxPosition = () => ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100;

    const handleClearFilters = () => {
        setPriceRange([0, 7500]);
        setInStock(false);
        setOutOfStock(false);
    };

    const handleApplyFilters = () => {
        const next = new URLSearchParams(searchParams);
        const roundedMin = Math.round(priceRange[0]);
        const roundedMax = Math.round(priceRange[1]);
        
        if (roundedMin > minPrice) next.set('min_price', String(roundedMin)); else next.delete('min_price');
        if (roundedMax < maxPrice) next.set('max_price', String(roundedMax)); else next.delete('max_price');
        next.set('page', '1');
        setSearchParams(next);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            
            {/* Modal */}
            <div 
                className={`fixed bottom-0 left-0 right-0 bg-[#161616] text-white z-50 transform transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ maxHeight: '90vh' }}
            >
                <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 2rem)' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Filters</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Filter By Price Section */}
                    <div className="mb-6">
                        <h3 className="text-white font-futura text-[20px] font-[450] leading-[30px] capitalize mb-4">Filter By Price</h3>
                        <div className="mb-4">
                            <div className="relative" ref={sliderRef}>
                                {/* Track */}
                                <div 
                                    className="w-full h-2 bg-[#374151] rounded-lg relative cursor-pointer"
                                    onClick={(e) => {
                                        if ((e.target as HTMLElement).closest('[data-handle]')) return;
                                        
                                        if (!sliderRef.current) return;
                                        const rect = sliderRef.current.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const width = rect.width;
                                        const percentage = Math.max(0, Math.min(1, x / width));
                                        const value = Math.round(minPrice + percentage * (maxPrice - minPrice));
                                        
                                        const minDistance = Math.abs(value - priceRange[0]);
                                        const maxDistance = Math.abs(value - priceRange[1]);
                                        
                                        if (minDistance < maxDistance) {
                                            const newMin = Math.min(value, priceRange[1] - 100);
                                            setPriceRange([newMin, priceRange[1]]);
                                        } else {
                                            const newMax = Math.max(value, priceRange[0] + 100);
                                            setPriceRange([priceRange[0], newMax]);
                                        }
                                    }}
                                >
                                    {/* Active track */}
                                    <div 
                                        className="absolute h-2 bg-[#A06020] rounded-lg"
                                        style={{
                                            left: `${getMinPosition()}%`,
                                            width: `${getMaxPosition() - getMinPosition()}%`,
                                            transition: isDragging ? 'none' : 'left 0.3s ease-out, width 0.3s ease-out'
                                        }}
                                    />
                                </div>
                                
                                {/* Min Handle */}
                                <div
                                    data-handle="min"
                                    className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                    style={{ 
                                        left: `calc(${getMinPosition()}% - 12px)`,
                                        transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                    }}
                                    onMouseDown={(e) => handleMouseDown(e, 'min')}
                                    onTouchStart={(e) => handleTouchStart(e, 'min')}
                                />
                                
                                {/* Max Handle */}
                                <div
                                    data-handle="max"
                                    className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#A06020] border-2 border-white rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all duration-300 ease-out z-10 select-none"
                                    style={{ 
                                        left: `calc(${getMaxPosition()}% - 12px)`,
                                        transition: isDragging ? 'none' : 'left 0.3s ease-out'
                                    }}
                                    onMouseDown={(e) => handleMouseDown(e, 'max')}
                                    onTouchStart={(e) => handleTouchStart(e, 'max')}
                                />
                            </div>
                        </div>
                        <div className="text-[#E0E0E0] text-sm mb-4">
                            Price: ${Math.round(priceRange[0])} – ${Math.round(priceRange[1])}
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-[#E0E0E0] mb-6"></div>

                    {/* Availability Section */}
                    <div className="mb-6">
                        <h3 className="text-white font-poppins text-[20px] font-normal leading-[30px] capitalize mb-4">Availability</h3>
                        
                        {/* In Stock Option */}
                        <div className="flex items-center mb-3">
                            <input
                                type="checkbox"
                                id="mobileInStock"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                                className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            <label htmlFor="mobileInStock" className="ml-3 !font-poppins !text-base !font-medium !leading-[30px] !capitalize !cursor-pointer !text-white">
                                In Stock
                            </label>
                        </div>
                        
                        {/* Separator Line */}
                        <div className="w-full h-px bg-[#CCCCCC] mb-3"></div>
                        
                        {/* Out Of Stock Option */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="mobileOutOfStock"
                                checked={outOfStock}
                                onChange={(e) => setOutOfStock(e.target.checked)}
                                className="w-4 h-4 border border-white bg-transparent rounded-none focus:ring-0 focus:ring-offset-0 cursor-pointer"
                            />
                            <label htmlFor="mobileOutOfStock" className="ml-3 !font-poppins !text-base !font-normal !leading-normal !cursor-pointer !text-white">
                                Out Of Stock
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-700">
                        <button 
                            onClick={handleClearFilters}
                            className="flex-1 h-12 border border-white text-white font-medium rounded transition-colors hover:bg-white hover:text-black"
                        >
                            Clear Filters
                        </button>
                        <button 
                            onClick={handleApplyFilters}
                            className="flex-1 h-12 bg-[#A06020] text-white font-medium rounded transition-colors hover:bg-[#895200]"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                /* Custom checkbox styling for mobile modal */
                #mobileInStock, #mobileOutOfStock {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    width: 16px;
                    height: 16px;
                    border: 2px solid white;
                    background: transparent;
                    cursor: pointer;
                    position: relative;
                }

                #mobileInStock:checked, #mobileOutOfStock:checked {
                    background: #A06020;
                    border-color: #A06020;
                }

                #mobileInStock:checked::after, #mobileOutOfStock:checked::after {
                    content: '';
                    position: absolute;
                    left: 4px;
                    top: 1px;
                    width: 4px;
                    height: 8px;
                    border: solid white;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }

                /* Ensure label text is white */
                label[for="mobileInStock"], label[for="mobileOutOfStock"] {
                    color: white !important;
                }
            `}</style>
        </>
    );
};

// --- Search Bar Component ---
const SearchBar: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Set a new timeout to debounce the search
        searchTimeoutRef.current = setTimeout(() => {
            setIsSearching(true);
            
            // Update URL parameters
            const newSearchParams = new URLSearchParams(searchParams);
            if (value.trim()) {
                newSearchParams.set('search', value.trim());
            } else {
                newSearchParams.delete('search');
            }
            // Reset to first page when searching
            newSearchParams.set('page', '1');
            setSearchParams(newSearchParams);
            
            setIsSearching(false);
        }, 500); // 500ms debounce
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear the timeout and execute search immediately
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        setIsSearching(true);
        
        // Update URL parameters
        const newSearchParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) {
            newSearchParams.set('search', searchTerm.trim());
        } else {
            newSearchParams.delete('search');
        }
        // Reset to first page when searching
        newSearchParams.set('page', '1');
        setSearchParams(newSearchParams);
        
        setIsSearching(false);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('search');
        newSearchParams.set('page', '1');
        setSearchParams(newSearchParams);
    };

    // Update search term when URL changes
    useEffect(() => {
        const urlSearchTerm = searchParams.get('search') || '';
        setSearchTerm(urlSearchTerm);
    }, [searchParams]);

    return (
        <div className="bg-black max-w-[1078px] mx-auto mb-8 px-4 2xl:px-0">
            <form onSubmit={handleSearchSubmit} className="flex gap-4">
                <div className="relative flex-1 lg:w-4/5">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for products..."
                        className="w-full pl-10 pr-12 py-3 bg-[#161616] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A06020] focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
                                <button
                    type="submit"
                    className="bg-[#161616] text-white px-6 py-3 rounded-lg transition-colors duration-200 hidden lg:flex items-center justify-center gap-2 lg:w-1/5"
                >
                   
                    <span className="hidden sm:inline font-medium">Search</span>
                </button>
                {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#A06020]"></div>
                    </div>
                )}
            </form>
        </div>
    );
};

// --- Discount Chips ---
const DiscountChips: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const current = searchParams.get('discount'); // lt10 | 10+ | 20+ | 30+ | 40+ | 50+

    const setDiscount = (key: string) => {
        const next = new URLSearchParams(searchParams);
        if (current === key) {
            next.delete('discount');
        } else {
            next.set('discount', key);
        }
        next.set('page', '1');
        setSearchParams(next);
    };

    const options = [
        { key: 'lt10', label: 'Less than 10%' },
        { key: '10+', label: '10% or more' },
        { key: '20+', label: '20% or more' },
        { key: '30+', label: '30% or more' },
        { key: '40+', label: '40% or more' },
        { key: '50+', label: '50% or more' },
    ];

    return (
        <div className="bg-black max-w-[1078px] mx-auto px-4 2xl:px-0 mb-4">
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <button
                        key={opt.key}
                        onClick={() => setDiscount(opt.key)}
                        className={`px-3 py-1 rounded-full border text-sm transition-colors ${current === opt.key ? 'bg-[#A06020] text-white border-[#A06020]' : 'bg-transparent text-white border-gray-600 hover:border-white'}`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- ProductGrid ---
const ProductGrid: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // Navigation handled within cards; no local navigate needed here
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 9; // 3x3 grid

    // Get filters from URL parameters
    const categoryId = searchParams.get('category_id');
    const brandId = searchParams.get('brand_id');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const discount = searchParams.get('discount'); // one of lt10, 10+, 20+, 30+, 40+, 50+

    const discountToParams = (chip: string | null | undefined): { discount_min?: number; discount_max?: number } => {
        switch (chip) {
            case 'lt10':
                return { discount_min: 0, discount_max: 9.99 };
            case '10+':
                return { discount_min: 10 };
            case '20+':
                return { discount_min: 20 };
            case '30+':
                return { discount_min: 30 };
            case '40+':
                return { discount_min: 40 };
            case '50+':
                return { discount_min: 50 };
            default:
                return {};
        }
    };

    // Keep current page in sync with URL (?page=)
    useEffect(() => {
        const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
        if (!Number.isFinite(pageFromUrl) || pageFromUrl < 1) return;
        if (pageFromUrl !== currentPage) {
            setCurrentPage(pageFromUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('page')]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: any = {
                    page: currentPage,
                    per_page: productsPerPage,
                    in_stock_only: true,
                };

                // Add filters if they exist
                if (categoryId) params.category_id = parseInt(categoryId);
                if (brandId) params.brand_id = parseInt(brandId);
                if (search) params.search = search;
                if (minPrice) params.min_price = parseFloat(minPrice);
                if (maxPrice) params.max_price = parseFloat(maxPrice);

                const response = await shop4ApiService.getProducts({
                    ...params,
                    ...discountToParams(discount ?? undefined),
                });
                
                if (response && (response as any).success) {
                    const mappedProducts = (response as any).products?.map(mapApiProductToLocal) ?? [];
                    setProducts(mappedProducts);

                    // Handle both legacy and new pagination shapes
                    const pagination = (response as any).pagination;
                    if (pagination) {
                        const totalItems = Number(pagination.total_items) || 0;
                        const totalPagesFromApi = Number(pagination.total_pages) || Math.ceil(totalItems / productsPerPage) || 0;
                        setTotalProducts(totalItems);
                        setTotalPages(totalPagesFromApi);
                        // If API adjusts the page, reflect it
                        const apiPage = Number(pagination.page) || currentPage;
                        if (apiPage !== currentPage) setCurrentPage(apiPage);
                    } else {
                        const total = Number((response as any).total) || 0;
                        const totalPagesTop = Number((response as any).total_pages) || (total ? Math.ceil(total / productsPerPage) : 0);
                        setTotalProducts(total);
                        setTotalPages(totalPagesTop);
                        const apiPageTop = Number((response as any).page) || currentPage;
                        if (apiPageTop !== currentPage) setCurrentPage(apiPageTop);
                    }
                } else {
                    setProducts([]);
                    setTotalProducts(0);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setTotalProducts(0);
                setTotalPages(0);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [currentPage, categoryId, brandId, search, minPrice, maxPrice, discount]);

    // Reset pagination when discount filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [discount]);

    const handlePageChange = (page: number) => {
        if (page < 1 || (totalPages && page > totalPages)) return;
        // Update URL param so refresh/back works and other widgets can reset to page 1
        const next = new URLSearchParams(searchParams);
        next.set('page', String(page));
        setSearchParams(next);
        setCurrentPage(page);
        // Optionally scroll to top of grid
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {}
    };

    // Navigation is handled inside the product card to avoid hijacking add-to-cart clicks

    if (loading) {
        return (
            <div className="bg-black max-w-[1078px] mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-white text-xl">Loading products...</div>
                </div>
            </div>
        );
    }

    const safeTotal = Number.isFinite(totalProducts) ? totalProducts : 0;
    const startIndex = safeTotal === 0 ? 0 : (currentPage - 1) * productsPerPage;
    const endIndex = safeTotal === 0 ? 0 : Math.min(startIndex + productsPerPage, safeTotal);

    return (
        <div className="bg-black max-w-[1078px] mx-auto min-h-screen px-4 sm:px-6 lg:px-4 2xl:px-0 py-8">
            {/* Search Results Header */}
            {search && (
                <div className="mb-6">
                    <p className="text-white text-sm opacity-80">
                        Search results for "{search}" - {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
                    </p>
                </div>
            )}
            
            <div className=" mx-auto mb-6">
                <p className="text-white text-sm opacity-80">
                    {safeTotal > 0
                        ? <>Showing {startIndex + 1}–{endIndex} of {safeTotal} Results</>
                        : <>0 Results</>}
                </p>
            </div>
            <div className="max-w-[1078px] mx-auto">
                {products.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-white text-xl">
                            {search ? `No products found for "${search}"` : 'No products found'}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-x-8 sm:gap-x-12 2xl:gap-x-20 gap-y-28 sm:gap-y-28 lg:gap-y-40">
                        {products.map((product) => (
                            <div key={product.id} className="cursor-pointer">
                                {/* Let the card control its own internal clicks; wrap a small overlay for image/title nav if needed in the card itself */}
                                <Shop4ProductCardWithWishlist product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto mt-12 flex justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

// --- Pagination ---
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        } else {
            onPageChange(1); // Loop back to first page
        }
    };

    // Generate array of page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center py-20 gap-4">
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`
                        w-[47px] h-[47px] rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0
                        transition-all duration-200
                        ${currentPage === page
                            ? 'bg-[#B19D7F] text-white'
                            : 'text-white hover:text-gray-300'
                        }
                    `}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNextClick}
                className="text-white hover:text-gray-300 transition-colors duration-200"
            >
                <ChevronRight size={32} />
            </button>
        </div>
    );
};


// --- Hero ---
const Hero: React.FC = () => {
    return (
        <section className="text-white py-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-[36px] font-poppins font-normal leading-normal uppercase text-[#FFF] mb-4">
                    AOIN POOJA STORE
                </h1>
                <div className="text-[14px] font-poppins font-normal leading-normal tracking-[2.1px] uppercase text-[#FFF]">
                    <span className="hover:text-yellow-400 cursor-pointer transition-colors">HOME</span>
                    <span className="mx-2">-</span>
                    <span className="text-[#FFF]">POOJA SHOP</span>
                </div>
            </div>
        </section>
    );
};

// --- Combined Page Component ---
const AllProductPageContent: React.FC = () => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <>
            <Hero />
            <main className="container max-w-[1740px] mx-auto px-4 py-20">
                <div className="flex flex-col lg:flex-row gap-0 2xl:gap-8 ">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-96  2xl:w-[455px] order-2 lg:order-1">
                        <div className="sticky top-8">
                            <Sidebar />
                        </div>
                    </aside>
                    
                    {/* Product Grid with Search */}
                    <div className="flex-1 order-1 lg:order-2">
                        <SearchBar />
                        {/* Discount chips */}
                        <DiscountChips />
                        
                        {/* Mobile Filter Button - Centered below search bar */}
                        <div className="lg:hidden flex justify-center mb-6">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="flex items-center gap-2 bg-[#161616] text-white px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                            >
                                <Filter size={20} />
                                <span className="font-medium">Filters</span>
                            </button>
                        </div>
                        
                        <ProductGrid />
                    </div>
                </div>
                
                {/* Mobile Filter Modal */}
                <MobileFilterModal 
                    isOpen={isMobileFilterOpen} 
                    onClose={() => setIsMobileFilterOpen(false)} 
                />
            </main>
        </>
    );
}


export default AllProductPageContent;

