import Button, { type ButtonProps } from "./Button";

type RequestDemoButtonProps = Omit<
  ButtonProps,
  "variant" | "size" | "type" | "loading"
> & {
  children?: string;
};

const RequestDemoButton = ({
  className = "",
  children = "Request a Demo",
  href,
  ...props
}: RequestDemoButtonProps) => {
  return (
    <Button
      type={href ? undefined : "button"}
      href={href}
      variant="primary"
      size="cta"
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RequestDemoButton;
