import type { InputHTMLAttributes, ReactNode } from "react";

export const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 font-body text-sm text-text outline-none transition-shadow placeholder:text-text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(0,143,124,0.12)] disabled:opacity-60";

export const dashedFieldClass =
  "h-12 w-full rounded-lg border border-dashed border-text-muted/45 bg-surface px-5 font-body text-sm text-text outline-none transition-shadow placeholder:font-medium placeholder:tracking-[0.08em] placeholder:text-text-muted placeholder:uppercase focus:border-brand focus:shadow-[0_0_0_3px_rgba(0,143,124,0.12)] disabled:opacity-60";

export const underlineFieldClass =
  "w-full border-0 border-b border-text-inverse/35 bg-transparent py-2 font-body text-sm text-text-inverse outline-none placeholder:text-text-inverse/50 focus:border-brand disabled:opacity-60";

type FieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
  hideLabel?: boolean;
};

const Field = ({
  label,
  children,
  className = "",
  hideLabel = false,
}: FieldProps) => (
  <label
    className={["flex min-w-0 flex-col gap-1.5", className]
      .filter(Boolean)
      .join(" ")}
  >
    <span
      className={
        hideLabel ? "sr-only" : "font-body text-sm font-medium text-text"
      }
    >
      {label}
    </span>
    {children}
  </label>
);

export type DashedInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const DashedField = ({
  label,
  className = "",
  ...props
}: DashedInputProps) => {
  return (
    <Field label={label} hideLabel>
      <input
        {...props}
        className={[dashedFieldClass, className].filter(Boolean).join(" ")}
      />
    </Field>
  );
};

export default Field;
