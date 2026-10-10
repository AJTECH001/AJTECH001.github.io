# Portfolio audit and redesign

## Audit

- **Keep:** the dark graphite palette, accessible skip link and focus treatment, typed local content, shared project records, and detailed project page.
- **Rewrite:** the homepage, About page, project archive labels, metadata, and shared brand copy to foreground AJTECH and documented engineering work.
- **Remove:** the homepage's conceptual five-layer map, engineer-to-operator trajectory, infrastructure architecture diagram, and knowledge-cycle diagram; the About page's engineering map, career ladder, and repeated evidence sections.
- **Consolidate:** one published engineering log and six early research outlines under **Writing**. Existing `/journal` and `/research` pages and detail URLs remain available.
- **Keep planned:** a database, CMS, authentication, self-hosting, live status, and operational infrastructure. No supporting backend or self-hosted system is implemented in this repository.
- **Current gap:** the repository supports one detailed project: the portfolio itself. Other experience areas are owner-supplied background or direction without published project records. No verified email or professional contact profile is present.

## Public routes

| Navigation | Destination | State                                                                    |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| Home       | `/`         | Portfolio introduction, one selected project, approach, current learning |
| About      | `/about`    | Background, technical focus, project evidence, professional direction    |
| Projects   | `/work`     | One published project; detail URL remains `/work/[slug]`                 |
| Writing    | `/writing`  | One published engineering log and six clearly labeled research outlines  |
| Contact    | `/#contact` | Contact section; no direct contact channel has been published            |

The legacy `/journal`, `/journal/[slug]`, `/research`, and `/research/[slug]`
routes remain active. Research outlines describe open questions and limitations;
they do not claim completed studies or findings. Slugs and underlying content
records are preserved.
