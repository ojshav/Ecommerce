import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'customer' | 'merchant' | 'admin';
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

  const login = async (email: string, password: string) => {
    try {
      // API call to login endpoint would go here
      // For demo purposes, we're simulating a successful login
      const mockResponse = {
        access_token: 'customer_mock_token',
        refresh_token: 'customer_mock_refresh_token',
        user: {
          id: '1',
          email: email,
          name: 'Customer User',
          role: 'customer'
        }
      };
      
      setAccessToken(mockResponse.access_token);
      setRefreshToken(mockResponse.refresh_token);
      setUser(mockResponse.user as User);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const businessLogin = async (email: string, password: string) => {
    try {
      // API call to business login endpoint would go here
      // For demo purposes, we're simulating a successful login
      const mockResponse = {
        access_token: 'merchant_mock_token',
        refresh_token: 'merchant_mock_refresh_token',
        user: {
          id: '2',
          email: email,
          name: 'Merchant User',
          role: 'merchant'
        }
      };
      
      setAccessToken(mockResponse.access_token);
      setRefreshToken(mockResponse.refresh_token);
      setUser(mockResponse.user as User);
      return true;
    } catch (error) {
      console.error('Business login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // API call to register endpoint would go here
      // For demo purposes, we're simulating a successful registration
      const mockResponse = {
        access_token: 'new_customer_mock_token',
        refresh_token: 'new_customer_mock_refresh_token',
        user: {
          id: '3',
          email: email,
          role: 'customer'
        }
      };
      
      setAccessToken(mockResponse.access_token);
      setRefreshToken(mockResponse.refresh_token);
      setUser(mockResponse.user as User);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const registerBusiness = async (businessData: any) => {
    try {
      // API call to register business endpoint would go here
      // For demo purposes, we're simulating a successful registration
      const mockResponse = {
        access_token: 'new_merchant_mock_token',
        refresh_token: 'new_merchant_mock_refresh_token',
        user: {
          id: '4',
          email: businessData.email,
          name: businessData.name,
          role: 'merchant'
        }
      };
      
      setAccessToken(mockResponse.access_token);
      setRefreshToken(mockResponse.refresh_token);
      setUser(mockResponse.user as User);
      return true;
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
  };

  const refreshTokenFunc = async () => {
    if (!refreshToken) return false;
    try {
      // API call to refresh token endpoint would go here
      // For demo purposes, we're simulating a successful token refresh
      const mockResponse = {
        access_token: `refreshed_${refreshToken.split('_')[0]}_token`
      };
      
      setAccessToken(mockResponse.access_token);
      return true;
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
