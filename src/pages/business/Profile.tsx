import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data - replace with actual user data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567'
    },
    businessInfo: {
      businessName: 'Tech Gadgets Store',
      businessType: 'Electronics Retail',
      registrationNumber: 'BRN123456789',
      address: '123 Commerce Street, Business District',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'United States',
      website: 'www.techgadgets.com'
    },
    accountInfo: {
      accountNumber: '1234567890',
      bankName: 'State Bank of India',
      branchName: 'Main Branch',
      ifscCode: 'SBIN0123456',
      accountType: 'Current'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and business information
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={profileData.personalInfo.name}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex rounded-lg border border-gray-300 bg-gray-50">
              <div className="px-3 py-2 text-gray-500">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={profileData.personalInfo.email}
                disabled
                className="block w-full rounded-r-lg border-0 bg-gray-50 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 flex rounded-lg border border-gray-300">
              <div className="px-3 py-2 text-gray-500">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={profileData.personalInfo.phone}
                disabled={!isEditing}
                className="block w-full rounded-r-lg border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <BuildingOfficeIcon className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={profileData.businessInfo.businessName}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Type</label>
            <input
              type="text"
              value={profileData.businessInfo.businessType}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              value={profileData.businessInfo.registrationNumber}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <div className="mt-1 flex rounded-lg border border-gray-300">
              <div className="px-3 py-2 text-gray-500">
                <GlobeAltIcon className="w-5 h-5" />
              </div>
              <input
                type="url"
                value={profileData.businessInfo.website}
                disabled={!isEditing}
                className="block w-full rounded-r-lg border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Business Address</label>
            <div className="mt-1 flex rounded-lg border border-gray-300">
              <div className="px-3 py-2 text-gray-500">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={profileData.businessInfo.address}
                disabled={!isEditing}
                className="block w-full rounded-r-lg border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={profileData.businessInfo.city}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State/Province</label>
            <input
              type="text"
              value={profileData.businessInfo.state}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP/Postal Code</label>
            <input
              type="text"
              value={profileData.businessInfo.zipCode}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={profileData.businessInfo.country}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <BanknotesIcon className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              value={profileData.accountInfo.accountNumber}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              value={profileData.accountInfo.bankName}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input
              type="text"
              value={profileData.accountInfo.branchName}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
            <input
              type="text"
              value={profileData.accountInfo.ifscCode}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <input
              type="text"
              value={profileData.accountInfo.accountType}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile; 