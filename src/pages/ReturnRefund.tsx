import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, RotateCcw, CreditCard, Clock, Truck, AlertCircle } from 'lucide-react';

const ReturnRefund = () => {
  const [activeTab, setActiveTab] = useState('returns');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('eligibility');

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Reusable FAQ component
  const FaqItem = ({ id, question, children }: { id: string, question: string, children: React.ReactNode }) => {
    const isExpanded = expandedFaq === id;
    
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button 
          className="flex w-full justify-between items-center py-4 px-1 text-left focus:outline-none"
          onClick={() => toggleFaq(id)}
        >
          <h3 className="text-lg font-medium text-gray-900">{question}</h3>
          {isExpanded ? <ChevronUp size={20} className="text-[#FF4D00]" /> : <ChevronDown size={20} className="text-[#FF4D00]" />}
        </button>
        {isExpanded && (
          <div className="pb-4 text-gray-600">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Step component
  const Step = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 mt-1">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFF9E5] text-[#FF4D00]">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg text-gray-900 mb-1">{title}</h3>
        <div className="text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-16 xl:px-32 2xl:px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-[36px] font-medium text-[#FF4D00] mb-2">Returns & Refunds</h1>
          <p className="text-gray-600">We want you to be completely satisfied with your purchase</p>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'returns' ? 'text-[#FF4D00] border-b-2 border-[#FF4D00]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('returns')}
          >
            Returns Policy
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'refunds' ? 'text-[#FF4D00] border-b-2 border-[#FF4D00]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('refunds')}
          >
            Refund Process
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'faq' ? 'text-[#FF4D00] border-b-2 border-[#FF4D00]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>

        {/* Returns Policy Tab */}
        {activeTab === 'returns' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-medium mb-4 text-gray-900">AUIN Return Policy</h2>
              
              <p className="mb-6">
                At AUIN, we want you to love your purchase. We offer a hassle-free 45-day return policy for most items. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
              </p>
              
              <div className="bg-[#FFF9E5] p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2 text-gray-900">Items that cannot be returned:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Digital products and downloadable items</li>
                  <li>AUIN Gift cards</li>
                  <li>Personal care and intimate items</li>
                  <li>Custom-made or personalized products</li>
                  <li>Final sale items (marked as non-returnable)</li>
                  <li>Items damaged due to customer misuse</li>
                </ul>
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="font-medium text-gray-900">Return Timeline:</h3>
                <p>
                  To initiate a return, you must contact us within <strong>45 days</strong> of receiving your item. If more than 45 days have passed since delivery, we cannot offer you a refund or exchange.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2 text-gray-900">Return Process:</h3>
                <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                  <li>Log in to your AUIN account and visit the Orders section</li>
                  <li>Select the item(s) you wish to return</li>
                  <li>Choose your preferred return method</li>
                  <li>Print the prepaid return label (free for store credit, $7.95 for refund to original payment method)</li>
                  <li>Pack the item(s) securely with all original tags and packaging</li>
                  <li>Drop off the package at any authorized shipping location</li>
                </ol>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium mb-2 text-gray-900">Need Help?</h3>
                <p className="text-gray-700">
                  Contact our Returns Team:
                  <br />
                  Email: returns@auin.com
                  <br />
                  Phone: 1-800-AUIN-HELP (1-800-284-6435)
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4 text-gray-900">Return Process</h2>
              
              <div className="space-y-6">
                <Step icon={<Package size={20} />} title="Contact Us">
                  <p>
                    Email <a href="mailto:returns@yourstore.com" className="text-[#FF4D00] hover:underline">returns@yourstore.com</a> or visit your order history in your account to initiate the return process.
                  </p>
                </Step>
                
                <Step icon={<RotateCcw size={20} />} title="Receive Return Authorization">
                  <p>
                    We'll review your request and send you a return authorization with shipping instructions within 1-2 business days.
                  </p>
                </Step>
                
                <Step icon={<Truck size={20} />} title="Ship Your Return">
                  <p>
                    Package your items securely in the original packaging if possible. Include your order number and return authorization in the package.
                  </p>
                </Step>
                
                <Step icon={<Clock size={20} />} title="Wait for Processing">
                  <p>
                    Once we receive your return, we'll inspect the item and process your refund or exchange within 5 business days.
                  </p>
                </Step>
              </div>
            </div>
          </div>
        )}

        {/* Refunds Tab */}
        {activeTab === 'refunds' && (
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-medium mb-4 text-gray-900">Refund Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Processing Time:</h3>
                  <p>
                    Once your return is received and inspected, we'll send you an email to notify you that we've received your returned item. We'll also notify you of the approval or rejection of your refund.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Refund Method:</h3>
                  <p>
                    If your refund is approved, we'll initiate a refund to your original method of payment. Depending on your payment provider, refunds may take 5-10 business days to process.
                  </p>
                </div>
                
                <div className="bg-[#FFF9E5] p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Late or Missing Refunds:</h3>
                  <p className="text-gray-700">
                    If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4 text-gray-900">Refund Scenarios</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Complete Refunds:</h3>
                  <p>
                    If your item is approved for return in its original condition, we'll issue a full refund for the purchase price of the item.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Partial Refunds:</h3>
                  <p>
                    We may issue partial refunds if:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    <li>An item shows signs of use or handling beyond inspection</li>
                    <li>Items are not in their original condition or packaging</li>
                    <li>Items are missing parts or accessories</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Costs:</h3>
                  <p>
                    Original shipping costs are non-refundable unless your item was defective, damaged, or incorrectly shipped. Return shipping costs are the responsibility of the customer except in cases of defective items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium mb-6 text-gray-900">Frequently Asked Questions</h2>
            
            <div className="space-y-2">
              <FaqItem id="eligibility" question="How long do I have to return an item?">
                <p>
                  You have 30 days from the delivery date to initiate a return. After this period, we cannot offer you a refund or exchange.
                </p>
              </FaqItem>
              
              <FaqItem id="condition" question="What condition must the items be in?">
                <p>
                  Items must be in their original, unused condition with all tags attached and original packaging intact. We inspect all returns carefully before approving refunds.
                </p>
              </FaqItem>
              
              <FaqItem id="shipping" question="Who pays for return shipping?">
                <p>
                  In most cases, customers are responsible for return shipping costs. We only cover return shipping for defective, damaged, or incorrectly shipped items.
                </p>
              </FaqItem>
              
              <FaqItem id="exchange" question="Can I exchange instead of refund?">
                <p>
                  Yes, we offer exchanges for items of equal value. If you want to exchange for a different item, we recommend returning for a refund and placing a new order to avoid delays.
                </p>
              </FaqItem>
              
              <FaqItem id="giftreturn" question="How do I return a gift?">
                <p>
                  If you received an item as a gift, you can return it for store credit or an exchange. You'll need the order number or gift receipt. Contact our customer service team for assistance with gift returns.
                </p>
              </FaqItem>
              
              <FaqItem id="international" question="Do you accept international returns?">
                <p>
                  Yes, we accept international returns. However, international customers are responsible for return shipping costs, duties, and taxes. Please contact us before shipping to get a return authorization.
                </p>
              </FaqItem>
              
              <FaqItem id="trackreturn" question="How can I track my return or refund status?">
                <p>
                  Once your return has been processed, we'll send you an email notification. You can also check the status in your account under "Order History" or contact our customer service team.
                </p>
              </FaqItem>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-[#FF4D00]">
            <AlertCircle size={20} />
            <span>Need help with your return? <a href="mailto:help@yourstore.com" className="underline font-medium">Contact our support team</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefund;