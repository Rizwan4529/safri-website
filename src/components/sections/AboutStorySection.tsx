import { mediaUrl } from "../../config/env";
import { useContent } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";

type WhoWeAreSection = {
  id: string;
  label?: string;
  titleLines?: string[];
  callout?: string;
  body?: string;
  image?: string;
  sketchImages?: {
    pizza?: string;
    leaf?: string;
    cabbage?: string;
  };
};

type OurValuesSection = {
  id: string;
  label?: string;
  body?: string;
  items?: {
    id?: number | string;
    title: string;
    subTitle?: string;
    icon?: string;
  }[];
};

type AboutIntroSection = {
  id: string;
  statValue?: string;
  statLabelLines?: string[];
};

const AboutStorySection = () => {
  const { getSection } = useContent();
  const whoWeAre = getSection<WhoWeAreSection>("about", "whoWeAre");
  const ourValues = getSection<OurValuesSection>("about", "ourValues");
  const aboutIntro = getSection<AboutIntroSection>("home", "aboutIntro");

  const cabbage = mediaUrl(whoWeAre?.sketchImages?.cabbage);
  const leaf = mediaUrl(whoWeAre?.sketchImages?.leaf);
  const pizza = mediaUrl(whoWeAre?.sketchImages?.pizza);
  const image = mediaUrl(whoWeAre?.image);
  const titleLines = whoWeAre?.titleLines ?? [];
  const valueItems = ourValues?.items ?? [];

  return (
    <section id="story" className="relative overflow-x-clip bg-surface">
      {cabbage ? (
        <img
          src={cabbage}
          alt=""
          width={200}
          height={200}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-24 left-0 z-10 w-20 -translate-x-1/4 select-none sm:bottom-28 sm:w-24 lg:bottom-32 lg:w-30"
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
          className="pointer-events-none absolute top-6 right-0 hidden w-20 select-none sm:w-24 lg:top-10 lg:block lg:w-32"
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
          className="pointer-events-none absolute right-2 bottom-10 hidden w-16 select-none sm:block sm:w-18 lg:right-6 lg:bottom-14 lg:w-24"
        />
      ) : null}

      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:py-24 xl:gap-12">
        <InView variants={fadeLeft} className="relative lg:pt-4">
          {whoWeAre?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {whoWeAre.label}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-[1.5rem] leading-[1.18] font-bold tracking-[-0.03em] text-text sm:text-[1.65rem] lg:text-[1.7rem] xl:text-[1.85rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          {whoWeAre?.callout ? (
            <p className="mt-6 border-l-2 border-brand pl-4 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {whoWeAre.callout}
            </p>
          ) : null}
          {whoWeAre?.body ? (
            <p className="mt-6 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {whoWeAre.body}
            </p>
          ) : null}
        </InView>

        <InView
          variants={fadeUp}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {image ? (
            <div className="overflow-hidden rounded-[1.35rem]">
              <img
                src={image}
                alt="Guests sharing a restaurant meal"
                width={3000}
                height={1688}
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover object-[62%_42%] sm:aspect-3/4"
              />
            </div>
          ) : null}
          {aboutIntro?.statValue ? (
            <div className="absolute bottom-5 left-3 z-20 w-36 rounded-xl bg-accent px-4 py-5 text-center text-text-inverse shadow-lg sm:bottom-6 sm:left-4 sm:w-40 sm:py-6">
              <p className="font-heading text-[2.6rem] leading-none font-bold sm:text-[3rem]">
                {aboutIntro.statValue}
              </p>
              <p className="mt-2 font-body text-sm leading-snug">
                {(aboutIntro.statLabelLines ?? []).map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ) : null}
        </InView>

        <InView variants={fadeRight} className="relative lg:pt-4">
          {ourValues?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {ourValues.label}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-[1.5rem] leading-[1.18] font-bold tracking-[-0.03em] text-text sm:text-[1.65rem] lg:text-[1.7rem] xl:text-[1.85rem]">
            {titleLines.map((line, index) => (
              <span key={`values-${line}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
          {ourValues?.body ? (
            <p className="mt-5 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {ourValues.body}
            </p>
          ) : null}
          <div
            aria-hidden="true"
            className="mt-6 border-t border-dashed border-brand/40"
          />
          <ul className="mt-7 space-y-6">
            {valueItems.map((item, index) => (
              <li key={String(item.id ?? item.title)} className="flex gap-3.5">
                <span
                  className={[
                    "flex size-12 shrink-0 items-center justify-center rounded-full",
                    index === 0 ? "bg-brand" : "bg-accent",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.icon ? (
                    <img
                      src={mediaUrl(item.icon)}
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                      className="size-5 brightness-0 invert"
                    />
                  ) : null}
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-text">
                    {item.title}
                  </h3>
                  {item.subTitle ? (
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary">
                      {item.subTitle}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
};

export default AboutStorySection;
