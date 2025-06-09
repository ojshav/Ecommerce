import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

interface Request {
  id: string;
  orderId: string;
  Name: string;
  type: 'Refund' | 'Return';
  reason: string;
  item: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

const mockRequests: Request[] = [
  {
    id: '1',
    orderId: 'ORD-1001',
    Name: 'John Doe',
    type: 'Refund',
    reason: 'Product damaged',
    item: 'Wireless Mouse',
    status: 'Pending',
    date: '2024-06-09',
  },
  {
    id: '2',
    orderId: 'ORD-1002',
    Name: 'Jane Smith',
    type: 'Return',
    reason: 'Wrong size',
    item: 'T-Shirt (Size M)',
    status: 'Approved',
    date: '2024-06-08',
  },
  {
    id: '3',
    orderId: 'ORD-1003',
    Name: 'Alice Brown',
    type: 'Refund',
    reason: 'Late delivery',
    item: 'Bluetooth Speaker',
    status: 'Rejected',
    date: '2024-06-07',
  },
];

const RefundAndReturnManagement: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRequests = mockRequests.filter(r => {
    const matchesFilter = filter === 'All' ? true : r.status === filter;
    const matchesSearch =
      searchQuery === '' ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusCount = (status: string) => mockRequests.filter(r => r.status === status).length;

  return (
    <div className="min-h-[80vh] p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">Refund & Return Management</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <input
          type="text"
          className="md:w-1/3 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Search by Order ID, Name, Reason, or Item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-sm">
        <div className="bg-orange-100 p-3 rounded-md text-center text-orange-700 font-semibold">
          Total: {mockRequests.length}
        </div>
        <div className="bg-yellow-100 p-3 rounded-md text-center text-yellow-700 font-semibold">
          Pending: {getStatusCount('Pending')}
        </div>
        <div className="bg-green-100 p-3 rounded-md text-center text-green-700 font-semibold">
          Approved: {getStatusCount('Approved')}
        </div>
        <div className="bg-red-100 p-3 rounded-md text-center text-red-700 font-semibold">
          Rejected: {getStatusCount('Rejected')}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-orange-100 overflow-x-auto">
        <table className="min-w-full text-sm text-left table-fixed">
          <thead className="bg-orange-50 text-orange-600 uppercase text-xs">
            <tr>
              <th className="px-3 py-2 w-[90px]">Order ID</th>
              <th className="px-3 py-2 w-[100px]">Name</th>
              <th className="px-3 py-2 w-[110px]">Item</th>
              <th className="px-3 py-2 w-[70px]">Type</th>
              <th className="px-3 py-2 w-[120px]">Reason</th>
              <th className="px-3 py-2 w-[80px]">Status</th>
              <th className="px-3 py-2 w-[80px]">Date</th>
              <th className="px-3 py-2 w-[80px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {filteredRequests.map((req) => (
              <tr key={req.id} className="hover:bg-orange-50">
                <td className="px-3 py-2">{req.orderId}</td>
                <td className="px-3 py-2">{req.Name}</td>
                <td className="px-3 py-2 truncate">{req.item}</td>
                <td className="px-3 py-2">{req.type}</td>
                <td className="px-3 py-2 truncate">{req.reason}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : req.status === 'Approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-3 py-2">{req.date}</td>
                <td className="px-3 py-2 text-center">
                  <div className="flex justify-center gap-1">
                    <button title="Approve" className="text-green-600 hover:text-green-700">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button title="Reject" className="text-red-600 hover:text-red-700">
                      <XCircle className="h-4 w-4" />
                    </button>
                    <button title="View" className="text-orange-600 hover:text-orange-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundAndReturnManagement;
