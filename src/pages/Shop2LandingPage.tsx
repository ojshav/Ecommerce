import React from 'react';
import '../styles/globals.css';
import Reflection from '../components/shop/shop2/Reflection';
import TShirt from '../components/shop/shop2/Tshirt';
import SweatShirts from '../components/shop/shop2/SweatShirts';
import Bottom from '../components/shop/shop2/Bottoms';
//import Collaboration from '../components/shop/shop2/Collaboration';
import Shackets from '../components/shop/shop2/Shackets';


function Shop2LandingPage() {
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white scroll-smooth overflow-x-hidden">
      <Reflection />
      <TShirt/>

      <SweatShirts/>
      <Bottom/>
      <Shackets/>
    
      
    </div>  
  );
}

export default Shop2LandingPage;