import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const Subscription: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: [
        'Up to 100 product listings',
        'Basic analytics',
        'Email support',
        'Standard placement',
        '1 featured product per month'
      ],
      recommended: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      features: [
        'Up to 500 product listings',
        'Advanced analytics',
        'Priority email support',
        'Premium placement',
        '5 featured products per month',
        'Custom store branding',
        'Bulk product upload'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      features: [
        'Unlimited product listings',
        'Full analytics suite',
        '24/7 priority support',
        'Top placement priority',
        'Unlimited featured products',
        'Custom store branding',
        'Bulk product upload',
        'API access',
        'Dedicated account manager'
      ],
      recommended: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to boost your business visibility and sales. All plans include our core features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl shadow-lg overflow-hidden ${
              plan.recommended
                ? 'border-2 border-orange-500 transform scale-105'
                : 'border border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Recommended
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.recommended
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Plan?</h2>
        <p className="text-gray-600 mb-8">
          Contact our sales team for a tailored solution that fits your specific needs.
        </p>
        <button className="bg-gray-900 text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Contact Sales
        </button>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Can I change plans later?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for business accounts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Is there a setup fee?</h3>
            <p className="text-gray-600">No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer refunds?</h3>
            <p className="text-gray-600">Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 