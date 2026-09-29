import { HiCheck } from "react-icons/hi2";
import { usePageSection } from "../../context/ContentContext";
import InView, { MotionChild, fadeUp, staggerContainer } from "../motion/InView";

type BuiltItem = {
  id?: number | string;
  title: string;
  body?: string;
};

type BuiltForContent = {
  id: string;
  label?: string;
  title?: string;
  titleAccent?: string;
  items?: BuiltItem[];
};

type ServicePackageBuiltForSectionProps = {
  pageId: string;
};

const ServicePackageBuiltForSection = ({
  pageId,
}: ServicePackageBuiltForSectionProps) => {
  const { section } = usePageSection<BuiltForContent>(pageId, "builtFor");
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
    <section
      id="built-for"
      className="relative overflow-x-clip"
      style={{ backgroundColor: "var(--service-soft)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.label ? (
            <p className="inline-flex rounded-lg bg-surface px-3 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-[color:var(--service-accent)] uppercase">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-4 font-heading text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-3xl lg:text-[2.25rem]">
              {titleNodes}
            </h2>
          ) : null}
        </InView>

        <InView
          variants={staggerContainer}
          className="mt-12 grid gap-x-10 gap-y-8 sm:mt-14 sm:grid-cols-2"
        >
          {items.map((item) => (
            <MotionChild key={String(item.id ?? item.title)}>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--service-accent)] text-text-inverse"
                >
                  <HiCheck className="size-4" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-bold tracking-[-0.02em] text-text">
                    {item.title}
                  </h3>
                  {item.body ? (
                    <p className="mt-1.5 font-body text-sm leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                  ) : null}
                </div>
              </div>
            </MotionChild>
          ))}
        </InView>
      </div>
    </section>
  );
};

export default ServicePackageBuiltForSection;
