import Link from "next/link";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { ProjectMetadata } from "@/components/work/project-metadata";
import { DebuggingRecord } from "@/components/work/debugging-record";
import type { RelatedContentLink } from "@/lib/project-relationships";
import { getProjectSections } from "@/lib/projects";
import type { ProjectRecord } from "@/types/project";

export function ProjectDetail({
  project,
  relatedContent,
}: {
  project: ProjectRecord;
  relatedContent: readonly RelatedContentLink[];
}) {
  const sections = getProjectSections(project);
  const navigation = [
    ...sections.map(({ id, title }) => ({ id, title })),
    ...(project.links.length
      ? [{ id: "references", title: "Links & references" }]
      : []),
    ...(relatedContent.length
      ? [{ id: "related", title: "Related evidence" }]
      : []),
  ];
  return (
    <article className="shell work-page">
      <nav aria-label="Breadcrumb" className="work-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/work">Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Project {project.number}</span>
      </nav>
      <header className="work-page-header record-intro">
        <p className="eyebrow accent">Project / {project.number}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <ProjectMetadata project={project} />
        {!!project.learningOutcomes?.length && (
          <div className="record-learning">
            <h2>Technical highlights</h2>
            <ul className="record-points">
              {project.learningOutcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <div className="record-document">
        <nav className="record-toc" aria-label="On this page">
          <p className="eyebrow">On this project</p>
          <ol role="list">
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span className="technical" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
          <Link className="text-link" href="/work">
            <span aria-hidden="true">←</span> All projects
          </Link>
        </nav>
        <div className="record-body">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="record-section"
            >
              {section.id === "current-state" && !project.sections.result && (
                <span id="result" />
              )}
              {section.id === "debugging" && !project.sections.challenges && (
                <span id="challenges" />
              )}
              <div className="record-section-title">
                <span aria-hidden="true" className="technical accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
              </div>
              {section.content?.paragraphs
                ?.filter((text) => text.trim())
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              {!!section.content?.items?.length && (
                <ul className="record-points">
                  {section.content.items
                    .filter((text) => text.trim())
                    .map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                </ul>
              )}
              {section.id === "debugging" && project.debugging?.length ? (
                <DebuggingRecord cases={project.debugging} />
              ) : null}
              {section.id === "architecture" && project.architecture && (
                <ArchitectureDiagram diagram={project.architecture} />
              )}
              {section.id === "current-state" && !!project.roadmap?.length && (
                <dl className="record-roadmap">
                  {project.roadmap.map((step) => (
                    <div key={step.phase}>
                      <dt>{step.phase}</dt>
                      <dd>{step.description}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
          {project.links.length > 0 && (
            <section
              id="references"
              className="record-section"
              aria-labelledby="references-heading"
            >
              <h2 id="references-heading">Links & references</h2>
              <ul role="list" className="record-reference-links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <span className="technical muted">{link.kind}</span>
                    <a className="text-link" href={link.href}>
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {relatedContent.length > 0 && (
            <section
              id="related"
              className="record-section"
              aria-labelledby="related-heading"
            >
              <h2 id="related-heading">Related evidence</h2>
              <ul role="list">
                {relatedContent.map((related) => (
                  <li key={related.id}>
                    <Link className="text-link" href={related.href}>
                      {related.title}
                    </Link>
                    <p className="muted">{related.explanation}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="record-end">
            <Link className="text-link" href="/work">
              <span aria-hidden="true">←</span> Back to projects
            </Link>
            <a className="text-link" href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
