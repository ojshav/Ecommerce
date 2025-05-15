import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Document {
  id: number;
  document_type: string;
  file_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  status: string;
  admin_notes?: string;
  verified_at?: string;
}

interface Merchant {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  category: string;
  dateApplied: string;
  description: string;
  rejectionReason?: string;
  country_code: string;
  pan_number?: string;
  gstin?: string;
  tax_id?: string;
  vat_number?: string;
  sales_tax_number?: string;
  bank_account_number: string;
  bank_name?: string;
  bank_branch?: string;
  bank_ifsc_code?: string;
  bank_swift_code?: string;
  bank_routing_number?: string;
  bank_iban?: string;
  documents: Document[];
}

// Document type mapping - matches the document types in document_route.py
const documentTypeMapping: { [key: string]: string } = {
  'BUSINESS_REGISTRATION_IN': 'Business Registration (India)',
  'BUSINESS_REGISTRATION_GLOBAL': 'Business Registration (Global)',
  'PAN_CARD': 'PAN Card',
  'GSTIN': 'GSTIN Certificate',
  'AADHAR': 'Aadhar Card',
  'BUSINESS_ADDRESS_PROOF_IN': 'Business Address Proof (India)',
  'BUSINESS_ADDRESS_PROOF_GLOBAL': 'Business Address Proof (Global)',
  'CANCELLED_CHEQUE': 'Cancelled Cheque',
  'BANK_ACCOUNT_IN': 'Bank Account Details (India)',
  'BANK_ACCOUNT_GLOBAL': 'Bank Account Details (Global)',
  'GST_CERTIFICATE': 'GST Certificate',
  'MSME_CERTIFICATE': 'MSME Certificate',
  'DSC': 'Digital Signature Certificate',
  'TAX_ID_GLOBAL': 'Tax ID (Global)',
  'SALES_TAX_REG': 'Sales Tax Registration',
  'PASSPORT': 'Passport',
  'SALES_TAX_PERMIT': 'Sales Tax Permit',
  'SMALL_BUSINESS_CERT': 'Small Business Certificate',
  'ESIGN_CERTIFICATE': 'E-Sign Certificate',
  'RETURN_POLICY': 'Return Policy',
  'SHIPPING_DETAILS': 'Shipping Details'
};

// Document key mapping (reverse of above)
const documentKeyMapping: { [key: string]: string } = {
  'Business Registration': 'BUSINESS_REGISTRATION_IN',
  'PAN Card': 'PAN_CARD',
  'GSTIN Certificate': 'GSTIN',
  'Identity Proof': 'AADHAR',
  'Address Proof': 'BUSINESS_ADDRESS_PROOF_IN',
  'Cancelled Cheque': 'CANCELLED_CHEQUE',
  'GST Certificate': 'GST_CERTIFICATE',
  'MSME Certificate': 'MSME_CERTIFICATE',
  'Digital Signature': 'DSC',
  'Return Policy': 'RETURN_POLICY',
  'Shipping Details': 'SHIPPING_DETAILS'
};

