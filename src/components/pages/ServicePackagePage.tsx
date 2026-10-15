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
  free: "service-free",
  plus: "service-plus",
  "360": "service-360",
};

/** Old package slugs, kept so shared links land on the matching plan. */
const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "online-ordering": "free",
  delivery: "plus",
  operations: "360",
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

  const legacyTarget = slug ? LEGACY_SLUG_REDIRECTS[slug] : undefined;
  if (legacyTarget) {
    return <Navigate to={`/services/${legacyTarget}`} replace />;
  }

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
