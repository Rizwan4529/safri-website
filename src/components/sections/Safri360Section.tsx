import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";
import Button from "../ui/Button";

type Safri360SectionContent = {
  id: string;
  label?: string;
  title?: string;
  body?: string;
  ctaText?: string;
  ctaPath?: string;
  image?: string;
  imageAlt?: string;
};

type Safri360SectionProps = {
  pageId?: string;
  sectionId?: string;
};

const Safri360Section = ({
  pageId = "home",
  sectionId = "safri360",
}: Safri360SectionProps) => {
  const { section } = usePageSection<Safri360SectionContent>(pageId, sectionId);
  const imageSrc = mediaUrl(section?.image);

  if (!section?.title && !section?.body) return null;

  return (
    <section
      id="safri-360"
      className="relative overflow-x-clip bg-brand text-text-inverse"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <InView variants={fadeLeft} className="max-w-xl">
          {section?.label ? (
            <p className="font-body text-sm font-semibold tracking-[0.16em] text-white/80 uppercase">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-3 font-heading text-[1.85rem] leading-tight font-bold tracking-[-0.03em] text-text-inverse sm:text-4xl lg:text-[2.45rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.body ? (
            <p className="mt-4 font-body text-sm leading-relaxed text-white/85 sm:text-[0.98rem]">
              {section.body}
            </p>
          ) : null}
          {section?.ctaText ? (
            <Button
              className="mt-8"
              variant="secondary"
              size="cta"
              href={section.ctaPath ?? "/services/360"}
            >
              {section.ctaText}
            </Button>
          ) : null}
        </InView>

        {imageSrc ? (
          <InView
            variants={fadeRight}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="animate-float-slower will-change-transform motion-reduce:animate-none">
              <img
                src={imageSrc}
                alt={section?.imageAlt ?? "Safri 360° dashboard"}
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
              />
            </div>
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default Safri360Section;
