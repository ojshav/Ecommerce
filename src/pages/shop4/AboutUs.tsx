import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">About Us</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">AOIN Pooja Store — premium essentials crafted with care and intention.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid md:grid-cols-2 gap-8">
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl mb-2">Our Principles</h3>
            <ul className="text-gray-300 text-sm font-poppins list-disc pl-5 space-y-1">
              <li>Quality-first construction</li>
              <li>Responsible sourcing</li>
              <li>Design for longevity</li>
              <li>Customer experience at the core</li>
            </ul>
          </div>
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl mb-2">Contact</h3>
            <p className="text-gray-300 text-sm font-poppins">For press, partnerships or general queries.</p>
            <div className="mt-4"><Link to="/contact" className="text-yellow-400 underline underline-offset-4">Reach out</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

