import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight, fadeUp } from "../motion/InView";

type FaqSectionContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  image?: string;
  leafImage?: string;
  items?: {
    id?: number | string;
    question: string;
    answer: string;
  }[];
};

const FaqSection = () => {
  const { section } = usePageSection<FaqSectionContent>("contact", "faq");
  const items = section?.items ?? [];
  const [openIndex, setOpenIndex] = useState(() =>
    Math.max(items.length - 1, 0),
  );
  const leafSrc = mediaUrl(section?.leafImage);
  const imageSrc = mediaUrl(section?.image);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section id="faq" className="relative overflow-x-clip bg-surface">
      {leafSrc ? (
        <img
          src={leafSrc}
          alt=""
          width={146}
          height={178}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-8 left-0 hidden w-16 select-none sm:block lg:bottom-12 lg:w-19"
        />
      ) : null}

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-2xl text-center">
          {section?.label ? (
            <p className="font-body text-lg font-semibold tracking-wide text-accent uppercase">
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

        <div className="mt-12 grid items-center gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {imageSrc ? (
            <InView variants={fadeLeft}>
              <img
                src={imageSrc}
                alt="Delivery rider and live order tracking"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-full object-contain"
              />
            </InView>
          ) : null}

          <InView variants={fadeRight} className="flex flex-col gap-4">
            {items.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={String(faq.id ?? faq.question)}
                  className="rounded-2xl border border-dashed border-text-muted/40 bg-surface-subtle"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-heading text-base font-bold text-text sm:text-lg">
                      {faq.question}
                    </span>
                    <HiChevronDown
                      aria-hidden="true"
                      className={[
                        "size-5 shrink-0 text-text-muted transition-transform duration-300 ease-out",
                        isOpen ? "rotate-180" : "rotate-0",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </button>
                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 font-body text-sm leading-relaxed text-text-secondary sm:px-6 sm:pb-6 sm:text-[0.95rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </InView>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
