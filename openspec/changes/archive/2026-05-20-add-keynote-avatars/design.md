## Context

The keynote-card visual was designed with a stylized initials tile as a deliberate placeholder until real speaker photos were available. The Committee schema (`shared/schemas/workshop.ts` → `CommitteeMemberSchema` extends `PersonSchema`) has always carried an `avatar` field and `CommitteeMember.vue` already renders it with `<img v-if="member.avatar" :src="member.avatar" class="w-full h-full object-cover">` over the same gradient tile. The keynotes schema diverged because it was hand-rolled rather than extending `PersonSchema`.

The user has now added real photo paths to `content/workshop/keynotes/2026.json`. The matching files exist at `public/images/avatars/Sebastian-Kozerke.jpg` and `public/images/avatars/Round-Jirsa-V.jpg`. So this is a pure plumbing change: surface the data through the schema and consume it in the view.

## Goals / Non-Goals

**Goals:**
- Render speaker photos on the 2026 keynote cards.
- Keep the initials-tile fallback intact for keynotes without an `avatar` (e.g., the 2025 dataset).
- Preserve the existing decorative micro-accents — the `Sparkles` corner badge and the gradient tile background — even when an image is present, so the visual language stays consistent.

**Non-Goals:**
- Refactoring `KeynoteSchema` to extend `PersonSchema`. The two schemas have diverged on purpose (a keynote is a talk-plus-speaker, not just a person) and conflating them would be a larger ergonomic change.
- Backfilling avatars for 2025 keynotes.
- Adding image optimization (Nuxt Image, srcset, AVIF). The assets are small static JPGs; optimization is a separate concern.

## Decisions

**Decision 1: Add `avatar: z.string().optional()` directly to `KeynoteSchema`, do not extend `PersonSchema`.**
- One field added; mirrors the existing optional fields already on the keynote (`website`, `talkTitle`, `talkAbstract`, `bio`, `links`).
- Extending `PersonSchema` would force the rename of `affil` → `institution`, add a `country` field, and require a `link` field that overlaps with `website` — much wider blast radius than the user asked for.
- Stays consistent with the principle the project already follows: each content surface owns its schema; shared fields are duplicated rather than inherited when inheritance would distort the shape.

**Decision 2: Render the avatar inside the existing gradient tile, not replacing it.**
- The avatar tile becomes a layered composition: gradient background (existing), then `<img v-if="keynote.avatar" :src class="absolute inset-0 w-full h-full object-cover rounded-2xl">`, then the `Sparkles` micro-badge (existing) sitting on top.
- When `keynote.avatar` is absent, the gradient + initials text remain (existing behavior).
- Rationale: the gradient + sparkle is part of the card's branding; replacing the whole tile when a photo is present would create two visually different card variants. Keeping the chrome and just swapping the inner content keeps the card library uniform.
- The image keeps `object-cover` and inherits the tile's `rounded-2xl` so the photo crops cleanly into the same shape. For the photo's circular framing (`Round-Jirsa-V.jpg` is round-cropped already; `Sebastian-Kozerke.jpg` is rectangular), `object-cover` is the right default — both look natural in the rounded square.

**Decision 3: Hover transform on the avatar tile (`group-hover:rotate-2 group-hover:scale-[1.04]`) is kept.**
- It was applied to the tile, not the card root, so it doesn't shift the card's click targets — the keynote-card stable-hover policy is unaffected. The transform now also moves the photo, giving the card a small bit of life on hover, which feels right.

## Risks / Trade-offs

- **Risk:** A future keynote sets `avatar` to a broken URL. → **Mitigation:** the `<img>` will just render its alt text/blank box; the gradient tile sits behind it as a backdrop, so the card still has visual weight. Adding `alt="<keynote.name> portrait"` makes the failure mode accessible.
- **Trade-off:** No image optimization. → **Accepted:** workshop photos are static, small (typically <200 KB), and shipped from `/public`. Cloudflare Pages serves them with caching. Optimization is a follow-on at most.
- **Risk:** The two existing avatar files have different aspect ratios (one is round-cropped, the other rectangular). → **Mitigation:** `object-cover` centers both into the same rounded square; both look fine. If a future avatar has a strong vertical face crop, we can revisit with `object-position: top`.
