import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "cta" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-text-inverse shadow-sm hover:bg-brand-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-brand-dark",
  secondary:
    "bg-accent text-text-inverse shadow-sm hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-dark",
  outline:
    "border border-text bg-transparent text-text hover:border-brand hover:bg-brand-light hover:text-brand active:bg-brand-light",
};

const sizeClasses: Record<ButtonSize, string> = {
  cta: "h-11 px-5 text-sm font-semibold whitespace-nowrap",
  icon: "size-10 p-0",
};

const Button = ({
  variant = "primary",
  size = "cta",
  className = "",
  children,
  type = "button",
  loading = false,
  disabled,
  href,
  ...props
}: ButtonProps) => {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-body transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    size === "cta" && !/(?:^|\s)(?:max-)?w-/.test(className)
      ? "w-43"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} style={props.style}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
