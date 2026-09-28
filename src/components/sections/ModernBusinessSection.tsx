import { HiCheck } from "react-icons/hi2";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";

type ModernBusinessSectionContent = {
  id: string;
  titleLines?: string[];
  body?: string;
  points?: string[];
  bgImg?: string;
  image?: string;
  imageAlt?: string;
};

const ModernBusinessSection = () => {
  const { section } = usePageSection<ModernBusinessSectionContent>(
    "home",
    "modernBusiness",
  );
  const titleLines = section?.titleLines ?? [];
  const points = section?.points ?? [];
  const bgSrc = mediaUrl(section?.bgImg);
  const imageSrc = mediaUrl(section?.image);

  return (
    <section id="restaurants" className="relative overflow-x-clip bg-surface">
      {bgSrc ? (
        <img
          src={bgSrc}
          alt=""
          width={443}
          height={776}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-y-0 right-[max(0px,calc((100%-80rem)/2))] z-0 hidden h-full w-36 object-cover lg:block xl:w-40"
        />
      ) : null}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-10 lg:px-10 lg:py-24">
        <InView variants={fadeLeft}>
          <h2 className="max-w-xl font-heading text-[1.85rem] leading-[1.12] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:max-w-none lg:text-[2.2rem] xl:text-[2.45rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          {section?.body ? (
            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.body}
            </p>
          ) : null}
          <div
            aria-hidden="true"
            className="mt-6 max-w-lg border-t border-dashed border-brand/40"
          />
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 font-body text-sm font-semibold text-text sm:text-[0.95rem]"
              >
                <HiCheck
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand"
                />
                {point}
              </li>
            ))}
          </ul>
        </InView>

        {imageSrc ? (
          <InView variants={fadeRight}>
            <img
              src={imageSrc}
              alt={
                section?.imageAlt ??
                "Restaurant team collaborating with Safri operations tools"
              }
              width={800}
              height={534}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full rounded-[1.35rem] object-cover lg:w-[88%]"
            />
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default ModernBusinessSection;
