import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const GiftCards = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Gift Cards</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Send instant style. Digital and physical options available.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8 md:grid-cols-3">
          {[
            { title: 'Digital', desc: 'Instant delivery via email' },
            { title: 'Physical', desc: 'Premium printed card' },
            { title: 'Bulk', desc: 'Corporate and team gifting' },
          ].map((card) => (
            <div key={card.title} className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
              <div className="h-32 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 mb-4" />
              <h3 className="font-bebas text-2xl">{card.title}</h3>
              <p className="text-gray-300 text-sm font-poppins">{card.desc}</p>
            </div>
          ))}
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Have questions? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GiftCards;

