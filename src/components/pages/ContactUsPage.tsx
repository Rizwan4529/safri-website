import ContactChannelsSection from "../sections/ContactChannelsSection";
import ContactHeroSection from "../sections/ContactHeroSection";
import ContactSection from "../sections/ContactSection";
import FaqSection from "../sections/FaqSection";

const ContactUsPage = () => {
  return (
    <main>
      <ContactHeroSection />
      <ContactChannelsSection />
      <FaqSection />
      <ContactSection pageId="contact" />
    </main>
  );
};

export default ContactUsPage;
