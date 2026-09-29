import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";
import Button from "../ui/Button";
import DrawBorderLink from "../ui/DrawBorderLink";

type ServicePackageHeroContent = {
  id: string;
  label?: string;
  badge?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
  primaryCtaText?: string;
  primaryCtaPath?: string;
  secondaryCtaText?: string;
  secondaryCtaPath?: string;
  image?: string;
  imageOverlay?: string;
  imageAlt?: string;
};

type ServicePackageHeroSectionProps = {
  pageId: string;
};

const ServicePackageHeroSection = ({
  pageId,
}: ServicePackageHeroSectionProps) => {
  const { section } = usePageSection<ServicePackageHeroContent>(pageId, "hero");
  const imageSrc = mediaUrl(section?.image);
  const overlaySrc = mediaUrl(section?.imageOverlay);

  const titleNodes = (() => {
    if (!section?.title) return null;
    if (!section.titleAccent) return section.title;
    const idx = section.title.lastIndexOf(section.titleAccent);
    if (idx < 0) return section.title;
    return (
      <>
        {section.title.slice(0, idx)}
        <span className="text-[color:var(--service-accent)]">
          {section.titleAccent}
        </span>
        {section.title.slice(idx + section.titleAccent.length)}
      </>
    );
  })();

  return (
    <section
      className="relative overflow-x-clip"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--service-soft) 0%, var(--color-contact-hero-end) 55%, #ffffff 100%)",
      }}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pt-36 lg:pb-24">
        <InView variants={fadeLeft} className="max-w-xl">
          {/* {section?.label ? (
            <p className="font-body text-sm font-semibold tracking-[0.14em] text-[color:var(--service-accent)] uppercase">
              {section.label}
            </p>
          ) : null} */}
          {section?.badge ? (
            <p className="inline-flex rounded-lg bg-white/80 px-2.5 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-[color:var(--service-accent)] uppercase shadow-sm">
              {section.badge}
            </p>
          ) : null}
          {section?.title ? (
            <h1 className="mt-4 font-heading text-[2.15rem] leading-[1.12] font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.85rem]">
              {titleNodes}
            </h1>
          ) : null}
          {section?.body ? (
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-text-secondary sm:text-[0.98rem]">
              {section.body}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              className="border-0 text-text-inverse hover:opacity-90"
              style={{ backgroundColor: "var(--service-accent)" }}
              variant="primary"
              size="cta"
              href={section?.primaryCtaPath ?? "/contact"}
            >
              {section?.primaryCtaText ?? "Contact us"}
            </Button>
            {section?.secondaryCtaText ? (
              <DrawBorderLink
                href={section.secondaryCtaPath ?? "#built-for"}
                tone="service"
              >
                {section.secondaryCtaText}
              </DrawBorderLink>
            ) : null}
          </div>
        </InView>

        {imageSrc ? (
          <InView variants={fadeRight} className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-8 lg:rounded-[2.25rem] lg:p-10"
              style={{ backgroundColor: "var(--service-panel)" }}
            >
              {overlaySrc ? (
                <div className="relative pt-[8%] pr-[2%] pb-[6%] pl-[16%]">
                  <img
                    src={imageSrc}
                    alt={section?.imageAlt ?? section?.title ?? "Safri package"}
                    width={437}
                    height={280}
                    decoding="async"
                    fetchPriority="high"
                    className="relative z-10 w-full object-contain"
                  />
                  <img
                    src={overlaySrc}
                    alt=""
                    width={553}
                    height={368}
                    decoding="async"
                    className="pointer-events-none absolute top-[4%] left-[-6%] z-20 w-[88%] object-contain"
                  />
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt={section?.imageAlt ?? section?.title ?? "Safri package"}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full object-contain"
                />
              )}
            </div>
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default ServicePackageHeroSection;
