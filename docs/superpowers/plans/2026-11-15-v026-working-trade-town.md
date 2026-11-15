# v0.26 Working Trade Town Implementation Plan

> Execute inline using executing-plans and test-driven-development. Owner approved sample and continuation. Full-branch review before final recommendation; no merge/deploy.

**Goal:** deliver approved graphics across the world and one connected production/trade loop.
**Architecture:** original embedded atlases and a render-only world pass retain existing camera/input/geometry. Extend engine-owned construction, staffing, bakery cycle and regional transactions with strict optional schema9 state. Reuse Market Neighbour trade and inspector presentation.
**Tech stack:** existing inline Canvas/JavaScript, Node24, Playwright1.57; no runtime dependencies.
**Spec:** docs/superpowers/specs/2026-11-15-v026-working-trade-town-design.md

## Global constraints
Base f98d187, approved sample PR42. Original shipments/receipts/chapters and schemas1–8 preserved. Original art only. Budgets60fps ordinary,30fps stress (tail latency explicitly measured), assets≤12MiBcompressed and accounted cached/decoded≤64MiB. No merge/deploy.

## Review focus
- Legacy crowded layouts must retain selection, deposits and legal construction without relocation.
- Whole-city restores must never duplicate reservations, production, deductions or journey rewards.
- Pending upgrades survive Market loss and cancellation without refund duplication.
- Hidden/reduced-motion/Pause must not animate work that the simulation is not doing.
- One source of inventory: contracts cannot spend baskets already sold or bypass food policy.

## Task1 — production renderer and original assets
Files: assets/v026/*, src/v026/renderer.js, scripts/embed-v026.cjs, index.html, tests/v026-graphics.test.cjs.
Interfaces: render(ctx,readOnlyWorld)->boolean; embedding uses integrity lock and embeds local PNGs into index.html; no engine-state writes.
- [x] Write tests for all supported assets decoded, same-state render purity, no duplicate per-object pass, legacy crowded selection and resource access, reduced motion/Pause.
- [x] Run focused test; expect failure from absent production renderer.
- [x] Generate/inspect remaining art; implement one cached ground and depth-sorted objects with order/stage animation, retained interaction overlays and fallback.
- [x] Run focused graphics and existing relevant visual tests; record assertions whose old rendering assumptions need updating, never weaken interaction tests.
- [x] Commit verified visual stage.

## Task2 — workshop and schema9 transactions
Files: src/v026/trade-town-engine.js, index.html, tests/working-trade-town.test.cjs.
Interfaces: scTradeTown.snapshot/reserveBaskets/dispatch/upgrade; hooks cycle, tick, constructionComplete/cancel/undo; strict prepare(data) before restore mutates anything.
- [x] Write fail-first tests:2jobs,4wood→1plank/cycle proportional staffing; pause/priority/cap; exact schema9 roundtrip and malformed-state atomic rejection; schemas1–8 exact preservation.
- [x] Implement80wood/60gold/25stone workshop and45base-second construction; no free stock.
- [x] Implement explicit baskets target≤32; capture only actual sale-stock/normal policy-approved production; release atomically within80sale capacity.
- [x] Run tests; expect all named economic conservation assertions green. Commit.

## Task3 — agreements and yard
Files: engine module above, tests/working-trade-town.test.cjs, tests/working-trade-town-route.test.cjs.
Interfaces: stage0..3; immutable shipment terms;120running-second journeys; exact saved phase/escrow/history relationships; yard linked to real completed Market.
- [x] Fail-first tests for8planks→40gold,12baskets→54gold and both mixed90gold choices; duplicate send/return rejection; Pause/atlas; save each phase; legacy receipt/history preservation.
- [x] Implement eligible home/Brookstead progression after old follow-up, one new journey at a time; return even after Market loss.
- [x] Fail-first real builder yard tests:60wood/80gold/30stone/8planks, cancellation proportional refund/undo, missing plot, duplicate purchase, Market/yard loss, pending saves.
- [x] Implement two standing choices8planks→36gold and12baskets→51gold at1/2batches only after completed yard.
- [x] Run economic suite; build a resource-funded accelerated route with no grants, and record a separate normal-clock playtest. Commit.

## Task4 — concise native interface
Files: src/v026/presentation.js, index.html, tests/working-trade-town-ui.test.cjs.
Interfaces: workshop in native construction menu/inspector; Market→Neighbour trade supplier section; existing City Life/Advisor summaries and Chronicle history. Held-input restore epoch guard reused.
- [x] Fail-first native UI tests for construction/inspector controls, visible primary actions and disclosed explanations, reserved/sale stock distinction, disabled reasons, keyboard and held/repeated activation after restore.
- [x] Implement accessible controls and no permanent new HUD panel; keep original shipment actions intact.
- [x] Run UI, shipment and workplace regressions. Commit.

## Task5 — integration, artifact and review
Files: release.json, RELEASE_NOTES.md, docs/MILESTONE26.md, docs/validation/v026-working-trade-town.md, scripts/integrity checks and performance harness.
- [ ] Benchmark opening/developed/stress, collect p50/p95/p99 frame/draw times, heap/cache/asset bytes on recorded reference; fix graphics/performance regressions without changing economics.
- [ ] Run complete npm test, retain every failure and diagnose. Verify inline syntax and diff checks.
- [ ] Commit source, build/verify exact source artifact, run packaged smoke and asset integrity.
- [ ] Update PR42 title/body around final scope, include actual screenshots/playable artifact. Require clean full final-head CI; inspect final result rather than infer it from focused checks.
- [ ] Fresh whole-branch review, address blocking findings with regressions, final head verification. No merge or deploy.

## Interface ledger
Task1→Task4: renderer reads new types/yard links; engine remains sole inventory authority. Embedded script order must expose renderer before initial draw and presentation after DOM readiness.
Task2→Task3: plank/reserved inventories and strict prepare shared; terms derived from frozen constants in one engine module. Refund hooks must update the same stock exactly once.
Task3→Task4: public snapshot is a copy, never a mutating UI read; dispatch/upgrade recheck engine eligibility and actual resources.
Task1..4→Task5: generated index.html embeds exact locked assets/modules; release verifier still verifies immutable committed bytes, never a rebuilt approximation.

## Review checkpoint
Independent whole-change read-only review completed. Five P2 findings were reproduced and fixed with failing-then-passing tests: workshop preview, combat health, ownership cues, prerequisite chronology and reduced-motion target marker. A biome-palette preservation regression also passed. Full integration/CI remains pending; see validation note rather than treating task-level checks as complete release verification.
