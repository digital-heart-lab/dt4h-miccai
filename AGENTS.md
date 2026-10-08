# DT4H website architecture

Confirmed by the project owner on 8 October 2026.

## Scope
This repository is the DT4H workshop series website. The Digital Heart lab website is a separate project; do not confuse its homepage with the DT4H series homepage.

## Required page structure
- `/` is the permanent homepage for the entire Digital Twin for Healthcare (DT4H) workshop series, across all editions. It must never become or redirect to the latest year's detail page.
- The series homepage explains the series, highlights the latest available edition (currently 2026), and links to its complete details and relevant highlights.
- `/workshops/<year>/` is the independent detail page for that year's workshop. Keep its program, papers, speakers, committee, sponsors, and recap with that edition.
- Preserve previous editions and their URLs. The original 2025 website is archived at `/workshops/2025/`; keep its content and assets intact and provide a return link to the series homepage.
- The homepage navigation must link directly to every available edition. Its edition directory must include all editions, regardless of status.
- Year-specific detail pages must provide a clear way back to the series homepage and to other editions. The site logo returns to `/`.
- Highlighting a new edition must not overwrite historical pages or change the identity of `/`. Derive edition navigation and the latest highlight from workshop content instead of hardcoding a two-year menu.

## Mistake to avoid
Earlier design work treated the 2026 workshop as the main website and obscured the permanent series homepage and historical entry points. This was explicitly rejected by the owner. Preserve the hierarchy: series homepage → edition detail pages.

## Validation
Check `/`, `/workshops/2026/`, and `/workshops/2025/`, navigation between them, and mobile navigation. Verify that historical assets load and the latest edition's full recap remains on its own detail page.
