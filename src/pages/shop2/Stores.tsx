import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const Stores = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Our Stores</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Find an AOIN Store Near You</h2>
              <p className="text-gray-700 mb-6">
                Visit one of our physical stores to experience our products in person, 
                get personalized styling advice, and enjoy exclusive in-store services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Store Locations</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* New York Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🏢</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">New York City</h3>
                    <p className="text-gray-600 mb-4">Flagship Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 123 Fashion Avenue</p>
                      <p>New York, NY 10001</p>
                      <p>📞 (212) 555-0123</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Los Angeles Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🌴</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">Los Angeles</h3>
                    <p className="text-gray-600 mb-4">West Coast Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 456 Sunset Boulevard</p>
                      <p>Los Angeles, CA 90210</p>
                      <p>📞 (310) 555-0456</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Chicago Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🏙️</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">Chicago</h3>
                    <p className="text-gray-600 mb-4">Midwest Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 789 Michigan Avenue</p>
                      <p>Chicago, IL 60601</p>
                      <p>📞 (312) 555-0789</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Miami Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🌊</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">Miami</h3>
                    <p className="text-gray-600 mb-4">Florida Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 321 Ocean Drive</p>
                      <p>Miami Beach, FL 33139</p>
                      <p>📞 (305) 555-0321</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* San Francisco Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🌉</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">San Francisco</h3>
                    <p className="text-gray-600 mb-4">Bay Area Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 654 Market Street</p>
                      <p>San Francisco, CA 94102</p>
                      <p>📞 (415) 555-0654</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Austin Store */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-4xl">🎸</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-futura font-semibold mb-2 text-gray-800">Austin</h3>
                    <p className="text-gray-600 mb-4">Texas Store</p>
                    <div className="space-y-2 text-gray-700">
                      <p>📍 987 South Congress</p>
                      <p>Austin, TX 78704</p>
                      <p>📞 (512) 555-0987</p>
                      <p>🕒 Mon-Sat: 10AM-8PM</p>
                      <p>🕒 Sun: 11AM-6PM</p>
                    </div>
                    <button className="mt-4 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">In-Store Services</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Personal Styling</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Free personal styling consultations</li>
                    <li>• Outfit coordination</li>
                    <li>• Size and fit recommendations</li>
                    <li>• Style advice for any occasion</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">Alterations</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• On-site alterations</li>
                    <li>• Hemming and fitting</li>
                    <li>• Same-day service available</li>
                    <li>• Professional tailors</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-purple-900">Exclusive Events</h3>
                  <ul className="space-y-2 text-purple-800">
                    <li>• Fashion shows and trunk shows</li>
                    <li>• VIP shopping events</li>
                    <li>• Designer meet-and-greets</li>
                    <li>• Seasonal previews</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-yellow-900">Gift Services</h3>
                  <ul className="space-y-2 text-yellow-800">
                    <li>• Gift wrapping</li>
                    <li>• Personal shopping</li>
                    <li>• Gift cards</li>
                    <li>• Special occasion packages</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Store Policies</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Health & Safety</h3>
                  <p className="text-gray-700">We maintain the highest standards of cleanliness and safety in all our stores. 
                  Face masks and hand sanitizer are available for all customers.</p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Accessibility</h3>
                  <p className="text-gray-700">All our stores are wheelchair accessible and equipped with facilities to serve 
                  customers with disabilities. Service animals are welcome.</p>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Returns & Exchanges</h3>
                  <p className="text-gray-700">You can return or exchange items purchased online at any of our physical stores. 
                  Please bring your order confirmation and the items in their original condition.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Store Support</h2>
              <p className="text-gray-700 mb-4">
                Need help finding a store or have questions about store services? Contact our store support team.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> stores@aoin.com<br />
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

export default Stores;
