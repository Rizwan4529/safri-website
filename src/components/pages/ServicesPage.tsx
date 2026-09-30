import ContactSection from "../sections/ContactSection";
import PackagesSection from "../sections/PackagesSection";
import Safri360Section from "../sections/Safri360Section";
import ServeBetterHeroSection from "../sections/ServeBetterHeroSection";

const ServicesPage = () => {
  return (
    <main>
      <ServeBetterHeroSection />
      <PackagesSection pageId="services" />
      <Safri360Section pageId="services" />
      <ContactSection pageId="services" />
    </main>
  );
};

export default ServicesPage;
