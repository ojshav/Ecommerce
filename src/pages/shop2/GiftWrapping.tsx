import Header from '../../components/shop/shop2/Productpage/Header';
import Footer from '../../components/shop/shop2/AllProductpage/Footer';

const GiftWrapping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bebas text-gray-900 mb-8">Gift Wrapping</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Premium Gift Wrapping Service</h2>
              <p className="text-gray-700 mb-6">
                Make your gift extra special with our premium gift wrapping service. Each package is carefully wrapped 
                with high-quality materials and finished with a beautiful ribbon and gift tag.
              </p>
              
              <div className="bg-pink-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-futura font-semibold mb-3 text-pink-900">Gift Wrapping Features</h3>
                <ul className="space-y-2 text-pink-800">
                  <li>• Premium wrapping paper</li>
                  <li>• Coordinated ribbon and bow</li>
                  <li>• Personalized gift tag</li>
                  <li>• Careful attention to detail</li>
                  <li>• Available for all items</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Gift Wrapping Options</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Standard Gift Wrapping</h3>
                  <p className="text-gray-600 mb-4">$4.99 per item</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Elegant wrapping paper</li>
                    <li>• Matching ribbon</li>
                    <li>• Gift tag with your message</li>
                    <li>• Perfect for any occasion</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-xl font-futura font-semibold mb-4 text-gray-800">Premium Gift Wrapping</h3>
                  <p className="text-gray-600 mb-4">$7.99 per item</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Luxury wrapping paper</li>
                    <li>• Silk ribbon with bow</li>
                    <li>• Personalized gift tag</li>
                    <li>• Tissue paper included</li>
                    <li>• Special occasion designs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Seasonal Wrapping</h2>
              <p className="text-gray-700 mb-6">
                We offer special seasonal wrapping designs throughout the year to make your gifts even more festive.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-red-100 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎄</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Holiday Season</h3>
                  <p className="text-sm text-gray-600">Christmas and New Year designs</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-pink-100 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💝</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Valentine's Day</h3>
                  <p className="text-sm text-gray-600">Romantic and elegant designs</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎂</span>
                  </div>
                  <h3 className="font-futura font-semibold mb-2">Birthday</h3>
                  <p className="text-sm text-gray-600">Celebratory and fun designs</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">How to Add Gift Wrapping</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2">Select Your Items</h3>
                    <p className="text-gray-700">Add items to your cart as usual</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2">Choose Gift Wrapping</h3>
                    <p className="text-gray-700">Select gift wrapping option during checkout</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-gray-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-futura font-semibold mb-2">Add Personal Message</h3>
                    <p className="text-gray-700">Include your personalized gift message</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Gift Message Options</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-futura font-semibold mb-3 text-blue-900">Personalized Gift Tags</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Include recipient's name</li>
                  <li>• Add your personal message</li>
                  <li>• Choose from various tag designs</li>
                  <li>• Handwritten-style printing</li>
                  <li>• Maximum 100 characters per message</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Gift Receipt</h2>
              <p className="text-gray-700 mb-4">
                All gift-wrapped orders include a gift receipt with no pricing information, 
                making it perfect for surprise gifts.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800">
                  <strong>Note:</strong> Gift receipts allow recipients to exchange items without seeing the original price.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-futura font-semibold mb-6 text-gray-800">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Have questions about our gift wrapping service? We're here to help make your gift perfect.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> gifts@aoin.com<br />
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

export default GiftWrapping;
