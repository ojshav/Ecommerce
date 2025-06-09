import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Sales = () => {
  // Sample data matching the screenshot
  const monthlyData = [
    { month: 'Jan', revenue: 90000, units: 275 },
    { month: 'Feb', revenue: 90000, units: 237 },
    { month: 'Mar', revenue: 150000, units: 498 },
    { month: 'Apr', revenue: 130000, units: 423 },
    { month: 'May', revenue: 180000, units: 556 }
  ];

  const detailedSalesData = [
    { month: 'Jan', product: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 45, revenue: 58455 },
    { month: 'Jan', product: 'Wireless Earbuds', category: 'Audio', price: 129, quantity: 230, revenue: 29670 },
    { month: 'Feb', product: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 52, revenue: 67548 },
    { month: 'Feb', product: 'Wireless Earbuds', category: 'Audio', price: 129, quantity: 185, revenue: 23865 },
    { month: 'Mar', product: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 63, revenue: 81837 },
    { month: 'Mar', product: 'Wireless Earbuds', category: 'Audio', price: 129, quantity: 310, revenue: 39990 },
    { month: 'Mar', product: 'Smart Watch', category: 'Wearables', price: 249, quantity: 125, revenue: 31125 },
    { month: 'Apr', product: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 48, revenue: 62352 },
    { month: 'Apr', product: 'Wireless Earbuds', category: 'Audio', price: 129, quantity: 195, revenue: 25155 },
    { month: 'Apr', product: 'Smart Watch', category: 'Wearables', price: 249, quantity: 180, revenue: 44820 },
    { month: 'May', product: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 71, revenue: 92229 },
    { month: 'May', product: 'Wireless Earbuds', category: 'Audio', price: 129, quantity: 275, revenue: 35475 },
    { month: 'May', product: 'Smart Watch', category: 'Wearables', price: 249, quantity: 210, revenue: 52290 }
  ];

  const productPerformance = [
    { name: 'Laptop Pro', revenue: 362421 },
    { name: 'Wireless Earbuds', revenue: 154155 },
    { name: 'Smart Watch', revenue: 128235 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 56, color: '#FF4D00' },
    { name: 'Audio', value: 24, color: '#00E5BE' },
    { name: 'Wearables', value: 20, color: '#8B5CF6' }
  ];

  // Calculate summary statistics
  const totalRevenue = detailedSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnits = detailedSalesData.reduce((sum, item) => sum + item.quantity, 0);
  const averageOrderValue = Math.round(totalRevenue / totalUnits);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#FF4D00] text-white p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">Sales Performance Report</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white text-[#FF4D00] px-4 py-2 rounded-lg hover:bg-opacity-90">
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
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
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