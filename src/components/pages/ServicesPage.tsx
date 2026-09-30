import ContactSection from "../sections/ContactSection";
import EnterpriseSection from "../sections/EnterpriseSection";
import GrowthBannerSection from "../sections/GrowthBannerSection";
import MeasurableValueSection from "../sections/MeasurableValueSection";
import PackagesSection from "../sections/PackagesSection";
import Safri360Section from "../sections/Safri360Section";
import ServeBetterHeroSection from "../sections/ServeBetterHeroSection";
import WhatYouGetSection from "../sections/WhatYouGetSection";

const ServicesPage = () => {
  return (
    <main>
      <ServeBetterHeroSection />
      <PackagesSection pageId="services" />
      <Safri360Section pageId="services" />
      <EnterpriseSection />
      <MeasurableValueSection />
      <WhatYouGetSection />
      <GrowthBannerSection />
      <ContactSection pageId="services" />
    </main>
  );
};

export default ServicesPage;
