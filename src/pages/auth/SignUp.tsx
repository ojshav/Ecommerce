import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    if (!agreeToTerms) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          phone: phone || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || (data.details ? JSON.stringify(data.details) : 'Registration failed'));
      }

      if (data.access_token && data.refresh_token) {
        const success = await register(data.access_token, data.refresh_token);
        if (success) {
          navigate('/');
          return;
        }
      }
      
      // If no tokens, show verification pending page
      navigate('/verification-pending', { 
        state: { 
          email,
          message: 'Please check your email to verify your account. You will be automatically logged in after verification.'
        } 
      });
    } catch (err) {
      if (err instanceof Error) {
        setApiError(err.message || 'An error occurred during registration');
      } else {
        setApiError('An error occurred during registration');
      }
      console.error(err);
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
      
      // Pass the user data directly to register function
      const success = await register(data.access_token, data.refresh_token, data.user);
      if (success) {
        navigate('/');
      } else {
        throw new Error('Failed to complete Google sign-in');
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Google sign-in error');
    }
  };

  const handleGoogleError = () => {
    setApiError('Google sign-in was unsuccessful. Please try again.');
  };

  return (
    <div className="flex items-center justify-center bg-[#FAFAFA] px-2 pt-10 pb-8 py-8">
      <div className="w-full max-w-5xl bg-transparent flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* Personal Information */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 md:p-10">
          <h2 className="text-xl font-semibold mb-2">Create An Account</h2>
          <div className="mb-6">
            <h3 className="font-medium mb-2">Personal Information</h3>
            <form className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                    placeholder="Type your first name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                    placeholder="Type your last name"
                  />
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                  className="h-4 w-4 text-[#F2631F] focus:ring-[#F2631F] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                  I agree to the Terms and Conditions and Privacy Policy
                </label>
              </div>
            </form>
            <div className="my-4 flex items-center justify-center">
              <div className="w-full border-t border-gray-200"></div>
              <span className="px-2 text-gray-400 text-xs">or</span>
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="w-full flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                shape="rectangular"
                logo_alignment="center"
              />
            </div>
          </div>
        </div>
        {/* Sign In Information */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 md:p-10 flex flex-col items-start justify-start min-h-[400px] mt-0 md:mt-12">
          <h3 className="font-medium mb-2">Sign In Information</h3>
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {apiError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Re-enter The Password*</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent ${passwordError ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Type your password"
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div className="flex items-center mb-2">
              <input
                id="terms2"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
                className="h-4 w-4 text-[#F2631F] focus:ring-[#F2631F] border-gray-300 rounded"
              />
              <label htmlFor="terms2" className="ml-2 block text-xs text-gray-700">
                I agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F2631F] text-white py-2 px-4 rounded-md font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account...' : 'Create An Account'}
            </button>
            <div className="text-xs text-gray-400">*Required Fields</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;