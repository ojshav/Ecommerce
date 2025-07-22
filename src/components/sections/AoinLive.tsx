import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        console.log('Fetching streams from:', `${API_BASE_URL}/api/live-streams`);
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
        console.log('Received streams data:', data);
        setLiveContent(data);
      } catch (err) {
        console.error('Error fetching streams:', err);
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
    const scrollAmount = 220 + 24; // card width (220px) + gap (24px)
    const scrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const handleStreamClick = (streamId: number) => {
    console.log('Selected stream:', streamId);
    console.log('Stream details:', liveContent.find(stream => stream.stream_id === streamId));
    navigate(`/live-shop/product/${streamId}`);
  };

  // Row layout (for LiveShop page)
  if (layout === 'row') {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[28px] font-medium text-[#FF4D00]">AOIN LIVE</h2>
          <a href="/live-shop/aoin-live" className="text-sm text-gray-600 hover:text-gray-900">
            See All
          </a>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        ) : liveContent.length === 0 ? (
          <div className="text-gray-500 text-center">No live streams found.</div>
        ) : (
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
              {liveContent.map((item, index) => (
                <div key={`${item.stream_id}-${index}`} className="min-w-[220px] max-w-[220px]">
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-2 flex flex-col h-full">
                    {item.thumbnail_url ? (
                      <img src={item.thumbnail_url} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-400">No Image</div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1 truncate" title={item.title}>{item.title}</h3>
                      <div className="text-xs text-gray-500 mb-1 truncate" title={item.description}>{item.description}</div>
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        {item.merchant?.business_name || 'Unknown Merchant'}
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        {item.scheduled_time ? (
                          <>Scheduled: {new Date(item.scheduled_time).toLocaleString()}</>
                        ) : null}
                      </div>
                      <div className={`inline-block px-2 py-1 text-xs rounded font-semibold ${item.status === 'LIVE' ? 'bg-green-100 text-green-700' : item.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.status}
                      </div>
                    </div>
                    <button
                      onClick={() => handleStreamClick(item.stream_id)}
                      className="mt-2 inline-block px-3 py-1 bg-[#F2631F] text-white rounded hover:bg-[#e55a1a] text-center text-xs font-medium"
                    >
                      Watch
                    </button>
                  </div>
                </div>
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
        )}
      </div>
    );
  }

  // Grid layout (for standalone page)
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-16 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[36px] font-medium text-[#FF4D00]">AOIN LIVE</h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        ) : liveContent.length === 0 ? (
          <div className="text-gray-500 text-center">No live streams found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {liveContent.map((item, index) => (
              <div key={`${item.stream_id}-${index}`} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-2 flex flex-col h-full">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-400">No Image</div>
                )}
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1 truncate" title={item.title}>{item.title}</h3>
                  <div className="text-xs text-gray-500 mb-1 truncate" title={item.description}>{item.description}</div>
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    {item.merchant?.business_name || 'Unknown Merchant'}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {item.scheduled_time ? (
                      <>Scheduled: {new Date(item.scheduled_time).toLocaleString()}</>
                    ) : null}
                  </div>
                  <div className={`inline-block px-2 py-1 text-xs rounded font-semibold ${item.status === 'LIVE' ? 'bg-green-100 text-green-700' : item.status === 'SCHEDULED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    {item.status}
                  </div>
                </div>
                <button
                  onClick={() => handleStreamClick(item.stream_id)}
                  className="mt-2 inline-block px-3 py-1 bg-[#F2631F] text-white rounded hover:bg-[#e55a1a] text-center text-xs font-medium"
                >
                  Watch
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <button className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AoinLive; 