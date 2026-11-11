# Atlas review brief — v0.21 Room to Build

Repository: GKoromilas01/Shattered-Crowns. Review feature branch feat/v021-town-layout against released main c4454b2; do not duplicate implementation. Game source is frozen at06a4bcfa5b87d44684fe619cf19372a92cfd604b; test synchronization and final package use7d1e662f710e1bcbdd7724f8bae3c611a2ed05f4. Later validation docs/screenshots change no game/release/test bytes.

## Owner intent
Quiet the main HUD, make new buildings less crowded, keep useful roads/free placement, and explain finite-map edges. The owner confirmed panning works after zooming in: no camera-controller fix is requested. Future direction is in FUTURE_WORLD_DIRECTION.md, including connected regions, restrained magic, the harbour visual target and authoritative multiplayer saves.

## Review
1. Check the exact PR head and its GitHub CI; standard pinned-browser CI is independent of local Chromium evidence.
2. Inspect source diff, actual phone/desktop screenshots, and docs/validation/v021-town-layout.md. Retain the distinction between the398/402 local full run and4/4 unchanged timeout rechecks; all seven new tests passed locally. Initial CI found a label-refresh test race, corrected by an exact-state wait; latest-head CI must be green. Use existing evidence rather than repeating unchanged broad suites without a new finding. Verify Supply/Markets remain accessible/live in City Life→City figures and services.
3. Test new civic plot separation against both completed buildings and unfinished sites, plus cancellation, real costs and worker completion. Existing road placement, fishery shoreline and defense eligibility must remain available. Loading older crowded towns must not relocate or reject them.
4. Check clearance guides match real validation; deposits/river/boundaries can still block a plot. Confirm placement UI and camera hints do not obscure controls or alter Pause.
5. Confirm whole-map hint appears when the entire local map fits, disappears when enlarged, and mouse-edge scrolling works with overflow. World map remains the separate atlas.
6. Report concrete blocking findings with reproductions and required regression coverage. Recommend merge only after CI is green. No merge, release dispatch, deployment, payment activation or hosting change without the owner's separate decision.

## Next design after release
Propose one satisfying opening chapter using current city systems and a small consequential event before expanding to a caravan route and neighbour diplomacy. Treat seamless worldwide travel as a larger campaign architecture task. Do not start several independent expansions together. Keep gradual graphics improvements and concise, prioritized UI information.
