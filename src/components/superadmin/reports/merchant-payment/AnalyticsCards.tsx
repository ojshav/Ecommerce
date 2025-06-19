import React, { useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaClock, FaChartLine, FaEye } from 'react-icons/fa';
import AnalyticsDetailModal from './AnalyticsDetailModal';

interface AnalyticsCardProps {
  totalMerchants: number;
  totalTransferred: number;
  pendingPayouts: number;
  averagePayoutTime: number;
  merchantsWithPendingPayments: number;
  totalCommissionEarned: number;
  paymentTrends: {
    thisMonth: number;
    lastMonth: number;
  };
}

const AnalyticsCards: React.FC<AnalyticsCardProps> = ({
  totalMerchants,
  totalTransferred,
  pendingPayouts,
  averagePayoutTime,
  merchantsWithPendingPayments,
  totalCommissionEarned,
  paymentTrends
}) => {
  const [selectedCard, setSelectedCard] = useState<null | {
    title: string;
    value: string;
    type: string;
    details: any;
  }>(null);

  const paymentGrowth = ((paymentTrends.thisMonth - paymentTrends.lastMonth) / paymentTrends.lastMonth) * 100;

  const getMerchantDetails = () => ({
    categoryDistribution: {
      'Electronics': 25,
      'Fashion': 20,
      'Home & Living': 15,
      'Beauty': 15,
      'Sports': 10,
      'Books': 8,
      'Food': 7
    },
    recentActivity: [
      {
        description: 'New merchant "Tech Haven" registered',
        time: '2 hours ago'
      },
      {
        description: 'Fashion Forward updated business profile',
        time: '4 hours ago'
      },
      {
        description: 'Beauty Box completed verification',
        time: '6 hours ago'
      }
    ]
  });

  const getPaymentDetails = () => ({
    trends: [
      { period: 'This Month', amount: paymentTrends.thisMonth, growth: paymentGrowth },
      { period: 'Last Month', amount: paymentTrends.lastMonth, growth: 0 },
      { period: 'Last 3 Months', amount: paymentTrends.lastMonth * 3, growth: 15 }
    ],
    paymentMethods: {
      'Bank Transfer': 60,
      'UPI': 25,
      'Wallet': 15
    },
    recentTransactions: [
      {
        merchant: 'TechGear Store',
        amount: 75000,
        date: '2024-03-15',
        status: 'Completed'
      },
      {
        merchant: 'Fashion Forward',
        amount: 92000,
        date: '2024-03-12',
        status: 'Processing'
      },
      {
        merchant: 'Home Essentials',
        amount: 45000,
        date: '2024-03-14',
        status: 'Pending'
      }
    ]
  });

  const cards = [
    {
      title: 'Total Merchants',
      value: totalMerchants,
      subValue: `${merchantsWithPendingPayments} with pending payments`,
      icon: <FaUsers className="text-orange-500" />,
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      textColor: 'text-orange-700',
      type: 'merchants',
      details: getMerchantDetails()
    },
    {
      title: 'Total Transferred',
      value: `₹${totalTransferred.toLocaleString()}`,
      subValue: `${paymentGrowth >= 0 ? '+' : ''}${paymentGrowth.toFixed(1)}% vs last month`,
      icon: <FaMoneyBillWave className="text-green-500" />,
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      textColor: 'text-green-700',
      trend: paymentGrowth >= 0 ? 'up' : 'down',
      type: 'payments',
      details: getPaymentDetails()
    },
    {
      title: 'Pending Payouts',
      value: `₹${pendingPayouts.toLocaleString()}`,
      subValue: `${averagePayoutTime} days avg. processing time`,
      icon: <FaClock className="text-red-500" />,
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      textColor: 'text-red-700',
      type: 'payments',
      details: getPaymentDetails()
    },
    {
      title: 'Commission Earned',
      value: `₹${totalCommissionEarned.toLocaleString()}`,
      subValue: 'Total platform commission',
      icon: <FaChartLine className="text-purple-500" />,
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      textColor: 'text-purple-700',
      type: 'payments',
      details: getPaymentDetails()
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{card.icon}</div>
              <div className="flex items-center gap-3">
                {card.trend && (
                  <div className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend === 'up' ? '↑' : '↓'}
                  </div>
                )}
                <button
                  onClick={() => setSelectedCard({
                    title: card.title,
                    value: typeof card.value === 'number' ? card.value.toString() : card.value,
                    type: card.type,
                    details: card.details
                  })}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-white/20 rounded-full"
                  title="View Details"
                >
                  <FaEye className={`w-5 h-5 ${card.textColor}`} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
              <p className={`${card.textColor} text-2xl font-bold truncate mb-2`}>{card.value}</p>
              <p className="text-gray-500 text-xs">{card.subValue}</p>
            </div>
          </div>
        ))}
      </div>

      <AnalyticsDetailModal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        data={selectedCard || { title: '', value: '', type: '', details: {} }}
      />
    </>
  );
};

export default AnalyticsCards; 