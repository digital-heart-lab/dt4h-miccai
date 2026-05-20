## 1. KeynoteCard.vue

- [x] 1.1 CTA `<NuxtLink>` now reads **"Read more"** + `ArrowRight`.
- [x] 1.2 Avatar tile no longer carries `group-hover:rotate-2`, `group-hover:scale-[1.04]`, or `transition-transform` — class list reads cleanly.
- [x] 1.3 Sparkles `<div>` removed from the avatar tile; `Sparkles` dropped from the `lucide-vue-next` imports.

## 2. Blog post — Sebastian Kozerke

- [x] 2.1 `content/blog/keynote-2026-kozerke.mdc` rewritten: announcement-style title, `DT4H 2026 Organizers` byline, lead paragraph, "About the talk" with quoted abstract, "About the speaker" with orienting sentence + bio paragraphs, "Learn more about Prof. Kozerke" references block.

## 3. Blog post — Viktor Jirsa

- [x] 3.1 `content/blog/keynote-2026-jirsa.mdc` rewritten: announcement-style title, `DT4H 2026 Organizers` byline, lead paragraph, "About the talk" with a "to be confirmed" note framed by his expected scope, "About the speaker" with orienting sentence + bio paragraphs, "Learn more about Prof. Jirsa" references block.

## 4. Verify

- [x] 4.1 `pnpm build` clean — content schema validates and no TS errors.
- [ ] 4.2 Manual visual check on `/workshops/2026` — defer to user (no browser in this env).
- [ ] 4.3 Manual visual check on `/blog/keynote-2026-kozerke` and `/blog/keynote-2026-jirsa` — defer to user.
