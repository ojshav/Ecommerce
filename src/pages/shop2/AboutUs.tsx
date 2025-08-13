import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2020, AOIN was born from a simple yet powerful vision: to create timeless, 
                high-quality fashion that empowers individuals to express their unique style with confidence. 
                What started as a small collection of essential pieces has grown into a beloved brand 
                that celebrates authenticity, sustainability, and effortless elegance.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-gray-900">Our Mission</h3>
                <p className="text-gray-700">
                  To provide thoughtfully designed, sustainable fashion that makes you feel confident 
                  and comfortable in your own skin, while contributing to a more conscious and 
                  responsible fashion industry.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">What Sets Us Apart</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Quality Craftsmanship</h3>
                  <p className="text-blue-800">
                    Every piece is carefully crafted using premium materials and attention to detail, 
                    ensuring longevity and timeless appeal.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">Sustainable Practices</h3>
                  <p className="text-green-800">
                    We're committed to reducing our environmental impact through responsible sourcing, 
                    ethical manufacturing, and eco-friendly packaging.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-purple-900">Inclusive Design</h3>
                  <p className="text-purple-800">
                    Our collections are designed to flatter diverse body types and celebrate 
                    individuality, making fashion accessible to everyone.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-yellow-900">Community Focus</h3>
                  <p className="text-yellow-800">
                    We believe in building meaningful connections with our customers and 
                    supporting the communities that make our brand possible.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Our Values</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Sustainability</h3>
                    <p className="text-gray-700">
                      We're committed to environmental responsibility, from sourcing eco-friendly materials 
                      to implementing sustainable business practices throughout our operations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Ethics & Transparency</h3>
                    <p className="text-gray-700">
                      We believe in fair labor practices, ethical manufacturing, and complete transparency 
                      about how our products are made and who makes them.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💎</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Quality Over Quantity</h3>
                    <p className="text-gray-700">
                      We focus on creating fewer, better pieces that last longer, encouraging 
                      a more mindful approach to fashion consumption.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">❤️</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2 text-gray-800">Customer First</h3>
                    <p className="text-gray-700">
                      Our customers are at the heart of everything we do. We listen, learn, and 
                      continuously improve based on your feedback and needs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Our Team</h2>
              <p className="text-gray-700 mb-6">
                Meet the passionate individuals behind AOIN who work tirelessly to bring you 
                the best in fashion and customer experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍💼</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Design Team</h3>
                  <p className="text-gray-600">Creative visionaries crafting timeless pieces</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👩‍💻</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Customer Service</h3>
                  <p className="text-gray-600">Dedicated team ensuring your satisfaction</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍🔬</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2 text-gray-800">Sustainability</h3>
                  <p className="text-gray-600">Experts in eco-friendly practices</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Our Impact</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-green-900">Environmental</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• 50% reduction in carbon footprint</li>
                    <li>• 100% recycled packaging</li>
                    <li>• Sustainable material sourcing</li>
                    <li>• Waste reduction initiatives</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Social</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Fair labor practices</li>
                    <li>• Community partnerships</li>
                    <li>• Charitable giving programs</li>
                    <li>• Employee development</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, 
                our team is here to help.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> hello@aoin.com<br />
                  <strong>Phone:</strong> 1-800-AOIN-HELP<br />
                  <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM EST<br />
                  <strong>Address:</strong> 123 Fashion Avenue, New York, NY 10001
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

export default AboutUs;
