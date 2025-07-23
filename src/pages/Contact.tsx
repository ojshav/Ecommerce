import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, CreditCard, HelpCircle, FileText, UserCheck, MessageCircle } from 'lucide-react';
import MessengerPopup from '../components/MessengerPopup';
import { useAuth } from '../context/useAuth';

const topics = [
  { label: 'Order Related', icon: <ShoppingBag className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { label: 'Shopping', icon: <FileText className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { label: 'AOIN Account', icon: <User className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { label: 'Payments', icon: <CreditCard className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { label: 'Sell On AOIN', icon: <UserCheck className="w-8 h-8 text-[#F2631F] mx-auto" /> },
  { label: 'Others', icon: <HelpCircle className="w-8 h-8 text-[#F2631F] mx-auto" /> },
];

const Contact: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FFE7DB] py-10 px-2 font-worksans">
      {/* Sign In Prompt */}
      {!isAuthenticated && (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4 flex items-center gap-4 mb-8 border border-gray-100">
          <User className="w-8 h-8 text-[#F2631F]" />
          <div className="flex-1">
            <div className="font-semibold text-black">Getting help is easy</div>
            <div className="text-gray-500 text-sm">Sign in to get help with recent orders</div>
          </div>
          <button
            className="bg-[#F2631F] hover:bg-[#d44f12] text-white font-medium px-6 py-2 rounded-lg transition-colors"
            onClick={() => navigate('/sign-in')}
          >
            Sign in
          </button>
        </div>
      )}

      {/* Browse Topics */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-black">Browse Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {topics.map((topic) => (
            <Link
              to="/RaiseTicket"
              key={topic.label}
              className="bg-white rounded-xl border border-gray-100 shadow hover:shadow-md transition-shadow flex flex-col items-center justify-center p-8 text-center group hover:border-[#F2631F]"
            >
              {topic.icon}
              <span className="mt-4 text-base font-medium text-black group-hover:text-[#F2631F]">{topic.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Need more help? */}
      <div className="max-w-2xl mx-auto mt-10">
        <h3 className="text-lg font-semibold mb-3 text-black">Need more help?</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-[#F2631F]" />
            <div>
              <div className="font-medium text-black">Chat with us</div>
              <div className="text-gray-500 text-sm">Get instant query assistance</div>
            </div>
          </div>
          <button
            className="ml-4 bg-[#F2631F] hover:bg-[#d44f12] text-white font-medium px-6 py-2 rounded-lg transition-colors"
            onClick={() => navigate('/RaiseTicket')}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact; 