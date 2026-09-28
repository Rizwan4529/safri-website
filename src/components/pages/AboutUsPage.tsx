import AboutGrowSection from "../sections/AboutGrowSection";
import AboutHeroSection from "../sections/AboutHeroSection";
import AboutOperationsSection from "../sections/AboutOperationsSection";
import AboutStorySection from "../sections/AboutStorySection";
import ContactSection from "../sections/ContactSection";

const AboutUsPage = () => {
  return (
    <main>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutGrowSection />
      <AboutOperationsSection />
      <ContactSection pageId="about" />
    </main>
  );
};

export default AboutUsPage;
