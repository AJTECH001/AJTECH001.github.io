"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation, publicRoutes } from "@/lib/platform-routes";

const sectionPrefixes: Partial<Record<string, string[]>> = {
  projects: [publicRoutes.work.path],
  writing: [publicRoutes.writing.path, publicRoutes.research.path],
};

function within(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(route + "/");
}

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      <ul className="navigation">
        {Object.values(primaryNavigation).map(({ label, id, href }) => {
          const inSection = (sectionPrefixes[id] ?? []).some((route) =>
            within(pathname, route),
          );
          const currentValue =
            pathname === href ? "page" : inSection ? "location" : undefined;
          return (
            <li key={id}>
              <Link href={href} aria-current={currentValue}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
