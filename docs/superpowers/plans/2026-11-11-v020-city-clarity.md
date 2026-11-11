# v0.20 city clarity implementation plan

> Execute inline using executing-plans and TDD. Owner explicitly delegated routine choices and authorized proceeding without another design approval.

**Goal:** Make city status, next action, saves and workplace controls easy to find.
**Architecture:** Extend existing Governor and save controllers and Employment table; keep the existing simulation and renderer.
**Tech Stack:** Single HTML/Canvas, CSS, Node24, Playwright1.57.
**Spec:** docs/superpowers/specs/2026-11-11-v020-city-clarity-design.md

## Global Constraints
Remote-main base8128e17; dedicated feat/v020-city-clarity. Preserve all saves, orders, rates, maps, audio and peaceful behaviour. No external assets, new dependency, payment/ads or deployment. No automatic CI polling.

## Review Focus
Stale report targets after restore; held Space/pointer across refresh; storage failure while Menu hidden; downloaded export vs browser time; travelling/paused builders must not produce false stalled warnings.

### Task 1: Opening hierarchy and workplace discovery
**Files:** index.html Governor controller and cityEconomyPresentation; tests/city-clarity.test.cjs.
**Interfaces:** scGovernorUI.model/refresh, scConstruction.snapshot/scConstructionUI.open, scCityEconomy.inspect and existing section navigation.
- [x] Add browser regressions for urgent food/housing/construction order, unmeasured state, unchanged orders/Pause, stable held action, stale target and workplace inspection from Employment; watch new requirements fail.
- [x] Put report before statistics, compact cards, add status and secondary disclosure, add construction review and validated Employment Inspect; preserve existing controls and focus/scroll.
- [x] Run new and Governor/workplace/construction/Advisor/layout/planning regressions; inspect phone/desktop.

### Task 2: Unmistakable saves and restrained visual polish
**Files:** existing save controller/render and UI styles, tests/city-clarity.test.cjs, release.json, README and release notes.
**Interfaces:** scSavedCity.save/info/exportText and new status events, existing checkpoint keys unchanged.
- [x] Test visible manual success/failed storage, unchanged browser time on export, actual download event, load/unfinished assignments and held-input safety at390/1440. Run failing new tests first.
- [x] Add City Life browser-save status/actions and visible feedback from existing save events; clarify export labels and actual outcome. Style report/surfaces/focus; no renderer change.
- [x] Record v0.20 metadata and backlog/research applications. Run affected save/audio/UI regressions, full npm test and screenshot inspection.
- [x] Obtain one independent whole-branch review, fix important reproduced issues, commit exact source, build/verify package and five packaged smokes. Push/PR completion is recorded in the execution ledger and PR; keep main/production unchanged.
