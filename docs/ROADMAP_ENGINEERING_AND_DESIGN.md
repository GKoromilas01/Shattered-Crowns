
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
