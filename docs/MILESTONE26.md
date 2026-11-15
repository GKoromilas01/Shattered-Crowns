# Milestone 26 — A Working Trade Town

Based on released v0.25 `f98d18764c35c4658a86a607531076bc01a78b2e`. The owner approved the playable art sample in PR #42 and asked implementation to continue on 15 November 2026. Merge and deployment still require separate approval.

## A consistent illustrated world

Original asset-assisted Canvas art covers every existing building type, the new workshop/loading yard, oak/birch/pine vegetation, stone and gold deposits, depleted resources, terrain, roads and water. Limestone, timber, terracotta/slate and natural greens follow the reviewed sample. World objects have one depth-sorted drawing pass, bounded pre-scaled sprite caches and cached terrain/roads. The old renderer is retained only as a loading/failure fallback; its overlapping world passes do not run alongside the new renderer.

Existing world coordinates, construction footprints, placement, selection and resource targets are preserved. Woodland, dryland and coastal starts retain their ground palettes. Worker poses follow actual walking/gather/build orders and range to target; construction shows foundation, frame/walls, roof and completion. Pause, hidden tabs and reduced motion stop cosmetic motion. Existing service/placement/order overlays, combat health and enemy ownership cues remain available.

## Timber becomes a manufactured good

Construction → Workshop places a **Carpenters’ Workshop** for **80 wood, 60 gold and 25 stone**. It uses normal workers and a 45-base-second construction requirement, with the existing builder cap and diminishing returns. After completion, its two civilian jobs consume **4 wood for 1 plank per five-second cycle** at full staffing, proportionally less at partial staffing. Production stops at 200 planks or when timber runs out; timber is spent only for actual output. Existing inspector workplace Pause and Priority controls apply. Giving carpentry priority can take staff away from food and services.

## Ironmere becomes a regional customer

Marches home and Brookstead can continue after the existing Ironmere follow-up returns. The earlier first shipment (40 wood → 36 stone), follow-up (20 wood or 15 gold → 18 stone), chapters, receipts and history keep their terms.

Market → **Neighbour trade** presents three new agreements, one at a time:

| Agreement | Cargo | Return |
|---|---|---|
| 1 | 8 planks | 40 gold |
| 2 | 12 bread baskets | 54 gold |
| 3, timber-heavy | 12 planks + 4 baskets | 90 gold |
| 3, food-heavy | 4 planks + 16 baskets | 90 gold |

Choose one cargo for agreement 3. Existing housing, food-reserve and staffed connected-Market requirements are checked at dispatch. Each journey takes 60 game seconds outbound and 60 returning. Cargo is deducted once at departure and cannot be recalled. A later Market loss does not cancel the return. Pause/World map/offline time do not advance journeys.

Baskets must be **explicitly reserved**. Reservation moves actual produced sale stock into reserved stock, and any outstanding target is filled only from ordinary bakery packing that passes the existing export and food-reserve policy. Reserved baskets cannot also sell automatically. Reserve at most 32; releasing them requires space in the existing 80-basket sale stock, otherwise the operation leaves state unchanged. Workshop stock, reserved baskets and sale baskets are shown separately. Main actions stay visible; longer explanations and fulfilled earlier agreements use native disclosures.

## A real loading yard

Returning agreement 3 unlocks the Market loading yard: **60 wood, 80 gold, 30 stone and 8 planks**, with a 60-base-second construction requirement and real builders. It needs a legal adjacent plot. A pending upgrade survives saves and can be cancelled for the unused portion of all materials, including planks. Completed undo restores the original upgrade materials once. A destroyed yard can be rebuilt.

A completed yard enables manually dispatched standing orders, at one or two batches:

| One batch | Return |
|---|---|
| 8 planks | 36 gold |
| 12 reserved baskets | 51 gold |

There is one new supplier journey at a time; standing orders never auto-dispatch. Every batch consumes real cargo. The city retains up to 512 supplier returns; further supplier dispatch is blocked rather than silently discarding history. Original trade history is not altered.

## Economic comparison

Automatic basket sales remain **4 gold each**. Agreement 2 pays 4.5 gold per basket once; the repeating pantry order pays 4.25, in exchange for reservation and two minutes of transit. The old follow-up equates 20 wood with 15 gold, so plank timber costs about 3 gold per plank before labour and building cost; agreement 1 pays 5 and the standing timber order 4.5. At full bakery staffing, packing 2 food produces 2 baskets; the mixed choices therefore consume 48 wood + 4 food versus 16 wood + 16 food. Half-staff packing is less efficient (8 versus 32 food). The one-time mixed reward is a progression premium, not a repeating 90-gold faucet.

## Interface and saves

Workshop controls live in its inspector; supplier agreements and yard dispatch live in Market → Neighbour trade. City Life/Advisor summarize stock/progression, and Chronicle retains actual fulfilled cargo and returns.

New production state uses **strict schema 9**. Existing schemas 1–8 load without adding planks, supplier progress, fabricated receipts or historical returns. An older city begins schema-9 state when a new workshop or reservation action activates it. Existing resources, shipments and chapters are retained. Earlier clients cannot load schema 9: retain a separate earlier exported checkpoint for downgrades. Single-player restoration remains a whole-city rewind, not a server-authoritative ledger.

## Playtest route

1. Build a sustainable, serviced home and connected staffed Market in Marches home or Brookstead. Complete the original first shipment and follow-up.
2. Gather and pay for a workshop. Assign map workers to its foundation; then inspect it and compare food staffing with carpentry priority.
3. Produce eight planks, dispatch agreement 1, and let running time complete the journey.
4. Reserve twelve real baskets under the current food/export policy. Complete agreement 2, then choose the timber- or food-heavy mixed cargo for agreement 3.
5. Pay for a loading yard, assign real builders, and dispatch either standing order with one or two batches. Check cargo, returning gold and Chronicle history.
6. Save/reload pending construction and outbound/returning cargo. Check cancellation, Pause/World map, staffing changes and old saves.

The complete automated funded route uses actual gathering, paid native construction and real production with accelerated simulation; a separate standing-order playtest runs on normal browser wall-clock time. Physical-device performance and other browser engines remain outside the recorded reference checks. Graphics, full final-head CI, asset integrity and packaged smoke remain release gates. No physical caravan, seamless travel, warfare expansion, multiplayer or mobile expansion is added.
