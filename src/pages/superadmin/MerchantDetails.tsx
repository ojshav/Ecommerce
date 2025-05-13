import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

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
    [key: string]: boolean; // each document type has a boolean flag for "submitted"
  };
}

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
      businessRegistration: true,
      panCard: true,
      gstin: true,
      identityProof: true,
      addressProof: true,
      cancelledCheque: true,
      gstCertificate: true,
      msmeCertificate: false,
      digitalSignatureCertificate: false,
      returnPolicy: false,
      shippingDetails: false,
    }
  },
  // add other merchants similarly...
];

const MerchantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState<Merchant | null>(null);

  useEffect(() => {
    const merchantId = Number(id);
    const found = mockMerchants.find(m => m.id === merchantId);
    setMerchant(found || null);
  }, [id]);

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
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{merchant.name}</h1>

      <div className="space-y-4 text-gray-800">
        <p><strong>Email:</strong> {merchant.email}</p>
        <p><strong>Phone:</strong> {merchant.phone}</p>
        <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          merchant.status === 'approved' ? 'bg-green-100 text-green-800' :
          merchant.status === 'rejected' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {merchant.status.charAt(0).toUpperCase() + merchant.status.slice(1)}
        </span></p>
        <p><strong>Category:</strong> {merchant.category}</p>
        <p><strong>Date Applied:</strong> {merchant.dateApplied}</p>
        <p><strong>Description:</strong> {merchant.description}</p>

        <h2 className="text-xl font-semibold mt-6">Business Details</h2>
        <p><strong>PAN Number:</strong> {merchant.panNumber}</p>
        <p><strong>GSTIN:</strong> {merchant.gstin || 'Not provided'}</p>
        <p><strong>GTIN:</strong> {merchant.gtin || 'Not provided'}</p>

        <h2 className="text-xl font-semibold mt-6">Bank Details</h2>
        <p><strong>Account Number:</strong> {merchant.bankAccountNumber}</p>
        <p><strong>IFSC Code:</strong> {merchant.bankIfscCode}</p>

        <h2 className="text-xl font-semibold mt-6">Documents</h2>
        <ul className="list-disc list-inside">
          {Object.entries(merchant.documents).map(([key, value]) => (
            <li key={key} className="text-gray-700">
              {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())}: {value ? '✅ Submitted' : '❌ Missing'}
            </li>
          ))}
        </ul>

        {merchant.status === 'rejected' && merchant.rejectionReason && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded">
            <strong>Rejection Reason:</strong> {merchant.rejectionReason}
          </div>
        )}
      </div>

      <div className="mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default MerchantDetails;

