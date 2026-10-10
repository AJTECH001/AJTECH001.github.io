import { siteContent } from "@/lib/site-content";
import Link from "next/link";
import { primaryNavigationHref } from "@/lib/platform-routes";

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
        <p className="technical muted">{siteContent.footer.note}</p>
        <a className="text-link" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
