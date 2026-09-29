import { useState } from "react";
import heroBgFallback from "../../assets/images/hero/Hero-bg.png";

type HeroBackdropProps = {
  className?: string;
  src?: string;
};

const HeroBackdrop = ({ className = "", src }: HeroBackdropProps) => {
  const [failed, setFailed] = useState(false);
  const imageSrc = failed || !src ? heroBgFallback : src;

  return (
    <img
      src={imageSrc}
      alt=""
      width={1920}
      height={996}
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
      className={[
        "pointer-events-none absolute inset-0 -z-20 size-full object-cover object-top",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
};

export default HeroBackdrop;
