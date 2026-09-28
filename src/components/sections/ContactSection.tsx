import { usePageSection } from "../../context/ContentContext";
import InView, { fadeUp } from "../motion/InView";
import ContactForm from "../ui/ContactForm";

type ContactFormSection = {
  id: string;
  label?: string;
  title?: string;
  subTitle?: string;
  submitLabel?: string;
  successToast?: string;
  fields?: {
    name: string;
    label: string;
    placeholder: string;
    required?: boolean;
  }[];
};

type ContactSectionProps = {
  pageId?: string;
};

const ContactSection = ({ pageId = "home" }: ContactSectionProps) => {
  const { section } = usePageSection<ContactFormSection>(pageId, "contactForm");

  return (
    <section id="contact" className="relative overflow-x-clip bg-surface-muted">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <InView variants={fadeUp} className="mx-auto max-w-2xl text-center">
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
        </InView>

        <InView
          variants={fadeUp}
          delay={0.08}
          className="mx-auto mt-10 max-w-4xl sm:mt-12"
        >
          <ContactForm
            submitLabel={section?.submitLabel}
            successToast={section?.successToast}
            fields={section?.fields}
          />
        </InView>
      </div>
    </section>
  );
};

export default ContactSection;
