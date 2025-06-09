import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface ProfileData {
  first_name: string;
  last_name: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
}

interface AccountData {
  username: string;
  email: string;
  phone: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
}

interface BankAccountData {
  account_name: string;
  account_number: string;
  bank_name: string;
  branch_name: string;
  routing_number: string;
  swift_code: string;
}

interface VerificationData {
  email_code: string;
  phone_code: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Settings: React.FC = () => {
  const { accessToken, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'profile'
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    business_name: '',
    business_email: '',
    business_phone: '',
    business_address: ''
  });

  // Account form state
  const [accountData, setAccountData] = useState<AccountData>({
    username: '',
    email: '',
    phone: '',
    is_email_verified: false,
    is_phone_verified: false
  });

  // Bank Account form state
  const [bankAccountData, setBankAccountData] = useState<BankAccountData>({
    account_name: '',
    account_number: '',
    bank_name: '',
    branch_name: '',
    routing_number: '',
    swift_code: ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verification states
  const [verificationData, setVerificationData] = useState<VerificationData>({
    email_code: '',
    phone_code: ''
  });
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  // Fetch profile and account data
  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      
      try {
        // Fetch profile data
        const profileResponse = await fetch(`${API_BASE_URL}/api/auth/merchant/profile`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        if (!profileResponse.ok) throw new Error('Failed to fetch profile');
        
        const profileData = await profileResponse.json();
        setProfileData({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          business_name: profileData.business_name || '',
          business_email: profileData.business_email || '',
          business_phone: profileData.business_phone || '',
          business_address: profileData.business_address || ''
        });

        // Fetch account data
        const accountResponse = await fetch(`${API_BASE_URL}/api/auth/merchant/account`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!accountResponse.ok) throw new Error('Failed to fetch account details');

        const accountData = await accountResponse.json();
        setAccountData({
          username: accountData.username || '',
          email: accountData.email || '',
          phone: accountData.phone || '',
          is_email_verified: accountData.is_email_verified || false,
          is_phone_verified: accountData.is_phone_verified || false
        });

        // Fetch bank account data
        const bankAccountResponse = await fetch(`${API_BASE_URL}/api/auth/merchant/bank-account`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (bankAccountResponse.ok) {
          const bankData = await bankAccountResponse.json();
          setBankAccountData({
            account_name: bankData.account_name || '',
            account_number: bankData.account_number || '',
            bank_name: bankData.bank_name || '',
            branch_name: bankData.branch_name || '',
            routing_number: bankData.routing_number || '',
            swift_code: bankData.swift_code || ''
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle account form changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle bank account form changes
  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle verification code changes
  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send verification code
  const handleSendVerificationCode = async (type: 'email' | 'phone') => {
    setIsSendingCode(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/send-verification-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          [type]: type === 'email' ? accountData.email : accountData.phone
        })
      });

      if (!response.ok) throw new Error(`Failed to send ${type} verification code`);
      
      toast.success(`Verification code sent to your ${type}`);
      if (type === 'email') {
        setShowEmailVerification(true);
      } else {
        setShowPhoneVerification(true);
      }
    } catch (error) {
      console.error(`Error sending ${type} verification code:`, error);
      toast.error(`Failed to send verification code to ${type}`);
    } finally {
      setIsSendingCode(false);
    }
  };

  // Verify code
  const handleVerifyCode = async (type: 'email' | 'phone') => {
    const isEmail = type === 'email';
    const setVerifying = isEmail ? setIsVerifyingEmail : setIsVerifyingPhone;
    const code = isEmail ? verificationData.email_code : verificationData.phone_code;
    
    setVerifying(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/verify-code`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          code,
          [type]: isEmail ? accountData.email : accountData.phone
        })
      });

      if (!response.ok) throw new Error(`Invalid ${type} verification code`);
      
      setAccountData(prev => ({
        ...prev,
        [isEmail ? 'is_email_verified' : 'is_phone_verified']: true
      }));
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully`);
      
      if (isEmail) {
        setShowEmailVerification(false);
        setVerificationData(prev => ({ ...prev, email_code: '' }));
      } else {
        setShowPhoneVerification(false);
        setVerificationData(prev => ({ ...prev, phone_code: '' }));
      }
    } catch (error) {
      console.error(`Error verifying ${type}:`, error);
      toast.error(`Invalid verification code`);
    } finally {
      setVerifying(false);
    }
  };

  // Save profile changes
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  // Modified account submit handler
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email or phone has changed and needs verification
    const needsEmailVerification = !accountData.is_email_verified;
    const needsPhoneVerification = !accountData.is_phone_verified;

    if (needsEmailVerification || needsPhoneVerification) {
      toast.error('Please verify your email and phone number before saving');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/account`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      });

      if (!response.ok) throw new Error('Failed to update account');
      
      toast.success('Account updated successfully');
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Failed to update account');
    } finally {
      setIsSaving(false);
    }
  };

  // Save bank account changes
  const handleBankAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/bank-account`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankAccountData)
      });

      if (!response.ok) throw new Error('Failed to update bank account details');
      
      toast.success('Bank account details updated successfully');
    } catch (error) {
      console.error('Error updating bank account:', error);
      toast.error('Failed to update bank account details');
    } finally {
      setIsSaving(false);
    }
  };

  // Change password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/merchant/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password
        })
      });

      if (!response.ok) throw new Error('Failed to change password');
      
      toast.success('Password changed successfully');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4D00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings, business profile, and banking information.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('account')}
                className={`${
                  activeTab === 'account'
                    ? 'border-[#FF4D00] text-[#FF4D00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-[#FF4D00] text-[#FF4D00]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Business Profile
              </button>
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'account' && (
            <>
              {/* Account Details Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>
                  <form onSubmit={handleAccountSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={accountData.email}
                          onChange={(e) => {
                            handleAccountChange(e);
                            setAccountData(prev => ({ ...prev, is_email_verified: false }));
                          }}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-24 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          {accountData.is_email_verified ? (
                            <span className="text-green-600 flex items-center px-3">
                              <Check className="h-5 w-5 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSendVerificationCode('email')}
                              disabled={isSendingCode || !accountData.email}
                              className="text-[#FF4D00] hover:text-[#FF6B00] px-3 py-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSendingCode ? 'Sending...' : 'Verify Email'}
                            </button>
                          )}
                        </div>
                      </div>
                      {showEmailVerification && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              name="email_code"
                              value={verificationData.email_code}
                              onChange={handleVerificationChange}
                              placeholder="Enter code"
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                            />
                            <button
                              type="button"
                              onClick={() => handleVerifyCode('email')}
                              disabled={isVerifyingEmail || !verificationData.email_code}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                            >
                              {isVerifyingEmail ? 'Verifying...' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={accountData.phone}
                          onChange={(e) => {
                            handleAccountChange(e);
                            setAccountData(prev => ({ ...prev, is_phone_verified: false }));
                          }}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-24 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          {accountData.is_phone_verified ? (
                            <span className="text-green-600 flex items-center px-3">
                              <Check className="h-5 w-5 mr-1" />
                              Verified
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSendVerificationCode('phone')}
                              disabled={isSendingCode || !accountData.phone}
                              className="text-[#FF4D00] hover:text-[#FF6B00] px-3 py-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSendingCode ? 'Sending...' : 'Verify Phone'}
                            </button>
                          )}
                        </div>
                      </div>
                      {showPhoneVerification && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              name="phone_code"
                              value={verificationData.phone_code}
                              onChange={handleVerificationChange}
                              placeholder="Enter code"
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                            />
                            <button
                              type="button"
                              onClick={() => handleVerifyCode('phone')}
                              disabled={isVerifyingPhone || !verificationData.phone_code}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                            >
                              {isVerifyingPhone ? 'Verifying...' : 'Submit'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSaving || !accountData.is_email_verified || !accountData.is_phone_verified}
                        className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Account Details'}
                      </button>
                      {(!accountData.is_email_verified || !accountData.is_phone_verified) && (
                        <p className="mt-2 text-sm text-red-600">
                          Please verify both email and phone number before saving
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Bank Account Details Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Bank Account Details</h2>
                  <form onSubmit={handleBankAccountSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                        <input
                          type="text"
                          name="account_name"
                          value={bankAccountData.account_name}
                          onChange={handleBankAccountChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input
                          type="text"
                          name="account_number"
                          value={bankAccountData.account_number}
                          onChange={handleBankAccountChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reenter Account Number</label>
                        <input
                          type="text"
                          name="reenter_account_number"
                          value={bankAccountData.account_number}
                          onChange={handleBankAccountChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          name="bank_name"
                          value={bankAccountData.bank_name}
                          onChange={handleBankAccountChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                        <input
                          type="text"
                          name="branch_name"
                          value={bankAccountData.branch_name}
                          onChange={handleBankAccountChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Bank Details'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Password Change Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="current_password"
                          value={passwordData.current_password}
                          onChange={handlePasswordChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="new_password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirm_password"
                          value={passwordData.confirm_password}
                          onChange={handlePasswordChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isChangingPassword}
                        className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                      >
                        {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Profile Settings Section */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Profile</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleProfileChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleProfileChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      value={profileData.business_name}
                      onChange={handleProfileChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                    <textarea
                      name="business_address"
                      value={profileData.business_address}
                      onChange={handleProfileChange}
                      rows={3}
                      className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-[#FF4D00] focus:border-[#FF4D00]"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4D00] hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D00] disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 