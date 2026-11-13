# First Charter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Deliver the approved optional Brookstead opening chapter on a feature branch with saved history and verification evidence.

**Architecture:** Keep the offline single-file Canvas game. Add a bounded chapter controller to the existing engine, observe real economy cycles, and render through existing Advisor/Chronicle containers. Extend the strict checkpoint validator to schema 6; no second economy or independent history store.

**Tech Stack:** Existing HTML/Canvas/JavaScript, Node 24, Playwright 1.57.

**Spec:** `docs/superpowers/specs/2026-11-13-first-charter-design.md`

## Global Constraints
- One optional new-game Brookstead chapter; other starts unchanged.
- Existing costs, construction speeds, gathering, staffing and save schemas 1–5 remain intact.
- No merge or deployment without separate approval; PRs #23/#24/#26/#29/#30 untouched.
- Six consecutive five-second food cycles, four-demand-cycle reserve, no shortage.
- Chapter/outcome persistence uses schema 6, with explicit older-client limitation.

## Review Focus
- Restoring the same city during a held input must invalidate the old choice activation (Task 3).
- Cancel/Undo/rebuild must not count foundations or duplicate the historical outcome (Tasks 1–2).
- An empty construction array in schema 6 must remain valid after all projects finish (Task 2).
- Snapshot/UI refresh while paused must never advance food cycles (Task 1).
- Legacy save import must not enroll a chapter or carry the previous city's outcome (Task 2).

### Task 1: Bounded chapter progression
**Files:** Modify `index.html`; create `tests/first-charter.test.cjs`.
**Interfaces:** `scFirstCharter.begin(): boolean`, `.choose('granary'|'garden'): boolean`, `.snapshot(): object|null`; internal cycle observer consumes `citySnapshot()`, owned buildings and stable IDs. State stores start ID boundary, home ID, food streak, choice ID boundary and optional outcome.
- [x] Write failing browser cases for opt-in gate, no progression from old homes, six measured cycles, zero resource changes on choice, and both actual construction outcomes.
- [x] Run `CHROMIUM_PATH=/usr/bin/chromium node --test tests/first-charter.test.cjs`; expected RED for missing controller.
- [x] Implement controller with real cycle observation and one historical outcome; do not change game rates.
- [x] Run focused cases; expected GREEN. Commit engine/test unit.

### Task 2: Atomic schema-six checkpoints
**Files:** Modify `index.html` and `tests/first-charter.test.cjs`.
**Interfaces:** Existing `scCitySave.capture/validate/restore`, schema 6 state.chapter; schema 6 supports existing construction/site references including an empty array.
- [x] Write failing round-trip tests before decision, during work and after outcome; reject inconsistent/unknown chapter data atomically; legacy fixtures remain unenrolled.
- [x] Implement strict validator/capture/restore integration, preserving old schema paths and all build orders.
- [x] Run chapter and construction/save tests; expected GREEN. Commit persistence unit.

### Task 3: Optional entry, objectives and saved Chronicle
**Files:** Modify `index.html`, `release.json`, `RELEASE_NOTES.md`, `README.md`; add `docs/MILESTONE23.md` and `tests/first-charter-ui.test.cjs`.
**Interfaces:** Opt-in checkbox in home chooser; chapter actions call Task 1 controller; History displays Task 2 outcome using textContent; restore/start events invalidate held activation epochs.
- [x] Write RED UI tests for opt-in only at Brookstead, absent sandbox state, actual goals/costs, native keyboard choice, held-input restore protection and history survival.
- [x] Implement persistent DOM controls within Advisor/History, accessible status and understated visuals. Version source/package consistently to 0.23.0; explain downgrade limitation.
- [x] Run focused chapter/UI/legacy control suites; expected GREEN. Commit presentation/docs.

### Task 4: Evidence and feature PR
**Files:** Add `docs/validation/v023-first-charter.md` and chapter route evidence/tests.
- [ ] Exercise both branches with real gathering/native construction, record earned/spent resources and game/wall time without claiming an accelerated fixture is human play.
- [ ] Run `CHROMIUM_PATH=/usr/bin/chromium npm test`, build/verify exact source and packaged smoke; report every failure and selective rerun separately.
- [ ] Review whole branch; correct substantive findings with reproductions; commit frozen candidate/evidence.
- [ ] Push feature branch and open draft PR with exact-head evidence and independent CI gate. Inspect CI once, leave merge/deployment to separate owner approval.

## Execution rulings
Owner already approved scope and requested implementation plus PR. Execute inline without another method-selection pause. Use the exact-main successful 418/418 CI baseline already verified in this session instead of repeating an unchanged hour-long baseline. All feature verification remains required.
