import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Call login API endpoint matching your Flask backend
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }
      
      // Create user object from response
      const userObj = {
        id: data.user?.id || 'unknown',
        email: data.user?.email || email,
        name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'User',
        role: (data.user?.role === 'MERCHANT' ? 'merchant' : 
               data.user?.role === 'ADMIN' ? 'admin' : 'customer') as 'merchant' | 'customer' | 'admin',
        businessName: data.user?.businessName || ''
      };
      
      // Update auth context with the received tokens and user data
      const success = await setAuthState({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: userObj
      });
      
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/password/reset-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }
      
      setError('Password reset email sent. Please check your inbox.');
      setShowForgotPassword(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const id_token = credentialResponse.credential;
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Google sign-in failed');
      
      // Create user object from response
      const userObj = {
        id: data.user?.id || 'unknown',
        email: data.user?.email || '',
        name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'User',
        role: (data.user?.role === 'MERCHANT' ? 'merchant' : 
               data.user?.role === 'ADMIN' ? 'admin' : 'customer') as 'merchant' | 'customer' | 'admin',
        businessName: data.user?.businessName || ''
      };
      
      // Update auth context with tokens and user data
      const success = await setAuthState({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: userObj
      });
      
      if (success) navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in error');
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in was unsuccessful. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-2">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* Registered Customers */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 md:p-10">
          <h2 className="text-xl font-semibold mb-2">Registered Customers</h2>
          <p className="text-gray-600 mb-6 text-sm">If you have an account, sign in with your email address.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                  placeholder="Type your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                    placeholder="Type your password"
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#F2631F] focus:ring-[#F2631F] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                  I agree to the Terms and Conditions and Privacy Policy
                </label>
              </div>
              <div className="flex items-center justify-between mb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F2631F] hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#F2631F] hover:text-orange-600 font-medium"
                >
                  Forgot Password
                </button>
              </div>
              <div className="text-xs text-gray-400">*Required Fields</div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                  placeholder="Type your email"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#F2631F] text-white py-2 px-4 rounded-md font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          )}

          <div className="my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="px-2 text-gray-400 text-xs">or</span>
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin_with"
                shape="rectangular"
                logo_alignment="center"
              />
            </div>
          </div>
        </div>
        {/* New Customers */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 md:p-10 flex flex-col items-start justify-start min-h-[400px] mt-0 md:mt-12">
          <h2 className="text-xl font-semibold mb-2">New Customers</h2>
          <p className="text-gray-600 mb-6 text-sm max-w-xs">Creating an account has many benefits: check out faster, keep more than one address, track orders and more.</p>
          <Link
            to="/signup"
            className="bg-[#F2631F] hover:bg-orange-600 text-white py-2 px-6 rounded-md font-medium transition-colors"
          >
            Create An Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
