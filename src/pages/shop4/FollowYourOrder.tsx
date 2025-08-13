import Header from '../../components/shop/shop4/AllProductpage/Header';
import Footer from '../../components/shop/shop4/Footer';
import { Link } from 'react-router-dom';

const FollowYourOrder = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-5xl font-bebas tracking-tight mb-3 text-yellow-400 uppercase">Follow Your Order</h1>
          <p className="text-gray-300 max-w-3xl font-poppins">Track your order in real time with your order number and email.</p>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-16 grid gap-8 md:grid-cols-2">
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl mb-2">Status Updates</h3>
            <ul className="text-gray-300 text-sm space-y-1 font-poppins">
              <li>• Confirmed</li>
              <li>• Processing</li>
              <li>• Shipped</li>
              <li>• Delivered</li>
            </ul>
          </div>
          <div className="border border-gray-800 rounded-lg p-6 bg-[#111]/60">
            <h3 className="font-bebas text-2xl mb-2">Notifications</h3>
            <p className="text-gray-300 text-sm font-poppins">Email and SMS notifications available.</p>
          </div>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 lg:px-12 pb-20">
          <Link to="/contact" className="text-yellow-400 underline underline-offset-4">Trouble tracking? Contact us</Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FollowYourOrder;

