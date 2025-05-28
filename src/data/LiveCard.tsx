import React from 'react';
import { Play } from 'lucide-react';

interface LiveCardProps {
  id: string;
  title: string;
  host: string;
  thumbnail: string;
  viewers?: number;
  isLive?: boolean;
  type?: string;
}

const LiveCard: React.FC<LiveCardProps> = ({
  title,
  host,
  thumbnail,
  viewers,
  isLive,
  type
}) => {
  return (
    <div className="relative flex-shrink-0 w-[220px] group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-5 h-5 text-gray-900" fill="currentColor" />
          </div>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
            LIVE
          </div>
        )}

        {/* Viewer Count */}
        {viewers && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            {viewers}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{host}</p>
      </div>
    </div>
  );
};

export default LiveCard; 