# v0.61 — Slow economy, normal-speed armies

Owner decision (23 Nov 2026): the economy, construction and training stay three times slower, but soldiers, workers walking, ships and fighting must feel as quick as before v0.60. Movement should never feel sluggish.

## What runs at which speed

| Normal speed (x3 of the slow clock) | One third speed |
|---|---|
| Unit walking (`move`) incl. raiders and workers | Resource production and gathering rate |
| Ship sailing and ship combat damage | Building construction |
| Unit attack cooldowns, tower and fortress fire | Worker and unit training / recruitment |
| Arrows, slashes and damage numbers (visual life) | Population, economy cycle, calendar, warning and raid timers |
| | Envoy and caravan journeys, fish stock regrowth |

Implementation: `tick(dt)` still receives the slow step (`scPaceStep`, in `src/v060/war-engine.js`). A single constant `scFastRate = 3` multiplies `dt` in the movement and combat code (`move`, unit and tower cooldowns, effect lifetimes, boat steps and ship combat). Nothing else changed, so save files and schema 17 are unchanged.

## Owner checks (about 30 seconds each)

1. Order soldiers across the map: they cross it at the old speed, not slowly.
2. A farm, house or recruited unit still takes visibly longer than before v0.60 (the ⅓× badge next to Pause explains it).
3. Send a ship: it sails at the old speed.
4. Fights last about as long as they did before v0.60.

## Tests

`tests/slower-frontier.test.cjs` gains one test that measures real walking distance, the attack cooldown and the economy clock in the same run. The paused/hidden test no longer races a frame between unpausing and hiding the page.

Earlier in this stack the eight failing CI tests of v0.60 were corrected without weakening them (schema now always 17, the rival fortress is the only allowed enemy building, the music default is the original playlist, 20 build icons, the supply tick takes about 15 seconds, the menu is closed before clicking the field).

## Not changed

No new art, music or video, no Leonardo spending. The opening video-and-subtitles flow is as the owner wants it.
