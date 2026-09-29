import {
  HiOutlineBolt,
  HiOutlineMegaphone,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { mediaUrl } from "../../config/env";
import { usePageSection } from "../../context/ContentContext";
import InView, {
  MotionChild,
  fadeUp,
  staggerContainer,
} from "../motion/InView";

type NeedItem = {
  id?: number | string;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  icon?: "bag" | "bolt" | "megaphone";
};

type RestaurantNeedsContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  items?: NeedItem[];
};

const IconBadge = ({ icon }: { icon?: NeedItem["icon"] }) => {
  const Icon =
    icon === "bolt"
      ? HiOutlineBolt
      : icon === "megaphone"
        ? HiOutlineMegaphone
        : HiOutlineShoppingBag;

  return (
    <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/70 bg-brand-light shadow-sm">
      <Icon className="size-4 text-brand" aria-hidden="true" />
    </span>
  );
};

const RestaurantNeedsSection = () => {
  const { section } = usePageSection<RestaurantNeedsContent>(
    "home",
    "restaurantNeeds",
  );
  const items = section?.items ?? [];

  if (!section?.title && items.length === 0) return null;

  return (
    <section
      id="restaurant-needs"
      className="relative overflow-x-clip"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-brand-dark) 0%, color-mix(in srgb, var(--color-brand) 72%, #000) 22%, var(--color-brand) 50%, color-mix(in srgb, var(--color-brand) 72%, #000) 78%, var(--color-brand-dark) 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.label ? (
            <p className="font-body text-sm font-semibold tracking-[0.16em] text-brand-light uppercase">
              {section.label}
            </p>
          ) : null}
          {section?.title ? (
            <h2 className="mt-3 font-heading text-[1.85rem] leading-tight font-bold tracking-[-0.03em] text-text-inverse sm:text-4xl lg:text-[2.55rem]">
              {section.title}
            </h2>
          ) : null}
          {section?.subTitle ? (
            <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
              {section.subTitle}
            </p>
          ) : null}
        </InView>

        <InView
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {items.map((item) => {
            const imageSrc = mediaUrl(item.image);
            return (
              <MotionChild key={String(item.id ?? item.title)}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-brand-dark shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
                  <div className="relative aspect-4/3 overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.imageAlt ?? item.title}
                        width={1200}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                      />
                    ) : null}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/45 to-transparent"
                    />
                    <div className="absolute top-4 left-4">
                      <IconBadge icon={item.icon} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pt-1 pb-6 sm:px-6 sm:pb-7">
                    <h3 className="font-heading text-lg font-bold tracking-[-0.02em] text-text-inverse sm:text-xl">
                      {item.title}
                    </h3>
                    {item.body ? (
                      <p className="mt-2 font-body text-sm leading-relaxed text-white/70">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </article>
              </MotionChild>
            );
          })}
        </InView>
      </div>
    </section>
  );
};

export default RestaurantNeedsSection;
