import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const GiftCards = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Gift Cards</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">The Perfect Gift</h2>
              <p className="text-gray-700 mb-6">
                Give the gift of style with AOIN gift cards. Perfect for any occasion, our gift cards 
                allow your loved ones to choose exactly what they want from our premium collection.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-purple-900">Gift Card Features</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Never expires</li>
                  <li>• Available in multiple denominations</li>
                  <li>• Can be used online and in stores</li>
                  <li>• Perfect for any occasion</li>
                  <li>• Instant delivery available</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Gift Card Options</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-6 rounded-lg text-center">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Digital Gift Cards</h3>
                  <p className="text-gray-600 mb-4">Instant delivery via email</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Sent immediately</li>
                    <li>• Eco-friendly</li>
                    <li>• Easy to forward</li>
                    <li>• Perfect for last-minute gifts</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg text-center">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📬</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Physical Gift Cards</h3>
                  <p className="text-gray-600 mb-4">Beautiful printed cards</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Premium packaging</li>
                    <li>• Personalized message</li>
                    <li>• 3-5 business days delivery</li>
                    <li>• Perfect for special occasions</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg text-center">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Gift Card Sets</h3>
                  <p className="text-gray-600 mb-4">Multiple cards for multiple recipients</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Bulk discounts available</li>
                    <li>• Corporate gifting</li>
                    <li>• Team rewards</li>
                    <li>• Event favors</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Denominations</h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg text-center">
                  <h3 className="font-futura font-semibold text-gray-800">$25</h3>
                  <p className="text-sm text-gray-600">Perfect for small treats</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg text-center">
                  <h3 className="font-futura font-semibold text-gray-800">$50</h3>
                  <p className="text-sm text-gray-600">Great for accessories</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg text-center">
                  <h3 className="font-futura font-semibold text-gray-800">$100</h3>
                  <p className="text-sm text-gray-600">Perfect for a complete outfit</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg text-center">
                  <h3 className="font-futura font-semibold text-gray-800">$250</h3>
                  <p className="text-sm text-gray-600">Premium shopping experience</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700">
                  <strong>Custom amounts available:</strong> Choose any amount between $10 and $1000
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">How to Purchase</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Choose Your Gift Card</h3>
                    <p className="text-gray-700">Select the denomination and delivery method that works best for you.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Personalize Your Message</h3>
                    <p className="text-gray-700">Add a personal message to make your gift extra special.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Complete Your Purchase</h3>
                    <p className="text-gray-700">Check out securely and your gift card will be delivered as specified.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">How to Use</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Online Shopping</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Enter gift card code at checkout</li>
                    <li>• Use for partial or full payment</li>
                    <li>• Combine with other payment methods</li>
                    <li>• Check balance anytime</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">In-Store Shopping</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Present physical card or code</li>
                    <li>• Available at all AOIN locations</li>
                    <li>• Get personalized assistance</li>
                    <li>• Immediate redemption</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Gift Card Terms</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-3 text-gray-800">Validity & Expiration</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Gift cards never expire</li>
                    <li>• No maintenance fees</li>
                    <li>• Valid for online and in-store purchases</li>
                    <li>• Cannot be redeemed for cash</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-3 text-gray-800">Usage & Restrictions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• One-time use per transaction</li>
                    <li>• Cannot be combined with other promotional codes</li>
                    <li>• Non-transferable and non-refundable</li>
                    <li>• Lost or stolen cards cannot be replaced</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-3 text-gray-800">Balance & Returns</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Check balance online or in stores</li>
                    <li>• Unused balance remains on card</li>
                    <li>• Returns credited back to original payment method</li>
                    <li>• Gift card purchases are final</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Corporate Gifting</h2>
              
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-futura font-semibold mb-3 text-gray-900">Bulk Gift Card Orders</h3>
                <p className="text-gray-700 mb-4">
                  Perfect for employee rewards, client appreciation, and corporate events. 
                  We offer special pricing and personalized service for bulk orders.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-futura font-semibold mb-2 text-gray-800">Benefits</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Volume discounts</li>
                      <li>• Custom branding options</li>
                      <li>• Dedicated account manager</li>
                      <li>• Flexible payment terms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-futura font-semibold mb-2 text-gray-800">Contact</h4>
                    <p className="text-gray-700">
                      <strong>Email:</strong> corporate@aoin.com<br />
                      <strong>Phone:</strong> 1-800-AOIN-CORP<br />
                      <strong>Minimum Order:</strong> 25 cards
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                Have questions about gift cards? Our customer service team is here to help.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> giftcards@aoin.com<br />
                  <strong>Phone:</strong> 1-800-AOIN-HELP<br />
                  <strong>Live Chat:</strong> Available during business hours<br />
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

export default GiftCards;
