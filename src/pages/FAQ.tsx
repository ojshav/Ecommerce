import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ Item component with accordion behavior
const FAQItem: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  // FAQ data
  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the steps to provide shipping and payment information to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secure and encrypted for your safety."
    },
    {
      question: "How long will it take to receive my order?",
      answer: "Delivery times vary depending on your location. Standard shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders. Express shipping options are available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Please visit our Returns & Refunds page for more details and to initiate a return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'Order History' section or using our 'Track Order' feature."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see shipping options and costs during checkout."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately if you need to make changes. Once an order has been processed, we cannot guarantee changes can be made."
    },
    {
      question: "Are there any discounts for bulk orders?",
      answer: "Yes, we offer special pricing for bulk orders. Please contact our sales team at sales@example.com with your requirements for a custom quote."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team via email at support@example.com, by phone at (123) 456-7890 during business hours (9 AM - 5 PM EST, Monday-Friday), or through the contact form on our website."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout and even include a personalized message."
    }
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-10">
            Find answers to common questions about our products, ordering, shipping, and more.
          </p>
          
          {/* Search bar */}
          <div className="mb-10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for questions..." 
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* FAQ Items */}
          <div className="space-y-1">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          
          {/* Contact section */}
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              If you couldn't find the answer to your question, please contact our support team.
            </p>
            <button className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 