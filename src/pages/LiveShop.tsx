import React from 'react';
import AoinLive from '../components/sections/AoinLive';
import ComingSoon from '../components/sections/ComingSoon';
import Fashion from '../components/sections/Fashion';
import FashionFactory from '../components/sections/FashionFactory';
import SundayFunday from '../components/sections/SundayFunday';

const LiveShop: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-16">
        {/* All sections */}
        <div className="space-y-16">
          <AoinLive />
          <ComingSoon />
          <Fashion />
          <FashionFactory />
          <SundayFunday />
        </div>
      </div>
    </div>
  );
};

export default LiveShop; 