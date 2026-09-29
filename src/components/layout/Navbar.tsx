import { useEffect, useId, useRef, useState } from "react";
import { HiOutlineBars3, HiOutlineChevronDown, HiOutlineXMark } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import logoFallback from "../../assets/images/safri-small-logo.png";
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
  const [openDesktopId, setOpenDesktopId] = useState<string | null>(null);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);
  const desktopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownId = useId();
  const { section } = usePageSection<PrimaryNavSection>(
    "siteHeader",
    "primaryNav",
  );

  useEffect(() => {
    setMenuOpen(false);
    setOpenDesktopId(null);
    setOpenMobileId(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (desktopCloseTimer.current) clearTimeout(desktopCloseTimer.current);
    };
  }, []);

  const links = section?.links ?? [];
  const remoteLogo = mediaUrl(section?.logo);
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = logoFailed || !remoteLogo ? logoFallback : remoteLogo;
  const logoAlt = section?.logoAlt ?? "Safri";
  const ctaText = section?.ctaText ?? "Request a Demo";
  const ctaPath = section?.ctaPath ?? "/contact";

  const sectionHref = (href: string) => resolveNavHref(href, isHome);

  const isActivePath = (path: string, children?: ContentLink[]) => {
    if (path === "/") return location.pathname === "/";
    if (location.pathname === path) return true;
    if (location.pathname.startsWith(`${path}/`)) return true;
    return Boolean(
      children?.some(
        (child) =>
          location.pathname === child.path ||
          location.pathname.startsWith(`${child.path}/`),
      ),
    );
  };

  const navItemClass = (active: boolean) =>
    [
      "font-body text-[0.95rem] transition-colors duration-200 hover:text-brand",
      active ? "font-semibold text-brand" : "font-medium text-text",
    ]
      .filter(Boolean)
      .join(" ");

  const mobileNavItemClass = (active: boolean) =>
    [
      "block py-2 font-body text-sm transition-colors duration-200 hover:text-brand",
      active ? "font-semibold text-brand" : "font-medium text-text",
    ]
      .filter(Boolean)
      .join(" ");

  const openDesktop = (id: string) => {
    if (desktopCloseTimer.current) clearTimeout(desktopCloseTimer.current);
    setOpenDesktopId(id);
  };

  const scheduleCloseDesktop = () => {
    if (desktopCloseTimer.current) clearTimeout(desktopCloseTimer.current);
    desktopCloseTimer.current = setTimeout(() => setOpenDesktopId(null), 120);
  };

  return (
    <header className="fixed top-3 right-4 left-4 z-50 sm:top-4 sm:right-6 sm:left-6 lg:top-5 lg:right-10 lg:left-10">
      <nav className="rounded-lg bg-white/85 p-1.5 shadow-[0_10px_40px_rgba(0,40,32,0.08)] backdrop-blur-md">
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
                onError={() => setLogoFailed(true)}
                className="h-12 w-[6.75rem] object-cover object-[50%_43%]"
              />
            ) : null}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
            {links.map((link) => {
              const linkId = String(link.id ?? link.path);
              const children = link.children ?? [];
              const hasChildren = children.length > 0;
              const active = isActivePath(link.path, children);

              if (!hasChildren) {
                return (
                  <li key={linkId}>
                    <Link
                      to={sectionHref(link.path)}
                      aria-current={active ? "page" : undefined}
                      className={navItemClass(active)}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              }

              const open = openDesktopId === linkId;

              return (
                <li
                  key={linkId}
                  className="relative"
                  onMouseEnter={() => openDesktop(linkId)}
                  onMouseLeave={scheduleCloseDesktop}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={`${dropdownId}-${linkId}`}
                    className={[
                      "inline-flex items-center gap-1",
                      navItemClass(active),
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      setOpenDesktopId((current) =>
                        current === linkId ? null : linkId,
                      )
                    }
                    onFocus={() => openDesktop(linkId)}
                  >
                    {link.title}
                    <HiOutlineChevronDown
                      className={[
                        "size-4 transition-transform duration-200",
                        open ? "rotate-180" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </button>
                  {open ? (
                    <div
                      id={`${dropdownId}-${linkId}`}
                      role="menu"
                      className="absolute top-full left-1/2 z-50 mt-3 min-w-56 -translate-x-1/2 rounded-lg border border-border bg-surface p-2 shadow-[0_16px_40px_rgba(0,40,32,0.12)]"
                      onMouseEnter={() => openDesktop(linkId)}
                      onMouseLeave={scheduleCloseDesktop}
                    >
                      <Link
                        to={sectionHref(link.path)}
                        role="menuitem"
                        aria-current={
                          location.pathname === link.path ? "page" : undefined
                        }
                        className={[
                          "block rounded-lg px-3 py-2 font-body text-sm font-semibold text-brand transition-colors hover:bg-brand-light",
                          location.pathname === link.path
                            ? "bg-brand-light"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        All {link.title}
                      </Link>
                      {children.map((child) => {
                        const childActive =
                          location.pathname === child.path ||
                          location.pathname.startsWith(`${child.path}/`);

                        return (
                          <Link
                            key={String(child.id ?? child.path)}
                            to={sectionHref(child.path)}
                            role="menuitem"
                            aria-current={childActive ? "page" : undefined}
                            className={[
                              "block rounded-lg px-3 py-2 font-body text-sm transition-colors hover:bg-brand-light hover:text-brand",
                              childActive
                                ? "bg-brand-light font-semibold text-brand"
                                : "font-medium text-text",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </li>
              );
            })}
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
            <ul className="flex flex-col gap-1">
              {links.map((link) => {
                const linkId = String(link.id ?? link.path);
                const children = link.children ?? [];
                const hasChildren = children.length > 0;
                const active = isActivePath(link.path, children);
                const expanded = openMobileId === linkId;

                if (!hasChildren) {
                  return (
                    <li key={linkId}>
                      <Link
                        to={sectionHref(link.path)}
                        aria-current={active ? "page" : undefined}
                        className={mobileNavItemClass(active)}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={linkId}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      className={[
                        "flex w-full items-center justify-between",
                        mobileNavItemClass(active),
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() =>
                        setOpenMobileId((current) =>
                          current === linkId ? null : linkId,
                        )
                      }
                    >
                      {link.title}
                      <HiOutlineChevronDown
                        className={[
                          "size-4 transition-transform duration-200",
                          expanded ? "rotate-180" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      />
                    </button>
                    {expanded ? (
                      <ul className="mb-2 ml-3 flex flex-col border-l border-border pl-3">
                        <li>
                          <Link
                            to={sectionHref(link.path)}
                            aria-current={
                              location.pathname === link.path
                                ? "page"
                                : undefined
                            }
                            className={[
                              "block py-2 font-body text-sm font-semibold text-brand transition-colors hover:text-brand",
                              location.pathname === link.path
                                ? "underline underline-offset-4"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => setMenuOpen(false)}
                          >
                            All {link.title}
                          </Link>
                        </li>
                        {children.map((child) => {
                          const childActive =
                            location.pathname === child.path ||
                            location.pathname.startsWith(`${child.path}/`);

                          return (
                            <li key={String(child.id ?? child.path)}>
                              <Link
                                to={sectionHref(child.path)}
                                aria-current={
                                  childActive ? "page" : undefined
                                }
                                className={[
                                  "block py-2 font-body text-sm transition-colors hover:text-brand",
                                  childActive
                                    ? "font-semibold text-brand"
                                    : "font-medium text-text-secondary",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                onClick={() => setMenuOpen(false)}
                              >
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
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
