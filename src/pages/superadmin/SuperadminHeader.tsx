// src/components/superadmin/SuperadminHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, Settings, LogOut, User, Menu } from 'lucide-react';

interface SuperadminHeaderProps {
  onMenuClick?: () => void;
}

const SuperadminHeader: React.FC<SuperadminHeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-orange-500 border-b border-orange-200 sticky top-0 z-30">
      <div className="px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 mr-2 text-white hover:text-orange-200 hover:bg-orange-600 rounded-lg transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-xl font-bold text-white">ShopEasy Admin</span>
          </div>
          
          {/* Navigation Links - could be expanded */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            </div>
          </div>
          
          {/* Right side icons and profile */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-orange-200 p-1 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <button className="text-white hover:text-orange-200 p-1 rounded-full">
              <Settings className="h-6 w-6" />
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <div className="flex items-center cursor-pointer">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium text-white">{user?.name || user?.email}</div>
                    <div className="text-xs text-orange-200">Superadmin</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-4 text-white hover:text-red-600"
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