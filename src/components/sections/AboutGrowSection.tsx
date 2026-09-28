import { mediaUrl } from "../../config/env";
import { useContent } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";

type GrowBannerSection = {
  id: string;
  image?: string;
  imageAlt?: string;
};

type ModernBusinessSection = {
  id: string;
  titleLines?: string[];
};

type StatsSection = {
  id: string;
  stats?: { label: string; value: string }[];
};

const AboutGrowSection = () => {
  const { getSection } = useContent();
  const growBanner = getSection<GrowBannerSection>("about", "growBanner");
  const modernBusiness = getSection<ModernBusinessSection>(
    "home",
    "modernBusiness",
  );
  const statsSection = getSection<StatsSection>("home", "stats");

  const heading = (modernBusiness?.titleLines ?? []).join(" ");
  const growStats = (statsSection?.stats ?? []).slice(0, 3);
  const image = mediaUrl(growBanner?.image);

  return (
    <section className="relative overflow-x-clip bg-surface-subtle">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <InView variants={fadeLeft}>
          {heading ? (
            <h2 className="max-w-md font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:text-[2.2rem] xl:text-[2.45rem]">
              {heading}
            </h2>
          ) : null}
          <div
            aria-hidden="true"
            className="mt-6 max-w-md border-t border-dashed border-brand/40"
          />
          <div className="mt-10 flex gap-5 sm:mt-12 sm:gap-8 lg:gap-10">
            {growStats.map((stat) => (
              <div key={stat.label} className="min-w-0 flex-1">
                <p className="font-heading text-[1.85rem] leading-none font-bold tracking-tight text-text sm:text-4xl lg:text-[2.75rem]">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-xs text-text-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </InView>

        <InView
          variants={fadeRight}
          className="relative flex items-center justify-center py-14 sm:py-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 z-0 h-full w-40 -translate-x-1/2 bg-hero-patch sm:w-44 lg:w-48"
          />
          {image ? (
            <img
              src={image}
              alt={growBanner?.imageAlt ?? "Restaurant food highlight"}
              width={2500}
              height={2500}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-3/4 object-contain"
            />
          ) : null}
        </InView>
      </div>
    </section>
  );
};

export default AboutGrowSection;
