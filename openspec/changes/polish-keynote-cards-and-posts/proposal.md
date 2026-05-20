## Why

Now that the keynote cards and their per-speaker blog posts are wired up, the editorial polish hasn't caught up:

1. The card's CTA reads **"Read full keynote"** — verbose and inconsistent with the matching CTA on the blog list ("Read more"). The card surfaces a summary; the link should sound like a continuation, not a separate genre.
2. The speaker-avatar tile rotates on card hover (`group-hover:rotate-2 group-hover:scale-[1.04]`). With a real portrait now in the tile, the rotation looks animated/cartoonish and distracts from the rest of the card's stable-hover policy.
3. The two keynote blog posts (`keynote-2026-kozerke.mdc`, `keynote-2026-jirsa.mdc`) currently read as a `Affiliation / Abstract / Speaker Bio / Links` dump — they are list-style content with no narrative framing, no editorial voice, and the author field uses the speaker's own name (as if the speaker self-published). That doesn't match the role of these pages: they are **workshop announcements** about the speaker, written by the organizing committee.

## What Changes

- **Card CTA:** change the keynote card's "Read full keynote →" link text to **"Read more"** (keeping the arrow icon and the existing `NuxtLink` target).
- **Avatar hover:** drop the `group-hover:rotate-2 group-hover:scale-[1.04]` transform from `KeynoteCard.vue`'s avatar tile. Keep the rest of the tile chrome (gradient backdrop, `Sparkles` corner badge, photo `<img>`) untouched.
- **Blog post rewrite:** restructure both keynote `.mdc` files into proper announcement articles:
  - **Frontmatter:** rename `author` from the speaker's name to **"DT4H 2026 Organizers"** (or equivalent official byline); update the `title` so it reads as an announcement rather than a talk title (e.g. `"Announcing Keynote: Prof. Sebastian Kozerke at DT4H 2026"`). Keep `date` untouched.
  - **Body:** open with a one- or two-paragraph editorial introduction announcing the speaker, why they were invited, and what attendees can expect. Then weave the existing affiliation + abstract + bio content into a narrative — for Jirsa the talk-title/abstract `"tbc"` placeholder becomes a brief "details to be confirmed" note. Move links into a closing "Learn more about Prof. <Surname>" section so they read as references rather than a bullet list.

## Capabilities

### New Capabilities
<!-- None. -->

### Modified Capabilities
- `keynotes`: the "Dedicated Keynotes section on the workshop page" requirement gets its CTA text updated from "Read full keynote" to "Read more"; the "Per-keynote blog posts host the full content" requirement gets its `author` field guidance updated (organizers, not the speaker) and gains a new clause that the post body reads as an announcement narrative rather than a labelled dump.

## Impact

- Code: `app/pages/components/Keynotes/KeynoteCard.vue` (CTA copy + avatar hover transform removal).
- Content: full rewrite of `content/blog/keynote-2026-kozerke.mdc` and `content/blog/keynote-2026-jirsa.mdc` (frontmatter + body).
- Spec: `openspec/specs/keynotes/spec.md` updates for two requirements.
- No schema, query, or routing changes. Backwards-compatible — slugs/paths preserved so the card → blog link still resolves.
