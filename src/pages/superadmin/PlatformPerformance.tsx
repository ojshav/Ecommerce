import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { AlertCircle, CheckCircle, Clock, Activity, Server, RefreshCw } from 'lucide-react';

export default function PlatformPerformance() {
  // Primary color theme
  const primaryColor = '#4E6688';
  const primaryLightColor = '#95A7C4';
  const primaryDarkerColor = '#364B6B';
  const primaryLightestBg = '#EEF1F6';

  // State for various performance metrics
  const [uptimeStatus, setUptimeStatus] = useState('operational');
  const [uptimePercentage, setUptimePercentage] = useState(99.98);
  const [loadingData, setLoadingData] = useState(true);
  const [responseTimeData, setResponseTimeData] = useState([]);
  const [errorData, setErrorData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [servicesStatus, setServicesStatus] = useState([
    { name: 'API Gateway', status: 'operational', responseTime: 124 },
    { name: 'Authentication Service', status: 'operational', responseTime: 89 },
    { name: 'Database', status: 'operational', responseTime: 45 },
    { name: 'Storage Service', status: 'degraded', responseTime: 235 },
    { name: 'Analytics', status: 'operational', responseTime: 167 }
  ]);

  // Mock data generation for the charts
  useEffect(() => {
    const generateMockData = () => {
      setLoadingData(true);
      
      // Generate response time data
      const points = selectedTimeframe === '24h' ? 24 : selectedTimeframe === '7d' ? 7 : 30;
      const newResponseTimeData = [];
      
      for (let i = 0; i < points; i++) {
        const baseTime = selectedTimeframe === '24h' ? 130 : 150;
        const variation = Math.random() * 100 - 50;
        const timestamp = selectedTimeframe === '24h' 
          ? `${23-i}:00` 
          : selectedTimeframe === '7d' 
            ? `Day ${7-i}` 
            : `Week ${points-i}`;
            
        newResponseTimeData.push({
          name: timestamp,
          responseTime: Math.max(50, Math.round(baseTime + variation)),
        });
      }
      setResponseTimeData(newResponseTimeData.reverse());
      
      // Generate error data
      const newErrorData = [
        { name: '4xx Errors', value: Math.floor(Math.random() * 50) + 10 },
        { name: '5xx Errors', value: Math.floor(Math.random() * 30) + 5 },
        { name: 'Timeout Errors', value: Math.floor(Math.random() * 15) + 3 },
        { name: 'Network Errors', value: Math.floor(Math.random() * 20) + 2 }
      ];
      setErrorData(newErrorData);
      
      // Update services status randomly
      const statuses = ['operational', 'degraded', 'critical'];
      const updatedServices = servicesStatus.map(service => ({
        ...service,
        status: Math.random() > 0.85 ? statuses[Math.floor(Math.random() * statuses.length)] : service.status,
        responseTime: Math.max(30, Math.floor(service.responseTime + (Math.random() * 60 - 30)))
      }));
      setServicesStatus(updatedServices);
      
      setLoadingData(false);
    };

    generateMockData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      generateMockData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  // Generate status for service health
  const getSystemHealth = () => {
    const criticalServices = servicesStatus.filter(s => s.status === 'critical').length;
    const degradedServices = servicesStatus.filter(s => s.status === 'degraded').length;
    
    if (criticalServices > 0) return 'critical';
    if (degradedServices > 0) return 'degraded';
    return 'operational';
  };

  const systemHealth = getSystemHealth();

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'degraded': return 'text-amber-500';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-50';
      case 'degraded': return 'bg-amber-50';
      case 'critical': return 'bg-red-50';
      default: return 'bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'degraded': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Color for bar chart
  const getBarColor = (entry) => {
    const colors = {
      '4xx Errors': '#E67373', // light red
      '5xx Errors': '#D04545', // darker red
      'Timeout Errors': '#F0A859', // orange
      'Network Errors': '#E1AD56', // amber
    };
    return colors[entry.name] || '#6b7280'; // gray-500 default
  };

  // Handle refresh
  const handleRefresh = () => {
    setLoadingData(true);
    setTimeout(() => {
      // Simulate data refresh
      const newUptimePercentage = 99.5 + Math.random() * 0.5;
      setUptimePercentage(parseFloat(newUptimePercentage.toFixed(2)));
      setLoadingData(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-6 bg-gray-50 p-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Performance Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor real-time metrics and service health</p>
        </div>
        <button 
          onClick={handleRefresh} 
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          disabled={loadingData}
        >
          <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg shadow-sm border ${getStatusBgColor(systemHealth)} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {getStatusIcon(systemHealth)}
            <div>
              <h3 className="font-medium text-gray-700">System Status</h3>
              <p className={`font-bold ${getStatusColor(systemHealth)}`}>
                {systemHealth === 'operational' ? 'All Systems Operational' : 
                 systemHealth === 'degraded' ? 'Degraded Performance' : 'Critical Issues Detected'}
              </p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow-sm border bg-${primaryLightestBg} flex items-center justify-between`} style={{ backgroundColor: primaryLightestBg }}>
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5" style={{ color: primaryColor }} />
            <div>
              <h3 className="font-medium text-gray-700">Uptime</h3>
              <p className="font-bold" style={{ color: primaryDarkerColor }}>{uptimePercentage}% last 30 days</p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg shadow-sm border bg-${primaryLightestBg} flex items-center justify-between`} style={{ backgroundColor: primaryLightestBg }}>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: primaryColor }} />
            <div>
              <h3 className="font-medium text-gray-700">Avg Response Time</h3>
              <p className="font-bold" style={{ color: primaryDarkerColor }}>
                {responseTimeData.length > 0 
                  ? `${Math.round(responseTimeData.reduce((sum, item) => sum + (item.responseTime || 0), 0) / responseTimeData.length)}ms` 
                  : 'Calculating...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex space-x-2 p-1 bg-white rounded-md shadow-sm border inline-flex">
        <button 
          onClick={() => setSelectedTimeframe('24h')} 
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            selectedTimeframe === '24h' 
              ? 'text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{ backgroundColor: selectedTimeframe === '24h' ? primaryColor : '' }}
        >
          24 Hours
        </button>
        <button 
          onClick={() => setSelectedTimeframe('7d')} 
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            selectedTimeframe === '7d' 
              ? 'text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{ backgroundColor: selectedTimeframe === '7d' ? primaryColor : '' }}
        >
          7 Days
        </button>
        <button 
          onClick={() => setSelectedTimeframe('30d')} 
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            selectedTimeframe === '30d' 
              ? 'text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{ backgroundColor: selectedTimeframe === '30d' ? primaryColor : '' }}
        >
          30 Days
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <div className="p-4 rounded-lg shadow bg-white border">
          <h2 className="text-lg font-medium mb-4 text-gray-800">Response Time Trend</h2>
          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: primaryColor }}></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: `1px solid ${primaryLightColor}`,
                    borderRadius: '4px'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke={primaryColor}
                  name="Response Time (ms)" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: primaryColor }}
                  activeDot={{ r: 6, fill: primaryColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Error Distribution Chart */}
        <div className="p-4 rounded-lg shadow bg-white border">
          <h2 className="text-lg font-medium mb-4 text-gray-800">Error Distribution</h2>
          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: primaryColor }}></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: `1px solid ${primaryLightColor}`,
                    borderRadius: '4px'
                  }} 
                />
                <Legend />
                <Bar dataKey="value" name="Count">
                  {errorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Services Status Table */}
      <div className="p-4 rounded-lg shadow bg-white border">
        <h2 className="text-lg font-medium mb-4 text-gray-800">Individual Services Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ backgroundColor: primaryLightestBg }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicesStatus.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Server className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-800">{service.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      service.responseTime < 100 ? 'text-green-600' :
                      service.responseTime < 200 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {service.responseTime}ms
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      className="text-sm font-medium hover:underline"
                      style={{ color: primaryColor }}
                      onClick={() => alert(`Investigating ${service.name} status...`)}
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incidents Log */}
      <div className="p-4 rounded-lg shadow bg-white border">
        <h2 className="text-lg font-medium mb-4 text-gray-800">Recent Incidents</h2>
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-gray-800">Storage Service Degraded Performance</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 2 hours ago - Ongoing</p>
            <p className="text-sm mt-2 text-gray-700">Our storage service is experiencing higher than normal latency. Our team is investigating the issue.</p>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-800">API Gateway Intermittent 5xx Errors</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 1 day ago - Resolved 18 hours ago</p>
            <p className="text-sm mt-2 text-gray-700">Our API Gateway was returning intermittent 5xx errors. We identified a configuration issue and deployed a fix.</p>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-medium text-gray-800">Database Increased Latency</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 3 days ago - Resolved 2 days ago</p>
            <p className="text-sm mt-2 text-gray-700">Our database was experiencing increased latency due to high traffic. We've scaled up the database instances to handle the load.</p>
          </div>
        </div>
      </div>
    </div>
  );
}