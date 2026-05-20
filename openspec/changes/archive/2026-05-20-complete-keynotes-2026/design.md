## Context

The project follows a uniform Nuxt Content pattern for workshop sub-resources: each (`committee`, `sponsor`, `timeline`, `paper-template`) lives in `content/workshop/<resource>/<year>.json`, is registered as a collection in `content.config.ts` with a zod schema in `shared/schemas/workshop.ts`, and is fetched in parallel by `getWorkshopDetail()` and merged into the `Workshop` object that drives `app/pages/workshops/[year]/index.vue`.

`keynotes` is the odd one out: the schema and an example JSON for 2025 exist, but no collection, no query, and no 2026 file. The page already references `data.keynotes?.keynotes` defensively, so wiring up the data is enough to make the panel render; we just need to keep the panel's display useful for the richer 2026 data.

`docs/keynotes.md` is the source of truth for 2026 speakers. Speaker 1 (Kozerke) has full talk details; Speaker 2 (Jirsa) has `"tbc"` for title and abstract.

## Goals / Non-Goals

**Goals:**
- Bring keynotes onto the same collection/query/schema track as the other workshop resources, so adding future years is a one-file change.
- Make the schema strictly additive: 2025 data continues to validate without edits.
- Surface the new richer fields (talk title, website) on the workshop page when present, without redesigning the existing card.

**Non-Goals:**
- Building a dedicated speaker-detail page or abstract modal. The full abstract and bio live in JSON now; richer presentation is a follow-up.
- Restructuring the right-hand card. It will remain the same "Call for Sponsors / Keynote list" card with the existing styling.
- Editing 2025 content. Only the schema gets extended.

## Decisions

**Decision 1: Extend `KeynoteSchema` with optional fields rather than introducing a separate `KeynoteDetailSchema`.**
- Adds `website`, `talkTitle`, `talkAbstract`, `bio`, `links` (all `z.string().optional()`, except `links: z.array(z.string()).optional()`).
- Rationale: a single schema is simpler and the new fields are genuinely optional — 2025 has none, 2026 has most, future years can fill in incrementally. A discriminated union would force callers to narrow types for no benefit since the UI treats missing fields as "just don't render that bit."
- Alternative considered: separate `KeynoteFullSchema extends KeynoteSchema`. Rejected — extra type to maintain with no current consumer that needs the distinction.

**Decision 2: Register `keynotes` as its own collection, parallel to `committee`/`sponsor`/`timeline`/`paperTemplate`, rather than embedding in `workshop/<year>.json`.**
- File: `content/workshop/keynotes/<year>.json`, collection name `keynotes`, schema `KeynoteListSchema`.
- Rationale: matches the established pattern; keeps `workshop/<year>.json` small; the existing `keynotes/2025.json` already lives in this layout.
- Alternative considered: inline `keynotes` inside `workshop/<year>.json`. Rejected — inconsistent with siblings and would require migrating the 2025 file.

**Decision 3: `getWorkshopDetail()` adds `queryCollection("keynotes").where("year", "=", year).first()` to its existing `Promise.all`, and assigns the result to `keynotes` on the returned `Workshop`.**
- Rationale: identical pattern to the other resources; no special handling.
- The page already reads `data.keynotes?.keynotes` defensively, so a missing record produces the existing "Call for Sponsors" fallback automatically.

**Decision 4: Light-themed Keynotes section with a two-pane "Speaker | Keynote" card layout, brand-iconified links, and progressive disclosure.**

*Information architecture — separate Speaker from Keynote.* The previous design merged speaker bio, talk title, talk abstract, and link badges into one vertical wall of labelled paragraphs. The redesign splits each card into two clearly distinguished sub-units so readers can scan either the *person* or the *talk* without one fighting the other:

- **Speaker pane** — left column on `md+`, top stack on mobile. Contains: avatar block (gradient tile with initials, or photo when available), speaker name (display font, links to `website`), affiliation, country/role hint, and a horizontal row of **branded link icons** (no raw URLs). Bio sits behind a "Show bio" disclosure so the pane stays compact by default.
- **Keynote pane** — right column on `md+`, bottom stack on mobile. Contains: a numbered "Keynote N" eyebrow chip, the talk title in display type, the topic as a small uppercase tag, and the abstract. The abstract uses progressive disclosure — clamped to roughly 5 lines with a fade-out gradient and a "Read full abstract" toggle that expands inline (no modal, no route change).

A subtle vertical divider (1px gradient) separates the two panes on wide screens; on narrow screens the divider becomes a thin horizontal accent under the speaker pane.

