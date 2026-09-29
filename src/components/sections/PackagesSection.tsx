import { useState } from "react";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";
import Button from "../ui/Button";
import FeatureArtPanel from "../ui/FeatureArtPanel";

type DotTone = "accent" | "brand" | "brandDark" | "heroPatch";

type PackageItem = {
  id?: number | string;
  slug?: string;
  tabLabel: string;
  dotTone?: DotTone;
  index?: string;
  badge?: string;
  title: string;
  body?: string;
  features?: string[];
  primaryCtaText?: string;
  primaryCtaPath?: string;
  secondaryCtaText?: string;
  secondaryCtaPath?: string;
  image?: string;
  imageOverlay?: string;
  imageAlt?: string;
};

type PackagesSectionContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  items?: PackageItem[];
};

type PackagesSectionProps = {
  pageId?: string;
  sectionId?: string;
};

const dotToneClass: Record<DotTone, string> = {
  accent: "bg-accent",
  brand: "bg-brand",
  brandDark: "bg-brand-dark",
  heroPatch: "bg-hero-patch",
};

const PackagesSection = ({
  pageId = "home",
  sectionId = "packages",
}: PackagesSectionProps) => {
  const { section } = usePageSection<PackagesSectionContent>(pageId, sectionId);
  const items = section?.items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];
  const total = String(items.length).padStart(2, "0");
  const imageSrc = mediaUrl(active?.image);
  const overlaySrc = mediaUrl(active?.imageOverlay);

  if (items.length === 0) return null;

  return (
    <section id="packages" className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-2 font-heading text-[1.85rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.55rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.subTitle ? (
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.subTitle}
            </p>
          ) : null}
        </InView>

        <InView variants={fadeUp} className="mt-10 sm:mt-12">
          <div
            role="tablist"
            aria-label="Safri packages"
            className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {items.map((item, index) => {
              const selected = index === activeIndex;
              const tone = item.dotTone ?? "brand";
              return (
                <button
                  key={String(item.id ?? item.slug ?? item.tabLabel)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`package-tab-${item.slug ?? index}`}
                  aria-controls="package-panel"
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors duration-200",
                    selected
                      ? "bg-brand-light text-brand"
                      : "bg-surface-subtle text-text-secondary hover:bg-brand-light/60 hover:text-brand",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setActiveIndex(index)}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "size-2 shrink-0 rounded-full",
                      dotToneClass[tone],
                    ].join(" ")}
                  />
                  {item.tabLabel}
                </button>
              );
            })}
          </div>
        </InView>

        {active ? (
          <div
            id="package-panel"
            role="tabpanel"
            aria-labelledby={`package-tab-${active.slug ?? activeIndex}`}
            className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16 xl:gap-20"
          >
            <InView variants={fadeLeft} key={`copy-${active.slug ?? activeIndex}`}>
              <div className="max-w-lg">
                <p className="font-body text-sm font-semibold tracking-wide text-accent">
                  {active.index ?? String(activeIndex + 1).padStart(2, "0")}/
                  {total}
                </p>
                {active.badge ? (
                  <p className="mt-3 inline-flex rounded-lg bg-brand-light px-2.5 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-brand uppercase">
                    {active.badge}
                  </p>
                ) : null}
                <h3 className="mt-3 font-heading text-[1.65rem] leading-tight font-bold tracking-[-0.02em] text-text sm:text-[1.85rem] lg:text-[2rem]">
                  {active.title}
                </h3>
                {active.body ? (
                  <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                    {active.body}
                  </p>
                ) : null}
                {active.features && active.features.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {active.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 font-body text-sm text-text-secondary sm:text-[0.95rem]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    size="cta"
                    href={active.primaryCtaPath ?? "/contact"}
                  >
                    {active.primaryCtaText ?? "Learn more"}
                  </Button>
                  {active.secondaryCtaText ? (
                    <Button
                      variant="outline"
                      size="cta"
                      href={active.secondaryCtaPath ?? "/contact"}
                    >
                      {active.secondaryCtaText}
                    </Button>
                  ) : null}
                </div>
              </div>
            </InView>

            {imageSrc ? (
              <InView
                variants={fadeRight}
                key={`art-${active.slug ?? activeIndex}`}
              >
                {overlaySrc ? (
                  <FeatureArtPanel panelClassName="top-[6%] right-[8%] bottom-[8%] left-[8%]">
                    <div className="relative pt-[12%] pr-[2%] pb-[10%] pl-[22%]">
                      <img
                        src={imageSrc}
                        alt={active.imageAlt ?? active.title}
                        width={437}
                        height={280}
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 w-full object-contain"
                      />
                    </div>
                    <img
                      src={overlaySrc}
                      alt=""
                      width={553}
                      height={368}
                      loading="lazy"
                      decoding="async"
                      className="pointer-events-none absolute top-[10%] left-[-8%] z-20 w-[86%] object-contain sm:left-[-12%]"
                    />
                  </FeatureArtPanel>
                ) : (
                  <FeatureArtPanel>
                    <img
                      src={imageSrc}
                      alt={active.imageAlt ?? active.title}
                      loading="lazy"
                      decoding="async"
                      className="relative w-full object-contain"
                    />
                  </FeatureArtPanel>
                )}
              </InView>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PackagesSection;
