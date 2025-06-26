import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
  PrinterIcon,
  DocumentTextIcon,
  MapPinIcon,
  UserIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define interfaces for type safety
interface Address {
  address_id: number;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  address_type: string;
}

interface OrderItem {
  order_item_id: number;
  product_id: number;
  product_name_at_purchase: string;
  sku_at_purchase: string;
  quantity: number;
  unit_price_at_purchase: string;
  item_subtotal_amount: string;
  final_price_for_item: string;
  selected_attributes: {[key: number]: string | string[]};
  item_status: string;
  created_at: string;
  updated_at: string;
}

interface Order {
  order_id: string;
  order_date: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  shipping_address_id: number;
  shipping_address_details: Address;
  billing_address_id: number | null;
  billing_address_details: Address | null;
  items: OrderItem[];
  subtotal_amount: string;
  tax_amount: string;
  shipping_amount: string;
  discount_amount: string;
  total_amount: string;
  currency: string;
  order_status: string;
  payment_status: string;
  payment_method: string | null;
  payment_gateway_transaction_id: string | null;
  shipping_method_name: string;
  customer_notes: string;
  status_history: any[];
}

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'DELIVERED':
      bgColor = 'bg-emerald-100';
      textColor = 'text-emerald-800';
      break;
    case 'SHIPPED':
      bgColor = 'bg-sky-100';
      textColor = 'text-sky-800';
      break;
    case 'PROCESSING':
      bgColor = 'bg-amber-100';
      textColor = 'text-amber-800';
      break;
    case 'PENDING_PAYMENT':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    case 'CANCELLED':
      bgColor = 'bg-rose-100';
      textColor = 'text-rose-800';
      break;
    case 'SUCCESSFUL':
      bgColor = 'bg-emerald-100';
      textColor = 'text-emerald-800';
      break;
    case 'FAILED':
      bgColor = 'bg-rose-100';
      textColor = 'text-rose-800';
      break;
    case 'REFUNDED':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      break;
    case 'PENDING':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
    </span>
  );
};

// Helper function to format selected attributes for display
const formatSelectedAttributes = (selectedAttributes: {[key: number]: string | string[]} | undefined) => {
  if (!selectedAttributes || Object.keys(selectedAttributes).length === 0) {
    return null;
  }

  const formattedAttributes: string[] = [];
  
  Object.entries(selectedAttributes).forEach(([attributeId, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        formattedAttributes.push(...value);
      }
    } else if (value) {
      formattedAttributes.push(value);
    }
  });

  return formattedAttributes.length > 0 ? formattedAttributes : null;
};

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const apiUrl = `${API_BASE_URL}/api/merchant-dashboard/orders/${orderId}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Failed to fetch order details: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      console.error('Error in fetchOrderDetails:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch order details';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchOrderDetails} className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Try Again
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/business/orders" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">Order #{order.order_id}</h1>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Order Status</h2>
            <p className="text-sm text-gray-500">Placed on {new Date(order.order_date).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <StatusBadge status={order.order_status} />
              <p className="text-xs text-gray-500 mt-1">Order Status</p>
            </div>
            <div className="text-center">
              <StatusBadge status={order.payment_status} />
              <p className="text-xs text-gray-500 mt-1">Payment Status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Order Items
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => {
                const selectedAttributes = formatSelectedAttributes(item.selected_attributes);
                
                return (
                  <div key={item.order_item_id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.product_name_at_purchase}</h4>
                        <p className="text-sm text-gray-500">SKU: {item.sku_at_purchase}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        
                        {/* Selected Attributes */}
                        {selectedAttributes && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">Selected Options:</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedAttributes.map((attr, index) => (
                                <span 
                                  key={index}
                                  className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded"
                                >
                                  {attr}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {order.currency} {parseFloat(item.unit_price_at_purchase).toFixed(2)} each
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: {order.currency} {parseFloat(item.final_price_for_item).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Customer Information
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer ID</p>
                  <p className="text-sm text-gray-900">{order.user_id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Address</p>
                  <div className="text-sm text-gray-900">
                    <p>{order.shipping_address_details.address_line1}</p>
                    {order.shipping_address_details.address_line2 && (
                      <p>{order.shipping_address_details.address_line2}</p>
                    )}
                    <p>{order.shipping_address_details.city}, {order.shipping_address_details.state} {order.shipping_address_details.postal_code}</p>
                    <p>{order.shipping_address_details.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Payment Information
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Payment Method</p>
                  <p className="text-sm text-gray-900">{order.payment_method || 'N/A'}</p>
                </div>
                {order.payment_gateway_transaction_id && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Transaction ID</p>
                    <p className="text-sm text-gray-900">{order.payment_gateway_transaction_id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">{order.currency} {parseFloat(order.subtotal_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium">{order.currency} {parseFloat(order.tax_amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium">{order.currency} {parseFloat(order.shipping_amount).toFixed(2)}</span>
                </div>
                {parseFloat(order.discount_amount) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Discount</span>
                    <span className="text-sm font-medium text-green-600">-{order.currency} {parseFloat(order.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">{order.currency} {parseFloat(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <TruckIcon className="h-5 w-5 mr-2" />
                Shipping Information
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Shipping Method</p>
                  <p className="text-sm text-gray-900">{order.shipping_method_name}</p>
                </div>
                {order.customer_notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Customer Notes</p>
                    <p className="text-sm text-gray-900">{order.customer_notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status History */}
      {order.status_history && order.status_history.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Status History</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {order.status_history.map((history, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {history.status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(history.changed_at).toLocaleString()}
                    </p>
                    {history.notes && (
                      <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail; 