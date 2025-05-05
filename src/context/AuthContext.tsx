import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  isMerchant: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  businessLogin: (email: string, password: string) => Promise<boolean>;
  setAuthState: (state: AuthState) => Promise<boolean>; // New function to set auth state directly
  logout: () => void;
  refreshTokenFunc: () => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  registerBusiness: (businessData: any) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refresh_token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!accessToken;
  const isMerchant = user?.role === 'merchant' || user?.role === 'admin';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }
  }, [refreshToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // New function to directly set all auth state at once
  const setAuthState = async (state: AuthState) => {
    try {
      setAccessToken(state.accessToken);
      setRefreshToken(state.refreshToken);
      setUser(state.user);
      return true;
    } catch (error) {
      console.error('Failed to set auth state:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Make API call to the customer login endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/customer-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setUser(data.user);
        return true;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const businessLogin = async (email: string, password: string) => {
    try {
      // Make API call to the business login endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_email: email,
          password
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        
        // Create user object from merchant data
        const userObj = {
          id: data.merchant?.id || 'unknown',
          email: email,
          name: data.merchant?.business_name || 'Business User',
          role: 'merchant'
        };
        
        setUser(userObj);
        
        // Store merchant profile if available
        if (data.merchant) {
          localStorage.setItem('merchant_profile', JSON.stringify(data.merchant));
        }
        
        return true;
      } else {
        throw new Error(data.error || 'Business login failed');
      }
    } catch (error) {
      console.error('Business login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // API call to register endpoint would go here
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setUser(data.user);
        return true;
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const registerBusiness = async (businessData: any) => {
    try {
      // API call to register business endpoint would go here
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register-business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setUser(data.user);
        return true;
      } else {
        throw new Error(data.error || 'Business registration failed');
      }
    } catch (error) {
      console.error('Business registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('merchant_profile');
  };

  const refreshTokenFunc = async () => {
    if (!refreshToken) return false;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setAccessToken(data.access_token);
        return true;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (err) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      refreshToken, 
      isAuthenticated,
      user,
      isMerchant,
      isAdmin, 
      login, 
      businessLogin,
      setAuthState, // Added the new function
      logout, 
      refreshTokenFunc, 
      register,
      registerBusiness
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};