import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { Layers, DollarSign, ShoppingBag, Star, TrendingUp, Inbox } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const sampleSalesData = [
  { month: 'Jan', revenue: 4500, units: 150 },
  { month: 'Feb', revenue: 5200, units: 170 },
  { month: 'Mar', revenue: 4800, units: 160 },
  { month: 'Apr', revenue: 6000, units: 200 },
  { month: 'May', revenue: 5700, units: 190 },
  { month: 'Jun', revenue: 6300, units: 210 },
];

const sampleInventoryData = [
  { product: 'Product A', inStock: 45, lowStock: false },
  { product: 'Product B', inStock: 12, lowStock: true },
  { product: 'Product C', inStock: 78, lowStock: false },
  { product: 'Product D', inStock: 8, lowStock: true },
  { product: 'Product E', inStock: 32, lowStock: false },
];

const sampleFeedbackData = [
  { rating: 5, count: 42 },
  { rating: 4, count: 28 },
  { rating: 3, count: 15 },
  { rating: 2, count: 8 },
  { rating: 1, count: 7 },
];

const sampleTopProducts = [
  { name: 'Product A', sales: 120, revenue: 3600 },
  { name: 'Product C', sales: 98, revenue: 2940 },
  { name: 'Product E', sales: 85, revenue: 2550 },
  { name: 'Product B', sales: 72, revenue: 2160 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const MerchantAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6m');
  
  // Calculate some metrics
  const totalRevenue = sampleSalesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnits = sampleSalesData.reduce((sum, item) => sum + item.units, 0);
  const avgRating = sampleFeedbackData.reduce((sum, item) => sum + (item.rating * item.count), 0) / 
                   sampleFeedbackData.reduce((sum, item) => sum + item.count, 0);
  const lowStockCount = sampleInventoryData.filter(item => item.lowStock).length;
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Merchant Analytics Dashboard</h1>
        <p className="text-gray-500">Analyze performance based on sales, inventory, and customer feedback</p>
      </div>
      
      {/* Time range selector */}
      <div className="bg-white p-4 border-b flex justify-end">
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('1m')}
            className={`px-3 py-1 rounded text-sm ${timeRange === '1m' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            1M
          </button>
          <button 
            onClick={() => setTimeRange('3m')}
            className={`px-3 py-1 rounded text-sm ${timeRange === '3m' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            3M
          </button>
          <button 
            onClick={() => setTimeRange('6m')}
            className={`px-3 py-1 rounded text-sm ${timeRange === '6m' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            6M
          </button>
          <button 
            onClick={() => setTimeRange('1y')}
            className={`px-3 py-1 rounded text-sm ${timeRange === '1y' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            1Y
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation */}
        <div className="bg-gray-800 w-64 text-white">
          <nav className="p-4">
            <ul>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center p-3 w-full rounded-lg ${activeTab === 'overview' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <Layers className="mr-3" size={18} />
                  <span>Overview</span>
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveTab('sales')}
                  className={`flex items-center p-3 w-full rounded-lg ${activeTab === 'sales' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <DollarSign className="mr-3" size={18} />
                  <span>Sales Analysis</span>
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className={`flex items-center p-3 w-full rounded-lg ${activeTab === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <ShoppingBag className="mr-3" size={18} />
                  <span>Inventory Status</span>
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActiveTab('feedback')}
                  className={`flex items-center p-3 w-full rounded-lg ${activeTab === 'feedback' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                  <Star className="mr-3" size={18} />
                  <span>Customer Feedback</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
              
              {/* Key metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-blue-500" size={20} />
                    <h3 className="text-lg font-medium ml-2">Total Revenue</h3>
                  </div>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                  <p className="text-green-500 flex items-center mt-2">
                    <TrendingUp size={16} className="mr-1" /> +12% from previous period
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <ShoppingBag className="text-blue-500" size={20} />
                    <h3 className="text-lg font-medium ml-2">Units Sold</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalUnits}</p>
                  <p className="text-green-500 flex items-center mt-2">
                    <TrendingUp size={16} className="mr-1" /> +8% from previous period
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <Inbox className="text-yellow-500" size={20} />
                    <h3 className="text-lg font-medium ml-2">Low Stock Items</h3>
                  </div>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                  <p className="text-gray-500 mt-2">
                    {lowStockCount > 0 ? 'Needs attention' : 'All stocked well'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-500" size={20} />
                    <h3 className="text-lg font-medium ml-2">Avg. Rating</h3>
                  </div>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}/5</p>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={16}
                        className={star <= Math.round(avgRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Revenue chart */}
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleSalesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        activeDot={{ r: 8 }}
                        name="Revenue ($)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Top products */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Top Performing Products</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sampleTopProducts.map((product, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Sales Tab */}
          {activeTab === 'sales' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Sales Analysis</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Revenue vs Units</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleSalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#3B82F6" />
                        <Bar yAxisId="right" dataKey="units" name="Units Sold" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Sales by Product</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sampleTopProducts}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="sales"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sampleTopProducts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Sales Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Average Order Value</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$35.25</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+5.2%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Conversion Rate</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.8%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+0.4%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customer Acquisition Cost</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$12.80</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">+2.1%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Repeat Purchase Rate</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+3.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Inventory Status</h2>
              
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-lg font-medium mb-4">Stock Levels</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleInventoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="product" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="inStock" 
                        name="Units in Stock" 
                        fill="#3B82F6"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Low Stock Items</h3>
                  <div className="overflow-y-auto max-h-64">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sampleInventoryData.filter(item => item.lowStock).map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.inStock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Low Stock
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Inventory Metrics</h3>
                  <div className="overflow-y-auto max-h-64">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventory Turnover Rate</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.2</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Average Days to Sell</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18 days</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Stock-to-Sales Ratio</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.3</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Holding Cost</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,250/month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Customer Feedback</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleFeedbackData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="count" 
                          name="Number of Reviews" 
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-4">Sentiment Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Positive', value: 70 },
                            { name: 'Neutral', value: 20 },
                            { name: 'Negative', value: 10 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          <Cell fill="#10B981" />
                          <Cell fill="#6B7280" />
                          <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            size={16}
                            className={star <= 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">John D. • 2 days ago</span>
                    </div>
                    <p className="text-gray-700">Excellent product quality and fast shipping. Will definitely order again!</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            size={16}
                            className={star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Sarah M. • 5 days ago</span>
                    </div>
                    <p className="text-gray-700">Good product but took longer than expected to arrive. Otherwise very satisfied with my purchase.</p>
                  </div>
                  
                  <div className="border rounded p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            size={16}
                            className={star <= 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">Michael T. • 1 week ago</span>
                    </div>
                    <p className="text-gray-700">Product works as described but packaging was damaged upon arrival. Customer support was helpful though.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MerchantAnalytics;