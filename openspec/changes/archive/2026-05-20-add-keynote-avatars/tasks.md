## 1. Schema

- [x] 1.1 `avatar: z.string().optional()` added to `KeynoteSchema` alongside the other optional fields.

## 2. UI

- [x] 2.1 `KeynoteCard.vue` now renders `<img v-if="keynote.avatar">` with `object-cover rounded-2xl absolute inset-0`, and the initials `<span>` is `v-else`.
- [x] 2.2 `Sparkles` badge gets `z-10` so it sits above the image; tile keeps no `overflow-hidden` so the corner-anchored badge can spill outside the tile as before.
- [x] 2.3 Hover transform (`rotate-2 scale-[1.04]`) on the tile is unchanged — it now animates the photo with the tile.

## 3. Verify

- [x] 3.1 `pnpm build` clean — JSON validates with the new optional field, no TS errors.
- [ ] 3.2 Manual visual check on `/workshops/2026` — defer to user (no browser in this env).
- [ ] 3.3 Manual visual check on `/workshops/2025` — defer to user.
