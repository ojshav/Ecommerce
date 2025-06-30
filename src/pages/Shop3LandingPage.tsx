import React from 'react';
import '../styles/globals.css';
import Aoinpeople from '../components/shop/shop3/AoinPeople';

function Shop3LandingPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Aoinpeople />
    </div>  
  );
}

export default Shop3LandingPage;