import Header from '../../components/shop/shop3/ProductPage/Header';
import Footer from '../../components/shop/shop3/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const KidsCollection = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-12">
          <h1 className="text-[#CCFF00] font-bebas text-5xl tracking-tight mb-2 uppercase">Kids' Collection</h1>
          <p className="text-[#939393] font-alexandria max-w-3xl">Comfort-first streetwear for the next generation — soft fabrics, move-ready fits, and playful details.</p>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Tops", "Hoodies", "Bottoms", "Sets", "Accessories", "Outerwear"].map((label) => (
            <div key={label} className="border border-neutral-800 rounded-lg p-6 bg-neutral-950 hover:bg-neutral-900 transition-colors">
              <div className="h-40 mb-4 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900" />
              <h3 className="font-bebas text-2xl">{label}</h3>
              <p className="text-[#939393] text-sm font-alexandria">Soft-touch comfort built for all-day wear.</p>
            </div>
          ))}
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/shop3" className="bg-[#CCFF00] text-black px-6 py-3 font-alexandria font-semibold uppercase tracking-wide hover:opacity-90">Shop All</Link>
            <Link to="/contact" className="text-[#CCFF00] underline underline-offset-4">Contact support</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KidsCollection;

