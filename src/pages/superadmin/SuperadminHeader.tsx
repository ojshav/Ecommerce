// src/components/superadmin/SuperadminHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Settings, LogOut, User } from 'lucide-react';

const SuperadminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/superadmin-login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-blue-600">ShopEasy Admin</span>
          </div>
          
          {/* Navigation Links - could be expanded */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a 
                href="/superadmin" 
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </a>
              <a 
                href="/superadmin/content-moderation" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Content Moderation
              </a>
              <a 
                href="/superadmin/user-management" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                User Management
              </a>
            </div>
          </div>
          
          {/* Right side icons and profile */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-600 p-1 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-gray-500 hover:text-blue-600 p-1 rounded-full">
              <Settings className="h-6 w-6" />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <div className="flex items-center cursor-pointer">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium text-gray-700">{user?.name || user?.email}</div>
                    <div className="text-xs text-gray-500">Superadmin</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-4 text-gray-500 hover:text-red-600"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SuperadminHeader;