import { useReducedMotion } from "framer-motion";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";
import StoreBadges from "../ui/StoreBadges";

type MobileAppSectionContent = {
  id: string;
  titleLines?: string[];
  body?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  bgImg?: string;
  image?: string;
  imageAlt?: string;
};

const MobileAppSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { section } = usePageSection<MobileAppSectionContent>(
    "home",
    "mobileApp",
  );
  const titleLines = section?.titleLines ?? [];
  const bgSrc = mediaUrl(section?.bgImg);
  const imageSrc = mediaUrl(section?.image);

  return (
    <section id="app" className="relative isolate overflow-x-clip">
      {bgSrc ? (
        <img
          src={bgSrc}
          alt=""
          width={1920}
          height={694}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center"
        />
      ) : null}

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-10 lg:py-24">
        <InView variants={fadeLeft} className="max-w-xl">
          <h2 className="font-heading text-[1.85rem] leading-[1.12] font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.65rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          {section?.body ? (
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.body}
            </p>
          ) : null}
          <StoreBadges
            className="mt-8"
            appStoreUrl={section?.appStoreUrl}
            playStoreUrl={section?.playStoreUrl}
          />
        </InView>

        {imageSrc ? (
          <InView
            variants={fadeRight}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <img
              src={imageSrc}
              alt={section?.imageAlt ?? "Safri delivery rider illustration"}
              width={1224}
              height={864}
              loading="lazy"
              decoding="async"
              className={[
                "w-full max-w-xl object-contain lg:-mr-6 lg:w-[108%] lg:max-w-none xl:-mr-10",
                prefersReducedMotion ? "" : "animate-float-slow transform-gpu",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default MobileAppSection;
