import type { ReactNode } from "react";

type DrawBorderLinkTone = "inverse" | "brand" | "accent" | "service";

type DrawBorderLinkProps = {
  href: string;
  children: ReactNode;
  tone?: DrawBorderLinkTone;
  className?: string;
};

const toneClasses: Record<DrawBorderLinkTone, string> = {
  inverse: "text-text-inverse",
  brand: "text-brand",
  accent: "text-accent",
  service: "text-[color:var(--service-accent)]",
};

/**
 * CTA link with a border that draws around the button on hover.
 */
const DrawBorderLink = ({
  href,
  children,
  tone = "brand",
  className = "",
}: DrawBorderLinkProps) => {
  return (
    <a
      href={href}
      className={[
        "group relative inline-flex h-11 w-43 items-center justify-center overflow-hidden rounded-lg px-5 font-body text-sm font-semibold whitespace-nowrap transition-colors duration-200",
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="7"
          ry="7"
          pathLength={1}
          className={[
            "fill-none stroke-current [stroke-width:1.5]",
            "[stroke-dasharray:1] [stroke-dashoffset:1]",
            "transition-[stroke-dashoffset] duration-700 ease-out",
            "group-hover:[stroke-dashoffset:0]",
            "motion-reduce:transition-none motion-reduce:group-hover:[stroke-dashoffset:0]",
          ].join(" ")}
        />
      </svg>
      {/* Idle hairline so the control still reads as a button before hover */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 rounded-lg border border-current/25 transition-opacity duration-300",
          "group-hover:opacity-0",
        ].join(" ")}
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
};

export default DrawBorderLink;
