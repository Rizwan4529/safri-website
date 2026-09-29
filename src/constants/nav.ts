export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const resolveNavHref = (href: string, isHome: boolean) =>
  href.startsWith("#") ? (isHome ? href : `/${href}`) : href;
