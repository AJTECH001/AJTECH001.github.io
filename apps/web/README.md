# AJTECH engineering portfolio

This repository contains AJTECH's personal engineering portfolio. The
application is in `apps/web` in a pnpm workspace. Project, profile, writing, and
research content is typed local data; there is no database, CMS, or self-hosted
service.

## Development

From the repository root:

```bash
pnpm dev
```

The primary public destinations are `/`, `/about`, `/work`, and `/writing`.
Existing `/journal` and `/research` pages and their detail URLs remain
available. See [the route guide](./app/ROUTES.md) and
[the portfolio audit](../../docs/portfolio-audit.md).

## Validation

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```
