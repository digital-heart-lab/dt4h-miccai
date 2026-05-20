# keynotes Specification

## Purpose

Defines the schema, content collection, page integration, and per-year content for workshop keynote speakers. Keynotes appear as a dedicated section on the workshop year page (with focused-summary cards), are surfaced as a count on the homepage Workshop Details card, and have their full content (abstract, bio, links) hosted on per-speaker blog posts linked from each card.

## Requirements

### Requirement: Keynote data shape

The system SHALL define a `Keynote` record with the required fields `name`, `affil`, and `topic` (all non-empty strings) and the optional fields `website`, `talkTitle`, `talkAbstract`, `bio`, `links` (an array of URL strings), and `avatar` (a path or URL to a speaker portrait image). Keynotes for a given workshop year SHALL be grouped into a `KeynoteList` record carrying that `year: number` and a non-empty `keynotes: Keynote[]` array.

#### Scenario: Minimal keynote validates
- **WHEN** a keynote record provides only `name`, `affil`, and `topic`
- **THEN** the schema accepts it and the record is queryable via the keynotes collection

#### Scenario: Rich keynote validates
- **WHEN** a keynote record additionally provides `website`, `talkTitle`, `talkAbstract`, `bio`, `links`, and `avatar`
- **THEN** the schema accepts it and exposes every optional field on the resulting `Keynote` value

#### Scenario: Missing required field rejected
- **WHEN** a keynote record omits any of `name`, `affil`, or `topic`
- **THEN** schema validation fails at content-build time and the build reports the offending field

### Requirement: Keynotes content collection

The system SHALL register a Nuxt Content collection named `keynotes` sourced from `content/workshop/keynotes/*.json`, validated by the `KeynoteList` schema, so that each workshop year's keynotes can live in its own JSON file alongside other workshop sub-resources.

#### Scenario: Year file is discovered
- **WHEN** a file `content/workshop/keynotes/<year>.json` exists with valid contents
- **THEN** `queryCollection("keynotes").where("year", "=", <year>).first()` returns the parsed `KeynoteList` for that year

#### Scenario: Year file is absent
- **WHEN** no file exists for the requested year
- **THEN** the query resolves to a falsy value (no error is thrown)

### Requirement: Keynotes attached to workshop detail

The system SHALL attach the matching `KeynoteList` to the object returned by `getWorkshopDetail(year)` under the key `keynotes`, fetched in parallel with the workshop's other sub-resources.

#### Scenario: Keynotes exist for the year
- **WHEN** `getWorkshopDetail(2026)` runs and `content/workshop/keynotes/2026.json` is present
- **THEN** the returned `Workshop` has `keynotes.keynotes` populated with every speaker from that file

#### Scenario: Keynotes missing for the year
- **WHEN** `getWorkshopDetail(<year>)` runs and no keynotes file exists for that year
- **THEN** the returned `Workshop.keynotes` is undefined and the page does not throw

### Requirement: Dedicated Keynotes section on the workshop page

The workshop year page SHALL render keynotes inside their own full-width section titled **"Keynotes"**, positioned between the Key Dates section and the Organizer (Committee) section, and only when `data.keynotes?.keynotes` is a non-empty array. The section SHALL be implemented as a reusable component (`app/pages/components/Keynotes/Index.vue`) and SHALL use the project's **light** section styling (`section-light`, dark text on a white background) so it alternates visually with the dark Key Dates and Committee sections that flank it. The section SHALL anchor at `id="keynotes"` and SHALL be treated as a top-tier section of the page. The right-hand "Call for Sponsors" card SHALL no longer render keynotes; it SHALL always show its sponsorship invitation, regardless of whether keynotes are attached.

Each keynote card SHALL act as a focused summary, not a full disclosure surface. The card SHALL display: required `name`, `affil`, and `topic`; optional `talkTitle` (prominently) and a short `talkAbstract` *excerpt* (truncated by line-clamp, no expand-in-place behavior); the speaker's branded social/research links via `links`; and a "Read full keynote" link pointing to the per-keynote blog post. The card SHALL NOT render the speaker `bio`, the full `talkAbstract` paragraph, nor any expand/collapse control — the full content lives on the blog post linked from the card.

