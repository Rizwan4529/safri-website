import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";
import Button from "../ui/Button";
import FeatureArtPanel from "../ui/FeatureArtPanel";

type FeatureItem = {
  id?: number | string;
  index?: string;
  title: string;
  description: string;
  bullets?: string[];
  imageLeft?: boolean;
  images?: {
    primary?: string;
    overlay?: string;
  };
};

type FeaturesSectionContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  leafImage?: string;
  items?: FeatureItem[];
};

const FeatureCopy = ({
  index,
  title,
  description,
  bullets = [],
  total,
}: FeatureItem & { total: string }) => {
  return (
    <div className="max-w-lg">
      <p className="font-body text-sm font-semibold tracking-wide text-accent">
        {index}/{total}
      </p>
      <h3 className="mt-2 font-heading text-[1.65rem] leading-tight font-bold tracking-[-0.02em] text-text sm:text-[1.85rem] lg:text-[2rem]">
        {title}
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
        {description}
      </p>
      {bullets.length > 0 ? (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 font-body text-sm text-text-secondary sm:text-[0.95rem]">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      <Button className="mt-7" variant="primary" size="cta" href="#contact">
        LEARN MORE
      </Button>
    </div>
  );
};

const FeatureArt = ({
  image,
  overlay,
  alt,
}: {
  image: string;
  overlay?: string;
  alt: string;
}) => {
  if (overlay) {
    return (
      <FeatureArtPanel panelClassName="top-[6%] right-[8%] bottom-[8%] left-[8%]">
        <div className="relative pt-[12%] pr-[2%] pb-[10%] pl-[22%]">
          <img
            src={image}
            alt={alt}
            width={437}
            height={280}
            loading="lazy"
            decoding="async"
            className="relative z-10 w-full object-contain"
          />
        </div>
        <img
          src={overlay}
          alt=""
          width={553}
          height={368}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute top-[10%] left-[-8%] z-20 w-[86%] object-contain sm:left-[-12%]"
        />
      </FeatureArtPanel>
    );
  }

  return (
    <FeatureArtPanel>
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="relative w-full object-contain"
      />
    </FeatureArtPanel>
  );
};

const FeaturesSection = () => {
  const { section } = usePageSection<FeaturesSectionContent>("home", "features");
  const items = section?.items ?? [];
  const total = String(items.length).padStart(2, "0");
  const leafSrc = mediaUrl(section?.leafImage);

  return (
    <section id="features" className="relative overflow-x-clip bg-surface">
      {leafSrc ? (
        <img
          src={leafSrc}
          alt=""
          width={146}
          height={178}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute top-8 left-0 hidden w-16 select-none sm:block lg:top-50 lg:w-[4.75rem]"
        />
      ) : null}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="relative">
          <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
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
        </div>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 lg:mt-20 lg:gap-24">
          {items.map((feature) => {
            const imageLeft = Boolean(feature.imageLeft);
            const copyVariants = imageLeft ? fadeRight : fadeLeft;
            const artVariants = imageLeft ? fadeLeft : fadeRight;
            const primary = mediaUrl(feature.images?.primary);
            const overlay = mediaUrl(feature.images?.overlay);

            return (
              <article
                key={String(feature.id ?? feature.title)}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              >
                <InView
                  variants={copyVariants}
                  className={imageLeft ? "lg:order-2" : ""}
                >
                  <FeatureCopy {...feature} total={total} />
                </InView>
                {primary ? (
                  <InView
                    variants={artVariants}
                    className={imageLeft ? "lg:order-1" : ""}
                  >
                    <FeatureArt
                      image={primary}
                      overlay={overlay || undefined}
                      alt={feature.title}
                    />
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

export default FeaturesSection;
