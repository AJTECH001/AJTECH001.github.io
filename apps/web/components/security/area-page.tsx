import Link from "next/link";
import { ProjectCard } from "@/components/security/project-card";
import { professionalContent } from "@/lib/professional-content";
import { getProjects } from "@/lib/projects";
import { publications } from "@/lib/publications";
import { getResearchRecords, researchHref } from "@/lib/research";
import {
  getSecurityArea,
  projectsForArea,
  securityAreas,
} from "@/lib/security-areas";
import type { ResearchDomain } from "@/types/content";
import type { SecurityAreaId } from "@/types/project";

const researchDomainByArea: Record<SecurityAreaId, ResearchDomain> = {
  "blockchain-security": "Blockchain Security",
  "ai-security": "AI Security",
  cybersecurity: "Cybersecurity",
};

export async function AreaPage({ id }: { id: SecurityAreaId }) {
  const area = getSecurityArea(id);
  const [allProjects, allResearch] = await Promise.all([
    getProjects(),
    getResearchRecords(),
  ]);
  const primary = projectsForArea(allProjects, id);
  const supporting = allProjects.filter((project) =>
    project.secondaryAreas?.includes(id),
  );
  const research = allResearch.filter(
    (record) => record.domain === researchDomainByArea[id],
  );
  const areaPublications = publications.filter((item) => item.area === id);
  const experience = professionalContent.experience.filter((role) =>
    (role.areas as readonly SecurityAreaId[]).includes(id),
  );
  const certifications = professionalContent.certifications.filter(
    (item) => item.area === id,
  );
  const skills = professionalContent.skills.find((group) => group.area === id);
  const otherAreas = securityAreas.filter((item) => item.id !== id);

  return (
    <div className="shell work-page area-page">
      <nav aria-label="Breadcrumb" className="work-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{area.label}</span>
      </nav>
      <header className="work-page-header area-header">
        <p className="eyebrow accent">
          {area.index} / {area.label}
        </p>
        <h1>{area.title}</h1>
        <p>{area.description}</p>
      </header>

      <section className="area-section" aria-labelledby="coverage-heading">
        <div className="area-section-heading">
          <p className="eyebrow">What this covers</p>
          <h2 id="coverage-heading">Focus and evidence</h2>
        </div>
        <dl className="area-topic-list">
          {area.topics.map((topic) => (
            <div key={topic.title}>
              <dt>{topic.title}</dt>
              <dd>
                <p>{topic.description}</p>
                <p className="technical accent">{topic.evidence}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="area-developing technical muted">{area.developing}</p>
      </section>

      <section className="area-section" aria-labelledby="area-projects-heading">
        <div className="area-section-heading">
          <p className="eyebrow">Projects & research</p>
          <h2 id="area-projects-heading">
            {String(primary.length).padStart(2, "0")} records
          </h2>
        </div>
        <div className="security-card-grid">
          {primary.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {supporting.length > 0 && (
          <div className="area-supporting">
            <p className="eyebrow">
              Also relevant to {area.label.toLowerCase()}
            </p>
            <ul>
              {supporting.map((project) => (
                <li key={project.id}>
                  <Link className="text-link" href={`/work/${project.slug}`}>
                    {project.number} · {project.title}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {(areaPublications.length > 0 || research.length > 0) && (
        <section
          className="area-section"
          aria-labelledby="area-writing-heading"
        >
          <div className="area-section-heading">
            <p className="eyebrow">Writing & publications</p>
            <h2 id="area-writing-heading">Reports and research notes</h2>
          </div>
          <ul className="publication-list">
            {areaPublications.map((item) => (
              <li key={item.title}>
                <p className="eyebrow">
                  {item.type} · {item.availability}
                </p>
                <h3>
                  <a href={item.href}>
                    {item.title}
                    {item.availability === "Public" && (
                      <span aria-hidden="true"> ↗</span>
                    )}
                  </a>
                </h3>
                <p>{item.summary}</p>
              </li>
            ))}
            {research.map((note) => (
              <li key={note.id}>
                <p className="eyebrow">
                  Research note · {note.number} · {note.status}
                </p>
                <h3>
                  <Link href={researchHref(note)}>{note.title}</Link>
                </h3>
                <p>{note.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(experience.length > 0 || certifications.length > 0 || skills) && (
        <section
          className="area-section"
          aria-labelledby="area-background-heading"
        >
          <div className="area-section-heading">
            <p className="eyebrow">Background</p>
            <h2 id="area-background-heading">Experience and capabilities</h2>
          </div>
          <div className="area-background">
            {experience.length > 0 && (
              <ul className="area-experience">
                {experience.map((role) => (
                  <li key={role.employer}>
                    <p className="technical muted">{role.period}</p>
                    <h3>
                      {role.role} · {role.employer}
                    </h3>
                    <p>{role.responsibilities[0]}</p>
                  </li>
                ))}
                {certifications.map((item) => (
                  <li key={item.name}>
                    <p className="technical muted">
                      {item.year} · Certification
                    </p>
                    <h3>
                      {item.name} · {item.issuer}
                    </h3>
                    {item.detail && <p>{item.detail}</p>}
                  </li>
                ))}
              </ul>
            )}
            {skills && (
              <div>
                <p className="eyebrow">{skills.category}</p>
                <ul className="tags">
                  {skills.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="text-link mt-4" href="/about#experience">
                  Full experience <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      <nav className="area-next" aria-label="Other security areas">
        {otherAreas.map((item) => (
          <Link key={item.id} href={item.path}>
            <span className="technical muted">
              {item.index} / {item.label}
            </span>
            {item.summary}
          </Link>
        ))}
      </nav>
    </div>
  );
}
