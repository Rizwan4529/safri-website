import type {
  ContentPage,
  ContentSection,
  ContentTheme,
  TenantSiteContent,
} from "../types/content";

export const getPage = (
  content: TenantSiteContent | null | undefined,
  pageId: string,
): ContentPage | undefined =>
  content?.pages?.find((page) => page.id === pageId);

export const getSection = <T extends ContentSection = ContentSection>(
  content: TenantSiteContent | null | undefined,
  pageId: string,
  sectionId: string,
): T | undefined => {
  const page = getPage(content, pageId);
  return page?.sections?.find((section) => section.id === sectionId) as
    | T
    | undefined;
};

const themeVarMap: Record<keyof ContentTheme, string> = {
  primaryColor: "--color-brand",
  primaryDark: "--color-brand-dark",
  primaryLight: "--color-brand-light",
  secondaryColor: "--color-hero-patch",
  accentColor: "--color-accent",
  accentDark: "--color-accent-dark",
  accentHover: "--color-accent-hover",
  textColor: "--color-text",
  textSecondary: "--color-text-secondary",
  textMuted: "--color-text-muted",
  textInverse: "--color-text-inverse",
  surface: "--color-surface",
  surfaceSubtle: "--color-surface-subtle",
  surfaceMuted: "--color-surface-muted",
  border: "--color-border",
  footer: "--color-footer",
  stats: "--color-stats",
  featurePanel: "--color-feature-panel",
  contactHeroEnd: "--color-contact-hero-end",
  buttonHoverColor: "--color-brand-dark",
  fontHeading: "--font-heading",
  fontBody: "--font-body",
};

export const applyTheme = (theme?: ContentTheme | null) => {
  if (!theme || typeof document === "undefined") return;

  const root = document.documentElement;

  (Object.keys(themeVarMap) as (keyof ContentTheme)[]).forEach((key) => {
    const value = theme[key];
    if (!value) return;

    if (key === "fontHeading" || key === "fontBody") {
      root.style.setProperty(themeVarMap[key], `"${value}", sans-serif`);
      return;
    }

    root.style.setProperty(themeVarMap[key], value);
  });

  if (theme.primaryColor) {
    root.style.setProperty("--color-hero-bg", theme.primaryColor);
  }
};
