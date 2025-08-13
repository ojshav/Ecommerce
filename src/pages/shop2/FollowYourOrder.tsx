import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const FollowYourOrder = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Follow Your Order</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Track Your Order</h2>
              <p className="text-gray-700 mb-6">
                Stay updated on your order status with real-time tracking information. 
                Get notifications at every step of your order journey.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Order Tracking Features</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Real-time order status updates</li>
                  <li>• Email and SMS notifications</li>
                  <li>• Detailed tracking information</li>
                  <li>• Estimated delivery dates</li>
                  <li>• Shipping carrier tracking</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">How to Track Your Order</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-gray-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-futura font-semibold mb-2">Log into Your Account</h3>
                      <p className="text-gray-700">Sign in to your AOIN account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-gray-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-futura font-semibold mb-2">Go to Order History</h3>
                      <p className="text-gray-700">Navigate to your order history section</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold text-gray-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-futura font-semibold mb-2">Select Your Order</h3>
                      <p className="text-gray-700">Click on the order you want to track</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-4 text-gray-800">Alternative Tracking</h3>
                  <p className="text-gray-700 mb-4">Don't have an account? Track your order using:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Order number</li>
                    <li>• Email address</li>
                    <li>• Tracking number</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Order Status Timeline</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-futura font-semibold text-gray-800">Order Confirmed</h3>
                    <p className="text-gray-600">Your order has been received and confirmed</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-futura font-semibold text-gray-800">Processing</h3>
                    <p className="text-gray-600">Your order is being prepared for shipment</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-futura font-semibold text-gray-800">Shipped</h3>
                    <p className="text-gray-600">Your order is on its way to you</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-futura font-semibold text-gray-800">Delivered</h3>
                    <p className="text-gray-600">Your order has been delivered</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Tracking Notifications</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">Email Notifications</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Order confirmation</li>
                    <li>• Shipping confirmation</li>
                    <li>• Delivery updates</li>
                    <li>• Delivery confirmation</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">SMS Notifications</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Shipping updates</li>
                    <li>• Delivery notifications</li>
                    <li>• Out for delivery alerts</li>
                    <li>• Delivery confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Common Tracking Questions</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">When will I receive my tracking number?</h3>
                  <p className="text-gray-700">You'll receive your tracking number via email once your order ships, typically within 1-2 business days of placing your order.</p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Why isn't my tracking number working?</h3>
                  <p className="text-gray-700">Tracking numbers may take 24-48 hours to become active in the carrier's system. If it's still not working after 48 hours, please contact us.</p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Can I change my delivery address?</h3>
                  <p className="text-gray-700">Address changes can only be made if your order hasn't shipped yet. Contact us immediately if you need to update your address.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                Having trouble tracking your order? Our customer service team is here to help.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> tracking@aoin.com<br />
                  <strong>Phone:</strong> 1-800-AOIN-HELP<br />
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
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

export default FollowYourOrder;
