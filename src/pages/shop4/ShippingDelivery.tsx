import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Shipping & Delivery</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Fast, reliable delivery with transparent timelines. Orders are packed with care and dispatched quickly.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8 md:grid-cols-2">
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl text-white mb-2">Standard Shipping</h3>
            <ul className="text-gray-300 text-sm space-y-1 font-poppins">
              <li>• 3–5 business days</li>
              <li>• Free over $50</li>
              <li>• Tracking provided</li>
            </ul>
          </div>
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl text-white mb-2">Express Shipping</h3>
            <ul className="text-gray-300 text-sm space-y-1 font-poppins">
              <li>• 1–2 business days</li>
              <li>• Priority handling</li>
              <li>• Real-time tracking</li>
            </ul>
          </div>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Questions about shipping? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingDelivery;

