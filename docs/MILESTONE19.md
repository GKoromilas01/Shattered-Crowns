# Milestone 19 — A Living, Prosperous City

City Life now includes a compact Governor's Hall: actual population, food, happiness and treasury, housing/staffing/service coverage, current prosperity and measured food-chain results. At most three grounded Advisor items lead to planning sections or an explicitly located building. Before a cycle runs, output is labelled unmeasured. Food reserve estimates explicitly exclude future production and market savings; no invented weekly income, prosperity trend or future currency is shown.

Select a farm, fishery, granary, bakery or market for its extended existing inspector. Open/Pause and priority controls call the same engine operations as City Life. Food-chain/service warnings reuse the core's staffing comparison. Bakery export/reserve controls are explicitly city-wide. Granary allocations describe shares of one common reserve, including retained physical capacity while paused. Markets distinguish current coverage, measured city-wide savings and total baskets sold across all markets. Other building inspection and Keep recruitment remain available.

The approved Sand Labs Figma Governor and building-panel frames (`PmPh834ycCYkyDzeYrRdAi`, nodes `3:27`, `3:68`) supply the dark/brass/parchment/forest hierarchy, adapted to the current responsive City Life/inspector panels. Existing local system fonts are retained as fallback; no external font, framework or asset dependency was added. The schematic gameplay placeholder, Smithy, upgrades, Coin and sample weekly figures remain excluded. The world atlas, compact HUD, playable artwork and audio are preserved.

## Economic measurements

Thirty minutes means **1,800 simulation seconds**, not wall-clock waiting. Each of the five starts has an unattended baseline and a separate legitimate guided growth route. Time is accelerated, but workers gather actual deposits and native construction pays ordinary prices. No stocks, population or buildings are injected. All routes produce occupied upgraded homes, population above their initial value and a final five minutes without unmet food. Checkpoint continuations match uninterrupted economic outcomes.

| Start | Initial population | Unattended population / food at 30 min | Guided population / food | Guided prosperity |
| --- | ---: | ---: | ---: | ---: |
| Marches Landing | 8 | 4 / 0 | 20 / 81 | 79 |
| Brookstead | 8 | 18 / 81 | 30 / 76 | 64 |
| Thornmere | 10 | 18 / 81 | 30 / 76 | 64 |
| Datehaven | 8 | 18 / 81 | 30 / 76 | 64 |
| Bell Shoal | 14 | 26 / 20 | 40 / 233 | 79 |

These are observed reference routes, not promises that every build order succeeds or every unattended city prospers. Marches Landing needs the player to establish food production; Bell Shoal benefits from diversifying its starting fishery. Existing rates, prices, job counts, food pool, service and prosperity formulas are unchanged.

## Confirmed correction and compatibility

An extended unattended home shortage exposed a save defect: after population reached its minimum of four, an unused departure timer grew beyond the existing validator's 15-second bound. The timer now saturates at 15. Population departure behavior and the minimum population remain unchanged; validation remains strict. No new save field or schema is introduced. Existing accepted schema 1–4 saves remain compatible. Already-invalid older starvation captures with an out-of-range timer are not silently normalized.

UI controls use stable nodes to preserve held-Space/pointer activation, focus and scrolling. Inspection validates owned living targets without issuing unit orders or moving the camera; explicit Locate actions may pan. Stale targets are invalidated on restart/load/destruction; pending actions from before a restart/load are cancelled even when building IDs match. Advisor navigation transfers keyboard focus to the visible inspector. New panels share the existing camera-hover protection.

## Review and limitations

The original M19 and stacked PR #29 remain historical candidates. The 9 November integration starts from main after merged PR #33 and preserves the accepted governor maps, villager construction, live Advisor refresh and graphics polish. Original PR branches remain unchanged. The new draft targets main; no merge, deployment, paid service or new architecture is authorized.

Five starts and five detailed workplace types are supported. New industries, separate grain/bread inventories, persistent revenue history, warfare, diplomacy, multiplayer and other Figma future mechanics remain deferred. Long-run tests demonstrate one funded growth path per start, not exhaustive economic balance. Automated browser verification does not replace owner Windows listening/visual playtesting.

Current integration evidence is in [current-main verification](validation/city-management-current-main.md); original reports below retain their historical source context.

See [scope](superpowers/specs/2026-11-05-living-prosperous-city-design.md), [implementation plan](superpowers/plans/2026-11-05-living-prosperous-city.md) and [verification](validation/m19-verification.md). Exact head, CI, screenshots and playable candidate are recorded in the draft PR after verification completes.
