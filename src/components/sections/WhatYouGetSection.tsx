import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";
import FeatureArtPanel from "../ui/FeatureArtPanel";
import ServiceFeatureCard from "../ui/ServiceFeatureCard";

type WhatYouGetContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  image?: string;
  imageAlt?: string;
  items?: {
    id?: number | string;
    index: string;
    title: string;
    body: string;
  }[];
};

const WhatYouGetSection = () => {
  const { section } = usePageSection<WhatYouGetContent>(
    "services",
    "whatYouGet",
  );
  const items = section?.items ?? [];
  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3);
  const image = mediaUrl(section?.image);

  if (!section?.title && items.length === 0) return null;

  return (
    <section className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-2xl text-center">
          {section?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-2 font-heading text-[1.85rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-[2.55rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.subTitle ? (
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.subTitle}
            </p>
          ) : null}
        </InView>

        <div className="mt-12 grid items-center gap-8 sm:mt-14 lg:mt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6 xl:gap-8">
          <InView variants={fadeLeft} className="flex flex-col gap-4 sm:gap-5">
            {leftItems.map((item) => (
              <ServiceFeatureCard
                key={String(item.id ?? item.index)}
                index={item.index}
                title={item.title}
                body={item.body}
              />
            ))}
          </InView>

          {image ? (
            <InView variants={fadeUp} className="order-first lg:order-0">
              <FeatureArtPanel panelClassName="inset-[6%] sm:inset-[8%]">
                <img
                  src={image}
                  alt={section?.imageAlt ?? "Delivery rider with live tracking"}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full object-contain"
                />
              </FeatureArtPanel>
            </InView>
          ) : null}

          <InView variants={fadeRight} className="flex flex-col gap-4 sm:gap-5">
            {rightItems.map((item) => (
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

export default WhatYouGetSection;
