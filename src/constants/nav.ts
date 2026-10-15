export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const SIGN_IN_LABEL = "Sign in";
export const SIGN_IN_URL = "https://app.safri.food/";

export const resolveNavHref = (href: string, isHome: boolean) =>
  href.startsWith("#") ? (isHome ? href : `/${href}`) : href;
