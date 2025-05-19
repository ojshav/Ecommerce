import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag, CalendarClock, FileDigit, HelpCircle, Mail } from 'lucide-react';

const CancellationPolicy: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('orderCancellation');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const PolicySection = ({ 
    id, 
    title, 
    icon, 
    children 
  }: { 
    id: string; 
    title: string; 
    icon: React.ReactNode; 
    children: React.ReactNode 
  }) => {
    const isOpen = openSection === id;
    
    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:shadow-md">
        <button 
          onClick={() => toggleSection(id)}
          className={`w-full flex items-center justify-between p-5 text-left transition-colors duration-300 ${isOpen ? 'bg-blue-50 border-b border-gray-200' : 'bg-white'}`}
        >
          <div className="flex items-center space-x-3">
            <div className={`${isOpen ? 'text-blue-600' : 'text-gray-500'}`}>
              {icon}
            </div>
            <h2 className={`text-xl font-semibold ${isOpen ? 'text-blue-600' : 'text-gray-800'}`}>{title}</h2>
          </div>
          <div className="text-gray-500">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-5 bg-white">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Cancellation Policy</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We strive to make cancellations easy and transparent. Please review our policies below.
        </p>
      </div>
      
      <PolicySection 
        id="orderCancellation" 
        title="Order Cancellation" 
        icon={<ShoppingBag size={24} />}
      >
        <p className="text-gray-700 mb-4">
          We understand that circumstances may change. You can cancel your order under the following conditions:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</div>
            <p className="text-gray-700">Orders can be cancelled within 24 hours of placement for a full refund.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</div>
            <p className="text-gray-700">Orders that have not yet been shipped can be cancelled for a full refund minus any processing fees.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mt-0.5 mr-3 flex-shrink-0">!</div>
            <p className="text-gray-700">Orders that have been shipped cannot be cancelled, but may be returned according to our <span className="text-blue-600 underline cursor-pointer">Return Policy</span>.</p>
          </div>
        </div>
      </PolicySection>

      <PolicySection 
        id="subscriptionCancellation" 
        title="Subscription Cancellation" 
        icon={<CalendarClock size={24} />}
      >
        <p className="text-gray-700 mb-4">
          For subscription-based products or services:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</div>
            <p className="text-gray-700">You may cancel your subscription at any time through your account settings.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 mr-3 flex-shrink-0">i</div>
            <p className="text-gray-700">Cancellations will take effect at the end of your current billing cycle.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mt-0.5 mr-3 flex-shrink-0">!</div>
            <p className="text-gray-700">No partial refunds are provided for unused portions of the current billing period.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 mr-3 flex-shrink-0">i</div>
            <p className="text-gray-700">Annual subscriptions cancelled within 14 days of purchase may be eligible for a prorated refund.</p>
          </div>
        </div>
      </PolicySection>

      <PolicySection 
        id="digitalProducts" 
        title="Digital Products" 
        icon={<FileDigit size={24} />}
      >
        <p className="text-gray-700 mb-4">
          For digital products or downloadable items:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mt-0.5 mr-3 flex-shrink-0">!</div>
            <p className="text-gray-700">Due to the nature of digital products, all sales are final once the product has been downloaded or accessed.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 flex-shrink-0">✓</div>
            <p className="text-gray-700">If you have not downloaded or accessed the digital product, you may request a cancellation within 24 hours of purchase.</p>
          </div>
        </div>
      </PolicySection>

      <PolicySection 
        id="requestCancellation" 
        title="How to Request a Cancellation" 
        icon={<Mail size={24} />}
      >
        <p className="text-gray-700 mb-4">
          To cancel an order or subscription:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mt-0.5 mr-3 flex-shrink-0">1</div>
            <p className="text-gray-700">Log into your account and navigate to "Order History" or "Subscriptions".</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mt-0.5 mr-3 flex-shrink-0">2</div>
            <p className="text-gray-700">Select the order or subscription you wish to cancel.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mt-0.5 mr-3 flex-shrink-0">3</div>
            <p className="text-gray-700">Click the "Cancel" button and follow the prompts.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mt-0.5 mr-3 flex-shrink-0">4</div>
            <p className="text-gray-700">Alternatively, contact our customer support team at <span className="text-blue-600">support@yourstore.com</span> or call us at <span className="text-blue-600">(555) 123-4567</span>.</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex">
            <div className="text-blue-600 flex-shrink-0 mr-3">
              <HelpCircle size={24} />
            </div>
            <div>
              <p className="text-blue-800 font-medium">Need help with cancellation?</p>
              <p className="text-blue-700 text-sm mt-1">Our support team is available 24/7 to assist you with the cancellation process.</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </PolicySection>

      <PolicySection 
        id="exceptions" 
        title="Exceptions and Special Circumstances" 
        icon={<HelpCircle size={24} />}
      >
        <p className="text-gray-700 mb-4">
          We understand that exceptional circumstances may arise. Please contact our customer support team if:
        </p>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-3 flex-shrink-0">•</div>
            <p className="text-gray-700">You need to cancel due to a medical emergency.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-3 flex-shrink-0">•</div>
            <p className="text-gray-700">The product received is significantly different from what was advertised.</p>
          </div>
          <div className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mt-0.5 mr-3 flex-shrink-0">•</div>
            <p className="text-gray-700">There was an error in processing your order.</p>
          </div>
        </div>
        <p className="text-gray-700">
          We review these situations on a case-by-case basis and strive to find a fair resolution.
        </p>
      </PolicySection>

      <div className="mt-8 p-5 border-t border-gray-200 text-sm text-gray-600">
        <p className="mb-1">Last Updated: May 16, 2025</p>
        <p>This cancellation policy is subject to change. Please check back regularly for updates.</p>
      </div>
    </div>
  );
};

export default CancellationPolicy;