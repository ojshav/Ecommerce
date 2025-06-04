import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, RotateCcw, Star, FileText, ChevronDown, Search, Filter } from 'lucide-react';

interface Order {
  id: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  deliveryDate: string;
  orderDate: string;
  productName: string;
  imageUrl: string;
  price: number;
  canReturn: boolean;
  canExchange: boolean;
  canReview: boolean;
  trackingNumber?: string;
}

const TrackOrder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();
  
  // Mock orders data - in a real app this would come from an API
  const orders: Order[] = [
    {
      id: '2468135790',
      status: 'Delivered',
      deliveryDate: 'Nov 12, 2024',
      orderDate: 'Nov 7, 2024',
      productName: "Women's Fashion Dress",
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      canReturn: true,
      canExchange: true,
      canReview: true,
      trackingNumber: 'TN123456789'
    },
    {
      id: '1357924680',
      status: 'In Transit',
      deliveryDate: 'Expected Nov 15, 2024',
      orderDate: 'Nov 10, 2024',
      productName: "Men's Premium Watch",
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      canReturn: false,
      canExchange: false,
      canReview: false,
      trackingNumber: 'TN987654321'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'In Transit':
        return 'bg-blue-500';
      case 'Processing':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleOrderClick = (order: Order) => {
    navigate(`/order/${order.id}`, { state: { order } });
  };

  const handleAction = (e: React.MouseEvent, type: string, order: Order) => {
    e.stopPropagation();
    switch (type) {
      case 'exchange':
        navigate(`/exchange/${order.id}`, { state: { order } });
        break;
      case 'return':
        navigate(`/refund/${order.id}`, { state: { order } });
        break;
      case 'review':
        navigate(`/review/${order.id}`, { state: { order } });
        break;
      case 'track':
        navigate(`/track/${order.id}`, { state: { order } });
        break;
    }
  };

  const filteredOrders = orders.filter(order => 
    (selectedFilter === 'all' || order.status.toLowerCase() === selectedFilter) &&
    (order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     order.id.includes(searchQuery))
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors"
            onClick={() => navigate('/returns-policy')}
          >
            Returns Policy
          </button>
          <button 
            className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#FF4D00]/90 transition-colors"
            onClick={() => navigate('/track-order')}
          >
            Track Package
          </button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search orders by product name or order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <button 
            className="px-4 py-3 border rounded-lg flex items-center gap-2 hover:border-[#FF4D00] transition-colors"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={20} />
            Filter
            <ChevronDown size={16} />
          </button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-2">
                <button 
                  className={`w-full text-left px-3 py-2 rounded ${selectedFilter === 'all' ? 'bg-[#FF4D00] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setSelectedFilter('all');
                    setFilterOpen(false);
                  }}
                >
                  All Orders
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 rounded ${selectedFilter === 'delivered' ? 'bg-[#FF4D00] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setSelectedFilter('delivered');
                    setFilterOpen(false);
                  }}
                >
                  Delivered
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 rounded ${selectedFilter === 'in transit' ? 'bg-[#FF4D00] text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setSelectedFilter('in transit');
                    setFilterOpen(false);
                  }}
                >
                  In Transit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleOrderClick(order)}
            className="border rounded-lg p-6 space-y-4 cursor-pointer hover:border-[#FF4D00] transition-colors bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-6">
                <img
                  src={order.imageUrl}
                  alt={order.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-lg mb-1">{order.productName}</h3>
                  <p className="text-gray-600 text-sm mb-1">Order #{order.id}</p>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                    <span className="font-medium">{order.status}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {order.status === 'Delivered' ? `Delivered on ${order.deliveryDate}` : order.deliveryDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${order.price.toFixed(2)}</p>
                <p className="text-gray-600 text-sm">Ordered on {order.orderDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex gap-3">
                {order.canReturn && (
                  <button
                    onClick={(e) => handleAction(e, 'return', order)}
                    className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Return
                  </button>
                )}
                {order.canExchange && (
                  <button
                    onClick={(e) => handleAction(e, 'exchange', order)}
                    className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Package size={16} />
                    Exchange
                  </button>
                )}
                {order.canReview && (
                  <button
                    onClick={(e) => handleAction(e, 'review', order)}
                    className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Star size={16} />
                    Review
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleAction(e, 'track', order)}
                  className="px-4 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-[#FF4D00]/90 transition-colors flex items-center gap-2"
                >
                  Track Order
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle invoice download
                  }}
                  className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <FileText size={16} />
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <p className="text-gray-600">Showing {filteredOrders.length} orders</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg bg-[#FF4D00] text-white">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-[#FF4D00]">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border rounded-lg hover:border-[#FF4D00]">
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder; 