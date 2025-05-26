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
  const [showResend, setShowResend] = useState(false);

  // pull in login + resend helpers
  const { setAuthState, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setShowResend(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        // Successful login
        const userObj = {
          id: data.user?.id || 'unknown',
          email: data.user?.email || email,
          name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'User',
          role: (data.user?.role === 'MERCHANT'
            ? 'merchant'
            : data.user?.role === 'ADMIN'
            ? 'admin'
            : 'customer') as 'merchant' | 'customer' | 'admin',
          isEmailVerified: data.user?.is_email_verified ?? false,
        };

        const success = await setAuthState({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          user: userObj
        });
        if (success) navigate('/');
      } else {
        // Handle unverified-email case
        if (data.error_code === 'EMAIL_NOT_VERIFIED') {
          setError('Your email is not verified.');
          setShowResend(true);
        } else {
          throw new Error(data.error || 'Failed to sign in');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const ok = await resendVerificationEmail(email);
      if (ok) {
        setError('Verification email resent! Check your inbox.');
      } else {
        throw new Error('Unable to resend verification link');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending verification link');
    } finally {
      setIsSubmitting(false);
      setShowResend(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/password/reset-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send reset email');

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

      const userObj = {
        id: data.user?.id || 'unknown',
        email: data.user?.email || '',
        name: `${data.user?.first_name || ''} ${data.user?.last_name || ''}`.trim() || 'User',
        role: (data.user?.role === 'MERCHANT'
          ? 'merchant'
          : data.user?.role === 'ADMIN'
          ? 'admin'
          : 'customer') as 'merchant' | 'customer' | 'admin',
        isEmailVerified: data.user?.is_email_verified ?? false,
      };

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
          <p className="text-gray-600 mb-6 text-sm">
            If you have an account, sign in with your email address.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {showResend && !isSubmitting && (
            <div
              className="mb-4 text-sm text-[#F2631F] cursor-pointer hover:underline"
              onClick={handleResend}
            >
              Didn’t get a verification email? Resend link.
            </div>
          )}

          {!showForgotPassword ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* email & password fields */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                  placeholder="Type your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                  placeholder="Type your password"
                />
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
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {/* forgot-password form */}
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F2631F] focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
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

          {/* OR + Google login */}
          <div className="my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="px-2 text-gray-400 text-xs">or</span>
            <div className="w-full border-t border-gray-200" />
          </div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signin_with"
            shape="rectangular"
            logo_alignment="center"
          />
        </div>

        {/* New Customers card */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-8 md:p-10">
          <h2 className="text-xl font-semibold mb-2">New Customers</h2>
          <p className="text-gray-600 mb-6 text-sm max-w-xs">
            Creating an account has many benefits: check out faster, keep more than one address,
            track orders and more.
          </p>
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
