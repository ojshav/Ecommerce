import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const SizeCharts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Size Charts</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Use the charts below to find your fit.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8">
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <table className="min-w-full text-left text-sm font-poppins">
              <thead className="bg-[#111]">
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
                  <tr key={row[0]} className="border-t border-gray-800">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3 text-gray-300">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Need sizing help? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SizeCharts;

