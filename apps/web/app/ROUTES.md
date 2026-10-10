# Route skeleton

The executable routes are `/`, `/about`, `/work`, `/work/[slug]`, `/writing`,
`/journal`, `/journal/[slug]`, `/research`, and `/research/[slug]`.
See [the portfolio audit](../../../docs/portfolio-audit.md) for the content
assessment and the disposition of the retained journal and research routes.

Primary navigation is Home, About, Projects (`/work`), Writing (`/writing`),
and Contact (`/#contact`). The journal and research routes remain available for
their existing records but are grouped under Writing rather than exposed as
separate primary destinations. Project detail URLs are unchanged.

The complete reservation manifest is [platform-routes.ts](../lib/platform-routes.ts).
The route tree, page contracts, component hierarchy, and activation order are in
[the platform architecture](../../../docs/architecture/platform-information-architecture.md).

Reserved entries deliberately have **no** `page.tsx`, `route.ts`, catch-all handler,
redirect, or navigation link. They remain unavailable until their feature is approved.
This includes `/admin` and `/api/*`. A reserved manifest entry is not an
access-control mechanism or a declaration that a system exists.

When activating a feature, add its explicit App Router files here, validate the
page contract, and then update the manifest. Never generate pages automatically
from reservations. Keep the root layout and existing Work layout in place.

Writing combines one published engineering log with six clearly labeled
research outlines in progress. The outlines contain questions and learning
scope, not findings. Draft and reserved future relationship targets are not
exposed as public pages or links. Knowledge contracts exist, but the Knowledge
routes remain reserved.
