import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";

type OperationsSection = {
  id: string;
  title?: string;
  body?: string;
  callout?: string;
  image?: string;
  items?: {
    id?: number | string;
    title: string;
    subTitle?: string;
  }[];
};

const AboutOperationsSection = () => {
  const { section } = usePageSection<OperationsSection>("about", "operations");
  const items = section?.items ?? [];
  const image = mediaUrl(section?.image);

  return (
    <section className="relative overflow-x-clip bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24 xl:gap-20">
        <InView
          variants={fadeLeft}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
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
                className="aspect-4/5 w-full object-cover object-[38%_42%] sm:aspect-3/4"
              />
            </div>
          ) : null}
          {section?.callout ? (
            <div className="absolute right-3 bottom-5 z-20 w-[min(88%,20rem)] rounded-xl bg-accent/85 px-4 py-4 text-text-inverse shadow-lg backdrop-blur-md sm:right-4 sm:bottom-6 sm:px-5 sm:py-5 lg:-right-6">
              <p className="font-body text-[0.78rem] leading-relaxed text-white/95 sm:text-sm">
                {section.callout}
              </p>
            </div>
          ) : null}
        </InView>

        <InView variants={fadeRight}>
          {section?.title ? (
            <h2 className="font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:text-[2.35rem] xl:text-[2.55rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.body ? (
            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.body}
            </p>
          ) : null}
          <ul className="mt-8">
            {items.map((point, index) => (
              <li
                key={String(point.id ?? point.title)}
                className={[
                  "flex gap-3 py-5",
                  index < items.length - 1
                    ? "border-b border-dashed border-brand/35"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-heading text-lg leading-none font-bold text-brand"
                >
                  *
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold text-text sm:text-lg">
                    {point.title}
                  </h3>
                  {point.subTitle ? (
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary">
                      {point.subTitle}
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

export default AboutOperationsSection;
