import React, { useState } from 'react';
import { X } from 'lucide-react';

const MessengerPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Messenger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Popup Dialog */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
          <div className="bg-orange-500 p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Lets start's the Chats</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* AOIN Messages */}
            <div className="space-y-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold">AOIN</p>
                <p className="text-sm text-gray-600">
                  Welcome to AOIN! 🚗 Your premium automotive parts destination. Need help? Chat with us for immediate assistance
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold">AOIN</p>
                <p className="text-sm text-gray-600">
                  Welcome to AOIN! Your premium automotive parts destination. Need help? Chat with us for immediate assistance
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Chat Buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-6 h-6 mx-auto" />
              </button>
              <button className="flex-1 py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <img src="/messenger-icon.svg" alt="Messenger" className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessengerPopup; 