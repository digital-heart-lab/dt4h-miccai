## Why

`content/workshop/keynotes/2026.json` now carries an `avatar` field on each speaker (Kozerke → `/images/avatars/Sebastian-Kozerke.jpg`, Jirsa → `/images/avatars/Round-Jirsa-V.jpg`), and the JPG files already exist in `public/images/avatars/`. But the keynotes schema (`shared/schemas/workshop.ts`) doesn't declare `avatar`, so zod strips it at parse time and the field never reaches the UI. As a result, `KeynoteCard.vue` keeps rendering the gradient initials tile even when a real photo is available. This is a near-zero-effort upgrade — the assets and content are already in place; only the schema and the card view need to acknowledge them.

## What Changes

- Add `avatar: z.string().optional()` to `KeynoteSchema` in `shared/schemas/workshop.ts`, mirroring the existing `PersonSchema.avatar` used by Committee.
- Update `app/pages/components/Keynotes/KeynoteCard.vue` to render `<img :src="keynote.avatar">` inside the avatar tile when `keynote.avatar` is set, and fall back to the existing initials tile when it isn't (so 2025 keynotes — which don't have avatars — keep their current look).
- No content changes (the JSON already references valid asset paths).
- No new dependencies.

## Capabilities

### New Capabilities
<!-- None. -->

### Modified Capabilities
- `keynotes`: the existing requirement "Keynote data shape" gains `avatar` as a new optional field, and the existing "Dedicated Keynotes section on the workshop page" requirement gains a clarification that the speaker pane uses the avatar photo when provided.

## Impact

- Code: `shared/schemas/workshop.ts` (one line), `app/pages/components/Keynotes/KeynoteCard.vue` (conditional `<img>` inside the avatar tile).
- Types: `Keynote.avatar?: string | undefined`. Backwards-compatible — every existing call site reads `name`/`affil`/`topic` and is unaffected.
- Visual: 2026 keynote cards now show photos of Kozerke and Jirsa instead of "SK" / "VJ" initials. 2025 cards (no avatar field) unchanged.
- No API, route, or dependency changes.
