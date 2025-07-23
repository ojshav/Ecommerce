import React from "react";

const ShopAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#FF4D00] text-white p-6 rounded-xl shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop Analytics</h1>
        <span className="text-lg font-medium">Overview & Insights</span>
      </div>

      {/* Analytics Content Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Card 1 */}
        <div className="bg-[#ffedd5] p-6 rounded-xl shadow-sm flex flex-col items-center">
          <span className="text-4xl font-bold text-orange-600 mb-2">--</span>
          <span className="text-lg text-orange-900">Total Shops</span>
        </div>
        {/* Example Card 2 */}
        <div className="bg-[#ffedd5] p-6 rounded-xl shadow-sm flex flex-col items-center">
          <span className="text-4xl font-bold text-orange-600 mb-2">--</span>
          <span className="text-lg text-orange-900">Active Shops</span>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col items-center">
        <span className="text-orange-400 text-lg mb-4">[Analytics Chart Placeholder]</span>
        <div className="w-full h-64 bg-[#ffedd5] rounded-lg flex items-center justify-center text-orange-300">
          Coming Soon: Interactive Shop Analytics Charts
        </div>
      </div>
    </div>
  );
};

export default ShopAnalytics; 