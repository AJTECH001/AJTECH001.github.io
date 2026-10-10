import Link from "next/link";
import { ProjectMetadata } from "@/components/work/project-metadata";
import { projectHref } from "@/lib/projects";
import type { ProjectRecord } from "@/types/project";

export function WorkIndex({
  projects,
}: {
  projects: readonly ProjectRecord[];
}) {
  return (
    <div className="shell work-page">
      <nav aria-label="Breadcrumb" className="work-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Projects</span>
      </nav>
      <header className="work-page-header">
        <p className="eyebrow accent">Projects / Engineering work</p>
        <h1>Projects</h1>
        <p>
          A small collection of documented engineering work. Each project page
          explains its scope, implementation, decisions, and current status
          using the evidence available.
        </p>
      </header>
      <div className="archive-register">
        <h2 className="eyebrow">Project index</h2>
        <p className="technical muted">
          {String(projects.length).padStart(2, "0")}{" "}
          {projects.length === 1 ? "published project" : "published projects"}
        </p>
      </div>
      <ol role="list" className="archive-list">
        {projects.map((project) => (
          <li key={project.id}>
            <article
              className="archive-entry"
              aria-labelledby={`archive-${project.id}`}
            >
              <p className="eyebrow archive-number">
                Project / <span>{project.number}</span>
              </p>
              <div className="archive-content">
                <h2 id={`archive-${project.id}`}>
                  <Link href={projectHref(project)}>
                    {project.title}
                    <span aria-hidden="true"> ↗</span>
                  </Link>
                </h2>
                <p className="archive-description">
                  {project.shortDescription}
                </p>
                <ProjectMetadata project={project} />
                <Link className="text-link" href={projectHref(project)}>
                  View project {project.number}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
      {projects.length === 0 && (
        <p className="archive-empty">No projects have been published yet.</p>
      )}
      <p className="archive-footnote technical muted">
        Only documented work is listed. A project’s year identifies the recorded
        work, not its completion.
      </p>
      <Link className="text-link" href="/#projects">
        <span aria-hidden="true">←</span> Back to selected project
      </Link>
    </div>
  );
}
