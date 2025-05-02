import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would connect to backend in real implementation
    console.log('Email submitted:', email);
    
    // Reset the form
    setEmail('');
    
    // Provide feedback to user (in a real app this would be a proper toast or alert)
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="bg-gray-200 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold mb-2">img</div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="space-y-4">
                <div className="h-2 w-1/2 bg-white"></div>
                <div className="h-2 w-3/4 bg-white"></div>
                <div className="h-2 w-2/3 bg-white"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 rounded-md border-0"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;