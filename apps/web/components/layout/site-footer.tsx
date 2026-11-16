import { siteContent } from "@/lib/site-content";
import Link from "next/link";
import { primaryNavigationHref } from "@/lib/platform-routes";
import { professionalContent } from "@/lib/professional-content";
import { securityAreas } from "@/lib/security-areas";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <Link className="wordmark" href={primaryNavigationHref("home")}>
            {siteContent.name}
          </Link>
          <p>{siteContent.footer.label}</p>
        </div>
        <nav aria-label="Security areas">
          <ul className="footer-areas">
            {securityAreas.map((area) => (
              <li key={area.id}>
                <Link className="text-link" href={area.path}>
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="text-link"
          href={
            professionalContent.contact.find((item) => item.id === "email")
              ?.href
          }
        >
          {
            professionalContent.contact.find((item) => item.id === "email")
              ?.value
          }
        </a>
        <a className="text-link" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
