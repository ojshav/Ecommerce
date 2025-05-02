import React, { useState } from 'react';

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | {
    status: string;
    date: string;
    location: string;
  }>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call to track order
    setTimeout(() => {
      // Mock response - in a real app, this would come from a backend
      setTrackingResult({
        status: 'In Transit',
        date: new Date().toLocaleDateString(),
        location: 'Distribution Center'
      });
      setIsTracking(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
      
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-6">
          Enter your order number and email address to track your package.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderNumber" className="block text-gray-700 mb-1">Order Number</label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. ORD-12345"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter the email used for the order"
              required
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
              disabled={isTracking}
            >
              {isTracking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking Order...
                </span>
              ) : (
                'Track Order'
              )}
            </button>
          </div>
        </form>
        
        {trackingResult && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Status:</span>
                <span className="font-medium">{trackingResult.status}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Last Updated:</span>
                <span className="font-medium">{trackingResult.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Current Location:</span>
                <span className="font-medium">{trackingResult.location}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
                    style={{ width: '60%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span>Order Placed</span>
                  <span>Processing</span>
                  <span className="font-bold">In Transit</span>
                  <span className="text-gray-400">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder; 