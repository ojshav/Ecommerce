import Footer from "../../Footer";
import Header from "./Header";
import Hero from "./Hero";
// import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import Sidebar from "./Sidebar";

const ShopFourScreenTwoLandingPage = () => {
  return (
    <div className="bg-black">
        <Header/>
        <Hero/>
               <main className="container mx-auto px-4 py-8">
         <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar - Hidden on mobile, shown on desktop */}
           <aside className="lg:w-80 order-2 lg:order-1">
             <div className="sticky top-8">
               <Sidebar/>
             </div>
           </aside>
           {/* Main Content */}
           <div className="flex-1 order-1 lg:order-2">
             <ProductGrid/>
           </div>
         </div>
         {/* <Pagination/> */}
       </main>
           <Footer/>
    </div>
  );
};
export default ShopFourScreenTwoLandingPage;