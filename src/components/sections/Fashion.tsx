import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiveCard from '../../data/LiveCard';

interface FashionContent {
  id: string;
  title: string;
  host: string;
  thumbnail: string;
  viewers?: number;
  type?: string;
}

const Fashion: React.FC = () => {
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

  const fashionContent: FashionContent[] = [
    {
      id: '1',
      title: 'Live with Sarah',
      host: 'Sarah',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '2',
      title: 'Tech Talk with Mark',
      host: 'Mark',
      thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '3',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '4',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    },
    {
      id: '5',
      title: 'Beauty Secrets with Chloe',
      host: 'Chloe',
      thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop',
      viewers: 423,
      type: 'Fashion'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-medium text-gray-900">Fashion</h2>
        <a href="/live-shop/fashion" className="text-sm text-gray-600 hover:text-gray-900">
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
          {fashionContent.map((item) => (
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

export default Fashion; 