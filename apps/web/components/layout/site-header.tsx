import { siteContent } from "@/lib/site-content";
import Link from "next/link";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { primaryNavigationHref } from "@/lib/platform-routes";
import { professionalContent } from "@/lib/professional-content";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <Link
          className="wordmark"
          href={primaryNavigationHref("home")}
          aria-label={`${siteContent.name} home`}
        >
          <span className="brand-mark" aria-hidden="true">
            AJ
          </span>
          <span className="brand-identity">
            <span>{siteContent.name}</span>
            <span className="brand-caption">
              {professionalContent.positioning}
            </span>
          </span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
