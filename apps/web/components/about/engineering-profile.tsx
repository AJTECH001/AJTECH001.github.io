import Link from "next/link";
import type { getEngineeringProfile } from "@/lib/profile";
import { primaryNavigationHref } from "@/lib/platform-routes";
import { projectHref } from "@/lib/projects";

type ProfileData = Awaited<ReturnType<typeof getEngineeringProfile>>;

function stateLabel(domain: ProfileData["profile"]["domains"][number]) {
  switch (domain.state) {
    case "Building":
      return "Documented project";
    case "Unpublished context":
      return "Background";
    case "Research":
      return "Research interest";
    case "Learning":
      return "Background · current learning";
    default:
      return domain.state;
  }
}

export function EngineeringProfile({ data }: { data: ProfileData }) {
  const { profile, projects, learning } = data;

  return (
    <div className="shell profile-page">
      <nav aria-label="Breadcrumb" className="profile-breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">About</span>
      </nav>

      <header className="profile-intro">
        <p className="eyebrow accent">About / Computer Engineer</p>
        <h1>Software, hardware, and the systems between them.</h1>
        <p className="profile-summary">
          My background spans software and backend development, computer
          hardware, electronics, embedded systems, networking, and IT
          infrastructure. I’m building on that breadth as I move toward systems
          and infrastructure engineering.
        </p>
        <div className="profile-introduction">
          {profile.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section
        id="background"
        className="profile-section"
        aria-labelledby="background-heading"
      >
        <header className="profile-heading">
          <p className="eyebrow accent">Background and technical focus</p>
          <h2 id="background-heading">A broad engineering foundation.</h2>
          <p>
            These areas reflect my experience, interests, and current direction.
            The labels distinguish background from the work and learning I have
            documented here; they are not a proficiency rating.
          </p>
        </header>
        <ul className="profile-domains">
          {profile.domains.map((domain) => (
            <li className="profile-domain" key={domain.id}>
              <div className="domain-title">
                <h3>{domain.label}</h3>
                <span className="profile-domain-state">
                  {stateLabel(domain)}
                </span>
              </div>
              <div className="domain-body">
                <p>{domain.description}</p>
                <details>
                  <summary>Evidence and scope</summary>
                  <p>{domain.evidenceNote}</p>
                </details>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="projects"
        className="profile-section"
        aria-labelledby="profile-projects-heading"
      >
        <header className="profile-heading">
          <p className="eyebrow accent">Published work</p>
          <h2 id="profile-projects-heading">One project documented so far.</h2>
          <p>
            Other areas of experience and interest need their own project
            records before they can be assessed from this portfolio.
          </p>
        </header>
        <ul className="profile-project-list">
          {projects.map((project) => (
            <li key={project.id}>
              <p className="technical accent">
                Project {project.number} · {project.status}
              </p>
              <h3>
                <Link href={projectHref(project)}>{project.title}</Link>
              </h3>
              <p>{project.shortDescription}</p>
              <ul className="tags" aria-label="Project technologies">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="direction"
        className="profile-section profile-future"
        aria-labelledby="direction-heading"
      >
        <header className="profile-heading">
          <p className="eyebrow accent">Professional direction</p>
          <h2 id="direction-heading">Building toward infrastructure work.</h2>
        </header>
        <p>{profile.future}</p>
        <ul className="focus-list profile-learning">
          {learning.map((area) => (
            <li key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.learning}</p>
            </li>
          ))}
        </ul>
        <Link className="text-link" href={primaryNavigationHref("writing")}>
          Read my writing and ongoing research <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
