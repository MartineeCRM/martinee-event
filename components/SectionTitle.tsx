type SectionTitleProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      <h2 className="text-headline-lg text-on-background">{title}</h2>
      {description ? (
        <p className="mt-2 text-body-md text-on-surface-variant">
          {description}
        </p>
      ) : null}
    </div>
  );
}
