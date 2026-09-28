import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";
import Button from "../ui/Button";

type ServeBetterHeroContent = {
  id: string;
  title?: string;
  body?: string;
  primaryCtaText?: string;
  primaryCtaPath?: string;
  secondaryCtaText?: string;
  secondaryCtaPath?: string;
  images?: {
    laptop?: string;
    menu?: string;
  };
};

type ServeBetterHeroSectionProps = {
  pageId?: string;
  sectionId?: string;
};

const ServeBetterHeroSection = ({
  pageId = "services",
  sectionId = "serveBetterHero",
}: ServeBetterHeroSectionProps) => {
  const { section } = usePageSection<ServeBetterHeroContent>(pageId, sectionId);
  const laptop = mediaUrl(section?.images?.laptop);
  const menu = mediaUrl(section?.images?.menu);

  return (
    <section className="relative isolate min-h-svh overflow-x-clip bg-linear-to-r from-feature-panel to-contact-hero-end">
      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-10 lg:pt-24 lg:pb-24">
        <InView variants={fadeLeft} className="max-w-xl lg:max-w-lg">
          {section?.title ? (
            <h1 className="font-heading text-[2.15rem] leading-[1.12] font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem]">
              {section.title}
            </h1>
          ) : null}
          {section?.body ? (
            <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-text-secondary sm:text-[0.98rem]">
              {section.body}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button
              variant="primary"
              size="cta"
              href={section?.primaryCtaPath}
            >
              {section?.primaryCtaText ?? "Try Now"}
            </Button>
            {section?.secondaryCtaText ? (
              <a
                href={section.secondaryCtaPath ?? "/services"}
                className="font-body text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
              >
                {section.secondaryCtaText}
              </a>
            ) : null}
          </div>
        </InView>

        {laptop ? (
          <InView
            variants={fadeRight}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div className="relative pt-[8%] pr-[2%] pb-[6%] pl-[18%]">
              <img
                src={laptop}
                alt="Safri restaurant management dashboard on a laptop"
                width={437}
                height={280}
                decoding="async"
                fetchPriority="high"
                className="relative z-10 w-full object-contain"
              />
            </div>
            {menu ? (
              <img
                src={menu}
                alt=""
                width={553}
                height={368}
                decoding="async"
                className="pointer-events-none absolute top-[6%] left-[-4%] z-20 w-[88%] object-contain sm:left-[-8%] lg:left-[-10%]"
              />
            ) : null}
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default ServeBetterHeroSection;
