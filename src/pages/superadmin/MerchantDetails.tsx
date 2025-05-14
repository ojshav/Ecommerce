import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Document {
  type: string;
  submitted: boolean;
  imageUrl?: string;
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
  panNumber: string;
  gstin?: string;
  gtin?: string;
  bankAccountNumber: string;
  bankIfscCode: string;
  documents: {
    [key: string]: Document;
  };
}

// Mock data with document image URLs
const mockMerchants: Merchant[] = [
  {
    id: 1,
    name: "Tech Gadgets Inc",
    email: "contact@techgadgets.com",
    phone: "555-123-4567",
    status: "pending",
    category: "Electronics",
    dateApplied: "2025-04-28",
    description: "Selling the latest tech gadgets and accessories",
    panNumber: "ABCDE1234F",
    gstin: "22ABCDE1234F1Z5",
    gtin: "0123456789123",
    bankAccountNumber: "1234567890",
    bankIfscCode: "HDFC0001234",
    documents: {
      businessRegistration: {
        type: "Business Registration",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      panCard: {
        type: "PAN Card",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      gstin: {
        type: "GSTIN Certificate",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      identityProof: {
        type: "Identity Proof",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      addressProof: {
        type: "Address Proof",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      cancelledCheque: {
        type: "Cancelled Cheque",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      gstCertificate: {
        type: "GST Certificate",
        submitted: true,
        imageUrl: "/api/placeholder/800/600"
      },
      msmeCertificate: {
        type: "MSME Certificate",
        submitted: false
      },
      digitalSignatureCertificate: {
        type: "Digital Signature",
        submitted: false
      },
      returnPolicy: {
        type: "Return Policy",
        submitted: false
      },
      shippingDetails: {
        type: "Shipping Details",
        submitted: false
      },
    }
  },
  // add other merchants similarly...
];

const DocumentViewer: React.FC<{
  documents: {
    [key: string]: Document;
  };
  onClose: () => void;
  initialDocKey: string;
}> = ({ documents, onClose, initialDocKey }) => {
  const [currentDocKey, setCurrentDocKey] = useState(initialDocKey);
  const documentKeys = Object.keys(documents).filter(key => documents[key].submitted);
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
  
  const currentDoc = documents[currentDocKey];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-auto max-h-screen flex flex-col">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h3 className="text-lg sm:text-xl font-semibold truncate">{currentDoc.type}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-2 sm:p-4 flex-1 overflow-auto flex items-center justify-center bg-gray-100">
          {currentDoc.imageUrl ? (
            <img 
              src={currentDoc.imageUrl} 
              alt={currentDoc.type}
              className="max-w-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="text-gray-500">No image available</div>
          )}
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
    </div>
  );
};

const MerchantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const merchantId = Number(id);
    const found = mockMerchants.find(m => m.id === merchantId);
    setMerchant(found || null);
  }, [id]);

  const openDocumentViewer = (docKey: string) => {
    setViewingDocument(docKey);
  };

  const closeDocumentViewer = () => {
    setViewingDocument(null);
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">PAN Number:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.panNumber}</div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">GSTIN:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.gstin || 'Not provided'}</div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">GTIN:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.gtin || 'Not provided'}</div>
                      </div>
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
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.bankAccountNumber}</div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                        <div className="text-sm font-medium text-gray-500">IFSC Code:</div>
                        <div className="col-span-1 sm:col-span-2 text-sm text-gray-800">{merchant.bankIfscCode}</div>
                      </div>
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
                      {Object.entries(merchant.documents).map(([key, doc]) => (
                        <div 
                          key={key} 
                          className={`flex items-center p-2 sm:p-3 rounded-md border ${
                            doc.submitted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-100'
                          }`}
                        >
                          <div className="mr-2 sm:mr-3">
                            {doc.submitted ? (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                ✓
                              </div>
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                ✗
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{doc.type}</p>
                            <p className="text-xs text-gray-500">
                              {doc.submitted ? 'Submitted' : 'Missing'}
                            </p>
                          </div>
                          {doc.submitted && doc.imageUrl && (
                            <button
                              onClick={() => openDocumentViewer(key)}
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
        />
      )}
    </div>
  );
};

export default MerchantDetails;
