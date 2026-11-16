import Link from "next/link";
import { FindingsSummary } from "@/components/security/findings-summary";
import { StatusLabel } from "@/components/ui/status-label";
import { projectPeriod } from "@/lib/project-records";
import { projectHref } from "@/lib/projects";
import { getSecurityArea } from "@/lib/security-areas";
import type { ProjectRecord } from "@/types/project";

export function ProjectCard({
  project,
  headingLevel = 3,
  showArea = false,
}: {
  project: ProjectRecord;
  headingLevel?: 2 | 3;
  showArea?: boolean;
}) {
  const Heading = `h${headingLevel}` as const;
  const titleId = `card-${project.id}-title`;
  const period = projectPeriod(project);
  return (
    <article className="security-card" aria-labelledby={titleId}>
      <header className="security-card-header">
        <p className="technical accent">
          {project.number}
          <span className="muted"> · {project.category.label}</span>
        </p>
        <StatusLabel status={project.status} />
      </header>
      <Heading id={titleId} className="security-card-title">
        <Link href={projectHref(project)}>{project.title}</Link>
      </Heading>
      <p className="security-card-description">{project.shortDescription}</p>
      {project.findings?.length ? (
        <FindingsSummary findings={project.findings} compact />
      ) : (
        project.outcome && (
          <p className="security-card-outcome">{project.outcome}</p>
        )
      )}
      <dl className="security-card-meta">
        {showArea && (
          <div>
            <dt>Area</dt>
            <dd>{getSecurityArea(project.area).label}</dd>
          </div>
        )}
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
      </dl>
      <ul className="tags" aria-label="Technologies">
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <Link
        className="text-link security-card-link"
        href={projectHref(project)}
        aria-label={`Read ${project.number}: ${project.title}`}
      >
        Read the record <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
