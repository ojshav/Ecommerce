import React, { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter a valid email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/superadmin/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to subscribe to newsletter');
      }

      setSuccess(true);
      setEmail('');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error subscribing to newsletter:', err);
      setError(err.message || 'Failed to subscribe to newsletter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 flex items-start justify-center pt-12 md:pt-16 pb-24 md:pb-40 lg:pb-[300px]">
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-16">
        {/* Left Image */}
        <div className="flex-shrink-0 w-full md:w-[50%]">
          <img 
            src="https://res.cloudinary.com/ddnb10zkq/image/upload/v1759516313/13ee1299-aa90-432e-afa0-957c87e250c5.png"
            alt="Four women in elegant blue and silver outfits"
            className="w-full h-auto md:w-[522px] md:h-[389px] object-cover rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h2 className="max-w-full text-[32px] sm:text-[42px] md:text-[48px] lg:text-[44px] leading-[1.3] font-playfair font-normal text-[#222]">
            Stay in the loop with <br />
            <em className="italic font-medium">exclusive offers, fashion news</em>, and more.
          </h2>

          <p className="mt-4 text-gray-600 text-base sm:text-lg mb-10 sm:mb-12">
            Subscribe to our Aoin newsletter!
          </p>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              Thank you for subscribing to our newsletter!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Email + Button with shared bottom line */}
          <form onSubmit={handleSubscribe} className="relative w-full mt-2">
            {/* Bottom border line */}
            <div className="absolute left-0 -bottom-3 w-full border-b border-black z-0" />

            {/* Input + Button aligned */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center relative z-10 gap-4 sm:gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 appearance-none bg-transparent border-none outline-none ring-0 focus:ring-0 text-base sm:text-lg text-gray-800 placeholder-[#636363] placeholder-text-[16px] px-1 py-2 disabled:opacity-50"
              />

              <button 
                type="submit"
                disabled={loading}
                className="bg-[#222] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] transition-colors"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubscribeSection;
