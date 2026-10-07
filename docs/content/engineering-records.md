# Engineering record authoring

`apps/web/types/project.ts` extends the existing project model with the shared
`Publication`, `Domain`, `ContentRef`, and `ContentRelation` contracts. It is not a
second content schema. `lib/project-content.ts` remains the canonical record store.

- Public readers return only `published` + `public` records, independently of project
  lifecycle. Static generation, slug lookup, Home and About all use those readers.
- Allocate numbers only to established records. Unverified leads stay in the source
  inventory, without a public slug or number. Project 001 retains its identity.
- A period/year is optional and must be supported. Domains describe actual work;
  infrastructure ambitions do not make a software project operational infrastructure.
- Hardware, software, networking, security, operations, result, current state and
  lessons are optional sections. Empty sections do not generate headings or TOC links.
- Debugging cases use symptom, investigation, hypothesis, test, root cause, fix and
  lesson. Omit unsupported stages. A hypothesis must not be promoted to a confirmed
  cause simply because a later build succeeded. Include a source description.
- Architecture references and cross-content relationships can remain unresolved.
  The link resolver exposes only implemented, published destinations. It derives
  backlinks from published records, including the existing profile relationship.
- External links are omitted until verified. No Journal, Research, Knowledge,
  Infrastructure or API routes are introduced by this feature.

Publication is editorial visibility; an operational project status is not telemetry.
No additional project numbers or operational claims are introduced in this milestone.

Run targeted invariants with the repository's Node 22 environment:

```sh
node --experimental-strip-types --test tests/unit/project-records.test.mjs
```

Then run the standard formatting, lint, typecheck and production build checks.
