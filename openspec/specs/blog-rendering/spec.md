# blog-rendering Specification

## Purpose

Defines how the DT4H site renders blog (announcement) content: markdown styling against the dark layout, date formatting, list/detail page structure (metadata, back link, reading time), visual consistency with the rest of the site, list ordering, and list card composition.

## Requirements

### Requirement: Blog markdown content has readable contrast on the dark layout

The blog post page (`app/pages/blog/[...slug].vue`) renders user-authored markdown inside a dark layout. Every text token that Tailwind Typography styles — including but not limited to body text, headings, **bold (`<strong>`)**, links, inline code, blockquotes, and list markers — SHALL render with a foreground color that meets at least a 4.5:1 contrast ratio against the dark background.

#### Scenario: Bold text is legible
- **WHEN** a blog post body contains `**bold span**` markdown
- **THEN** the rendered `<strong>` element's computed text color produces at least a 4.5:1 contrast ratio against the page background
- **AND** the bold span is visually distinguishable as bolder than its surrounding body text

#### Scenario: Other Tailwind Typography color tokens follow the dark palette
- **WHEN** the blog post page renders any element styled by `@tailwindcss/typography` (headings, links, code spans, blockquotes, list markers)
- **THEN** the element uses the Typography plugin's inverted color tokens (`--tw-prose-invert-*`) rather than the default light-mode tokens
- **AND** the element is readable against the dark layout without further overrides

### Requirement: Blog dates render in a reader-friendly, localized format

Every blog `date` frontmatter value displayed in the UI — on the list page (`/blog`) and on the detail page (`/blog/<slug>`) — SHALL be formatted using `Intl.DateTimeFormat` with the site locale (`en-US` by default), producing a long-month string in the form `"<MonthLong> <Day>, <Year>"` (e.g., `"May 20, 2026"`). Raw ISO strings such as `"2026-05-20"` SHALL NOT appear in rendered output. The formatting helper SHALL be a single shared utility (e.g., `formatBlogDate(value)`) so the list and detail pages cannot drift apart.

#### Scenario: Detail page shows the formatted date
- **WHEN** a user opens `/blog/<slug>` for a post whose frontmatter `date` is `"2026-05-20"`
- **THEN** the metadata row displays `"May 20, 2026"` (or the equivalent for the configured locale)
- **AND** the raw ISO string is not visible anywhere on the page

#### Scenario: List page shows the formatted date alongside the date tile
- **WHEN** the blog index renders an article card
- **THEN** the card's compact day/month tile is preserved
- **AND** a secondary line under the tile (or accompanying the title) shows the full localized date (e.g., `"May 20, 2026"`)

#### Scenario: Missing or invalid date is safe
- **WHEN** a post's `date` value is missing or unparseable
- **THEN** the formatting helper returns an empty string
- **AND** the UI omits the date row rather than rendering `"Invalid Date"`

### Requirement: Blog detail page presents article-level metadata and a return path

The blog detail page SHALL render, near the title, a metadata row that contains: the author (with a person icon), the localized publication date (with a calendar icon), and an estimated reading time computed from the article body. The detail page SHALL also expose a "Back to announcements" link (with a back-arrow icon) that routes to `/blog`, positioned so the user does not need to use the browser back button to leave the article.

Reading time SHALL be computed as `max(1, ceil(words / 200))` where `words` is the whitespace-delimited token count of the rendered body's text content, and SHALL be displayed in the form `"<N> min read"`.

#### Scenario: Metadata row shows author, date, and reading time
- **WHEN** a user opens any blog detail page
- **THEN** the metadata row renders three items: author with a person icon, the formatted date with a calendar icon, and the reading time with a clock icon
- **AND** each item is visually distinct and aligned

#### Scenario: Back link is present
- **WHEN** a user is on `/blog/<slug>`
- **THEN** a "Back to announcements" link (or equivalent label) is rendered above the article title
- **AND** clicking it navigates to `/blog`

### Requirement: Blog UI uses the site's visual vocabulary consistently

Both the blog list page and the blog detail page SHALL use the same visual primitives the rest of the site uses (mono-label eyebrow, gradient accent rules, `Space_Grotesk` display type, subtle decorative blobs, dark `section-dark`/`card-dark` styling) so the blog reads as part of the DT4H site rather than a generic markdown surface. Card and CTA hover affordances SHALL be limited to color, border, and shadow changes — no translate/scale that would shift click targets — matching the policy already adopted for keynote cards.

#### Scenario: List cards have stable hover
- **WHEN** a user hovers an article card on `/blog`
- **THEN** the card's bounding-box position is unchanged compared to its resting state
- **AND** the card shows a visible hover affordance via border, shadow, or accent color only

#### Scenario: Visual rhythm matches the site
- **WHEN** a user navigates between `/workshops/2026` and any blog page
- **THEN** the typography (display headings, mono-labels), accent colors (`#1E6EF1`/`#60A5FA`), and dark background tones (`#0B0C0F`/`#13151A`) on the blog pages are consistent with the workshop page

### Requirement: Blog list is sorted newest-first

The blog list page (`/blog`) SHALL display articles in descending order of their `date` frontmatter value, so that the most recently published post appears first and undated or unparseable-date posts (if any) fall to the end of the list. The sort SHALL be stable and SHALL be applied at query time (preferred) or, failing that, in a single in-memory sort before the list is rendered.

#### Scenario: Newest post appears first
- **WHEN** the user opens `/blog` and at least two posts exist with distinct `date` values
- **THEN** the post with the latest `date` is the first card in the list
- **AND** subsequent cards are ordered by `date` descending

#### Scenario: Posts with identical dates are stable
- **WHEN** two posts share the same `date`
- **THEN** their relative order in the rendered list does not change between page loads with the same content set

#### Scenario: Undated posts sort last
- **WHEN** a post is missing its `date` frontmatter or has an unparseable value
- **THEN** it appears after every post that has a valid date

### Requirement: Blog list card layout is balanced and informative

Each card on the blog list page SHALL present, at a minimum: a date tile (day + short month + year row), the article title, an article excerpt or description, a "Read more" affordance, and (when available) the author. The card SHALL have a defined minimum height so a row of cards with varying excerpts renders with consistent vertical rhythm, and the title SHALL be clamped to two lines so very long titles do not break the card layout. A subtle "New" or "Latest" badge MAY appear on the first card.

#### Scenario: Card surfaces the key article facts
- **WHEN** the blog list renders any card
- **THEN** the card shows the day on its date tile, the short month + year label, the article title, an excerpt or description (when present), the author (when present), and a "Read more" link to the article
- **AND** the card is keyboard-focusable and the entire card area routes to the article path

#### Scenario: First card carries a "Latest" badge
- **WHEN** the blog list contains one or more posts
- **THEN** the first (newest) card carries a small "Latest" badge visually anchored to its date tile or header
- **AND** subsequent cards do not carry the badge
