import React from 'react';
import { FaUsers, FaMoneyBillWave, FaClock, FaTrophy } from 'react-icons/fa';

interface AnalyticsCardProps {
  totalMerchants: number;
  totalTransferred: number;
  pendingPayouts: number;
  topMerchant: {
    name: string;
    amount: number;
  };
}

const AnalyticsCards: React.FC<AnalyticsCardProps> = ({
  totalMerchants,
  totalTransferred,
  pendingPayouts,
  topMerchant,
}) => {
  const cards = [
    {
      title: 'Total Merchants',
      value: totalMerchants,
      icon: <FaUsers className="text-orange-500" />,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      textColor: 'text-orange-700',
    },
    {
      title: 'Total Transferred (This Month)',
      value: `₹${totalTransferred.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-green-500" />,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      textColor: 'text-green-700',
    },
    {
      title: 'Pending Payouts',
      value: `₹${pendingPayouts.toLocaleString()}`,
      icon: <FaClock className="text-red-500" />,
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      textColor: 'text-red-700',
    },
    {
      title: 'Top Earning Merchant',
      value: `${topMerchant.name} (₹${topMerchant.amount.toLocaleString()})`,
      icon: <FaTrophy className="text-orange-500" />,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      textColor: 'text-orange-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-medium mb-2">{card.title}</p>
              <p className={`${card.textColor} text-2xl font-bold truncate`}>{card.value}</p>
            </div>
            <div className="text-3xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards; 