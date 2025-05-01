import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

// Mock customers data
const CUSTOMERS: Customer[] = [
  {
    id: 'CUS-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    dateJoined: '2023-05-10',
    ordersCount: 8,
    totalSpent: 423.45,
    lastOrderDate: '2023-08-15',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555-987-6543',
    dateJoined: '2023-04-22',
    ordersCount: 5,
    totalSpent: 287.99,
    lastOrderDate: '2023-08-14',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-003',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 555-567-8901',
    dateJoined: '2023-06-05',
    ordersCount: 2,
    totalSpent: 129.98,
    lastOrderDate: '2023-08-14',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-004',
    name: 'Emily Wilson',
    email: 'emily@example.com',
    phone: '+1 555-345-6789',
    dateJoined: '2023-05-17',
    ordersCount: 4,
    totalSpent: 329.50,
    lastOrderDate: '2023-08-13',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-005',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1 555-234-5678',
    dateJoined: '2023-02-28',
    ordersCount: 12,
    totalSpent: 645.75,
    lastOrderDate: '2023-08-12',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-006',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    phone: '+1 555-876-5432',
    dateJoined: '2023-07-11',
    ordersCount: 1,
    totalSpent: 78.50,
    lastOrderDate: '2023-08-11',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-007',
    name: 'David Miller',
    email: 'david@example.com',
    phone: '+1 555-654-3210',
    dateJoined: '2023-01-05',
    ordersCount: 9,
    totalSpent: 512.89,
    lastOrderDate: '2023-08-10',
    status: 'Inactive',
    avatar: 'https://placehold.co/40x40',
  },
  {
    id: 'CUS-008',
    name: 'Lisa Garcia',
    email: 'lisa@example.com',
    phone: '+1 555-789-0123',
    dateJoined: '2023-03-19',
    ordersCount: 6,
    totalSpent: 398.94,
    lastOrderDate: '2023-08-09',
    status: 'Active',
    avatar: 'https://placehold.co/40x40',
  },
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'Inactive':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
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

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Customer | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'lastOrderDate',
    direction: 'descending',
  });
  
  // Handle sort
  const requestSort = (key: keyof Customer) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter customers based on search and status
  const filteredCustomers = CUSTOMERS.filter((customer) => {
    // Search filter (search by name, email, or phone)
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    // Status filter
    const matchesStatus =
      selectedStatus === 'All' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort customers
  const sortedCustomers = React.useMemo(() => {
    let sortableCustomers = [...filteredCustomers];
    if (sortConfig.key !== null) {
      sortableCustomers.sort((a, b) => {
        if (sortConfig.key === null) {
          return 0;
        }

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [filteredCustomers, sortConfig]);
  
  // Generate sort indicator
  const getSortIndicator = (key: keyof Customer) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 ml-1" />
    );
  };
  
  // Customer stats
  const customerStats = [
    {
      title: 'Total Customers',
      value: CUSTOMERS.length,
    },
    {
      title: 'Active Customers',
      value: CUSTOMERS.filter(c => c.status === 'Active').length,
    },
    {
      title: 'Average Orders',
      value: (CUSTOMERS.reduce((acc, c) => acc + c.ordersCount, 0) / CUSTOMERS.length).toFixed(1),
    },
    {
      title: 'Average Spend',
      value: `$${(CUSTOMERS.reduce((acc, c) => acc + c.totalSpent, 0) / CUSTOMERS.length).toFixed(2)}`,
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <Link
          to="/business/customers/export"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Export Customers
        </Link>
      </div>
      
      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {customerStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200"
          >
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
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
                placeholder="Search customers by name, email, or phone..."
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
                  Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="orders" className="block text-sm font-medium text-gray-700 mb-1">
                  Orders
                </label>
                <select
                  id="orders"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option>Any</option>
                  <option>0 orders</option>
                  <option>1+ orders</option>
                  <option>5+ orders</option>
                  <option>10+ orders</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="spent" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Spent
                </label>
                <select
                  id="spent"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option>Any</option>
                  <option>$0 - $50</option>
                  <option>$50 - $100</option>
                  <option>$100 - $500</option>
                  <option>$500+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date-joined" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Joined
                </label>
                <select
                  id="date-joined"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option>Any Time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Customers List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('name')}>
                    Customer
                    {getSortIndicator('name')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('email')}>
                    Contact
                    {getSortIndicator('email')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('dateJoined')}>
                    Date Joined
                    {getSortIndicator('dateJoined')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('ordersCount')}>
                    Orders
                    {getSortIndicator('ordersCount')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('totalSpent')}>
                    Total Spent
                    {getSortIndicator('totalSpent')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('lastOrderDate')}>
                    Last Order
                    {getSortIndicator('lastOrderDate')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer" onClick={() => requestSort('status')}>
                    Status
                    {getSortIndicator('status')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {customer.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={customer.avatar} alt={customer.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-primary-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-1" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.dateJoined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.ordersCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastOrderDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/business/customers/${customer.id}`} className="text-gray-600 hover:text-gray-900">
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900">
                        <EnvelopeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {sortedCustomers.length === 0 && (
            <div className="px-6 py-10 text-center">
              <p className="text-gray-500 text-lg">No customers found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('All');
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
                <span className="font-medium">{sortedCustomers.length}</span> of{' '}
                <span className="font-medium">{sortedCustomers.length}</span> results
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

export default Customers; 