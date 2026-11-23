# Milestone 63 — Slower hands, richer land

Branch: `ui/v063-…` (continues v0.62). Owner approved the plan and added requests during the session.

## What changed
- **Music:** opening song stops with the film; the next song starts when the new city appears. New 2-minute **Crown Anthem** (Leonardo, instrumental) joins the playlist after March of the Crown.
- **Building takes time:** towers, walls and fortresses are foundations that workers build (45 / 24 / 90 s). Placement no longer needs selected workers.
- **Training takes time:** Worker 12 s, Soldier 18 s, Archer 24 s, queued at the Castle with a visible progress strip.
- **Trade:** greyed trade-ship commands now say why; the Market trade panel lists what Ironmere, Valewatch and Ashford need.
- **Workers** walk around trees, stones and gold deposits.
- **Gathering 20% lower** (city worker 2.5 -> 2 per second; skirmish/AI 17 -> 13.6). Tests adjusted to the new rates, none weakened.
- **Words for the road:** original proverbs return as a small toast.
- **Voices:** eight lines per unit kind.
- **Graphics:** new stone and gold deposits (Leonardo), upgraded river (code), new "Village grows" opening clip (Leonardo, new houses rising).
- **Clips:** School, Chapel, Theatre, Shipyard clips slowed 1.3x and motion-smoothed.

## Checks
See `src/v052/tester-steps.js` (nine manual steps, about 30 s each). Tests: `tests/v063.test.cjs` (new), construction, usability, kingdom, economy, voices, cinematic-opening, anthem and player-control updates.

## Not in this version
Per-building interfaces (houses with choices, markets inside their panel) are proposed separately; the city-upgrade tier (settlement becomes a small castle) is planned for v0.64.
