# v0.66 — Upgrades, a livelier world, rival uniforms, the Greek anthem

## What the player sees
- **Building upgrades (new gameplay):** House, Farm, Market and the Royal Keep each have three looks. The building's own panel shows "Look 1 of 3", the bonus it pays and an "Upgrade to …" button with its cost. Costs and bonuses (per minute of game time, paused time earns nothing):
  - House: look 2 = 50 wood + 30 gold, +4 gold/min; look 3 = 60 stone + 60 gold, +8 gold/min.
  - Farm: look 2 = 60 wood + 30 gold, +6 food/min; look 3 = 50 stone + 70 gold, +12 food/min.
  - Market: look 2 = 70 wood + 50 gold, +8 gold/min; look 3 = 70 stone + 100 gold, +16 gold/min.
  - Royal Keep (not the survivors' camp): look 2 = 100 wood + 60 stone + 100 gold, +10 gold/min; look 3 = 150 stone + 250 gold, +20 gold/min.
- **King's Guard:** two guards in crimson and gold stand either side of the Royal Keep gate.
- **Life:** a boy and a girl stroll beside about every second house; a flock of sheep grazes at each farm.
- **Rival uniforms:** frontier raids and Skirmish enemies wear the dress of Ironmere (iron anvil, grey), Valewatch (white stag, green) or Ashford (wheat sheaf, ochre; the archer is a crossbowman). The kingdom comes from the saved rival id (frontier war) or the enemy keep id (Skirmish). Coastal raiders keep the old raider look.
- **Music:** "Hymn of the Aegean", a 3-minute original ancient-Greek-modal instrumental (Leonardo Music, instrumental, Private Mode), is the last track in the playlist. Use the ⏭ button to reach it.
- **Version label:** 0.66.0.

## How it works (no save change)
- `src/v066/world.js` (embedded as `sc66WorldModule`, before the banner module so the banner is still drawn after an upgraded keep): wraps `window.sc47Paint`, wraps `scBuildingMenus.register` so each upgrade section is appended to the building's existing menu, and polls game time for the per-minute bonus.
- `window.sc66World` (index.html, next to `sc64Core`) is the only new access into game state: buildings, units, inspected building, resources, pay/gain, rival war state.
- Upgrade levels are stored in localStorage `shattered-crowns-upgrades-v1` as `{cityId:{buildingId:level}}`, never in a save. A save made in another browser shows buildings at look 1 there; nothing breaks. A test compares the save structure with and without upgrades.
- `window.sc66Enemy(b)` is called by `sc47PaintUnit`; it returns a kingdom sprite key or null (then the old raider/archer art is used).
- Tests: `tests/v066.test.cjs` (8 tests); Advisor Tester has six v0.66 steps.

## Art
Cut out with the same method as before (new cleaner white-background cut for grey and green uniforms so no white gaps remain between legs or inside bows). Originals: `assets/v066/originals/` (46 images; the ballista was blocked by Leonardo's moderation and dropped). Embedded now: six kingdom uniforms, King's Guard, children, sheep and the eight upgrade looks.
Stored for later versions (not embedded): terrain textures (river, sand shore, desert, snow), trees, rocks, hill, defence pieces, military buildings, siege machines (ram, catapult, trebuchet, siege tower), mounted knight, monk, merchant cart, effects (smoke, fire, dust, rubble, arrow volley), and everything in `assets/v065/later-originals/`.

## Not in this version
Rectangular wall (pathfinding risk), siege machines in play (need the war and wall systems), tavern/inn and other buildings' upgrade looks, deer and cattle, terrain textures, Persian and Chinese anthems (waiting for the owner's go-ahead).