The card's speaker pane SHALL render the speaker's portrait when `avatar` is set, using the existing gradient avatar tile as a backdrop (so the photo inherits the tile's rounded-square shape, `object-cover` crop, and the existing `Sparkles` corner accent). When `avatar` is unset, the existing initials-on-gradient fallback SHALL be used instead.

#### Scenario: Section appears with keynotes and is light-themed
- **WHEN** the workshop page loads for a year that has a keynotes file
- **THEN** a `<section id="keynotes">` is rendered between `#timeline` (Key Dates) and `#committee` (Organizer)
- **AND** the section uses the `section-light` class so its background is white and its text is dark
- **AND** the section headline reads "Keynotes"

#### Scenario: Each card shows a focused summary
- **WHEN** a keynote entry has `talkTitle`, `talkAbstract`, `bio`, `website`, and `links` populated
- **THEN** the rendered card shows the speaker name, the affiliation, the topic, the talk title, a short truncated excerpt of the `talkAbstract` (CSS line-clamp), and a row of branded icon links derived from `links`
- **AND** the card does NOT render the `bio` field anywhere
- **AND** the card does NOT render any expand/collapse control for the abstract or the bio
- **AND** the card includes a "Read full keynote" link that navigates to the corresponding per-keynote blog post

#### Scenario: Avatar photo is rendered when provided
- **WHEN** a keynote entry has an `avatar` value pointing at a portrait image
- **THEN** the speaker pane's avatar tile renders an `<img>` of that portrait with `object-cover` filling the rounded-square tile
- **AND** the gradient tile background and the corner `Sparkles` accent remain visible around/over the photo
- **AND** the speaker's initials are not rendered on top of the photo

#### Scenario: Initials fallback when no avatar
- **WHEN** a keynote entry has no `avatar` value
- **THEN** the speaker pane's avatar tile renders the speaker's two-letter initials over the gradient background, exactly as before this change

#### Scenario: Section is omitted when no keynotes
- **WHEN** the workshop page loads for a year with no keynotes file (or an empty `keynotes` array)
- **THEN** no `#keynotes` section is rendered
- **AND** the page layout flows directly from Key Dates to Organizer

#### Scenario: Sponsors card is unaffected by keynotes presence
- **WHEN** the workshop page loads with or without keynotes
- **THEN** the right-hand "Call for Sponsors" card shows the same sponsorship invitation and contact link in both cases

### Requirement: Speaker website link lives on the name only

When a keynote has a `website` URL, that URL SHALL be exposed as the link wrapping the speaker's name on the card, and SHALL NOT additionally appear in the branded-icon row underneath the speaker pane. This avoids the same destination appearing twice on a single card.

#### Scenario: Website is set
- **WHEN** a keynote has both `website` and a non-empty `links` array
- **THEN** clicking the speaker's name opens `website` in a new tab
- **AND** the branded-icon row contains only entries from `links`, with no duplicate icon pointing at `website`

#### Scenario: Website is unset
- **WHEN** a keynote has no `website`
- **THEN** the speaker name renders as plain text (not a link)
- **AND** the icon row continues to render all `links` entries

### Requirement: Card layout is stable on pointer interactions

The keynote card SHALL NOT change its bounding-box position when hovered, focused, or interacted with by a pointer. In particular, no translate/scale transform that shifts the card's hit area SHALL be applied on hover. Subtle non-translational hover affordances (e.g., border-color, shadow, accent-rail width) MAY still be used.

#### Scenario: Hover does not move the card
- **WHEN** a pointer hovers over the keynote card
- **THEN** the card's `getBoundingClientRect()` top/left values are unchanged compared to its resting state
- **AND** clicking any link on the card hits the same element it visually appears under

### Requirement: Per-keynote blog posts host the full content

For every keynote in `content/workshop/keynotes/<year>.json` that has a `talkAbstract` or `bio` worth surfacing, the repository SHALL include a corresponding Nuxt Content blog post at `content/blog/keynote-<year>-<slug>.mdc`. The blog post SHALL include frontmatter fields `title` (the talk title or speaker name when the talk title is "tbc"), `author` (the speaker's full name), and `date` (a string date such as the workshop year), and SHALL include in its markdown body: the speaker's affiliation, the full talk abstract (when not "tbc"), the speaker bio (when present), and the speaker's website / research links. The keynote card on the workshop page SHALL link to this blog post via the slug-based path (e.g., `/blog/keynote-2026-kozerke`).

#### Scenario: 2026 keynote posts exist
- **WHEN** the repo is checked out
- **THEN** `content/blog/keynote-2026-kozerke.mdc` and `content/blog/keynote-2026-jirsa.mdc` exist
- **AND** each file passes the blog collection's frontmatter schema (`date`, `author`)

#### Scenario: Card links to the blog post
- **WHEN** the user clicks "Read full keynote" on a card
- **THEN** the route navigates to `/blog/keynote-<year>-<slug>` matching the speaker's surname slug (lower-case, ASCII-folded)
- **AND** the blog page renders the full abstract and bio

### Requirement: Homepage Workshop Details shows keynote count

The homepage hero card ("Workshop Details") SHALL display, in its "Keynotes" stat slot, the count of keynote entries attached to the active edition (i.e. the length of `activeEdition.keynotes.keynotes`). The pre-existing fallback icon (`<Construction />`) SHALL only render when no keynotes are loaded for the active edition. The "Oral Sessions" and "Poster Demo" slots SHALL be unaffected by this change.

#### Scenario: Active edition has keynotes
- **WHEN** the homepage renders and `activeEdition.keynotes.keynotes` is a non-empty array
- **THEN** the Keynotes stat slot shows that array's length as a number

#### Scenario: Active edition has no keynotes yet
- **WHEN** the homepage renders and `activeEdition.keynotes` is missing or has an empty `keynotes` array
- **THEN** the Keynotes stat slot shows the existing `<Construction />` placeholder icon

### Requirement: 2026 keynote content provisioned

The repository SHALL include `content/workshop/keynotes/2026.json` containing entries for the confirmed 2026 keynote speakers (Sebastian Kozerke and Viktor Jirsa) with the fields available from `docs/keynotes.md`. Fields that are still "to be confirmed" SHALL be stored as the literal string `"tbc"` so they round-trip without schema changes.

#### Scenario: Kozerke entry is complete
- **WHEN** `content/workshop/keynotes/2026.json` is loaded
- **THEN** the entry for Sebastian Kozerke includes `name`, `affil` (ETH Zurich / University of Zurich), `topic` (his talk title), `website`, `talkTitle`, `talkAbstract`, `bio`, and `links`

#### Scenario: Jirsa entry uses tbc placeholders
- **WHEN** `content/workshop/keynotes/2026.json` is loaded
- **THEN** the entry for Viktor Jirsa includes `name`, `affil`, `website`, and `bio`
- **AND** `talkTitle` and `talkAbstract` are the literal string `"tbc"`
