
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
