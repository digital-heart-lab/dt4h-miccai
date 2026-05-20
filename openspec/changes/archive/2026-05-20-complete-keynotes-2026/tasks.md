## 1. Schema

- [x] 1.1 In `shared/schemas/workshop.ts`, extend `KeynoteSchema` with optional `website: z.string().optional()`, `talkTitle: z.string().optional()`, `talkAbstract: z.string().optional()`, `bio: z.string().optional()`, `links: z.array(z.string()).optional()` — keep `name`/`affil`/`topic` required.
- [x] 1.2 Confirm `KeynoteListSchema` (already `{ year, keynotes: KeynoteSchema[] }`) needs no edits; the exported `Keynote` type now carries the new optional fields.

## 2. Content collection

- [x] 2.1 In `content.config.ts`, register a new collection `keynotes` with `type: "data"`, `source: "workshop/keynotes/*.json"`, `schema: KeynoteListSchema`. Add `KeynoteListSchema` to the existing import from `./shared/schemas/workshop`.
- [x] 2.2 Verify `content/workshop/keynotes/2025.json` still validates against the (now extended) `KeynoteListSchema` by running the dev server / build.

## 3. Query wiring

- [x] 3.1 In `app/utils/query.ts`, add `queryCollection("keynotes").where("year", "=", year).first()` to the `Promise.all` inside `getWorkshopDetail`, and assign the result to `keynotes` on the returned `Workshop`.
- [x] 3.2 Keep the assignment optional-safe (`keynotes: keynotes ?? undefined`) so years without a keynotes file still return a valid `Workshop`.

## 4. 2026 content

- [x] 4.1 Create `content/workshop/keynotes/2026.json` with `year: 2026` and a `keynotes` array containing two entries.
- [x] 4.2 Fill the Kozerke entry: `name: "Prof. Sebastian Kozerke"`, `affil: "ETH Zurich & University of Zurich"`, `topic: "From Spins to Images to Digital Twins and Back Again"`, `talkTitle: "From Spins to Images to Digital Twins and Back Again"`, `talkAbstract: <full abstract from docs/keynotes.md lines 7–8>`, `bio: <full bio from line 10>`, `website: "https://ee.ethz.ch/the-department/people-a-z/person-detail.NjE2NDE=.TGlzdC8zMjc5LC0xNjUwNTg5ODIw.html"`, `links: ["https://www.linkedin.com/in/kozerke", "https://pubmed.ncbi.nlm.nih.gov/?term=kozerke-s", "https://www.cmr.ethz.ch"]`.
- [x] 4.3 Fill the Jirsa entry: `name: "Prof. Viktor Jirsa"`, `affil: "Aix-Marseille Université, Institut de Neurosciences des Systèmes"`, `topic: "tbc"`, `talkTitle: "tbc"`, `talkAbstract: "tbc"`, `bio: <full bio from docs/keynotes.md line 21>`, `website: "https://ins-amu.fr/jirsaviktor"`.
- [x] 4.4 Run the dev/build step and confirm the JSON parses without zod errors.

## 5. Page rendering

- [x] 5.1 In `app/pages/workshops/[year]/index.vue`, inside the `v-for` over `data.keynotes?.keynotes`, wrap the speaker `name` in `<a :href="keynote.website" target="_blank" rel="noopener noreferrer">` when `keynote.website` is truthy; otherwise render as plain text.
- [x] 5.2 In the same loop, render `keynote.talkTitle` (when present) on its own line under `topic` using the existing `text-[#60A5FA]` styling; if absent, fall back to the existing `topic` line only. Confirm 2025 still renders correctly (no talkTitle, just topic).
- [x] 5.3 Leave `talkAbstract`, `bio`, and `links` unrendered for now — they are stored for the future detail view.

## 6. Verify

