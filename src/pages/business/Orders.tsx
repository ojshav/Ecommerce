import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  EyeIcon,
  PencilIcon,
  PrinterIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Define interfaces for type safety
interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  customer: Customer;
  items: number;
  total: number;
  status: string;
  payment: string;
  shippingMethod: string;
}

// Mock orders data
const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    date: '2023-08-15',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-123-4567',
    },
    items: 3,
    total: 139.99,
    status: 'Delivered',
    payment: 'Completed',
    shippingMethod: 'Express',
  },
  {
    id: 'ORD-002',
    date: '2023-08-14',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 555-987-6543',
    },
    items: 1,
    total: 59.95,
    status: 'Processing',
    payment: 'Completed',
    shippingMethod: 'Standard',
  },
  {
    id: 'ORD-003',
    date: '2023-08-14',
    customer: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 555-567-8901',
    },
    items: 2,
    total: 89.00,
    status: 'Pending',
    payment: 'Pending',
    shippingMethod: 'Standard',
  },
  {
    id: 'ORD-004',
    date: '2023-08-13',
    customer: {
      name: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '+1 555-345-6789',
    },
    items: 4,
    total: 129.50,
    status: 'Shipped',
    payment: 'Completed',
    shippingMethod: 'Express',
  },
  {
    id: 'ORD-005',
    date: '2023-08-12',
    customer: {
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 555-234-5678',
    },
    items: 1,
    total: 45.75,
    status: 'Delivered',
    payment: 'Completed',
    shippingMethod: 'Standard',
  },
  {
    id: 'ORD-006',
    date: '2023-08-11',
    customer: {
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      phone: '+1 555-876-5432',
    },
    items: 2,
    total: 78.50,
    status: 'Delivered',
    payment: 'Completed',
    shippingMethod: 'Standard',
  },
  {
    id: 'ORD-007',
    date: '2023-08-10',
    customer: {
      name: 'David Miller',
      email: 'david@example.com',
      phone: '+1 555-654-3210',
    },
    items: 3,
    total: 110.25,
    status: 'Cancelled',
    payment: 'Refunded',
    shippingMethod: 'Express',
  },
  {
    id: 'ORD-008',
    date: '2023-08-09',
    customer: {
      name: 'Lisa Garcia',
      email: 'lisa@example.com',
      phone: '+1 555-789-0123',
    },
    items: 1,
    total: 39.99,
    status: 'Delivered',
    payment: 'Completed',
    shippingMethod: 'Standard',
  },
];

// Status options
const STATUS_OPTIONS = [
  'All',
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

// Payment status options
const PAYMENT_OPTIONS = [
  'All',
  'Pending',
  'Completed',
  'Failed',
  'Refunded',
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Delivered':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Shipped':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'Processing':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'Pending':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    case 'Cancelled':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Failed':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'Refunded':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
    start: '',
    end: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'date',
    direction: 'descending',
  });
  
  // Handle sort
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter orders based on search, status, and date range
  const filteredOrders = ORDERS.filter((order) => {
    // Search filter (search by order ID or customer name/email)
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus =
      selectedStatus === 'All' || order.status === selectedStatus;
    
    // Payment status filter
    const matchesPayment =
      selectedPayment === 'All' || order.payment === selectedPayment;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include the end date fully
      
      matchesDateRange = orderDate >= startDate && orderDate <= endDate;
    } else if (dateRange.start) {
      const orderDate = new Date(order.date);
      const startDate = new Date(dateRange.start);
      matchesDateRange = orderDate >= startDate;
    } else if (dateRange.end) {
      const orderDate = new Date(order.date);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999); // Include the end date fully
      matchesDateRange = orderDate <= endDate;
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDateRange;
  });
  
  // Sort orders
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...filteredOrders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        // Handle nested properties for customer data
        if (sortConfig.key?.includes('.')) {
          const [parentKey, childKey] = sortConfig.key.split('.');
          
          if (parentKey === 'customer') {
            const aValue = a.customer[childKey as keyof Customer];
            const bValue = b.customer[childKey as keyof Customer];
            
            if (aValue < bValue) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          }
          return 0;
        } else {
          // Handle direct properties
          const aValue = a[sortConfig.key as keyof Order];
          const bValue = b[sortConfig.key as keyof Order];
          
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableOrders;
  }, [filteredOrders, sortConfig]);
  
  // Generate sort indicator
  const getSortIndicator = (key: string) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 ml-1" />
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print Orders
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Search, Filter, and Sort */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search orders by ID or customer..."
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  id="payment"
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  {PAYMENT_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="date-start" className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="date-start"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="date-end" className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  id="date-end"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Orders List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('id')}>
                    Order ID
                    {getSortIndicator('id')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('date')}>
                    Date
                    {getSortIndicator('date')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('customer.name')}>
                    Customer
                    {getSortIndicator('customer.name')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('items')}>
                    Items
                    {getSortIndicator('items')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('total')}>
                    Total
                    {getSortIndicator('total')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('status')}>
                    Status
                    {getSortIndicator('status')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('payment')}>
                    Payment
                    {getSortIndicator('payment')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-xs text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order.payment} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/business/orders/${order.id}`} className="text-gray-600 hover:text-gray-900">
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <Link to={`/business/orders/${order.id}/edit`} className="text-blue-600 hover:text-blue-900">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        <PrinterIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {sortedOrders.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 text-lg">No orders found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('All');
                  setSelectedPayment('All');
                  setDateRange({ start: '', end: '' });
                }}
                className="mt-2 text-primary-600 font-medium hover:text-primary-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{sortedOrders.length}</span> of{' '}
                <span className="font-medium">{sortedOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-700 hover:bg-gray-50">
                  1
                </button>
                <button
                  disabled
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders; 