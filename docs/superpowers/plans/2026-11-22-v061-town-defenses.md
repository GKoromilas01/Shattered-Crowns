# Town defense fixes implementation plan

Goal: fix v060 playtest reports without changing media or the one-third simulation pace.
Architecture: reuse native worksite and combat engine; add explicit worker repair order, schema18 validation and a small presentation module. Existing selected-worker rule remains authoritative.

- [ ] Reproduce defense instant placement, absent repair, unexplained disabled Keep actions, hidden trade requests, and edge scrolling near Connect to town. Add failing behavior tests in tests/town-defenses.test.cjs.
- [ ] Tower/wall/fortress foundations use existing construction machinery. Required simulation seconds: tower60, wall36, fortress120. No automatic gatherer reassignment. Costs remain unchanged; incomplete defenses never shoot. Schema18 gates defense sites and worker-only repair references; older schemas stay strict.
- [ ] Selected workers right-click damaged friendly buildings to repair at4 HP/game second/worker, charging0.1 wood and0.05 stone perHP. Repair stops when full, destroyed, or materials depleted. No auto-repair; save preserves jobs; pause/hidden remains native. Injured buildings get readable health bars and an inspector repair hint.
- [ ] Keep shows army/queue counts, why orders are unavailable, existing paid soldier recruitment; no free troops or skipped warning. Inspect raid damage through native combat rather than fake damage.
- [ ] Move Connect to town under inspector heading, guard edge-pan over controls. Restore visible Ironmere offer prompt plus Market review link; payments still require explicit native dispatch. Offer survives read-later and saved noticed flag.
- [ ] Run focused red/green and construction/save/market/war regressions, embed/check, document, package/push PR. Keep CI/release status explicit. No music/video changes per owner's correction.

Review focus: no idle healing or free defense; no stealing gatherers; live worker/building references survive save/reload; old schema rejects repair/defense worksites; HUD actions do not pan map; holding stale controls across imports cannot issue orders.

Owner expanded scope: restore EVERY existing request, notification and event visibly, not just Ironmere. See docs/CONTINUE_V061.md. Owner deferred all music/videos and requested a handoff before implementation. No plan step completed yet.
