# v0.69 candidate — Settlement Cinema

Approved by owner 28 November 2026. Based on v0.68 First Winter candidate, not a declaration that v0.68 is merged/released.

## Changes
- Opening and building-achievement videos use matching Georgia Italic 22px captions/subtitles, warm ivory and transparent backgrounds with shadows. Titles follow the same video typography. Separate full prose screens remain.
- Road connection moved from floating map button into Selected building → Settlement needs. Preview the real planned route and stone cost, then confirm. Blocked routes and stale city/selection/route plans cannot spend. No change to 12 stone/road-section pricing.
- Building needs show existing actual blockers, staff and next action. Keep overview shows population, food production/demand and existing First Winter/Town readiness goals. No invented bonuses or new save fields.
- Homes/Market/Growth milestone hooks support actual future Leonardo files. Missing footage deliberately retains current cards. Existing music retained.

## 30-second playtest
1. Open an introductory or School/Chapel clip: all video text italic, same size, no black subtitle panel.
2. Select a disconnected Farm. Inside its inspector choose Preview road: see route + price, no spending. Confirm: stone deducted once and roads built; map stays put.
3. Change selection or restore after preview: old confirmation must not spend; preview anew.
4. Inspect a staffed/unfunded/paused workplace: Needs reflects actual economy blockers. Inspect Keep: population/food + current readiness goals shown.
5. Homes/Market/Growth still show cards until approved clips are supplied; do not mistake this for completed media work.

## Pending owner media
See [Leonardo prompts and exact settings](LEONARDO_V069.md). Three 6–7 second clips and one original 120-second anthem are NOT generated or integrated. Private Mode ON. Ask displayed cost before each generation. No credits spent here.

## AI continuation
Sources: `src/v069/settlement-engine.js`, `presentation.js`, `milestones.js`, existing `src/v050/intro.js`, `src/v062/first-scenes.js`. Source extraction for old milestone code and removal of floating road control are reproducible in `scripts/embed-v026.cjs`; do not hand-edit generated HTML/media blocks.

Guarded API: `scSettlementAccess.plan(buildingId)` returns exact coordinates, cost, blocked count, city and restore epoch. `connect(id, preparedPlan)` recomputes and rejects mismatches before calling original road transaction. UI never interprets zero planned segments on a blocked route as connected. Geometry is a schematic in the inspector, not an overlay drawn across the map. Existing service-specific road requirements still apply.

Handoff must record test results and PR/head. Owner/Claude alone merge and release under AGENTS.md. No public deployment from this branch.
