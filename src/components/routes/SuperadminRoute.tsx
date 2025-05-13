import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

/**
 * A protected route component that only allows access to superadmins
 */
const SuperadminRoute: React.FC = () => {
  const { isAuthenticated, isSuperadmin } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/superadmin-login" replace />;
  }

  // Redirect to unauthorized page if authenticated but not a superadmin
  if (isAuthenticated && !isSuperadmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render child routes if user is an authenticated superadmin
  return <Outlet />;
};

export default SuperadminRoute;