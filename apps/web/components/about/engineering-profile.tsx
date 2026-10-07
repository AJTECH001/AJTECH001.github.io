import Link from "next/link";
import { EngineeringMap } from "@/components/about/engineering-map";
import { projectHref } from "@/lib/projects";
import { journalHref } from "@/lib/journal";
import { researchHref } from "@/lib/research";
import type { getEngineeringProfile } from "@/lib/profile";

function Heading({
  number,
  id,
  title,
  description,
}: {
  number: string;
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="profile-heading">
      <p className="eyebrow">{number} / Engineering profile</p>
      <h2 id={`${id}-heading`}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function EngineeringProfile({
  data,
}: {
  data: Awaited<ReturnType<typeof getEngineeringProfile>>;
}) {
  const { profile, projects, learning, journalEntries, researchRecords } = data;
  return (
    <div className="shell profile-page">
      <nav aria-label="Breadcrumb" className="profile-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Engineering profile</span>
      </nav>
      <header className="profile-intro">
        <p className="eyebrow accent">01 / Identity · Computer Engineer</p>
        <h1>{profile.title}</h1>
        <p className="profile-summary">{profile.summary}</p>
        <div className="profile-introduction">
          {profile.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link className="text-link" href="/work">
          Inspect the engineering work <span aria-hidden="true">→</span>
        </Link>
      </header>
      <nav className="profile-index" aria-label="Profile sections">
        <a href="#engineering-map">Engineering map</a>
        <a href="#domains">Domains & evidence</a>
        <a href="#trajectory">Trajectory</a>
        <a href="#direction">Current direction</a>
        <a href="#practice">Practice</a>
      </nav>
      <section
        id="engineering-map"
        className="profile-section"
        aria-labelledby="engineering-map-heading"
      >
        <Heading
          number="02"
          id="engineering-map"
          title="Connect the layers before specializing."
        />
        <EngineeringMap />
      </section>
      <section
        id="domains"
        className="profile-section"
        aria-labelledby="domains-heading"
      >
        <Heading
          number="03"
          id="domains"
          title="Domains, grounded in evidence."
          description="Building is backed by a published record. Learning, research, and direction describe intent. Unpublished context identifies work still awaiting documentation—not a claim of demonstrated proficiency."
        />
        <div className="profile-domains">
          {profile.domains.map((domain) => (
            <article
              id={`domain-${domain.id}`}
              key={domain.id}
              className="profile-domain"
              aria-labelledby={`domain-${domain.id}-title`}
            >
              <div className="domain-title">
                <h3 id={`domain-${domain.id}-title`}>{domain.label}</h3>
                <span className="status-label">{domain.state}</span>
              </div>
              <div className="domain-body">
                <p>{domain.description}</p>
                <p className="muted">{domain.connection}</p>
                <details>
                  <summary>Inspect evidence & context</summary>
                  <p>{domain.evidenceNote}</p>
                  {domain.contentRefs.map((ref) => {
                    const project = projects.find(
                      (item) => ref.kind === "project" && item.id === ref.id,
                    );
                    return project ? (
                      <Link
                        key={ref.id}
                        className="text-link"
                        href={projectHref(project)}
                      >
                        Project {project.number} / {project.title}{" "}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ) : null;
                  })}
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        id="trajectory"
        className="profile-section"
        aria-labelledby="trajectory-heading"
      >
        <Heading
          number="04"
          id="trajectory"
          title="A direction taking shape."
          description="A progression of focus, not a dated career history. Only the documented platform work has a supported year; the other stages are intentionally undated."
        />
        <ol role="list" className="profile-trajectory">
          {profile.trajectory.map((step) => (
            <li key={step.label}>
              <p className="technical accent">
                {step.state}
                {step.year ? ` / ${step.year}` : ""}
              </p>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="direction"
        className="profile-section"
        aria-labelledby="direction-heading"
      >
        <Heading
          number="05"
          id="direction"
          title="Learning the foundations. Building the record."
        />
        <div className="profile-current">
          <div>
            <p className="eyebrow accent">Currently building</p>
            {projects.map((project) => (
              <div key={project.id}>
                <h3>
                  <Link href={projectHref(project)}>{project.title}</Link>
                </h3>
                <p>{project.shortDescription}</p>
                <span className="status-label">{project.status}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow accent">Currently learning</p>
            <ul role="list">
              {learning.map((area) => (
                <li key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.learning}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section
        id="practice"
        className="profile-section"
        aria-labelledby="practice-heading"
      >
        <Heading
          number="06"
          id="practice"
          title="Make the reasoning inspectable."
          description="The practice I want the work to demonstrate: test assumptions, understand failures, and leave a useful technical record. Operating is a responsibility to grow into, not a status badge."
        />
        <ol role="list" className="profile-practice">
          {profile.practice.map((step, index) => (
            <li key={step.label}>
              <span className="technical accent" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.label}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="evidence"
        className="profile-section"
        aria-labelledby="evidence-heading"
      >
        <Heading
          number="07"
          id="evidence"
          title="Follow the evidence, then the reasoning."
          description="Follow the engineering work, its working notes, and the questions guiding further learning."
        />
        <div className="profile-evidence">
          {profile.relationships.map((edge) => {
            const project = projects.find(
              (item) => edge.to.kind === "project" && item.id === edge.to.id,
            );
            return project ? (
              <div key={edge.id}>
                <p className="eyebrow accent">
                  Profile → Published engineering record
                </p>
                <h3>
                  <Link href={projectHref(project)}>
                    Project {project.number} / {project.title}
                  </Link>
                </h3>
                <p>{edge.explanation}</p>
                <Link
                  className="text-link"
                  href={`${projectHref(project)}#architecture`}
                >
                  Inspect the current application architecture{" "}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            ) : null;
          })}
          {journalEntries.map((entry) => (
            <div key={entry.id}>
              <p className="eyebrow accent">Profile → Engineering journal</p>
              <h3>
                <Link href={journalHref(entry)}>{entry.title}</Link>
              </h3>
              <p>{entry.summary}</p>
            </div>
          ))}
          {profile.relationships
            .filter((edge) => edge.to.kind === "research")
            .map((edge) => {
              const record = researchRecords.find(
                (item) => item.id === edge.to.id,
              );
              return record ? (
                <div key={edge.id}>
                  <p className="eyebrow accent">Profile → Research direction</p>
                  <h3>
                    <Link href={researchHref(record)}>
                      {record.number} / {record.title}
                    </Link>
                  </h3>
                  <p>{edge.explanation}</p>
                </div>
              ) : null;
            })}
          <p className="technical muted profile-future-links">
            Future connections / Knowledge topics
          </p>
          <p className="muted">
            The Knowledge Base will follow when its durable concepts have
            supporting project, journal, or research sources.
          </p>
        </div>
      </section>
      <section
        id="future"
        className="profile-section profile-future"
        aria-labelledby="future-heading"
      >
        <Heading
          number="08"
          id="future"
          title="Toward the infrastructure behind modern computing."
        />
        <p>{profile.future}</p>
        <div className="profile-return">
          <Link className="text-link" href="/work">
            Explore engineering records <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href="/">
            Return to headquarters <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
