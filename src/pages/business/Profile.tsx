import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data - replace with actual user data
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    businessInfo: {
      businessName: '',
      businessType: '',
      registrationNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      website: ''
    },
    accountInfo: {
      accountNumber: '',
      bankName: '',
      branchName: '',
      ifscCode: '',
      accountType: ''
    }
  });

  const token = localStorage.getItem('access_token');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/merchants/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      const p = data.profile || {};
      setProfileData(() => ({
        personalInfo: {
          name: `${(user as any)?.first_name || ''} ${(user as any)?.last_name || ''}`.trim(),
          email: user?.email || '',
          phone: p.business_phone || ''
        },
        businessInfo: {
          businessName: p.business_name || '',
          businessType: '',
          registrationNumber: '',
          address: p.business_address || '',
          city: p.city || '',
          state: p.state_province || '',
          zipCode: p.postal_code || '',
          country: p.country_code || '',
          website: ''
        },
        accountInfo: {
          accountNumber: p.bank_account_number || '',
          bankName: p.bank_name || '',
          branchName: p.bank_branch || '',
          ifscCode: p.bank_ifsc_code || '',
          accountType: ''
        }
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  const handleSave = async () => {
    try {
      setError(null);
      const payload = {
        business_name: profileData.businessInfo.businessName,
        business_description: profileData.businessInfo.businessType,
        business_phone: profileData.personalInfo.phone,
        business_address: profileData.businessInfo.address,
        country_code: profileData.businessInfo.country,
        state_province: profileData.businessInfo.state,
        city: profileData.businessInfo.city,
        postal_code: profileData.businessInfo.zipCode,
        bank_account_number: profileData.accountInfo.accountNumber,
        bank_name: profileData.accountInfo.bankName,
        bank_branch: profileData.accountInfo.branchName,
        bank_ifsc_code: profileData.accountInfo.ifscCode
      };
      const res = await fetch(`${API_BASE_URL}/api/merchants/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      setIsEditing(false);
      await fetchProfile();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update profile');
    }
  };

  const updateBusinessInfo = (field: keyof typeof profileData.businessInfo, value: string) => {
    setProfileData(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        [field]: value
      }
    }));
  };

  const updatePersonalInfo = (field: keyof typeof profileData.personalInfo, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage your personal, business, and account information
          </p>
        </div>
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-orange-500 text-sm font-medium rounded-md text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.personalInfo.name}
                    disabled={!isEditing}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex rounded-md border border-gray-300 bg-gray-50">
                    <div className="px-3 py-2 text-gray-500">
                      <EnvelopeIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={profileData.personalInfo.email}
                      disabled
                      className="block w-full rounded-r-md border-0 bg-gray-50 px-3 py-2"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <PhoneIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={profileData.personalInfo.phone}
                      disabled={!isEditing}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-2 mb-6">
                <BuildingOfficeIcon className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.businessName}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('businessName', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.businessType}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('businessType', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.registrationNumber}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('registrationNumber', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <GlobeAltIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="url"
                      value={profileData.businessInfo.website}
                      disabled={!isEditing}
                      onChange={(e) => updateBusinessInfo('website', e.target.value)}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  <div className="flex rounded-md border border-gray-300">
                    <div className="px-3 py-2 text-gray-500">
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={profileData.businessInfo.address}
                      disabled={!isEditing}
                      onChange={(e) => updateBusinessInfo('address', e.target.value)}
                      className="block w-full rounded-r-md border-0 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.city}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('city', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.state}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('state', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.zipCode}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('zipCode', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.country}
                    disabled={!isEditing}
                    onChange={(e) => updateBusinessInfo('country', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 