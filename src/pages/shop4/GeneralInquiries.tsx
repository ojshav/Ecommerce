import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const GeneralInquiries = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">General Inquiries</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Reach our support team for assistance.</p>
        </section>

        <section className="max-w-[900px] mx-auto px-6 lg:px-12 pb-16 grid gap-6">
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl mb-2">Contact Information</h3>
            <ul className="text-gray-300 text-sm font-poppins space-y-1">
              <li>Email: help@aoin.com</li>
              <li>Phone: 1-800-AOIN-HELP</li>
            </ul>
          </div>
          <div>
            <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Prefer a form? Contact us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GeneralInquiries;

