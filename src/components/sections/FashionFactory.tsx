import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiveCard from '../../data/LiveCard';

const FashionFactory: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 220 + 24; // card width (220px) + gap (24px)
    const scrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const factoryContent = [
    {
      id: 'factory-1',
      title: 'Makeup Masterclass',
      host: 'Emma',
      thumbnail: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Factory'
    },
    {
      id: 'factory-2',
      title: 'Makeup Masterclass',
      host: 'Sophie',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Factory'
    },
    {
      id: 'factory-3',
      title: 'Makeup Masterclass',
      host: 'Sophie',
      thumbnail: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Factory'
    },
    {
      id: 'factory-4',
      title: 'Makeup Masterclass',
      host: 'Sophie',
      thumbnail: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Factory'
    },
    {
      id: 'factory-5',
      title: 'Makeup Masterclass',
      host: 'Sophie',
      thumbnail: 'https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Factory'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-medium text-gray-900">Fashion Factory</h2>
        <a href="/live-shop/fashion-factory" className="text-sm text-gray-600 hover:text-gray-900">
          See All
        </a>
      </div>
      
      <div className="relative px-12">
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF4D00] hover:bg-[#FF4D00]/90 rounded-full flex items-center justify-center shadow-md z-10 transition-colors duration-200"
          aria-label="Previous"
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
        >
          {factoryContent.map((item) => (
            <LiveCard key={item.id} {...item} />
          ))}
        </div>

        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FF4D00] hover:bg-[#FF4D00]/90 rounded-full flex items-center justify-center shadow-md z-10 transition-colors duration-200"
          aria-label="Next"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default FashionFactory; 