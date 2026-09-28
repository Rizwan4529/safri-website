import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutUsPage from "./components/pages/AboutUsPage";
import ContactUsPage from "./components/pages/ContactUsPage";
import HomePage from "./components/pages/HomePage";
import ServicesPage from "./components/pages/ServicesPage";
import ScrollToTop from "./components/ScrollToTop";
import ContentLoading from "./components/ui/ContentLoading";
import { ContentProvider, useContent } from "./context/ContentContext";
import { ToastProvider } from "./context/ToastContext";

const AppShell = () => {
  const { status, error } = useContent();

  if (status === "loading") {
    return <ContentLoading />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-svh items-center justify-center bg-surface px-6">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-2xl font-bold text-text">
            Unable to load site content
          </h1>
          <p className="mt-3 font-body text-sm text-text-secondary">
            {error ?? "Please check your connection and try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
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
