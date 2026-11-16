# AJTECH engineering portfolio

This repository contains AJTECH's security engineering and research portfolio. The
application is in `apps/web` in a pnpm workspace. Project, profile, writing, and
research content is typed local data; there is no database, CMS, or self-hosted
service.

## Development

From the repository root:

```bash
pnpm dev
```

The primary public destinations are `/`, `/blockchain-security`,
`/ai-security`, `/cybersecurity`, `/work`, `/writing`, and `/about`. Research
notes live at `/research/[slug]`. Retired journal and infrastructure URLs
redirect (see `next.config.ts`). See [the route guide](./app/ROUTES.md) and
[the portfolio audit](../../docs/portfolio-audit.md).

Content lives in `lib/`: `project-content.ts` (security records),
`research-content.ts` (research notes), `publications.ts` (reports),
`security-areas.ts` (the three areas), and `professional-content.ts` (CV).

## Validation

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```
