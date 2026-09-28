import type { ReactNode } from "react";
import { APP_STORE_URL, PLAY_STORE_URL } from "../../constants/mobileApp";

type StoreBadgeProps = {
  href: string;
  label: string;
  children: ReactNode;
};

const StoreBadge = ({ href, label, children }: StoreBadgeProps) => {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="inline-flex h-11 items-center gap-2 rounded-lg bg-text px-3 text-text-inverse transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {children}
    </a>
  );
};

const AppleMark = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6 shrink-0"
      fill="currentColor"
    >
      <path d="M16.37 12.64c-.03-3.04 2.48-4.5 2.59-4.57-1.41-2.06-3.61-2.34-4.39-2.37-1.87-.19-3.65 1.1-4.6 1.1-.95 0-2.42-1.07-4-1.04-2.06.03-3.95 1.2-5.01 3.04-2.14 3.71-.55 9.2 1.53 12.21 1.02 1.47 2.24 3.12 3.84 3.06 1.56-.06 2.15-1.01 4.04-1.01s2.42.99 4.06.96c1.68-.03 2.74-1.5 3.76-2.98 1.18-1.72 1.66-3.39 1.69-3.48-.04-.02-3.24-1.24-3.27-4.92zM13.76 4.3c.85-1.03 1.42-2.46 1.26-3.89-1.22.05-2.7.81-3.57 1.84-.79.91-1.48 2.37-1.3 3.77 1.37.11 2.77-.7 3.61-1.72z" />
    </svg>
  );
};

const PlayMark = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0">
      <path fill="#EA4335" d="M3.2 2.4v19.2l11.2-9.6z" />
      <path fill="#FBBC04" d="M14.4 12 3.2 21.6 19.6 14.3z" />
      <path fill="#4285F4" d="M19.6 9.7 3.2 2.4 14.4 12z" />
      <path fill="#34A853" d="m19.6 9.7-5.2 2.3 5.2 2.3L21.8 12z" />
    </svg>
  );
};

type StoreBadgesProps = {
  className?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
};

const StoreBadges = ({
  className = "",
  appStoreUrl = APP_STORE_URL,
  playStoreUrl = PLAY_STORE_URL,
}: StoreBadgesProps) => {
  return (
    <div
      className={["flex flex-wrap items-center gap-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      <StoreBadge href={appStoreUrl} label="Download on the App Store">
        <AppleMark />
        <span className="flex flex-col items-start leading-none">
          <span className="font-body text-[0.55rem] tracking-wide">
            Download on the
          </span>
          <span className="font-body text-[0.95rem] font-semibold">
            App Store
          </span>
        </span>
      </StoreBadge>
      <StoreBadge href={playStoreUrl} label="Get it on Google Play">
        <PlayMark />
        <span className="flex flex-col items-start leading-none">
          <span className="font-body text-[0.55rem] tracking-[0.08em]">
            GET IT ON
          </span>
          <span className="font-body text-[0.95rem] font-semibold">
            Google Play
          </span>
        </span>
      </StoreBadge>
    </div>
  );
};

export default StoreBadges;
