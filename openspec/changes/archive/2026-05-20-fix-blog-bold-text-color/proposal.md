## Why

The blog post page (`/blog/<slug>`) renders markdown inside a dark layout — dark hero, dark body via `github-markdown-dark.css`. The content wrapper currently combines `markdown-body` with Tailwind Typography's `prose lg:prose-xl`, and Tailwind Typography injects `:where(strong):not(...) { color: var(--tw-prose-bold); }` where `--tw-prose-bold` defaults to a near-black ink. Bold spans (`**…**`) therefore render as dark gray on a dark background and are effectively invisible. This is regressing the new per-keynote blog posts (Kozerke, Jirsa) where the affiliation, headings, and emphasis rely on bold.

## What Changes

- Switch the blog content wrapper in `app/pages/blog/[...slug].vue` from `prose lg:prose-xl` to `prose prose-invert lg:prose-xl` so Tailwind Typography uses its dark-background palette (`--tw-prose-invert-*` values), which sets bold text to the light foreground.
- No new dependencies, no schema changes, no content changes.

## Capabilities

### New Capabilities
- `blog-rendering`: Defines how markdown content is presented on the blog post page, including readable contrast on the dark theme.

### Modified Capabilities
<!-- None: no existing spec covers this area. -->

## Impact

- Code: a single class change on `app/pages/blog/[...slug].vue:43`.
- Visual: every `<strong>` (and by extension every Tailwind Typography color token) on `/blog/*` shifts from the light-mode palette to the dark-mode palette. Affects all blog posts, not just keynote posts.
- No API/route changes, no breaking changes. Reversible by removing `prose-invert`.
