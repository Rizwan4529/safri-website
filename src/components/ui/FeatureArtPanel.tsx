import type { ReactNode } from "react";

type FeatureArtPanelProps = {
  children: ReactNode;
  className?: string;
  panelClassName?: string;
};

const FeatureArtPanel = ({
  children,
  className = "",
  panelClassName = "",
}: FeatureArtPanelProps) => {
  return (
    <div className={["relative isolate", className].filter(Boolean).join(" ")}>
      <div
        aria-hidden="true"
        className={[
          "absolute rounded-[1.75rem] bg-feature-panel sm:rounded-[2rem] lg:rounded-[2.25rem]",
          panelClassName ||
            "top-[14%] right-[5%] bottom-[10%] left-[6%]",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FeatureArtPanel;
