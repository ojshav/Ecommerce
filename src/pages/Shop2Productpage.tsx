import React from 'react';
import '../styles/globals.css';
import Header from '../components/shop/shop2/Productpage/Header';
import ProductDetail from '../components/shop/shop2/Productpage/ProductDetail';
import DescriptionAccordion from '../components/shop/shop2/Productpage/DescriptionReview';
import SimilarProducts from '../components/shop/shop2/Productpage/SimilarProducts';

function Shop2Productpage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Header />
      <ProductDetail />
      <DescriptionAccordion />
      <SimilarProducts />
    </div>  
  );
}

export default Shop2Productpage;