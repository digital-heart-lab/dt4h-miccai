## MODIFIED Requirements

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
