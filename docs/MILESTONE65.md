# v0.65 — A slower opening, banners, a city motto, women and diverse villagers

## What the player sees
- **Opening:** the dawn clip now runs about 15 s (was 5 s, too fast to read). A new calm 10 s evening clip (neighbours sharing bread by a fire) sits between the village and attack clips, so the raid no longer arrives too early. Verse lines were written for exactly what each clip shows (`docs/OPENING_SUBTITLES_SHAKESPEARE.md`).
- **Banners:** three Leonardo banners (Crimson Lion, Green Stag, Blue Tower), chosen in the Royal Keep's own panel, flown beside the keep on the map.
- **City motto:** every banner has a motto shown for about 10 s when a city begins (after the opening).
- **Proverbs:** "Words for the road" every 5 minutes (first after 60 s), shown 16 s, and the timer keeps counting while paused.
- **Villagers:** about 46% of workers are women (field, water, baker sprites); about 10% of villagers are dark-skinned or East Asian in the same palette. Soldiers, archers and the later King's Guard keep their own clothes.
- **Version label:** 0.65.0.

## How it works (no save change)
- `src/v065/banner.js` (embedded as `sc65BannerModule`): wraps `window.sc47Paint` for the keep, adds the picker into `#sc140Selection`, stores the choice in localStorage `shattered-crowns-banner-v1` (not in saves). API: `window.sc65Banner`.
- `window.sc65Villager(b)` in index.html picks a sprite from a hash of the building/unit id, so a villager always looks the same.
- Tests: `tests/v065.test.cjs`; Advisor Tester has six v0.65 steps.

## Art received for later versions (not embedded yet)
`assets/v065/later-originals/`: tavern and inn, monastery, galley, frigate, cattle pasture, red deer, tournament field, slum quarter, cave with witch's hut, House of Roses. Per the owner they arrive gradually, with gameplay, in later versions. The healer sprite is built (`unit_healer`) but has no gameplay yet.

## Not in this version
Rectangular city wall built in paid segments (pathfinding risk to be tested first), poor quarters/caves/witches, taverns and inns, healers, ships, hunting and cattle, tournaments, refugees/war slaves/clerics, King's Guard.
