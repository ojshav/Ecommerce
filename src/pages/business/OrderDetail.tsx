import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PencilIcon,
  PrinterIcon,
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
  unit_price_inclusive_gst: string;
  line_item_total_inclusive_gst  : string;
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
  
  Object.entries(selectedAttributes).forEach(([, value]) => {
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
  const { } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

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
    <>
      <style>
        {`
          /* Hide print content on screen */
          .print-only {
            display: none;
          }
          
          @media print {
            /* Hide everything by default */
            body * {
              visibility: hidden;
            }
            
            /* Show only the invoice content */
            .print-only,
            .print-only * {
              visibility: visible !important;
              display: block !important;
            }
            
            /* Position the invoice content */
            .print-only {
              position: static !important;
              left: auto !important;
              top: auto !important;
              width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            
            /* Reset body and html for print */
            html, body {
              width: 100% !important;
              height: auto !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: black !important;
              font-family: Arial, sans-serif !important;
              font-size: 11pt !important;
              line-height: 1.3 !important;
            }
            
            /* Page handling for print */
            @page {
              size: A4 !important;
              margin: 15mm !important;
            }
            
            /* Prevent page breaks inside important elements */
            .invoice-header,
            .order-info-section,
            .summary-section {
              page-break-inside: avoid !important;
            }
            
            /* Allow page breaks between items */
            .items-container {
              page-break-inside: auto !important;
            }
            
            .item-card {
              page-break-inside: avoid !important;
            }
            
            /* Ensure footer appears on last page */
            .invoice-footer {
              page-break-inside: avoid !important;
            }
            
            /* Force new page for customer notes if needed */
            .customer-notes {
              page-break-inside: avoid !important;
            }
            
            /* Invoice Header - Amazon/Flipkart Style */
            .invoice-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: flex-start !important;
              border-bottom: 2px solid #000 !important;
              padding-bottom: 15px !important;
              margin-bottom: 20px !important;
            }
            
            .invoice-logo {
              font-size: 24pt !important;
              font-weight: bold !important;
              color: #000 !important;
            }
            
            .invoice-title {
              text-align: right !important;
            }
            
            .invoice-title h1 {
              font-size: 18pt !important;
              font-weight: bold !important;
              margin: 0 !important;
              color: black !important;
            }
            
            .invoice-title p {
              font-size: 10pt !important;
              margin: 2px 0 !important;
              color: #666 !important;
            }
            
            /* Order Info Section */
            .order-info-section {
              display: flex !important;
              justify-content: space-between !important;
              gap: 30px !important;
              margin-bottom: 25px !important;
              border: 1px solid #ddd !important;
              padding: 15px !important;
            }
            
            .order-info-box {
              flex: 1 !important;
            }
            
            .order-info-box h3 {
              font-size: 12pt !important;
              font-weight: bold !important;
              margin: 0 0 8px 0 !important;
              color: black !important;
              border-bottom: 1px solid #ddd !important;
              padding-bottom: 5px !important;
            }
            
            .order-info-box p {
              font-size: 10pt !important;
              margin: 3px 0 !important;
              color: black !important;
            }
            
            .order-info-box .label {
              font-weight: bold !important;
              display: inline-block !important;
              width: 120px !important;
            }
            
            /* Items Section - Frontend Style */
            .items-section {
              margin-bottom: 25px !important;
            }
            
            .items-section h3 {
              font-size: 14pt !important;
              font-weight: bold !important;
              margin: 0 0 15px 0 !important;
              padding-bottom: 8px !important;
              border-bottom: 2px solid #000 !important;
              color: black !important;
            }
            
            .items-container {
              border: 1px solid #ddd !important;
            }
            
            .item-card {
              padding: 15px !important;
              border-bottom: 1px solid #ddd !important;
              page-break-inside: avoid !important;
            }
            
            .item-card:last-child {
              border-bottom: none !important;
            }
            
            .item-header {
              display: flex !important;
              justify-content: space-between !important;
              align-items: flex-start !important;
            }
            
            .item-details-left {
              flex: 1 !important;
            }
            
            .item-name {
              font-size: 11pt !important;
              font-weight: bold !important;
              color: black !important;
              margin: 0 0 5px 0 !important;
            }
            
            .item-sku {
              font-size: 9pt !important;
              color: #666 !important;
              margin: 0 0 5px 0 !important;
            }
            
            .item-quantity {
              font-size: 9pt !important;
              color: #666 !important;
              margin: 0 0 8px 0 !important;
            }
            
            .item-attributes {
              margin: 8px 0 0 0 !important;
            }
            
            .attributes-label {
              font-size: 9pt !important;
              font-weight: bold !important;
              color: #333 !important;
              margin: 0 0 5px 0 !important;
            }
            
            .attribute-tags {
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 5px !important;
            }
            
            .attribute-tag {
              background: #f0f0f0 !important;
              color: #333 !important;
              font-size: 8pt !important;
              padding: 3px 6px !important;
              border: 1px solid #ccc !important;
              border-radius: 3px !important;
              display: inline-block !important;
            }
            
            .item-pricing {
              text-align: right !important;
              min-width: 120px !important;
            }
            
            .item-unit-price {
              font-size: 10pt !important;
              color: #666 !important;
              margin: 0 0 5px 0 !important;
            }
            
            .item-total-price {
              font-size: 11pt !important;
              font-weight: bold !important;
              color: black !important;
              margin: 0 !important;
            }
            
            /* Summary Section - Frontend Style */
            .summary-section {
              display: flex !important;
              justify-content: flex-end !important;
              margin-top: 25px !important;
            }
            
            .summary-box {
              width: 350px !important;
              border: 1px solid #ddd !important;
              background: white !important;
            }
            
            .summary-box h3 {
              font-size: 12pt !important;
              font-weight: bold !important;
              color: black !important;
              margin: 0 !important;
              padding: 12px 15px !important;
              border-bottom: 1px solid #ddd !important;
              background: #f8f9fa !important;
            }
            
            .summary-content {
              padding: 15px !important;
            }
            
            .summary-row {
              display: flex !important;
              justify-content: space-between !important;
              margin-bottom: 8px !important;
            }
            
            .summary-row:last-child {
              margin-bottom: 0 !important;
            }
            
            .summary-label {
              font-size: 10pt !important;
              color: #666 !important;
            }
            
            .summary-value {
              font-size: 10pt !important;
              font-weight: bold !important;
              color: black !important;
            }
            
            .summary-value.discount {
              color: #059669 !important;
            }
            
            .summary-row.total-row {
              border-top: 1px solid #ddd !important;
              padding-top: 8px !important;
              margin-top: 8px !important;
            }
            
            .total-row .summary-label {
              font-size: 11pt !important;
              font-weight: bold !important;
              color: black !important;
            }
            
            .total-row .summary-value {
              font-size: 11pt !important;
              font-weight: bold !important;
              color: black !important;
            }
            
            /* Status badges for print */
            .status-badge {
              display: inline-block !important;
              padding: 3px 8px !important;
              border: 1px solid #000 !important;
              font-size: 9pt !important;
              font-weight: bold !important;
              background: white !important;
              color: black !important;
            }
            
            /* Footer */
            .invoice-footer {
              margin-top: 30px !important;
              padding-top: 15px !important;
              border-top: 1px solid #ddd !important;
              text-align: center !important;
              font-size: 9pt !important;
              color: #666 !important;
            }
          }
        `}
      </style>
      <div className="space-y-6 print-container">
        {/* Amazon/Flipkart Style Invoice - Hidden on screen, visible on print */}
        <div className="invoice-content print-only">
          {/* Invoice Header */}
          <div className="invoice-header">
            <div className="invoice-logo">
              YourStore
            </div>
            <div className="invoice-title">
              <h1>TAX INVOICE</h1>
              <p>Order ID: {order.order_id}</p>
              <p>Invoice Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Order Information Section */}
          <div className="order-info-section">
            <div className="order-info-box">
              <h3>Billing Address</h3>
              <p><span className="label">Customer ID:</span> {order.user_id}</p>
              <p><span className="label">Address:</span></p>
              <p>{order.shipping_address_details.address_line1}</p>
              {order.shipping_address_details.address_line2 && (
                <p>{order.shipping_address_details.address_line2}</p>
              )}
              <p>{order.shipping_address_details.city}, {order.shipping_address_details.state} {order.shipping_address_details.postal_code}</p>
              <p>{order.shipping_address_details.country}</p>
            </div>
            <div className="order-info-box">
              <h3>Order Details</h3>
              <p><span className="label">Order Date:</span> {new Date(order.order_date).toLocaleDateString()}</p>
              <p><span className="label">Order Status:</span> <span className="status-badge">{order.order_status.replace('_', ' ')}</span></p>
              <p><span className="label">Payment Status:</span> <span className="status-badge">{order.payment_status.replace('_', ' ')}</span></p>
              <p><span className="label">Payment Method:</span> {order.payment_method || 'N/A'}</p>
              <p><span className="label">Shipping Method:</span> {order.shipping_method_name}</p>
            </div>
          </div>

          {/* Items Section - Frontend Style */}
          <div className="items-section">
            <h3>Order Items</h3>
            <div className="items-container">
              {order.items.map((item) => {
                const selectedAttributes = formatSelectedAttributes(item.selected_attributes);
                
                return (
                  <div key={item.order_item_id} className="item-card">
                    <div className="item-header">
                      <div className="item-details-left">
                        <div className="item-name">{item.product_name_at_purchase}</div>
                        <div className="item-sku">SKU: {item.sku_at_purchase}</div>
                        <div className="item-quantity">Quantity: {item.quantity}</div>
                        
                        {/* Selected Attributes */}
                        {selectedAttributes && (
                          <div className="item-attributes">
                            <div className="attributes-label">Selected Options:</div>
                            <div className="attribute-tags">
                              {selectedAttributes.map((attr, index) => (
                                <span key={index} className="attribute-tag">
                                  {attr}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="item-pricing">
                        <div className="item-unit-price">
                          {order.currency} {parseFloat(item.unit_price_inclusive_gst).toFixed(2)} each
                        </div>
                        <div className="item-total-price">
                          Total: {order.currency} {parseFloat(item.final_price_for_item).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Section - Frontend Style */}
          <div className="summary-section">
            <div className="summary-box">
              <h3>Order Summary</h3>
              <div className="summary-content">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">{order.currency} {parseFloat(order.subtotal_amount).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span className="summary-value">{order.currency} {parseFloat(order.tax_amount).toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">{order.currency} {parseFloat(order.shipping_amount).toFixed(2)}</span>
                </div>
                {parseFloat(order.discount_amount) > 0 && (
                  <div className="summary-row">
                    <span className="summary-label">Discount</span>
                    <span className="summary-value discount">-{order.currency} {parseFloat(order.discount_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row total-row">
                  <span className="summary-label">Total</span>
                  <span className="summary-value">{order.currency} {parseFloat(order.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {order.customer_notes && (
            <div className="customer-notes" style={{marginTop: '20px', border: '1px solid #ddd', padding: '10px'}}>
              <h3 style={{margin: '0 0 8px 0', fontSize: '12pt', fontWeight: 'bold'}}>Customer Notes:</h3>
              <p style={{margin: '0', fontSize: '10pt'}}>{order.customer_notes}</p>
            </div>
          )}

          {/* Invoice Footer */}
          <div className="invoice-footer">
            <p><strong>Terms & Conditions:</strong></p>
            <p>This is a computer generated invoice and does not require signature.</p>
            <p>For any queries regarding this invoice, please contact our customer support.</p>
            <p><strong>Thank you for shopping with us!</strong></p>
          </div>
        </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/business/orders" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 no-print"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 print-title">Order #{order.order_id}</h1>
        </div>
        <div className="flex space-x-2 no-print">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 print-section">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
                          {order.currency} {parseFloat(item.unit_price_inclusive_gst).toFixed(2)} each
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 print-section">
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
                      {history.status.split('_').map((word: string) => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
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
    </>
  );
};

export default OrderDetail; 