import Link from "next/link";
import { ProjectCard } from "@/components/security/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { primaryNavigationHref } from "@/lib/platform-routes";
import { getProjects } from "@/lib/projects";
import { getResearchRecords, researchHref } from "@/lib/research";
import { evidenceSummary, securityAreas } from "@/lib/security-areas";
import { siteContent } from "@/lib/site-content";
import { professionalContent } from "@/lib/professional-content";
import { publications } from "@/lib/publications";

export async function HomePage() {
  const [projects, research] = await Promise.all([
    getProjects(),
    getResearchRecords(),
  ]);
  const featured = siteContent.work.featuredProjectIds.flatMap((id) =>
    projects.filter((project) => project.id === id),
  );
  const summary = evidenceSummary(projects);
  const assessment = projects.find(
    (project) => project.id === "ai-agent-ctf-assessment",
  );
  const record = [
    {
      value: String(summary.audits),
      label: "Smart contract audits",
      detail: `${summary.publicReports} public reports · Solidity and Rust`,
    },
    {
      value: String(summary.auditFindings),
      label: "Documented audit findings",
      detail: `${summary.auditHighs} rated high severity`,
    },
    ...(assessment
      ? [
          {
            value: "5/6",
            label: "AI agent challenges solved",
            detail: "Expert-track red-team assessment",
          },
        ]
      : []),
  ];

  return (
    <div className="shell home-page">
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <p className="eyebrow accent">
            <span className="accent-rule" aria-hidden="true" />
            {siteContent.identity.eyebrow}
          </p>
          <h1 id="intro-heading">{siteContent.identity.heading}</h1>
          <p className="hero-introduction">
            {siteContent.identity.introduction}
          </p>
          <div className="hero-actions">
            <Link
              className="button-link"
              href={primaryNavigationHref("projects")}
            >
              View security work <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href={primaryNavigationHref("writing")}>
              Read the research
            </Link>
            <Link className="text-link" href={primaryNavigationHref("contact")}>
              Get in touch
            </Link>
          </div>
        </div>
        <aside
          className="workspace-index evidence-panel"
          aria-label="Evidence record"
        >
          <div className="panel-header">
            <p className="eyebrow">Evidence record</p>
            <p className="technical">Verified work</p>
          </div>
          <dl className="evidence-figures">
            {record.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <span className="evidence-value">{item.value}</span>
                  <span className="technical muted">{item.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="technical muted evidence-note">
            Every figure links back to a report, assessment, or repository.
          </p>
        </aside>
      </section>

      <section
        className="content-section"
        id="focus"
        aria-labelledby="focus-heading"
      >
        <SectionHeading
          id="focus"
          index="01"
          label="Areas of focus"
          title="Three connected areas of security research."
          description="Blockchain and AI systems fail in new ways, and in familiar application-security ways. I work across all three."
        />
        <ol className="focus-grid area-grid">
          {securityAreas.map((area) => (
            <li className="focus-item area-item" key={area.id}>
              <p className="technical accent">{area.index}</p>
              <h3>
                <Link href={area.path}>{area.label}</Link>
              </h3>
              <p>{area.summary}</p>
              <ul className="area-topics">
                {area.topics.map((topic) => (
                  <li key={topic.title}>{topic.title}</li>
                ))}
              </ul>
              <Link className="text-link" href={area.path}>
                Explore {area.navLabel} work <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="content-section"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <SectionHeading
          id="projects"
          index="02"
          label="Projects & research"
          title={siteContent.work.title}
          description={siteContent.work.description}
        />
        <div className="security-card-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} showArea />
          ))}
        </div>
        <Link
          className="text-link mt-4"
          href={primaryNavigationHref("projects")}
        >
          All {projects.length} projects and research records{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section
        className="content-section"
        id="capabilities"
        aria-labelledby="capabilities-heading"
      >
        <SectionHeading
          id="capabilities"
          index="03"
          label="Technical capabilities"
          title="Skills backed by reports, assessments, and code."
          description="Only capabilities demonstrated in the work on this site or in my professional roles are listed."
        />
        <dl className="capability-grid">
          {professionalContent.skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="content-section"
        id="writing"
        aria-labelledby="writing-heading"
      >
        <SectionHeading
          id="writing"
          index="04"
          label="Writing & publications"
          title="Audit reports and research notes."
          description="Published reports and notes that synthesise what the work showed."
        />
        <ul className="publication-list">
          {publications.slice(0, 2).map((item) => (
            <li key={item.href}>
              <p className="eyebrow">
                {item.type} · {item.date}
              </p>
              <h3>
                <a href={item.href}>
                  {item.title} <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p>{item.summary}</p>
            </li>
          ))}
          {research.slice(0, 2).map((note) => (
            <li key={note.id}>
              <p className="eyebrow">Research note · {note.domain}</p>
              <h3>
                <Link href={researchHref(note)}>{note.title}</Link>
              </h3>
              <p>{note.summary}</p>
            </li>
          ))}
        </ul>
        <Link
          className="text-link mt-4"
          href={primaryNavigationHref("writing")}
        >
          All writing and publications <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section
        className="content-section contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <SectionHeading
          id="contact"
          index="05"
          label="Contact"
          title={siteContent.contact.title}
          description={siteContent.contact.description}
        />
        <ul className="contact-topics">
          {professionalContent.collaboration.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
        <ul className="contact-list">
          {professionalContent.contact.map((item) => (
            <li key={item.id}>
              <span>{item.label}</span>
              <a href={item.href}>{item.value}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
