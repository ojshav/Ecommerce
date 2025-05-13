import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { AlertCircle, CheckCircle, Clock, Activity, Server, RefreshCw } from 'lucide-react';

export default function PlatformPerformance() {
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
      case 'operational': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100';
      case 'degraded': return 'bg-yellow-100';
      case 'critical': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Color for bar chart
  const getBarColor = (entry) => {
    const colors = {
      '4xx Errors': '#f87171', // red-400
      '5xx Errors': '#ef4444', // red-500
      'Timeout Errors': '#fb923c', // orange-400
      'Network Errors': '#f59e0b', // amber-500
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
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Platform Performance Dashboard</h1>
        <button 
          onClick={handleRefresh} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={loadingData}
        >
          <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg border ${getStatusBgColor(systemHealth)} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {getStatusIcon(systemHealth)}
            <div>
              <h3 className="font-medium">System Status</h3>
              <p className={`font-bold ${getStatusColor(systemHealth)}`}>
                {systemHealth === 'operational' ? 'All Systems Operational' : 
                 systemHealth === 'degraded' ? 'Degraded Performance' : 'Critical Issues Detected'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-blue-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-medium">Uptime</h3>
              <p className="font-bold text-blue-600">{uptimePercentage}% last 30 days</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-500" />
            <div>
              <h3 className="font-medium">Avg Response Time</h3>
              <p className="font-bold text-purple-600">
                {responseTimeData.length > 0 
                  ? `${Math.round(responseTimeData.reduce((sum: number, item: any) => sum + (item.responseTime || 0), 0) / responseTimeData.length)}ms` 
                  : 'Calculating...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex space-x-2">
        <button 
          onClick={() => setSelectedTimeframe('24h')} 
          className={`px-3 py-1 rounded-md ${selectedTimeframe === '24h' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          24 Hours
        </button>
        <button 
          onClick={() => setSelectedTimeframe('7d')} 
          className={`px-3 py-1 rounded-md ${selectedTimeframe === '7d' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          7 Days
        </button>
        <button 
          onClick={() => setSelectedTimeframe('30d')} 
          className={`px-3 py-1 rounded-md ${selectedTimeframe === '30d' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          30 Days
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Chart */}
        <div className="p-4 rounded-lg border">
          <h2 className="text-lg font-medium mb-4">Response Time Trend</h2>
          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3b82f6" 
                  name="Response Time (ms)" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Error Distribution Chart */}
        <div className="p-4 rounded-lg border">
          <h2 className="text-lg font-medium mb-4">Error Distribution</h2>
          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
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
      <div className="p-4 rounded-lg border">
        <h2 className="text-lg font-medium mb-4">Individual Services Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicesStatus.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Server className="flex-shrink-0 h-5 w-5 text-gray-500 mr-2" />
                      <div className="font-medium text-gray-900">{service.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'operational' ? 'bg-green-100 text-green-800' :
                      service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      service.responseTime < 100 ? 'text-green-600' :
                      service.responseTime < 200 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {service.responseTime}ms
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
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
      <div className="p-4 rounded-lg border">
        <h2 className="text-lg font-medium mb-4">Recent Incidents</h2>
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="font-medium">Storage Service Degraded Performance</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 2 hours ago - Ongoing</p>
            <p className="text-sm mt-2">Our storage service is experiencing higher than normal latency. Our team is investigating the issue.</p>
          </div>
          
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-medium">API Gateway Intermittent 5xx Errors</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 1 day ago - Resolved 18 hours ago</p>
            <p className="text-sm mt-2">Our API Gateway was returning intermittent 5xx errors. We identified a configuration issue and deployed a fix.</p>
          </div>
          
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="font-medium">Database Increased Latency</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">Started 3 days ago - Resolved 2 days ago</p>
            <p className="text-sm mt-2">Our database was experiencing increased latency due to high traffic. We've scaled up the database instances to handle the load.</p>
          </div>
        </div>
      </div>
    </div>
  );
}