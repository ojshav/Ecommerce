import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, PieLabelRenderProps
} from 'recharts';

const CHART_COLORS = {
  primary: '#FF5733',
  secondary: '#2DD4BF',
  tertiary: '#A855F7',
  quaternary: '#3B82F6',
  fifth: '#FFD600',
  sixth: '#00E676',
  seventh: '#651FFF',
  eighth: '#FF6D00',
};
const PIE_COLORS = [
  '#34D399', // green
  '#6EE7B7', // light green
  '#FFD600', // yellow
  '#7C3AED', // purple
  '#00E676', // bright green
  '#FF6D00', // orange
  '#A855F7', // violet
  '#3B82F6', // blue
];

const STATIC_ANALYTICS: Record<string, {
  revenue: number;
  totalSold: number;
  topProduct: string;
  topCategory: string;
  averageOrderValue: number;
  conversionRate: number;
  returningCustomers: number;
  revenueTrend: { month: string; revenue: number }[];
  productSales: { name: string; sold: number }[];
  categoryDist: Array<{ name: string; value: number }>;
}> = {
  shop1: {
    revenue: 1200000,
    totalSold: 3500,
    topProduct: "Apple Watch Series 9",
    topCategory: "Wearables",
    averageOrderValue: 3428,
    conversionRate: 3.2,
    returningCustomers: 41,
    revenueTrend: [
      { month: 'Jan', revenue: 120000 },
      { month: 'Feb', revenue: 140000 },
      { month: 'Mar', revenue: 160000 },
      { month: 'Apr', revenue: 180000 },
      { month: 'May', revenue: 200000 },
      { month: 'Jun', revenue: 220000 },
    ],
    productSales: [
      { name: 'Apple Watch Series 9', sold: 1200 },
      { name: 'Apple Watch SE', sold: 900 },
      { name: 'Apple Watch Ultra', sold: 800 },
      { name: 'Apple Watch Series 8', sold: 600 },
    ],
    categoryDist: [
      { name: "Women Fashion", value: 2 },
      { name: "Men's Fashion", value: 1 },
      { name: "SportsWear", value: 1 },
      { name: "Laptop", value: 1 },
      { name: "Smartphone", value: 1 },
      { name: "Tablet's", value: 1 },
      { name: "Bluetooth H", value: 1 },
    ],
  },
  shop2: {
    revenue: 850000,
    totalSold: 2100,
    topProduct: "MacBook Pro 16",
    topCategory: "Laptops",
    averageOrderValue: 4047,
    conversionRate: 2.7,
    returningCustomers: 33,
    revenueTrend: [
      { month: 'Jan', revenue: 90000 },
      { month: 'Feb', revenue: 110000 },
      { month: 'Mar', revenue: 120000 },
      { month: 'Apr', revenue: 140000 },
      { month: 'May', revenue: 180000 },
      { month: 'Jun', revenue: 210000 },
    ],
    productSales: [
      { name: 'MacBook Pro 16', sold: 700 },
      { name: 'MacBook Air', sold: 600 },
      { name: 'MacBook Pro 14', sold: 500 },
      { name: 'MacBook Air M2', sold: 300 },
    ],
    categoryDist: [
      { name: 'Laptops', value: 3 },
      { name: 'Accessories', value: 2 },
      { name: 'Electronics', value: 1 },
    ],
  },
  shop3: {
    revenue: 430000,
    totalSold: 900,
    topProduct: "Nike Air Max",
    topCategory: "Footwear",
    averageOrderValue: 2150,
    conversionRate: 1.9,
    returningCustomers: 19,
    revenueTrend: [
      { month: 'Jan', revenue: 40000 },
      { month: 'Feb', revenue: 50000 },
      { month: 'Mar', revenue: 60000 },
      { month: 'Apr', revenue: 70000 },
      { month: 'May', revenue: 90000 },
      { month: 'Jun', revenue: 120000 },
    ],
    productSales: [
      { name: 'Nike Air Max', sold: 400 },
      { name: 'Nike Revolution', sold: 250 },
      { name: 'Nike Pegasus', sold: 150 },
      { name: 'Nike Downshifter', sold: 100 },
    ],
    categoryDist: [
      { name: 'Footwear', value: 2 },
      { name: 'Accessories', value: 1 },
      { name: 'Sportswear', value: 1 },
    ],
  },
};

