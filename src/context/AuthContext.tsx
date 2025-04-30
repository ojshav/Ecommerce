import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Business } from '../types';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  business: Business | null;
  isAuthenticated: boolean;
  isBusinessAccount: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  businessLogin: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  registerBusiness: (businessData: Omit<Business, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    fullName: 'Demo User',
    password: 'password123' // In a real app, NEVER store plain text passwords
  }
];

const MOCK_BUSINESSES = [
  {
    id: '1',
    name: 'Demo Business',
    email: 'business@example.com',
    password: 'business123',
    phone: '123-456-7890',
    address: '123 Business St, City, State 12345',
    type: 'Retailer',
    taxId: 'TAX12345',
    owner: {
      fullName: 'Business Owner'
    }
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBusiness = localStorage.getItem('business');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage');
      }
    }
    
    if (storedBusiness) {
      try {
        setBusiness(JSON.parse(storedBusiness));
      } catch (error) {
        console.error('Failed to parse business from localStorage');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (mockUser) {
      const { password, ...userData } = mockUser;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Successfully logged in');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const businessLogin = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find business with matching credentials
    const mockBusiness = MOCK_BUSINESSES.find(b => b.email === email && b.password === password);
    
    if (mockBusiness) {
      const { password, ...businessData } = mockBusiness;
      setBusiness(businessData);
      localStorage.setItem('business', JSON.stringify(businessData));
      toast.success('Successfully logged in to business account');
      return true;
    } else {
      toast.error('Invalid business credentials');
      return false;
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error('Email already in use');
      return false;
    }
    
    // Create new user (in a real app, this would be sent to backend)
    const newUser = {
      id: Date.now().toString(),
      email,
      fullName,
      // In a real app, password would be hashed and not stored on client
    };
    
    MOCK_USERS.push({ ...newUser, password });
    
    // Log the user in
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('Account created successfully');
    return true;
  };

  const registerBusiness = async (businessData: Omit<Business, 'id'> & { password: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    if (MOCK_BUSINESSES.some(b => b.email === businessData.email)) {
      toast.error('Email already in use');
      return false;
    }
    
    // Create new business (in a real app, this would be sent to backend)
    const newBusiness = {
      id: Date.now().toString(),
      ...businessData
    };
    
    MOCK_BUSINESSES.push(newBusiness);
    
    // Log the business in
    const { password, ...businessWithoutPassword } = newBusiness;
    setBusiness(businessWithoutPassword);
    localStorage.setItem('business', JSON.stringify(businessWithoutPassword));
    toast.success('Business account created successfully');
    return true;
  };

  const logout = () => {
    setUser(null);
    setBusiness(null);
    localStorage.removeItem('user');
    localStorage.removeItem('business');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      business,
      isAuthenticated: !!user || !!business,
      isBusinessAccount: !!business,
      login,
      businessLogin,
      register,
      registerBusiness,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};