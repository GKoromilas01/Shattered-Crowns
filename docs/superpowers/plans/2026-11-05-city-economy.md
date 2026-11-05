# City Economy & Quality of Life Implementation Plan

> Execute inline with Superpowers executing-plans, TDD, systematic-debugging and one fresh final review. Owner authorizes routine design/implementation independently; major balance/architecture decisions remain for Alex and owner approval.

**Goal:** Make the existing food-to-trade economy manageable from City Life and connect decisions to resident growth and prosperity.
**Architecture:** Extend the current engine snapshot and City Life presentation. Share the existing bakery export eligibility predicate between actual production and diagnosis; expose guarded setters for already-saved export/reserve options. Add one Economy navigation section with current bottlenecks, existing-policy buttons, measured-versus-current context and progression links. Preserve all simulation formulas and defaults.
**Tech:** Existing inline vanilla JS/HTML/CSS, Node24/Playwright1.57; no dependencies.

## Approaches and decisions
Atlas's routine design call: consolidate management around the existing chain and policies. A new resource/currency chain or changing income/growth rates would expand balance scope and needs Alex coordination; another read-only dashboard would not provide a management decision. Use the current resources and rules, with actionable controls and honest limits. This is a focused extension, not an economic redesign.

## Constraints
- Base main82cbef6c79345d37e5c7a80022e1128aca7a8104 (mergedPR18). Monitor post-mergeCI41958730010 and require green before handoff; merged tree is byte-identical to approvedM13 with two successful237+5 runs, so independent feature work may proceed while it finishes. No duplicate full baseline run.
- Isolated existing linked worktree /workspace/Shattered-Crowns-polish, new branchfeat/m14-city-economy. No open PRs or existingM14tasks found. Preserve other worktrees/checkpoints.
- All controls, graphics, approved audio/art bytes, roads/snapping/costs/Undo, peaceful/classic gameplay, staffing/growth/economy rates and save schemas1/2/3 remain. Existing breadExport and breadReserveCycles[0,1,2,4] fields are reused. No new save fields.
- Version0.14.0; no merge, deploy, paid services, dependencies or major architecture changes.

## Deliverable and interfaces
- Private cityExportReadiness(bakery,granaries,activeMarkets) returns ready + named boolean checks. The actual existing export loop and snapshot use it with the same arrays/strict distances/food reserve/80goods cap/efficiency thresholds. Current diagnosis is not a next-cycle promise; harvesting and household consumption can change readiness.
- snapshot.trade: enabled,reserveCycles,reserveFloor,goods,goodsSold,sites[id,checks,ready]. snapshot.prosperity/growth/buildings retain current definitions. No invented last-cycle gold income or separate grain stock.
- scCityEconomy.setTradePolicy(enabled,reserveCycles): strict boolean and one of0/1/2/4; rejects title/overview/ended/missingKeep and invalid values atomically, including no legacycontrol change. Synchronize old checkbox/select and globals, dispatch event; no resources, units, orders, camera, selection or globalPause mutation.
- City Life Economy native buttons: Hold food / Export surplus + reserve0/1/2/4. aria-pressed reflects actual policy; explain 8food minimum and existing goods still sell. Readiness perbakery links Locate and Employment; missing sites explain building production chain. Population/growth and prosperity factors link existing Housing/Satisfaction. Keep existing Food measured chain rather than duplicate its ledger.
- Preserve focused policy control and native Space/pointer press across live refreshes. Reflect legacycontrols and save restoration. Honor pre-entry/overview/ended guards with useful status, no partial mutation.

## Execution
1. Capture a genuine v0.13Brookstead save with pausedworkplace/exportoff/reserve4 before source changes. Add failing tests for policy API, gates, current diagnosis vs actual export, boundary/cap/budget cases and derived-only snapshots. RED then minimalengine implementation and focusedGREEN.
2. Add failing browser tests for Economy section, buttons/legacy sync, nativekeyboard/focus/refresh, preservesview/Pause/orders/targeting, both starts/classic and responsive390/1440 screenshots. Implement presentation; run focusedGREEN. No extra toggles or automatic unit orders.
3. Version/docs; one fresh read-only review, fix confirmed findings. Run focused cases and exact-source packaged smokes locally; use the complete exact-head GitHub regression runs as the comprehensive gate, avoiding a third full repetition on the unchanged platform. Push branch and open draftPR with screenshots, head/CI/evidence/download/limits. Keep draft unmerged for Alex and owner.

## Review focus
- Reserve floor is evaluated at actual export time, before household consumption; snapshot is current conditions, not a promised next-cycle forecast.
- Paused granary retains physical prerequisites/storage; paused bakeries/markets lose staffing eligibility. Existing goods continue selling when exports are off.
- Exact190/220distance, .5staffing and80goods cap; partial efficiency conversion unchanged.
- Legacy panels, save restore and new policy buttons agree; invalid/blocked changes leave all state and controls intact.
- Narrow UI, live updates, held Space/pointer, missing/destroyed buildings and restored games preserve usable focus and existing controls.
