import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, RotateCcw, Star, FileText, ChevronDown, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OrderItem {
  order_item_id: number;
  product_name_at_purchase: string;
  quantity: number;
  unit_price_at_purchase: string;
  final_price_for_item: string;
  product_image: string;
  item_status: string;
}

interface Order {
  order_id: string;
  order_status: string;
  order_date: string;
  total_amount: string;
  currency: string;
  items: OrderItem[];
  shipping_address_details: {
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  status_history: {
    status: string;
    changed_at: string;
    notes: string;
  }[];
}

interface ApiResponse {
  status: string;
  data: {
    orders: Order[];
    total: number;
    pages: number;
    current_page: number;
  };
  message?: string;
}

// Add currency symbol mapping
const CURRENCY_SYMBOLS: { [key: string]: string } = {
  'IN': '₹',
  'US': '$',
  'EUR': '€',
  'GBP': '£'
};

const Order: React.FC = () => {
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
  const { isAuthenticated } = useAuth();

  const getCurrencySymbol = (currencyCode: string): string => {
    return CURRENCY_SYMBOLS[currencyCode] || currencyCode;
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString()
      });

      if (selectedFilter !== 'all') {
        params.append('status', selectedFilter);
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/user?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log('Orders API Response:', data);
      
      if (data.status === 'success') {
        // Get tracking info for each order to get product images
        const ordersWithImages = await Promise.all(
          data.data.orders.map(async (order) => {
            try {
              const trackingResponse = await fetch(`${API_BASE_URL}/api/orders/${order.order_id}/track`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              });
              
              if (trackingResponse.ok) {
                const trackingData = await trackingResponse.json();
                if (trackingData.status === 'success') {
                  // Map tracking items to order items
                  order.items = order.items.map(item => {
                    const trackingItem = trackingData.data.items.find(
                      (ti: any) => ti.order_item_id === item.order_item_id
                    );
                    return {
                      ...item,
                      product_image: trackingItem?.product_image || '/placeholder-image.jpg'
                    };
                  });
                }
              }
            } catch (error) {
              console.error(`Error fetching tracking info for order ${order.order_id}:`, error);
            }
            return order;
          })
        );

        console.log('Orders with images:', ordersWithImages);
        setOrders(ordersWithImages);
        setTotalPages(data.data.pages);
      } else {
        throw new Error(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderTracking = async (orderId: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}/track`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch order tracking: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order Tracking Response:', data);
      return data.data;
    } catch (err) {
      console.error('Error fetching order tracking:', err);
      toast.error('Failed to load order tracking information');
      return null;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate, currentPage, selectedFilter]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'in_transit':
      case 'shipped':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleOrderClick = async (order: Order) => {
    const trackingInfo = await fetchOrderTracking(order.order_id);
    navigate(`/order/${order.order_id}`, { state: { order, trackingInfo } });
  };

  const handleAction = async (e: React.MouseEvent, type: string, order: Order) => {
    e.stopPropagation();
    const trackingInfo = await fetchOrderTracking(order.order_id);
    
    switch (type) {
      case 'exchange':
        navigate(`/exchange/${order.order_id}`, { state: { order, trackingInfo } });
        break;
      case 'return':
        navigate(`/refund/${order.order_id}`, { state: { order, trackingInfo } });
        break;
      case 'review':
        navigate(`/review/${order.order_id}`, { state: { order, trackingInfo } });
        break;
      case 'track':
        navigate(`/track/${order.order_id}`, { state: { trackingInfo } });
        break;
    }
  };

  const filteredOrders = orders.filter(order => 
    order.items.some(item => 
      item.product_name_at_purchase.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    order.order_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
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
            onClick={() => navigate('/return-refund')}
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
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
          />
        </div>
        <div className="relative">
          <button 
            className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:border-[#FF4D00] transition-colors"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={20} />
            Filter
            <ChevronDown size={16} />
          </button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-2">
                {['all', 'delivered', 'in_transit', 'processing', 'cancelled'].map((filter) => (
                  <button 
                    key={filter}
                    className={`w-full text-left px-3 py-2 rounded capitalize ${
                      selectedFilter === filter ? 'bg-[#FF4D00] text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setFilterOpen(false);
                    }}
                  >
                    {filter === 'all' ? 'All Orders' : filter.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            console.log('Rendering order:', order);
            return (
              <div
                key={order.order_id}
                onClick={() => handleOrderClick(order)}
                className="border rounded-lg p-6 space-y-4 cursor-pointer hover:border-[#FF4D00] transition-colors bg-white shadow-sm"
              >
                {order.items.map((item) => (
                  <div key={item.order_item_id} className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <img
                        src={item.product_image || '/placeholder-image.jpg'}
                        alt={item.product_name_at_purchase}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.product_name_at_purchase}</h3>
                        <p className="text-gray-600 text-sm mb-1">Order #{order.order_id}</p>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(order.order_status)}`}></span>
                          <span className="font-medium">{order.order_status.replace('_', ' ')}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {order.status_history && order.status_history.length > 0 
                            ? order.status_history[0].notes 
                            : 'Order placed'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {getCurrencySymbol(order.currency)} {item.final_price_for_item}
                      </p>
                      <p className="text-gray-600 text-sm">Ordered on {formatDate(order.order_date)}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-3">
                    {order.order_status === 'delivered' && (
                      <>
                        <button
                          onClick={(e) => handleAction(e, 'return', order)}
                          className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors flex items-center gap-2"
                        >
                          <RotateCcw size={16} />
                          Return
                        </button>
                        <button
                          onClick={(e) => handleAction(e, 'review', order)}
                          className="px-4 py-2 text-[#FF4D00] border border-[#FF4D00] rounded-lg hover:bg-[#FF4D00] hover:text-white transition-colors flex items-center gap-2"
                        >
                          <Star size={16} />
                          Review
                        </button>
                      </>
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
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 my-6">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#FF4D00]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                currentPage === i + 1
                  ? 'bg-[#FF4D00] text-white'
                  : 'hover:border-[#FF4D00]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#FF4D00]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Order; 