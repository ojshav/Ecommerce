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
              <button className="flex-1 py-3 bg-[#E6E6E6] rounded-lg hover:bg-[#DADADA] transition-colors">
                <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-6 h-6 mx-auto" />
              </button>
              <button className="flex-1 py-4 bg-[#F2F2F2] rounded-2xl hover:bg-[#E6E6E6] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H9V11H7V9ZM15 9H17V11H15V9ZM11 9H13V11H11V9Z" fill="#333333"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessengerPopup; 