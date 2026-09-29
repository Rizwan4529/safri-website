import { Navigate, useParams } from "react-router-dom";
import { useContent, usePageSection } from "../../context/ContentContext";
import {
  serviceThemeStyle,
  type ServiceThemeTokens,
} from "../../lib/serviceTheme";
import ContactSection from "../sections/ContactSection";
import ServicePackageBuiltForSection from "../sections/ServicePackageBuiltForSection";
import ServicePackageCtaBannerSection from "../sections/ServicePackageCtaBannerSection";
import ServicePackageExploreSection from "../sections/ServicePackageExploreSection";
import ServicePackageHeroSection from "../sections/ServicePackageHeroSection";
import ServicePackageIntroSection from "../sections/ServicePackageIntroSection";
import ServicePackageStatsSection from "../sections/ServicePackageStatsSection";
import ServicePackageValueSection from "../sections/ServicePackageValueSection";

const SLUG_TO_PAGE_ID: Record<string, string> = {
  "online-ordering": "service-online-ordering",
  delivery: "service-delivery",
  operations: "service-operations",
  "360": "service-360",
};

type ThemeSection = ServiceThemeTokens & { id: string };

const ServicePackagePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPage } = useContent();
  const pageId = slug ? SLUG_TO_PAGE_ID[slug] : undefined;
  const { section: theme } = usePageSection<ThemeSection>(
    pageId ?? "",
    "theme",
  );

  if (!pageId || !getPage(pageId)) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main style={serviceThemeStyle(theme)}>
      <ServicePackageHeroSection pageId={pageId} />
      <ServicePackageIntroSection pageId={pageId} />
      <ServicePackageValueSection pageId={pageId} />
      <ServicePackageBuiltForSection pageId={pageId} />
      <ServicePackageStatsSection pageId={pageId} />
      <ServicePackageExploreSection pageId={pageId} />
      <ServicePackageCtaBannerSection pageId={pageId} />
      <ContactSection pageId={pageId} />
    </main>
  );
};

export default ServicePackagePage;
