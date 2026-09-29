import { HiCheck } from "react-icons/hi2";
import { mediaUrl } from "../../config/env";
import { useSignupModal } from "../../context/SignupModalContext";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft } from "../motion/InView";
import Button from "../ui/Button";
import DrawBorderLink from "../ui/DrawBorderLink";

type CtaBannerContent = {
  id: string;
  titleLines?: string[];
  subTitle?: string;
  body?: string;
  points?: string[];
  ctaText?: string;
  ctaPath?: string;
  secondaryCtaText?: string;
  secondaryCtaPath?: string;
  bgImg?: string;
};

type ServicePackageCtaBannerSectionProps = {
  pageId: string;
};

const ServicePackageCtaBannerSection = ({
  pageId,
}: ServicePackageCtaBannerSectionProps) => {
  const { openSignupModal } = useSignupModal();
  const { section } = usePageSection<CtaBannerContent>(pageId, "ctaBanner");
  const lines = section?.titleLines ?? [];
  const points = section?.points ?? [];
  const bgSrc = mediaUrl(section?.bgImg);
  if (lines.length === 0) return null;

  const primaryIsDemo = /book\s*a\s*demo|try\s*now/i.test(
    section?.ctaText ?? "",
  );

  return (
    <section className="relative overflow-x-clip bg-surface px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
        {bgSrc ? (
          <img
            src={bgSrc}
            alt=""
            width={1920}
            height={700}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-[70%_center]"
          />
        ) : null}

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(90deg, color-mix(in srgb, var(--service-cta-from) 58%, transparent) 0%, color-mix(in srgb, var(--service-cta-from) 28%, transparent) 42%, color-mix(in srgb, var(--service-cta-to) 12%, transparent) 72%, transparent 100%)",
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.28) 100%)",
            ].join(", "),
          }}
        />

        <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <InView variants={fadeLeft} className="max-w-xl text-left">
            <h2 className="font-heading text-[1.85rem] leading-[1.12] font-bold tracking-[-0.03em] text-text-inverse sm:text-4xl lg:text-[2.65rem]">
              {lines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  <span
                    style={
                      index === 1
                        ? {
                            color:
                              "color-mix(in srgb, var(--service-accent) 45%, white)",
                          }
                        : undefined
                    }
                  >
                    {line}
                    {index === 0 && lines.length > 1 ? "." : null}
                    {index === 1 ? "." : null}
                  </span>
                </span>
              ))}
            </h2>

            {section?.subTitle ? (
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/90 sm:text-[0.98rem]">
                {section.subTitle}
              </p>
            ) : null}

            {section?.body ? (
              <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-white/75">
                {section.body}
              </p>
            ) : null}

            {points.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {points.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-white/95"
                  >
                    <HiCheck
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[color:var(--service-accent)]"
                      style={{
                        color:
                          "color-mix(in srgb, var(--service-accent) 50%, white)",
                      }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              {section?.ctaText ? (
                <Button
                  className="border-0 bg-text-inverse hover:bg-white hover:opacity-95"
                  style={{ color: "var(--service-accent)" }}
                  variant="primary"
                  size="cta"
                  href={
                    primaryIsDemo ? undefined : (section.ctaPath ?? "/contact")
                  }
                  onClick={primaryIsDemo ? openSignupModal : undefined}
                >
                  {section.ctaText}
                </Button>
              ) : null}
              {section?.secondaryCtaText ? (
                <DrawBorderLink
                  href={section.secondaryCtaPath ?? "/services"}
                  tone="inverse"
                >
                  {section.secondaryCtaText}
                </DrawBorderLink>
              ) : null}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
};

export default ServicePackageCtaBannerSection;
