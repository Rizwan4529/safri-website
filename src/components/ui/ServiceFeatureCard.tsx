type ServiceFeatureCardProps = {
  index: string;
  title: string;
  body: string;
  className?: string;
};

const ServiceFeatureCard = ({
  index,
  title,
  body,
  className = "",
}: ServiceFeatureCardProps) => {
  return (
    <article
      className={[
        "rounded-2xl border border-dashed border-text-muted/40 bg-surface p-5 sm:p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-baseline gap-2.5">
        <span className="font-heading text-base font-bold text-accent sm:text-lg">
          {index}
        </span>
        <h3 className="font-heading text-base font-bold text-text sm:text-lg">
          {title}
        </h3>
      </div>
      <p className="mt-2.5 font-body text-sm leading-relaxed text-text-secondary">
        {body}
      </p>
    </article>
  );
};

export default ServiceFeatureCard;
