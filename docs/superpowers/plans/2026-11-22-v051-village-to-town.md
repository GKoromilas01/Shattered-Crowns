# From Village to Town Implementation Plan

> REQUIRED SUB-SKILL: execute inline using superpowers:executing-plans, preserving the existing native method and one fresh final whole-branch review. Owner explicitly asked to proceed with the implementer's proposed next version.

**Goal:** Earned Town recognition unlocks a real repeatable mixed-cargo progression.
**Architecture:** Authoritative growth state/transactions inside simulation scope, source-embedded as src/v051/growth-engine.js; existing supplier terms/yard/cargo/history extended rather than duplicated. Native presentation in src/v051/presentation.js consumes snapshots only.
**Tech Stack:** Existing JS/Canvas/DOM, strict JSON saves, Node/Playwright.
**Spec:** ../specs/2026-11-22-v051-village-to-town-design.md

## Global Constraints

- Costs/criteria/terms fixed by spec; routine balancing may change only with documented evidence.
- No assets, schemas1–11 invention, duplicate cargo slot, new autoproduction, main push, merge or deployment.
- Keep v0.50 and paid media intact; new GUI inside native inspectors/panels, keyboard/held-restore protection.

## Review Focus

- Same-city restore while Space/pointer held must not claim/deduct/send against restored state.
- New order history and yard eligibility validate from incoming schema12 state; forged/reordered/double rewards rejected atomically.
- Current eligibility uses actual staffing/food/service state, not stale measured success alone.
- Claim is permanent but not a tax/food reward; no town on legacy/new city until explicit valid payment.
- Save before/after each journey phase, Pause/atlas/hidden-tab, cancellation and legacy crowded plots remain correct.

### Task1: Authoritative charter, mixed order and schema12
Files: src/v051/growth-engine.js, src/v026/trade-town-engine.js, minimal native save/init hooks, embed-v026, tests/growth.test.cjs.
Interfaces: scGrowthSnapshot(), scGrowthClaim(), scGrowthPrepare(q,data); window.scSettlementGrowth.{snapshot,claim}; new cargo kind town-mixed in existing scTradeTown dispatch.
- [ ] RED tests: eligibility failures/fresh check, exact one payment, permanent claim, ordinary/legacy no progress; actual reservation/shared-slot mixed send/return; schema12 validation atomicity and all journey phases.
- [ ] Implement; GREEN existing trade/frontier/envoy/save terms plus new tests. Commit.

### Task2: Native controls and atlas tier
Files: src/v051/presentation.js, minimal atlas display hooks, tests/growth-ui.test.cjs.
Interfaces: consumes Task1 snapshot/claim and native trade APIs; no economic writes outside these transactions.
- [ ] RED real Keep claim, Market reserve/send/yard, status/atlas, keyboard/narrow, held input across restore.
- [ ] Implement stable focus-preserving controls; GREEN focused native UI regressions. Commit.

### Task3: Playable candidate and independent CI
Files: release metadata, MILESTONE51/handoff/tester steps/validation, packaged artifact and draft PR.
- [ ] Resource-funded normal-clock walkthrough distinguished from accelerated fixtures; media/source integrity and packaged smoke.
- [ ] One fresh most-capable final review; fix Important/Critical with targeted evidence.
- [ ] Feature PR discloses PR73 dependency; full final-head CI once, no repeat unchanged polling/runs; no merge/deploy.
