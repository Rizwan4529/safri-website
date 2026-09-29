import { usePageSection } from "../../context/ContentContext";
import InView, { MotionChild, fadeLeft, staggerContainer } from "../motion/InView";
import Button from "../ui/Button";

type ValueCard = {
  id?: number | string;
  title: string;
  body?: string;
};

type ValueContent = {
  id: string;
  label?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
  ctaText?: string;
  ctaPath?: string;
  cards?: ValueCard[];
};

type ServicePackageValueSectionProps = {
  pageId: string;
};

const ServicePackageValueSection = ({
  pageId,
}: ServicePackageValueSectionProps) => {
  const { section } = usePageSection<ValueContent>(pageId, "value");
  const cards = section?.cards ?? [];
  if (!section?.title && cards.length === 0) return null;

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
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-10 lg:py-24">
        <InView variants={fadeLeft} className="max-w-md">
          {section?.label ? (
            <p className="inline-flex rounded-lg bg-[color:var(--service-soft)] px-3 py-1 font-body text-[0.7rem] font-bold tracking-[0.14em] text-[color:var(--service-accent)] uppercase">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-4 font-heading text-[1.75rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-[2rem] lg:text-[2.25rem]">
              {titleNodes}
            </h2>
          ) : null}
          {section?.body ? (
            <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {section.body}
            </p>
          ) : null}
          {section?.ctaText ? (
            <Button
              className="mt-8 border-0 text-text-inverse hover:opacity-90"
              style={{ backgroundColor: "var(--service-accent)" }}
              variant="primary"
              size="cta"
              href={section.ctaPath ?? "/contact"}
            >
              {section.ctaText}
            </Button>
          ) : null}
        </InView>

        <InView
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2"
        >
          {cards.map((card) => (
            <MotionChild key={String(card.id ?? card.title)}>
              <article className="h-full rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(0,40,32,0.04)] sm:p-6">
                <span
                  aria-hidden="true"
                  className="mb-4 block size-2.5 rounded-sm bg-[color:var(--service-accent)]"
                />
                <h3 className="font-heading text-base font-bold tracking-[-0.02em] text-text uppercase sm:text-[0.95rem]">
                  {card.title}
                </h3>
                {card.body ? (
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                    {card.body}
                  </p>
                ) : null}
              </article>
            </MotionChild>
          ))}
        </InView>
      </div>
    </section>
  );
};

export default ServicePackageValueSection;
