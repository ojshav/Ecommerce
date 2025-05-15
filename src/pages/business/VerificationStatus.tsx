import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  DocumentIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const statusColors = {
  approved: 'text-green-700 bg-green-50 border-green-300',
  rejected: 'text-red-700 bg-red-50 border-red-300',
  pending: 'text-yellow-700 bg-yellow-50 border-yellow-300'
};

const statusIcons = {
  approved: <CheckCircleIcon className="h-5 w-5 text-green-600" />,
  rejected: <XCircleIcon className="h-5 w-5 text-red-600" />,
  pending: <ClockIcon className="h-5 w-5 text-yellow-600" />
};

interface Document {
  id: string;
  documentType: string;
  displayName: string;
  status: 'approved' | 'rejected' | 'pending';
  rejectionReason?: string;
  uploadDate: string;
  reviewDate?: string;
}

const VerificationStatus: React.FC = () => {
  const navigate = useNavigate();
  const { user, isMerchant } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [overallStatus, setOverallStatus] = useState<'approved' | 'rejected' | 'pending'>('pending');
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);

  // Mock data for documents
  const mockDocuments: Document[] = [
    {
      id: '1',
      documentType: 'business_registration',
      displayName: 'Business Registration Certificate',
      status: 'approved',
      uploadDate: '2025-05-01T10:30:00Z',
      reviewDate: '2025-05-02T14:45:00Z'
    },
    {
      id: '2',
      documentType: 'pan_card',
      displayName: 'PAN Card',
      status: 'rejected',
      rejectionReason: 'Document is not clearly visible. Please upload a higher quality scan.',
      uploadDate: '2025-05-01T10:32:00Z',
      reviewDate: '2025-05-02T14:50:00Z'
    },
    {
      id: '3',
      documentType: 'gstin',
      displayName: 'GSTIN Certificate',
      status: 'pending',
      uploadDate: '2025-05-01T10:35:00Z'
    },
    {
      id: '4',
      documentType: 'address_proof',
      displayName: 'Address Proof',
      status: 'approved',
      uploadDate: '2025-05-01T10:38:00Z',
      reviewDate: '2025-05-02T15:00:00Z'
    }
  ];

  useEffect(() => {
    if (!user || !isMerchant) {
      toast.error('You must be logged in as a merchant to access this page');
      navigate('/login');
    } else {
      loadMockData();
    }
  }, [user, isMerchant, navigate]);

  const loadMockData = () => {
    // Simulate API loading delay
    setIsLoading(true);
    setTimeout(() => {
      setDocuments(mockDocuments);
      
      // Determine overall status based on documents
      const hasRejected = mockDocuments.some(doc => doc.status === 'rejected');
      const hasPending = mockDocuments.some(doc => doc.status === 'pending');
      
      if (hasRejected) {
        setOverallStatus('rejected');
        setRejectionReason('One or more documents were rejected. Please review and resubmit.');
      } else if (hasPending) {
        setOverallStatus('pending');
        setRejectionReason(null);
      } else {
        setOverallStatus('approved');
        setRejectionReason(null);
      }
      
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading time
  };

  const handleReapply = (documentId: string) => {
    // Navigate to verification page with the specific document to reupload
    navigate(`/business/verification?reupload=${documentId}`);
  };

  const handleReapplyAll = () => {
    // Navigate to verification page to resubmit all documents
    navigate('/business/verification?reupload=all');
  };

  // Document type mapping for better display
  const documentTypeMap: {[key: string]: string} = {
    business_registration: 'Business Registration Certificate',
    pan_card: 'PAN Card',
    gstin: 'GSTIN Certificate',
    identity_proof: 'Identity Proof',
    address_proof: 'Address Proof',
    cancelled_cheque: 'Cancelled Cheque',
    gst_certificate: 'GST Certificate',
    msme_certificate: 'MSME Certificate',
    digital_signature: 'Digital Signature Certificate',
    return_policy: 'Return Policy Document',
    shipping_details: 'Shipping Details'
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
          <div className="mt-4 text-gray-500">Loading verification status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Verification Status</h1>
        <p className="mt-2 text-lg text-gray-600">
          Track the status of your merchant verification
        </p>
      </div>

      {/* Overall Status Card */}
      <div className={`mb-8 p-6 rounded-lg border ${statusColors[overallStatus]}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4">
              {statusIcons[overallStatus]}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {overallStatus === 'approved' && 'Verification Approved'}
                {overallStatus === 'rejected' && 'Verification Rejected'}
                {overallStatus === 'pending' && 'Verification Pending'}
              </h2>
              <p className="mt-1">
                {overallStatus === 'approved' && 'Congratulations! Your merchant account has been verified. You can now start selling on our platform.'}
                {overallStatus === 'rejected' && 'Your verification has been rejected. Please review the reasons below and resubmit.'}
                {overallStatus === 'pending' && 'Your verification is under review. This process usually takes 24-48 hours.'}
              </p>
              {rejectionReason && overallStatus === 'rejected' && (
                <div className="mt-3 p-3 bg-white/50 rounded border border-red-200">
                  <p className="font-medium">Reason for rejection:</p>
                  <p>{rejectionReason}</p>
                </div>
              )}
            </div>
          </div>
          
          {overallStatus === 'rejected' && (
            <button
              onClick={handleReapplyAll}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Reapply
            </button>
          )}
        </div>
      </div>

      {/* Document Status Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Document Verification Status</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason (If Rejected)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="font-medium text-gray-900">
                          {doc.displayName || documentTypeMap[doc.documentType] || doc.documentType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                        doc.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {statusIcons[doc.status]}
                        <span className="ml-1 capitalize">{doc.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {doc.status === 'rejected' && doc.rejectionReason ? (
                        <div className="text-sm text-gray-900">
                          {doc.rejectionReason}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          {doc.status === 'approved' ? 'No issues found' : '-'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doc.status === 'rejected' && (
                        <button
                          onClick={() => handleReapply(doc.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <ArrowPathIcon className="h-4 w-4 mr-1" />
                          Reupload
                        </button>
                      )}
                      {doc.status === 'approved' && (
                        <span className="text-sm text-gray-500">No action needed</span>
                      )}
                      {doc.status === 'pending' && (
                        <span className="text-sm text-gray-500">Under review</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center py-6">
                      <ExclamationTriangleIcon className="h-12 w-12 text-yellow-400 mb-3" />
                      <p>No documents found in your application.</p>
                      <button 
                        onClick={() => navigate('/business/verification')}
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                      >
                        Start Verification
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Last updated: {new Date().toLocaleString()}
            </div>
            <button 
              onClick={loadMockData}
              className="flex items-center text-primary-600 hover:text-primary-800"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Refresh Status
            </button>
          </div>
        </div>
      </div>

      {/* Next Steps or Additional Info */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
        
        {overallStatus === 'approved' && (
          <div className="space-y-3">
            <p className="text-green-700">Your merchant account is now verified! You can:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>Set up your store profile</li>
              <li>Add products to your inventory</li>
              <li>Configure shipping options</li>
              <li>Start selling on our marketplace</li>
            </ul>
            <div className="pt-3">
              <button
                onClick={() => navigate('/merchant/dashboard')}
                className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Go to Merchant Dashboard
              </button>
            </div>
          </div>
        )}
        
        {overallStatus === 'rejected' && (
          <div className="space-y-3">
            <p className="text-red-700">Your verification was rejected. To proceed:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>Review the rejection reasons for each document</li>
              <li>Prepare the correct documents addressing the issues</li>
              <li>Resubmit your application</li>
            </ul>
            <div className="pt-3">
              <button
                onClick={handleReapplyAll}
                className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Reapply for Verification
              </button>
            </div>
          </div>
        )}
        
        {overallStatus === 'pending' && (
          <div className="space-y-3">
            <p className="text-yellow-700">Your verification is currently under review. Please note:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>The review process typically takes 24-48 hours</li>
              <li>You'll receive an email notification once the review is complete</li>
              <li>You can check back here anytime to see the status</li>
            </ul>
            <div className="pt-3">
              <p className="text-sm text-gray-500">
                For urgent inquiries, please contact our merchant support team at support@example.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus;