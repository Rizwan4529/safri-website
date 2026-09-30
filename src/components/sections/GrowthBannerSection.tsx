import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";

type GrowthBannerContent = {
  id: string;
  titleLines?: string[];
  bgImg?: string;
};

const GrowthBannerSection = () => {
  const { section } = usePageSection<GrowthBannerContent>(
    "services",
    "growthBanner",
  );
  const titleLines = section?.titleLines ?? [];
  const bgSrc = mediaUrl(section?.bgImg);

  if (titleLines.length === 0 && !bgSrc) return null;

  return (
    <section className="relative overflow-x-clip">
      {bgSrc ? (
        <img
          src={bgSrc}
          alt=""
          width={1920}
          height={600}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      ) : null}
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <InView variants={fadeUp} className="max-w-4xl text-center">
          <h2 className="font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text-inverse sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
        </InView>
      </div>
    </section>
  );
};

export default GrowthBannerSection;
