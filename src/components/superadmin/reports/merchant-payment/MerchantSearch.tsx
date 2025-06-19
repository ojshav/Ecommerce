import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface MerchantSearchProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filter: string) => void;
}

const MerchantSearch: React.FC<MerchantSearchProps> = ({ onSearch, onFilterChange }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6 sm:mb-8 border border-orange-100 w-full">
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search merchants by name, ID, or store name..."
              className="w-full pl-12 pr-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50"
              onChange={(e) => onSearch(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 text-gray-700"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Living</option>
            <option value="beauty">Beauty & Personal Care</option>
          </select>

          <select
            className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 text-gray-700"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Payment Pending</option>
            <option value="completed">Payment Completed</option>
          </select>

          {/* Date Range Picker */}
          <div className="flex flex-col sm:flex-row gap-2 col-span-1 sm:col-span-2">
            <div className="flex-1">
              <input
                type="date"
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 text-gray-700"
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange-500 font-medium px-2">to</span>
            </div>
            <div className="flex-1">
              <input
                type="date"
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSearch; 