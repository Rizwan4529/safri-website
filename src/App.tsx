import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutUsPage from "./components/pages/AboutUsPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import HomePage from "./components/pages/HomePage";
import LegalPage from "./components/pages/LegalPage";
import ServicePackagePage from "./components/pages/ServicePackagePage";
import ServicesPage from "./components/pages/ServicesPage";
import ScrollToTop from "./components/ScrollToTop";
import ContentLoading from "./components/ui/ContentLoading";
import { ContentProvider, useContent } from "./context/ContentContext";
import { ToastProvider } from "./context/ToastContext";
import { SignupModalProvider } from "./context/SignupModalContext";

const AppShell = () => {
  const { status } = useContent();

  if (status === "loading") {
    return <ContentLoading />;
  }

  return (
    <SignupModalProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServicePackagePage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/privacy" element={<LegalPage pageId="privacy" />} />
        <Route path="/terms" element={<LegalPage pageId="terms" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </SignupModalProvider>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <ContentProvider>
        <AppShell />
      </ContentProvider>
    </ToastProvider>
  );
};

export default App;
