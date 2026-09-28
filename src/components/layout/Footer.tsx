import { useState, type FormEvent } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { mediaUrl } from "../../config/env";
import { resolveNavHref } from "../../constants/nav";
import { useContent } from "../../context/ContentContext";
import { useToast } from "../../context/ToastContext";
import type { ContentLink } from "../../types/content";
import InView, { fadeUp } from "../motion/InView";
import Button from "../ui/Button";
import Field, { underlineFieldClass } from "../ui/Field";

type BrandSection = {
  id: string;
  logo?: string;
  logoAlt?: string;
  title?: string;
  blurb?: string;
};

type LinkListSection = {
  id: string;
  title?: string;
  items?: ContentLink[];
};

type NewsletterSection = {
  id: string;
  title?: string;
  subTitle?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  successToast?: string;
};

type SocialSection = {
  id: string;
  followLabel?: string;
  items?: { id?: number | string; name: string; link: string }[];
};

type LegalSection = {
  id: string;
  copyrightText?: string;
};

const socialIconMap = {
  X: FaXTwitter,
  Twitter: FaXTwitter,
  Facebook: FaFacebookF,
  Pinterest: FaPinterestP,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
  Instagram: FaInstagram,
} as const;

const NewsletterForm = ({
  placeholder,
  buttonText,
  successToast,
}: {
  placeholder: string;
  buttonText: string;
  successToast: string;
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    showToast(successToast);
    setEmail("");
    setSubmitting(false);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <Field label="Email address" hideLabel>
        <input
          type="email"
          name="newsletter-email"
          required
          autoComplete="email"
          disabled={submitting}
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={underlineFieldClass}
        />
      </Field>
      <Button
        type="submit"
        variant="primary"
        size="cta"
        loading={submitting}
        className="mt-6 w-full"
      >
        {buttonText}
      </Button>
    </form>
  );
};

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { getSection } = useContent();

  const brand = getSection<BrandSection>("siteFooter", "brand");
  const company = getSection<LinkListSection>("siteFooter", "company");
  const support = getSection<LinkListSection>("siteFooter", "support");
  const newsletter = getSection<NewsletterSection>("siteFooter", "newsletter");
  const social = getSection<SocialSection>("siteFooter", "social");
  const legal = getSection<LegalSection>("siteFooter", "legal");

  const sectionHref = (href: string) => resolveNavHref(href, isHome);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer text-text-inverse">
      <InView
        variants={fadeUp}
        amount={0.12}
        className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.7fr)]">
          <div className="py-12 sm:py-14 lg:py-16 lg:pr-12">
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              <div className="max-w-xs">
                {brand?.logo ? (
                  <img
                    src={mediaUrl(brand.logo)}
                    alt={brand.logoAlt ?? brand.title ?? "Safri"}
                    width={928}
                    height={1147}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-auto object-contain object-left sm:h-16"
                  />
                ) : null}
                {brand?.blurb ? (
                  <p className="mt-5 font-body text-sm leading-relaxed text-text-inverse/70">
                    {brand.blurb}
                  </p>
                ) : null}
              </div>

              <div>
                <h3 className="font-body text-base font-semibold text-text-inverse">
                  {company?.title ?? "Company"}
                </h3>
                <ul className="mt-4 space-y-3">
                  {(company?.items ?? []).map((link) => (
                    <li key={String(link.id ?? link.path)}>
                      <Link
                        to={sectionHref(link.path)}
                        className="font-body text-sm text-text-inverse/70 transition-colors hover:text-text-inverse"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-body text-base font-semibold text-text-inverse">
                  {support?.title ?? "Support"}
                </h3>
                <ul className="mt-4 space-y-3">
                  {(support?.items ?? []).map((link) => (
                    <li key={String(link.id ?? link.path)}>
                      <Link
                        to={sectionHref(link.path)}
                        className="font-body text-sm text-text-inverse/70 transition-colors hover:text-text-inverse"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-10 border-t border-text-inverse/15 pt-6 font-body text-sm text-text-inverse/60">
              {legal?.copyrightText ??
                `Copyright ${year} Safri. All Rights Reserved.`}
            </p>
          </div>

          <div className="border-t border-text-inverse/15 py-12 sm:py-14 lg:border-t-0 lg:border-l lg:py-16 lg:pl-12">
            <h3 className="font-body text-base font-semibold text-text-inverse">
              {newsletter?.title ?? "Newsletter"}
            </h3>
            {newsletter?.subTitle ? (
              <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-text-inverse/70">
                {newsletter.subTitle}
              </p>
            ) : null}
            <NewsletterForm
              placeholder={newsletter?.inputPlaceholder ?? "Your email"}
              buttonText={newsletter?.buttonText ?? "Subscribe"}
              successToast={
                newsletter?.successToast ?? "Thanks for subscribing."
              }
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-body text-sm text-text-inverse/70">
                {social?.followLabel ?? "Follow us:"}
              </span>
              <div className="flex items-center gap-3">
                {(social?.items ?? []).map((item) => {
                  const Icon =
                    socialIconMap[item.name as keyof typeof socialIconMap];
                  if (!Icon) return null;
                  return (
                    <a
                      key={String(item.id ?? item.name)}
                      href={item.link}
                      aria-label={item.name}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-inverse/80 transition-colors hover:text-text-inverse"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </InView>
    </footer>
  );
};

export default Footer;
