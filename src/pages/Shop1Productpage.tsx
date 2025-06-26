import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop1/Header';
import Hero from '../components/shop/shop1/Productpage/Hero';
import FashionCardsSection from '../components/shop/shop1/Productpage/FashionCardsSection';
import RatingsReviews from '../components/shop/shop1/Productpage/Rating';
import SimilarProducts from '../components/shop/shop1/Productpage/SimilarProducts';
import InstagramPromo from '../components/shop/shop1/Productpage/InstagramPromo';

function Shop1LandingPage() {
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
        <FashionCardsSection />
        <RatingsReviews />
        <SimilarProducts />
        <InstagramPromo />
    </div>  
  );
}

export default Shop1LandingPage;