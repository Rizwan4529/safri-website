import { useEffect, useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { mediaUrl } from "../../config/env";
import { resolveNavHref } from "../../constants/nav";
import { usePageSection } from "../../context/ContentContext";
import type { ContentLink } from "../../types/content";
import RequestDemoButton from "../ui/RequestDemoButton";

type PrimaryNavSection = {
  id: string;
  logo?: string;
  logoAlt?: string;
  links?: ContentLink[];
  ctaText?: string;
  ctaPath?: string;
};

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { section } = usePageSection<PrimaryNavSection>(
    "siteHeader",
    "primaryNav",
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = section?.links ?? [];
  const logoSrc = mediaUrl(section?.logo);
  const logoAlt = section?.logoAlt ?? "Safri";
  const ctaText = section?.ctaText ?? "Request a Demo";
  const ctaPath = section?.ctaPath ?? "/contact";

  const sectionHref = (href: string) => resolveNavHref(href, isHome);

  return (
    <header className="fixed top-3 right-4 left-4 z-50 sm:top-4 sm:right-6 sm:left-6 lg:top-5 lg:right-10 lg:left-10">
      <nav className="rounded-4xl bg-white/85 p-1.5 shadow-[0_10px_40px_rgba(0,40,32,0.08)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-3 py-1 sm:px-4 sm:py-1.5 lg:px-5">
          <Link
            to="/"
            aria-label={`${logoAlt} home`}
            className="flex shrink-0 items-center"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={logoAlt}
                width={1536}
                height={1024}
                decoding="async"
                fetchPriority="high"
                className="h-12 w-[6.75rem] object-cover object-[50%_43%]"
              />
            ) : null}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
            {links.map((link) => (
              <li key={String(link.id ?? link.path)}>
                <Link
                  to={sectionHref(link.path)}
                  aria-current={
                    location.pathname === link.path ? "page" : undefined
                  }
                  className="font-body text-[0.95rem] font-medium text-text transition-colors duration-200 hover:text-brand"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden shrink-0 lg:block">
              <RequestDemoButton href={ctaPath}>{ctaText}</RequestDemoButton>
            </div>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-brand-light hover:text-brand lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <HiOutlineXMark className="size-6" />
              ) : (
                <HiOutlineBars3 className="size-6" />
              )}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-border/70 px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={String(link.id ?? link.path)}>
                  <Link
                    to={sectionHref(link.path)}
                    aria-current={
                      location.pathname === link.path ? "page" : undefined
                    }
                    className="font-body text-sm font-medium text-text transition-colors duration-200 hover:text-brand"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <RequestDemoButton
                href={ctaPath}
                onClick={() => setMenuOpen(false)}
              >
                {ctaText}
              </RequestDemoButton>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
