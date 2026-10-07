import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectRecord } from "@/components/home/project-record";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusLabel } from "@/components/ui/status-label";
import { siteContent as content } from "@/lib/site-content";
import { getJournalEntries, journalHref } from "@/lib/journal";

export async function HomePage() {
  const projects = (await getProjects()).filter((project) =>
    content.work.featuredProjectIds.includes(project.id),
  );
  const journalEntries = await getJournalEntries();
  return (
    <div className="shell">
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="accent-rule" aria-hidden="true" />
            {content.identity.eyebrow}
          </p>
          <h1 id="intro-heading">
            {content.identity.heading.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-introduction">{content.identity.introduction}</p>
          <p className="hero-purpose">{content.identity.purpose}</p>
          <div className="hero-actions">
            <a className="button-link" href="#work">
              Explore the work <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#now">
              What I’m focused on <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <aside className="workspace-index" aria-label="Engineering direction">
          <div className="panel-header">
            <span className="technical">Engineering record</span>
            <span className="technical">System / Foundation</span>
          </div>
          <figure className="direction-map">
            <p className="index-title">{content.identity.overview.title}</p>
            <ol role="list" className="direction-layers">
              {content.identity.overview.layers.map((layer, index) => (
                <li key={layer.title}>
                  <span className="layer-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p>{layer.title}</p>
                    <span className="technical muted">{layer.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
            <figcaption className="technical muted">
              {content.identity.overview.caption}
            </figcaption>
          </figure>
        </aside>
      </section>
      <div className="trajectory">
        <p className="technical">{content.identity.trajectoryLabel}</p>
        <ol>
          {content.identity.trajectory.map((step, index) => (
            <li key={step}>
              {index > 0 && (
                <span aria-hidden="true" className="trajectory-arrow">
                  →
                </span>
              )}
              {step}
            </li>
          ))}
        </ol>
      </div>
      <section
        className="content-section"
        id="now"
        aria-labelledby="now-heading"
      >
        <SectionHeading
          id="now"
          index="01"
          label="Current focus"
          title={content.now.title}
          description={content.now.description}
        />
        <div className="focus-grid">
          {content.now.focus.map((area, index) => (
            <article className="focus-item" key={area.title}>
              <span className="technical muted">
                Learning direction / 0{index + 1}
              </span>
              <h3>{area.title}</h3>
              <dl className="focus-questions">
                <div>
                  <dt>Learning</dt>
                  <dd>{area.learning}</dd>
                </div>
                <div>
                  <dt>Why it matters</dt>
                  <dd>{area.relevance}</dd>
                </div>
                <div>
                  <dt>Building toward</dt>
                  <dd>{area.destination}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
      <section
        className="content-section"
        id="work"
        aria-labelledby="work-heading"
      >
        <SectionHeading
          id="work"
          index="02"
          label="Selected work"
          title={content.work.title}
          description={content.work.description}
        />
        <div className="project-records">
          {projects.map((project) => (
            <ProjectRecord key={project.id} project={project} />
          ))}
        </div>
        <Link className="text-link mt-4" href="/work">
          Browse engineering records <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section
        className="content-section"
        id="infrastructure"
        aria-labelledby="infrastructure-heading"
      >
        <SectionHeading
          id="infrastructure"
          index="03"
          label="Infrastructure direction"
          title={content.infrastructure.title}
          description={content.infrastructure.description}
        />
        <div className="infrastructure-panel">
          <div className="infrastructure-notice">
            <StatusLabel status={content.infrastructure.status} />
            <p>{content.infrastructure.notice}</p>
          </div>
          <figure className="architecture-map">
            <figcaption className="technical muted">
              {content.infrastructure.architectureCaption}
            </figcaption>
            <ol role="list" className="system-chain">
              {content.infrastructure.architecture.map((layer) => (
                <li key={layer.title}>
                  <p>{layer.title}</p>
                  <span className="technical muted">{layer.detail}</span>
                </li>
              ))}
            </ol>
          </figure>
          <figure className="operating-practice">
            <ol className="infrastructure-stages">
              {content.infrastructure.stages.map((stage, index) => (
                <li key={stage.title}>
                  <span className="technical accent">0{index + 1}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </li>
              ))}
            </ol>
            <figcaption className="technical muted">
              {content.infrastructure.caption}
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        className="content-section"
        id="notes"
        aria-labelledby="notes-heading"
      >
        <SectionHeading
          id="notes"
          index="04"
          label="Writing & research"
          title={content.notes.title}
          description={content.notes.description}
        />
        <figure className="knowledge-cycle">
          <ol role="list">
            {content.notes.cycle.map((step) => (
              <li key={step.title}>
                <p>{step.title}</p>
                <span className="technical muted">{step.detail}</span>
              </li>
            ))}
          </ol>
          <figcaption className="technical muted">
            {content.notes.cycleCaption}
          </figcaption>
        </figure>
        <div className="notes-grid">
          {content.notes.collections.map((collection) => (
            <article className="note-item" key={collection.title}>
              <p className="technical accent">{collection.label}</p>
              <h3>
                <Link href="/research">{collection.title}</Link>
              </h3>
              <p>{collection.description}</p>
              <StatusLabel status={content.notes.status} />
            </article>
          ))}
        </div>
        {journalEntries[0] && (
          <div className="home-journal-link">
            <p className="technical accent">Latest engineering journal</p>
            <Link className="text-link" href={journalHref(journalEntries[0])}>
              {journalEntries[0].title} <span aria-hidden="true">→</span>
            </Link>
            <Link className="technical muted" href="/journal">
              Browse the chronological archive
            </Link>
          </div>
        )}
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
          title={content.contact.title}
          description={content.contact.description}
        />
        <div className="contact-topics">
          {content.contact.topics.map((topic) => (
            <div key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
        <p className="contact-notice">
          <span aria-hidden="true">↳</span>
          {content.contact.notice}
        </p>
      </section>
    </div>
  );
}
