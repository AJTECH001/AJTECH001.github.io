/** Route reservations are planning metadata, not Next.js pages or access controls. */
type PublicRoute = {
  path: `/${string}`;
  label: string;
  state: "implemented" | "reserved";
  phase: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  data: "editorial" | "aggregate" | "live" | "interactive";
};
export const publicRoutes = {
  home: {
    path: "/",
    label: "Home",
    state: "implemented",
    phase: 0,
    data: "editorial",
  },
  about: {
    path: "/about",
    label: "About",
    state: "implemented",
    phase: 1,
    data: "editorial",
  },
  work: {
    path: "/work",
    label: "Work",
    state: "implemented",
    phase: 0,
    data: "editorial",
  },
  project: {
    path: "/work/[slug]",
    label: "Engineering record",
    state: "implemented",
    phase: 0,
    data: "editorial",
  },
  journal: {
    path: "/journal",
    label: "Journal",
    state: "implemented",
    phase: 2,
    data: "editorial",
  },
  journalEntry: {
    path: "/journal/[slug]",
    label: "Journal entry",
    state: "implemented",
    phase: 2,
    data: "editorial",
  },
  research: {
    path: "/research",
    label: "Research",
    state: "implemented",
    phase: 2,
    data: "editorial",
  },
  researchDocument: {
    path: "/research/[slug]",
    label: "Research document",
    state: "implemented",
    phase: 2,
    data: "editorial",
  },
  now: {
    path: "/now",
    label: "Now",
    state: "reserved",
    phase: 1,
    data: "editorial",
  },
  lab: {
    path: "/lab",
    label: "Lab",
    state: "reserved",
    phase: 4,
    data: "editorial",
  },
  infrastructure: {
    path: "/infrastructure",
    label: "Infrastructure",
    state: "reserved",
    phase: 4,
    data: "editorial",
  },
  status: {
    path: "/status",
    label: "Status",
    state: "reserved",
    phase: 5,
    data: "live",
  },
  activity: {
    path: "/activity",
    label: "Activity",
    state: "reserved",
    phase: 3,
    data: "aggregate",
  },
  knowledge: {
    path: "/knowledge",
    label: "Knowledge",
    state: "reserved",
    phase: 3,
    data: "editorial",
  },
  knowledgeTopic: {
    path: "/knowledge/[slug]",
    label: "Knowledge topic",
    state: "reserved",
    phase: 3,
    data: "editorial",
  },
  architecture: {
    path: "/architecture",
    label: "Architecture",
    state: "reserved",
    phase: 3,
    data: "editorial",
  },
  contact: {
    path: "/contact",
    label: "Contact",
    state: "reserved",
    phase: 1,
    data: "editorial",
  },
  profile: {
    path: "/profile",
    label: "Profile",
    state: "reserved",
    phase: 1,
    data: "editorial",
  },
  apiDocs: {
    path: "/api-docs",
    label: "API documentation",
    state: "reserved",
    phase: 5,
    data: "editorial",
  },
  guestbook: {
    path: "/guestbook",
    label: "Guestbook",
    state: "reserved",
    phase: 6,
    data: "interactive",
  },
  ask: {
    path: "/ask",
    label: "Ask Jamiu",
    state: "reserved",
    phase: 6,
    data: "interactive",
  },
} as const satisfies Record<string, PublicRoute>;

type ImplementedStaticPage = {
  [
    K in keyof typeof publicRoutes
  ]: (typeof publicRoutes)[K]["state"] extends "implemented"
    ? (typeof publicRoutes)[K]["path"] extends `${string}[${string}`
      ? never
      : K
    : never;
}[keyof typeof publicRoutes];
/** Navigation may use implemented static pages; dynamic URLs use their feature's resolver. */
export function publicPageHref(page: ImplementedStaticPage): string {
  return publicRoutes[page].path;
}

export const privateRouteReservations = {
  root: "/admin",
  sections: [
    "content",
    "projects",
    "journal",
    "research",
    "activity",
    "infrastructure",
    "telemetry",
    "system-status",
  ],
  state: "reserved",
} as const;
export const apiRouteReservations = [
  "/api/profile",
  "/api/projects",
  "/api/activity",
  "/api/status",
  "/api/now",
  "/api/articles",
  "/api/lab",
  "/api/health",
] as const;
