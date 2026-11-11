# Current-main city management implementation plan

> Execute inline using executing-plans. Owner delegated implementation choices; no further design check-in required.

**Goal:** Integrate PR #29 with main after #33.
**Architecture:** Merge the existing feature in an isolated branch; use existing snapshots and commands, keeping construction and renderer authoritative.
**Tech Stack:** HTML/Canvas, Node 24, Playwright 1.57.
**Spec:** docs/superpowers/specs/2026-11-09-city-management-current-main-design.md

## Global Constraints
Preserve original branches, main and production. No rates/costs/dependency/save-schema changes. Preserve schema-five projects and all five origins. No automatic CI polling.

## Review Focus
Unfinished projects absent from operational workplace counts; completed projects inspectable; held activation across restore invalidated; schema-five saves survive Governor actions; phone controls remain unobscured with current graphics/Pause.

### Task 1: Integrate existing city-management work
**Files:** index.html, release.json, existing PR29 tests/docs; new tests/city-management-construction.test.cjs.
**Interfaces:** scGovernorUI.model()/refresh(), scCityEconomy.inspect(id), scConstruction.snapshot()/assign(id), scCitySave.capture()/restore(save).
- [ ] Run current construction baseline plus PR29 integration tests before merge. Expected: construction passes; missing Governor and starvation-checkpoint assertions fail.
- [ ] Merge origin/feat/city-management-advisor-integration with no automatic commit. Retain current main construction/schema-five capture, renderer, Advisor refresh and tests; add Governor/workplace controls and starvation timer bound. Resolve documentation to describe current combined state.
- [ ] Add resource-funded foundation/completion/restore and Governor action coverage at phone/desktop sizes. Run focused suites; reproduce and correct confirmed integration defects.
- [ ] Commit the integrated feature and focused evidence.

### Task 2: Verify and prepare review
**Files:** integration validation report, README, affected tests if pre-feature setup is obsolete.
**Interfaces:** npm test; scripts/release.cjs build/verify; smoke runner.
- [ ] Run full npm test with explicit Chromium and record every failure. Correct genuine compatibility issues with failing reproductions; update obsolete setup using actual construction, keeping behavioral assertions.
- [ ] Inspect phone/desktop screenshots; review whole branch independently and address important defects.
- [ ] Commit exact source; build/verify its package and run all five packaged smoke journeys. Push only new feature branch and open a draft PR with actual results and limitations. No merge/deployment.
