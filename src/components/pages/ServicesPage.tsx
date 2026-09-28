import EnterpriseSection from "../sections/EnterpriseSection";
import GrowthBannerSection from "../sections/GrowthBannerSection";
import MeasurableValueSection from "../sections/MeasurableValueSection";
import ServeBetterHeroSection from "../sections/ServeBetterHeroSection";
import WhatYouGetSection from "../sections/WhatYouGetSection";

const ServicesPage = () => {
  return (
    <main>
      <ServeBetterHeroSection />
      <EnterpriseSection />
      <MeasurableValueSection />
      <WhatYouGetSection />
      <GrowthBannerSection />
    </main>
  );
};

export default ServicesPage;
