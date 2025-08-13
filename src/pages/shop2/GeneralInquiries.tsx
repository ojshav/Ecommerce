import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const GeneralInquiries = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">General Inquiries</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                We're here to help! Whether you have questions about our products, need assistance with an order, 
                or just want to say hello, our team is ready to assist you.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Customer Service</h3>
                  <div className="space-y-2 text-blue-800">
                    <p><strong>Email:</strong> help@aoin.com</p>
                    <p><strong>Phone:</strong> 1-800-AOIN-HELP</p>
                    <p><strong>Live Chat:</strong> Available during business hours</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">General Inquiries</h3>
                  <div className="space-y-2 text-green-800">
                    <p><strong>Email:</strong> info@aoin.com</p>
                    <p><strong>Phone:</strong> 1-800-AOIN-INFO</p>
                    <p><strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Form</h2>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="order">Order Status</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                      I would like to receive updates about new products, sales, and exclusive offers from AOIN.
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-futura font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">How can I track my order?</h3>
                  <p className="text-gray-700">
                    You can track your order by logging into your account and visiting the order history section, 
                    or by using the tracking number sent to your email.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">What is your return policy?</h3>
                  <p className="text-gray-700">
                    We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Do you ship internationally?</h3>
                  <p className="text-gray-700">
                    Yes, we ship to select international destinations including Canada, UK, Australia, and select European countries.
                  </p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">How can I change my order?</h3>
                  <p className="text-gray-700">
                    Orders can be modified within 1 hour of placement. After that, please contact customer service immediately.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Response Times</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Email</h3>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Live Chat</h3>
                  <p className="text-gray-600">Immediate response</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Phone</h3>
                  <p className="text-gray-600">During business hours</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Visit Our Stores</h2>
              <p className="text-gray-700 mb-4">
                Prefer to speak with someone in person? Visit one of our physical stores for personalized assistance.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Store Locations:</strong> New York, Los Angeles, Chicago, Miami, San Francisco, Austin<br />
                  <strong>Store Hours:</strong> Monday - Saturday: 10 AM - 8 PM, Sunday: 11 AM - 6 PM<br />
                  <strong>Find a Store:</strong> <Link to="/shop2/stores" className="text-blue-600 hover:text-blue-800 underline">View all locations</Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GeneralInquiries;
