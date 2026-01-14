import HeroSection from "../components/HeroSection";
import CategoryGrid from "../components/CategoryGrid";
import FeatureSection from "../components/FeatureSection";
import FeaturedProducts from "../components/FeaturedProducts";
import BuySection from "../components/BuySection";
import OurValues from "../components/OurValues";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />      
      <FeatureSection />
      <BuySection/>
      <OurValues />
      <FeaturedProducts />
    </div>
  );
}

export default Home;
