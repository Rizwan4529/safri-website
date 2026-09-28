import AboutUsSection from "../sections/AboutUsSection";
import ContactSection from "../sections/ContactSection";
import FeaturesSection from "../sections/FeaturesSection";
import HeroSection from "../sections/HeroSection";
import MobileAppSection from "../sections/MobileAppSection";
import ModernBusinessSection from "../sections/ModernBusinessSection";
import StatsSection from "../sections/StatsSection";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <AboutUsSection />
      <StatsSection />
      <FeaturesSection />
      <MobileAppSection />
      <ModernBusinessSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
