import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MonthlySalesData {
  month: string;
  revenue: number;
  units: number;
}

interface DetailedSalesData {
  month: string;
  product: string;
  category: string;
  price: number;
  quantity: number;
  revenue: number;
}

interface ProductPerformance {
  name: string;
  revenue: number;
}

interface CategoryData {
  name: string;
  value: string;
}

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlySalesData[]>([]);
  const [detailedSalesData, setDetailedSalesData] = useState<DetailedSalesData[]>([]);
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const { accessToken } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch monthly sales data
      const monthlyResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/reports/sales/monthly-sales`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!monthlyResponse.ok) {
        throw new Error('Failed to fetch monthly sales data');
      }

      const monthlyData = await monthlyResponse.json();
      if (monthlyData.status === 'success') {
        setMonthlyData(monthlyData.data);
      }

      // Fetch detailed sales data
      const detailedResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/reports/sales/sales-data`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!detailedResponse.ok) {
        throw new Error('Failed to fetch detailed sales data');
      }

      const detailedData = await detailedResponse.json();
      if (detailedData.status === 'success') {
        setDetailedSalesData(detailedData.data);
      }

      // Fetch product performance data
      const performanceResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/reports/sales/product-performance`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!performanceResponse.ok) {
        throw new Error('Failed to fetch product performance data');
      }

      const performanceData = await performanceResponse.json();
      if (performanceData.status === 'success') {
        setProductPerformance(performanceData.data);
      }

      // Fetch revenue by category data
      const categoryResponse = await fetch(`${API_BASE_URL}/api/merchant-dashboard/reports/sales/revenue-by-category`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!categoryResponse.ok) {
        throw new Error('Failed to fetch category data');
      }

      const categoryData = await categoryResponse.json();
      if (categoryData.status === 'success') {
        setCategoryData(categoryData.data);
      }

    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Failed to load sales data. Please try again later.');
      toast.error('Failed to load sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ArrowPathIcon className="h-8 w-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">
          <ArrowPathIcon className="h-12 w-12" />
        </div>
        <p className="text-xl font-semibold text-gray-800">Error</p>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Calculate summary statistics
  const totalRevenue = detailedSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnits = detailedSalesData.reduce((sum, item) => sum + item.quantity, 0);
  const averageOrderValue = Math.round(totalRevenue / totalUnits);

  // Define a color palette for up to 3 categories
  const pieColors = ['#FF4D00', '#00E5BE', '#8B5CF6'];

  // Map categoryData to ensure value is a number and assign a color
  const pieChartData = categoryData.map((cat, idx) => ({
    ...cat,
    value: Number(cat.value),
    fill: pieColors[idx % pieColors.length],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#FF4D00] text-white p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">Sales Performance Report</h1>
        <div className="flex gap-3">
          <button 
            onClick={fetchData}
            className="flex items-center gap-2 bg-white text-[#FF4D00] px-4 py-2 rounded-lg hover:bg-opacity-90"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Refresh Data
          </button>
          <button className="flex items-center gap-2 bg-[#FF3800] text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-3xl font-semibold text-[#FF4D00]">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600">Total Sales</p>
          <p className="text-3xl font-semibold text-[#FF4D00]">{totalUnits.toLocaleString()} <span className="text-gray-500 text-base">units</span></p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-600">Average Order Value</p>
          <p className="text-3xl font-semibold text-[#FF4D00]">${averageOrderValue}</p>
          </div>
      </div>

      {/* Revenue & Sales Trend Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-[#FF4D00] mb-4">Revenue & Sales Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#FF4D00" 
                name="Revenue"
                dot={{ fill: '#FF4D00' }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="units" 
                stroke="#00E5BE" 
                name="Units Sold"
                dot={{ fill: '#00E5BE' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Sales Data */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h2 className="text-xl font-semibold text-[#FF4D00] p-6">Detailed Sales Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FF4D00] text-white">
              <tr>
                <th className="px-6 py-3 text-left">MONTH</th>
                <th className="px-6 py-3 text-left">PRODUCT</th>
                <th className="px-6 py-3 text-left">CATEGORY</th>
                <th className="px-6 py-3 text-right">PRICE</th>
                <th className="px-6 py-3 text-right">QUANTITY</th>
                <th className="px-6 py-3 text-right">REVENUE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {detailedSalesData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600">{item.month}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-right">${item.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{item.quantity}</td>
                  <td className="px-6 py-4 text-right">${item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Performance and Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#FF4D00]">Product Performance</h2>
            <select className="border rounded-lg px-3 py-2 text-gray-600">
              <option>Sort by Revenue</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#FF4D00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-[#FF4D00] mb-4">Revenue by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales; 