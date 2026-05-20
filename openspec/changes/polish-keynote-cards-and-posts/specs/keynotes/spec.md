## MODIFIED Requirements

### Requirement: Dedicated Keynotes section on the workshop page

The workshop year page SHALL render keynotes inside their own full-width section titled **"Keynotes"**, positioned between the Key Dates section and the Organizer (Committee) section, and only when `data.keynotes?.keynotes` is a non-empty array. The section SHALL be implemented as a reusable component (`app/pages/components/Keynotes/Index.vue`) and SHALL use the project's **light** section styling (`section-light`, dark text on a white background) so it alternates visually with the dark Key Dates and Committee sections that flank it. The section SHALL anchor at `id="keynotes"` and SHALL be treated as a top-tier section of the page. The right-hand "Call for Sponsors" card SHALL no longer render keynotes; it SHALL always show its sponsorship invitation, regardless of whether keynotes are attached.

Each keynote card SHALL act as a focused summary, not a full disclosure surface. The card SHALL display: required `name`, `affil`, and `topic`; optional `talkTitle` (prominently) and a short `talkAbstract` *excerpt* (truncated by line-clamp, no expand-in-place behavior); the speaker's branded social/research links via `links`; and a **"Read more"** link pointing to the per-keynote blog post. The card SHALL NOT render the speaker `bio`, the full `talkAbstract` paragraph, nor any expand/collapse control — the full content lives on the blog post linked from the card.

The card's speaker pane SHALL render the speaker's portrait when `avatar` is set, using the existing gradient avatar tile as a backdrop (so the photo inherits the tile's rounded-square shape and `object-cover` crop). When `avatar` is unset, the existing initials-on-gradient fallback SHALL be used instead. The avatar tile SHALL NOT carry a decorative corner badge (e.g., the previously-rendered `Sparkles` icon), and SHALL NOT apply any rotate or scale transform on card hover; only the card-level non-translational hover affordances (border, shadow, accent rail) carry the hover state.

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
- **AND** the card includes a "Read more" link that navigates to the corresponding per-keynote blog post

#### Scenario: Avatar photo is rendered when provided
- **WHEN** a keynote entry has an `avatar` value pointing at a portrait image
- **THEN** the speaker pane's avatar tile renders an `<img>` of that portrait with `object-cover` filling the rounded-square tile
- **AND** no decorative corner badge (e.g., a `Sparkles` icon) is rendered on or around the tile
- **AND** the speaker's initials are not rendered on top of the photo

#### Scenario: Initials fallback when no avatar
- **WHEN** a keynote entry has no `avatar` value
- **THEN** the speaker pane's avatar tile renders the speaker's two-letter initials over the gradient background, exactly as before this change

#### Scenario: Avatar tile is static on hover
- **WHEN** a pointer hovers the keynote card
- **THEN** the avatar tile's bounding box and rotation are unchanged compared to its resting state
- **AND** no `transform: rotate(…)` or `transform: scale(…)` is applied to the tile

#### Scenario: Section is omitted when no keynotes
- **WHEN** the workshop page loads for a year with no keynotes file (or an empty `keynotes` array)
- **THEN** no `#keynotes` section is rendered
- **AND** the page layout flows directly from Key Dates to Organizer

#### Scenario: Sponsors card is unaffected by keynotes presence
- **WHEN** the workshop page loads with or without keynotes
- **THEN** the right-hand "Call for Sponsors" card shows the same sponsorship invitation and contact link in both cases

### Requirement: Per-keynote blog posts host the full content

For every keynote in `content/workshop/keynotes/<year>.json` that has a `talkAbstract` or `bio` worth surfacing, the repository SHALL include a corresponding Nuxt Content blog post at `content/blog/keynote-<year>-<slug>.mdc`. The blog post SHALL include frontmatter fields `title` (phrased as an *announcement* — e.g. `"Announcing Keynote: <Speaker Name> at DT4H <year>"` — rather than the bare talk title), `author` (the workshop's official organizers byline, e.g. `"DT4H <year> Organizers"`, NOT the speaker's own name), and `date` (a string date such as the workshop year). The keynote card on the workshop page SHALL link to this blog post via the slug-based path (e.g., `/blog/keynote-2026-kozerke`).

The blog body SHALL read as a self-contained announcement article rather than a labelled list of JSON fields. Specifically, the body SHALL open with an editorial lead paragraph (one or two sentences) introducing the speaker as a confirmed keynote for the edition, then narratively present the talk (with the abstract paragraph quoted in full where available), then the speaker's background (built from the bio), and close with a "Learn more about <Speaker>" references block listing the website and `links` URLs. The body SHALL NOT use raw section headings that mirror JSON keys (e.g. `## Abstract`, `## Speaker Bio`, `## Links` written as bare data-field labels).

#### Scenario: Posts use announcement-style frontmatter
- **WHEN** `content/blog/keynote-<year>-<slug>.mdc` is loaded
- **THEN** the `title` frontmatter reads as a workshop announcement (e.g. starts with `"Announcing Keynote:"` or names the workshop edition), not just the bare talk title
- **AND** the `author` frontmatter is `"DT4H <year> Organizers"` (or another official organizers byline) and is not the speaker's own name

#### Scenario: Posts read as narrative announcements
- **WHEN** a user reads a keynote post
- **THEN** the post opens with one or two editorial sentences introducing the speaker as a confirmed keynote, before any quoted abstract or bio content
- **AND** the talk and speaker background are presented as connected prose rather than as bare `## Abstract` / `## Speaker Bio` / `## Links` data dumps
- **AND** the post closes with a "Learn more" references block listing the speaker's external links

#### Scenario: 2026 keynote posts exist and conform
- **WHEN** the repo is checked out
- **THEN** `content/blog/keynote-2026-kozerke.mdc` and `content/blog/keynote-2026-jirsa.mdc` exist
- **AND** each file passes the blog collection's frontmatter schema (`date`, `author`)
- **AND** each `author` equals `"DT4H 2026 Organizers"`

#### Scenario: Card links to the blog post
- **WHEN** the user clicks "Read more" on a card
- **THEN** the route navigates to `/blog/keynote-<year>-<slug>` matching the speaker's surname slug (lower-case, ASCII-folded)
- **AND** the blog page renders the announcement article
