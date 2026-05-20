## Context

`app/pages/blog/[...slug].vue` renders Nuxt Content's `<ContentRenderer>` inside:

```html
<div class="markdown-body max-w-[900px] prose lg:prose-xl" style="margin: 0 8vw; background: transparent">
```

Two stylesheets fight for the markdown:

1. **`github-markdown-css/github-markdown-dark.css`** (imported at the top of the same SFC) — provides the `markdown-body` class with a full light-on-dark palette tuned for GitHub's dark mode.
2. **`@tailwindcss/typography`** (registered as `@plugin "@tailwindcss/typography"` in `app/assets/css/main.css`) — provides the `prose` / `prose-lg` / `prose-xl` classes, which inject color rules via custom properties (`--tw-prose-body`, `--tw-prose-headings`, `--tw-prose-bold`, …). Those properties default to dark-mode-unfriendly values.

The bold-text bug is the user-visible symptom of this conflict: `prose` writes `color: var(--tw-prose-bold)` (≈ `#111827`) onto `<strong>`, overriding `markdown-body`'s light bold color.

## Goals / Non-Goals

**Goals:**
- Make bold (`<strong>`) text legible on every existing and future blog post.
- Keep the change minimal — a single class change in one file.
- Stay consistent with the dark blog layout for all Tailwind Typography color tokens, not just bold (otherwise the next color token will regress next month).

**Non-Goals:**
- Restyling the blog template (typography scale, spacing, code blocks, lists, etc.).
- Removing either of the two competing stylesheets.
- Adding a CSS variable override layer in `main.css`.

## Decisions

**Decision 1: Use `prose-invert` rather than dropping `prose` or overriding `--tw-prose-bold` manually.**
- Tailwind Typography ships dark-mode color tokens behind the `prose-invert` modifier (e.g. `--tw-prose-invert-bold`, `--tw-prose-invert-headings`, …). Adding `prose-invert` swaps every token in one go; we don't have to whack each one as it surfaces.
- Alternative — drop `prose` entirely and rely on `markdown-body`: rejected because `prose` is also providing typography rhythm (`max-w-*`, `prose-xl` line-height/spacing) the page relies on; removing it would require us to reproduce that elsewhere.
- Alternative — override `--tw-prose-bold` in `main.css`: rejected because it only fixes the symptom. The next time we use a `<blockquote>` or inline code, the same problem reappears with a different variable.

**Decision 2: Keep the `markdown-body` class alongside `prose-invert`.**
- `markdown-body` styles GitHub-flavored elements that Tailwind Typography doesn't fully cover (e.g., GitHub-style task list bullets, callout boxes). Removing it could regress other posts. Leaving both lets each handle what it handles best; `prose-invert` simply aligns the Tailwind Typography palette to the dark surface that `markdown-body` already assumes.

## Risks / Trade-offs

- **Risk:** A future post relies on light-mode prose styling (e.g., a light hero variant of the blog template). → **Mitigation:** if/when a light blog variant ships, switch the wrapper to be conditional (`:class="[isDark ? 'prose-invert' : '']"`); not needed today because every blog page uses the dark layout.
- **Trade-off:** `prose-invert` changes every Tailwind Typography color, not just bold. That's the intent — but reviewers should confirm body text, headings, links, code blocks, and blockquotes still look correct alongside `markdown-body`. → **Mitigation:** visual smoke check on the two new keynote posts and the existing `call-for-papers-2026` post.

## Decisions (continued — scope expansion)

**Decision 3: Add `formatBlogDate(value)` to `app/utils/date.ts` as the single source of truth for blog date formatting.**
- Signature: `formatBlogDate(value: string | Date | undefined, locale = 'en-US'): string`. Returns `''` when the value is missing or `Number.isNaN(d.getTime())`.
- Implementation: `new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date)` → e.g. `"May 20, 2026"`.
- Lives next to the existing tuple-based `formatDate` so callers can pick the helper that matches the data shape. The two helpers do not interfere — `formatDate` is for the workshop's `[year, month, day]` tuple; `formatBlogDate` is for the blog's ISO-ish `date` string.
- Rationale: both the list and detail pages will call this; centralizing avoids the kind of drift we saw between the old raw-ISO detail page and the day/month tile on the list page.

