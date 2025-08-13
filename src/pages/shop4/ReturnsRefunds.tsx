import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const ReturnsRefunds = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Returns & Refunds</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Hassle-free returns within 30 days. Items must be unused, unwashed, with original tags.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8 md:grid-cols-3">
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60"><h3 className="font-bebas text-2xl mb-2">Window</h3><p className="text-gray-300 text-sm font-poppins">30 days from delivery</p></div>
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60"><h3 className="font-bebas text-2xl mb-2">Process</h3><p className="text-gray-300 text-sm font-poppins">Start in your account, get a prepaid label</p></div>
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60"><h3 className="font-bebas text-2xl mb-2">Timeline</h3><p className="text-gray-300 text-sm font-poppins">Refunds in 5–7 business days after receipt</p></div>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Need help with a return? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsRefunds;

