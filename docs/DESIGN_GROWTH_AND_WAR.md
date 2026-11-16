# Design direction: everyone starts as a village (owner decision, 16 November 2026)

Owner decisions. Like `FUTURE_WORLD_DIRECTION.md`, these guide later proposals; they are not implemented systems, a schedule, or permission to spend money or open hosting.

## Core idea
- **Every settlement starts as a small village and grows.** There are no pre-made cities for players to conquer. Ladder: village → town → city → castle (castle as capstone; the tier count can change after playtesting).
- The 128 atlas settlements are the world's places. Each is a village-sized start that can grow. Their location sets resources (see `WORLD_MAP_V029.md`: timber, stone, game, fish, farmland; never zero), so terrain shapes how a village grows.
- The long-term game is a **multiplayer online strategy**. Progress is server-authoritative; local saves stay for single-player (see `FUTURE_WORLD_DIRECTION.md` for the multiplayer rules).
- Systems to cover, in small playable slices: **war, economy, trade, politics, religions, jury/justice, political systems**.

## War: costly to wage, rewarding only if won (owner, 16 November 2026)
- War is allowed but never the cheap option, and it should feel like the real world: expensive, risky and slow to pay off.
- **While the war lasts** the aggressor carries a large, visible cost to **economy and politics**: trade loss, higher upkeep, food and goods shortages, unrest, war weariness, lost standing with neighbours and factions. These costs keep growing the longer the war drags on, so a stalled war is hard to maintain.
- **Defenders** also suffer (raids, disrupted trade), but the declared aggressor carries the larger penalty.
- **If won**, the effect is positive and real: tribute or reparations, captured resources, trade routes and territory, higher standing and a stronger political position. The reward must be worth the war but never so large that war beats peaceful growth by default.
- **If lost or abandoned**: reparations, lost resources and standing, internal unrest.
- **Balance rule:** expected value of a war should only be positive for a player who is clearly stronger or well prepared. Peace, trade and pacts remain the efficient default route. Costs, rewards and war duration are set as numbers in a table with tests before any combat is built, then tuned by playtesting.

## Open questions (not yet decided)
- Do AI-run settlements keep growing while players are offline? (Suggested yes, slowly.)
- Exact number of tiers and what each unlocks.
- Offline rules for public worlds (required before any public persistent world).
- How growth, wars and politics interact with the existing frontier/trade engine (`scFrontiers`, `scTown*`).

## Next slices
1. Settlement tier model (data only, tested), with tier shown in the atlas.
2. Resource profiles from the world map feeding city start deposits and growth.
3. War cost table (economy and politics penalties) with tests, before any combat.