const SHOP_LIST = [
  { id: "shop1", name: "Shop 1" },
  { id: "shop2", name: "Shop 2" },
  { id: "shop3", name: "Shop 3" },
];

function renderPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: PieLabelRenderProps & { name: string }) {
  // Fallbacks for undefined values
  const safeCx = typeof cx === 'number' ? cx : 0;
  const safeCy = typeof cy === 'number' ? cy : 0;
  const safeOuterRadius = typeof outerRadius === 'number' ? outerRadius : 80;
  const safePercent = typeof percent === 'number' ? percent : 0;
  const safeIndex = typeof index === 'number' ? index : 0;
  const RADIAN = Math.PI / 180;
  const radius = safeOuterRadius + 18;
  const x = safeCx + radius * Math.cos(-midAngle * RADIAN);
  const y = safeCy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={PIE_COLORS[safeIndex % PIE_COLORS.length]}
      textAnchor={x > safeCx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight={500}
    >
      {name} {safePercent > 0 ? `${(safePercent * 100).toFixed(0)}%` : ''}
    </text>
  );
}

const ShopAnalytics: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string>("");
  const analytics = selectedShop ? STATIC_ANALYTICS[selectedShop] : null;

  // Calculate total for categoryDist for percentage
  const totalCategories = analytics ? analytics.categoryDist.reduce((sum: number, c: { name: string; value: number }) => sum + c.value, 0) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#FF4D00] text-white p-6 rounded-xl shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shop Analytics</h1>
        <span className="text-lg font-medium">Overview & Insights</span>
      </div>

      {/* Shop Selector */}
      <div className="flex items-center gap-4">
        <label className="text-orange-900 font-semibold">Select Shop:</label>
        <select
          className="p-2 rounded border border-orange-300 focus:ring-2 focus:ring-orange-400"
          value={selectedShop}
          onChange={e => setSelectedShop(e.target.value)}
        >
          <option value="">-- Choose Shop --</option>
          {SHOP_LIST.map(shop => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics Card */}
      {selectedShop && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.topProduct}</span>
            <span className="text-gray-700">Top Selling Product</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">₹{analytics.revenue.toLocaleString()}</span>
            <span className="text-gray-700">Total Revenue</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.topCategory}</span>
            <span className="text-gray-700">Top Selling Category</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <span className="text-2xl font-bold text-orange-600 mb-1">{analytics.totalSold}</span>
            <span className="text-gray-700">Total Products Sold</span>
          </div>
        </div>
      )}

      {/* Analytics Content */}
      {selectedShop && analytics ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Revenue Trend Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center min-h-[350px]">
              <h3 className="text-lg font-semibold mb-4 text-orange-700 self-start">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={analytics.revenueTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={v => `₹${v.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke={CHART_COLORS.primary} strokeWidth={3} activeDot={{ r: 8 }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Product Sales Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center min-h-[350px]">
              <h3 className="text-lg font-semibold mb-4 text-orange-700 self-start">Products Sold</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={analytics.productSales} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sold" fill={CHART_COLORS.secondary} name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Categories Pie Chart with Legend */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row items-center mt-8">
            <div className="flex-1 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-orange-700 self-start">Product Categories</h3>
              <ResponsiveContainer width={320} height={240}>
                <PieChart>
                  <Pie
                    data={analytics.categoryDist}
                    cx={120}
                    cy={120}
                    labelLine
                    label={renderPieLabel}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {analytics.categoryDist.map((entry: { name: string; value: number }, index: number) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => `${v} products`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend with scroll */}
            <div className="flex-1 flex flex-col items-start justify-center pl-8 max-h-[260px] overflow-y-auto w-full">
              {analytics.categoryDist.map((cat: { name: string; value: number }, idx: number) => {
                const percent = totalCategories ? ((cat.value / totalCategories) * 100) : 0;
                return (
                  <div key={cat.name} className="flex items-center mb-4 bg-gray-50 rounded-lg px-4 py-2 w-full">
                    <span className="inline-block w-3 h-3 rounded-full mr-3" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                    <span className="font-semibold text-gray-900 mr-2">{cat.name}</span>
                    <span className="text-gray-500 mr-2">{cat.value} products</span>
                    <span className="font-bold text-gray-800 ml-auto">{percent.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-orange-400">Please select a shop to view analytics.</div>
      )}
    </div>
  );
};

export default ShopAnalytics; 