**Decision 4: Sort the blog list at the query layer via Nuxt Content's `.order('date', 'DESC')`.**
- `app/pages/blog/index.vue` currently does `queryCollection('blog').where('path', 'LIKE', '/blog/%').all()`. We add `.order('date', 'DESC')` to that chain.
- For undated posts, Nuxt Content's order treats `undefined` deterministically (`undefined` sorts to the end with DESC ordering against ISO strings); a follow-up in-memory `Array.prototype.sort` defends against that not being true on this version of `@nuxt/content`.
- Rationale: sorting at the data layer is one line and keeps the component template focused on presentation. The defensive in-memory sort costs ~µs for the post counts we'll ever have here.

**Decision 5: Refactor `/blog` list cards to match the keynote-card hover policy and add a "Latest" badge.**
- Card root remains `card-dark` (already in the stylesheet) — but the previous `transition-all duration-500` on a class that includes `translate-y` (via parent reveal/animation) is replaced with the same shadow + border-color + accent-rail hover used on the keynote card. **No translate on hover.** This matches the policy adopted in the previous change and prevents the same click-target drift.
- The whole card area becomes a `<NuxtLink>` so the entire surface is clickable; the inner "Read more" link becomes a visual cue rather than the only hit target. We keep keyboard focus and `aria-label`-style accessibility implicit via the link wrapper.
- The date tile gets a third line under the existing day + short month: a year label in mono-label type. This is what carries the new "year" reader requirement without restructuring the tile.
- The first card in the (already-sorted-descending) list renders a small "Latest" badge anchored to the top-right of the card; subsequent cards omit it. We index with `v-for="(article, i) in articles"` and gate via `v-if="i === 0"`.
- Title gets `line-clamp-2`; description gets `line-clamp-2`. Minimum card height keeps the column rhythm even when one post has no description.

**Decision 6: Refactor `/blog/<slug>` detail page with a workshop-style hero, a metadata row, and a back link.**
- Hero re-styled to mirror the workshop year page: mono-label "Announcement" eyebrow, gradient accent rule, Space Grotesk title, decorative blob in the upper-right.
- Above the title, a back-link row: `< Back to announcements` using `ArrowLeft` icon → `/blog`. Positioned tightly above the eyebrow so users see it without scrolling.
- Below the title, a metadata row with three items: author (`UserPen`), formatted date (`CalendarDays` + `formatBlogDate(page.date)`), reading time (`Clock` + `<N> min read`).
- Reading time computation: derived in the SFC as a `computed` from `page.body` text. Implementation reads the raw markdown body text by joining `page.body.children` text nodes, splits on `\s+`, takes the length, and applies `Math.max(1, Math.ceil(words / 200))`. If `page.body` is unavailable for any reason, we fall back to estimating from the rendered DOM via `useNuxtApp().hooks` is overkill — instead, fall back to a default of `"1 min read"`.
- The content wrapper applies the `prose-invert` fix from Decision 1 unchanged.

**Decision 7: Reading-time algorithm — body-text-based, with markdown frontmatter and link URLs excluded.**
- We feed the **rendered text content** (not the raw markdown source) into the word count so that markdown syntax characters (`*`, `#`, `>`, `[`, `]`, etc.) don't inflate the count. Practically: walk `page.body.children` recursively, collect `value` strings from text nodes, ignore the children of `pre`/`code` blocks (code is read more slowly anyway and inflating ~200 wpm against code feels wrong).
- 200 words/min is the median English silent-reading rate cited in Cambridge studies; close enough for a "≈" estimate. We never display fractional minutes — `ceil` rounds up so a 50-word post still claims "1 min read", which is honest enough.

## Risks / Trade-offs (additions)

- **Risk:** Nuxt Content's `.order('date', 'DESC')` might not parse ISO date strings as actual dates (it does string comparison). → **Mitigation:** ISO-8601 dates sort lexicographically the same as chronologically, and our authoring convention is `YYYY-MM-DD`, so this works. The defensive in-memory sort is a safety net.
- **Risk:** Recursive walk of `page.body.children` could throw if the shape changes in a future `@nuxt/content` version. → **Mitigation:** wrap in `try/catch` and fall back to `'1 min read'`.
- **Trade-off:** Hiding the raw ISO date everywhere means screen-reader users get the formatted string. Acceptable — the formatted string is also human-readable; we don't need a `<time datetime>` for the small surface area, but the metadata row uses `<time :datetime="page.date">` to preserve machine-readable semantics.
