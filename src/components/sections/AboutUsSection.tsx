import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";

type AboutIntroSection = {
  id: string;
  label?: string;
  titleLines?: string[];
  body?: string;
  calloutTitle?: string;
  calloutSubtitle?: string;
  callout?: string;
  statValue?: string;
  statLabelLines?: string[];
  image?: string;
  sketchImages?: {
    pizza?: string;
    leaf?: string;
    cabbage?: string;
  };
};

const AboutUsSection = () => {
  const { section } = usePageSection<AboutIntroSection>("home", "aboutIntro");
  const titleLines = section?.titleLines ?? [];
  const cabbage = mediaUrl(section?.sketchImages?.cabbage);
  const leaf = mediaUrl(section?.sketchImages?.leaf);
  const pizza = mediaUrl(section?.sketchImages?.pizza);
  const image = mediaUrl(section?.image);

  return (
    <section id="about" className="relative overflow-x-clip bg-surface">
      {cabbage ? (
        <img
          src={cabbage}
          alt=""
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute top-[48%] z-20 w-20 -translate-y-1/2 rotate-40 select-none sm:w-22 lg:w-30"
        />
      ) : null}
      {leaf ? (
        <img
          src={leaf}
          alt=""
          width={154}
          height={187}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute -top-1 right-0 w-24 select-none sm:w-28 lg:-top-4 lg:w-32 xl:w-36"
        />
      ) : null}
      {pizza ? (
        <img
          src={pizza}
          alt=""
          width={140}
          height={140}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute right-50 bottom-2 hidden w-18 select-none sm:block sm:w-20 lg:bottom-8 lg:w-28"
        />
      ) : null}
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 pt-8 pb-10 sm:px-8 sm:pt-10 sm:pb-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12 lg:px-10 lg:pt-8 lg:pb-14 xl:gap-16">
        <InView
          variants={fadeLeft}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
        >
          {image ? (
            <div className="relative overflow-hidden rounded-[1.35rem]">
              <img
                src={image}
                alt="Guests sharing a restaurant meal"
                width={3000}
                height={1688}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-[38%_42%]"
              />
            </div>
          ) : null}

          {section?.calloutTitle ||
          section?.callout ||
          section?.statValue ? (
            <div className="absolute right-4 bottom-6 z-20 w-[min(92%,16rem)] rounded-xl bg-accent/85 px-4 py-3.5 text-text-inverse shadow-[0_10px_28px_rgba(245,115,0,0.28)] backdrop-blur-[12px] sm:-right-16 sm:bottom-8 sm:w-[min(92%,17.5rem)] sm:px-5 sm:py-4 lg:-right-10">
              {section.calloutTitle ? (
                <>
                  <p className="font-heading text-lg font-bold tracking-[-0.02em] sm:text-xl">
                    {section.calloutTitle}
                  </p>
                  {section.calloutSubtitle ? (
                    <p className="mt-1 font-body text-[0.72rem] leading-snug text-white/95 sm:text-[0.78rem]">
                      {section.calloutSubtitle}
                    </p>
                  ) : null}
                </>
              ) : section.callout ? (
                <p className="font-body text-[0.78rem] leading-relaxed text-white/95 sm:text-[0.84rem]">
                  {section.callout}
                </p>
              ) : (
                <>
                  <p className="font-heading text-2xl font-bold sm:text-[1.75rem]">
                    {section.statValue}
                  </p>
                  <p className="mt-1.5 font-body text-[0.72rem] leading-relaxed text-white/95 sm:text-[0.78rem]">
                    {(section.statLabelLines ?? []).join(" ")}
                  </p>
                </>
              )}
            </div>
          ) : null}
        </InView>

        <InView
          variants={fadeRight}
          className="relative pt-1 pl-10 lg:pt-3 xl:pt-5"
        >
          {section?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {section.label}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-[2.15rem] leading-[1.08] font-bold tracking-[-0.03em] text-text sm:text-[2.35rem] lg:text-[2.45rem] xl:text-[2.75rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          {section?.body ? (
            <p className="relative mt-7 max-w-86 font-body text-sm leading-[1.75] text-text-secondary sm:mt-8 sm:text-[0.95rem] lg:ml-20">
              <span
                aria-hidden="true"
                className="absolute top-[0.75em] right-full hidden w-32 border-t border-dashed border-brand/40 lg:block xl:w-44"
              />
              {section.body}
            </p>
          ) : null}
        </InView>
      </div>
    </section>
  );
};

export default AboutUsSection;
