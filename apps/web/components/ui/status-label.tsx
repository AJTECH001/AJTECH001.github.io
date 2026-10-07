import type { ProjectStatus } from "@/types/project";
import type { ContentStatus } from "@/lib/site-content";

export function StatusLabel({
  status,
}: {
  status: ContentStatus | ProjectStatus;
}) {
  return (
    <span
      className="status-label"
      data-active={status === "In development" || status === "Published"}
    >
      {status}
    </span>
  );
}
