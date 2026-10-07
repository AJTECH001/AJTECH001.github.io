"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/lib/site-content";

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      <ul className="navigation">
        {siteContent.navigation.map(({ label, id, href }) => {
          const current =
            (id === "journal" && pathname.startsWith("/journal")) ||
            (id === "research" && pathname.startsWith("/research")) ||
            (id === "work" && pathname.startsWith("/work")) ||
            (id === "about" && pathname === "/about");
          return (
            <li key={id}>
              <Link href={href} aria-current={current ? "page" : undefined}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
