import { useState, type FormEvent } from "react";
import { useToast } from "../../context/ToastContext";
import Button from "./Button";
import { DashedField } from "./Field";

type ContactField = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const defaultFields: ContactField[] = [
  {
    name: "fullName",
    label: "Full name",
    placeholder: "Full name",
    required: true,
  },
  {
    name: "mobile",
    label: "Mobile number",
    placeholder: "Mobile number",
    required: true,
  },
  {
    name: "date",
    label: "Preferred demo date",
    placeholder: "Preferred demo date",
    required: false,
  },
  {
    name: "email",
    label: "Work email",
    placeholder: "Work email",
    required: true,
  },
  {
    name: "restaurantName",
    label: "Restaurant / brand name",
    placeholder: "Restaurant or brand name",
    required: true,
  },
];

type ContactFormValues = Record<string, string>;

type ContactFormProps = {
  className?: string;
  submitLabel?: string;
  successToast?: string;
  fields?: ContactField[];
  onSuccess?: (values: ContactFormValues) => void;
};

const ContactForm = ({
  className = "",
  submitLabel = "Register Your Restaurant",
  successToast = "Thanks — our team will reach out about your restaurant shortly.",
  fields = defaultFields,
  onSuccess,
}: ContactFormProps) => {
  const { showToast } = useToast();
  const [form, setForm] = useState<ContactFormValues>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ""])),
  );
  const [submitting, setSubmitting] = useState(false);
  const [dateType, setDateType] = useState<"text" | "date">("text");

  const update =
    (key: string) =>
    (event: { target: { value: string } }) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    showToast(successToast);
    onSuccess?.(form);
    setForm(Object.fromEntries(fields.map((field) => [field.name, ""])));
    setDateType("text");
    setSubmitting(false);
  };

  const byName = Object.fromEntries(fields.map((field) => [field.name, field]));
  const fullName = byName.fullName;
  const mobile = byName.mobile;
  const date = byName.date;
  const email = byName.email;
  const restaurantName = byName.restaurantName;

  return (
    <form
      className={["w-full", className].filter(Boolean).join(" ")}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fullName ? (
          <DashedField
            label={fullName.label}
            name={fullName.name}
            type="text"
            required={fullName.required}
            autoComplete="name"
            disabled={submitting}
            placeholder={fullName.placeholder}
            value={form[fullName.name] ?? ""}
            onChange={update(fullName.name)}
          />
        ) : null}
        {mobile ? (
          <DashedField
            label={mobile.label}
            name={mobile.name}
            type="tel"
            required={mobile.required}
            autoComplete="tel"
            disabled={submitting}
            placeholder={mobile.placeholder}
            value={form[mobile.name] ?? ""}
            onChange={update(mobile.name)}
          />
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {date ? (
          <DashedField
            label={date.label}
            name={date.name}
            type={dateType}
            required={date.required}
            disabled={submitting}
            placeholder={date.placeholder}
            value={form[date.name] ?? ""}
            onChange={update(date.name)}
            onFocus={() => setDateType("date")}
            onBlur={() => {
              if (!form[date.name]) setDateType("text");
            }}
          />
        ) : null}
        {email ? (
          <DashedField
            label={email.label}
            name={email.name}
            type="email"
            required={email.required}
            autoComplete="email"
            disabled={submitting}
            placeholder={email.placeholder}
            value={form[email.name] ?? ""}
            onChange={update(email.name)}
          />
        ) : null}
        {restaurantName ? (
          <DashedField
            label={restaurantName.label}
            name={restaurantName.name}
            type="text"
            required={restaurantName.required}
            autoComplete="organization"
            disabled={submitting}
            placeholder={restaurantName.placeholder}
            value={form[restaurantName.name] ?? ""}
            onChange={update(restaurantName.name)}
          />
        ) : null}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          variant="primary"
          size="cta"
          loading={submitting}
          className="w-auto min-w-43 px-10 sm:px-12"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
