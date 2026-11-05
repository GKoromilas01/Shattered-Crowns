# A Living, Prosperous City Implementation Plan

> Use superpowers:executing-plans inline with TDD and one fresh whole-branch review. Owner already authorized implementation and routine choices; no repeated handoff approval.

**Goal:** Make the existing city economy legible and actionable without changing its rules.
**Architecture:** Reuse engine snapshots/workplace operations; add small presentation controllers to existing City Life and building inspector. Test-only time acceleration drives real game ticks; no new runtime subsystem or save fields.
**Tech Stack:** Current self-contained HTML/CSS/Canvas/JS; Node24, Playwright1.57; no dependencies.
**Spec:** `docs/superpowers/specs/2026-11-05-living-prosperous-city-design.md`.

## Global Constraints

- PR25 remains unchanged/unmerged; M19 stacks on exact2c37c78. No deploy/spend/major architecture change.
- Existing workplace operations are the single source of truth. Preserve food-first default, rules, rates, save schemas1–4, camera/selection/construction/roads/audio.
- Real simulation data only; no fictional weekly income, Smithy/Coin/upgrades, new industries, warfare or multiplayer.
- 30 minutes means1800 simulation seconds. Guided routes gather/build legitimately; diagnose script mistakes before declaring economic defects.

## Review Focus

- Inspection, held Space/pointer actions and stale targets must not change unit orders, double-activate or lose focus.
- New presentation may not compound the existing shared reserve into multiple independent inventories or invent unmeasured sales/trends.
- Restoring any schema/origin must clear stale IDs, keep Pause and preserve policy/priority and gathering references.
- Responsive panels and hover must not overlap essential controls or pan the city behind the UI.
- Unmanaged food deficits and insufficient resources are legitimate states, not reasons to alter economic formulas to satisfy scripted goals.

### Task1: Establish measurements and pilot legitimate growth

Files: new `tests/support/living-city.cjs`, `tests/city-balance.test.cjs`; evidence in ignored `work/m19/`.
Interfaces: consumes existing `scCampaign.start`, `scCityEconomy.snapshot`, `scCitySave.capture/restore` and native construction/gathering. Test helper exports launch/server/game/advance/point/build/gather/conserved; no production API needed.
- [ ] Write baseline characterization per origin: advance normal ticks in five-second cycles to1800s; capture measured flow/storage/workforce/people/prosperity and assert conservation, finite bounds and peaceful state. Save/restore at checkpoints; no fake stocks/pop/buildings.
- [ ] Pilot one origin, measure wall-time and classify observed no-intervention outcome; expand all5 only after runtime is viable.
- [ ] Add guided resource-funded route per origin with30min ceiling, higher population, occupied upgraded housing and final5min without shortfall. Guard construction with actual costs/placement and worker-funded resources; failures identify route versus engine.
- [ ] Run focused `CHROMIUM_PATH=/usr/bin/chromium node --test tests/city-balance.test.cjs`; expected all tested invariants pass; ledger evidence and commit. These characterize existing behavior; do not invent production changes for a forced RED.

### Task2: Governor overview and Advisor

Files: `index.html` presentation block/guard; new `tests/governor-dashboard.test.cjs`.
Interfaces: model consumes existing economy snapshot; engine `scCityEconomy.inspect(id:number):boolean` safely sets inspected owned building without orders/camera mutations. UI `scGovernorUI.refresh()` and `scGovernorUI.model()` expose presentation for tests, no save fields.
- [ ] RED: missing `#scGovernorOverview` actual four cards, measured/unmeasured reserve copy, max3 actionable reports, data unchanged after refresh; native Space and held click work across live updates.
- [ ] Implement persistent DOM cards/actions inside existing City Life, before current sections. Figma3:27 tokens/layout adapted to existing panel; real snapshot fields and deterministic priorities. Link to existing section or explicit inspect/locate; no auto pan/spend. Add inspect API with current owned/active guards and tests invalid IDs/overview/title.
- [ ] GREEN dashboard tests at390/1366/1440, inspector targets destroyed/restored safely, focus/scroll/Pause/units unchanged; commit.

### Task3: Five building panels

Files: `index.html` existing `#scCityInspection` extension/styles and native interactive guard; new `tests/building-panels.test.cjs`.
Interfaces: consumes Task2inspect API and existing `setWorkplaceOpen`, `setWorkplacePriority`, `setTradePolicy`, `locate`, snapshot. No alternate allocation/eligibility algorithm.
- [ ] RED: farm/fishery/granary/bakery/market panel actual staffing/output/blockers; toggle workplace exactly once through existing operation; priority risk and city-wide export scope visible; old house/Keep inspection retained.
- [ ] Implement persistent controls in current inspector; data from matching snapshot building/site/flow. Shared physical storage stays after pause; conditional sales only when exposed. Stable nodes support held Space/pointer; hide controls for other buildings and invalidate stale IDs after load/restart/destruction.
- [ ] GREEN native selection plus all5types, reversal, save compatibility, tablet/phone focus/hit-test and no camera hover/pan. Existing City Life remains reachable; commit.

### Task4: Verification and review handoff

Files: extend balance/UI tests as evidence dictates; `release.json`, sourcecreatedWith, intended current-version assertions only; MILESTONE19/release notes/verification/screenshots.
- [ ] Complete1800s baseline+guided matrix, checkpoint continuation comparisons and bounded shortage/overflow/priority/service recovery; legacy fixtures remain unchanged. Classify any true balance correction and seek review before material rule change.
- [ ] Update0.19.0 metadata without schema changes; render real screenshots against Figma3:27/3:68. No schematic scene assets or future features.
- [ ] Fresh read-only whole-branch code review; one confirmed Important/Critical fix pass with RED/GREEN. Record limitations and all deferred findings.
- [ ] Run final full regressions, exact-source build/hash verification and5packaged smokes. Push only feature branch; draft PR stacked on M18, exact-head CI and verified candidate. Do not rerun unchanged broad suites unnecessarily; do not merge/deploy.
