## Why

The DT4H 2026 workshop page currently has no keynote speakers wired up — `data.keynotes` is undefined, so the right-hand card falls back to the "Call for Sponsors" placeholder. We have full keynote details (talk titles, abstracts, bios, websites) for two confirmed speakers in `docs/keynotes.md`, but the data layer (collection, query, JSON file) and schema cannot represent or load them. We need to ship the keynotes panel before the workshop's promotional push.

## What Changes

- Add a `keynotes` Nuxt Content collection in `content.config.ts` backed by `content/workshop/keynotes/*.json`.
- Extend `KeynoteSchema` with optional richer fields needed by the 2026 data: `website`, `talkTitle`, `talkAbstract`, `bio`, `links` (array of URL strings). Existing fields (`name`, `affil`, `topic`) stay required so 2025 data keeps validating.
- Create `content/workshop/keynotes/2026.json` with the two confirmed speakers from `docs/keynotes.md` (Sebastian Kozerke, Viktor Jirsa). Use `"tbc"` placeholders for Jirsa's still-unknown talk title/abstract.
- Update `getWorkshopDetail()` in `app/utils/query.ts` to query the new `keynotes` collection and attach it to the returned `Workshop`.
- Update the workshop year page (`app/pages/workshops/[year]/index.vue`) so the keynotes card surfaces the richer fields (talk title and a link to the speaker's website when present), without breaking the 2025 view that only has `name`/`affil`/`topic`.

## Capabilities

### New Capabilities
- `keynotes`: Defines how keynote speakers for a given workshop year are stored, validated, queried, and rendered on the workshop page.

### Modified Capabilities
<!-- None: there are no existing specs in openspec/specs/ to modify. -->

## Impact

- Code: `content.config.ts`, `shared/schemas/workshop.ts`, `app/utils/query.ts`, `app/pages/workshops/[year]/index.vue`.
- Content: new file `content/workshop/keynotes/2026.json`; existing `content/workshop/keynotes/2025.json` continues to validate against the extended schema.
- Types: `Keynote` TS type gains optional fields — call sites that only read `name`/`affil`/`topic` are unaffected.
- No new dependencies, no API/route changes, no breaking changes.
