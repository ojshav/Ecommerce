import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Check, 
  X, 
  Info,
  AlertCircle
} from 'lucide-react';

// Mock data - replace with actual API call
const mockMerchants = [
  {
    id: 1,
    name: "Tech Gadgets Inc",
    email: "contact@techgadgets.com",
    phone: "555-123-4567",
    status: "pending",
    category: "Electronics",
    dateApplied: "2025-04-28",
    description: "Selling the latest tech gadgets and accessories",
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identityProof: true
    }
  },
  {
    id: 2,
    name: "Fashion Forward",
    email: "info@fashionforward.com",
    phone: "555-987-6543",
    status: "approved",
    category: "Clothing",
    dateApplied: "2025-04-22",
    description: "Trendy clothing and accessories for all",
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identityProof: true
    }
  },
  {
    id: 3,
    name: "Home Essentials",
    email: "support@homeessentials.com",
    phone: "555-456-7890",
    status: "rejected",
    category: "Home & Garden",
    dateApplied: "2025-04-25",
    description: "Quality products for your home",
    rejectionReason: "Incomplete documentation",
    documents: {
      businessLicense: true,
      taxCertificate: false,
      identityProof: true
    }
  },
  {
    id: 4,
    name: "Organic Foods Co",
    email: "hello@organicfoods.com",
    phone: "555-222-3333",
    status: "pending",
    category: "Food & Beverage",
    dateApplied: "2025-05-01",
    description: "Organic and sustainably sourced food products",
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identityProof: false
    }
  },
  {
    id: 5,
    name: "Fitness Gear Pro",
    email: "sales@fitnessgear.com",
    phone: "555-444-5555",
    status: "pending",
    category: "Sports & Fitness",
    dateApplied: "2025-04-30",
    description: "Professional fitness equipment and accessories",
    documents: {
      businessLicense: true,
      taxCertificate: true,
      identityProof: true
    }
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-800";

  if (status === "approved") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "rejected") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  } else if (status === "pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Document verification badge
const DocumentBadge = ({ verified }: { verified: boolean }) => {
  return verified ? (
    <span className="inline-flex items-center text-green-500">
      <Check size={16} className="mr-1" />
      <span className="text-xs">Verified</span>
    </span>
  ) : (
    <span className="inline-flex items-center text-red-500">
      <X size={16} className="mr-1" />
      <span className="text-xs">Missing</span>
    </span>
  );
};

// Main component
const MerchantManagement: React.FC = () => {
  const [merchants, setMerchants] = useState(mockMerchants);
  const [filteredMerchants, setFilteredMerchants] = useState(merchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedMerchant, setExpandedMerchant] = useState<number | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter merchants based on search and status
  useEffect(() => {
    let results = merchants;
    
    if (searchTerm) {
      results = results.filter(merchant => 
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      results = results.filter(merchant => merchant.status === statusFilter);
    }
    
    setFilteredMerchants(results);
  }, [merchants, searchTerm, statusFilter]);

  // Handle merchant approval
  const handleApprove = (id: number) => {
    const updatedMerchants = merchants.map(merchant => 
      merchant.id === id ? { ...merchant, status: "approved" } : merchant
    );
    setMerchants(updatedMerchants);
    setShowApprovalModal(false);
    setSelectedMerchant(null);
  };

  // Handle merchant rejection
  const handleReject = (id: number) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    
    const updatedMerchants = merchants.map(merchant => 
      merchant.id === id ? { ...merchant, status: "rejected", rejectionReason } : merchant
    );
    setMerchants(updatedMerchants);
    setShowRejectionModal(false);
    setRejectionReason("");
    setSelectedMerchant(null);
  };

  // Toggle merchant details
  const toggleMerchantDetails = (id: number) => {
    setExpandedMerchant(expandedMerchant === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Merchant Management</h1>
      
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search merchants by name, email, or category"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <div className="relative inline-flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Merchants list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading merchants...</p>
          </div>
        </div>
      ) : filteredMerchants.length === 0 ? (
        <div className="bg-gray-50 rounded-md p-8 text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No merchants found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMerchants.map((merchant) => (
                <React.Fragment key={merchant.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{merchant.name}</div>
                          <div className="text-sm text-gray-500">{merchant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{merchant.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{merchant.dateApplied}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={merchant.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleMerchantDetails(merchant.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          {expandedMerchant === merchant.id ? (
                            <>
                              <span>Hide Details</span>
                              <ChevronUp size={16} className="ml-1" />
                            </>
                          ) : (
                            <>
                              <span>View Details</span>
                              <ChevronDown size={16} className="ml-1" />
                            </>
                          )}
                        </button>
                        {merchant.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedMerchant(merchant);
                                setShowApprovalModal(true);
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMerchant(merchant);
                                setShowRejectionModal(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded merchant details */}
                  {expandedMerchant === merchant.id && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-3">Merchant Details</h4>
                            <div className="space-y-2">
                              <p><span className="font-medium">Phone:</span> {merchant.phone}</p>
                              <p><span className="font-medium">Description:</span> {merchant.description}</p>
                              {merchant.status === "rejected" && (
                                <p className="text-red-600"><span className="font-medium">Rejection Reason:</span> {merchant.rejectionReason}</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-3">Document Verification</h4>
                            <div className="space-y-2">
                              <p className="flex justify-between">
                                <span className="font-medium">Business License:</span>
                                <DocumentBadge verified={merchant.documents.businessLicense} />
                              </p>
                              <p className="flex justify-between">
                                <span className="font-medium">Tax Certificate:</span>
                                <DocumentBadge verified={merchant.documents.taxCertificate} />
                              </p>
                              <p className="flex justify-between">
                                <span className="font-medium">Identity Proof:</span>
                                <DocumentBadge verified={merchant.documents.identityProof} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Approval Modal */}
      {showApprovalModal && selectedMerchant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center text-green-500 mb-4">
              <Check size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Approve Merchant</h3>
            </div>
            <p className="mb-6">
              Are you sure you want to approve <span className="font-semibold">{selectedMerchant.name}</span> as a merchant on your platform?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setSelectedMerchant(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(selectedMerchant.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Rejection Modal */}
      {showRejectionModal && selectedMerchant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center text-red-500 mb-4">
              <X size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Reject Merchant</h3>
            </div>
            <p className="mb-4">
              Please provide a reason for rejecting <span className="font-semibold">{selectedMerchant.name}</span>:
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
            ></textarea>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason("");
                  setSelectedMerchant(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedMerchant.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-blue-700">Pending Applications</h4>
            <span className="text-xl font-bold text-blue-700">
              {merchants.filter(m => m.status === "pending").length}
            </span>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-green-700">Approved Merchants</h4>
            <span className="text-xl font-bold text-green-700">
              {merchants.filter(m => m.status === "approved").length}
            </span>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-red-700">Rejected Applications</h4>
            <span className="text-xl font-bold text-red-700">
              {merchants.filter(m => m.status === "rejected").length}
            </span>
          </div>
        </div>
      </div>
      
      {/* Help Info */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg flex items-start">
        <Info size={20} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-700 mb-1">Managing Merchants</h4>
          <p className="text-sm text-blue-600">
            Review merchant applications thoroughly before approval. Check all verification documents 
            and ensure they meet platform requirements. When rejecting an application, provide a clear 
            and specific reason to help merchants understand what they need to correct.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerchantManagement;