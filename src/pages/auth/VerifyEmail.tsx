import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const isVerifying = useRef(false);

  useEffect(() => {
    const verifyEmailToken = async () => {
      // Prevent multiple verification attempts
      if (isVerifying.current || !token) return;
      isVerifying.current = true;

      try {
        const success = await verifyEmail(token);
        
        if (success) {
          setStatus('success');
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          throw new Error('Verification failed');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
      } finally {
        isVerifying.current = false;
      }
    };

    verifyEmailToken();
  }, [token, verifyEmail, navigate]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-sm overflow-hidden p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying your email...</h2>
              <div className="flex justify-center">
                <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
              <p className="text-gray-600 mb-4">Your email has been successfully verified. Redirecting you to the home page...</p>
              <div className="flex justify-center">
                <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/signup')}
                className="mt-4 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
              >
                Return to Sign Up
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail; 