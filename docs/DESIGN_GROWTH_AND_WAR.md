## Owner's guiding purpose — 22 November 2026

“Immerse yourself in a medieval town, take decisions that impact it, and think deep.”

Build a lived-in medieval town where understandable decisions have visible consequences and invite considered play. Prioritize choices about people, food, work, resources and the town's relationships over adding systems for their own sake. Keep information available when wanted and the map calm enough to inhabit. New features should strengthen this purpose through actual simulation and clear feedback.

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

## Resource balance (owner decision, v0.29)
- Every village has all three main resources (wood, stone, food). Terrain only changes how much: mountains give plenty of stone and some gold but little timber; forests give timber but little stone. Nothing is ever zero.
- Start with enough to build a few things anywhere; shortages appear as the settlement grows and needs more. They are fixed by trade: ask your market, or fill other markets' orders.
- Workshops make specialty goods (planks, tools, salt, cloth, dyes, furs) that other villages lack, creating more trade.
- Implemented as data in `src/v029/resource-profile.js` (income multiplier 0.6–1.5 by level, minimum starting stock, shortage and surplus lists, specialty by biome), tested in `tests/resource-profile.test.cjs`. Not yet wired into game play.

## War cost model (v0.29, data only)
`src/v029/war-costs.js`, tests in `tests/war-costs.test.cjs`. Example (20 soldiers, income 120/day, defender wealth 3000): a won war nets about +1000 at 5 days, +300 at 20 days, break-even near 25 days, and about -1000 at 40 days. A lost war is always negative. Unjust declarations cost more standing and stability and trigger embargoes. All numbers are first-pass and live in `CFG` for tuning; nothing is wired into combat yet.
