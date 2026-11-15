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

## Sample approval and final implementation decisions
The owner reviewed the matched sample and replied, “Yes, these look great. Please proceed.” on15November2026. The art review gate is satisfied. The sample budget proposals are adopted as engineering targets, not claims that stress latency is solved. Continue inline under the original delegated scope; no additional approval round for routine balancing.

Decisions within delegated balancing:
- Workshop:80wood,60gold,25stone;45builder-seconds at the existing capped construction rates;2civilian jobs;4wood→1plank each5second full-staffing cycle, proportional at partial staffing. Capacity200planks; stop rather than discard timber at capacity.
- Supplier agreements become available after the existing Ironmere follow-up returns, under the same eligibility checks. Preserve first40wood→36stone and follow-up20wood/15gold→18stone unchanged. New journeys also take60+60running game seconds and cannot be recalled; Market loss cannot cancel an earned return.
- Agreement1:8planks→40gold. Agreement2:12bread baskets→54gold. Agreement3:choose12planks+4baskets or4planks+16baskets→90gold; either return unlocks the yard.
- Loading yard:60wood,80gold,30stone,8planks;60base builder-seconds, attached to a completed Market on a legal adjacent plot. Uses normal sites/builders, refunding unspent materials including planks on cancellation. No double purchase while pending or after completion.
- Yard standing orders, manually dispatched:8planks→36gold or12baskets→51gold; select1or2batches, one new supplier journey at a time. The larger limit is2batches, not an automatic sale loop.
- Material comparison: current baskets sell automatically for4gold. Agreement2 pays4.5/basket and standing pantry pays4.25/basket in exchange for deliberate reservation and120seconds locked transit. Planks consume4wood each; the existing follow-up equates20wood with15gold, so timber input is about3gold/plank before labour/building cost. Agreement1 pays5/plank; standing timber4.5/plank. At full bakery staffing, 2 food packs2baskets: mixed cargo requires48wood+4food versus16wood+16food (at half staffing,8food versus32food);90gold is a one-time chapter premium, not a repeating faucet.
- Reservation is explicit and saved: move already-produced baskets out of sale stock, then fill the remaining target only from ordinary bakery production that passes existing export/food-reserve checks. Reserve at most32baskets; returning reservation to sale stock must fit its existing80basket cap or leave state unchanged with an explanation.
- New state is state.tradeTown under strict schema9, holding planks, reserved baskets, target, supplier stage/journey/history and yard links. Schemas1–8 retain their state and resources without fabricated history/progress; tradeTown remains null until a new workshop/reservation action activates it. Old clients cannot load9; retain separate older exports for downgrades. Preserve all original regional/chapter fields.
- Keep the existing three-file verified release payload by embedding versioned original PNG atlases and renderer code in index.html. Source PNGs, provenance and integrity hashes remain reviewable in assets/. A generated embedding script checks digests; no unverified remote assets or new runtime dependencies.
