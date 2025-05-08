import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 text-center mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to ShopEasy. These Terms and Conditions govern your use of the ShopEasy website and services. 
              By accessing or using our website, you agree to be bound by these Terms. Please read them carefully.
            </p>
            
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the ShopEasy website, mobile applications, or any other features, technologies, or 
              functionalities offered by ShopEasy on our website or through any other means (collectively, "Services"), 
              you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
              you may not access or use our Services.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any material changes by 
              updating the "Last Updated" date at the top of this page. Your continued use of the Services after such 
              modifications will constitute your acknowledgment and acceptance of the modified Terms.
            </p>
            
            <h2>Account Registration</h2>
            <p>
              To access certain features of our Services, you may be required to register for an account. You agree to 
              provide accurate, current, and complete information during the registration process and to update such 
              information to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your password and for all activities that occur under your account. 
              You agree to notify ShopEasy immediately of any unauthorized use of your account or any other breach of security.
            </p>
            
            <h2>User Conduct</h2>
            <p>
              When using our Services, you agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Use the Services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
              <li>Attempt to gain unauthorized access to any portion of the Services</li>
              <li>Use any robot, spider, scraper, or other automated means to access the Services</li>
              <li>Create or submit unwanted email, comments, or other forms of commercial or harassing communications</li>
              <li>Impersonate any person or entity</li>
            </ul>
            
            <h2>Products and Services</h2>
            <p>
              ShopEasy strives to display product descriptions, images, and pricing as accurately as possible. However, 
              we do not guarantee that all information is complete or correct. In the event of a pricing error, ShopEasy 
              reserves the right to refuse or cancel any orders placed for products listed at the incorrect price.
            </p>
            <p>
              Availability of products and delivery times shown on our website are estimates only and are not guaranteed. 
              We reserve the right to limit the quantities of any products that we offer.
            </p>
            
            <h2>Ordering and Payment</h2>
            <p>
              When you place an order, you offer to purchase the product at the price indicated. Our acceptance of your 
              order happens when we send you an order confirmation email. We reserve the right to refuse or cancel any 
              order for any reason at any time.
            </p>
            <p>
              You agree to provide current, complete, and accurate purchase and account information for all purchases 
              made through our site. You agree to promptly update your account and other information, including your 
              email address and credit card information, so that we can complete your transactions and contact you as needed.
            </p>
            
            <h2>Shipping and Delivery</h2>
            <p>
              ShopEasy will make every effort to ship products within the estimated timeframes. However, shipping times 
              are estimates and not guarantees. ShopEasy is not responsible for delays due to shipping carrier issues, 
              weather, or other circumstances beyond our control.
            </p>
            <p>
              For more information about our shipping practices, please review our Shipping Policy.
            </p>
            
            <h2>Returns and Refunds</h2>
            <p>
              ShopEasy offers a 30-day return policy for most items. Some products have specific return conditions that 
              will be noted in the product description or in our Returns & Refunds Policy.
            </p>
            <p>
              For detailed information on our return process, eligible items, and refund methods, please review our 
              Returns & Refunds Policy.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The Services and all contents, including but not limited to text, images, graphics, logos, icons, audio 
              clips, and software, are the property of ShopEasy or its content suppliers and protected by United States 
              and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              The trademarks, service marks, and logos used and displayed on our Services are registered and unregistered 
              trademarks of ShopEasy and others. Nothing on our Services should be construed as granting any license or 
              right to use any trademarks without the prior written permission of ShopEasy.
            </p>
            
            <h2>Disclaimer of Warranties</h2>
            <p>
              THE SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS, AND SERVICES INCLUDED ON OR OTHERWISE MADE 
              AVAILABLE TO YOU THROUGH THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, UNLESS OTHERWISE 
              SPECIFIED IN WRITING. SHOPEASY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO 
              THE OPERATION OF THE SERVICES, OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS, OR SERVICES INCLUDED ON OR 
              OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICES.
            </p>
            <p>
              TO THE FULL EXTENT PERMISSIBLE BY LAW, SHOPEASY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT 
              NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              SHOPEASY WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SERVICES, INCLUDING, BUT 
              NOT LIMITED TO, DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE SPECIFIED 
              IN WRITING.
            </p>
            <p>
              CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN 
              DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY 
              NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
            </p>
            
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless ShopEasy, its officers, directors, employees, agents, 
              licensors, and suppliers from and against all losses, expenses, damages, and costs, including reasonable 
              attorneys' fees, resulting from any violation of these Terms or any activity related to your account 
              (including negligent or wrongful conduct) by you or any other person accessing the Services using your account.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without 
              giving effect to any principles of conflicts of law. Any dispute arising under or relating in any way to these 
              Terms will be resolved exclusively in the federal or state courts located in New York County, New York, and 
              you irrevocably consent to the jurisdiction of such courts.
            </p>
            
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain 
              in full force and the invalid or unenforceable provision will be limited or eliminated to the minimum extent 
              necessary.
            </p>
            
            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>ShopEasy, Inc.</strong><br />
              123 Commerce St, Suite 500<br />
              New York, NY 10001<br />
              Email: legal@shopeasy.com<br />
              Phone: 1-800-123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 