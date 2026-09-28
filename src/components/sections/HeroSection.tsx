import { motion, useReducedMotion } from "framer-motion";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeLeft, fadeRight } from "../motion/InView";
import Button from "../ui/Button";
import HeroBackdrop from "../ui/HeroBackdrop";

type HeroSectionContent = {
  id: string;
  badge?: string;
  titleLines?: string[];
  subTitle?: string;
  primaryCtaText?: string;
  primaryCtaPath?: string;
  secondaryCtaText?: string;
  secondaryCtaPath?: string;
  bgImg?: string;
  image?: string;
  imageAlt?: string;
  accentImage?: string;
};

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0.01 : 0.55;
  const { section } = usePageSection<HeroSectionContent>("home", "hero");

  const titleLines = section?.titleLines ?? [];
  const accentSrc = mediaUrl(section?.accentImage);
  const imageSrc = mediaUrl(section?.image);
  const bgSrc = mediaUrl(section?.bgImg);

  return (
    <section id="home" className="relative isolate min-h-svh overflow-x-clip">
      {accentSrc ? (
        <motion.img
          src={accentSrc}
          alt=""
          width={200}
          height={200}
          decoding="async"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration, delay: 0.18, ease: "easeOut" }}
          className="pointer-events-none absolute top-60 -left-4 w-12 rotate-40 select-none sm:w-20 lg:w-30"
        />
      ) : null}

      <HeroBackdrop src={bgSrc || undefined} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[20%] -z-10 hidden h-[90%] w-[min(22vw,18.5rem)] bg-hero-patch lg:block"
      />

      <div className="relative mx-auto grid min-h-svh w-full max-w-7xl items-center gap-6 px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-4 lg:px-10 lg:pt-24 lg:pb-28">
        <div className="relative">
          <InView
            variants={fadeLeft}
            className="max-w-2xl pl-12 sm:pl-16 lg:pl-10"
          >
            {section?.badge ? (
              <p className="inline-flex rounded-full border border-white/70 px-3 py-1 font-body text-[0.6rem] font-semibold tracking-[0.12em] text-nowrap text-text-inverse uppercase sm:px-3.5 sm:text-[0.72rem] sm:tracking-[0.16em]">
                {section.badge}
              </p>
            ) : null}

            <h1 className="mt-5 font-heading text-[2.45rem] leading-[1.05] font-bold tracking-[-0.03em] text-text-inverse sm:text-5xl lg:text-[3.35rem] xl:text-[3.85rem]">
              {titleLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>

            {section?.subTitle ? (
              <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-white/85 sm:text-[0.98rem]">
                {section.subTitle}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button
                variant="secondary"
                size="cta"
                href={section?.primaryCtaPath}
              >
                {section?.primaryCtaText ?? "Book a Demo"}
              </Button>
              {section?.secondaryCtaText ? (
                <a
                  href={section.secondaryCtaPath ?? "/services"}
                  className="font-body text-sm font-semibold text-text-inverse transition-opacity hover:opacity-80"
                >
                  {section.secondaryCtaText}
                </a>
              ) : null}
            </div>
          </InView>
        </div>

        {imageSrc ? (
          <InView
            variants={fadeRight}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <motion.img
              src={imageSrc}
              alt={
                section?.imageAlt ??
                "Restaurant operations collage with orders, delivery, and customer satisfaction"
              }
              width={1536}
              height={1536}
              decoding="async"
              className={[
                "relative w-full max-w-md object-contain sm:max-w-lg lg:max-w-none",
                prefersReducedMotion ? "" : "will-change-transform",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;
