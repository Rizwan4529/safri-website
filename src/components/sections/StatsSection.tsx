import { usePageSection } from "../../context/ContentContext";
import InView, {
  MotionChild,
  staggerContainer,
  staggerItem,
} from "../motion/InView";

type StatsSectionContent = {
  id: string;
  stats?: { label: string; value: string }[];
};

const StatsSection = () => {
  const { section } = usePageSection<StatsSectionContent>("home", "stats");
  const stats = section?.stats ?? [];

  return (
    <section className="bg-stats">
      <InView
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-4 lg:px-10 lg:py-16"
        amount={0.35}
      >
        {stats.map((stat) => (
          <MotionChild
            key={stat.label}
            variants={staggerItem}
            className="flex flex-col items-center text-center"
          >
            <p className="font-heading text-4xl leading-none font-bold tracking-tight text-text-inverse sm:text-5xl lg:text-[3.25rem]">
              {stat.value}
            </p>
            <p className="mt-2.5 font-body text-sm text-white/90 sm:text-base">
              {stat.label}
            </p>
          </MotionChild>
        ))}
      </InView>
    </section>
  );
};

export default StatsSection;
