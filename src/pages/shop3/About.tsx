import Header from '../../components/shop/shop3/ProductPage/Header';
import Footer from '../../components/shop/shop3/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-12">
          <h1 className="text-[#CCFF00] font-bebas text-5xl tracking-tight mb-2 uppercase">About AOIN</h1>
          <p className="text-[#939393] font-alexandria max-w-3xl">Born in the street, refined in the studio. We craft modern essentials with premium materials and a minimalist edge.</p>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8">
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="font-bebas text-2xl mb-2">Principles</h3>
            <ul className="text-[#D1D1D1] list-disc pl-5 space-y-1 text-sm font-alexandria">
              <li>Timeless over trendy</li>
              <li>Quality fabrics, honest construction</li>
              <li>Comfort that moves with you</li>
              <li>Responsible production</li>
            </ul>
          </div>
          <div className="border border-neutral-800 rounded-lg p-6 bg-neutral-950">
            <h3 className="font-bebas text-2xl mb-2">Contact</h3>
            <p className="text-[#939393] text-sm">We’d love to connect. Feedback, partnerships, or questions — our team is here.</p>
            <div className="mt-4"><Link to="/contact" className="text-[#CCFF00] underline underline-offset-4">Reach out</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

