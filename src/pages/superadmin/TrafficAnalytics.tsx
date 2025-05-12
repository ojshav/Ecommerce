import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, Clock, TrendingUp, Users, BarChart2, PieChart as PieChartIcon, RefreshCw } from 'lucide-react';

// Define the types for our traffic data
interface TrafficData {
  timestamp: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
}

interface PageTraffic {
  page: string;
  visits: number;
  percentage: number;
}

interface ReferrerTraffic {
  source: string;
  visits: number;
  percentage: number;
}

interface DeviceTraffic {
  device: string;
  visits: number;
  percentage: number;
}

// Mock API functions - in production, replace with actual API calls
const fetchRealtimeTraffic = async (): Promise<TrafficData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timestamp: new Date().toISOString(),
        pageViews: Math.floor(Math.random() * 100) + 50,
        uniqueVisitors: Math.floor(Math.random() * 50) + 20,
        bounceRate: Math.random() * 30 + 10,
        avgSessionDuration: Math.random() * 120 + 60,
        conversionRate: Math.random() * 5 + 1
      });
    }, 500);
  });
};

const fetchHistoricalTraffic = async (period: string): Promise<TrafficData[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      let dataPoints = 0;
      let intervalHours = 0;
      
      switch (period) {
        case 'today':
          dataPoints = 24;
          intervalHours = 1;
          break;
        case 'week':
          dataPoints = 7;
          intervalHours = 24;
          break;
        case 'month':
          dataPoints = 30;
          intervalHours = 24;
          break;
        case 'quarter':
          dataPoints = 12;
          intervalHours = 7 * 24;
          break;
        default:
          dataPoints = 24;
          intervalHours = 1;
      }
      
      const data: TrafficData[] = [];
      
      for (let i = dataPoints - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * intervalHours * 60 * 60 * 1000);
        
        data.push({
          timestamp: date.toISOString(),
          pageViews: Math.floor(Math.random() * 1000) + 500,
          uniqueVisitors: Math.floor(Math.random() * 500) + 200,
          bounceRate: Math.random() * 30 + 10,
          avgSessionDuration: Math.random() * 120 + 60,
          conversionRate: Math.random() * 5 + 1
        });
      }
      
      resolve(data);
    }, 800);
  });
};

const fetchTopPages = async (): Promise<PageTraffic[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { page: '/products', visits: 3245, percentage: 28.5 },
        { page: '/', visits: 2018, percentage: 17.7 },
        { page: '/cart', visits: 1432, percentage: 12.6 },
        { page: '/checkout', visits: 986, percentage: 8.7 },
        { page: '/account', visits: 754, percentage: 6.6 }
      ]);
    }, 600);
  });
};

const fetchReferrerSources = async (): Promise<ReferrerTraffic[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { source: 'Google', visits: 4215, percentage: 37.2 },
        { source: 'Direct', visits: 2687, percentage: 23.7 },
        { source: 'Social Media', visits: 1843, percentage: 16.3 },
        { source: 'Email', visits: 1105, percentage: 9.8 },
        { source: 'Affiliates', visits: 872, percentage: 7.7 }
      ]);
    }, 700);
  });
};

const fetchDeviceData = async (): Promise<DeviceTraffic[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { device: 'Mobile', visits: 5328, percentage: 47.2 },
        { device: 'Desktop', visits: 4752, percentage: 42.1 },
        { device: 'Tablet', visits: 1205, percentage: 10.7 }
      ]);
    }, 550);
  });
};

