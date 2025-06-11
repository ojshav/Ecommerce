import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Calendar, Clock, TrendingUp, Users, BarChart2, PieChart as PieChartIcon, RefreshCw, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the types for our traffic data
interface HourlyAnalytics {
  hour: number;
  hour_display: string;
  total_visits: number;
  unique_visitors: number;
  bounced_visits: number;
  conversions: number;
  bounce_rate: number;
  conversion_rate: number;
}

interface HourlyAnalyticsResponse {
  status: string;
  data: {
    hourly_breakdown: HourlyAnalytics[];
    summary: {
      total_visits: number;
      total_unique_visitors: number;
      total_bounced_visits: number;
      total_conversions: number;
      overall_bounce_rate: number;
      overall_conversion_rate: number;
      peak_hours: {
        most_visits: {
          hour: string;
          visits: number;
        };
        best_conversion: {
          hour: string;
          rate: number;
        };
      };
    };
  };
  message?: string;
}

const CHART_COLORS = {
  primary: '#FF5733',
  secondary: '#2DD4BF',
  tertiary: '#A855F7',
  quaternary: '#3B82F6',
  background: '#FFF5E6'
};

const TrafficAnalytics: React.FC = () => {
  const [hourlyData, setHourlyData] = useState<HourlyAnalytics[]>([]);
  const [summary, setSummary] = useState<HourlyAnalyticsResponse['data']['summary'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, user } = useAuth();
  const [refreshCount, setRefreshCount] = useState<number>(0);

  const fetchHourlyAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/superadmin/analytics/hourly`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hourly analytics data');
      }

      const data: HourlyAnalyticsResponse = await response.json();
      
      if (data.status === 'success') {
        setHourlyData(data.data.hourly_breakdown);
        setSummary(data.data.summary);
      } else {
        throw new Error(data.message || 'Failed to fetch hourly analytics data');
      }
    } catch (error) {
      console.error('Error fetching hourly analytics:', error);
      setError('Failed to load hourly analytics data. Please try again later.');
      toast.error('Failed to load hourly analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !['admin', 'superadmin'].includes(user.role.toLowerCase())) {
      toast.error('Access denied. Admin role required.');
      return;
    }
    fetchHourlyAnalytics();
  }, [user, refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">
          <TrendingUp size={48} />
        </div>
        <p className="text-xl font-semibold text-gray-800">Error</p>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchHourlyAnalytics}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600">Traffic Analytics</h2>
        <button 
          onClick={handleRefresh}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Total Visits</h3>
          <p className="text-2xl font-bold text-gray-900">{summary?.total_visits.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Unique Visitors: {summary?.total_unique_visitors.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Bounce Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{summary?.overall_bounce_rate.toFixed(2)}%</p>
          <p className="text-sm text-gray-600">Bounced Visits: {summary?.total_bounced_visits.toLocaleString()}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Conversion Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{summary?.overall_conversion_rate.toFixed(2)}%</p>
          <p className="text-sm text-gray-600">Total Conversions: {summary?.total_conversions.toLocaleString()}</p>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Peak Traffic Hour</h3>
          <p className="text-xl font-bold text-gray-900">{summary?.peak_hours.most_visits.hour}</p>
          <p className="text-sm text-gray-600">{summary?.peak_hours.most_visits.visits.toLocaleString()} visits</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Best Conversion Hour</h3>
          <p className="text-xl font-bold text-gray-900">{summary?.peak_hours.best_conversion.hour}</p>
          <p className="text-sm text-gray-600">{summary?.peak_hours.best_conversion.rate.toFixed(2)}% conversion rate</p>
        </div>
      </div>

      {/* Hourly Traffic Chart */}
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Traffic Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour_display" 
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="total_visits" 
              stroke={CHART_COLORS.primary} 
              name="Total Visits"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="unique_visitors" 
              stroke={CHART_COLORS.secondary} 
              name="Unique Visitors"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="bounce_rate" 
              stroke={CHART_COLORS.tertiary} 
              name="Bounce Rate (%)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversion_rate" 
              stroke={CHART_COLORS.quaternary} 
              name="Conversion Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficAnalytics;