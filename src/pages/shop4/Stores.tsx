import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const Stores = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Stores</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Visit us in person for tailored assistance and exclusive in-store services.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8 md:grid-cols-3">
          {["New York", "Los Angeles", "Chicago"].map((city) => (
            <div key={city} className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
              <div className="h-40 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 mb-4" />
              <h3 className="font-bebas text-2xl">{city}</h3>
              <p className="text-gray-300 text-sm font-poppins">Mon–Sat: 10–8, Sun: 11–6</p>
            </div>
          ))}
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Need directions? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stores;

