import Link from "next/link";
import { projectHref } from "@/lib/projects";
import { researchHref } from "@/lib/research";
import type { ProjectRecord } from "@/types/project";
import type { ResearchRecord } from "@/types/content";

export function ResearchIndex({
  records,
  projects,
}: {
  records: readonly ResearchRecord[];
  projects: readonly ProjectRecord[];
}) {
  const groups = new Map<string, ResearchRecord[]>();
  for (const record of records) {
    const group = groups.get(record.domain) ?? [];
    group.push(record);
    groups.set(record.domain, group);
  }
  return (
    <div className="shell research-page">
      <header className="research-intro">
        <p className="eyebrow accent">Systems / Infrastructure / Protocols</p>
        <h1>Research lab</h1>
        <p>
          Technical questions and learning directions under investigation. These
          records distinguish open research from validated work and operational
          experience.
        </p>
        <p className="technical muted research-count">
          {String(records.length).padStart(2, "0")} public research records /
          questions remain open
        </p>
      </header>
      <div className="research-groups">
        {[...groups].map(([domain, domainRecords]) => (
          <section
            className="research-domain"
            key={domain}
            aria-labelledby={"domain-" + domain.replaceAll(" ", "-")}
          >
            <header className="research-domain-heading">
              <p className="eyebrow">{domain}</p>
              <span className="technical muted">
                {String(domainRecords.length).padStart(2, "0")} records
              </span>
            </header>
            <ol className="research-archive">
              {domainRecords.map((record) => {
                const relatedProjects = projects.filter((project) =>
                  record.relatedProjects?.includes(project.id),
                );
                return (
                  <li className="research-row" key={record.id}>
                    <p className="research-number technical">{record.number}</p>
                    <div className="research-row-main">
                      <div className="research-row-meta technical">
                        <span>{record.status}</span>
                        <span>{record.domain}</span>
                      </div>
                      <h2>
                        <Link href={researchHref(record)}>{record.title}</Link>
                      </h2>
                      <p>{record.summary}</p>
                      <ul className="research-topics" aria-label="Topics">
                        {record.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                      {relatedProjects.length > 0 && (
                        <p className="research-related technical">
                          Related engineering /{" "}
                          {relatedProjects.map((project, index) => (
                            <span key={project.id}>
                              {index > 0 && ", "}
                              <Link href={projectHref(project)}>
                                Project {project.number}
                              </Link>
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                    <Link
                      className="research-open technical"
                      href={researchHref(record)}
                      aria-label={"Open research record: " + record.title}
                    >
                      Open <span aria-hidden="true">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
