import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Key, Bell, Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmationPopup from '../../components/LogoutConfirmationPopup';
import PasswordChangePopup from '../../components/PasswordChangePopup';
import PhoneVerificationPopup from '../../components/PhoneVerificationPopup';
import EmailVerificationPopup from '../../components/EmailVerificationPopup';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  avatar: string;
  lastLogin: string;
  joinDate: string;
  twoFactorEnabled: boolean;
  notificationsEnabled: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

const SuperAdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    id: 'SA001',
    name: 'John Admin',
    email: 'admin@scalixity.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Administrator',
    location: 'New York, USA',
    avatar: 'https://ui-avatars.com/api/?name=John+Admin&background=FF6B35&color=fff',
    lastLogin: '2024-03-20 14:30:00',
    joinDate: '2023-01-15',
    twoFactorEnabled: true,
    notificationsEnabled: true,
    isPhoneVerified: false,
    isEmailVerified: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProfile({
        ...profile,
        ...formData
      });
      setIsEditing(false);
      setLoading(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  const handleToggle2FA = () => {
    setLoading(true);
    setTimeout(() => {
      setProfile({
        ...profile,
        twoFactorEnabled: !profile.twoFactorEnabled
      });
      setLoading(false);
      toast.success(`Two-factor authentication ${!profile.twoFactorEnabled ? 'enabled' : 'disabled'}`);
    }, 1000);
  };

  const handleToggleNotifications = () => {
    setLoading(true);
    setTimeout(() => {
      setProfile({
        ...profile,
        notificationsEnabled: !profile.notificationsEnabled
      });
      setLoading(false);
      toast.success(`Notifications ${!profile.notificationsEnabled ? 'enabled' : 'disabled'}`);
    }, 1000);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/superadmin/login');
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    void currentPassword; // Mark as used to satisfy linter
    void newPassword;     // Mark as used to satisfy linter
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, you would make an API call here
    return Promise.resolve();
  };

  const handlePhoneVerification = async (code: string) => {
    void code; // Mark as used to satisfy linter
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, you would make an API call here
    setProfile({
      ...profile,
      isPhoneVerified: true
    });
    return Promise.resolve();
  };

  const handleEmailVerification = async (code: string) => {
    void code; // Mark as used to satisfy linter
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, you would make an API call here
    setProfile({
      ...profile,
      isEmailVerified: true
    });
    return Promise.resolve();
  };

  return (
    <div className="min-h-[80vh] py-6 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-4 lg:px-4 max-w-full md:max-w-[98%] mid:max-w-[92%] xl:max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Use the shared LogoutConfirmationPopup component */}
        <LogoutConfirmationPopup
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={confirmLogout}
        />

        {/* Password Change Popup */}
        <PasswordChangePopup
          isOpen={showPasswordChange}
          onClose={() => setShowPasswordChange(false)}
          onSubmit={handlePasswordChange}
        />

        {/* Phone Verification Popup */}
        <PhoneVerificationPopup
          isOpen={showPhoneVerification}
          onClose={() => setShowPhoneVerification(false)}
          phoneNumber={profile.phone}
          onVerify={handlePhoneVerification}
        />

        {/* Email Verification Popup */}
        <EmailVerificationPopup
          isOpen={showEmailVerification}
          onClose={() => setShowEmailVerification(false)}
          email={profile.email}
          onVerify={handleEmailVerification}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full border-4 border-orange-100"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.name}</h2>
                <p className="text-orange-500 font-medium">{profile.role}</p>
                
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <div className="flex items-center gap-2">
                      <span>{profile.email}</span>
                      {profile.isEmailVerified ? (
                        <span className="text-green-500 text-sm">✓ Verified</span>
                      ) : (
                        <button
                          onClick={() => setShowEmailVerification(true)}
                          className="text-orange-500 text-sm hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <div className="flex items-center gap-2">
                      <span>{profile.phone}</span>
                      {profile.isPhoneVerified ? (
                        <span className="text-green-500 text-sm">✓ Verified</span>
                      ) : (
                        <button
                          onClick={() => setShowPhoneVerification(true)}
                          className="text-orange-500 text-sm hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p className="text-sm font-medium text-gray-900">{profile.lastLogin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="text-sm font-medium text-gray-900">{profile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-900">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-gray-900">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{profile.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button
                    onClick={handleToggle2FA}
                    disabled={loading}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Notifications</p>
                      <p className="text-sm text-gray-500">Receive important updates and alerts</p>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleNotifications}
                    disabled={loading}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      profile.notificationsEnabled ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        profile.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile; 