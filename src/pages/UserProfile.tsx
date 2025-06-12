import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Address {
  address_id: number;
  user_id: number;
  user_email: string;
  contact_name: string;
  contact_phone: string;
  address_line1: string;
  address_line2: string;
  landmark: string;
  city: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_type: 'shipping' | 'billing';
  is_default_shipping: boolean;
  is_default_billing: boolean;
  full_address_str: string;
  created_at: string;
  updated_at: string;
}

interface PaymentMethod {
  id: number;
  card_type: 'credit' | 'debit';
  card_number: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
  last_four: string;
}

interface UserInfo {
  fullName: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  country: string;
  state: string;
  zipCode: string;
  authProvider: 'local' | 'google';
}

const AVATAR_OPTIONS = [
  {
    label: 'Colorful Blob',
    render: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" className="animate-pulse">
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" />
            <stop offset="100%" stopColor="#ff5e62" />
          </radialGradient>
        </defs>
        <ellipse cx="32" cy="32" rx="28" ry="28" fill="url(#grad1)" />
      </svg>
    )
  },
  {
    label: 'Animated Face',
    render: () => (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="#6EE7B7" />
        <circle cx="24" cy="28" r="4" fill="#fff" className="animate-bounce" />
        <circle cx="40" cy="28" r="4" fill="#fff" className="animate-bounce" />
        <ellipse cx="32" cy="40" rx="10" ry="4" fill="#fff" className="animate-pulse" />
      </svg>
    )
  },
  {
    label: 'Star',
    render: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" className="animate-spin-slow">
        <polygon points="32,8 39,26 58,26 42,38 48,56 32,45 16,56 22,38 6,26 25,26" fill="#facc15" />
      </svg>
    )
  },
  {
    label: 'Minimal',
    render: () => (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="#a5b4fc" />
        <rect x="20" y="40" width="24" height="8" rx="4" fill="#fff" />
      </svg>
    )
  },
];

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Address states with dummy data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      address_id: 1,
      user_id: 1,
      user_email: "user@example.com",
      contact_name: "John Smith",
      contact_phone: "+1 (555) 123-4567",
      address_line1: "123 Tech Park",
      address_line2: "Suite 100",
      landmark: "Near Google HQ",
      city: "San Francisco",
      state_province: "CA",
      postal_code: "94105",
      country_code: "US",
      address_type: "shipping",
      is_default_shipping: true,
      is_default_billing: false,
      full_address_str: "123 Tech Park, Suite 100, San Francisco, CA 94105, US",
      created_at: "2024-03-20T10:00:00Z",
      updated_at: "2024-03-20T10:00:00Z"
    },
    {
      address_id: 2,
      user_id: 1,
      user_email: "user@example.com",
      contact_name: "John Smith",
      contact_phone: "+1 (555) 987-6543",
      address_line1: "456 Business District",
      address_line2: "Floor 15",
      landmark: "Across from Central Park",
      city: "New York",
      state_province: "NY",
      postal_code: "10001",
      country_code: "US",
      address_type: "billing",
      is_default_shipping: false,
      is_default_billing: true,
      full_address_str: "456 Business District, Floor 15, New York, NY 10001, US",
      created_at: "2024-03-19T15:30:00Z",
      updated_at: "2024-03-19T15:30:00Z"
    }
  ]);

  // Payment method states with dummy data
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      card_type: "credit",
      card_number: "4532123456789012",
      cardholder_name: "John Smith",
      expiry_month: "12",
      expiry_year: "25",
      is_default: true,
      last_four: "9012"
    },
    {
      id: 2,
      card_type: "debit",
      card_number: "5212345678901234",
      cardholder_name: "John Smith",
      expiry_month: "06",
      expiry_year: "26",
      is_default: false,
      last_four: "1234"
    },
    {
      id: 3,
      card_type: "credit",
      card_number: "378282246310005",
      cardholder_name: "John Smith",
      expiry_month: "09",
      expiry_year: "27",
      is_default: false,
      last_four: "0005"
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    secondaryEmail: '',
    phone: '',
    country: '',
    state: '',
    zipCode: '',
    authProvider: 'local'
  });

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Profile image states
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const profileImageUrl = profileImage ? URL.createObjectURL(profileImage) : null;

  // Add a fade/scale-in animation class
  const popoverAnim = "transition-all duration-200 ease-out transform opacity-100 scale-100 animate-fade-in";

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token || !user) {
      toast.error('Please sign in to access your profile');
      navigate('/sign-in');
      return;
    }
  }, [user, navigate]);

  // Comment out or remove the fetchAddresses and fetchPaymentMethods calls in useEffect
  useEffect(() => {
    if (user?.id) {
      // Comment out these lines to use dummy data instead
      // fetchAddresses();
      // fetchPaymentMethods();
      setLoading(false);
    }
  }, [user?.id]);

  const [editedUserInfo, setEditedUserInfo] = useState<UserInfo>({
    fullName: '',
    email: '',
    secondaryEmail: '',
    phone: '',
    country: '',
    state: '',
    zipCode: '',
    authProvider: 'local'
  });

  const handleEditClick = () => {
    setEditedUserInfo(userInfo); // Initialize edited info with current user info
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    setUserInfo(editedUserInfo);
    setIsEditing(false);
    toast.success('Changes saved successfully');
  };

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setEditedUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditedUserInfo(userInfo); // Reset to original values
    setIsEditing(false);
  };

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state_province: '',
    country_code: '',
    postal_code: '',
    landmark: '',
    contact_phone: ''
  });

  const [showAddressAdded, setShowAddressAdded] = useState(false);

  const handleAddAddress = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/user-address`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...newAddress,
          user_id: user?.id,
          user_email: userInfo.email,
          address_type: 'shipping', // Default to shipping
          contact_name: userInfo.fullName // Use the user's full name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      toast.success('Address added successfully');
      setShowAddressModal(false);
      setNewAddress({
        address: '',
        city: '',
        state_province: '',
        country_code: '',
        postal_code: '',
        landmark: '',
        contact_phone: ''
      });
      setShowAddressAdded(true);
      setTimeout(() => setShowAddressAdded(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  // Fetch payment methods
  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/payment-methods?user_id=${user?.id}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      const data = await response.json();
      setPaymentMethods(data.payment_methods);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.error('Failed to fetch payment methods');
    }
  };

  // Add or update payment method
  const handleSavePaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For dummy data, just update the state
      if (editingPaymentMethod) {
        // If this payment method is being set as default, remove default from others
        if (newPaymentMethod.is_default) {
          setPaymentMethods(prev => prev.map(method => ({
            ...method,
            is_default: false // Remove default from all methods
          })));
        }
        
        // Update the edited payment method
        setPaymentMethods(prev => prev.map(method => 
          method.id === editingPaymentMethod.id 
            ? {
                ...method,
                ...newPaymentMethod,
                last_four: newPaymentMethod.card_number?.slice(-4) || method.last_four
              }
            : method
        ));
        toast.success('Payment method updated successfully');
      } else {
        // For new payment method
        // If this is being set as default, remove default from others
        if (newPaymentMethod.is_default) {
          setPaymentMethods(prev => prev.map(method => ({
            ...method,
            is_default: false // Remove default from all methods
          })));
        }
        
        // Add new payment method
        const newId = Math.max(...paymentMethods.map(m => m.id)) + 1;
        setPaymentMethods(prev => [...prev, {
          id: newId,
          ...newPaymentMethod,
          last_four: newPaymentMethod.card_number?.slice(-4) || ''
        } as PaymentMethod]);
        toast.success('Payment method added successfully');
      }
      
      setShowPaymentModal(false);
      setEditingPaymentMethod(null);
      setNewPaymentMethod({
        card_type: 'credit',
        card_number: '',
        cardholder_name: '',
        expiry_month: '',
        expiry_year: '',
        is_default: false
      });
    } catch (error) {
      console.error('Error saving payment method:', error);
      toast.error('Failed to save payment method');
    }
  };

  // Delete payment method
  const handleDeletePaymentMethod = async (id: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/payment-methods/${id}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }

      toast.success('Payment method deleted');
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast.error('Failed to delete payment method');
    }
  };

  // Set default payment method
  const handleSetDefaultPaymentMethod = async (id: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      // For dummy data, update the state to ensure only one payment method is default
      setPaymentMethods(prev => prev.map(method => ({
        ...method,
        is_default: method.id === id // This will set is_default to true only for the selected method
      })));

      // If you want to keep the API call for real implementation, uncomment this:
      /*
      const baseUrl = API_BASE_URL.replace(/\/+$/, '');
      const url = `${baseUrl}/api/payment-methods/${id}/default`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user_id: user?.id })
      });

      if (!response.ok) {
        throw new Error('Failed to set default payment method');
      }
      */

      toast.success('Default payment method updated');
    } catch (error) {
      console.error('Error setting default payment method:', error);
      toast.error('Failed to set default payment method');
    }
  };

  // Initialize payment methods
  useEffect(() => {
    if (user?.id) {
      // Comment out these lines to use dummy data instead
      // fetchPaymentMethods();
    }
  }, [user?.id]);

  // Keep necessary state variables
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [newPaymentMethod, setNewPaymentMethod] = useState<Partial<PaymentMethod>>({
    card_type: 'credit',
    card_number: '',
    cardholder_name: '',
    expiry_month: '',
    expiry_year: '',
    is_default: false
  });

  // Mock handlers for dummy data
  const handleDeleteAddress = (addressId: number) => {
    setAddresses(prev => prev.filter(addr => addr.address_id !== addressId));
    toast.success('Address deleted successfully');
  };

  const handleSetDefaultAddress = (addressId: number, addressType: 'shipping' | 'billing') => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      is_default_shipping: addressType === 'shipping' ? addr.address_id === addressId : addr.is_default_shipping,
      is_default_billing: addressType === 'billing' ? addr.address_id === addressId : addr.is_default_billing
    })));
    toast.success(`Default ${addressType} address updated successfully`);
  };

  // Add back password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // For dummy data, just show success message
    toast.success('Password changed successfully');
    // Clear password fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Add state for editing address
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Add handler for edit address
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowEditAddressModal(true);
  };

  // Add handler for save edited address
  const handleSaveEditedAddress = () => {
    if (editingAddress) {
      // Ensure the full_address_str is updated with the combined address
      const updatedAddress = {
        ...editingAddress,
        full_address_str: `${editingAddress.address_line1}${editingAddress.address_line2 ? ', ' + editingAddress.address_line2 : ''}, ${editingAddress.city}, ${editingAddress.state_province} ${editingAddress.postal_code}, ${editingAddress.country_code}`
      };
      
      setAddresses(prev => prev.map(addr => 
        addr.address_id === editingAddress.address_id ? updatedAddress : addr
      ));
      setShowEditAddressModal(false);
      setEditingAddress(null);
      toast.success('Address updated successfully');
    }
  };

  return (
    <div className="py-10 px-4">
      {showAddressAdded && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl shadow-lg bg-green-500 text-white font-semibold animate-slide-in">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Address added successfully!
          </div>
        </div>
      )}
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-0">
        {/* Left Sidebar for Avatar */}
        <aside className="w-full md:w-1/4">
          {/* Profile Image/Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-2">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 shadow"
                />
              ) : (
                <button
                  type="button"
                  className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100 border-4 border-orange-200 shadow text-gray-400 text-5xl hover:bg-gray-200"
                  onClick={() => setShowAvatarPicker(v => !v)}
                  title="Click to choose avatar"
                >
                  {AVATAR_OPTIONS[avatarIndex].render()}
                </button>
              )}
              {profileImageUrl && (
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 text-xs text-red-500 hover:bg-red-100"
                  onClick={() => {
                    setProfileImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  title="Remove image"
                >
                  &times;
                </button>
              )}
              {/* Avatar Picker Popover */}
              {showAvatarPicker && !profileImageUrl && (
                <>
                  {/* Overlay to close popover on outside click */}
                  <div
                    className="fixed inset-0 z-10 bg-transparent"
                    onClick={() => setShowAvatarPicker(false)}
                  />
                  <div className={`absolute left-1/2 top-full z-20 mt-3 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-2xl px-6 pt-4 pb-3 flex flex-col items-center ${popoverAnim}`} style={{ minWidth: 220 }}>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 overflow-hidden">
                      <div className="w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 shadow-md"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mb-2">
                      {AVATAR_OPTIONS.map((opt, idx) => (
                        <button
                          key={opt.label}
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${avatarIndex === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-transparent'} bg-gray-50 hover:bg-orange-100 transition`}
                          onClick={() => { setAvatarIndex(idx); setShowAvatarPicker(false); }}
                          title={opt.label}
                          aria-label={opt.label}
                        >
                          {opt.render()}
                        </button>
                      ))}
                    </div>
                    <label
                      htmlFor="profile-image-upload"
                      className="w-full text-center text-sm text-gray-600 hover:text-orange-500 cursor-pointer py-2 border-t border-gray-200 mt-2"
                    >
                      Upload Image
                    </label>
                    <button
                      className="text-xs text-gray-500 hover:text-orange-500 mt-1 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                      onClick={() => setShowAvatarPicker(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              className="hidden"
              ref={fileInputRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setProfileImage(e.target.files[0]);
                  setShowAvatarPicker(false);
                }
              }}
            />
            {!profileImage && (
              <div className="text-xs text-gray-400 mt-2">Click avatar to choose style</div>
            )}
          </div>
        </aside>
        {/* Right Main Content */}
        <div className="flex-1 max-w-5xl">
          {/* User Info */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.fullName : userInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.email : userInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.phone : userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country/Region</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.country : userInfo.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.state : userInfo.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input 
                  className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 ${!isEditing ? 'bg-gray-50' : ''}`}
                  value={isEditing ? editedUserInfo.zipCode : userInfo.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2 mb-8">
              <button 
                onClick={handleSaveChanges}
                className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600"
              >
                Save Changes
              </button>
              <button 
                onClick={handleCancelEdit}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={handleEditClick}
              className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium mb-8 hover:bg-orange-600"
            >
              Edit
            </button>
          )}

          {/* Saved Addresses */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">
                <p>{error}</p>
                <button 
                  onClick={() => {
                    // Comment out these lines to use dummy data instead
                    // fetchAddresses();
                  }}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-2 mb-2">
                {addresses.map((address) => (
                  <div key={address.address_id} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium capitalize text-orange-600">{address.address_type}</span>
                        {address.is_default_shipping && address.address_type === 'shipping' && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Default Shipping</span>
                        )}
                        {address.is_default_billing && address.address_type === 'billing' && (
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Default Billing</span>
                        )}
                      </div>
                      <p className="text-sm">{`${address.address_line1}${address.address_line2 ? ', ' + address.address_line2 : ''}, ${address.city}, ${address.state_province} ${address.postal_code}, ${address.country_code}`}</p>
                      <div className="flex gap-2 mt-1">
                        {!address.is_default_shipping && address.address_type === 'shipping' && (
                          <button 
                            onClick={() => handleSetDefaultAddress(address.address_id, 'shipping')}
                            className="text-xs text-orange-500 hover:text-orange-600"
                          >
                            Set as default shipping
                          </button>
                        )}
                        {!address.is_default_billing && address.address_type === 'billing' && (
                          <button 
                            onClick={() => handleSetDefaultAddress(address.address_id, 'billing')}
                            className="text-xs text-orange-500 hover:text-orange-600"
                          >
                            Set as default billing
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => handleEditAddress(address)}
                        className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteAddress(address.address_id)}
                        className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button 
              onClick={() => setShowAddressModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium flex items-center"
            >
              <span className="mr-1">+</span> Add New
            </button>

            {/* Add Address Modal */}
            {showAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 animate-fade-in">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="text-gray-400 hover:text-gray-700 transition"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>
                  {/* Form */}
                  <form
                    onSubmit={e => { e.preventDefault(); handleAddAddress(); }}
                    className="px-6 py-6 space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <textarea
                          required
                          rows={3}
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.address}
                          onChange={e => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="Enter your complete address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.contact_phone}
                          onChange={e => setNewAddress(prev => ({ ...prev, contact_phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.city}
                          onChange={e => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.state_province}
                          onChange={e => setNewAddress(prev => ({ ...prev, state_province: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.country_code}
                          onChange={e => setNewAddress(prev => ({ ...prev, country_code: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.postal_code}
                          onChange={e => setNewAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                        <input
                          type="text"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newAddress.landmark}
                          onChange={e => setNewAddress(prev => ({ ...prev, landmark: e.target.value }))}
                          placeholder="Nearby landmark or location"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition w-full md:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition w-full md:w-auto"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
            <div className="space-y-2 mb-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="capitalize">{method.card_type} card ending in {method.last_four}</span>
                      {method.is_default && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Expires {method.expiry_month}/{method.expiry_year}
                    </div>
                  </div>
                  <div className="space-x-2">
                    {!method.is_default && (
                      <button 
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        className="text-xs text-orange-500 hover:text-orange-600"
                      >
                        Set as default
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setEditingPaymentMethod(method);
                        setNewPaymentMethod({
                          card_type: method.card_type,
                          card_number: method.card_number,
                          cardholder_name: method.cardholder_name,
                          expiry_month: method.expiry_month,
                          expiry_year: method.expiry_year,
                          is_default: method.is_default
                        });
                        setShowPaymentModal(true);
                      }}
                      className="bg-gray-200 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setEditingPaymentMethod(null);
                setNewPaymentMethod({
                  card_type: 'credit',
                  card_number: '',
                  cardholder_name: '',
                  expiry_month: '',
                  expiry_year: '',
                  is_default: false
                });
                setShowPaymentModal(true);
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium flex items-center"
            >
              <span className="mr-1">+</span> Add New
            </button>

            {/* Payment Method Modal */}
            {showPaymentModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 animate-fade-in">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingPaymentMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowPaymentModal(false);
                        setEditingPaymentMethod(null);
                        setNewPaymentMethod({
                          card_type: 'credit',
                          card_number: '',
                          cardholder_name: '',
                          expiry_month: '',
                          expiry_year: '',
                          is_default: false
                        });
                      }}
                      className="text-gray-400 hover:text-gray-700 transition"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>
                  {/* Form */}
                  <form onSubmit={handleSavePaymentMethod} className="px-6 py-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                        <select
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newPaymentMethod.card_type}
                          onChange={e => setNewPaymentMethod(prev => ({ ...prev, card_type: e.target.value as 'credit' | 'debit' }))}
                          required
                        >
                          <option value="credit">Credit Card</option>
                          <option value="debit">Debit Card</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={16}
                          pattern="[0-9]*"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newPaymentMethod.card_number}
                          onChange={e => setNewPaymentMethod(prev => ({ ...prev, card_number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          value={newPaymentMethod.cardholder_name}
                          onChange={e => setNewPaymentMethod(prev => ({ ...prev, cardholder_name: e.target.value }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                          <select
                            required
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            value={newPaymentMethod.expiry_month}
                            onChange={e => setNewPaymentMethod(prev => ({ ...prev, expiry_month: e.target.value }))}
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                          <select
                            required
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            value={newPaymentMethod.expiry_year}
                            onChange={e => setNewPaymentMethod(prev => ({ ...prev, expiry_year: e.target.value }))}
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i).slice(-2)).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="default-payment"
                          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                          checked={newPaymentMethod.is_default}
                          onChange={e => setNewPaymentMethod(prev => ({ ...prev, is_default: e.target.checked }))}
                        />
                        <label htmlFor="default-payment" className="ml-2 block text-sm text-gray-700">
                          Set as default payment method
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPaymentModal(false);
                          setEditingPaymentMethod(null);
                          setNewPaymentMethod({
                            card_type: 'credit',
                            card_number: '',
                            cardholder_name: '',
                            expiry_month: '',
                            expiry_year: '',
                            is_default: false
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition w-full md:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition w-full md:w-auto"
                      >
                        {editingPaymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
            <div className="grid grid-cols-2 gap-4 items-center mb-2 max-w-md">
              <div className="space-y-8">
                <div className="flex items-center">
                  <span className="text-base">Email Notification</span>
                </div>
                <div className="flex items-center">
                  <span className="text-base">PUSH Notification</span>
                </div>
              </div>
              <div className="space-y-8 flex flex-col items-end">
                <button
                  type="button"
                  aria-pressed={emailNotif}
                  onClick={() => setEmailNotif(v => !v)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${emailNotif ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${emailNotif ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </button>
                <button
                  type="button"
                  aria-pressed={pushNotif}
                  onClick={() => setPushNotif(v => !v)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${pushNotif ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${pushNotif ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Change Password Section - Only show for local auth users */}
          {userInfo.authProvider === 'local' && (
            <div className="bg-white border rounded-md p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                      placeholder="Current Password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="absolute right-2 top-2" 
                      onClick={() => setShowCurrentPassword(v => !v)}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                      placeholder="8+ characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="absolute right-2 top-2" 
                      onClick={() => setShowNewPassword(v => !v)}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="absolute right-2 top-2" 
                      onClick={() => setShowConfirmPassword(v => !v)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="bg-orange-500 text-white px-6 py-2 rounded-md font-medium w-full"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}

          {/* Google Auth Message */}
         
        </div>
      </div>

      {/* Add Edit Address Modal */}
      {showEditAddressModal && editingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-900">Edit Address</h3>
              <button
                onClick={() => {
                  setShowEditAddressModal(false);
                  setEditingAddress(null);
                }}
                className="text-gray-400 hover:text-gray-700 transition"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {/* Form */}
            <form
              onSubmit={e => { e.preventDefault(); handleSaveEditedAddress(); }}
              className="px-6 py-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <textarea
                    required
                    rows={3}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={`${editingAddress.address_line1}${editingAddress.address_line2 ? ', ' + editingAddress.address_line2 : ''}`}
                    onChange={e => {
                      const value = e.target.value;
                      // Split the address into two parts if there's a comma
                      const parts = value.split(',').map(part => part.trim());
                      const addressLine1 = parts[0] || '';
                      const addressLine2 = parts.slice(1).join(', ') || '';
                      
                      setEditingAddress(prev => prev ? {
                        ...prev,
                        address_line1: addressLine1,
                        address_line2: addressLine2,
                        full_address_str: `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${prev.city}, ${prev.state_province} ${prev.postal_code}, ${prev.country_code}`
                      } : null);
                    }}
                    placeholder="Enter your complete address (use comma to separate address lines)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.contact_phone}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      contact_phone: e.target.value
                    } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.city}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      city: e.target.value,
                      full_address_str: `${prev.address_line1}, ${prev.address_line2}, ${e.target.value}, ${prev.state_province} ${prev.postal_code}, ${prev.country_code}`
                    } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
                  <input
                    type="text"
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.state_province}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      state_province: e.target.value,
                      full_address_str: `${prev.address_line1}, ${prev.address_line2}, ${prev.city}, ${e.target.value} ${prev.postal_code}, ${prev.country_code}`
                    } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.country_code}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      country_code: e.target.value,
                      full_address_str: `${prev.address_line1}, ${prev.address_line2}, ${prev.city}, ${prev.state_province} ${prev.postal_code}, ${e.target.value}`
                    } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.postal_code}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      postal_code: e.target.value,
                      full_address_str: `${prev.address_line1}, ${prev.address_line2}, ${prev.city}, ${prev.state_province} ${e.target.value}, ${prev.country_code}`
                    } : null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    value={editingAddress.landmark}
                    onChange={e => setEditingAddress(prev => prev ? {
                      ...prev,
                      landmark: e.target.value
                    } : null)}
                    placeholder="Nearby landmark or location"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-orange-500"
                        checked={editingAddress.address_type === 'shipping'}
                        onChange={() => setEditingAddress(prev => prev ? {
                          ...prev,
                          address_type: 'shipping',
                          is_default_billing: false // Reset billing default when switching to shipping
                        } : null)}
                      />
                      <span className="ml-2">Shipping</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-orange-500"
                        checked={editingAddress.address_type === 'billing'}
                        onChange={() => setEditingAddress(prev => prev ? {
                          ...prev,
                          address_type: 'billing',
                          is_default_shipping: false // Reset shipping default when switching to billing
                        } : null)}
                      />
                      <span className="ml-2">Billing</span>
                    </label>
                  </div>
                </div>
                {/* Show default option based on address type */}
                {editingAddress.address_type === 'shipping' && (
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-orange-500"
                        checked={editingAddress.is_default_shipping}
                        onChange={(e) => {
                          // If setting as default shipping, remove default from other shipping addresses
                          if (e.target.checked) {
                            setAddresses(prev => prev.map(addr => ({
                              ...addr,
                              is_default_shipping: false
                            })));
                          }
                          setEditingAddress(prev => prev ? {
                            ...prev,
                            is_default_shipping: e.target.checked
                          } : null);
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">Set as default shipping address</span>
                    </label>
                  </div>
                )}
                {editingAddress.address_type === 'billing' && (
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-orange-500"
                        checked={editingAddress.is_default_billing}
                        onChange={(e) => {
                          // If setting as default billing, remove default from other billing addresses
                          if (e.target.checked) {
                            setAddresses(prev => prev.map(addr => ({
                              ...addr,
                              is_default_billing: false
                            })));
                          }
                          setEditingAddress(prev => prev ? {
                            ...prev,
                            is_default_billing: e.target.checked
                          } : null);
                        }}
                      />
                      <span className="ml-2 text-sm text-gray-700">Set as default billing address</span>
                    </label>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditAddressModal(false);
                    setEditingAddress(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition w-full md:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition w-full md:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 