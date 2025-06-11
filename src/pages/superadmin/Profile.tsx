import React, { useState } from 'react';
import { Settings, LogOut, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmationPopup from '../../components/LogoutConfirmationPopup';
import EmailVerificationPopup from '../../components/EmailVerificationPopup';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
}

const SuperAdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile>({
    id: 'SA001',
    name: 'John Admin',
    email: 'admin@scalixity.com',
    isEmailVerified: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value,
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

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordFormData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await handlePasswordChange(passwordFormData.currentPassword, passwordFormData.newPassword);
      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
    } catch {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
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

        {/* Email Verification Popup */}
        <EmailVerificationPopup
          isOpen={showEmailVerification}
          onClose={() => setShowEmailVerification(false)}
          email={profile.email}
          onVerify={handleEmailVerification}
        />

        <div className="space-y-6">
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
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {profile.isEmailVerified ? (
                        <span className="text-green-600 flex items-center">
                          <Check className="h-5 w-5 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowEmailVerification(true)}
                          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
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
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordFormData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.current ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.new ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordFormData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword.confirm ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile; 