import Button, { type ButtonProps } from "./Button";
import { useSignupModal } from "../../context/SignupModalContext";

type RequestDemoButtonProps = Omit<
  ButtonProps,
  "variant" | "size" | "type" | "loading" | "href"
> & {
  children?: string;
  href?: string;
};

const RequestDemoButton = ({
  className = "",
  children = "Request a Demo",
  href: _href,
  onClick,
  ...props
}: RequestDemoButtonProps) => {
  const { openSignupModal } = useSignupModal();

  return (
    <Button
      type="button"
      variant="primary"
      size="cta"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) openSignupModal();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RequestDemoButton;
