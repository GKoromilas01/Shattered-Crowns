# Milestone 15 — City Progression Implementation Plan

> Execute inline with Superpowers TDD, systematic debugging, verification-before-completion and one fresh final read-only review. Alex and owner approved priorities across job types, with unchanged defaults and optional validated save data. No merge/deploy without separate approval.

**Goal:** Give governors reversible control over scarce civilian staffing, with clear food/service consequences and stronger policy feedback.
**Architecture:** Pure deterministic allocation helper shared by real staffing and a no-priority comparison. Prioritized open sites first in the existing role/insertion order, then normal sites in that same order. No rate, cost, growth or prosperity changes. One optional owned-workplace boolean; absent means default. Existing City Life Employment controls and Economy feedback remain native and accessible.
**Base:** Approved M14 merge33fd3858a7923677e623d026fbc2de81b485db42, whose tree matches3507ea4. PostmergeCI41966678484 must be green before final handoff; don't duplicate unchanged baseline suites.
**Branch:** feat/m15-city-progression in existing isolated worktree. No other M15work. Preserve all other worktrees/checkpoints.

## Approved design
- Cross-job-type high staffing priority is opt-in. With no flags, keep original farm/fishery/lumberyard/market/clinic/granary/bakery role order and insertion ties exactly.
- First allocate high-priority sites in that order, then ordinary sites. Paused sites allocate zero and retain their saved choice. Reopening uses that choice. Essential civic reserve remains2residents.
- Do not move or recruit map workers or alter units/orders/selection, roads/Undo, production formulas, prices, audio/art, camera or globalPause.
- Optional building.cityWorkPriority boolean, owned staffed workplace only; omit default and remove on reset. Existing schemas1/2/3 and all old saves load unchanged. Priority-bearing saves requirev0.15+; v0.14rejects unsupported fields safely. Reject malformed/foreign/nonworkplace flags atomically.
- APIs setWorkplacePriority(id,high) and resetWorkplacePriorities() guarded by active city/liveKeep/valid owned sites. Reset never reopens paused sites. Current assignment changes immediately; measured cycle data retains its original meaning.
- Current-priority snapshot includes count, activecount, per-site changes versus a pure default-order allocation, and clear warnings for food-producer staff loss or essential service staff loss. Base-harvest comparison is labelled, excludes logistics/baking/distribution and is not a next-cycle prediction. Don't invent measured income or force a balance target.
- UI Employment: separate Open/Pause and reversible high/default staffing buttons; global Restore default food-first staffing. Visible choice, native Space/pointer holds and scoped live-focus restoration. Warnings and changed counts visible above staffing table; links to existing Food/service details.
- Preserve and finish owner feedback: explicit policy checkmarks/current choice, visible reserve labels and timing, no-bakery/Pause explanations; no banner overlay covering controls. Update Pause explanation without waiting a five-second production cycle.

## Tasks
1. Capture genuineM14save from the actual funded playthrough; add RED tests for allocation/default equivalence, deterministic scarce labor, reset/pause/reopen/deletion, atomic guards/validation, conserved outputs, optional save restore/legacy comparison.
2. Implement minimal allocation/API/snapshot/save changes, focusedGREEN. Add RED UI tests for priority/reversal/warnings/focus/native input and390/1440screens; implement existing presentation extension and truthful guidance.
3. Actual resource-funded playthrough demonstrating a staffing trade-off and reversal; screenshots, notes/version015. One fresh review and confirmed fixes. Local focused cases and exact-source package5smokes; comprehensive final-head CI in standard push/PR workflows. DraftPR20with exact refs/results/limits/download. No third unchanged full-platform local run or weakened gate.

## Review focus
Paused high-priority sites and reset; ties and real baseline comparison without mutating actual employment; current forecast versus last measured production; no false service-loss claim for a still-half-staffed service; invalid flags/defaultless old saves; focus on changed/removed/disabled controls; live shortage warning is not hidden automatic policy; older-version rejection of priority-bearing saves is documented.
