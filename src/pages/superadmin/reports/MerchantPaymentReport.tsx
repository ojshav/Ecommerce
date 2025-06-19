import React, { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import AnalyticsCards from '../../../components/superadmin/reports/merchant-payment/AnalyticsCards';
import MerchantSearch from '../../../components/superadmin/reports/merchant-payment/MerchantSearch';
import PaymentSummaryTable from '../../../components/superadmin/reports/merchant-payment/PaymentSummaryTable';
import BulkPaymentModal from '../../../components/superadmin/reports/merchant-payment/BulkPaymentModal';

interface FilterOptions {
  category: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

// Mock data - Replace with actual API calls
const mockData = {
  analytics: {
    totalMerchants: 156,
    totalTransferred: 2500000,
    pendingPayouts: 750000,
    averagePayoutTime: 3,
    payoutSuccessRate: 95,
    merchantsWithPendingPayments: 45,
    totalCommissionEarned: 325000,
    paymentTrends: {
      thisMonth: 2500000,
      lastMonth: 2200000
    }
  },
  merchants: [
    {
      id: "1",
      merchantName: "TechGear Store",
      storeId: "TECH001",
      category: "electronics",
      totalOrders: 150,
      ordersDelivered: 145,
      eligibleForPayment: 30,
      amountTransferred: 250000,
      pendingAmount: 75000,
      lastPaymentDate: "2024-03-15",
      status: "pending",
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
    {
      id: "2",
      merchantName: "Fashion Forward",
      storeId: "FASH001",
      category: "fashion",
      totalOrders: 280,
      ordersDelivered: 265,
      eligibleForPayment: 45,
      amountTransferred: 380000,
      pendingAmount: 92000,
      lastPaymentDate: "2024-03-12",
      status: "active",
      orders: [
        {
          orderId: "FF001",
          productName: "Designer Dress",
          deliveryDate: "2024-03-01",
          orderAmount: 8999,
          commission: 899,
          netAmount: 8100,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "FF002",
          productName: "Leather Handbag",
          deliveryDate: "2024-03-08",
          orderAmount: 12999,
          commission: 1299,
          netAmount: 11700,
          paymentStatus: "pending" as const
        },
        {
          orderId: "FF003",
          productName: "Premium Sunglasses",
          deliveryDate: "2024-03-10",
          orderAmount: 4999,
          commission: 499,
          netAmount: 4500,
          paymentStatus: "pending" as const
        }
      ]
    },
    {
      id: "3",
      merchantName: "Home Essentials",
      storeId: "HOME001",
      category: "home",
      totalOrders: 180,
      ordersDelivered: 170,
      eligibleForPayment: 25,
      amountTransferred: 150000,
      pendingAmount: 45000,
      lastPaymentDate: "2024-03-14",
      status: "completed",
      orders: [
        {
          orderId: "HE001",
          productName: "Luxury Bedding Set",
          deliveryDate: "2024-03-05",
          orderAmount: 15999,
          commission: 1599,
          netAmount: 14400,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "HE002",
          productName: "Smart LED Lamp",
          deliveryDate: "2024-03-09",
          orderAmount: 3999,
          commission: 399,
          netAmount: 3600,
          paymentStatus: "pending" as const
        },
        {
          orderId: "HE003",
          productName: "Kitchen Organizer Set",
          deliveryDate: "2024-03-12",
          orderAmount: 2499,
          commission: 249,
          netAmount: 2250,
          paymentStatus: "pending" as const
        }
      ]
    },
    {
      id: "4",
      merchantName: "Beauty Box",
      storeId: "BEAUTY001",
      category: "beauty",
      totalOrders: 220,
      ordersDelivered: 210,
      eligibleForPayment: 35,
      amountTransferred: 180000,
      pendingAmount: 55000,
      lastPaymentDate: "2024-03-13",
      status: "processing",
      orders: [
        {
          orderId: "BB001",
          productName: "Luxury Skincare Set",
          deliveryDate: "2024-03-02",
          orderAmount: 9999,
          commission: 999,
          netAmount: 9000,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "BB002",
          productName: "Premium Makeup Kit",
          deliveryDate: "2024-03-07",
          orderAmount: 7999,
          commission: 799,
          netAmount: 7200,
          paymentStatus: "pending" as const
        },
        {
          orderId: "BB003",
          productName: "Hair Care Bundle",
          deliveryDate: "2024-03-11",
          orderAmount: 5999,
          commission: 599,
          netAmount: 5400,
          paymentStatus: "pending" as const
        }
      ]
    },
    {
      id: "5",
      merchantName: "Sports Hub",
      storeId: "SPORTS001",
      category: "sports",
      totalOrders: 120,
      ordersDelivered: 110,
      eligibleForPayment: 20,
      amountTransferred: 120000,
      pendingAmount: 35000,
      lastPaymentDate: "2024-03-16",
      status: "pending",
      orders: [
        {
          orderId: "SH001",
          productName: "Professional Running Shoes",
          deliveryDate: "2024-03-04",
          orderAmount: 11999,
          commission: 1199,
          netAmount: 10800,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "SH002",
          productName: "Fitness Equipment Set",
          deliveryDate: "2024-03-09",
          orderAmount: 18999,
          commission: 1899,
          netAmount: 17100,
          paymentStatus: "pending" as const
        },
        {
          orderId: "SH003",
          productName: "Sports Nutrition Pack",
          deliveryDate: "2024-03-13",
          orderAmount: 4999,
          commission: 499,
          netAmount: 4500,
          paymentStatus: "pending" as const
        }
      ]
    },
    {
      id: "6",
      merchantName: "Book Haven",
      storeId: "BOOK001",
      category: "books",
      totalOrders: 90,
      ordersDelivered: 85,
      eligibleForPayment: 15,
      amountTransferred: 75000,
      pendingAmount: 25000,
      lastPaymentDate: "2024-03-17",
      status: "hold",
      orders: [
        {
          orderId: "BH001",
          productName: "Limited Edition Book Collection",
          deliveryDate: "2024-03-06",
          orderAmount: 12999,
          commission: 1299,
          netAmount: 11700,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "BH002",
          productName: "Educational Series Bundle",
          deliveryDate: "2024-03-11",
          orderAmount: 8999,
          commission: 899,
          netAmount: 8100,
          paymentStatus: "pending" as const
        },
        {
          orderId: "BH003",
          productName: "Premium Stationery Set",
          deliveryDate: "2024-03-14",
          orderAmount: 3999,
          commission: 399,
          netAmount: 3600,
          paymentStatus: "pending" as const
        }
      ]
    },
    {
      id: "7",
      merchantName: "Foodie's Paradise",
      storeId: "FOOD001",
      category: "food",
      totalOrders: 320,
      ordersDelivered: 315,
      eligibleForPayment: 50,
      amountTransferred: 280000,
      pendingAmount: 85000,
      lastPaymentDate: "2024-03-11",
      status: "active",
      orders: [
        {
          orderId: "FP001",
          productName: "Gourmet Food Hamper",
          deliveryDate: "2024-03-03",
          orderAmount: 14999,
          commission: 1499,
          netAmount: 13500,
          paymentStatus: "transferred" as const
        },
        {
          orderId: "FP002",
          productName: "Artisanal Coffee Collection",
          deliveryDate: "2024-03-08",
          orderAmount: 6999,
          commission: 699,
          netAmount: 6300,
          paymentStatus: "pending" as const
        },
        {
          orderId: "FP003",
          productName: "Premium Tea Set",
          deliveryDate: "2024-03-12",
          orderAmount: 5999,
          commission: 599,
          netAmount: 5400,
          paymentStatus: "pending" as const
        },
        {
          orderId: "FP004",
          productName: "Organic Snack Box",
          deliveryDate: "2024-03-15",
          orderAmount: 3999,
          commission: 399,
          netAmount: 3600,
          paymentStatus: "pending" as const
        }
      ]
    }
  ]
};

const MerchantPaymentReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [merchants, setMerchants] = useState(mockData.merchants);
  const [filteredMerchants, setFilteredMerchants] = useState(mockData.merchants);
  const [analytics, setAnalytics] = useState(mockData.analytics);

  // Apply filters and search
  useEffect(() => {
    let filtered = mockData.merchants;

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(merchant =>
        merchant.merchantName.toLowerCase().includes(searchLower) ||
        merchant.storeId.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(merchant => merchant.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(merchant => merchant.status === filters.status);
    }

    // Apply date range filter
    if (filters.dateFrom || filters.dateTo) {
      filtered = filtered.filter(merchant => {
        const paymentDate = new Date(merchant.lastPaymentDate);
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        if (fromDate && toDate) {
          return paymentDate >= fromDate && paymentDate <= toDate;
        } else if (fromDate) {
          return paymentDate >= fromDate;
        } else if (toDate) {
          return paymentDate <= toDate;
        }
        return true;
      });
    }

    setFilteredMerchants(filtered);

    // Calculate analytics based on filtered data
    const totalTransferred = filtered.reduce((sum, m) => sum + m.amountTransferred, 0);
    const pendingPayouts = filtered.reduce((sum, m) => sum + m.pendingAmount, 0);
    const totalCommissionEarned = filtered.reduce((sum, m) => 
      sum + m.orders.reduce((orderSum, o) => orderSum + o.commission, 0), 
    0);
    const merchantsWithPending = filtered.filter(m => m.pendingAmount > 0).length;
    
    // Calculate average payout time (using mock data for now)
    const avgPayoutTime = Math.round(
      filtered.reduce((sum, m) => sum + (m.orders.length > 0 ? 3 : 0), 0) / 
      filtered.filter(m => m.orders.length > 0).length
    ) || 0;

    // Calculate success rate based on transferred vs pending orders
    const allOrders = filtered.flatMap(m => m.orders);
    const successRate = allOrders.length > 0
      ? Math.round((allOrders.filter(o => o.paymentStatus === 'transferred').length / allOrders.length) * 100)
      : 100;

    setAnalytics({
      totalMerchants: filtered.length,
      totalTransferred,
      pendingPayouts,
      averagePayoutTime: avgPayoutTime,
      payoutSuccessRate: successRate,
      merchantsWithPendingPayments: merchantsWithPending,
      totalCommissionEarned,
      paymentTrends: {
        thisMonth: totalTransferred,
        lastMonth: mockData.analytics.paymentTrends.lastMonth // Using mock data for comparison
      }
    });
  }, [searchTerm, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleViewOrder = (orderId: string) => {
    // Implement order view logic here
    console.log("Viewing order:", orderId);
  };

  const handleBulkPayment = (selectedMerchants: string[]) => {
    // Implement bulk payment logic here
    console.log("Processing bulk payments for merchants:", selectedMerchants);
    setIsModalOpen(false);
  };

  const eligiblePayments = {
    totalAmount: filteredMerchants.reduce((sum, m) => sum + m.pendingAmount, 0),
    merchantCount: filteredMerchants.filter(m => m.pendingAmount > 0).length
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
        averagePayoutTime={analytics.averagePayoutTime}
        payoutSuccessRate={analytics.payoutSuccessRate}
        merchantsWithPendingPayments={analytics.merchantsWithPendingPayments}
        totalCommissionEarned={analytics.totalCommissionEarned}
        paymentTrends={analytics.paymentTrends}
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
            <span>Transfer Eligible Payments</span>
          </button>
        </div>
      </div>

      <PaymentSummaryTable
        data={filteredMerchants}
        onViewOrder={handleViewOrder}
      />

      <BulkPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBulkPayment}
        merchants={filteredMerchants}
        totalAmount={eligiblePayments.totalAmount}
        merchantCount={eligiblePayments.merchantCount}
      />
    </div>
  );
};

export default MerchantPaymentReport; 