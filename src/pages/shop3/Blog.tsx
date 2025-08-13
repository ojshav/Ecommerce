import Header from '../../components/shop/shop3/ProductPage/Header';
import Footer from '../../components/shop/shop3/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-12">
          <h1 className="text-[#CCFF00] font-bebas text-5xl tracking-tight mb-2 uppercase">AOIN Journal</h1>
          <p className="text-[#939393] font-alexandria max-w-3xl">Stories on streetwear, process, and culture — curated in a clean, minimalist layout.</p>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16 grid gap-8 md:grid-cols-3">
          {[1,2,3,4,5,6].map((i) => (
            <article key={i} className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950 hover:bg-neutral-900 transition-colors">
              <div className="h-40 bg-gradient-to-br from-neutral-800 to-neutral-900" />
              <div className="p-6">
                <h3 className="font-bebas text-2xl mb-2">Design Notes #{i}</h3>
                <p className="text-[#939393] text-sm font-alexandria">Behind the seams: fabric choices, patterns, and functional details.</p>
              </div>
            </article>
          ))}
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16">
          <Link to="/contact" className="text-[#CCFF00] underline underline-offset-4">Press or collab? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

