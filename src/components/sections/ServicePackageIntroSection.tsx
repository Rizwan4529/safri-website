import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";

type IntroContent = {
  id: string;
  label?: string;
  title?: string;
  body?: string;
};

type ServicePackageIntroSectionProps = {
  pageId: string;
};

const ServicePackageIntroSection = ({
  pageId,
}: ServicePackageIntroSectionProps) => {
  const { section } = usePageSection<IntroContent>(pageId, "intro");
  if (!section?.title && !section?.body) return null;

  return (
    <section className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <InView variants={fadeUp}>
          {section?.label ? (
            <p className="inline-flex rounded-lg bg-[color:var(--service-soft)] px-3 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-[color:var(--service-accent)] uppercase">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-4 font-heading text-[1.65rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-3xl lg:text-[2.15rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.body ? (
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.body}
            </p>
          ) : null}
        </InView>
      </div>
    </section>
  );
};

export default ServicePackageIntroSection;
