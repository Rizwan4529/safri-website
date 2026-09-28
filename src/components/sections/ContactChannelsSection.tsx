import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";
import Button from "../ui/Button";

const channelIcons = {
  calendar: HiOutlineCalendarDays,
  chat: HiOutlineChatBubbleLeftRight,
  email: HiOutlineEnvelope,
} as const;

type ChannelsSection = {
  id: string;
  title?: string;
  body?: string;
  items?: {
    id?: number | string;
    key?: string;
    title: string;
    body: string;
    cta: string;
    path: string;
    icon?: keyof typeof channelIcons;
  }[];
};

const ContactChannelsSection = () => {
  const { section } = usePageSection<ChannelsSection>("contact", "channels");
  const items = section?.items ?? [];

  return (
    <section className="relative overflow-x-clip bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView
          variants={fadeUp}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12"
        >
          <div>
            <p className="font-body text-lg font-semibold text-accent">
              Contact Us
            </p>
            {section?.title ? (
              <h2 className="mt-2 max-w-xl font-heading text-[1.85rem] leading-[1.15] font-bold tracking-[-0.03em] text-text sm:text-[2.15rem] lg:text-[2.35rem]">
                {section.title}
              </h2>
            ) : null}
          </div>
          {section?.body ? (
            <p className="max-w-lg font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem] lg:justify-self-end">
              {section.body}
            </p>
          ) : null}
        </InView>

        <div className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((channel, index) => {
            const Icon =
              channelIcons[channel.icon ?? "calendar"] ??
              HiOutlineCalendarDays;

            return (
              <InView
                key={String(channel.id ?? channel.key ?? channel.title)}
                variants={fadeUp}
                delay={0.06 * index}
                className="relative rounded-2xl border border-dashed border-text-muted/40 bg-surface p-6 pt-8 sm:p-7 sm:pt-9"
              >
                <span className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-accent text-text-inverse sm:top-5 sm:right-5">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="max-w-[12rem] font-heading text-lg font-bold text-text sm:text-xl">
                  {channel.title}
                </h3>
                <p className="mt-3 min-h-20 font-body text-sm leading-relaxed text-text-secondary">
                  {channel.body}
                </p>
                <Button
                  href={channel.path}
                  variant="primary"
                  size="cta"
                  className="mt-7 w-full"
                >
                  {channel.cta}
                </Button>
              </InView>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactChannelsSection;
