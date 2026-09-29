import type { CSSProperties } from "react";

export type ServiceThemeTokens = {
  accent?: string;
  soft?: string;
  panel?: string;
  ctaFrom?: string;
  ctaTo?: string;
};

export const defaultServiceTheme: Required<ServiceThemeTokens> = {
  accent: "#008F7C",
  soft: "#E5F6F3",
  panel: "#D1ECE8",
  ctaFrom: "#008F7C",
  ctaTo: "#007566",
};

export const serviceThemeStyle = (
  theme?: ServiceThemeTokens | null,
): CSSProperties => {
  const t = { ...defaultServiceTheme, ...theme };
  return {
    ["--service-accent" as string]: t.accent,
    ["--service-soft" as string]: t.soft,
    ["--service-panel" as string]: t.panel,
    ["--service-cta-from" as string]: t.ctaFrom,
    ["--service-cta-to" as string]: t.ctaTo,
  };
};
