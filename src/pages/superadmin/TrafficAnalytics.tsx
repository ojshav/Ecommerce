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

// Update the COLORS constant
const CHART_COLORS = {
  primary: '#FF5733',
  secondary: '#2DD4BF',
  tertiary: '#A855F7',
  quaternary: '#3B82F6',
  background: '#FFF5E6'
};

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Traffic Analytics</h2>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Last 30 days</span>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Change</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-orange-600 hover:text-orange-800">Export</button>
          <button className="text-orange-600 hover:text-orange-800">Share</button>
        </div>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pageViews" stroke={CHART_COLORS.primary} />
            <Line type="monotone" dataKey="uniqueVisitors" stroke={CHART_COLORS.secondary} />
            <Line type="monotone" dataKey="bounceRate" stroke={CHART_COLORS.tertiary} />
            <Line type="monotone" dataKey="conversionRate" stroke={CHART_COLORS.quaternary} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficAnalytics;