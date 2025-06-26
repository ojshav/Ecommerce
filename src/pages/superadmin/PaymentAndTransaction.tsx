import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string; // YYYY-MM-DD format
  planId: string;
  startDate: string;
  endDate: string;
}

const mockPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79.99
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.99
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    userId: 'USR-001',
    userName: 'John Doe',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-20',
    planId: 'basic',
    startDate: '2024-07-20',
    endDate: '2025-08-19'
  },
  {
    id: 'TXN-004',
    userId: 'USR-001',
    userName: 'John Doe',
    amount: 29.99,
    status: 'Pending',
    date: '2024-07-20',
    planId: 'basic',
    startDate: '2024-07-20',
    endDate: '2025-08-19'
  },
  {
    id: 'TXN-016',
    userId: 'USR-015',
    userName: 'Liam Nesson',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-20',
    planId: 'basic',
    startDate: '2024-07-20',
    endDate: '2025-08-19'
  },
  {
    id: 'TXN-003',
    userId: 'USR-003',
    userName: 'Alice Brown',
    amount: 79.99,
    status: 'Completed',
    date: '2024-07-18',
    planId: 'professional',
    startDate: '2024-07-18',
    endDate: '2025-08-17'
  },
  {
    id: 'TXN-005',
    userId: 'USR-004',
    userName: 'Bob Johnson',
    amount: 199.99,
    status: 'Completed',
    date: '2024-07-17',
    planId: 'enterprise',
    startDate: '2024-07-17',
    endDate: '2025-08-16'
  },
  {
    id: 'TXN-017',
    userId: 'USR-016',
    userName: 'Mad Max',
    amount: 199.99,
    status: 'Completed',
    date: '2024-07-19',
    planId: 'enterprise',
    startDate: '2024-07-19',
    endDate: '2025-07-18'
  },
  {
    id: 'TXN-019',
    userId: 'USR-018',
    userName: 'Olivia Rodrigo',
    amount: 79.99,
    status: 'Completed',
    date: '2024-07-17',
    planId: 'professional',
    startDate: '2024-07-17',
    endDate: '2025-07-16'
  },
  {
    id: 'TXN-006',
    userId: 'USR-005',
    userName: 'Charlie Green',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-15',
    planId: 'basic',
    startDate: '2024-07-15',
    endDate: '2025-07-14'
  },
  {
    id: 'TXN-008',
    userId: 'USR-007',
    userName: 'Ethan Hunt',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-13',
    planId: 'basic',
    startDate: '2024-07-13',
    endDate: '2025-07-12'
  },
  {
    id: 'TXN-009',
    userId: 'USR-008',
    userName: 'Fiona Apple',
    amount: 199.99,
    status: 'Failed',
    date: '2024-07-12',
    planId: 'enterprise',
    startDate: '2024-07-12',
    endDate: '2025-07-11'
  },
  {
    id: 'TXN-010',
    userId: 'USR-009',
    userName: 'George Clooney',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-11',
    planId: 'basic',
    startDate: '2024-07-11',
    endDate: '2025-07-10'
  },
  {
    id: 'TXN-012',
    userId: 'USR-011',
    userName: 'Harry Potter',
    amount: 29.99,
    status: 'Completed',
    date: '2024-07-01',
    planId: 'basic',
    startDate: '2024-07-01',
    endDate: '2025-06-30'
  },
  {
    id: 'TXN-013',
    userId: 'USR-012',
    userName: 'Ivy Queen',
    amount: 199.99,
    status: 'Pending',
    date: '2024-06-25',
    planId: 'enterprise',
    startDate: '2024-06-25',
    endDate: '2025-06-24'
  },
  {
    id: 'TXN-015',
    userId: 'USR-014',
    userName: 'Kim Possible',
    amount: 79.99,
    status: 'Completed',
    date: '2024-05-15',
    planId: 'professional',
    startDate: '2024-05-15',
    endDate: '2025-06-14'
  }
];

const PaymentAndTransactionMonitoring: React.FC = () => {
  const [planFilter, setPlanFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const getFilteredTransactions = () => {
    return mockTransactions.filter(transaction => {
      const matchesPlanFilter = planFilter === '' ? true : transaction.planId === planFilter;
      const matchesSearch =
        searchQuery === '' ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.amount.toFixed(2).includes(searchQuery.toLowerCase()) ||
        transaction.status.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesPlanFilter && matchesSearch;
    });
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = getFilteredTransactions();

  const getTotalAmount = () => filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const getTransactionCount = (status?: 'Completed' | 'Pending' | 'Failed') =>
    status ? filteredTransactions.filter(t => t.status === status).length : filteredTransactions.length;

  return (
    <div className="min-h-[80vh] p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Payment & Transaction Monitoring</h1>

      {/* Filters: Search and Plan */}
      <div className="flex flex-wrap flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          className="md:flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Search transactions (ID, User, Amount, Status)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap rounded-lg border border-gray-300 overflow-hidden sm:w-fit">
          <button
            className={`px-4 py-2 text-sm font-medium ${planFilter === '' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setPlanFilter('')}
          >
            All Plans
          </button>
          {mockPlans.map(plan => (
            <button
              key={plan.id}
              className={`px-4 py-2 text-sm font-medium ${planFilter === plan.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPlanFilter(plan.id)}
            >
              {plan.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-md text-center border border-blue-100">
          <p className="text-sm text-blue-700">Total Transactions</p>
          <p className="text-xl font-bold text-blue-900">{filteredTransactions.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-md text-center border border-green-100">
          <p className="text-sm text-green-700">Total Revenue</p>
          <p className="text-xl font-bold text-green-900">${getTotalAmount().toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-md text-center border border-purple-100">
          <p className="text-sm text-purple-700">Completed</p>
          <p className="text-xl font-bold text-purple-900">{getTransactionCount('Completed')}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-md text-center border border-red-100">
          <p className="text-sm text-red-700">Failed</p>
          <p className="text-xl font-bold text-red-900">{getTransactionCount('Failed')}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl border border-orange-100 overflow-x-auto">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-orange-50 text-orange-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-orange-50">
                  <td className="px-4 py-2 font-medium">{transaction.id}</td>
                  <td className="px-4 py-2">{transaction.userId}</td>
                  <td className="px-4 py-2">{transaction.userName}</td>
                  <td className="px-4 py-2 text-green-700 font-semibold">${transaction.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-gray-700">
                      {mockPlans.find(p => p.id === transaction.planId)?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{transaction.startDate}</td>
                  <td className="px-4 py-2">{transaction.endDate}</td>
                  <td className="px-4 py-2 text-center">
                    <button title="View Details" className="text-orange-600 hover:text-orange-700 p-1 rounded" onClick={() => handleViewDetails(transaction)}>
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="px-4 py-4 text-center text-gray-500">
                  No transactions found for the selected period and filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-500">Transaction Details</h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Main Info */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Transaction ID</span>
                  <span className="font-semibold text-gray-900">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">User Name</span>
                  <span className="font-semibold text-gray-900">{selectedTransaction.userName}</span>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-500 block">Start Date</span>
                    <span className="text-sm font-medium text-gray-900">{selectedTransaction.startDate}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">End Date</span>
                    <span className="text-sm font-medium text-gray-900">{selectedTransaction.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Status and Plan */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-xs text-gray-500 block mb-1">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedTransaction.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : selectedTransaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedTransaction.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-xs text-gray-500 block mb-1">Plan</span>
                  <span className="text-sm font-medium text-gray-900">
                    {mockPlans.find(p => p.id === selectedTransaction.planId)?.name || 'N/A'}
                  </span>
                </div>
              </div>

              {/* User Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-700 mb-2">User Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-blue-600 block">Total Transactions</span>
                    <span className="text-sm font-medium text-blue-900">
                      {mockTransactions.filter(t => t.userId === selectedTransaction.userId).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 block">Total Spent</span>
                    <span className="text-sm font-medium text-blue-900">
                      ${mockTransactions.filter(t => t.userId === selectedTransaction.userId)
                        .reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentAndTransactionMonitoring;