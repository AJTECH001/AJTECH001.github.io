import { StatusLabel } from "@/components/ui/status-label";
import Link from "next/link";
import { getProjectSections, projectHref } from "@/lib/projects";
import type { ProjectRecord as Project } from "@/types/project";

export function ProjectRecord({ project }: { project: Project }) {
  return (
    <article
      className="project-panel"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="record-header">
        <p className="eyebrow accent">Project / {project.number}</p>
        <p className="technical muted">Scope / {project.scope}</p>
        <StatusLabel status={project.status} />
      </div>
      <div className="project-description">
        <p className="technical muted project-category">
          {project.category.label}
        </p>
        <h3 id={`project-${project.id}-title`}>
          <Link href={projectHref(project)}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <ul className="tags" aria-label="Project technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
      <div className="project-spec">
        <p className="eyebrow">Implementation record</p>
        <dl>
          {project.overview.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <details className="engineering-record">
        <summary>
          Inspect the engineering record{" "}
          <span className="technical">Problem → decisions → lessons</span>
        </summary>
        <dl className="record-notes">
          {getProjectSections(project)
            .filter((section) =>
              [
                "problem",
                "architecture",
                "implementation",
                "tradeoffs",
                "current-state",
              ].includes(section.id),
            )
            .map((note) => (
              <div key={note.id}>
                <dt>{note.title}</dt>
                <dd>
                  {note.content?.paragraphs?.[0] ?? note.content?.items?.[0]}
                </dd>
              </div>
            ))}
        </dl>
      </details>
      <div className="col-span-full border-t border-border px-6 py-2">
        <Link className="text-link" href={projectHref(project)}>
          Read Project {project.number} in full{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
