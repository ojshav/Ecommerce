import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  status: string;
  deliveryDate: string;
  orderDate: string;
  productName: string;
  imageUrl: string;
}

const Refund: React.FC = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;
  
  const [isRefundExpanded, setIsRefundExpanded] = useState(false);

  const refundDetails = {
    totalAmount: 179.99,
    refundedAmount: 179.99,
    price: 179.99,
    upiAccount: 'upi@bank'
  };

  const pickupAddress = "456 Oak Avenue, Apt 7C, Willow Creek, CA 94952";

  const handleExchangeClick = () => {
    navigate(`/exchange/${orderId}`, { state: { order } });
  };

  const faqs = [
    {
      question: "When will I receive my refund?",
      answer: "Refunds are typically processed within 7-10 business days after the returned item is received and inspected. The exact timing may vary depending on your bank or payment provider."
    },
    {
      question: "What if the refund amount is incorrect?",
      answer: "If you believe there's an error in your refund amount, please contact our customer support team with your order details."
    },
    {
      question: "How can I cancel my refund request?",
      answer: "You can cancel your refund request within 24 hours of submission through your order details page."
    }
  ];

  if (!order) {
    return <div className="container mx-auto px-4 py-8">Order not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-2 text-gray-600 mb-6">
        <span>Orders</span>
        <span>/</span>
        <span>Refund</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Refund Details</h1>
        <p className="text-gray-600 text-sm">View the details of your refund request and track its progress</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="w-64 h-64 mb-2 mx-auto overflow-hidden rounded-lg bg-orange-500">
            <img
              src={order.imageUrl || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'}
              alt={order.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-medium">Product Name: {order.productName}</h2>
          <p className="text-sm text-gray-600">Order Number: {order.id}</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Refund Status */}
        <div>
          <h3 className="font-medium mb-2">Refund Status: In Progress</h3>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full w-1/2 bg-orange-500"></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Your refund is being processed and will be credited to your account soon.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleExchangeClick}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Exchange
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Refund
            </button>
          </div>
        </div>

        {/* Refund Summary */}
        <div>
          <h3 className="font-medium mb-4">Refund Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span>${refundDetails.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Refunded Amount</span>
              <span>${refundDetails.refundedAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span>${refundDetails.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">UPI Account</span>
              <span>{refundDetails.upiAccount}</span>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg">
            Buy Again
          </button>
        </div>

        {/* Pickup Address */}
        <div>
          <h3 className="font-medium mb-4">Pickup Address</h3>
          <p className="text-gray-600 mb-4">{pickupAddress}</p>
          <div className="flex justify-between">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">
              Get Invoice
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Track Progress
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="font-medium mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full text-left p-4 flex items-center justify-between"
                  onClick={() => setIsRefundExpanded(index === (isRefundExpanded ? -1 : index))}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isRefundExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isRefundExpanded && (
                  <div className="px-4 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund; 