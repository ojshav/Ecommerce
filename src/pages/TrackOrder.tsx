import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  status: string;
  deliveryDate: string;
  orderDate: string;
  productName: string;
  imageUrl: string;
}

const TrackOrder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Mock orders data - in a real app this would come from an API
  const orders: Order[] = [
    {
      id: '2468135790',
      status: 'Delivered',
      deliveryDate: 'Nov 12, 2024',
      orderDate: 'Nov 7, 2024',
      productName: "Women's Fashion",
      imageUrl: '/path-to-womens-fashion-image.jpg'
    },
    {
      id: '1357924680',
      status: 'Delivered',
      deliveryDate: 'Nov 2, 2024',
      orderDate: 'Oct 28, 2024',
      productName: "Men's Fashion",
      imageUrl: '/path-to-mens-fashion-image.jpg'
    }
  ];

  const handleOrderClick = (order: Order) => {
    // You can implement logic here to determine whether to show refund or exchange based on order status
    navigate(`/refund/${order.id}`, { state: { order } });
  };

  const handleExchangeClick = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation(); // Prevent triggering the order click
    navigate(`/exchange/${order.id}`, { state: { order } });
  };

  const handleRefundClick = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation(); // Prevent triggering the order click
    navigate(`/refund/${order.id}`, { state: { order } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      {/* Search and Filter */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search all orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
          Filter
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Orders List */}
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleOrderClick(order)}
            className="border rounded-lg p-6 space-y-4 cursor-pointer hover:border-orange-500 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img
                  src={order.imageUrl}
                  alt={order.productName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Status: {order.status}</span>
                  </div>
                  <p className="text-gray-600 text-sm">Your order has been delivered</p>
                  <p className="text-gray-600 text-sm">Delivered on {order.deliveryDate}</p>
                </div>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1 bg-gray-100 rounded-lg text-sm"
              >
                Rate
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{order.productName}</h3>
                <p className="text-gray-600 text-sm">Order #{order.id}</p>
                <p className="text-gray-600 text-sm">Order placed on {order.orderDate}</p>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1 bg-gray-100 rounded-lg text-sm"
              >
                Invoice
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={(e) => handleExchangeClick(e, order)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Exchange
              </button>
              <button
                onClick={(e) => handleRefundClick(e, order)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Refund
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button className="p-2 border rounded">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center border rounded bg-black text-white">1</button>
        <button className="w-8 h-8 flex items-center justify-center">2</button>
        <button className="w-8 h-8 flex items-center justify-center">3</button>
        <button className="p-2 border rounded">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-black text-white rounded-lg">
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default TrackOrder; 