import React, { useState } from 'react';

interface SectionHeaderProps {
  id: string;
  title: string;
}

interface SectionContentProps {
  id: string;
  children: React.ReactNode;
}

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState<string>("introduction");
  
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? "" : sectionId);
  };

  const SectionHeader: React.FC<SectionHeaderProps> = ({ id, title }) => (
    <div 
      className="flex items-center justify-between p-4 cursor-pointer bg-white border-l-4 border-[#FF4D00] shadow-sm hover:bg-gray-50 transition-colors mb-2"
      onClick={() => toggleSection(id)}
    >
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      <svg 
        className={`w-5 h-5 text-[#FF4D00] transform transition-transform ${expandedSection === id ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  );
  
  const SectionContent: React.FC<SectionContentProps> = ({ id, children }) => (
    <div 
      className={`bg-white overflow-hidden transition-all duration-300 ${
        expandedSection === id 
          ? 'max-h-screen p-5 opacity-100 mb-6 border-l border-r border-b border-gray-200 shadow-sm rounded-b-lg' 
          : 'max-h-0 p-0 opacity-0'
      }`}
    >
      {children}
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-16">
        <div className="text-center mb-12">
          <h1 className="text-[36px] font-medium text-[#FF4D00] mb-2">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. This document explains how we collect, use, and protect your data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <p className="text-gray-700">
            Last updated: <span className="font-medium">May 16, 2025</span>
          </p>
          <p className="text-gray-700 mt-2">
            Please read this privacy policy carefully as it will help you understand what we do with the information we collect.
          </p>
        </div>
        
        <div className="space-y-2">
          <SectionHeader id="introduction" title="Introduction" />
          <SectionContent id="introduction">
            <p className="text-gray-700">
              Thank you for choosing AUIN. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share your information when you visit our website, use our services, or make purchases through AUIN's platform.
            </p>
          </SectionContent>

          <SectionHeader id="information-collection" title="Information We Collect" />
          <SectionContent id="information-collection">
            <p className="text-gray-700 mb-4">
              We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our products, or otherwise contact us.
            </p>
            <h3 className="text-lg font-medium text-[#FF4D00] mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Name and contact information (email address, phone number, etc.)</li>
              <li>Billing and shipping address</li>
              <li>Payment information (stored securely through our payment processors)</li>
              <li>Account credentials</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>

            <h3 className="text-lg font-medium text-[#FF4D00] mb-2">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>IP address and device information</li>
              <li>Browser type and settings</li>
              <li>Referring website</li>
              <li>Pages you view and how you interact with our website</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </SectionContent>

          <SectionHeader id="information-use" title="How We Use Your Information" />
          <SectionContent id="information-use">
            <p className="text-gray-700 mb-4">
              We use your information for the following purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Processing</h3>
                <p className="text-gray-700">We use your information to process and fulfill your orders and provide customer support.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-700">We communicate with you about orders, products, and services.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Website Improvement</h3>
                <p className="text-gray-700">We analyze usage data to improve our website and services.</p>
              </div>
              <div className="bg-[#FFF9E5] p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing</h3>
                <p className="text-gray-700">We send marketing communications with your consent where required.</p>
              </div>
            </div>
          </SectionContent>

          <SectionHeader id="information-sharing" title="How We Share Your Information" />
          <SectionContent id="information-sharing">
            <p className="text-gray-700 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>AUIN's trusted payment processors to complete transactions</li>
              <li>AUIN's verified shipping partners to deliver your orders</li>
              <li>Service providers who assist in operating AUIN's platform</li>
              <li>Marketing partners (with your explicit consent)</li>
              <li>Law enforcement when required by applicable laws</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-[#FF4D00] p-4 rounded">
              <p className="text-gray-900 font-medium">
                AUIN does not sell your personal information to third parties.
              </p>
            </div>
          </SectionContent>

          <SectionHeader id="cookies" title="Cookies and Tracking Technologies" />
          <SectionContent id="cookies">
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600">Required for basic website functionality.</p>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600">Help us understand how visitors interact with our website.</p>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600">Used to deliver relevant advertisements and track campaign performance.</p>
              </div>
            </div>
          </SectionContent>

          <SectionHeader id="privacy-rights" title="Your Privacy Rights" />
          <SectionContent id="privacy-rights">
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Access</h3>
                <p className="text-gray-600 text-sm">Request access to your personal information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Correction</h3>
                <p className="text-gray-600 text-sm">Request correction of inaccurate information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Deletion</h3>
                <p className="text-gray-600 text-sm">Request deletion of your information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Objection</h3>
                <p className="text-gray-600 text-sm">Object to or restrict certain processing</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Data Portability</h3>
                <p className="text-gray-600 text-sm">Request transfer of your information</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <h3 className="font-medium text-[#FF4D00]">Consent Withdrawal</h3>
                <p className="text-gray-600 text-sm">Withdraw previously given consent</p>
              </div>
            </div>
            <p className="text-gray-700">
              To exercise these rights or for any privacy-related inquiries, please contact us at:
              <br />
              Email: privacy@auin.com
              <br />
              Phone: 1-800-AUIN-HELP (1-800-284-6435)
              <br />
              Address: AUIN Headquarters, 789 Fashion Avenue, Suite 1000, New York, NY 10018
            </p>
          </SectionContent>

          <SectionHeader id="data-security" title="Data Security" />
          <SectionContent id="data-security">
            <div className="flex items-start space-x-4">
              <div className="bg-[#FFF9E5] p-2 rounded-full">
                <svg className="w-6 h-6 text-[#FF4D00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </div>
            </div>
          </SectionContent>

          <SectionHeader id="childrens-privacy" title="Children's Privacy" />
          <SectionContent id="childrens-privacy">
            <p className="text-gray-700">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </SectionContent>

          <SectionHeader id="policy-updates" title="Updates to This Policy" />
          <SectionContent id="policy-updates">
            <p className="text-gray-700">
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
            </p>
          </SectionContent>

          <SectionHeader id="contact-us" title="Contact Us" />
          <SectionContent id="contact-us">
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or our practices, please contact us:
            </p>
            <div className="bg-[#FFF9E5] p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-900 font-medium">Example Company Inc.</p>
                  <p className="text-gray-700">123 Main Street</p>
                  <p className="text-gray-700">Anytown, ST 12345</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> privacy@example.com</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> (123) 456-7890</p>
                </div>
              </div>
            </div>
          </SectionContent>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;