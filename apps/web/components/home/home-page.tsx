import Link from "next/link";
import { ProjectRecord } from "@/components/home/project-record";
import { SectionHeading } from "@/components/ui/section-heading";
import { primaryNavigationHref } from "@/lib/platform-routes";
import { getProjects } from "@/lib/projects";
import { siteContent } from "@/lib/site-content";

export async function HomePage() {
  const projects = (await getProjects()).filter((project) =>
    siteContent.work.featuredProjectIds.includes(project.id),
  );

  return (
    <div className="shell home-page">
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <p className="eyebrow accent">{siteContent.identity.eyebrow}</p>
          <h1 id="intro-heading">{siteContent.identity.heading}</h1>
          <p className="hero-introduction">
            {siteContent.identity.introduction}
          </p>
          <p className="hero-purpose">{siteContent.identity.purpose}</p>
          <div className="hero-actions">
            <Link
              className="button-link"
              href={primaryNavigationHref("projects")}
            >
              View projects <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href={primaryNavigationHref("about")}>
              About me
            </Link>
            <Link className="text-link" href={primaryNavigationHref("writing")}>
              Technical writing
            </Link>
          </div>
        </div>
      </section>

      <section
        className="content-section"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <SectionHeading
          id="projects"
          index="01"
          label="Selected project"
          title={siteContent.work.title}
          description={siteContent.work.description}
        />
        <div className="project-records">
          {projects.map((project) => (
            <ProjectRecord key={project.id} project={project} />
          ))}
        </div>
        <Link
          className="text-link mt-4"
          href={primaryNavigationHref("projects")}
        >
          Browse all projects <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="content-section" aria-labelledby="approach-heading">
        <SectionHeading
          id="approach"
          index="02"
          label="Engineering approach"
          title="Understand the system. Make the reasoning clear."
          description="I start by examining constraints and how the parts interact, then test assumptions and record decisions, limitations, and lessons."
        />
        <div className="approach-list">
          <p>Trace problems to evidence before changing the design.</p>
          <p>Keep implemented work distinct from plans and learning goals.</p>
          <p>
            Document decisions so the system can be understood and maintained.
          </p>
        </div>
      </section>

      <section
        className="content-section current-focus"
        aria-labelledby="focus-heading"
      >
        <SectionHeading
          id="focus"
          index="03"
          label="Current learning"
          title="Growing toward infrastructure engineering."
          description={siteContent.now.description}
        />
        <ul className="focus-list">
          {siteContent.now.focus.map((area) => (
            <li key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.learning}</p>
            </li>
          ))}
        </ul>
        <Link className="text-link" href={primaryNavigationHref("about")}>
          Background and direction <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section
        className="content-section contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <SectionHeading
          id="contact"
          index="04"
          label="Contact"
          title={siteContent.contact.title}
          description={siteContent.contact.description}
        />
        <p className="contact-notice">{siteContent.contact.notice}</p>
      </section>
    </div>
  );
}
