import Link from "next/link";
import { FindingsSummary } from "@/components/security/findings-summary";
import { ProjectMetadata } from "@/components/work/project-metadata";
import { projectHref } from "@/lib/projects";
import { projectsForArea, securityAreas } from "@/lib/security-areas";
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
        <p className="eyebrow accent">Projects & research</p>
        <h1>Audits, assessments, and security research</h1>
        <p>
          Each record states the problem investigated, the technical approach,
          my contribution, and the findings. Private reports are summarised
          without exploit payloads or CTF solutions.
        </p>
      </header>
      <nav className="area-jump" aria-label="Jump to a security area">
        {securityAreas.map((area) => (
          <a key={area.id} href={`#${area.id}`}>
            <span className="technical accent">{area.index}</span>
            {area.label}
            <span className="technical muted">
              {projectsForArea(projects, area.id).length}
            </span>
          </a>
        ))}
      </nav>
      {securityAreas.map((area) => {
        const records = projectsForArea(projects, area.id);
        if (!records.length) return null;
        return (
          <section
            key={area.id}
            id={area.id}
            className="work-area"
            aria-labelledby={`${area.id}-heading`}
          >
            <div className="archive-register">
              <h2 className="eyebrow" id={`${area.id}-heading`}>
                {area.index} / {area.label}
              </h2>
              <Link className="text-link technical" href={area.path}>
                About this area <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ol role="list" className="archive-list">
              {records.map((project) => (
                <li key={project.id}>
                  <article
                    className="archive-entry"
                    aria-labelledby={`archive-${project.id}`}
                  >
                    <p className="eyebrow archive-number">
                      {project.category.label} <span>{project.number}</span>
                    </p>
                    <div className="archive-content">
                      <h3 id={`archive-${project.id}`}>
                        <Link href={projectHref(project)}>
                          {project.title}
                          <span aria-hidden="true"> ↗</span>
                        </Link>
                      </h3>
                      <p className="archive-description">
                        {project.shortDescription}
                      </p>
                      <dl className="archive-brief">
                        <div>
                          <dt>Contribution</dt>
                          <dd>{project.contribution}</dd>
                        </div>
                        {(project.outcome || project.findings) && (
                          <div>
                            <dt>Result</dt>
                            <dd>
                              {project.outcome}
                              {project.findings && (
                                <FindingsSummary
                                  findings={project.findings}
                                  compact
                                />
                              )}
                            </dd>
                          </div>
                        )}
                      </dl>
                      <ProjectMetadata project={project} />
                      <Link className="text-link" href={projectHref(project)}>
                        View {project.number}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
      <p className="archive-footnote technical muted">
        Only work I produced is listed. Training and First Flight codebases are
        named as such; findings and counts are taken directly from each report.
      </p>
    </div>
  );
}
