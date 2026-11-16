# Route skeleton

The executable routes are `/`, `/blockchain-security`, `/ai-security`,
`/cybersecurity`, `/work`, `/work/[slug]`, `/writing`, `/research`,
`/research/[slug]`, and `/about`, plus the generated `/sitemap.xml`,
`/robots.txt`, and `/og.png` (share image).

Primary navigation is Blockchain, AI Security, Cybersecurity, Projects
(`/work`), Writing, About, and Contact (`/#contact`); the wordmark links home.
Experience is the `#experience` section of About. The three area pages share
`components/security/area-page.tsx` and read their copy from
`lib/security-areas.ts`. Every project record belongs to exactly one area
(`area`) and may list `secondaryAreas`.

Research records are published notes with stated evidence, findings, and
limitations. `/research` remains available, but Writing is the primary
destination.

The `/journal` routes were retired together with the portfolio build log;
`/journal` and `/journal/*` redirect to `/writing`. The journal content type
is retained for future security write-ups. Old infrastructure project and
research slugs redirect as listed in `next.config.ts`.

The complete reservation manifest is [platform-routes.ts](../lib/platform-routes.ts).
Reserved entries deliberately have **no** `page.tsx`, `route.ts`, catch-all
handler, redirect, or navigation link. A reserved manifest entry is not an
access-control mechanism or a declaration that a system exists.

See [the portfolio audit](../../../docs/portfolio-audit.md) for the
repositioning record and evidence register.
