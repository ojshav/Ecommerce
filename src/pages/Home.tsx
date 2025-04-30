import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import Features from '../components/home/Features';
import NewsletterSignup from '../components/home/NewsletterSignup';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
      <NewsletterSignup />
    </div>
  );
};

export default Home;