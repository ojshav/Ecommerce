import React, { useEffect, useState } from 'react';
import { FaTimes, FaChartLine, FaCalendarAlt, FaEye } from 'react-icons/fa';

interface AnalyticsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    value: string;
    type: string;
    details: any;
  };
}

const AnalyticsDetailModal: React.FC<AnalyticsDetailModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const renderDetailContent = () => {
    switch (data.type) {
      case 'merchants':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-700 mb-2">Merchant Status Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active</span>
                    <span className="text-sm font-medium text-green-600">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm font-medium text-orange-600">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">On Hold</span>
                    <span className="text-sm font-medium text-red-600">15%</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-700 mb-2">Category Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(data.details.categoryDistribution || {}).map(([category, percentage]: [string, any]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{category}</span>
                      <span className="text-sm font-medium text-orange-600">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-orange-100 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                <h4 className="font-medium text-orange-700">Recent Merchant Activity</h4>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {data.details.recentActivity?.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                      <div>
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-700 mb-2">Payment Trends</h4>
                <div className="space-y-2">
                  {data.details.trends.map((trend: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{trend.period}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">₹{trend.amount.toLocaleString()}</span>
                        <span className={`text-xs ${trend.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trend.growth >= 0 ? '↑' : '↓'} {Math.abs(trend.growth)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-700 mb-2">Payment Methods</h4>
                <div className="space-y-2">
                  {Object.entries(data.details.paymentMethods || {}).map(([method, percentage]: [string, any]) => (
                    <div key={method} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{method}</span>
                      <span className="text-sm font-medium text-green-600">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-green-100 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-green-50 border-b border-green-100">
                <h4 className="font-medium text-green-700">Recent Transactions</h4>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {data.details.recentTransactions?.map((transaction: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">₹{transaction.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 p-4
        ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-xl w-full max-w-4xl shadow-2xl border border-orange-100 transform transition-all duration-300
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-100">
                <FaEye className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
                <p className="text-lg text-orange-600 font-medium">{data.value}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {renderDetailContent()}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors font-medium"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDetailModal; 