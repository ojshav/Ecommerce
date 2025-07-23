import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop1/Header';

import FashionCardsSection from '../components/shop/shop1/Productpage/FashionCardsSection';

import SimilarProducts from '../components/shop/shop1/Productpage/SimilarProducts';
import InstagramPromo from '../components/shop/shop1/Productpage/InstagramPromo';

function Shop1ProductPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      
        
        <FashionCardsSection />
        
        <SimilarProducts />
        <InstagramPromo />
    </div>  
  );
}

export default Shop1ProductPage;