*Branded link icons.* Each URL in `links` (and the speaker's `website`) gets mapped to a Lucide icon by its hostname:
- `linkedin.com` → `Linkedin`
- `github.com` → `Github`
- `pubmed.ncbi.nlm.nih.gov` → `BookMarked` (publications)
- `*.edu`, `*.ethz.ch`, `ins-amu.fr`, university-style hosts → `GraduationCap`
- lab/group sites (`cmr.ethz.ch`, etc.) → `FlaskConical`
- everything else → `Globe`

Icons render as 36×36 rounded buttons with a tooltip on the hostname. They sit in a tight cluster — no labels — which is what the user explicitly asked for.

*Visual treatment.*
- Section: `section-light` (white). Decorative blobs in `#1E6EF1/[0.03]` keep the white from feeling flat without competing with content.
- Card: `card-light` shape but with our own bespoke layout — `rounded-[28px]`, gradient hairline border that intensifies on hover, subtle inner shadow. A **left accent rail** (3px wide, gradient `#1E6EF1 → #60A5FA`) brands each card and breaks the monotony of a flat white block.
- Padding: tighter than the previous design — `p-6 md:p-8` (was `p-10`). Content density goes up; eye fatigue goes down.
- Typography hierarchy (3 tiers, no more):
  - Tier 1 (display): speaker name + talk title — `Space_Grotesk`, `text-xl`/`text-2xl`.
  - Tier 2 (body): affiliation + abstract + bio — `text-base text-[#374151]` with `leading-relaxed`.
  - Tier 3 (meta): eyebrows, chips, icon tooltips — `font-mono-label` in `#1E6EF1`.
- Avatar: 64×64 on wide, 56×56 on mobile, gradient `from-[#1E6EF1]/15 to-[#60A5FA]/5` with the speaker's last-name initial centered in display type.
- Numbered chip in the Keynote pane (e.g., "Keynote 01") gives a sense of programme order and adds color without adding text.

*Motion (tasteful, not flashy).*
- **No hover translate or scale on the card.** The card's bounding box stays put under the pointer — translating on hover caused click-target jitter for users moving between the card and its links. Hover affordances are limited to non-positional changes: border tints toward `#1E6EF1/30`, shadow deepens, and the accent rail widens from 3px → 4px.
- Avatar hover: gentle rotate(2deg) + scale(1.04). The avatar is decorative, so a transform on it doesn't shift click targets.
- Icon button hover: bg fills from transparent to `#1E6EF1/10`, icon color shifts to `#1E6EF1`.
- Entrance: existing `reveal` class handles intersection-observer fade-in (already wired by `useAnimation`); no new animation framework needed.
- **No in-card expand/collapse.** Disclosures (the previous "Read full abstract" and "Show bio" toggles) caused the page to reflow as users opened them, sliding the cards below up and down. The full talk content now lives on a per-keynote blog post (see Decision 6); the card carries only a clamped excerpt plus a "Read full keynote →" link to that post.

*Responsiveness.*
- `≥ md (768px)`: two-column grid inside the card, `grid-cols-[minmax(220px,28%)_1fr] gap-8`. Vertical divider visible.
- `< md`: single column, speaker pane on top, horizontal accent line replaces the vertical divider, avatar shrinks, icon row stays single-line via `flex-wrap`.
- The section uses `max-w-5xl mx-auto` (a touch wider than before) so the two-pane layout doesn't squeeze on 1280–1440 viewports.

*Optional-field gracefulness.* All sub-blocks remain conditional. A 2025 entry with only `name`/`affil`/`topic` collapses to: speaker pane (avatar + name + affiliation, no icons, no bio toggle) and keynote pane (topic tag, no title, no abstract, no number chip). The card still looks intentional.

*Files touched.*
- `Keynotes/KeynoteCard.vue` — full rewrite: two-pane grid, avatar, branded icon row, disclosure-driven abstract & bio, accent rail.
- `Keynotes/Index.vue` — minor: widen container to `max-w-5xl`, tighten vertical rhythm (`space-y-6`), keep the centered "Programme / Keynotes" header.
- A small helper `app/utils/linkIcons.ts` exports `iconForUrl(href)` returning `{ icon: Component, label: string }` so the same mapping can be reused later (committee profiles, sponsor links).
- No schema, content, or query changes — purely presentational.

*Alternatives considered.*
- Modal for the abstract. Rejected — pulls the reader out of context and adds focus-trap/escape-handler complexity for negligible gain when each keynote is on screen anyway.
- Carousel of cards. Rejected — hides keynotes behind interaction, which the user explicitly does not want ("keynotes 是整个页面至关重要的一部分").
- Photo URLs on speakers. Out of scope — the schema doesn't carry photo URLs yet. The initial-tile avatar is the placeholder; switching to real photos is a one-line change when a `photo` field is added later.

**Decision 6: Full keynote details live on per-keynote blog posts; the workshop card carries only a clamped excerpt + "Read full keynote" link.**
- For every 2026 keynote, the repo ships a Nuxt Content blog post at `content/blog/keynote-2026-<slug>.mdc` where `<slug>` is the speaker's surname (ASCII-folded, lowercased). For 2026: `keynote-2026-kozerke.mdc` and `keynote-2026-jirsa.mdc`.
- The blog post's frontmatter follows the existing `blog` collection schema: `author` (speaker's full name), `title` (talk title, or speaker name when `talkTitle === "tbc"`), `date` (workshop year as a string, since exact date isn't carried in the schema). The body contains the full abstract, the speaker bio, and a "Links" section.
- The card derives the slug client-side from the speaker name (same algorithm as the filenames). The "Read full keynote" link points at `/blog/keynote-<year>-<slug>`. `<year>` comes from `data.keynotes.year` rather than the route param so it stays internally consistent if the JSON's year differs from the URL year (defensive).
- The card renders the "Read full keynote" link only when there is content worth linking to — concretely, when the keynote has a `talkAbstract` (other than the literal `"tbc"`) or a `bio`. 2025 entries that only carry `name`/`affil`/`topic` won't surface the link at all, so we don't dangle dead routes.
- The card's abstract block becomes a single `line-clamp-4` excerpt; no in-card expansion. Bio is **not** rendered on the card at all (it's a blog-only concern now).
- Rationale: blog posts already have URL anchors, layout, syndication, and the ANNOUNCEMENT navigation — using them for long-form content is cheap and keeps the workshop page glanceable. It also kills the page-reflow jitter caused by the previous expand/collapse design.

