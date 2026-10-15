import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import {
  HiCheck,
  HiOutlineArrowRight,
  HiOutlineChevronDown,
  HiOutlineMinus,
  HiSparkles,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { usePageSection } from "../../context/ContentContext";
import { useSignupModal } from "../../context/SignupModalContext";
import InView, {
  fadeUp,
  MotionChild,
  scaleStaggerItem,
  staggerContainer,
} from "../motion/InView";
import Button from "../ui/Button";

type BillingCycle = "monthly" | "yearly";

type PricingPlan = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  feeNote?: string;
  popular?: boolean;
  featuresTitle?: string;
  features?: string[];
  ctaText?: string;
  detailsPath?: string;
};

type ComparisonRow = {
  feature: string;
  values: (boolean | string)[];
};

type PricingSectionContent = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  currency?: string;
  popularLabel?: string;
  compareLabel?: string;
  plans?: PricingPlan[];
  comparison?: ComparisonRow[];
};

type PricingSectionProps = {
  pageId?: string;
  sectionId?: string;
};

const formatAmount = (value: number) => value.toLocaleString("en-US");

const yearlySaving = (plan: PricingPlan) =>
  Math.max(plan.monthlyPrice * 12 - plan.yearlyPrice, 0);

const PricingSection = ({
  pageId = "home",
  sectionId = "pricing",
}: PricingSectionProps) => {
  const { section } = usePageSection<PricingSectionContent>(pageId, sectionId);
  const { openSignupModal } = useSignupModal();
  const prefersReducedMotion = useReducedMotion();
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [compareOpen, setCompareOpen] = useState(false);
  const compareId = useId();

  const plans = section?.plans ?? [];
  const comparison = section?.comparison ?? [];
  const currency = section?.currency ?? "SAR";
  const isYearly = billing === "yearly";

  const maxSavingPercent = Math.floor(
    Math.max(
      0,
      ...plans
        .filter((plan) => plan.monthlyPrice > 0)
        .map((plan) => (yearlySaving(plan) / (plan.monthlyPrice * 12)) * 100),
    ),
  );

  if (plans.length === 0) return null;

  const billingOptions: { value: BillingCycle; label: string }[] = [
    { value: "monthly", label: section?.monthlyLabel ?? "Monthly" },
    { value: "yearly", label: section?.yearlyLabel ?? "Yearly" },
  ];

  return (
    <section id="pricing" className="relative overflow-x-clip bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-3xl text-center">
          {section?.label ? (
            <p className="font-body text-lg font-semibold text-accent">
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

          <div
            role="radiogroup"
            aria-label="Billing cycle"
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1 shadow-[0_8px_30px_rgba(0,40,32,0.06)]"
          >
            {billingOptions.map((option) => {
              const selected = billing === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-5 py-2 font-body text-sm font-semibold transition-colors duration-200",
                    selected
                      ? "bg-brand text-text-inverse"
                      : "text-text-secondary hover:text-brand",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setBilling(option.value)}
                >
                  {option.label}
                  {option.value === "yearly" && maxSavingPercent > 0 ? (
                    <span
                      className={[
                        "rounded-full px-2 py-0.5 text-[0.7rem] font-bold",
                        selected
                          ? "bg-white/20 text-text-inverse"
                          : "bg-accent/10 text-accent",
                      ].join(" ")}
                    >
                      Save {maxSavingPercent}%
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </InView>

        <InView
          variants={staggerContainer}
          amount={0.15}
          className="mx-auto mt-12 grid max-w-md gap-6 sm:mt-14 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-5 xl:gap-7"
        >
          {plans.map((plan) => {
            const popular = Boolean(plan.popular);
            const isFree = plan.monthlyPrice === 0 && plan.yearlyPrice === 0;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const saving = yearlySaving(plan);

            return (
              <MotionChild
                key={plan.id}
                variants={scaleStaggerItem}
                className={popular ? "lg:-my-4" : undefined}
              >
                <article
                  className={[
                    "relative flex h-full flex-col rounded-2xl p-6 sm:p-8",
                    popular
                      ? "bg-brand text-text-inverse shadow-[0_24px_60px_rgba(0,90,78,0.28)]"
                      : "border border-border bg-surface text-text shadow-[0_8px_30px_rgba(0,40,32,0.04)]",
                  ].join(" ")}
                >
                  {popular ? (
                    <p className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 font-body text-[0.7rem] font-bold tracking-[0.14em] whitespace-nowrap text-text-inverse uppercase shadow-md">
                      <HiSparkles aria-hidden="true" className="size-3.5" />
                      {section?.popularLabel ?? "Most popular"}
                    </p>
                  ) : null}

                  <header>
                    <h3 className="font-heading text-xl font-bold tracking-[-0.02em]">
                      {plan.name}
                    </h3>
                    {plan.tagline ? (
                      <p
                        className={[
                          "mt-1 font-body text-sm font-semibold",
                          popular ? "text-white/80" : "text-brand",
                        ].join(" ")}
                      >
                        {plan.tagline}
                      </p>
                    ) : null}
                  </header>

                  <div className="mt-6 min-h-23">
                    <p className="flex items-baseline gap-2">
                      <motion.span
                        key={`${plan.id}-${billing}`}
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, y: 8 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="font-heading text-[2.75rem] leading-none font-bold tracking-[-0.03em]"
                      >
                        {isFree ? "Free" : formatAmount(price)}
                      </motion.span>
                      {!isFree ? (
                        <span
                          className={[
                            "font-body text-sm font-medium",
                            popular ? "text-white/80" : "text-text-muted",
                          ].join(" ")}
                        >
                          {currency} / {isYearly ? "year" : "month"}
                        </span>
                      ) : null}
                    </p>
                    <p
                      className={[
                        "mt-2.5 font-body text-[0.8rem] font-semibold",
                        popular ? "text-white" : "text-accent",
                      ].join(" ")}
                    >
                      {isFree
                        ? "No subscription, no card required"
                        : isYearly
                          ? `Save ${formatAmount(saving)} ${currency} a year`
                          : `or ${formatAmount(plan.yearlyPrice)} ${currency} billed yearly`}
                    </p>
                    {plan.feeNote ? (
                      <p
                        className={[
                          "mt-1 font-body text-xs",
                          popular ? "text-white/70" : "text-text-muted",
                        ].join(" ")}
                      >
                        {plan.feeNote}
                      </p>
                    ) : null}
                  </div>

                  {plan.description ? (
                    <p
                      className={[
                        "mt-5 font-body text-sm leading-relaxed",
                        popular ? "text-white/85" : "text-text-secondary",
                      ].join(" ")}
                    >
                      {plan.description}
                    </p>
                  ) : null}

                  <Button
                    variant={popular ? "secondary" : "outline"}
                    size="cta"
                    className="mt-6 w-full"
                    onClick={openSignupModal}
                  >
                    {plan.ctaText ?? "Book a demo"}
                  </Button>

                  <div
                    aria-hidden="true"
                    className={[
                      "my-7 h-px",
                      popular ? "bg-white/20" : "bg-border",
                    ].join(" ")}
                  />

                  {plan.featuresTitle ? (
                    <p
                      className={[
                        "font-body text-xs font-bold tracking-[0.14em] uppercase",
                        popular ? "text-white/80" : "text-text-muted",
                      ].join(" ")}
                    >
                      {plan.featuresTitle}
                    </p>
                  ) : null}
                  <ul className="mt-4 flex-1 space-y-3">
                    {(plan.features ?? []).map((feature) => (
                      <li
                        key={feature}
                        className={[
                          "flex items-start gap-3 font-body text-sm",
                          popular ? "text-white/90" : "text-text-secondary",
                        ].join(" ")}
                      >
                        <span
                          aria-hidden="true"
                          className={[
                            "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
                            popular
                              ? "bg-white/15 text-text-inverse"
                              : "bg-brand-light text-brand",
                          ].join(" ")}
                        >
                          <HiCheck className="size-3.5" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.detailsPath ? (
                    <Link
                      to={plan.detailsPath}
                      className={[
                        "group mt-8 inline-flex items-center gap-1.5 self-start font-body text-sm font-semibold transition-colors",
                        popular
                          ? "text-text-inverse hover:text-white/80"
                          : "text-brand hover:text-brand-dark",
                      ].join(" ")}
                    >
                      View plan details
                      <HiOutlineArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  ) : null}
                </article>
              </MotionChild>
            );
          })}
        </InView>

        {comparison.length > 0 ? (
          <InView variants={fadeUp} className="mt-12 sm:mt-16">
            <div className="text-center">
              <button
                type="button"
                aria-expanded={compareOpen}
                aria-controls={compareId}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-body text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
                onClick={() => setCompareOpen((open) => !open)}
              >
                {section?.compareLabel ?? "Compare all features"}
                <HiOutlineChevronDown
                  aria-hidden="true"
                  className={[
                    "size-4 transition-transform duration-200",
                    compareOpen ? "rotate-180" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </button>
            </div>

            {compareOpen ? (
              <motion.div
                id={compareId}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-[0_8px_30px_rgba(0,40,32,0.04)]"
              >
                <table className="w-full min-w-160 border-collapse text-left font-body text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th
                        scope="col"
                        className="px-5 py-4 font-semibold text-text-muted sm:px-6"
                      >
                        Feature
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.id}
                          scope="col"
                          className={[
                            "px-4 py-4 text-center font-heading text-[0.95rem] font-bold text-text",
                            plan.popular ? "bg-brand-light text-brand" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-border last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="px-5 py-3.5 font-medium text-text sm:px-6"
                        >
                          {row.feature}
                        </th>
                        {plans.map((plan, index) => {
                          const value = row.values[index];
                          return (
                            <td
                              key={plan.id}
                              className={[
                                "px-4 py-3.5 text-center text-text-secondary",
                                plan.popular ? "bg-brand-light/50" : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                            >
                              {value === true ? (
                                <HiCheck
                                  aria-label="Included"
                                  className="mx-auto size-5 text-brand"
                                />
                              ) : value === false || value == null ? (
                                <HiOutlineMinus
                                  aria-label="Not included"
                                  className="mx-auto size-4 text-text-muted/60"
                                />
                              ) : (
                                <span className="font-semibold text-text">
                                  {value}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : null}
          </InView>
        ) : null}
      </div>
    </section>
  );
};

export default PricingSection;
