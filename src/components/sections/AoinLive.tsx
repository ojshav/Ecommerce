import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Clock, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveCard from '../../data/LiveCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LiveStream {
  stream_id: number;
  title: string;
  description: string;
  thumbnail_url: string | null;
  scheduled_time: string | null;
  is_live: boolean;
  status: string;
  merchant: {
    id: number;
    business_name: string;
    business_email: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  } | null;
  stream_url: string | null;
}

interface AoinLiveProps {
  layout?: 'row' | 'grid';
}

const AoinLive: React.FC<AoinLiveProps> = ({ layout = 'row' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [liveContent, setLiveContent] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/live-streams`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch live streams');
        }
        const data = await response.json();
        setLiveContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch live streams');
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 280 + 24; // updated card width + gap
    const scrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const LiveStreamCard = ({ item, isGrid = false }: { item: LiveStream; isGrid?: boolean }) => (
    <div className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${isGrid ? 'h-full' : 'min-w-[280px] max-w-[280px]'}`}>
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        {item.thumbnail_url ? (
          <img 
            src={item.thumbnail_url} 
            alt={item.title} 
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${isGrid ? 'h-48' : 'h-40'}`}
          />
        ) : (
          <div className={`w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 ${isGrid ? 'h-48' : 'h-40'}`}>
            <Eye className="w-8 h-8" />
          </div>
        )}
        
        {/* Live Badge */}
        {item.status === 'LIVE' && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            LIVE
          </div>
        )}
        
        {/* Status Badge */}
        {item.status !== 'LIVE' && (
          <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            item.status === 'SCHEDULED' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-500 text-white'
          }`}>
            {item.status === 'SCHEDULED' && <Clock className="w-3 h-3" />}
            {item.status}
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF4D00] transition-colors duration-200">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>
        
        {/* Merchant Info */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF4D00] to-[#F2631F] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {item.merchant?.business_name || 'Unknown Merchant'}
            </p>
          </div>
        </div>
        
        {/* Scheduled Time */}
        {item.scheduled_time && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
            <Clock className="w-3 h-3" />
            {new Date(item.scheduled_time).toLocaleString()}
          </div>
        )}
        
        {/* Watch Button */}
        <button
          onClick={() => navigate(`/live-shop/${item.stream_id}`)}
          className="w-full bg-gradient-to-r from-[#FF4D00] to-[#F2631F] hover:from-[#e63d00] hover:to-[#d54d1a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Watch Now
          </div>
        </button>
      </div>
    </div>
  );

  // Row layout (for LiveShop page)
  if (layout === 'row') {
    return (
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF4D00] to-[#F2631F] bg-clip-text text-transparent">
              AOIN LIVE
            </h2>
            <p className="text-gray-600 mt-1">Discover amazing live streams</p>
          </div>
          <a 
            href="/live-shop/aoin-live" 
            className="text-[#FF4D00] hover:text-[#F2631F] font-semibold transition-colors duration-200 flex items-center gap-1"
          >
            See All
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF4D00] border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 font-semibold text-lg">{error}</div>
          </div>
        ) : liveContent.length === 0 ? (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No live streams found.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Buttons */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-xl z-10 transition-all duration-200 border border-gray-200"
              aria-label="Previous"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-4"
            >
              {liveContent.map((item) => (
                <LiveStreamCard key={item.stream_id} item={item} />
              ))}
            </div>
            
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-xl z-10 transition-all duration-200 border border-gray-200"
              aria-label="Next"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Grid layout (for standalone page)
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FF4D00] to-[#F2631F] bg-clip-text text-transparent mb-4">
            AOIN LIVE
          </h1>
          <p className="text-gray-600 text-lg">Experience the future of live streaming</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF4D00] border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 font-semibold text-xl">{error}</div>
          </div>
        ) : liveContent.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-500 text-xl">No live streams found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-12">
              {liveContent.map((item) => (
                <LiveStreamCard key={item.stream_id} item={item} isGrid={true} />
              ))}
            </div>
            
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-[#FF4D00] to-[#F2631F] hover:from-[#e63d00] hover:to-[#d54d1a] text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Load More Streams
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AoinLive;