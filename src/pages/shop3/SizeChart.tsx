import Header from '../../components/shop/shop3/ProductPage/Header';
import Footer from '../../components/shop/shop3/AllProductpage/Footer';
import { Link } from 'react-router-dom';

const SizeChart = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1380px] mx-auto px-6 py-12">
          <h1 className="text-[#CCFF00] font-bebas text-5xl tracking-tight mb-2 uppercase">Size Chart</h1>
          <p className="text-[#939393] font-alexandria max-w-3xl">Use the charts below to find your best fit. For tailored advice, reach out to our team.</p>
        </section>

        <section className="max-w-[1380px] mx-auto px-6 pb-16 grid gap-8">
          <div className="overflow-x-auto border border-neutral-800 rounded-lg">
            <table className="min-w-full text-left text-sm font-alexandria">
              <thead className="bg-neutral-900/50">
                <tr>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Chest</th>
                  <th className="px-4 py-3">Waist</th>
                  <th className="px-4 py-3">Hips</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS', '32-34"', '24-26"', '34-36"'],
                  ['S', '34-36"', '26-28"', '36-38"'],
                  ['M', '36-38"', '28-30"', '38-40"'],
                  ['L', '38-40"', '30-32"', '40-42"'],
                  ['XL', '40-42"', '32-34"', '42-44"'],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-neutral-800">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3 text-[#D1D1D1]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-sm text-[#939393]">Tips: measure over light clothing, keep tape snug, and compare to product page notes.</div>
          <div>
            <Link to="/contact" className="text-[#CCFF00] underline underline-offset-4">Need sizing help? Contact us</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeChart;

