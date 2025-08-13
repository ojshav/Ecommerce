import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Frequently Asked Questions</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">General Questions</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">What is AOIN?</h3>
                    <p className="text-gray-700">
                      AOIN is a premium fashion brand dedicated to creating timeless, sustainable, and high-quality clothing. 
                      We focus on essential pieces that are designed to last and make you feel confident.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Where are you located?</h3>
                    <p className="text-gray-700">
                      Our headquarters are in New York City, and we have physical stores across the United States. 
                      You can find our store locations on our Stores page.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Do you ship internationally?</h3>
                    <p className="text-gray-700">
                      Yes, we ship to select international destinations including Canada, UK, Australia, and select European countries. 
                      Shipping times and costs vary by location.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Orders & Shipping</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">How long does shipping take?</h3>
                    <p className="text-gray-700">
                      Standard shipping takes 3-5 business days and is free on orders over $50. 
                      Express shipping takes 1-2 business days for $12.99.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Can I track my order?</h3>
                    <p className="text-gray-700">
                      Yes! You'll receive a tracking number via email once your order ships. 
                      You can also track your order through your account or by contacting customer service.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Can I change or cancel my order?</h3>
                    <p className="text-gray-700">
                      Orders can be modified or cancelled within 1 hour of placement. 
                      After that, please contact customer service immediately as changes may not be possible.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Do you offer gift wrapping?</h3>
                    <p className="text-gray-700">
                      Yes! We offer premium gift wrapping services starting at $4.99 per item. 
                      You can add gift wrapping during checkout and include a personalized message.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Returns & Exchanges</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">What is your return policy?</h3>
                    <p className="text-gray-700">
                      We accept returns within 30 days of delivery. Items must be unworn, unwashed, 
                      and have original tags attached. Returns are free and include a full refund.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">How do I return an item?</h3>
                    <p className="text-gray-700">
                      Log into your account, select the item you want to return, print the prepaid shipping label, 
                      and drop off your package. You can also return items to any of our physical stores.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">When will I receive my refund?</h3>
                    <p className="text-gray-700">
                      Refunds are processed within 5-7 business days of receiving your return. 
                      Credit card refunds may take 3-5 additional business days to appear on your statement.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Can I exchange for a different size?</h3>
                    <p className="text-gray-700">
                      Yes! We offer free exchanges for the same item in a different size or color, 
                      subject to availability. Exchanges are processed as a return and new purchase.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Product Information</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">How do I find my size?</h3>
                    <p className="text-gray-700">
                      We provide detailed size charts for all our products. You can find them on each product page 
                      or in our Size Charts section. We recommend measuring yourself for the best fit.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">What materials do you use?</h3>
                    <p className="text-gray-700">
                      We use high-quality, sustainable materials including organic cotton, recycled polyester, 
                      and other eco-friendly fabrics. All materials are carefully selected for comfort and durability.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">How do I care for my AOIN items?</h3>
                    <p className="text-gray-700">
                      Care instructions are provided on the label of each item. Generally, we recommend 
                      cold water washing and air drying to maintain the quality and longevity of your pieces.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Are your products sustainable?</h3>
                    <p className="text-gray-700">
                      Yes! We're committed to sustainability and use eco-friendly materials, 
                      ethical manufacturing processes, and responsible packaging throughout our operations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Account & Payment</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">How do I create an account?</h3>
                    <p className="text-gray-700">
                      You can create an account during checkout or by clicking "Sign Up" in the top navigation. 
                      Having an account allows you to track orders, save favorites, and access exclusive offers.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">What payment methods do you accept?</h3>
                    <p className="text-gray-700">
                      We accept all major credit cards (Visa, MasterCard, American Express, Discover), 
                      PayPal, Apple Pay, Google Pay, and gift cards.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Is my payment information secure?</h3>
                    <p className="text-gray-700">
                      Absolutely! We use industry-standard SSL encryption to protect your payment information. 
                      We never store your credit card details on our servers.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-6">
                    <h3 className="font-futura font-semibold mb-3 text-gray-800">Do you offer gift cards?</h3>
                    <p className="text-gray-700">
                      Yes! Gift cards are available in various denominations and can be purchased online 
                      or in our physical stores. They never expire and can be used for any purchase.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Still Have Questions?</h2>
              <p className="text-gray-700 mb-4">
                Can't find the answer you're looking for? Our customer service team is here to help!
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> help@aoin.com<br />
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

export default FAQ;
