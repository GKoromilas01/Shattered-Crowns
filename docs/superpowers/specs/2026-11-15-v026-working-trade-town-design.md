# v0.26 — A Working Trade Town

Owner relayed Alex's approved scope on 15 November 2026. Baseline: released v0.25 `f98d18764c35c4658a86a607531076bc01a78b2e`. Implementation is approved within that brief, subject to a playable art-sample review. No merge/deployment approval.

## Intent and release gates
Graphics are a primary deliverable, alongside one connected resource-funded production and regional trade progression. Retain simulation, camera, input, footprints and placement. All existing starts receive the eventual visual upgrade; crowded legacy towns must remain playable. The existing concept is an atmosphere reference, not delivered runtime art.

## Stage 1: explicitly throwaway playable sample
Asset-assisted Canvas: original transparent sprites, cached terrain, one depth-sorted world-object pass and a separate interaction overlay. Replace overlapping passes rather than add another effect layer. A small keep, cottage, Market, oak cluster, workers and three construction stages demonstrate warm limestone, timber, terracotta/slate and natural vegetation. Action animation reads real orders and distance to target. No invented resource events or ambient walkers masquerading as workers. Reduced motion, Pause and hidden-tab guards stop animation.

Keep released index.html unchanged; build a separate sample from its exact source using a narrow renderer hook and sample-only fixture controls. Compare before/after using the same paused state, view, zoom and time. Opening uses the existing Brookstead start; developed and stress scenes are explicitly seeded art fixtures, not resource-funded gameplay claims. Unsupported building types are outside sample art coverage and must be visibly identified as such. Sample controls must not be mistaken for production UI.

Record reference CPU, browser, Node, viewport, device pixel ratio, renderer and headless/software rendering status. Measure frame intervals, draw CPU p50/p95/p99, JS heap when available, asset/network bytes and cached pixel allocation for opening/developed/stress. Ordinary-play target 60fps, stress at least30fps; these are provisional until the sample review confirms budgets. A software-rendered environment cannot establish physical-device performance.

Approaches: extending the layered procedural renderer retains duplication; an engine migration would change camera/input and exceed approval. The approved asset-assisted Canvas approach replaces visual passes while preserving authoritative world coordinates. This sample is disposable; approval of its appearance does not make its fixtures or hook production architecture.

## Later stages, gated on sample review
1. Full visual pass: original assets for all buildings, terrain, vegetation, deposits, roads, water, workers and construction. Consolidate legacy passes, preserve selection/resource access, asset integrity, rendering purity and bounded caching.
2. Production: Carpenters' Workshop with two civilian jobs, proposed4wood→1plank per5-second full-staffing cycle; existing workplace pause/priority controls. Inspector owns workshop actions. Document final construction costs and economic comparisons before implementation.
3. Regional supplier: preserve existing Ironmere first/follow-up shipments and terms. Add three stages:8planks;12reserved bread baskets; then timber-heavy vs food-heavy mixed cargo. Reserve from actual production subject to existing food-reserve policy, excluding reserved baskets from automatic sale. Eligible Marches/Brookstead cities only; preserve chapters and old history.
4. Market loading yard: real funded construction and real builders, enabling larger batches and two manually dispatched standing-order choices, each consuming real goods. Document final cargo, prices, limits and cancellation/refund behavior against current basket-sale economics. Main actions remain visible; explanations use disclosures. Neighbour trade owns agreements; City Life/Advisor and Chronicle summarize existing state.
5. Strict schema9, schemas1–8 load without invented progress; preserve resources, shipments, receipts and history. Explicit downgrade warning and tests at every phase. No new engine state is introduced in the sample.

## Acceptance for final release
Complete normally funded loop; staffing/food tradeoffs; Pause; all phase saves; old saves; cancellation; no duplicate production, reservations, deductions or rewards; rendering cannot mutate simulation. Distinguish accelerated and normal-clock playtests. Feature PR, screenshots, verified playable artifact, asset integrity, clean full final-head CI and packaged smoke. Graphics is a release gate. Physical caravans, seamless travel, warfare, multiplayer and mobile expansion remain deferred.

## Approval boundary
Return the playable sample and matched evidence for owner/Alex review before producing the full asset set or implementing the later stages. Routine balancing is delegated, material scope changes must be reported. This document records the supplied approval; it does not expand it.
