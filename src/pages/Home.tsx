import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import PromoProducts from '../components/home/PromoProducts';
import TrendingDeals from '../components/home/TrendingDeals';
import NewsletterSignup from '../components/home/NewsletterSignup';

const Home: React.FC = () => {
  return (
    <div className="pb-10">
      <div className="space-y-8">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <PromoProducts />
        <TrendingDeals />
      </div>
    </div>
  );
};

export default Home;