const DocumentViewer: React.FC<{
  documents: Document[];
  onClose: () => void;
  initialDocKey: string;
  onApprove: (documentId: number) => Promise<void>;
  onReject: (documentId: number, reason: string) => Promise<void>;
  isActionLoading: boolean;
}> = ({ documents, onClose, initialDocKey, onApprove, onReject, isActionLoading }) => {
  const [currentDocKey, setCurrentDocKey] = useState(initialDocKey);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const documentKeys = documents.map(doc => doc.id.toString());
  const currentIndex = documentKeys.indexOf(currentDocKey);
  
  const goToNext = () => {
    if (currentIndex < documentKeys.length - 1) {
      setCurrentDocKey(documentKeys[currentIndex + 1]);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentDocKey(documentKeys[currentIndex - 1]);
    }
  };
  
  const currentDoc = documents.find(doc => doc.id.toString() === currentDocKey);
  const documentId = currentDoc?.id;
  const documentStatus = currentDoc?.status.toLowerCase() || '';
  
  const handleApprove = () => {
    if (documentId) {
      onApprove(documentId);
    }
  };
  
  const handleReject = () => {
    if (documentId && rejectionReason.trim()) {
      onReject(documentId, rejectionReason);
      setShowRejectModal(false);
      setRejectionReason('');
    }
  };
  
  // Pre-fill rejection reason if document is already rejected and has admin notes
  useEffect(() => {
    if (documentStatus === 'rejected' && currentDoc?.admin_notes && showRejectModal) {
      setRejectionReason(currentDoc.admin_notes);
    } else if (showRejectModal) {
      setRejectionReason('');
    }
  }, [showRejectModal, documentStatus, currentDoc?.admin_notes]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-auto max-h-screen flex flex-col">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold truncate">
              {currentDoc?.document_type ? documentTypeMapping[currentDoc.document_type] : currentDoc?.document_type}
            </h3>
            <div className="text-sm text-gray-500">
              Status: <span className={`font-medium ${documentStatus === 'approved' ? 'text-green-600' : documentStatus === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                {documentStatus.charAt(0).toUpperCase() + documentStatus.slice(1)}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-2 sm:p-4 flex-1 overflow-auto flex items-center justify-center bg-gray-100">
          {currentDoc?.file_url ? (
            <img 
              src={currentDoc.file_url} 
              alt={currentDoc.document_type}
              className="max-w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="text-gray-500">No image available</div>
          )}
        </div>
        
        {/* Document details */}
        {currentDoc?.file_name && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">File name:</div>
              <div className="font-medium">{currentDoc.file_name}</div>
              
              {currentDoc.file_size && (
                <>
                  <div className="text-gray-600">File size:</div>
                  <div className="font-medium">{Math.round(currentDoc.file_size / 1024)} KB</div>
                </>
              )}
              
              {currentDoc.verified_at && (
                <>
                  <div className="text-gray-600">Verified at:</div>
                  <div className="font-medium">{new Date(currentDoc.verified_at).toLocaleString()}</div>
                </>
              )}
              
              {currentDoc.admin_notes && (
                <>
                  <div className="text-gray-600">Admin notes:</div>
                  <div className="font-medium text-red-600">{currentDoc.admin_notes}</div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Action buttons for all documents */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            {/* Show current status */}
            <div className="flex items-center">
              {documentStatus === 'approved' && (
                <div className="flex items-center text-green-600">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm font-medium">Approved</span>
                </div>
              )}
              {documentStatus === 'rejected' && (
                <div className="flex items-center text-red-600">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">Rejected</span>
                </div>
              )}
              {documentStatus === 'pending' && (
                <div className="flex items-center text-yellow-600">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm font-medium">Pending</span>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={isActionLoading}
                className={`px-4 py-2 ${documentStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'} rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {documentStatus === 'rejected' ? 'Update Rejection' : 'Reject Document'}
              </button>
              <button
                onClick={handleApprove}
                disabled={isActionLoading}
                className={`px-4 py-2 ${documentStatus === 'approved' ? 'bg-green-700' : 'bg-green-600'} text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {documentStatus === 'approved' ? 'Re-Approve' : 'Approve Document'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 sm:p-4 border-t">
          <button 
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`flex items-center ${currentIndex === 0 ? 'text-gray-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <ChevronLeft size={20} />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <span className="text-gray-600 text-sm sm:text-base">{currentIndex + 1} of {documentKeys.length}</span>
          
          <button 
            onClick={goToNext}
            disabled={currentIndex === documentKeys.length - 1}
            className={`flex items-center ${currentIndex === documentKeys.length - 1 ? 'text-gray-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center text-red-500 mb-4">
              <X size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Reject Document</h3>
            </div>
            <p className="mb-4">
              Please provide a reason for rejecting this document:
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
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || isActionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MerchantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDocumentActionLoading, setIsDocumentActionLoading] = useState(false);

  // Fetch merchant details from API to ensure we get all data including bank details
  const fetchMerchantDetails = async (merchantId: string): Promise<Merchant | null> => {
    if (!accessToken) {
      toast.error('You must be logged in to view merchant details');
      navigate('/login');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      console.log(`Fetching merchant details from: ${baseUrl}/api/admin/merchants/${merchantId}`);
      
      const response = await fetch(`${baseUrl}/api/admin/merchants/${merchantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        toast.error('Merchant details not found. Redirecting to merchant list.');
        navigate('/superadmin/merchant-management');
        return null;
      }

      const data = await response.json();
      console.log('Fetched merchant data from API:', data);
      
      return {
        ...data,
        name: data.business_name,
        email: data.business_email,
        phone: data.business_phone,
        description: data.business_description,
        status: data.verification_status,
        dateApplied: data.created_at,
        country_code: data.country_code,
        pan_number: data.pan_number,
        gstin: data.gstin,
        tax_id: data.tax_id,
        vat_number: data.vat_number,
        sales_tax_number: data.sales_tax_number,
        bank_account_number: data.bank_account_number,
        bank_name: data.bank_name,
        bank_branch: data.bank_branch,
        bank_ifsc_code: data.bank_ifsc_code,
        bank_swift_code: data.bank_swift_code,
        bank_routing_number: data.bank_routing_number,
        bank_iban: data.bank_iban
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch merchant details';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch merchant documents using the document API endpoint
  const fetchMerchantDocuments = async (merchantId: string) => {
    if (!accessToken) {
      return [];
    }

    try {
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      
      const response = await fetch(`${baseUrl}/api/merchant/documents?merchant_id=${merchantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch merchant documents: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched documents:', data.documents);
      return data.documents;
    } catch (error: unknown) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch merchant documents');
      return [];
    }
  };

  // Transform API document data to the format expected by the UI
  const transformDocuments = (apiDocuments: any[]) => {
    // Initialize with all possible document types from Verification.tsx
    const documents: Document[] = [];

    // Update with actual document data
    apiDocuments.forEach(doc => {
      const docType = documentTypeMapping[doc.document_type] || doc.document_type;
      
      documents.push({
        id: doc.id,
        document_type: docType,
        file_url: doc.file_url,
        file_name: doc.file_name,
        file_size: doc.file_size,
        mime_type: doc.mime_type,
        status: doc.status,
        admin_notes: doc.admin_notes,
        verified_at: doc.verified_at
      });
    });

    return documents;
  };

  useEffect(() => {
    const loadMerchantData = async () => {
      if (!id) return;

      // Check if user is authenticated and has admin role
      if (!user || !['admin', 'superadmin'].includes(user.role)) {
        toast.error('You must be logged in as an admin to view merchant details');
        navigate('/login');
        return;
      }

      setIsLoading(true);
      try {
        // Always fetch from API to get the complete merchant data including bank details
        const merchantData = await fetchMerchantDetails(id);
        if (!merchantData) return;

        // Fetch documents directly from the document API
        const documentsData = await fetchMerchantDocuments(id);
        const transformedDocuments = transformDocuments(documentsData);

        // Combine merchant data with documents
        setMerchant({
          ...merchantData,
          documents: transformedDocuments
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load merchant data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadMerchantData();
  }, [id, accessToken, user, navigate]);

  const openDocumentViewer = (docKey: string) => {
    setViewingDocument(docKey);
  };

  const closeDocumentViewer = () => {
    setViewingDocument(null);
  };

  // Approve a document using the document API endpoint
  const approveDocument = async (documentId: number) => {
    if (!accessToken) return;
    
    try {
      setIsDocumentActionLoading(true);
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      
      const response = await fetch(`${baseUrl}/api/merchant/documents/${documentId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: null })
      });

      if (!response.ok) {
        throw new Error(`Failed to approve document: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success(data.message);
      
      // Refresh merchant documents
      if (id) {
        const documentsData = await fetchMerchantDocuments(id);
        if (merchant) {
          setMerchant({
            ...merchant,
            documents: documentsData
          });
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to approve document';
      toast.error(errorMessage);
    } finally {
      setIsDocumentActionLoading(false);
    }
  };

  // Reject a document using the document API endpoint
  const rejectDocument = async (documentId: number, reason: string) => {
    if (!accessToken || !reason.trim()) return;
    
    try {
      setIsDocumentActionLoading(true);
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      
      const response = await fetch(`${baseUrl}/api/merchant/documents/${documentId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: reason })
      });

      if (!response.ok) {
        throw new Error(`Failed to reject document: ${response.statusText}`);
      }

      const data = await response.json();
      toast.success(data.message);
      
      // Refresh merchant documents
      if (id) {
        const documentsData = await fetchMerchantDocuments(id);
        if (merchant) {
          setMerchant({
            ...merchant,
            documents: documentsData
          });
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reject document';
      toast.error(errorMessage);
    } finally {
      setIsDocumentActionLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading merchant data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-lg font-semibold text-gray-700">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-lg font-semibold text-gray-700">Merchant not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            <span>Back to Merchant List</span>
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">{merchant.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(merchant.status)}`}>
                {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
              </span>
              <span className="text-blue-100">{merchant.category}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Contact Information</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Email:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800 break-all">{merchant.email}</div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Phone:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.phone}</div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Date Applied:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.dateApplied}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Business Details */}
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Business Details</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      {merchant.country_code === 'IN' ? (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">PAN Number:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.pan_number || 'Not provided'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">GSTIN:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.gstin || 'Not provided'}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">Tax ID:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.tax_id || 'Not provided'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">VAT Number:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.vat_number || 'Not provided'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">Sales Tax Number:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.sales_tax_number || 'Not provided'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bank Details */}
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Bank Details</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Account Number:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                          {merchant.bank_account_number || 'Not provided'}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Bank Name:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                          {merchant.bank_name || 'Not provided'}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">Bank Branch:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                          {merchant.bank_branch || 'Not provided'}
                        </div>
                      </div>
                      {merchant.country_code === 'IN' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                          <div className="text-sm font-medium text-gray-500">IFSC Code:</div>
                          <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                            {merchant.bank_ifsc_code || 'Not provided'}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">SWIFT Code:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.bank_swift_code || 'Not provided'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">Routing Number:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.bank_routing_number || 'Not provided'}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                            <div className="text-sm font-medium text-gray-500">IBAN:</div>
                            <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">
                              {merchant.bank_iban || 'Not provided'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Business Description */}
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Business Description</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-sm text-gray-700">{merchant.description}</p>
                  </div>
                </div>
                
                {/* Documents */}
                <div className="bg-gray-50 rounded-lg shadow-sm">
                  <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">Documents</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                      {merchant.documents.map((doc) => (
                        <div 
                          key={doc.id} 
                          className={`flex items-center p-2 sm:p-3 rounded-md border ${
                            doc.status === 'APPROVED' ? 'border-green-200 bg-green-50' : 
                            doc.status === 'REJECTED' ? 'border-red-200 bg-red-50' : 
                            'border-gray-200 bg-gray-100'
                          }`}
                        >
                          <div className="mr-2 sm:mr-3">
                            {doc.status === 'APPROVED' ? (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                ✓
                              </div>
                            ) : doc.status === 'REJECTED' ? (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                ✗
                              </div>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                ○
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                              {documentTypeMapping[doc.document_type] || doc.document_type}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.status.charAt(0) + doc.status.slice(1).toLowerCase()}
                            </p>
                          </div>
                          {doc.file_url && (
                            <button
                              onClick={() => openDocumentViewer(doc.id.toString())}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              <FileText size={16} className="sm:size-18" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Rejection Reason */}
                {merchant.status === 'rejected' && merchant.rejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm">
                    <div className="border-b border-red-200 px-4 sm:px-6 py-3 sm:py-4">
                      <h2 className="text-base sm:text-lg font-semibold text-red-800">Rejection Reason</h2>
                    </div>
                    <div className="p-4 sm:p-6">
                      <p className="text-sm text-red-700">{merchant.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {viewingDocument && (
        <DocumentViewer 
          documents={merchant.documents} 
          onClose={closeDocumentViewer} 
          initialDocKey={viewingDocument}
          onApprove={approveDocument}
          onReject={rejectDocument}
          isActionLoading={isDocumentActionLoading}
        />
      )}
    </div>
  );
};

export default MerchantDetails;
