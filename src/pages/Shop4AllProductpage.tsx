

import React from 'react';
import Footer from '../components/shop/shop4/Footer';
import Header from '../components/shop/shop4/AllProductpage/Header';
import Hero from '../components/shop/shop4/AllProductpage/Hero';
import ProductGrid from '../components/shop/shop4/AllProductpage/ProductGrid';
import Sidebar from '../components/shop/shop4/AllProductpage/Sidebar';
import Pagination from '../components/shop/shop4/AllProductpage/Pagination';

const Shop4AllProductpage: React.FC = () => {
  return (
    <div className="bg-black">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <aside className="lg:w-80 order-2 lg:order-1">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </aside>
          {/* Main Content */}
          <div className="flex-1 order-1 lg:order-2">
            <ProductGrid />
          </div>
        </div>
        {/* Pagination component is available but commented out because it's designed as a full-screen demo */}
        {/* <Pagination /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Shop4AllProductpage;
