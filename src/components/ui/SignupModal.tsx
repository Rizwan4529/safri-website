import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState, type FormEvent } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useSignupModal } from "../../context/SignupModalContext";
import { useToast } from "../../context/ToastContext";
import Button from "./Button";
import Field, { fieldClass } from "./Field";

const COUNTRY_CODES = [
  { value: "+966", label: "+966" },
  { value: "+971", label: "+971" },
  { value: "+973", label: "+973" },
  { value: "+974", label: "+974" },
  { value: "+965", label: "+965" },
  { value: "+968", label: "+968" },
  { value: "+92", label: "+92" },
  { value: "+1", label: "+1" },
] as const;

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+966",
  phone: "",
  companyName: "",
  marketing: false,
  privacy: false,
};

const SignupModal = () => {
  const { isOpen, closeSignupModal } = useSignupModal();
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSignupModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeSignupModal]);

  useEffect(() => {
    if (!isOpen) {
      setForm(emptyForm);
      setSubmitting(false);
    }
  }, [isOpen]);

  const update =
    (key: keyof typeof emptyForm) =>
    (event: { target: { value: string; checked?: boolean; type: string } }) => {
      const value =
        event.target.type === "checkbox"
          ? Boolean(event.target.checked)
          : event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!form.privacy) {
      showToast("Please agree to the Privacy Policy to continue.");
      return;
    }

    setSubmitting(true);
    showToast("Thanks — our team will reach out shortly.");
    closeSignupModal();
    setSubmitting(false);
  };

  const duration = prefersReducedMotion ? 0.01 : 0.28;

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close signup dialog backdrop"
            className="absolute inset-0 bg-footer/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={closeSignupModal}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-3xl bg-surface shadow-[0_24px_80px_rgba(0,40,32,0.28)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)]"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.97 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Close signup dialog"
              className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-surface text-text shadow-sm transition-colors hover:bg-brand-light hover:text-brand"
              onClick={closeSignupModal}
            >
              <HiOutlineXMark className="size-5" />
            </button>

            <div className="flex flex-col justify-center bg-brand-light px-7 py-10 sm:px-9 sm:py-12 lg:px-10">
              <h2
                id={titleId}
                className="font-heading text-[1.65rem] leading-tight font-bold tracking-[-0.03em] text-text sm:text-[1.85rem] lg:text-[2rem]"
              >
                Comprehensive Solutions For Restaurant Growth
              </h2>
              <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                Amplify your restaurant growth with data-centric,
                performance-driven solutions built for multi-outlet brands.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-9">
              <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-text">
                Sign up now
              </h3>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name">
                    <input
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder="Enter your first name"
                      className={fieldClass}
                      value={form.firstName}
                      onChange={update("firstName")}
                      disabled={submitting}
                    />
                  </Field>
                  <Field label="Last name">
                    <input
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder="Enter your last name"
                      className={fieldClass}
                      value={form.lastName}
                      onChange={update("lastName")}
                      disabled={submitting}
                    />
                  </Field>
                </div>

                <Field label="Email address">
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className={fieldClass}
                    value={form.email}
                    onChange={update("email")}
                    disabled={submitting}
                  />
                </Field>

                <Field label="Phone number">
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      aria-label="Country code"
                      className="h-auto w-22 shrink-0 grow-0 rounded-lg border border-border bg-surface px-2 py-2.5 font-body text-sm text-text outline-none transition-shadow focus:border-brand focus:shadow-[0_0_0_3px_rgba(0,143,124,0.12)] disabled:opacity-60"
                      value={form.countryCode}
                      onChange={update("countryCode")}
                      disabled={submitting}
                    >
                      {COUNTRY_CODES.map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      placeholder="(555) 000-0000"
                      className={[fieldClass, "min-w-0 flex-1"].join(" ")}
                      value={form.phone}
                      onChange={update("phone")}
                      disabled={submitting}
                    />
                  </div>
                </Field>

                <Field label="Company name">
                  <input
                    name="companyName"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Enter your company name"
                    className={fieldClass}
                    value={form.companyName}
                    onChange={update("companyName")}
                    disabled={submitting}
                  />
                </Field>

                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-2.5 font-body text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      name="marketing"
                      className="mt-0.5 size-4 rounded border-border text-brand accent-brand"
                      checked={form.marketing}
                      onChange={update("marketing")}
                      disabled={submitting}
                    />
                    <span>
                      I want to receive product news and marketing promotions.
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 font-body text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      name="privacy"
                      required
                      className="mt-0.5 size-4 rounded border-border text-brand accent-brand"
                      checked={form.privacy}
                      onChange={update("privacy")}
                      disabled={submitting}
                    />
                    <span>
                      I agree to the{" "}
                      <Link
                        to="/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand underline underline-offset-2"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="cta"
                  loading={submitting}
                  className="mt-2 w-auto min-w-36 rounded-full px-8"
                >
                  Sign up
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
};

export default SignupModal;
