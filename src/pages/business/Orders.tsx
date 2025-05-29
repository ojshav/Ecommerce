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
      bgColor = 'bg-emerald-100';
      textColor = 'text-emerald-800';
      break;
    case 'Shipped':
      bgColor = 'bg-sky-100';
      textColor = 'text-sky-800';
      break;
    case 'Processing':
      bgColor = 'bg-amber-100';
      textColor = 'text-amber-800';
      break;
    case 'Pending':
      bgColor = 'bg-orange-100';
      textColor = 'text-orange-800';
      break;
    case 'Cancelled':
      bgColor = 'bg-rose-100';
      textColor = 'text-rose-800';
      break;
    case 'Completed':
      bgColor = 'bg-emerald-100';
      textColor = 'text-emerald-800';
      break;
    case 'Failed':
      bgColor = 'bg-rose-100';
      textColor = 'text-rose-800';
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
  const [orders, setOrders] = useState(ORDERS);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            New Order
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
          </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
            <option value="All">All Status</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                >
            <option value="All">All Payment Status</option>
                  {PAYMENT_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            More Filters
          </button>
              </div>
              
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
                </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  id="date-start"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
                <input
                  type="date"
                  id="date-end"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
              </div>
            </div>
          )}
        </div>
        
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Order ID', 'Date', 'Customer', 'Items', 'Total', 'Status', 'Payment', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-orange-600"
                    onClick={() => requestSort(header.toLowerCase())}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      {getSortIndicator(header.toLowerCase())}
                  </div>
                </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-orange-600 hover:text-orange-900">
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders; 