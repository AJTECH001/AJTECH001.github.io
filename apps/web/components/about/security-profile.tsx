import Link from "next/link";
import { ProjectCard } from "@/components/security/project-card";
import { professionalContent } from "@/lib/professional-content";
import { securityAreas } from "@/lib/security-areas";
import type { ProjectRecord } from "@/types/project";

export function SecurityProfile({
  projects,
}: {
  projects: readonly ProjectRecord[];
}) {
  const featured = securityAreas.flatMap(
    (area) => projects.find((project) => project.area === area.id) ?? [],
  );
  return (
    <div className="shell profile-page">
      <nav aria-label="Breadcrumb" className="profile-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">About</span>
      </nav>

      <header className="profile-intro">
        <p className="eyebrow accent">About / {professionalContent.fullName}</p>
        <h1>Security engineer working on blockchain and AI systems.</h1>
        {professionalContent.introduction.map((paragraph) => (
          <p className="profile-summary" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <p className="profile-location">{professionalContent.positioning}</p>
      </header>

      <section className="profile-section" aria-labelledby="focus-heading">
        <header className="profile-heading">
          <p className="eyebrow accent">Focus</p>
          <h2 id="focus-heading">What I work on</h2>
        </header>
        <ol className="profile-focus">
          {securityAreas.map((area) => (
            <li key={area.id}>
              <p className="technical accent">{area.index}</p>
              <div>
                <h3>
                  <Link href={area.path}>{area.label}</Link>
                </h3>
                <p>{area.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="experience"
        className="profile-section"
        aria-labelledby="experience-heading"
      >
        <header className="profile-heading">
          <p className="eyebrow accent">Professional experience</p>
          <h2 id="experience-heading">Experience</h2>
          <p>
            Roles are listed with security-relevant work first. Earlier
            engineering roles are included where they underpin security work.
          </p>
        </header>
        <ol className="experience-list">
          {professionalContent.experience.map((role) => (
            <li className="experience-record" key={role.employer}>
              <header>
                <div>
                  <h3>{role.role}</h3>
                  <p className="experience-employer">{role.employer}</p>
                </div>
                <p className="experience-period">{role.period}</p>
              </header>
              <p className="experience-location">{role.location}</p>
              <ul className="experience-responsibilities">
                {role.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="skills"
        className="profile-section"
        aria-labelledby="skills-heading"
      >
        <header className="profile-heading">
          <p className="eyebrow accent">Capabilities</p>
          <h2 id="skills-heading">Skills and tools</h2>
        </header>
        <dl className="skills-list">
          {professionalContent.skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd>{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="profile-section" aria-labelledby="education-heading">
        <header className="profile-heading">
          <p className="eyebrow accent">Credentials</p>
          <h2 id="education-heading">Certifications and education</h2>
        </header>
        <ul className="credential-list certification-list">
          {professionalContent.certifications.map((entry) => (
            <li key={entry.name}>
              <div>
                <h3>{entry.name}</h3>
                <p>
                  {entry.issuer}
                  {entry.detail ? ` · ${entry.detail}` : ""}
                </p>
              </div>
              <span>{entry.year}</span>
            </li>
          ))}
        </ul>
        <ol className="credential-list">
          {professionalContent.education.map((entry) => (
            <li key={entry.qualification}>
              <div>
                <h3>{entry.qualification}</h3>
                <p>
                  {entry.institution} · {entry.result}
                </p>
              </div>
              <span>{entry.period}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="profile-section" aria-labelledby="work-heading">
        <header className="profile-heading">
          <p className="eyebrow accent">Selected work</p>
          <h2 id="work-heading">One record from each area</h2>
        </header>
        <div className="security-card-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} showArea />
          ))}
        </div>
        <Link className="text-link mt-4" href="/work">
          All projects and research <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="profile-section" aria-labelledby="teaching-heading">
        <header className="profile-heading">
          <p className="eyebrow accent">Community</p>
          <h2 id="teaching-heading">Teaching and developer education</h2>
        </header>
        <ul className="experience-responsibilities">
          {professionalContent.teaching.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="profile-section" aria-labelledby="contact-heading">
        <header className="profile-heading">
          <p className="eyebrow accent">Contact</p>
          <h2 id="contact-heading">Collaborate</h2>
          <p>
            Security research collaborations, blockchain and AI security
            engagements, and security engineering roles.
          </p>
        </header>
        <ul className="contact-list about-contact-list">
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
