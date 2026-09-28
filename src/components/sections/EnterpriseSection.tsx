import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";

type EnterpriseSectionContent = {
  id: string;
  label?: string;
  titleLines?: string[];
  statValue?: string;
  statLabel?: string;
  sideHeading?: string;
  sideBody?: string;
};

const EnterpriseSection = () => {
  const { section } = usePageSection<EnterpriseSectionContent>(
    "services",
    "enterprise",
  );
  const titleLines = section?.titleLines ?? [];

  return (
    <section id="enterprise" className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
              {section.label}
            </p>
          ) : null}
          <h2 className="mt-2 font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:text-[2.45rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h2>
        </InView>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:gap-0">
          <InView
            variants={fadeLeft}
            className="flex items-center justify-center gap-4 lg:justify-end lg:pr-12 xl:pr-16"
          >
            {section?.statValue ? (
              <p className="font-heading text-[5rem] leading-none font-bold tracking-[-0.04em] text-brand sm:text-[6rem] lg:text-[7rem]">
                {section.statValue}
              </p>
            ) : null}
            {section?.statLabel ? (
              <p className="font-body text-sm tracking-[0.08em] text-text-secondary [writing-mode:vertical-rl] sm:text-base">
                {section.statLabel}
              </p>
            ) : null}
          </InView>

          <InView
            variants={fadeRight}
            className="border-t border-dashed border-brand/35 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12 xl:pl-16"
          >
            {section?.sideHeading ? (
              <h3 className="max-w-md font-heading text-[1.35rem] leading-snug font-bold tracking-[-0.02em] text-text sm:text-[1.55rem] lg:text-[1.65rem]">
                {section.sideHeading}
              </h3>
            ) : null}
            {section?.sideBody ? (
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                {section.sideBody}
              </p>
            ) : null}
          </InView>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
