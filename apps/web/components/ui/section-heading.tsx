import type { SectionId } from "@/lib/site-content";

export function SectionHeading({
  id,
  index,
  label,
  title,
  description,
}: {
  id: SectionId;
  index: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span className="section-index">{index}</span>
        {label}
      </p>
      <div>
        <h2 id={`${id}-heading`}>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}
