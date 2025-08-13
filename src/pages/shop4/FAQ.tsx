import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">FAQ</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Quick answers to common questions.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-6">
          {[
            { q: 'How long is shipping?', a: 'Standard shipping is 3–5 business days. Express is 1–2.' },
            { q: 'Can I return items?', a: 'Yes, within 30 days in original condition.' },
            { q: 'Do you offer gift wrapping?', a: 'Yes, standard and premium options during checkout.' },
          ].map((item) => (
            <div key={item.q} className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
              <h3 className="font-bebas text-2xl mb-2">{item.q}</h3>
              <p className="text-gray-300 text-sm font-poppins">{item.a}</p>
            </div>
          ))}
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Still need help? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