**Decision 7: Speaker website link is exposed only via the speaker's name; it is not duplicated in the icon row.**
- `iconForUrl` is still the single source of truth for hostname → Lucide mapping; the card-side composition just doesn't push `keynote.website` into the icon row anymore. The row builds purely from `keynote.links`.
- Rationale: when both the linked name and an icon point to the same URL, users second-guess which to click. Names link to homepages; icons cluster the *additional* surfaces (LinkedIn, PubMed, lab, etc.).
- If a keynote's `links` happens to also include the `website` URL, we still de-duplicate at composition time so the same URL never renders twice on one card.

**Decision 5: Homepage Workshop Details stat reads from the new `keynotes` collection.**
- The stat in `app/pages/components/Hero.vue` currently checks `activeEdition.keynoteSpeakers` (a legacy schema array that is undefined in 2026's overview JSON) and renders the array itself instead of its length. The fallback `<Construction />` therefore shows even when keynotes are configured.
- Fix: switch the source of truth to `activeEdition.keynotes?.keynotes?.length`. `getWorkshopDetail()` already attaches the keynotes collection, so the Hero component sees the same data the workshop page does without any new fetch.
- The `keynoteSpeakers` schema field stays on `WorkshopSchema` (optional, untouched) — no migration required for existing content. The "Oral Sessions" and "Poster Demo" stat slots are out of scope for this change.

**Decision 5: Use `"tbc"` literal strings for Jirsa's missing talk title and abstract.**
- Matches the source doc verbatim. The schema does not need to special-case this — they are just strings.

## Risks / Trade-offs

- **Risk:** Future contributors adding a 2027 keynote file might forget to update `getWorkshopDetail`. → **Mitigation:** This change establishes the pattern; the query is generic over `year`, so no per-year code is needed.
- **Risk:** Adding optional fields to `KeynoteSchema` could mask missing data (e.g., someone forgets `affil`). → **Mitigation:** `name`, `affil`, `topic` remain required, matching the current contract.
- **Trade-off:** Storing the full abstract/bio in JSON but not rendering them in this change leaves "dead" data on disk. → **Accepted:** it costs ~3KB and removes a second migration when the detail view lands.
- **Risk (resolved):** The page template previously co-mingled the sponsors invitation and the keynotes list inside one card under a "Call for Sponsors" heading. → **Resolved by Decision 4** — keynotes now live in their own section and the sponsors card returns to a single, stable purpose.
