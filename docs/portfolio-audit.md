# Portfolio audit: repositioning to security engineering and research

The portfolio was repositioned (November 2026) from an infrastructure-first
engineering profile to **Security Engineering & Research, specialising in
Blockchain Security, AI Security, and Cybersecurity**. The visual brand
(graphite surfaces, sage accent, Geist sans/mono, the AJ mark, bordered panels
and record layouts) is unchanged; positioning, content, navigation, and
information architecture changed.

## Phase 1 audit

| Disposition | Item                                                                                                                                                                                                                                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keep        | Next.js 16 App Router stack, pnpm workspace, CI checks; design tokens, typography, AJ mark, panel/record components; typed local content layer and readers; contact methods; CV employment, education, and teaching record                                                                                                    |
| Modify      | Positioning and homepage copy; navigation; `/work` (regrouped by security area); research records (rewritten around real security evidence); About narrative; skills (security-led, evidence-backed only); certifications (security-relevant first); SEO metadata                                                             |
| Remove      | Infrastructure Engineering Lab plan; portfolio-implementation project record and journal entry; infrastructure, self-hosting, data-center, and AI-infrastructure research outlines; infrastructure-first profile domains and trajectory; datacenter certificate from display; hardware/embedded skills as a headline category |
| Improve     | Findings-by-severity summaries; dedicated area pages; publications list linking each report to its project; sitemap, robots, Open Graph image, per-page social metadata, `Person` structured data; permanent redirects for retired URLs                                                                                       |

The previous uncommitted About page also failed `tsc` (an optional
`certification.detail` property); this is fixed.

## Information architecture

| Navigation    | Destination                                 | Content                                                                                     |
| ------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| (wordmark)    | `/`                                         | Identity, evidence record, three focus areas, selected work, capabilities, writing, contact |
| Blockchain    | `/blockchain-security`                      | Area focus with evidence, records, reports, notes, experience                               |
| AI Security   | `/ai-security`                              | Same structure for AI security research and red teaming                                     |
| Cybersecurity | `/cybersecurity`                            | Same structure for application, web, and access-control security                            |
| Projects      | `/work`, `/work/[slug]`                     | All records grouped by area: problem, approach, contribution, findings, links               |
| Writing       | `/writing`, `/research`, `/research/[slug]` | Audit and assessment reports; research notes                                                |
| About         | `/about` (`#experience`)                    | Security narrative, experience, skills, credentials, contact                                |
| Contact       | `/#contact`                                 | Collaboration topics and contact methods                                                    |

Retired URLs (`/journal*`, the two old project slugs, and six old research
slugs) redirect permanently; see `apps/web/next.config.ts`.

## Evidence register

Every published record is backed by work the owner produced. Severity counts
are copied from the reports.

| Record                                        | Evidence                                     | Public link                                                 |
| --------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| B-01 Puppy Raffle audit (4H/4M/8I)            | Report PDF, Jan 2026                         | github.com/AJTECH001/audit-reports                          |
| B-02 Snowman Merkle Airdrop audit (3H/3M/3L)  | Report PDF, Jan 2026                         | github.com/AJTECH001/audit-reports                          |
| B-03 RustFund Anchor audit (3H/1M)            | Local `audit_report.md`                      | Not yet published                                           |
| B-04 Solana access-control programs           | Repositories                                 | whitelist_transfer_hook, transfer-hook-vault, anchor_escrow |
| A-01 AI agent red-team assessment (5/6)       | Local final report, Nov 2026                 | Private; flags and solutions withheld                       |
| A-02 ai-redteam-skills (9 skills)             | Local repository, validation harness passing | Not yet published                                           |
| A-03 Indirect prompt injection lab (26 tests) | Local lab                                    | Not published                                               |
| C-01 Self-XSS browser security lab            | Local lab                                    | Not published                                               |
| C-02 rust-role-based-auth                     | Repository                                   | github.com/AJTECH001/rust-role-based-auth                   |

Training and First Flight codebases (Cyfrin Puppy Raffle, CodeHawks Snowman
and RustFund) are named as such. No contest placements are claimed.

## Open items for the owner

- Publish the RustFund report to `audit-reports`, then add its link to B-03 and
  change its publication availability to `Public` in `lib/publications.ts`.
- Publish `ai-redteam-skills`, then add the repository link to A-02.
- Confirm that the ARKX CTF terms permit the published high-level summary
  (vulnerability classes only; no flags or solutions are shown).
- A-01's contribution statement describes an AI-assisted workflow, matching
  the assessment README; adjust it if that framing is not wanted.
- Optional: publish the IPI and Self-XSS labs as repositories and link them.
- The phone number remains listed as it was before; remove it from
  `lib/professional-content.ts` if it should no longer be public.
