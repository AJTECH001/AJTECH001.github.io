import { projectPeriod } from "@/lib/project-records";
import { StatusLabel } from "@/components/ui/status-label";
import type { ProjectRecord } from "@/types/project";

export function ProjectMetadata({ project }: { project: ProjectRecord }) {
  return (
    <dl className="work-metadata">
      <div>
        <dt>Status</dt>
        <dd>
          <StatusLabel status={project.status} />
        </dd>
      </div>
      <div>
        <dt>Domain</dt>
        <dd>{project.domains.map((domain) => domain.label).join(" / ")}</dd>
      </div>
      {projectPeriod(project) && (
        <div>
          <dt>Period</dt>
          <dd>{projectPeriod(project)}</dd>
        </div>
      )}
      <div>
        <dt>Technologies</dt>
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
