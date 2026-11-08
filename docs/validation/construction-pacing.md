# Construction pacing — owner preview checkpoint

8 November 2026. Unpublished working prototype on `feat/city-construction-pacing`, based on draft PR #30, which includes the independent Chronicle scroll fix. PR #29 remains separate. Owner requested to pause further development and see the entire current prototype, and confirmed that the same workers must gather resources and construct houses.

## Measured opening

Controlled assignment: the three starting map workers gather one each of wood, stone and gold. Run the actual simulation in 0.25-second steps, with travel, depletion and retargeting. No construction, spending or fabricated resources in these measurements.

| Origin | Previous gathered total, 180 seconds | Proposed gathered total, 180 seconds |
| --- | ---: | ---: |
| Home | 8,756.75 | 1,328.75 |
| Brookstead | 8,688.75 | 1,328.75 |
| Datehaven | 5,756.75 | 1,320.625 |

Rates at a deposit: 17 previously, 2.5 proposed city resources per worker per second. One of each civic item costs 765 wood, 485 gold, 192 stone (1,442 total). Gathering alone previously outpaced these costs substantially. Idle home-start food runs out in the measurement because no farm is built; that is not a construction playtest. A separate normal-resource construction test finishes a farm before shortages and sustains positive food balance.

The new rate is a first playable candidate. This does not prove the whole town takes 30 minutes or that no further tuning is necessary. Construction takes the same units away from gathering. Civilian production, food, costs and skirmish remain unchanged.

## Prototype behaviour

- City civic foundations require selected map workers, or later assignment by right-click / Worksites.
- The same units switch between gathering and building; no duplicate builder population.
- Workers travel before working; 1/2/3/4 active builders yield 1/1.6/2.1/2.5 times progress. Additional builders wait.
- Finished builders become idle. Interrupted projects retain progress. Unfinished buildings do not supply services or output.
- Cancel refunds uncompleted material fraction and removes the placement's Undo entry. Existing Undo refunds and clears the site/build orders.
- Schema 5 records pending projects and validates references and refund costs atomically. No-project saves use existing schemas; old files remain readable.
- Roads and defenses remain instant in this slice. Assigned repairs and road speed bonuses remain future work.

## Prototype evidence

- 15/15 new construction browser scenarios passed: actual paid placement, no-worker waiting/no premature food, travel and faster multiple builders, gathering interruption, current rate versus unchanged skirmish, same-unit right-click assignment, refund/Undo/restart, malformed saves, all five origin identities, native controls and Pause at 390/1440 pixels.
- Existing economy/save/steward batch: 42/43 passed. The sole failure (`housing develops gradually, shows occupancy and requires food, water and roads for migration`) was `page.goto: Timeout 6000ms exceeded` before entering the game under concurrent browser load. Its isolated rerun passed. No assertion tolerance or test skip was introduced.
- Fresh independent whole-branch review found no Critical/Important issues and exercised the actual Menu/Construction Worksites entry at 390×700.
- Deferred minor: placement guidance mentions assigning workers for roads/skirmish too. Those still use instant placement. Development is paused for owner review.
- No full-suite result or CI success is claimed for this prototype. No new merge or production deployment. Further broad verification remains necessary before release.

## Owner demonstration

The package contains the entire standalone HTML game, not a mockup. A recorded opening shows the same workers gathering wood/stone/gold, constructing a farm and house, returning to gathering, then adding a well and three roads. The recording explicitly labels 4× simulation speed; no resources were fabricated. The playable HTML has normal speed and no demonstration hooks or captions. Keep preview saves separate from the older live game because schema 5 is not supported there.


## Continuation after owner playtest

The owner played the downloadable prototype, preferred it strongly, and authorized continuing. Retain the tested 2.5 resource gathering rate and shared map-worker construction model. Corrected the review's remaining placement-guidance wording: city civic sites describe builder assignment; roads and skirmish civic buildings describe instant placement. This changes instructions only.

The source push started the full GitHub suite automatically. One status inspection found run 42430159543 still in progress; it was not polled. Final-head CI remains required before merge. This branch includes the independent Chronicle fix from PR #30; PR #29's Governor Hall integration remains separate. No merge/publication authorization is inferred from approval of the playable direction.

Final wording revision: `CHROMIUM_PATH=/usr/bin/chromium node --test tests/construction.test.cjs` passed 15/15 in the continuation. Full final-head verification is still required; focused local checks do not replace it.
