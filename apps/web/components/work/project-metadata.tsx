import { projectPeriod } from "@/lib/project-records";
import { getSecurityArea } from "@/lib/security-areas";
import { StatusLabel } from "@/components/ui/status-label";
import type { ProjectRecord } from "@/types/project";

export function ProjectMetadata({ project }: { project: ProjectRecord }) {
  const period = projectPeriod(project);
  return (
    <dl className="work-metadata">
      <div>
        <dt>Status</dt>
        <dd>
          <StatusLabel status={project.status} />
        </dd>
      </div>
      <div>
        <dt>Area</dt>
        <dd>{getSecurityArea(project.area).label}</dd>
      </div>
      <div>
        <dt>Evidence</dt>
        <dd>{project.evidence}</dd>
      </div>
      {period && (
        <div>
          <dt>Period</dt>
          <dd>{period}</dd>
        </div>
      )}
      <div className="work-metadata-wide">
        <dt>
          {project.technologyStatus === "Planned"
            ? "Planned technologies"
            : "Technologies"}
        </dt>
        <dd>
          <ul role="list" className="work-technologies">
            {project.technologies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
