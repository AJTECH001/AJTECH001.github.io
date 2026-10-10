"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation, publicRoutes } from "@/lib/platform-routes";

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      <ul className="navigation">
        {Object.values(primaryNavigation).map(({ label, id, href }) => {
          const isWritingRoute =
            id === "writing" &&
            [
              publicRoutes.writing.path,
              publicRoutes.journal.path,
              publicRoutes.research.path,
            ].some(
              (route) => pathname === route || pathname.startsWith(route + "/"),
            );
          const isProjectsRoute =
            id === "projects" &&
            (pathname === publicRoutes.work.path ||
              pathname.startsWith(publicRoutes.work.path + "/"));
          const current =
            (id === "home" && pathname === "/") ||
            isProjectsRoute ||
            isWritingRoute ||
            (id === "about" && pathname === "/about");
          const currentValue =
            pathname === href ? "page" : current ? "location" : undefined;
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
