import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import AnalyticsCards from '../../../components/superadmin/reports/merchant-payment/AnalyticsCards';
import MerchantSearch from '../../../components/superadmin/reports/merchant-payment/MerchantSearch';
import PaymentSummaryTable from '../../../components/superadmin/reports/merchant-payment/PaymentSummaryTable';
import BulkPaymentModal from '../../../components/superadmin/reports/merchant-payment/BulkPaymentModal';

// Mock data - Replace with actual API calls
const mockData = {
  analytics: {
    totalMerchants: 156,
    totalTransferred: 2500000,
    pendingPayouts: 750000,
    topMerchant: {
      name: "TechGear Store",
      amount: 350000
    }
  },
  merchants: [
    {
      id: "1",
      merchantName: "TechGear Store",
      storeId: "TECH001",
      totalOrders: 150,
      ordersDelivered: 145,
      eligibleForPayment: 30,
      amountTransferred: 250000,
      pendingAmount: 75000,
      lastPaymentDate: "2024-03-15",
      orders: [
        {
          orderId: "ORD001",
          productName: "Wireless Earbuds",
          deliveryDate: "2024-03-01",
          orderAmount: 2999,
          commission: 299,
          netAmount: 2700,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "ORD002",
          productName: "Smart Watch",
          deliveryDate: "2024-03-10",
          orderAmount: 5999,
          commission: 599,
          netAmount: 5400,
          paymentStatus: "pending" as const
        }
      ]
    },
    // Add more mock merchants as needed
  ]
};

const MerchantPaymentReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [merchants, setMerchants] = useState(mockData.merchants);
  const [analytics, setAnalytics] = useState(mockData.analytics);

  // Simulated API call to fetch data
  useEffect(() => {
    // In a real application, you would fetch data here
    setMerchants(mockData.merchants);
    setAnalytics(mockData.analytics);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search logic here
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    // Implement filter logic here
  };

  const handleViewOrder = (orderId: string) => {
    // Implement order view logic here
    console.log("Viewing order:", orderId);
  };

  const handleBulkPayment = () => {
    // Implement bulk payment logic here
    console.log("Processing bulk payments...");
    setIsModalOpen(false);
  };

  const eligiblePayments = {
    totalAmount: merchants.reduce((sum, m) => sum + m.pendingAmount, 0),
    merchantCount: merchants.filter(m => m.pendingAmount > 0).length
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2 sm:mb-3">
          Merchant Payment Report
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Track and manage merchant payments, view delivery status, and process eligible payments.
        </p>
      </div>

      <AnalyticsCards
        totalMerchants={analytics.totalMerchants}
        totalTransferred={analytics.totalTransferred}
        pendingPayouts={analytics.pendingPayouts}
        topMerchant={analytics.topMerchant}
      />

      <div className="flex flex-col gap-4 sm:gap-6 mb-6">
        <div className="w-full">
          <MerchantSearch
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
          >
            <FaMoneyBillWave className="text-xl" />
            <span>Transfer All Eligible Payments</span>
          </button>
        </div>
      </div>

      <PaymentSummaryTable
        data={merchants}
        onViewOrder={handleViewOrder}
      />

      <BulkPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBulkPayment}
        totalAmount={eligiblePayments.totalAmount}
        merchantCount={eligiblePayments.merchantCount}
      />
    </div>
  );
};

export default MerchantPaymentReport; 