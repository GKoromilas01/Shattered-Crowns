# v0.51 — From Village to Town

A connected village-growth milestone and real production/trade reward. Owner authorized proceeding with next-version ideas; visual reference screenshots are for later builds only.

## Playtest

1. Extract the playable ZIP; open root **index.html** in Chrome. Confirm **V0.51.0**. Export an older save before loading it here.
2. Start or return to a peaceful city; select the Keep. **From Village to Town** shows the next missing requirement. Expand **Requirements & benefits** for the checklist. No automatic overlay opens.
3. Reach **20 residents**, **six homes with both water and roads**, **happiness 65+**, and a **road-connected Market at least half staffed**. Food must have production covering household demand, four demand cycles stored, and no shortfall in the last measured cycle. Prioritizing other jobs can delay readiness.
4. Produce **8 planks** in a staffed Workshop using actual timber. In the Keep, explicitly **Earn Town charter · 80 gold + 8 planks**. Payment happens once. Town recognition stays earned through later shortages and save/load.
5. Open **Market → Neighbour trade**. Build the existing **loading yard** for **60 wood, 80 gold, 30 stone, 8 planks**. Assign real map builders; an unfinished worksite cannot dispatch.
6. Produce another **8 planks**, enable ordinary bakery exports with your chosen food reserve, and **Reserve 12 bread baskets**. Packing uses actual sale stock/normal production, never household food directly.
7. **Send 8 planks + 12 baskets → 110 gold**. The manual order shares the existing route with partner cargo. Save outbound and returning; Pause/World map/hidden tabs freeze normal gameplay. A return credits once, then another real batch may be dispatched.
8. Inspect the player's settlement on the atlas: it is now a **Town**. Other settlements do not gain invented growth.

For a faster test, import `samples/v051/charter-ready.json` through **Menu → Saved city → Import**. It is a resource-funded village ready to claim the charter; the route was accelerated for engineering checks.

## Economics and compatibility

Workshop: two civilian jobs, four wood per plank per five-second full-staff cycle, unchanged. Yard costs, original Ironmere agreements, charters, Valewatch/Ashford pacts and standing orders are unchanged.

The same mixed cargo would earn 87 gold via standing orders, or 84 using automatic basket sales and plank standing value. Town pays 110 over one shared two-minute trip: a 23–26 gold premium for earned infrastructure. The charter's 80 gold + 8 planks has 116 gold standing-order opportunity cost, recovered in about five trips of premium. There is no automatic dispatch.

Schema 12 is selected only after an explicit earned charter. Existing schemas 1–11 preserve goods, cargo, receipts and history, and start without Town recognition. New cities reset recognition. Schema 12 is not readable by older clients: keep an older exported checkpoint if a downgrade is needed. Browser saves remain local; Export is the portable backup.

No merge or production deployment is part of this candidate. It depends on the v0.50 branch in PR #73; owner/Claude handles integration.
