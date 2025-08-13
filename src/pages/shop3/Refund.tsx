import Header from '../../components/shop/shop3/ProductPage/Header';
import Footer from '../../components/shop/shop3/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const Refund = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-12">
          <h1 className="text-[#CCFF00] font-bebas text-5xl tracking-tight mb-2 uppercase">Refund & Returns</h1>
          <p className="text-[#939393] font-alexandria max-w-3xl">We offer a straightforward 30-day return policy. Items must be unused, unwashed, and with original tags.</p>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16 grid gap-6 md:grid-cols-3">
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="font-bebas text-2xl mb-2">Return Window</h3>
            <p className="text-[#939393] text-sm">30 days from delivery. Final-sale items are not eligible.</p>
          </div>
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="font-bebas text-2xl mb-2">How to Start</h3>
            <p className="text-[#939393] text-sm">Start a return via your account. We'll email a prepaid label.</p>
          </div>
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="font-bebas text-2xl mb-2">Refund Timing</h3>
            <p className="text-[#939393] text-sm">Refunds are processed 5–7 business days after receipt.</p>
          </div>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16">
          <Link to="/contact" className="text-[#CCFF00] underline underline-offset-4">Questions? Contact support</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;

