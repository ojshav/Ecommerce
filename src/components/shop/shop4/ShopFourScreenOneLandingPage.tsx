import Footer from "../../Footer";
import AwesomeCollection from "../../AwesomeCollection";
import CelebrateFestival from "./CelebrateFestivals";
import HeroOne from "./HeroOne";
import NewCollection from "./NewCollection";
import NewlyUpdated from "./NewlyUpdated";
import PureGol from "./PureGol";
import Recentproduct from "./RecentProduct";
import TrendyDeals from "./TrendyDeals";
import UniqueCollections from "./UniqueCollections";

const ShopFourScreenOneLandingPage = () => {
  return (
    <div className="bg-black">
        <HeroOne/>
      <UniqueCollections/>
      <AwesomeCollection/>
      <NewlyUpdated/>
      <Recentproduct/>
      <TrendyDeals/>
      <CelebrateFestival/>
      <PureGol/> 
      <NewCollection/>
      <Footer/>
    </div>
  );
};
export default ShopFourScreenOneLandingPage;