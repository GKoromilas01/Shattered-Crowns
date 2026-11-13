# First caravan implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** One paid Ironmere shipment, Market/City Life offer access, and saved non-pausing milestone sayings.
**Architecture:** Extend the existing inline city engine with one transaction/state controller and strict schema 7 preparation. A separate inline presentation controller reads snapshots, acknowledges notices and routes both entry points to the same panel. Preserve the existing self-contained three-file release package.
**Tech Stack:** Existing HTML/Canvas/JavaScript, Node24, Playwright1.57; no new dependency.
**Spec:** docs/superpowers/specs/2026-11-13-first-caravan-design.md

## Global Constraints
- Base 77690e89b3417730eb648400fcffd2b8caa70410; feature branch only; no merge/deploy.
- Terms 40 wood for 36 stone; 60 outbound + 60 returning game seconds; one shipment per city.
- Existing trade baskets, construction/gathering rates, staffing and other starts unchanged.
- Sayings seven visible wall-clock seconds, no pause/focus/control interference, reduced motion supported.
- Schema 7 preserves nullable chapter and regional state; legacy 1–6 loading remains unenrolled and honest.

## Review Focus
- Held Space/Enter/pointer activation across restore must not launch a new city's shipment.
- Save at an exact return boundary must never pay twice or discard escrow prematurely.
- A new offer arriving during a saying or modal cannot stack or silently mark unseen text displayed.
- Legacy completed chapter saves must preserve history without fabricating past sayings.
- Both UI entrances must remain usable with market loss, insufficient wood, Pause and atlas inspection.

### Task 1: Transaction controller and persistence
**Files:** index.html; tests/caravan.test.cjs; tests/support/caravan.cjs; existing schema assertions where new peaceful starts intentionally change to 7.
**Interfaces:** scCaravan.snapshot() returns cloned regional/trade state and current eligibility/reasons; dispatch() returns boolean; notice() and acknowledgeSaying(id) return boolean. Internal scRegionalTick(dt), scRegionalOffer(), scRegionalMilestone(id), scRegionalPrepare(input,data) own all state changes.
- [ ] Write failing browser tests for absent API, offer-on-cycle/not-read, exact deduction, insufficient funds, live readiness loss, phases, no duplicate credit, market loss, origin restriction, restore and corrupt state.
- [ ] Run the new tests and record expected missing-controller failure.
- [ ] Implement the controller, simulation hooks, milestone event hooks and strict schema 7 capture/prepare/restore. New peaceful init queues start; legacy restore queues no old milestones.
- [ ] Update only intentional schema expectations and add explicit legacy round trips so migration coverage remains meaningful. Run controller and chapter/construction/origin regression checks; commit when green.

### Task 2: Offers and milestone presentation
**Files:** index.html; tests/caravan-ui.test.cjs.
**Interfaces:** Reads scCaravan snapshots; guarded native controls call dispatch/notice/acknowledgeSaying. Market inspector and City Life share sc24TradePanel. Chronicle renders saved outcomes and sayings.
- [ ] Write failing tests for automatic offer with Later, both entrances, focus/keyboard and stale-input protection, quiet queued sayings, seven-second fade with no Pause/focus changes, reduced motion, reload-once behavior and narrow layout.
- [ ] Run tests to observe missing presentation failures.
- [ ] Implement compact nonmodal offer, shared trade details, Market/City Life buttons, native activation guards and event/interval-driven rendering. Implement seven-second wall-clock saying overlay with pause-free priority handling and persistent History.
- [ ] Run UI plus existing chapter/UI/Chronicle checks, inspect screenshots, fix observed defects through reproductions, and commit when green.

### Task 3: Playable routes, release evidence and PR
**Files:** tests/caravan-route.test.cjs; docs/MILESTONE24.md; docs/validation/v024-first-caravan.md; README.md; RELEASE_NOTES.md; release.json; index version labels.
**Interfaces:** Standard gameplay gathering/construction + public scCaravan controls; no resource grants or built-city fixtures as playability evidence.
- [ ] Build a resource-funded route to an eligible market and complete the shipment. Assert paid wood, returned stone, preserved household/worker ledgers, reloaded phases, History and both entrances. Test funded checkpoint on other eligible origin; separate accelerated utility tests from normal-clock evidence.
- [ ] Update release version to 0.24.0 and document compatibility, exact terms, controls, approved limits and old-PR priorities without merging/closing them.
- [ ] Run focused and pipeline checks, parse inline scripts and diff-check; run full regression once meaningful source changes stabilize, exact-source package verification and smoke. Retain every observed failure separately from unchanged rechecks.
- [ ] Obtain one fresh whole-branch review, fix blocking findings with RED→GREEN evidence, then publish a feature PR and verify its final head/CI. No merge/deploy. Give owner a playable artifact and concise guide; label any still-pending CI.
