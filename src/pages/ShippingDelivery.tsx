import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Truck, Clock, Globe, AlertCircle } from 'lucide-react';

const ShippingDelivery = () => {
  const [openSection, setOpenSection] = useState('shipping');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shipping & Delivery Policy</h1>
      
      <p className="text-gray-600 mb-8">
        Thank you for visiting our store. We are committed to providing you with a smooth and efficient 
        delivery experience. Please read our shipping and delivery policy below.
      </p>

      {/* Shipping Options Section */}
      <div className="mb-6 border border-gray-200 rounded-lg">
        <button 
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
          onClick={() => toggleSection('shipping')}
        >
          <div className="flex items-center">
            <Truck className="mr-3 text-blue-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Shipping Options</h2>
          </div>
          {openSection === 'shipping' ? 
            <ChevronUp className="text-gray-600" size={20} /> : 
            <ChevronDown className="text-gray-600" size={20} />
          }
        </button>
        
        {openSection === 'shipping' && (
          <div className="p-4 bg-white rounded-b-lg">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Standard Shipping</h3>
                <p className="text-gray-600">3-5 business days - $5.99</p>
                <p className="text-gray-600">Free on orders over $50</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Express Shipping</h3>
                <p className="text-gray-600">1-2 business days - $12.99</p>
              </div>
              
              <div className="pb-2">
                <h3 className="font-medium text-gray-800 mb-2">Next Day Delivery</h3>
                <p className="text-gray-600">Order by 2pm for next business day - $19.99</p>
                <p className="text-sm text-gray-500 mt-1">(Not available for all locations)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delivery Timeframes Section */}
      <div className="mb-6 border border-gray-200 rounded-lg">
        <button 
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
          onClick={() => toggleSection('timeframes')}
        >
          <div className="flex items-center">
            <Clock className="mr-3 text-blue-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Delivery Timeframes</h2>
          </div>
          {openSection === 'timeframes' ? 
            <ChevronUp className="text-gray-600" size={20} /> : 
            <ChevronDown className="text-gray-600" size={20} />
          }
        </button>
        
        {openSection === 'timeframes' && (
          <div className="p-4 bg-white rounded-b-lg">
            <p className="text-gray-600 mb-4">
              Delivery times are estimated based on your location and chosen shipping method. Please note that 
              these are business days (Monday-Friday, excluding holidays).
            </p>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Processing Time</h3>
                <p className="text-gray-600">Most orders are processed within 24 hours (M-F)</p>
                <p className="text-gray-600">During peak seasons or promotions, processing may take 1-2 additional days</p>
              </div>
              
              <div className="pb-2">
                <h3 className="font-medium text-gray-800 mb-2">Tracking Information</h3>
                <p className="text-gray-600">You'll receive a tracking number via email once your order ships</p>
                <p className="text-gray-600">You can also check order status in your account dashboard</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* International Shipping Section */}
      <div className="mb-6 border border-gray-200 rounded-lg">
        <button 
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
          onClick={() => toggleSection('international')}
        >
          <div className="flex items-center">
            <Globe className="mr-3 text-blue-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">International Shipping</h2>
          </div>
          {openSection === 'international' ? 
            <ChevronUp className="text-gray-600" size={20} /> : 
            <ChevronDown className="text-gray-600" size={20} />
          }
        </button>
        
        {openSection === 'international' && (
          <div className="p-4 bg-white rounded-b-lg">
            <p className="text-gray-600 mb-4">
              We ship to most international destinations. Please be aware that international shipping may involve 
              additional customs fees, taxes, or duties that are your responsibility.
            </p>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">International Standard</h3>
                <p className="text-gray-600">7-14 business days - $14.99 to $29.99 (based on destination)</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">International Express</h3>
                <p className="text-gray-600">3-7 business days - $24.99 to $49.99 (based on destination)</p>
              </div>
              
              <div className="pb-2">
                <h3 className="font-medium text-gray-800 mb-2">Countries We Don't Ship To</h3>
                <p className="text-gray-600">Due to shipping restrictions, we currently don't ship to certain countries.</p>
                <p className="text-gray-600">Please contact our customer service for the current list.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Policies Section */}
      <div className="mb-6 border border-gray-200 rounded-lg">
        <button 
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-t-lg"
          onClick={() => toggleSection('policies')}
        >
          <div className="flex items-center">
            <AlertCircle className="mr-3 text-blue-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Shipping Policies</h2>
          </div>
          {openSection === 'policies' ? 
            <ChevronUp className="text-gray-600" size={20} /> : 
            <ChevronDown className="text-gray-600" size={20} />
          }
        </button>
        
        {openSection === 'policies' && (
          <div className="p-4 bg-white rounded-b-lg">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Order Changes</h3>
                <p className="text-gray-600">Changes to orders can only be made within 1 hour of placing your order</p>
                <p className="text-gray-600">Contact customer service immediately to request changes</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Undeliverable Packages</h3>
                <p className="text-gray-600">Please ensure your shipping address is correct</p>
                <p className="text-gray-600">If a package is returned as undeliverable, we'll contact you about reshipping (additional fees may apply)</p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-medium text-gray-800 mb-2">Lost or Damaged Packages</h3>
                <p className="text-gray-600">Please report any lost or damaged items within 7 days of the expected delivery date</p>
                <p className="text-gray-600">We'll work with you to resolve the issue promptly</p>
              </div>
              
              <div className="pb-2">
                <h3 className="font-medium text-gray-800 mb-2">Address Verification</h3>
                <p className="text-gray-600">We use address verification systems to ensure accurate delivery</p>
                <p className="text-gray-600">If there's a discrepancy, our customer service team may contact you</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Need More Help?</h2>
        <p className="text-blue-600">
          If you have any questions about shipping or delivery, please contact our customer service team 
          at <span className="font-medium">support@yourstore.com</span> or call us at <span className="font-medium">1-800-123-4567</span>.
        </p>
      </div>
    </div>
  );
};

export default ShippingDelivery;