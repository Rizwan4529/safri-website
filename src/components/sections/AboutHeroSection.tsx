import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";
import HeroBackdrop from "../ui/HeroBackdrop";

type AboutHeroContent = {
  id: string;
  titleLines?: string[];
  body?: string;
};

const AboutHeroSection = () => {
  const { section } = usePageSection<AboutHeroContent>("about", "hero");
  const titleLines = section?.titleLines ?? [];

  return (
    <section className="relative isolate min-h-svh overflow-x-clip">
      <HeroBackdrop />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl items-center justify-center px-5 pt-28 pb-24 sm:px-8 sm:pt-32 sm:pb-28 lg:px-10 lg:pt-24 lg:pb-32">
        <InView
          variants={fadeUp}
          className="max-w-4xl text-center xl:max-w-5xl"
        >
          <h1 className="font-heading text-[2.15rem] leading-[1.12] font-bold tracking-[-0.03em] text-text-inverse sm:text-4xl lg:text-[3.05rem] xl:text-[3.35rem]">
            {titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          {section?.body ? (
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-text-inverse/85 sm:mt-7 sm:text-[0.98rem]">
              {section.body}
            </p>
          ) : null}
        </InView>
      </div>
    </section>
  );
};

export default AboutHeroSection;
