import AboutUsSection from "../sections/AboutUsSection";
import ContactSection from "../sections/ContactSection";
import FeaturesSection from "../sections/FeaturesSection";
import HeroSection from "../sections/HeroSection";
import MobileAppSection from "../sections/MobileAppSection";
import ModernBusinessSection from "../sections/ModernBusinessSection";
import PackagesSection from "../sections/PackagesSection";
import RestaurantNeedsSection from "../sections/RestaurantNeedsSection";
import Safri360Section from "../sections/Safri360Section";
import StatsSection from "../sections/StatsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <StatsSection />
      <RestaurantNeedsSection />
      <FeaturesSection />
      <PackagesSection pageId="home" />
      <Safri360Section pageId="home" />
      <MobileAppSection />
      <ModernBusinessSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
