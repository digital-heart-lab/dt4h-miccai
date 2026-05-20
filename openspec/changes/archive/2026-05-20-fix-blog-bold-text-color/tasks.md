## 1. Apply the fix

- [x] 1.1 `app/pages/blog/[...slug].vue` content wrapper now uses `markdown-body max-w-[900px] prose prose-invert lg:prose-xl`.

## 2. Shared date helper

- [x] 2.1 `formatBlogDate(value, locale = 'en-US')` added to `app/utils/date.ts`; returns `''` for empty/invalid input.

## 3. Blog detail page (`app/pages/blog/[...slug].vue`)

- [x] 3.1 Added "Back to announcements" link (`ArrowLeft`) above the eyebrow.
- [x] 3.2 Replaced raw `{{ page.date }}` with `<time :datetime>{{ formatBlogDate(page.date) }}</time>`.
- [x] 3.3 Added `readingMinutes` computed via recursive walk of `page.body.children` (skips `code`/`pre`); wrapped in try/catch with fallback to 1 minute; rendered as `<Clock /> N min read`.
- [x] 3.4 Hero polished: mono-label "Announcement" eyebrow, decorative `#1E6EF1/0.05` and `#60A5FA/0.03` blur blobs, vertical-divider separators between metadata items.
- [x] 3.5 `prose-invert` confirmed applied alongside the hero refresh.

## 4. Blog list page (`app/pages/blog/index.vue`)

- [x] 4.1 Query uses `.order('date', 'DESC')`; a defensive computed re-sorts by `date.localeCompare` putting undated posts last.
- [x] 4.2 Stray `console.log` removed.
- [x] 4.3 Whole card wrapped in `<NuxtLink :to="article.path">`; hover affordance limited to `box-shadow,border-color` + accent-rail width — no translate/scale.
- [x] 4.4 Date tile now renders day → short month → year (mono-label, `#60A5FA` / `#6B7280`).
- [x] 4.5 First card (`index === 0`) renders a "Latest" badge anchored top-right with `Sparkles` icon and the accent gradient.
- [x] 4.6 Title uses `line-clamp-2`; description uses `line-clamp-2`; card has `min-h-[10rem]`.
- [x] 4.7 Below the description: a small-text metadata row with `formatBlogDate(article.date)` (with `<time datetime>`) and the author (when present), each prefixed by its Lucide icon.

## 5. Verify

- [x] 5.1 `pnpm build` clean — no TS, CSS, or content-schema errors.
- [ ] 5.2 Manual visual check on `/blog` — defer to user (browser unavailable in this env).
- [ ] 5.3 Manual visual check on `/blog/keynote-2026-kozerke` — defer to user.
- [ ] 5.4 Manual visual check on `/blog/call-for-papers-2026` — defer to user.
