import React from 'react';

const Promotion: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Hot Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Promotion cards would go here */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Promotion Image</span>
          </div>
          <div className="p-4">
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded inline-block mb-2">
              HOT DEAL
            </div>
            <h2 className="text-xl font-semibold mb-2">Summer Sale</h2>
            <p className="text-gray-600 mb-3">Get up to 50% off on selected items.</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Promotion Image</span>
          </div>
          <div className="p-4">
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded inline-block mb-2">
              WEEKEND ONLY
            </div>
            <h2 className="text-xl font-semibold mb-2">Flash Sale</h2>
            <p className="text-gray-600 mb-3">Limited time offers on premium products.</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Promotion Image</span>
          </div>
          <div className="p-4">
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded inline-block mb-2">
              CLEARANCE
            </div>
            <h2 className="text-xl font-semibold mb-2">End of Season</h2>
            <p className="text-gray-600 mb-3">Massive discounts on last season's items.</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;

 