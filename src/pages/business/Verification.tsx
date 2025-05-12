import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  CloudArrowUpIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface DocumentUpload {
  id: string;
  file: File | null;
  status: 'pending' | 'uploaded' | 'error';
  required: boolean;
  documentType: string;
}

interface BusinessDetails {
  gstin: string;
  panNumber: string;
  gtin: string;
}

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const { user, accessToken, isMerchant } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noGstChecked, setNoGstChecked] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: ''
  });
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    gstin: '',
    panNumber: '',
    gtin: ''
  });

  // Redirect if not authenticated or not a merchant
  useEffect(() => {
    if (!user || !isMerchant) {
      toast.error('You must be logged in as a merchant to access this page');
      navigate('/login');
    }
  }, [user, isMerchant, navigate]);

  // Document upload states with document types
  const [documents, setDocuments] = useState<{ [key: string]: DocumentUpload }>({
    businessRegistration: {
      id: 'business_registration',
      file: null,
      status: 'pending',
      required: true,
      documentType: 'business_registration'
    },
    panCard: {
      id: 'panCard',
      file: null,
      status: 'pending',
      required: true,
      documentType: 'pan_card'
    },
    gstin: {
      id: 'gstin',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'gstin'
    },
    identityProof: {
      id: 'identityProof',
      file: null,
      status: 'pending',
      required: true,
      documentType: 'identity_proof'
    },
    addressProof: {
      id: 'addressProof',
      file: null,
      status: 'pending',
      required: true,
      documentType: 'address_proof'
    },
    cancelledCheque: {
      id: 'cancelledCheque', 
      file: null,
      status: 'pending',
      required: true,
      documentType: 'cancelled_cheque'
    },
    gstCertificate: {
      id: 'gstCertificate',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'gst_certificate'
    },
    msmeCertificate: {
      id: 'msmeCertificate',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'msme_certificate'
    },
    digitalSignatureCertificate: {
      id: 'digitalSignatureCertificate',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'digital_signature'
    },
    returnPolicy: {
      id: 'returnPolicy',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'return_policy'
    },
    shippingDetails: {
      id: 'shippingDetails',
      file: null,
      status: 'pending',
      required: false,
      documentType: 'shipping_details'
    }
  });

  const handleFileChange = async (documentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !accessToken) {
      toast.error('Please log in to upload documents');
      return;
    }

    // Validate token format
    const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    if (!tokenRegex.test(accessToken)) {
      toast.error('Invalid authentication token. Please log in again.');
      return;
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload PDF, JPEG, or PNG files only.');
        return;
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum size is 10MB.');
        return;
      }

      try {
        // Prepare FormData for upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', documents[documentId].documentType);

        // Ensure API_BASE_URL doesn't end with a slash
        const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
        const uploadUrl = `${baseUrl}/api/merchant/documents/upload`;

        // Upload document to backend
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            toast.error('Session expired. Please log in again.');
            return;
          }
          throw new Error(data.message || 'Failed to upload document');
        }

        // Update document state
        setDocuments(prev => ({
          ...prev,
          [documentId]: {
            ...prev[documentId],
            file,
            status: data.document.status === 'pending' ? 'uploaded' : data.document.status
          }
        }));

        toast.success('Document uploaded successfully');
      } catch (error: unknown) {
        console.error('Error uploading document:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload document';
        
        setDocuments(prev => ({
          ...prev,
          [documentId]: {
            ...prev[documentId],
            file,
            status: 'error'
          }
        }));
        
        toast.error(errorMessage);
      }
    }
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusinessDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNoGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoGstChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !accessToken) {
      toast.error('Please log in to submit verification');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if all required documents are uploaded
      const requiredDocsUploaded = Object.values(documents)
        .filter(doc => doc.required)
        .every(doc => doc.status === 'uploaded' || (doc.id === 'gstin' && noGstChecked));

      // Check if bank details are filled
      const bankDetailsFilled = bankDetails.accountNumber.trim() !== '' && 
                               bankDetails.ifscCode.trim() !== '';

      // Check if business details are filled
      const businessDetailsFilled = businessDetails.panNumber.trim() !== '' && 
                                  (businessDetails.gstin.trim() !== '' || noGstChecked);

      if (!requiredDocsUploaded || !bankDetailsFilled || !businessDetailsFilled) {
        toast.error('Please upload all required documents and fill in all required details');
        setIsSubmitting(false);
        return;
      }

      // Debug: Log the request data
      const requestData = {
        pan_number: businessDetails.panNumber,
        gstin: noGstChecked ? null : businessDetails.gstin,
        gtin: businessDetails.gtin || null,
        bank_account_number: bankDetails.accountNumber,
        bank_ifsc_code: bankDetails.ifscCode
      };
      console.log('Request Data:', requestData);

      // Submit business and bank details
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      const profileResponse = await fetch(`${baseUrl}/api/merchants/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const profileData = await profileResponse.json();
      console.log('Profile Response:', profileData);

      if (!profileResponse.ok) {
        console.error('Profile Update Error:', {
          status: profileResponse.status,
          statusText: profileResponse.statusText,
          data: profileData
        });
        throw new Error(profileData.error || profileData.message || 'Failed to submit business details');
      }

      // Submit for verification
      const verifyResponse = await fetch(`${baseUrl}/api/merchants/profile/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const verifyData = await verifyResponse.json();
      console.log('Verification Response:', verifyData);

      if (!verifyResponse.ok) {
        console.error('Verification Error:', {
          status: verifyResponse.status,
          statusText: verifyResponse.statusText,
          data: verifyData
        });
        throw new Error(verifyData.error || verifyData.message || 'Failed to submit for verification');
      }

      toast.success('Verification submitted successfully');
      navigate('/business/verification-pending');
    } catch (error: unknown) {
      console.error('Error submitting verification:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit verification';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Merchant Verification</h1>
        <p className="mt-2 text-lg text-gray-600">
          Please upload the required documents to verify your business and start selling.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your documents will be reviewed within 24–48 hours. We'll notify you upon verification.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Business Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              1. Business Details
            </h2>
            
            <div className="space-y-6">
              {/* PAN Number */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 PAN Number
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={businessDetails.panNumber}
                  onChange={handleBusinessDetailsChange}
                  placeholder="Enter PAN number"
                  className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  title="Please enter a valid PAN number (e.g., ABCDE1234F)"
                />
              </div>

              {/* GSTIN */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 GSTIN (If applicable)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="gstin"
                    value={businessDetails.gstin}
                    onChange={handleBusinessDetailsChange}
                    placeholder="Enter GSTIN"
                    className={`block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${
                      noGstChecked ? 'opacity-50' : ''
                    }`}
                    disabled={noGstChecked}
                    pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                    title="Please enter a valid GSTIN"
                  />
                  
                  <div className="flex items-center">
                    <input
                      id="noGstin"
                      type="checkbox"
                      checked={noGstChecked}
                      onChange={handleNoGstChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="noGstin" className="ml-2 block text-sm text-gray-700">
                      I don't have GSTIN — I will upload a declaration
                    </label>
                  </div>
                </div>
              </div>

              {/* GTIN */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 GTIN (Global Trade Item Number)
                </label>
                <input
                  type="text"
                  name="gtin"
                  value={businessDetails.gtin}
                  onChange={handleBusinessDetailsChange}
                  placeholder="Enter GTIN (optional)"
                  className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  pattern="[0-9]{8}|[0-9]{12,14}"
                  title="Please enter a valid GTIN (8, 12, 13, or 14 digits)"
                />
              </div>
            </div>
          </div>
          
          {/* Section 2: Business Verification Documents */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              2. Business Verification Documents
            </h2>
            
            <div className="space-y-6">
              {/* Business Registration Certificate */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Business Registration Certificate
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (e.g., GST Registration, Shop & Establishment Certificate, or Govt. License)
                </p>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.businessRegistration.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.businessRegistration.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.businessRegistration.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.businessRegistration.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.businessRegistration.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File (PDF/JPG/PNG)
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('businessRegistration', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* PAN Card */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 PAN Card (Business or Individual)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (Required for tax compliance)
                </p>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.panCard.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.panCard.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.panCard.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.panCard.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.panCard.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('panCard', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* GSTIN */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 GSTIN (If applicable)
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (Mandatory for selling taxable goods. Upload certificate or declaration if exempt)
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className={`
                      flex justify-center items-center px-4 py-2 border-2 rounded-md 
                      ${documents.gstin.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                        documents.gstin.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                      hover:bg-gray-50 cursor-pointer w-full max-w-xs
                      ${noGstChecked ? 'opacity-50 pointer-events-none' : ''}
                    `}>
                      {documents.gstin.status === 'uploaded' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          {documents.gstin.file?.name || 'File uploaded'}
                        </span>
                      ) : documents.gstin.status === 'error' ? (
                        <span className="flex items-center text-red-600">
                          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                          Upload failed
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-600">
                          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                          Upload File
                        </span>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('gstin', e)}
                        disabled={noGstChecked}
                      />
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="noGstin"
                      type="checkbox"
                      checked={noGstChecked}
                      onChange={handleNoGstChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="noGstin" className="ml-2 block text-sm text-gray-700">
                      I don't have GSTIN — I will upload a declaration
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Identity & Address Proof */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              3. Identity & Address Proof
            </h2>
            
            <div className="space-y-6">
              {/* Identity Proof */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Identity Proof of Owner
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (Aadhar Card / Voter ID / Passport / Driving License)
                </p>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.identityProof.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.identityProof.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.identityProof.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.identityProof.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.identityProof.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('identityProof', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Address Proof */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Address Proof of Business
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (Utility Bill / Rent Agreement / Property Papers)
                </p>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.addressProof.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.addressProof.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.addressProof.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.addressProof.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.addressProof.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('addressProof', e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 4: Bank Account Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              4. Bank Account Details
            </h2>
            
            <div className="space-y-6">
              {/* Cancelled Cheque */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Cancelled Cheque or Bank Passbook Copy
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  (To verify account name & number)
                </p>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.cancelledCheque.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.cancelledCheque.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.cancelledCheque.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.cancelledCheque.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.cancelledCheque.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('cancelledCheque', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Bank Details */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Bank Details
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={bankDetails.accountNumber}
                      onChange={handleBankDetailsChange}
                      placeholder="Enter bank account number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={bankDetails.ifscCode}
                      onChange={handleBankDetailsChange}
                      placeholder="Enter IFSC code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 5: Tax Compliance */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              5. Tax Compliance
            </h2>
            
            <div className="space-y-6">
              {/* GST Certificate */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 GST Certificate
                  {!noGstChecked && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.gstCertificate.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.gstCertificate.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                    ${noGstChecked ? 'opacity-50 pointer-events-none' : ''}
                  `}>
                    {documents.gstCertificate.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.gstCertificate.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.gstCertificate.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('gstCertificate', e)}
                      disabled={noGstChecked}
                    />
                  </label>
                </div>
              </div>
              
              {/* MSME Certificate */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 MSME Certificate (Optional)
                </label>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.msmeCertificate.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.msmeCertificate.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.msmeCertificate.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.msmeCertificate.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.msmeCertificate.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('msmeCertificate', e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 6: Other Optional Documents */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              6. Other Optional Documents
            </h2>
            
            <div className="space-y-6">
              {/* Digital Signature Certificate */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Digital Signature Certificate (Optional)
                </label>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.digitalSignatureCertificate.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.digitalSignatureCertificate.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.digitalSignatureCertificate.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.digitalSignatureCertificate.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.digitalSignatureCertificate.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('digitalSignatureCertificate', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Return/Refund Policy */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Return/Refund Policy Document (Optional)
                </label>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.returnPolicy.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.returnPolicy.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.returnPolicy.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.returnPolicy.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.returnPolicy.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('returnPolicy', e)}
                    />
                  </label>
                </div>
              </div>
              
              {/* Shipping Details */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  🔹 Shipping Details / Tie-ups (Optional)
                </label>
                
                <div className="flex items-center">
                  <label className={`
                    flex justify-center items-center px-4 py-2 border-2 rounded-md 
                    ${documents.shippingDetails.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                      documents.shippingDetails.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                    hover:bg-gray-50 cursor-pointer w-full max-w-xs
                  `}>
                    {documents.shippingDetails.status === 'uploaded' ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        {documents.shippingDetails.file?.name || 'File uploaded'}
                      </span>
                    ) : documents.shippingDetails.status === 'error' ? (
                      <span className="flex items-center text-red-600">
                        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                        Upload failed
                      </span>
                    ) : (
                      <span className="flex items-center text-gray-600">
                        <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                        Upload File
                      </span>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('shippingDetails', e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-8 py-3 rounded-md text-white font-semibold text-lg
                ${isSubmitting ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'}
                shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Verification'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
