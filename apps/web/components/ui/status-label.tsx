import type { ProjectStatus } from "@/types/project";

export function StatusLabel({ status }: { status: ProjectStatus }) {
  return (
    <span
      className="status-label"
      data-active={
        status === "Active" ||
        status === "In development" ||
        status === "Operational"
      }
    >
      {status}
    </span>
  );
}
