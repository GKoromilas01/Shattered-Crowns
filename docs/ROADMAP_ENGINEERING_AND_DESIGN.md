
## Product direction: two modes (owner, 2026-11-19)
The game must be both a single-player game (offline, as now) and a multiplayer game. Player counts are open: maybe 10, maybe hundreds, maybe thousands.

Honest scale tiers (each is a different design, not one dial):
1. Small rooms (2-8 players): co-op settlement or head-to-head. Needs a small server (or peer sync), one shared simulation per room.
2. Medium (10-100): authoritative server, lobbies, matchmaking, rooms of about 8 per match.
3. Large (hundreds-thousands): a persistent shared WORLD MAP where each player runs a city, and players meet through trade, envoys, alliances and instanced battles (like Travian, Rise of Kingdoms, Anno online). Thousands of units simulated live in one battle is not realistic; asynchronous play is.

Groundwork that is cheap now and expensive later (candidates for v0.43+):
- Make the simulation deterministic: replace the 6 uses of Math.random and keep time out of game rules (39 uses of performance.now/Date.now; most are visual).
- Route player actions through one command layer (place, assign, train) so they can be sent to a server.
- Keep game state serialisable (the save system already is).
- Accounts, a server, hosting cost, anti-cheat and moderation are product decisions; get a 2-8 player prototype working before promising hundreds.
Single-player stays fully offline and never depends on the server.

## Multiplayer plan (owner decision, 2026-11-19)
- START with 2-8 players per room. Test it with AI-controlled players (bots) when no human players are available; real human testers later.
- Build it so it can be UPGRADED to many more players later (shared world map, more rooms, more servers) without a rewrite: deterministic rules, one command layer, serialisable state, server-authoritative design, no assumptions in the code that there are only a few players or one room.
- Single-player stays a separate, fully offline mode.

## Version order from v0.43 (owner agreed; v0.42 is the version being built now)
Each version still needs the owner's agreement on its exact contents before building, and must bundle several visible, 30-second-checkable things.
1. Events director v2 + chapters of the 30-minute arc (sickness, raids scaled to size; first objectives).
2. People with stories (families, traits that matter, losing a resident matters).
3. Decisions with trade-offs (rationing, taxes, festival), using Chapel and School.
4. Multiplayer groundwork (deterministic rules, command layer) and a bot player.
5. Second village from the world map; telegraphed defence waves.
6. Dynasty (heir, marriages), replay value (score, daily challenge), demo and store page.
Engineering in parallel: one data table per building (a few buildings per version), reviewer helpers on bigger versions, real art early.

## Single-player vs AI villages (owner request, 2026-11-19)
- Single-player must let the player try the game against up to 7 AI villages (8 settlements in total), in addition to the peaceful city mode.
- Design link: use ONE "player" abstraction (human, AI bot, later a remote human) so the same AI that runs a village in single-player also fills empty seats in multiplayer rooms and serves as the multiplayer test bot.
- Honest scope: today the local map holds one city (2450x900) plus the classic skirmish enemy. Needs: a larger or world-map-based layout for 8 villages, AI villages that build economies (not only raid), trade/envoys/alliances/war between them (see docs/DESIGN_GROWTH_AND_WAR.md: slow-start war), and a performance budget for 8 simulated villages in a browser.
- Staging: 1 AI village, then 3, then 7, checking speed each step; difficulty levels; AI personalities (trader, warlord, builder).
- Moves into step 4 of the version order ("player abstraction + bots; single-player with up to 7 AI villages").

