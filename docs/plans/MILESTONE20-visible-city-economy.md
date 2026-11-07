# Milestone 20 proposal — Visible City & Meaningful Choices

**Status:** design/planning only; no implementation, merge or deployment authorized by this document.
**Parent:** M19 draft PR #26; M18 draft PR #25 must be integrated and verified first.
**Branch baseline:** M19 documentation commit `bcf82880fd12bbb83a78183d2021f03555d8b3ea`. The parent M19 branch currently lacks the later M18 documentation commit; synchronize before coding.

## Player goal

Make a city feel active and legible while preserving Caesar III-style construction/economy as the primary game. The player should see who is working, where food is going, why a household cannot grow, and what reversible action can help.

## Proposed scope (one meaningful milestone)

1. **Visible activity, grounded in simulation.** Reuse existing worker/household counts and current building state to display lightweight movement or activity cues near farms, fisheries, granaries, bakeries and markets. Do not create simulated people, production or resource transfers independent of the economy. Throttle and cull animation for mobile.
2. **Food-flow explanation.** A compact, optional city report showing current production, shared storage, consumption, reserve and exports, with time bases/units explicitly identified. Never present instantaneous snapshots as forecasts or invented history. Connect problems to real buildings.
3. **Actionable household growth.** Explain the actual requirements for the next resident/household upgrade (food, housing, services, employment, happiness where applicable). Point to the relevant existing building or planning tool. Do not silently rebalance economic formulas.
4. **Small reversible choices.** Expose existing pause/open, workplace priority and export/reserve actions at their natural points; avoid new currencies, upgrades or additional global menus. Use the existing engine operations and save format.
5. **Advisor and accessibility.** Show at most three prioritized, evidence-backed issues, keyboard-operable actions and visible focus. Support phone 390×844, short desktop 1366×606 and 1440×900 without covering map/controls.

## Explicit non-goals

No combat overhaul, diplomacy, multiplayer, independent simulation of 123 informational settlements, new industries, new paid dependencies, changed 3×3 road behavior, invented coin/treasury trends or incompatible save schema.

## Acceptance tests — required before owner review

- All five playable origins; at least 30 simulated minutes each of baseline and resource-funded growth, with before/after food, population, storage, production and service evidence.
- No creation or loss of food/gold/wood/stone outside existing accounting; paused workplaces and exports behave exactly as current engine rules dictate.
- Existing save schemas 1–4 load; same-city restore cancels held actions and refreshes visual indicators; checkpoint continuation matches a non-reloaded reference.
- Existing unit selection, construction↔units, camera drag/edge scrolling, fullscreen, 3×3 roads, native Space and pointer controls remain unchanged.
- No duplicated residents, phantom workers, unbounded DOM nodes or uncontrolled animation when speed changes, tabs are hidden or a save is loaded.
- Phone/desktop visual and keyboard focus tests; no UI overlays block important controls.
- Full locked Node.js 24 + Playwright 1.57 suite, packaged smoke tests, exact-head CI and independent review. Attach genuine screenshots, performance notes and reproducible test commands.

## Implementation order

A. Inspect and document current economy APIs, UI rendering, save hooks and tests; identify actual metrics and constraints.
B. Write failing behavioral tests for visibility and report correctness before game changes.
C. Implement one vertical slice: food-flow report and actionable household constraint; run focused checks.
D. Add restrained activity cues only where backed by real simulation; measure mobile performance.
E. Run full regression, packaged smoke and five-origin long-run matrix; review and document any failures.
F. Open a **draft** PR only after evidence exists. Never merge or deploy without separate owner approval.

## Dependencies and release gates

M18 PR #25 and M19 PR #26 remain separate, unmerged draft PRs. Reconcile M19 with M18 and verify new-head CI before implementation or integration. This planning branch is intentionally isolated and is **not** a release candidate.
