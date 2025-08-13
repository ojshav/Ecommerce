import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Shipping & Delivery</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Shipping Information</h2>
              <p className="text-gray-700 mb-4">
                We offer fast and reliable shipping to ensure your orders reach you promptly and in perfect condition.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Standard Shipping</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 3-5 business days</li>
                    <li>• Free on orders over $50</li>
                    <li>• $5.99 for orders under $50</li>
                    <li>• Tracking number provided</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Express Shipping</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 1-2 business days</li>
                    <li>• $12.99 flat rate</li>
                    <li>• Priority handling</li>
                    <li>• Real-time tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Delivery Areas</h2>
              <p className="text-gray-700 mb-4">
                We currently ship to all 50 states in the United States. International shipping is available to select countries.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">International Shipping</h3>
                <p className="text-blue-800">
                  Available to Canada, UK, Australia, and select European countries. 
                  Shipping times vary by location (7-14 business days).
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Order Processing</h2>
              <div className="space-y-4 text-gray-700">
                <p>• Orders placed before 2 PM EST are processed the same day</p>
                <p>• Orders placed after 2 PM EST are processed the next business day</p>
                <p>• You'll receive a confirmation email with tracking information</p>
                <p>• Weekend and holiday orders are processed on the next business day</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Package Protection</h2>
              <p className="text-gray-700 mb-4">
                All packages are carefully packaged to ensure your items arrive in perfect condition. 
                We use eco-friendly packaging materials whenever possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about shipping or delivery, please don't hesitate to contact our customer service team.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> shipping@aoin.com<br />
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

export default ShippingDelivery;