// Define the colors for our charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TrafficAnalytics: React.FC = () => {
  const [realtimeData, setRealtimeData] = useState<TrafficData | null>(null);
  const [historicalData, setHistoricalData] = useState<TrafficData[]>([]);
  const [topPages, setTopPages] = useState<PageTraffic[]>([]);
  const [referrerSources, setReferrerSources] = useState<ReferrerTraffic[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceTraffic[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [realtime, historical, pages, referrers, devices] = await Promise.all([
          fetchRealtimeTraffic(),
          fetchHistoricalTraffic(selectedPeriod),
          fetchTopPages(),
          fetchReferrerSources(),
          fetchDeviceData()
        ]);

        setRealtimeData(realtime);
        setHistoricalData(historical);
        setTopPages(pages);
        setReferrerSources(referrers);
        setDeviceData(devices);
      } catch (error) {
        console.error('Error loading traffic data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedPeriod, refreshCount]);

  // Set up realtime data refresh
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const realtime = await fetchRealtimeTraffic();
        setRealtimeData(realtime);
      } catch (error) {
        console.error('Error refreshing realtime data:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    
    switch (selectedPeriod) {
      case 'today':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'week':
        return date.toLocaleDateString([], { weekday: 'short' });
      case 'month':
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
      case 'quarter':
        return date.toLocaleDateString([], { month: 'short' });
      default:
        return date.toLocaleTimeString();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Traffic Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex border rounded-md overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm ${selectedPeriod === 'today' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`} 
              onClick={() => setSelectedPeriod('today')}
            >
              Today
            </button>
            <button 
              className={`px-4 py-2 text-sm ${selectedPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedPeriod('week')}
            >
              Week
            </button>
            <button 
              className={`px-4 py-2 text-sm ${selectedPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedPeriod('month')}
            >
              Month
            </button>
            <button 
              className={`px-4 py-2 text-sm ${selectedPeriod === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedPeriod('quarter')}
            >
              Quarter
            </button>
          </div>
          <button 
            className="flex items-center space-x-1 bg-white p-2 rounded-md border text-gray-700 hover:bg-gray-50"
            onClick={handleRefresh}
          >
            <RefreshCw size={16} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Realtime Stats Overview */}
          <div className="mb-6">
            <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-700">
              <Clock size={20} className="mr-2 text-blue-600" />
              Realtime Statistics 
              <span className="ml-2 text-sm font-normal text-gray-500">
                (Last updated: {realtimeData ? new Date(realtimeData.timestamp).toLocaleTimeString() : 'N/A'})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500 mb-1">Active Visitors</div>
                <div className="text-2xl font-bold text-gray-800">{realtimeData?.uniqueVisitors || 0}</div>
                <div className="mt-2 text-xs text-green-600">Live</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500 mb-1">Page Views</div>
                <div className="text-2xl font-bold text-gray-800">{realtimeData?.pageViews || 0}</div>
                <div className="mt-2 text-xs text-green-600">Live</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500 mb-1">Bounce Rate</div>
                <div className="text-2xl font-bold text-gray-800">{realtimeData?.bounceRate.toFixed(1) || 0}%</div>
                <div className="mt-2 text-xs text-gray-500">Last 5 min avg</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500 mb-1">Avg. Session</div>
                <div className="text-2xl font-bold text-gray-800">{realtimeData?.avgSessionDuration.toFixed(0) || 0}s</div>
                <div className="mt-2 text-xs text-gray-500">Last 5 min avg</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
                <div className="text-2xl font-bold text-gray-800">{realtimeData?.conversionRate.toFixed(2) || 0}%</div>
                <div className="mt-2 text-xs text-gray-500">Last 5 min avg</div>
              </div>
            </div>
          </div>

          {/* Historical Traffic Trend */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-700">
              <TrendingUp size={20} className="mr-2 text-blue-600" />
              Traffic Trends
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={formatDate}
                    minTickGap={15}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      switch (name) {
                        case 'pageViews':
                        case 'uniqueVisitors':
                          return [value.toLocaleString(), name === 'pageViews' ? 'Page Views' : 'Unique Visitors'];
                        case 'bounceRate':
                        case 'conversionRate':
                          return [`${value.toFixed(2)}%`, name === 'bounceRate' ? 'Bounce Rate' : 'Conversion Rate'];
                        default:
                          return [value, name];
                      }
                    }}
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="pageViews" stroke="#0088FE" name="Page Views" />
                  <Line yAxisId="left" type="monotone" dataKey="uniqueVisitors" stroke="#00C49F" name="Unique Visitors" />
                  <Line yAxisId="right" type="monotone" dataKey="bounceRate" stroke="#FF8042" name="Bounce Rate (%)" />
                  <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#8884D8" name="Conversion Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analytics Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Top Pages */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-700">
                <BarChart2 size={20} className="mr-2 text-blue-600" />
                Top Pages
              </h2>
              <div className="overflow-hidden">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topPages}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        type="category" 
                        dataKey="page" 
                        tick={{ fontSize: 12 }}
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), 'Visits']}
                      />
                      <Bar dataKey="visits" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Page</th>
                        <th className="text-right py-2">Visits</th>
                        <th className="text-right py-2">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPages.map((page, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 text-gray-700 truncate max-w-xs">{page.page}</td>
                          <td className="py-2 text-right text-gray-700">{page.visits.toLocaleString()}</td>
                          <td className="py-2 text-right text-gray-700">{page.percentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-700">
                <Users size={20} className="mr-2 text-blue-600" />
                Traffic Sources
              </h2>
              <div className="h-64 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={referrerSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                      nameKey="source"
                      label={({ source, percentage }) => `${source}: ${percentage.toFixed(1)}%`}
                    >
                      {referrerSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => {
                        const item = referrerSources.find(source => source.source === props.payload.source);
                        return [
                          `${value.toLocaleString()} (${item?.percentage.toFixed(1)}%)`,
                          'Visits'
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Source</th>
                      <th className="text-right py-2">Visits</th>
                      <th className="text-right py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrerSources.map((source, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 text-gray-700 flex items-center">
                          <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          {source.source}
                        </td>
                        <td className="py-2 text-right text-gray-700">{source.visits.toLocaleString()}</td>
                        <td className="py-2 text-right text-gray-700">{source.percentage.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="flex items-center mb-3 text-lg font-semibold text-gray-700">
                <PieChartIcon size={20} className="mr-2 text-blue-600" />
                Device Breakdown
              </h2>
              <div className="h-64 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="visits"
                      nameKey="device"
                      label={({ device, percentage }) => `${device}: ${percentage.toFixed(1)}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => {
                        const item = deviceData.find(device => device.device === props.payload.device);
                        return [
                          `${value.toLocaleString()} (${item?.percentage.toFixed(1)}%)`,
                          'Visits'
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Device</th>
                      <th className="text-right py-2">Visits</th>
                      <th className="text-right py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceData.map((device, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 text-gray-700 flex items-center">
                          <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          {device.device}
                        </td>
                        <td className="py-2 text-right text-gray-700">{device.visits.toLocaleString()}</td>
                        <td className="py-2 text-right text-gray-700">{device.percentage.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrafficAnalytics;