export const FEATURES_LABEL = "Our Features";
export const FEATURES_HEADING = "Grow Your Business With Safri";
export const FEATURES_SUBHEADING =
  "Join restaurant brands using Safri to run menus, kitchens, and branded ordering across every outlet from one connected system.";

export const featureCopy = [
  {
    index: "01",
    title: "Orders & Menu Management",
    description:
      "Publish menus, modifiers, pricing, and availability once—then sync across outlets. Capture delivery, pickup, dine-in, and curbside orders in a single queue with kitchen tickets that keep the line moving.",
    bullets: [] as const,
    imageLeft: false,
  },
  {
    index: "02",
    title: "Multi-Outlet Control",
    description:
      "Operate every branch from one dashboard. Monitor performance, push menu and price updates, and keep fulfillment standards consistent without juggling separate tools per location.",
    bullets: [
      "Centralized order management",
      "Real-time menu & pricing updates",
      "Outlet-level taxes and configuration",
    ] as const,
    imageLeft: true,
  },
  {
    index: "03",
    title: "Delivery & Fulfillment",
    description:
      "Coordinate delivery dispatch with live status, while still supporting pickup, dine-in, and curbside. Give guests a clear path from order placed to order in hand.",
    bullets: [
      "Delivery, pickup, dine-in & curbside",
      "Kitchen tickets for prep accuracy",
      "Live delivery tracking for guests",
      "Reliable handoff workflows",
    ] as const,
    imageLeft: false,
  },
  {
    index: "04",
    title: "Insights That Drive Revenue",
    description:
      "Use sales dashboards, delivery performance, and order trends to spot what sells, where outlets need support, and how to grow profitable volume—not just more tickets.",
    bullets: [
      "Outlet & sales reporting",
      "Delivery time insights",
      "Product performance visibility",
      "Decisions rooted in live ops data",
    ] as const,
    imageLeft: true,
  },
] as const;