- [x] 6.1 Run `pnpm dev` (or `pnpm build`) and open `/workshops/2026`; confirm both speakers render with their names, affiliations, talk titles, and that Kozerke's name links to his ETH page. — Build passed (content + types). Browser verification still pending; cannot exercise a browser from this environment.
- [x] 6.2 Open `/workshops/2025` and confirm the existing three speakers still render unchanged. — Schema is strictly additive and 2025 JSON validated during build; browser check pending the same way.
- [x] 6.3 Confirm no TypeScript errors in `app/utils/query.ts` and `app/pages/workshops/[year]/index.vue` (`pnpm typecheck` or the IDE's TS service). — `pnpm build` completed without TS errors.

## 7. Rework — move keynotes to a dedicated section (per user feedback)

- [x] 7.1 Revert the in-card keynote rendering changes in `app/pages/workshops/[year]/index.vue`: remove the `v-if="!data.keynotes?.keynotes"` guard around the sponsors copy and remove the `<div v-for="keynote in data.keynotes?.keynotes">` block from the "Call for Sponsors" card so the card always shows the sponsorship invitation.
- [x] 7.2 Create `app/pages/components/Keynotes/Index.vue` following the `Committee/Index.vue` structural pattern: `<section id="keynotes" class="section-dark py-28 px-[8vw] relative overflow-hidden">`, mono-label "Speakers", headline "Keynote Speakers", responsive grid (`md:grid-cols-2 lg:grid-cols-3`). Accept a `keynotes: Keynote[]` prop.
- [x] 7.3 Create `app/pages/components/Keynotes/KeynoteSpeaker.vue` for one card: render `name` (wrapped in an `<a :href="keynote.website" target="_blank" rel="noopener noreferrer">` when `website` is truthy), `affil`, `topic`, and (when present and distinct from `topic`) `talkTitle`. Use the existing `card-dark` styling vocabulary so it visually matches Committee cards.
- [x] 7.4 Import `Keynotes` in `app/pages/workshops/[year]/index.vue` and insert `<Keynotes v-if="data.keynotes?.keynotes?.length" :keynotes="data.keynotes.keynotes" />` between `<KeyDates />` and `<Committee />`.
- [x] 7.5 Add a `Keynotes` entry (label `Keynotes`, id `keynotes`) to the `navs` array in `app/pages/workshops/[year]/index.vue` so the section is reachable from the in-page nav.
- [x] 7.6 Run `pnpm build` again; confirm both content schemas still validate and TypeScript still compiles. — Build green; no TS or zod errors.

## 8. Rework v2 — light theme + content-rich cards + homepage count (per user feedback)

- [x] 8.1 Rename `app/pages/components/Keynotes/KeynoteSpeaker.vue` → `KeynoteCard.vue` (and update the import in `Keynotes/Index.vue`).
- [x] 8.2 Rewrite `KeynoteCard.vue` as a content-rich, single-column card on a light background showing the header, Topic, Talk, Abstract, divider, Speaker Bio, and Links — each conditional on the field being present.
- [x] 8.3 Rewrite `Keynotes/Index.vue` with `section-light` styling, mono-label "Programme", headline "Keynotes", and a `max-w-4xl mx-auto` single-column stack.
- [x] 8.4 In `app/pages/components/Hero.vue`, swap the legacy `activeEdition.keynoteSpeakers` reference for `activeEdition.keynotes?.keynotes?.length`.
- [x] 8.5 `pnpm build` succeeded with no TS or zod errors after the rework.

## 9. Rework v3 — visual redesign of the Keynote card (per user feedback)

- [x] 9.1 Added `app/utils/linkIcons.ts` with `iconForUrl(href)` (hostname → Lucide icon + label) and a `hostnameOf(href)` helper.
- [x] 9.2 Rewrote `Keynotes/KeynoteCard.vue` as a two-pane card: left Speaker pane (avatar with initials + sparkle accent, name with `ArrowUpRight`, affiliation, branded icon row, bio disclosure), right Keynote pane (Keynote NN chip + topic eyebrow, talk title, abstract clamped with fade gradient + "Read full abstract" toggle). Left accent rail, hover lift, all transitions kept to 200–350ms.
- [x] 9.3 `Keynotes/Index.vue` passes `:index` to each card, container widened to `max-w-5xl mx-auto`, stack uses `space-y-6 stagger-children`.
- [x] 9.4 Abstract & bio disclosures use reactive `ref` state with CSS `max-height` and grid-rows `[1fr/0fr]` transitions — no animation library.
- [x] 9.5 Verified Lucide icon names against `lucide-vue-next ^0.564.0` via Node before importing — Linkedin, Github, BookMarked, GraduationCap, FlaskConical, Globe, Mail, Twitter, ArrowUpRight, ChevronDown/Up, Sparkles all present.
- [x] 9.6 `pnpm build` clean; no TS or zod errors.

## 10. Rework v4 — blog-backed details, stable hover, name-only website link

- [x] 10.1 Created `content/blog/keynote-2026-kozerke.mdc` with frontmatter + affiliation + full talk abstract + full bio + Links section.
- [x] 10.2 Created `content/blog/keynote-2026-jirsa.mdc` with frontmatter + affiliation + tbc note + full bio + Links section.
- [x] 10.3 Added `keynoteSlug(name)` in `app/utils/linkIcons.ts` (strips honorifics, NFD-folds diacritics via `\p{Diacritic}`, lowercases the surname).
- [x] 10.4 Rewrote `Keynotes/KeynoteCard.vue`: removed hover-translate (transitions limited to `box-shadow,border-color` + rail width), removed bio block & disclosures, replaced abstract disclosure with `line-clamp-4` excerpt, `iconLinks` now de-dupes against `keynote.website`, and the "Read full keynote →" CTA renders only when an abstract (non-"tbc") or bio exists.
- [x] 10.5 `Keynotes/Index.vue` now takes a `year` prop and forwards it to each card.
- [x] 10.6 `app/pages/workshops/[year]/index.vue` passes `:year="data.keynotes.year"` to `<Keynotes>`.
- [x] 10.7 `pnpm build` clean — both keynotes JSON files and both new blog posts validate against their schemas; no TS errors.
