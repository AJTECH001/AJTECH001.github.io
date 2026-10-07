import { siteContent } from "@/lib/site-content";
import Link from "next/link";
import { SiteNavigation } from "@/components/layout/site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <Link
          className="wordmark"
          href="/"
          aria-label={`${siteContent.name} home`}
        >
          <span className="brand-mark" aria-hidden="true">
            aj
          </span>
          <span className="brand-identity">
            <span>
              {siteContent.name}
              <span className="wordmark-suffix"> / engineering</span>
            </span>
            <span className="brand-caption">
              Personal technology headquarters
            </span>
          </span>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
