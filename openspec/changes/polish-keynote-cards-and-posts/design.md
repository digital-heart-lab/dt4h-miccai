## Context

The keynote pipeline has three surfaces, each in a slightly mismatched state:

- The **card CTA** speaks in noun-phrase ("Read full keynote"), while the rest of the site's list/detail links use the verb-phrase pattern ("Read more").
- The **avatar tile** carries a hover transform that made sense as a delight micro-interaction when the tile showed initials — with a real portrait it reads as gimmicky and breaks the rest of the card's "no card-level transforms on hover" policy.
- The **blog posts** were generated mechanically from the JSON: the speaker's name became `author`, headings re-labelled JSON fields (`## Abstract`, `## Speaker Bio`, `## Links`). They read as machine output rather than as something the program committee published.

## Goals / Non-Goals

**Goals:**
- Make every keynote-related surface read as if the same editor wrote and approved it.
- Keep the card layout/contract unchanged except for the two specific items in scope.
- Rewrite the two blog posts to read as standalone announcements that a reader landing cold on `/blog/keynote-2026-kozerke` would understand without needing the workshop page for context.

**Non-Goals:**
- Adding new fields to the keynote schema (no `byline`, no `subtitle`).
- Restyling the blog detail template.
- Adding a generic byline component to the blog frontmatter — `author: "DT4H 2026 Organizers"` is just a string and the existing detail page already renders it verbatim.

## Decisions

**Decision 1: Card CTA copy → "Read more" (with the arrow), not "Read full keynote".**
- The keynote card is editorially equivalent to a blog teaser: it shows a clamped excerpt and links to the long-form post. "Read more" is the universal blog-teaser convention and matches the same phrase already used on the blog list cards.
- Alternative considered: "Continue reading". Rejected — slightly more formal but doesn't pair as cleanly with a short single-line CTA next to an arrow icon.

**Decision 2: Strip the avatar tile down — remove both the hover transform AND the decorative corner `Sparkles` badge.**
- Drop `group-hover:rotate-2 group-hover:scale-[1.04]` (and the now-unused `transition-transform`) from the tile. The keynote card's stable-hover policy explicitly forbids transforms that shift click targets at the *card* level; the avatar transform was a deliberate exception because it lived on a non-clickable child. Once that child holds a real portrait, the rotation/scale conflicts with the calm "this is an announcement" framing.
- Drop the `Sparkles` corner badge (`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white ...`). It made sense as a delight micro-accent on the initials placeholder; over a real headshot it reads as a notification badge or a sticker and competes for attention with the speaker's face. The `Sparkles` import is then unused and gets dropped from the SFC imports.
- The tile becomes a pure photo container: gradient backdrop visible at the edges (when the photo doesn't fully cover), `<img>` with `object-cover`, rounded-2xl shape. Done.
- The card's card-level hover affordances (border tint, shadow lift, accent rail width) remain — the card itself still feels alive on hover; we just stop the avatar from spinning AND stop decorating it with a non-functional badge.

**Decision 3: Blog post rewrites — keep frontmatter shape, replace body wholesale, change byline to "DT4H 2026 Organizers".**
- Frontmatter `title` becomes an *announcement* title rather than a *talk* title:
  - Kozerke: `"Announcing Keynote: Prof. Sebastian Kozerke at DT4H 2026"`
  - Jirsa: `"Announcing Keynote: Prof. Viktor Jirsa Joins DT4H 2026"`
- Frontmatter `author` becomes `"DT4H 2026 Organizers"` for both posts — a stable, project-level byline so future edits don't need a different person each time. Existing `call-for-papers-2026.mdc` uses an individual organizer's name (Lei Li) but that file is older; we don't backfill it in this change.
- Body structure (same for both posts, with one variation for Jirsa's `"tbc"` placeholders):
  1. **Lead paragraph** — one or two sentences announcing the speaker is joining the DT4H 2026 keynote programme, naming their affiliation and broad research area. This is the "card excerpt" equivalent on the post itself, so readers landing cold have orientation without scrolling.
  2. **About the talk** — a 1–2 paragraph narrative built from the JSON's `talkAbstract`. We keep the abstract intact as a block but wrap it with a connecting sentence so it doesn't open with bare academic prose. For Jirsa, this section becomes a short "the talk title and abstract will be confirmed closer to the workshop date — check this page for updates" note rather than a fake abstract.
  3. **About the speaker** — built from the JSON's `bio`. We open with a one-line orienting sentence ("Prof. Kozerke brings two decades of research at the intersection of …") and then let the bio paragraphs follow.
  4. **Learn more** — closing block titled "Learn more about Prof. <Surname>" containing the same external link list as before, now framed as references.
- The keynote JSON (`keynotes/2026.json`) is the *data* source of truth; the blog post is *editorial*. They can diverge in tone (the post can paraphrase and bridge between abstract and bio) but not in fact (the same affiliations, the same links, the same abstract content). Where this change paraphrases, we keep the original abstract paragraph verbatim under "About the talk" so reviewers can still find the exact JSON content quoted in the post.

## Risks / Trade-offs

- **Risk:** The rewritten posts duplicate content from the JSON (`affil`, abstract, bio). If the JSON is later edited, the post drifts. → **Mitigation:** acceptable for now — the program committee is the editor of both surfaces and any drift is a copy-edit, not a correctness issue. A later change could template the post from the JSON if the volume of keynotes ever justifies it.
- **Risk:** "DT4H 2026 Organizers" is a year-specific byline; reusing the same posts for a 2027 retrospective would mean re-editing the byline. → **Accepted:** these posts are dated 2026 and live in the 2026 announcement stream forever; the year specificity is correct.
- **Trade-off:** Dropping the avatar hover transform removes a small bit of motion that some users will read as "less alive." → **Accepted:** the rest of the card's hover state (border, shadow, rail) carries enough cue; the cost of the transform conflicting with portrait imagery outweighs the micro-delight.
