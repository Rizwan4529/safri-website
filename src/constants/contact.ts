export const CONTACT_LABEL = "Contact Us";
export const CONTACT_HEADING = "Partner With Safri";
export const CONTACT_SUBHEADING =
  "Tell us about your restaurants and outlets. We will map how Safri fits your menus, fulfillment types, and growth plans.";
export const CONTACT_SUBMIT_LABEL = "Register Your Restaurant";
export const CONTACT_SUCCESS_TOAST =
  "Thanks — our team will reach out about your restaurant shortly.";

export const CONTACT_CHANNELS_HEADING =
  "We're Building The Smarter Side Of Food Business.";
export const CONTACT_CHANNELS_BODY =
  "Whether you need a product walkthrough, a quick WhatsApp answer, or a longer sales conversation, pick the channel that fits your team.";

export const contactChannels = [
  {
    id: "demo",
    title: "Book A Sales Demo",
    body: "Tell us about your restaurants and outlets—we will walk you through menus, orders, kitchen flow, and white-label apps.",
    cta: "Open the form",
    href: "#contact",
    icon: "calendar",
  },
  {
    id: "whatsapp",
    title: "Chat On WhatsApp",
    body: "Have a quick question about outlets, fulfillment types, or onboarding? Message us and we will reply during business hours.",
    cta: "Open WhatsApp",
    href: "#",
    icon: "chat",
  },
  {
    id: "email",
    title: "Email Sales",
    body: "Prefer email? Share your brand details and we will respond within one business day.",
    cta: "sales@safri.food",
    href: "mailto:sales@safri.food",
    icon: "email",
  },
] as const;

export const FAQ_LABEL = "FAQ";
export const FAQ_HEADING = "Everything You Need To Know";
export const FAQ_SUBHEADING =
  "Quick answers about Safri features, setup, multi-outlet operations, and restaurant ordering apps.";

export const faqItems = [
  {
    question: "What is Safri?",
    answer:
      "Safri is a restaurant technology platform that helps food brands manage menus, multi-outlet operations, kitchen tickets, and delivery—plus white-label guest apps for delivery, pickup, dine-in, and curbside ordering.",
  },
  {
    question: "Who is Safri for?",
    answer:
      "Safri is built for restaurant operators and growing food brands that want one system for merchant ops and branded customer ordering—especially teams running multiple outlets.",
  },
  {
    question: "Does Safri support white-label apps?",
    answer:
      "Yes. Each restaurant can ship under its own brand identity, store listing, and colours, while menus, outlets, and orders still come from the Safri platform.",
  },
  {
    question: "Which fulfillment types are supported?",
    answer:
      "Safri supports delivery, pickup, dine-in, and curbside flows so guests can order the way your outlets actually operate.",
  },
  {
    question: "Can my staff learn Safri quickly?",
    answer:
      "Yes. Day-to-day workflows—menus, tickets, order status, and outlet settings—are designed to be clear for restaurant teams working under real service pressure.",
  },
  {
    question: "Is Safri available in more than one language?",
    answer:
      "Guest-facing apps support English and Arabic (including RTL), which helps brands serve bilingual markets without maintaining separate products.",
  },
] as const;
