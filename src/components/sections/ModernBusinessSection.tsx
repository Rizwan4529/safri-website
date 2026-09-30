import { HiCheck } from "react-icons/hi2";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";

type PillarItem = {
  id?: number | string;
  title: string;
  body?: string;
  points?: string[];
  image?: string;
  imageAlt?: string;
  imageLeft?: boolean;
};

type ModernBusinessSectionContent = {
  id: string;
  badge?: string;
  title?: string;
  titleAccent?: string;
  titleLines?: string[];
  subTitle?: string;
  body?: string;
  points?: string[];
  bgImg?: string;
  image?: string;
  imageAlt?: string;
  items?: PillarItem[];
};

const ModernBusinessSection = () => {
  const { section } = usePageSection<ModernBusinessSectionContent>(
    "home",
    "modernBusiness",
  );
  const items = section?.items ?? [];
  const titleLines = section?.titleLines ?? [];
  const legacyPoints = section?.points ?? [];
  const isPillarsLayout = items.length > 0;
  const isLegacyLayout =
    !isPillarsLayout &&
    (Boolean(section?.title) ||
      titleLines.length > 0 ||
      Boolean(section?.body) ||
      legacyPoints.length > 0);

  if (!isPillarsLayout && !isLegacyLayout) return null;

  if (isLegacyLayout) {
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
              {titleLines.length > 0
                ? titleLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))
                : section?.title}
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
              {legacyPoints.map((point) => (
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
  }

  const titleBeforeAccent = (() => {
    if (!section?.title || !section.titleAccent) return section?.title;
    const idx = section.title.lastIndexOf(section.titleAccent);
    if (idx < 0) return section.title;
    return section.title.slice(0, idx).trimEnd();
  })();

  return (
    <section id="restaurants" className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.badge ? (
            <p className="inline-flex rounded-lg bg-brand-light px-3 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-brand uppercase">
              {section.badge}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-4 font-heading text-[1.85rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.55rem]">
              {section.titleAccent && titleBeforeAccent ? (
                <>
                  {titleBeforeAccent}{" "}
                  <span className="text-accent">{section.titleAccent}</span>
                </>
              ) : (
                section.title
              )}
            </h2>
          ) : null}
          {section?.subTitle ? (
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.subTitle}
            </p>
          ) : null}
        </InView>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 lg:mt-20 lg:gap-24">
          {items.map((item) => {
            const imageLeft = Boolean(item.imageLeft);
            const imageSrc = mediaUrl(item.image);
            const copyVariants = imageLeft ? fadeRight : fadeLeft;
            const artVariants = imageLeft ? fadeLeft : fadeRight;
            const points = item.points ?? [];

            return (
              <article
                key={String(item.id ?? item.title)}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20"
              >
                <InView
                  variants={copyVariants}
                  className={imageLeft ? "lg:order-2" : ""}
                >
                  <div className="max-w-lg">
                    <h3 className="font-heading text-[1.55rem] leading-tight font-bold tracking-[-0.02em] text-text sm:text-[1.75rem] lg:text-[1.95rem]">
                      {item.title}
                    </h3>
                    {item.body ? (
                      <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                        {item.body}
                      </p>
                    ) : null}
                    {points.length > 0 ? (
                      <ul className="mt-5 space-y-2.5">
                        {points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 font-body text-sm text-text-secondary sm:text-[0.95rem]"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                              <HiCheck
                                className="size-3.5"
                                aria-hidden="true"
                              />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </InView>

                {imageSrc ? (
                  <InView
                    variants={artVariants}
                    className={imageLeft ? "lg:order-1" : ""}
                  >
                    <div className="rounded-[1.75rem] bg-feature-panel p-6 sm:rounded-[2rem] sm:p-8 lg:rounded-[2.25rem] lg:p-10">
                      <img
                        src={imageSrc}
                        alt={item.imageAlt ?? item.title}
                        loading="lazy"
                        decoding="async"
                        className="mx-auto w-full max-w-md object-contain lg:max-w-none"
                      />
                    </div>
                  </InView>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModernBusinessSection;
