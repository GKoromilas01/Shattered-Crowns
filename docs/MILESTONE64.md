# v0.64 — A new look, a yearly rhythm, a quarrel at the throne

## What the player sees
- **Opening:** a calm 5-second dawn clip (mist, chimney smoke, an old man leading his cow down a sunlit lane) with two verse lines that describe exactly that, before the village and attack clips.
- **Art:** new Leonardo sprites for the worker, soldier and archer and for the house, market, tower, granary, bakery and workshop. Previous art is archived in `assets/v062/art-previous/`.
- **Music:** "Sands of the Nile" (2-minute Egyptian-style instrumental) joins the playlist.
- **Yearly rhythm:** each year an anniversary parade (+6 spirits), two chapel holidays (+4, need a Chapel) and a castle feast (−15 food, +8, needs a Keep and 40 food). Add `?festivals=fast` to the address to see them within about a minute.
- **First throne decision:** after the first anniversary a farmer and a miller quarrel over the stream. Share it (−12 gold, +5 spirits) or favour the miller (+15 gold, −4 spirits). Pauses the game until Continue; shown once per browser.
- **Version label:** the badge and tab title now read 0.64.0.

## How it works (no save change)
- `window.sc64Core` (index.html, next to `scFestival`) exposes city cycle, stock, mood and `has(type)` for the new modules.
- `src/v064/calendar.js`: year = 48 city cycles (`?festivals=fast`: 6). Events are derived from the existing saved `cityCycleNumber`, so saves, schemas and Return to Game are unchanged. Nothing replays on load.
- `src/v064/throne.js`: one modal dialog; the "seen" flag lives in localStorage, not in the save.
- Tests: `tests/v064.test.cjs`; playlist rotation tests updated for `leo_nile`; Advisor Tester has six v0.64 steps.

## Not in this version
- Villager lines in a continent's own language: the game has no continent concept yet, and v0.63 already added spoken verse lines.
- Hill-fortress castle art (kept as a candidate), other terrain textures (current grass fits better than the new samples), the owner's ideas list (stables, papyrus messages, ravens, forging blacksmiths, personalities, royal marriages, ancient common tongue) which starts in v0.65.
