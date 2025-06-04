import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, RotateCcw, Star, FileText, ChevronDown, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: string;
  image_url: string;
}

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
  order_id: string;
  order_number: string;
  order_status: string;
  payment_status: string;
  total_amount: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  shipping_address: {
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  currency: string;
}

interface ApiResponse {
  status: string;
  data: {
    orders: Order[];
    pagination?: {
      total: number;
      current_page: number;
      per_page: number;
      pages: number;
    };
  };
  message?: string;
}

const TrackOrder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
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
  const { accessToken, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      console.log('Debug - Auth Token:', token ? 'Token exists' : 'No token found');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString()
      });

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const url = `${baseUrl}/api/orders/user?${params}`;
      console.log('Debug - Request URL:', url);
      console.log('Debug - Request Params:', Object.fromEntries(params.entries()));

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Debug - Response Status:', response.status);
      console.log('Debug - Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Debug - Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        throw new Error(`Failed to fetch orders: ${response.status} ${errorText}`);
      }

      const data: ApiResponse = await response.json();
      console.log('Debug - Raw API Response:', data);
      
      if (data.status === 'success') {
        // Ensure data.data.orders is an array
        const ordersArray = Array.isArray(data.data.orders) ? data.data.orders : [];
        
        console.log('Debug - Processed Orders:', {
          count: ordersArray.length,
          firstOrder: ordersArray[0] ? {
            id: ordersArray[0].order_id,
            order_number: ordersArray[0].order_number,
            status: ordersArray[0].order_status
          } : null
        });

        setOrders(ordersArray);
        
        // Set total pages based on pagination if available, otherwise calculate from orders length
        if (data.data.pagination) {
          setTotalPages(data.data.pagination.pages);
        } else {
          setTotalPages(Math.ceil(ordersArray.length / perPage));
        }
      } else {
        console.error('Debug - API Error:', {
          status: data.status,
          message: data.message
        });
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Debug - Error Details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch orders';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log('Debug - Request completed, loading state:', false);
    }
  };

  const handleOrderClick = (order: Order) => {
    navigate(`/order/${order.id}`, { state: { order } });
    navigate(`/refund/${order.order_id}`, { state: { order } });
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
  const handleExchangeClick = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    navigate(`/exchange/${order.order_id}`, { state: { order } });
  };

  const handleRefundClick = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    navigate(`/refund/${order.order_id}`, { state: { order } });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getValidCurrencyCode = (currency: string): string => {
    // Map of custom currency codes to ISO currency codes
    const currencyMap: { [key: string]: string } = {
      'IN': 'INR',  // Indian Rupee
      'US': 'USD',  // US Dollar
      'EU': 'EUR',  // Euro
      'GB': 'GBP',  // British Pound
      // Add more mappings as needed
    };

    // If the currency code is in our map, use the mapped value
    if (currencyMap[currency]) {
      return currencyMap[currency];
    }

    // If it's already a valid ISO currency code, use it as is
    try {
      new Intl.NumberFormat('en-US', { style: 'currency', currency });
      return currency;
    } catch {
      // If it's not a valid currency code, default to USD
      return 'USD';
    }
  };

  const formatCurrency = (amount: string, currency: string) => {
    try {
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) return `${currency} 0.00`;
      
      const validCurrency = getValidCurrencyCode(currency);
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: validCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(numericAmount);
    } catch (error) {
      // Fallback formatting if Intl.NumberFormat fails
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) return `${currency} 0.00`;
      return `${currency} ${numericAmount.toFixed(2)}`;
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error Loading Orders</p>
          <p>{error}</p>
          <button 
            onClick={() => fetchOrders()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders by product name or order ID"
            placeholder="Search orders by order number or product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg"
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
        {!Array.isArray(orders) || orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              onClick={() => handleOrderClick(order)}
              className="border rounded-lg p-6 space-y-4 cursor-pointer hover:border-orange-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {order.items[0]?.image_url && (
                    <img
                      src={order.items[0].image_url}
                      alt={order.items[0].product_name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Status: {order.order_status}</span>
                      <span className="text-sm text-gray-500">({order.payment_status})</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Order placed on {formatDate(order.created_at)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Last updated: {formatDate(order.updated_at)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1 bg-gray-100 rounded-lg text-sm"
                >
                  Rate
                </button>
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
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Order #{order.order_number}</h3>
                  <p className="text-gray-600 text-sm">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Total: {formatCurrency(order.total_amount, order.currency)}
                  </p>
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
          ))
        )}
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
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 my-6">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-6 h-6 flex items-center justify-center border rounded ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'border-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TrackOrder; 