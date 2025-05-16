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

interface CountryConfig {
  country_code: string;
  country_name: string;
  required_documents: Array<{
    type: string;
    name: string;
    required: boolean;
  }>;
  field_validations: {
    [key: string]: {
      pattern: string;
      message: string;
    };
  };
  bank_fields: string[];
  tax_fields: string[];
}

interface DocumentUpload {
  id: string;
  file: File | null;
  status: 'pending' | 'uploaded' | 'error';
  required: boolean;
  documentType: string;
  name: string;
}

interface BusinessDetails {
  gstin?: string;
  panNumber?: string;
  taxId?: string;
  vatNumber?: string;
  salesTaxNumber?: string;
}

interface BankDetails {
  accountNumber: string;
  bankName: string;
  bankBranch?: string;
  ifscCode?: string;
  swiftCode?: string;
  routingNumber?: string;
  iban?: string;
}

interface ValidationErrors {
  panNumber?: string;
  gstin?: string;
  taxId?: string;
  vatNumber?: string;
  salesTaxNumber?: string;
  accountNumber?: string;
  ifscCode?: string;
  swiftCode?: string;
  routingNumber?: string;
  iban?: string;
}

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const { user, accessToken, isMerchant } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [countryConfig, setCountryConfig] = useState<CountryConfig | null>(null);
  const [supportedCountries, setSupportedCountries] = useState<Array<{ code: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for validation errors
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Business details state
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    gstin: '',
    panNumber: '',
    taxId: '',
    vatNumber: '',
    salesTaxNumber: ''
  });

  // Bank details state
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountNumber: '',
    bankName: '',
    bankBranch: '',
    ifscCode: '',
    swiftCode: '',
    routingNumber: '',
    iban: ''
  });

  // Document upload states
  const [documents, setDocuments] = useState<{ [key: string]: DocumentUpload }>({});

  // Add this new function to check verification status
  const checkVerificationStatus = async () => {
    if (!user || !accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/merchants/verification-status`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verification status');
      }

      const data = await response.json();
      
      // Only redirect if documents are submitted and we're not already on the status page
      if (data.has_submitted_documents && !window.location.pathname.includes('/business/verification-status')) {
        navigate('/business/verification-pending');
        return;
      }

      // If we get here, user hasn't submitted documents yet
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking verification status:', error);
      setIsLoading(false);
    }
  };

  // Update the useEffect for authentication check
  useEffect(() => {
    if (!user || !isMerchant) {
      toast.error('You must be logged in as a merchant to access this page');
      navigate('/login');
    } else {
      checkVerificationStatus();
    }
  }, [user, isMerchant, navigate, accessToken]);

  // Fetch supported countries
  useEffect(() => {
    const fetchSupportedCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/merchants/supported-countries`);
        if (!response.ok) throw new Error('Failed to fetch supported countries');
        const data = await response.json();
        setSupportedCountries(data.countries);
      } catch (error) {
        console.error('Error fetching supported countries:', error);
        toast.error('Failed to load supported countries');
      }
    };

    fetchSupportedCountries();
  }, []);

  // Fetch country configuration when country changes
  useEffect(() => {
    const fetchCountryConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/merchants/country-config/${selectedCountry}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch country configuration');
        const config = await response.json();
        setCountryConfig(config);
        
        // Update document requirements
        const newDocuments: { [key: string]: DocumentUpload } = {};
        config.required_documents.forEach((doc: { type: string; name: string; required: boolean }) => {
          newDocuments[doc.type] = {
            id: doc.type,
            file: null,
            status: 'pending',
            required: doc.required,
            documentType: doc.type,
            name: doc.name
          };
        });
        
        setDocuments(newDocuments);
      } catch (error) {
        console.error('Error fetching country config:', error);
        toast.error('Failed to load country configuration');
      }
    };

    if (accessToken) {
      fetchCountryConfig();
    }
  }, [selectedCountry, accessToken]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    setValidationErrors({});
  };

  const handleFileChange = async (documentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !accessToken) {
      toast.error('Please log in to upload documents');
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
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size too large. Maximum size is 10MB.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', documents[documentId].documentType);
        formData.append('country_code', selectedCountry);

        const response = await fetch(`${API_BASE_URL}/api/merchant/documents/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to upload document');
        }

        const data = await response.json();

        setDocuments(prev => ({
          ...prev,
          [documentId]: {
            ...prev[documentId],
            file,
            status: 'uploaded'
          }
        }));

        toast.success('Document uploaded successfully');
      } catch (error) {
        console.error('Error uploading document:', error);
        setDocuments(prev => ({
          ...prev,
          [documentId]: {
            ...prev[documentId],
            file,
            status: 'error'
          }
        }));
        toast.error(error instanceof Error ? error.message : 'Failed to upload document');
      }
    }
  };

  const handleBusinessDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessDetails(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    if (!countryConfig) return;
    
    console.log(`Validating field ${name} with value:`, value);
    console.log('Current country config:', countryConfig);
    
    const errors = { ...validationErrors };
    const validations = countryConfig.field_validations;
    
    if (validations[name]) {
      const pattern = new RegExp(validations[name].pattern);
      if (!pattern.test(value) && value.trim() !== '') {
        errors[name as keyof ValidationErrors] = validations[name].message;
        console.log(`Validation failed for ${name}:`, validations[name].message);
      } else {
        delete errors[name as keyof ValidationErrors];
        console.log(`Validation passed for ${name}`);
      }
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !accessToken) {
      toast.error('Please log in to submit verification');
      return;
    }

    // Validate all required fields
    const errors: ValidationErrors = {};
    const requiredFields = {
      'IN': ['panNumber', 'gstin', 'ifscCode'],
      'GLOBAL': ['taxId', 'swiftCode']
    };

    console.log('Starting validation for country:', selectedCountry);
    console.log('Current business details:', businessDetails);
    console.log('Current bank details:', bankDetails);

    const countryRequiredFields = requiredFields[selectedCountry as keyof typeof requiredFields] || [];
    
    countryRequiredFields.forEach(field => {
      const value = businessDetails[field as keyof BusinessDetails] || 
                   bankDetails[field as keyof BankDetails];
      if (!value || value.trim() === '') {
        errors[field as keyof ValidationErrors] = `${field} is required`;
        console.log(`Validation error: ${field} is missing or empty`);
      }
    });

    if (Object.keys(errors).length > 0) {
      console.log('Validation errors found:', errors);
      setValidationErrors(errors);
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data according to the backend schema
      const profileData = {
        country_code: selectedCountry,
        // Business details
        pan_number: selectedCountry === 'IN' ? businessDetails.panNumber : '',
        gstin: selectedCountry === 'IN' ? businessDetails.gstin : '',
        tax_id: selectedCountry === 'GLOBAL' ? businessDetails.taxId : '',
        vat_number: selectedCountry === 'GLOBAL' ? businessDetails.vatNumber : '',
        sales_tax_number: selectedCountry === 'GLOBAL' ? businessDetails.salesTaxNumber : '',
        // Bank details
        bank_account_number: bankDetails.accountNumber,
        bank_name: bankDetails.bankName,
        bank_branch: bankDetails.bankBranch,
        bank_ifsc_code: selectedCountry === 'IN' ? bankDetails.ifscCode : '',
        bank_swift_code: selectedCountry === 'GLOBAL' ? bankDetails.swiftCode : '',
        bank_routing_number: selectedCountry === 'GLOBAL' ? bankDetails.routingNumber : '',
        bank_iban: selectedCountry === 'GLOBAL' ? bankDetails.iban : ''
      };

      console.log('Submitting profile data:', profileData);

      const profileResponse = await fetch(`${API_BASE_URL}/api/merchants/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        console.error('Profile update failed:', errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to update profile');
      }

      // Submit for verification
      console.log('Submitting for verification...');
      const verifyResponse = await fetch(`${API_BASE_URL}/api/merchants/profile/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        console.error('Verification submission failed:', errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to submit for verification');
      }

      console.log('Verification submitted successfully');
      toast.success('Verification submitted successfully');
      navigate('/business/verification-status');
    } catch (error) {
      console.error('Error in verification process:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldHelperText = (fieldName: string, countryCode: string) => {
    const helpers = {
      panNumber: {
        IN: "Enter your 10-character PAN number (e.g., ABCDE1234F)",
        GLOBAL: "Enter your tax identification number"
      },
      gstin: {
        IN: "Enter your 15-character GSTIN (e.g., 22AAAAA0000A1Z5)",
        GLOBAL: "Enter your GST/VAT number"
      },
      taxId: {
        IN: "Enter your tax identification number",
        GLOBAL: "Enter your tax ID (e.g., XX-XXXXXXX for EIN)"
      },
      ifscCode: {
        IN: "Enter your 11-character IFSC code (e.g., SBIN0001234)",
        GLOBAL: "Enter your bank's IFSC code"
      },
      swiftCode: {
        IN: "Enter your bank's SWIFT/BIC code",
        GLOBAL: "Enter your 8-11 character SWIFT/BIC code (e.g., SBINUS33)"
      },
      accountNumber: {
        IN: "Enter your bank account number",
        GLOBAL: "Enter your bank account number"
      },
      bankName: {
        IN: "Enter your bank's name",
        GLOBAL: "Enter your bank's name"
      }
    };
    return helpers[fieldName as keyof typeof helpers]?.[countryCode as keyof (typeof helpers)[keyof typeof helpers]] || "";
  };

  const getValidationErrorMessage = (fieldName: string, countryCode: string) => {
    const errorMessages = {
      panNumber: {
        IN: "Please enter a valid PAN number (e.g., ABCDE1234F)",
        GLOBAL: "Please enter a valid tax identification number"
      },
      gstin: {
        IN: "Please enter a valid GSTIN (e.g., 22AAAAA0000A1Z5)",
        GLOBAL: "Please enter a valid GST/VAT number"
      },
      taxId: {
        IN: "Please enter a valid tax identification number",
        GLOBAL: "Please enter a valid tax ID (e.g., XX-XXXXXXX for EIN)"
      },
      ifscCode: {
        IN: "Please enter a valid IFSC code (e.g., SBIN0001234)",
        GLOBAL: "Please enter a valid IFSC code"
      },
      swiftCode: {
        IN: "Please enter a valid SWIFT/BIC code",
        GLOBAL: "Please enter a valid SWIFT/BIC code (e.g., SBINUS33)"
      },
      accountNumber: {
        IN: "Please enter a valid account number",
        GLOBAL: "Please enter a valid account number"
      },
      bankName: {
        IN: "Please enter a valid bank name",
        GLOBAL: "Please enter a valid bank name"
      }
    };
    return errorMessages[fieldName as keyof typeof errorMessages]?.[countryCode as keyof (typeof errorMessages)[keyof typeof errorMessages]] || "Invalid input";
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
          <div className="mt-4 text-gray-500">Loading verification form...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Merchant Verification</h1>
        <p className="mt-2 text-lg text-gray-600">
          Please upload the required documents to verify your business and start selling.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          {/* Country Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Select Your Country
            </h2>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {supportedCountries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Business Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Business Details
            </h2>
            
            <div className="space-y-6">
              {selectedCountry === 'IN' ? (
                <>
                  {/* Indian Business Fields */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      value={businessDetails.panNumber}
                      onChange={handleBusinessDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.panNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., ABCDE1234F"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {getFieldHelperText('panNumber', selectedCountry)}
                    </p>
                    {validationErrors.panNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {getValidationErrorMessage('panNumber', selectedCountry)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      GSTIN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="gstin"
                      value={businessDetails.gstin}
                      onChange={handleBusinessDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.gstin ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 22AAAAA0000A1Z5"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {getFieldHelperText('gstin', selectedCountry)}
                    </p>
                    {validationErrors.gstin && (
                      <p className="mt-1 text-sm text-red-600">
                        {getValidationErrorMessage('gstin', selectedCountry)}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Global Business Fields */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Tax ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={businessDetails.taxId}
                      onChange={handleBusinessDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.taxId ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., XX-XXXXXXX"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {getFieldHelperText('taxId', selectedCountry)}
                    </p>
                    {validationErrors.taxId && (
                      <p className="mt-1 text-sm text-red-600">
                        {getValidationErrorMessage('taxId', selectedCountry)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      VAT Number
                    </label>
                    <input
                      type="text"
                      name="vatNumber"
                      value={businessDetails.vatNumber}
                      onChange={handleBusinessDetailsChange}
                      className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Sales Tax Number
                    </label>
                    <input
                      type="text"
                      name="salesTaxNumber"
                      value={businessDetails.salesTaxNumber}
                      onChange={handleBusinessDetailsChange}
                      className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:ring-primary-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Bank Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={handleBankDetailsChange}
                  className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                    validationErrors.accountNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {getFieldHelperText('accountNumber', selectedCountry)}
                </p>
                {validationErrors.accountNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {getValidationErrorMessage('accountNumber', selectedCountry)}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleBankDetailsChange}
                  className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:ring-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {getFieldHelperText('bankName', selectedCountry)}
                </p>
              </div>

              {selectedCountry === 'IN' ? (
                <>
                  {/* Indian Bank Fields */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={bankDetails.ifscCode}
                      onChange={handleBankDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.ifscCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., SBIN0001234"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {getFieldHelperText('ifscCode', selectedCountry)}
                    </p>
                    {validationErrors.ifscCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {getValidationErrorMessage('ifscCode', selectedCountry)}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Global Bank Fields */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      SWIFT/BIC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="swiftCode"
                      value={bankDetails.swiftCode}
                      onChange={handleBankDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.swiftCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., SBINUS33"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {getFieldHelperText('swiftCode', selectedCountry)}
                    </p>
                    {validationErrors.swiftCode && (
                      <p className="mt-1 text-sm text-red-600">
                        {getValidationErrorMessage('swiftCode', selectedCountry)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      name="routingNumber"
                      value={bankDetails.routingNumber}
                      onChange={handleBankDetailsChange}
                      className={`block w-full max-w-md rounded-md shadow-sm focus:ring-primary-500 ${
                        validationErrors.routingNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 123456789"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your bank's routing number (if applicable)
                    </p>
                    {validationErrors.routingNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        Please enter a valid routing number
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Required Documents
            </h2>
            
            <div className="space-y-6">
              {Object.entries(documents).map(([id, doc]) => (
                <div key={id} className="bg-white p-4 rounded-lg shadow">
                  <label className="block mb-2 font-medium text-gray-700">
                    {doc.name}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  <div className="flex items-center">
                    <label className={`
                      flex justify-center items-center px-4 py-2 border-2 rounded-md 
                      ${doc.status === 'uploaded' ? 'border-green-300 bg-green-50' : 
                        doc.status === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                      hover:bg-gray-50 cursor-pointer w-full max-w-xs
                    `}>
                      {doc.status === 'uploaded' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          {doc.file?.name || 'File uploaded'}
                        </span>
                      ) : doc.status === 'error' ? (
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
                        onChange={(e) => handleFileChange(id, e)}
                      />
                    </label>
                  </div>
                  {doc.status === 'error' && (
                    <p className="mt-1 text-sm text-red-600">
                      Please try uploading again
                    </p>
                  )}
                </div>
              ))}
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
