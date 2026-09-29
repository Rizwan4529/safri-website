import { Link } from "react-router-dom";
import { usePageSection } from "../../context/ContentContext";
import InView, { MotionChild, fadeUp, staggerContainer } from "../motion/InView";

type ExploreItem = {
  id?: number | string;
  title: string;
  badge?: string;
  body?: string;
  path: string;
};

type ExploreContent = {
  id: string;
  title?: string;
  items?: ExploreItem[];
};

type ServicePackageExploreSectionProps = {
  pageId: string;
};

const ServicePackageExploreSection = ({
  pageId,
}: ServicePackageExploreSectionProps) => {
  const { section } = usePageSection<ExploreContent>(pageId, "explore");
  const items = section?.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="relative overflow-x-clip bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {section?.title ? (
          <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-3xl">
              {section.title}
            </h2>
          </InView>
        ) : null}

        <InView
          variants={staggerContainer}
          className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <MotionChild key={String(item.id ?? item.path)}>
              <Link
                to={item.path}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-[0_12px_32px_rgba(0,40,32,0.08)] sm:p-6"
              >
                {item.badge ? (
                  <span className="inline-flex w-fit rounded-lg bg-[color:var(--service-soft)] px-2 py-0.5 font-body text-[0.65rem] font-bold tracking-[0.12em] text-[color:var(--service-accent)] uppercase">
                    {item.badge}
                  </span>
                ) : null}
                <h3 className="mt-3 font-heading text-lg font-bold tracking-[-0.02em] text-text">
                  {item.title}
                </h3>
                {item.body ? (
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                ) : null}
                <span className="mt-4 font-body text-sm font-semibold text-[color:var(--service-accent)]">
                  Learn more
                </span>
              </Link>
            </MotionChild>
          ))}
        </InView>
      </div>
    </section>
  );
};

export default ServicePackageExploreSection;
