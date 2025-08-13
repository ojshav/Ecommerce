import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const ReturnsRefunds = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Returns & Refunds</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Return Policy</h2>
              <p className="text-gray-700 mb-6">
                We want you to love your purchase. If you're not completely satisfied, we accept returns within 30 days of delivery.
              </p>
              
              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">Easy Returns</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• 30-day return window</li>
                  <li>• Free return shipping</li>
                  <li>• Full refund or exchange</li>
                  <li>• No restocking fees</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Return Requirements</h2>
              <div className="space-y-4 text-gray-700">
                <p>• Item must be unworn and unwashed</p>
                <p>• Original tags must be attached</p>
                <p>• Item must be in original packaging</p>
                <p>• Return must be initiated within 30 days</p>
                <p>• Proof of purchase required</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">How to Return</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gray-600">1</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Initiate Return</h3>
                  <p className="text-sm text-gray-600">Log into your account and select the item you want to return</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gray-600">2</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Print Label</h3>
                  <p className="text-sm text-gray-600">Print the prepaid shipping label and package your item</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gray-600">3</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Ship & Refund</h3>
                  <p className="text-sm text-gray-600">Drop off your package and receive your refund within 5-7 days</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Refund Information</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Refund Timeline</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Refunds are processed within 5-7 business days of receiving your return</li>
                  <li>• Credit card refunds may take 3-5 additional business days to appear on your statement</li>
                  <li>• PayPal refunds are typically processed within 24 hours</li>
                  <li>• You'll receive an email confirmation when your refund is processed</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Non-Returnable Items</h2>
              <div className="bg-red-50 p-6 rounded-lg">
                <p className="text-red-800 mb-4">The following items cannot be returned:</p>
                <ul className="space-y-2 text-red-800">
                  <li>• Sale items marked as "Final Sale"</li>
                  <li>• Gift cards</li>
                  <li>• Personalized or custom items</li>
                  <li>• Items that have been worn, washed, or damaged</li>
                  <li>• Items without original tags or packaging</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Exchanges</h2>
              <p className="text-gray-700 mb-4">
                Need a different size or color? We offer free exchanges for the same item in a different size or color, 
                subject to availability.
              </p>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-yellow-800">
                  <strong>Note:</strong> Exchanges are processed as a return and new purchase. 
                  You'll be charged for the new item and refunded for the returned item.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Have questions about returns or refunds? Our customer service team is here to help.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> returns@aoin.com<br />
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

export default ReturnsRefunds;
