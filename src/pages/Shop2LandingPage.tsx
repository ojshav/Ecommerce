import React from 'react';
import '../styles/globals.css';
// import Reflection from '../components/shop/shop2/Reflection';
// import TShirt from '../components/shop/shop2/tshirt';
// import SweatShirts from '../components/shop/shop2/SweatShirts';
// import Bottom from '../components/shop/shop2/Bottoms';
// import Collaboration from '../components/shop/shop2/Collaboration';
// import Shackets from '../components/shop/shop2/Shackets';
// import Shirts from '../components/shop/shop2/Shirts';
// import Accessories from '../components/shop/shop2/Accessories';
// import StreetStyle from '../components/shop/shop2/StreetStyle';
// import Streetwear from '../components/shop/shop2/Streetwear';
// import StreetwearIntro from '../components/shop/shop2/StreetwearIntro';
// import QualityShowcase from '../components/shop/shop2/QualityShowcase';
// import AoinShowcase from '../components/shop/shop2/AoinShowcase';
import Hero from '../components/shop/shop2/Hero';
import TrendingShapes from '../components/shop/shop2/TrendingShapes';
import PremiumEyewear from '../components/shop/shop2/PremiumEyewear';
import ShopFrameShape from '../components/shop/shop2/ShopFrameShape';
import Header from '../components/shop/shop2/Productpage/Header';
import PerfectFitGallery from '../components/shop/shop2/PerfectFitGallery';
import Footer from '../components/shop/shop2/AllProductpage/Footer';

function Shop2LandingPage() {
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
      <TrendingShapes />
      <PremiumEyewear />
      <ShopFrameShape />
      <PerfectFitGallery />
      <Footer />

      {/* <Reflection />
      <TShirt/>
      <SweatShirts/>
      <Bottom/>
      <Shackets/>
      <Collaboration/>
      <Shirts/>
      <Accessories/>
      <StreetStyle/>
      <Streetwear/>
      <StreetwearIntro/>
      <QualityShowcase/>
      <AoinShowcase/> */}
    </div>  
  );
}

export default Shop2LandingPage;