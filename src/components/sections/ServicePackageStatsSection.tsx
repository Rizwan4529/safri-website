import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";

type StatItem = {
  id?: number | string;
  value: string;
  label: string;
};

type StatsContent = {
  id: string;
  title?: string;
  titleAccent?: string;
  items?: StatItem[];
};

type ServicePackageStatsSectionProps = {
  pageId: string;
};

const ServicePackageStatsSection = ({
  pageId,
}: ServicePackageStatsSectionProps) => {
  const { section } = usePageSection<StatsContent>(pageId, "stats");
  const items = section?.items ?? [];
  if (items.length === 0) return null;

  const titleNodes = (() => {
    if (!section?.title) return null;
    if (!section.titleAccent) return section.title;
    const idx = section.title.lastIndexOf(section.titleAccent);
    if (idx < 0) return section.title;
    return (
      <>
        {section.title.slice(0, idx)}
        <span className="text-[color:var(--service-accent)]">
          {section.titleAccent}
        </span>
      </>
    );
  })();

  return (
    <section className="relative overflow-x-clip bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {section?.title ? (
          <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-3xl lg:text-[2.25rem]">
              {titleNodes}
            </h2>
          </InView>
        ) : null}

        <InView
          variants={fadeUp}
          className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-0"
        >
          {items.map((item, index) => (
            <div
              key={String(item.id ?? item.label)}
              className={[
                "text-center sm:px-8",
                index > 0 ? "sm:border-l sm:border-border" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="font-heading text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 font-body text-sm text-text-secondary">
                {item.label}
              </p>
            </div>
          ))}
        </InView>
      </div>
    </section>
  );
};

export default ServicePackageStatsSection;
