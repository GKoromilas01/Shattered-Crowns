# Clearer Trade Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task. Owner approved implementation inline; no additional design approval required.

**Goal:** Deliver approved v0.25 follow-up and clarity without duplicate spending or rewards.
**Architecture:** Extend existing private regional controller, strict checkpoint preparation and shared trade presentation in self-contained index.html. Keep fixtures and clock helpers in tests.
**Tech Stack:** Native JS/HTML/Canvas; Node24; Playwright1.57; pinned Chromium CI.
**Spec:** docs/superpowers/specs/2026-11-14-clearer-trade-design.md

## Global Constraints
Base73939ea; no merge/deploy; no dependencies/new settlements/mobile/physical units. First40wood→36stone unchanged. Followup20wood or15gold→18stone,60+60game seconds. Sayings12readable+1fade; receipts12readable, highest notification priority. Strict schema8 accepts1–7. Native controls and original graphics preserved.

## Review Focus
- Loading completed7 must unlock later offer without historical reward/receipt replay (Task1).
- Restoring while a different control holds Enter/Space must not dispatch (Task2).
- Hidden tabs and menus must not consume readable time or steal focus (Task2).
- Insufficient gold/wood or Market loss before dispatch must not mutate resources (Task1).
- Actual paid construction/gathering and duplicate checkpoints must conserve both payments and rewards (Task4).

### Task 1: Transaction, receipt and strict checkpoint
Files: index.html, tests/caravan.test.cjs, tests/caravan-followup.test.cjs, tests/support/caravan.cjs.
Interfaces: existing scCaravan.dispatch()/snapshot(details=true); new dispatchFollowup(choice:'wood'|'gold'):boolean, acknowledgeReceipt(id):boolean; snapshot adds gold,followup,receipts. Regional version2 records followup and immutable completion receipts; scRegionalPrepare handles1→2 migration.
- [ ] Write failing controller tests: first credit36 once, followup two exact costs/reward18 once, Later/read no mutations, insufficient resources, Market loss return, all phases restore, malformed fields reject atomically, legacy7 completed no receipt replay.
- [ ] Run CHROMIUM_PATH=/usr/bin/chromium node --test tests/caravan-followup.test.cjs; expect missing followup/schema8 failures.
- [ ] Implement controller and strict schema8; preserve old schema capture behavior until new regional event.
- [ ] Run new controller plus unchanged caravan and legacy/chapter checks; expected0failures. Commit.

### Task 2: Readable prioritized notifications and shared followup UI
Files: index.html, tests/caravan-ui.test.cjs, tests/caravan-followup-ui.test.cjs.
Interfaces: Task1 snapshot/dispatchFollowup/acknowledgeReceipt; existing scCaravanUI.open().
- [ ] Write failing tests for13second saying/12second receipt, obstruction/hidden-tab priority, factual+36/+18, next offer, two resource buttons, Later, no payment on display, held gesture across restore.
- [ ] Run focused UI tests; expect failures for missing receipt/followup and timing.
- [ ] Implement receipt presentation separate from payment, suspend unread timers, Market action/status near heading and shared choice panel; include new buttons in physical gesture guard.
- [ ] Run UI+building controls; expected0failures. Commit.

### Task 3: Worksites access and shortcuts
Files: index.html, tests/construction-management.test.cjs or matching existing suite, tests/keyboard-help.test.cjs, docs/MILESTONE25.md.
Interfaces: existing scConstructionUI.open()/inspector foundation APIs; native Help details.
- [ ] Audit actual key handlers and write behavior tests for listed keys/context and retained Worksites entry points, with missing disclosure/front duplicate failing first.
- [ ] Remove only front Worksites entry; retain actual buttons/actions elsewhere. Add audited concise keyboard disclosure.
- [ ] Run construction and keyboard/help tests; expected0failures. Commit.

### Task 4: Funded routes and release validation
Files: tests/caravan-funded-route.test.cjs, docs/validation/v025-clearer-trade.md, docs/MILESTONE25.md, release.json, README/release notes.
Interfaces: Task1 transactions/Task2 public UI; existing paid-route helper and release package scripts.
- [ ] Extend actual resource-funded routes to both followup choices and save phases, nonempty conserved ledgers; no resource grants in playability evidence.
- [ ] Run funded routes, focused regression and pipeline; document actual results/limitations. Increment0.25.0 and parse scripts/diffcheck.
- [ ] One fresh whole-branch review; reproduce/fix Important findings, no automatic merge.
- [ ] Commit/push feature PR, clean full pinned CI on exact final head, build/validate/package smoke, screenshots/artifact and playtest guide. Pending/skipped/cancelled never count as pass.
