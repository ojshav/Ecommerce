import React from 'react';
import '../styles/globals.css';
//import Reflection from '../components/shop/shop2/Reflection';


function Shop2LandingPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
    
    </div>  
  );
}

export default Shop2LandingPage;