## Idea intake: base building that matters (owner-supplied, not yet prioritised)
Source: video notes "Making Base Building Meaningful in RTS Games". Recorded only; nothing built until agreed.
1. Economy forces layout: resources deplete and need drop-off logistics (Age of Empires 2), so where you place farms, lumberyards and storage matters.
2. Production pace: slow builds + need to spend means several production buildings are a real decision (StarCraft), not one of each.
3. Placement vs paths: walls, gates and buildings block movement; choke points change fights.
4. Utility and vulnerability per building: dual-use buildings (garrison + tech), ways to capture, repair, sabotage (C&C, Warcraft 3 shops).
5. Worker opportunity cost: a builder busy building is not gathering/repairing/defending (Company of Heroes); fragile workers invite raids.
6. Scouting tied to buildings: what an enemy builds reveals its plan; hiding/countering it is a layer.
7. Adjacency bonuses only with trade-offs (avoid "one optimal grid" like Supreme Commander); StarCraft 2 add-ons that can be moved are the good model.

## Idea intake: King of Avalon review (owner-supplied, inspiration only)
Ad page: dark, warm interior art (cabin, firelight, frost window) with "Play for free". Game: FunPlus mobile MMORTS, Arthurian setting, alliance PvP, dragons/heroes, counter-based troops, heavy pay-to-win pressure (Steam Mixed). Take the mood and alliance/chat ideas; no assets, no pay-to-win.

## Idea intake: anti-snowball, subgenres, asymmetry (owner-supplied, not yet prioritised)
Sources: three RTS design video notes. Recorded only; proposals await the owner's agreement.
- Anti-snowball: diminishing returns, vulnerable economy, upkeep on big armies/settlements, retreat instead of annihilation, caps, defender advantage that fades, alternative victory conditions.
- Subgenre: Shattered Crowns = city-builder RTS with survival and hero/story elements. "Single player quotient" (calm build-up time before PvP) is a tunable multiplayer setting; our long calm opening suits it.
- Asymmetry: factions differ in how they grow (economy/rules), not stripped-down copies; maps complement them; avoid balancing by removal.
- Proposal: origins become the asymmetric factions; protection period + raids/events as pacing; upkeep via food/morale; retreat; non-military victory (prosperity/legacy). See chat of 2026-11-19 for the reasoning.

## Idea intake: big vision list (owner, 2026-11-19) and triage
Owner asked Claude to keep only what adds value to an addictive, balanced game, and discard excess. Triage:
KEEP (core, staged): market with a few goods + supply/demand prices by region (start with 3-4 goods, gold only); advisor with choices, deadlines and efficiency track record (extends events/chapters); culture as a building-driven score (theater, school, chapel already exist); small random misfortunes (already: events); ownership/inheritance in light form (families have a house and savings); revolts at very low happiness; taxation choices with consequences; festivals (2-3 per year); ravens bringing messages as the cutscene carrier; named historical advisors as flavour; regional anthems per region (after music decision).
LATER (after multiplayer/AI villages): regions/continents map with neighbouring cultures; political systems as modifiers; religion power; assassins/guard; hidden non-playable sites to conquer; colosseum/hippodrome with betting in game gold.
PARK / NEEDS CONVERSATION: cryptocurrency (legal, platform and trust risk; in-game currency only for now); the graphic-suite/AI-pricing research (separate ask).
DISCARD: sexual violence, sadism and torture-as-entertainment cutscenes (hurts audience, store/payment ratings; we will not build); brothel menu with drug-addict tiers (replace with an abstract "tavern informants" spy mechanic if wanted); full real-economy jobs bought/sold per citizen; per-citizen AI conversations (cost, balance, unpredictability); 30 anthems up front.

## Idea intake: stables and shipyards for trading ships (owner, 2026-11-19)
Owner prefers starting with a stable or a shipyard for trading ships. Claude's view: best paired with the market (needs goods and regional prices to be worth anything), so it goes right after the market version; a shipyard also fits island starts (fish, sea trade). Decide together before that version.

## Decision: currency name (owner + Claude, 2026-11-20)
Future game currency is called the Florin (real medieval gold coin). Dinar may later be the coin of the eastern regions. Not built yet; gold remains the only currency until the owner agrees to the currency version.
