import React, { useState } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

// Mock data for the dashboard
const salesData = [
  { month: 'Jan', sales: 4000, orders: 240, visitors: 2400 },
  { month: 'Feb', sales: 3000, orders: 198, visitors: 2210 },
  { month: 'Mar', sales: 5000, orders: 280, visitors: 2290 },
  { month: 'Apr', sales: 2780, orders: 190, visitors: 2000 },
  { month: 'May', sales: 1890, orders: 138, visitors: 1800 },
  { month: 'Jun', sales: 2390, orders: 150, visitors: 2181 },
  { month: 'Jul', sales: 3490, orders: 210, visitors: 2500 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2023-08-15', amount: 139.99, status: 'Delivered' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2023-08-14', amount: 59.95, status: 'Processing' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-08-14', amount: 89.00, status: 'Pending' },
  { id: '#ORD-004', customer: 'Emily Wilson', date: '2023-08-13', amount: 129.50, status: 'Shipped' },
  { id: '#ORD-005', customer: 'Michael Brown', date: '2023-08-12', amount: 45.75, status: 'Delivered' },
];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds', sold: 52, revenue: 4680 },
  { id: 2, name: 'Smartphone Case', sold: 48, revenue: 960 },
  { id: 3, name: 'USB-C Cable', sold: 45, revenue: 900 },
  { id: 4, name: 'Bluetooth Speaker', sold: 30, revenue: 3000 },
  { id: 5, name: 'Power Bank', sold: 28, revenue: 1400 },
];

// Status badges for orders
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status.toLowerCase()) {
    case 'delivered':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'shipped':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'processing':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'pending':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    case 'cancelled':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

interface Stat {
  name: string;
  value: string;
  change: string;
  trend: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
  iconColor: string;
}

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  
  // Stats summary for KPIs
  const stats: Stat[] = [
    {
      name: 'Total Sales',
      value: '$24,500',
      change: 'vs last month',
      trend: 12.5,
      icon: CurrencyDollarIcon,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700',
    },
    {
      name: 'Total Orders',
      value: '1,234',
      change: 'vs last month',
      trend: -2.4,
      icon: ShoppingBagIcon,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700',
    },
    {
      name: 'Average Order Value',
      value: '$19.85',
      change: 'vs last month',
      trend: 5.2,
      icon: ShoppingBagIcon,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700',
    },
    {
      name: 'Conversion Rate',
      value: '3.2%',
      change: 'vs last month',
      trend: 1.8,
      icon: ClipboardDocumentCheckIcon,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-700',
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setTimeframe('daily')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeframe === 'daily'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            } border border-gray-300`}
          >
            Daily
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('weekly')}
            className={`px-4 py-2 text-sm font-medium ${
              timeframe === 'weekly'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            } border-t border-b border-gray-300`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeframe === 'monthly'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            } border border-gray-300`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:border-orange-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg}`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={`ml-2 text-sm font-medium ${
                stat.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(stat.trend)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Orders Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sales & Orders</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  name="Sales ($)"
                  stroke="#4f46e5"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#06b6d4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Top Products Chart */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sold" name="Units Sold" fill="#4f46e5" />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600 hover:text-orange-700">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-orange-600 hover:text-orange-700 mr-3">
                      View
                    </button>
                    <button className="text-orange-600 hover:text-orange-700">
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 