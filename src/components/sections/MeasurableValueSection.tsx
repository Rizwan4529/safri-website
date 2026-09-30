import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";
import ServiceFeatureCard from "../ui/ServiceFeatureCard";

type MeasurableValueContent = {
  id: string;
  label?: string;
  title?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  items?: {
    id?: number | string;
    index: string;
    title: string;
    body: string;
  }[];
};

const MeasurableValueSection = () => {
  const { section } = usePageSection<MeasurableValueContent>(
    "services",
    "measurableValue",
  );
  const items = section?.items ?? [];
  const image = mediaUrl(section?.image);

  if (!section?.title && items.length === 0) return null;

  return (
    <section className="relative overflow-x-clip bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView
          variants={fadeUp}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12"
        >
          <div>
            {section?.label ? (
              <p className="font-body text-lg font-semibold text-accent">
                {section.label}
              </p>
            ) : null}
            {section?.title ? (
              <h2 className="mt-2 max-w-xl font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:text-[2.35rem]">
                {section.title}
              </h2>
            ) : null}
          </div>
          {section?.body ? (
            <p className="max-w-lg font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem] lg:justify-self-end">
              {section.body}
            </p>
          ) : null}
        </InView>

        <div className="mt-12 grid items-center gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {image ? (
            <InView variants={fadeLeft}>
              <img
                src={image}
                alt={
                  section?.imageAlt ??
                  "Analytics dashboards on laptop and phone"
                }
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
              />
            </InView>
          ) : null}

          <InView
            variants={fadeRight}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {items.map((item) => (
              <ServiceFeatureCard
                key={String(item.id ?? item.index)}
                index={item.index}
                title={item.title}
                body={item.body}
              />
            ))}
          </InView>
        </div>
      </div>
    </section>
  );
};

export default MeasurableValueSection;
