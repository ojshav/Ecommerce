import React from 'react';
import Header from '../components/shop/shop1/Header';
import Hero from '../components/shop/shop1/Hero';
import ExclusiveDeals from '../components/shop/shop1/ExclusiveDeals';
import Categories from '../components/shop/shop1/Categories';
//import FreshOffRunway from '../components/shop/FreshoffRunway';
//import PromotionalBanners from '../components/shop/PromotionalBanners';
//import OutfitCards from '../components/shop/OutfitCards';
//import NewCollection from '../components/shop/NewCollection';

function App() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      
        <Hero />
        <ExclusiveDeals />
        <Categories />
      
    </div>  
  );
}

export default App;