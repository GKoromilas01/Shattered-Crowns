# Measured City Advisor Implementation Plan

> Execute inline with executing-plans and TDD. Owner chose and authorized proceeding; no further design gate.

**Goal:** Explain current city bottlenecks using simulation evidence and direct section navigation.
**Architecture:** Pure snapshot assessment in the existing HTML; replace old priority/outlook presentation with stable DOM cards and existing City Life navigation.
**Tech Stack:** Existing HTML/JS, Node 24, pinned Playwright.
**Spec:** docs/superpowers/specs/2026-11-07-city-advisor-design.md

## Global Constraints
No dependencies, save/balance changes, automatic actions, merge or deployment. Preserve existing renderer/audio and optional Advisor tools.

## Review Focus
- Measured food uses the last cycle even after population changes; overflow is not shortage.
- No first-cycle or zero-job claim of success.
- Voluntarily paused jobs never inflate recruitment advice.
- Updating advice retains focused and pressed controls.
- Navigation preserves city state and reaches visible headings on phones.

## Task 1: Assessment
- [x] Add failing Node tests extracting `cityAdvisorAssessment` from index.html. Cover shortage precedence, balance, overflow, pre-cycle state, housing, open staffing, growth services and healthy state; assert input immutability.
- [x] Implement `scCityAdvisor.assess(snapshot)` returning `{measured, issues:[{id,title,evidence,action,section}]}` with at most three ordered issues.
- [x] Run `node --test tests/advisor-model.test.cjs` to green.

## Task 2: Advisor interface
- [x] Add failing browser coverage for measured evidence, section navigation/state preservation, paused-site advice, live refresh and native activation at phone/desktop widths.
- [x] Replace old priorities/outlook with persistent cards and Review buttons; use current snapshot, omit obsolete advice from displayed output, retain other tools.
- [x] Run focused browser tests, full `npm test`, and release build/verify.
- [x] Document behavior and actual verification; inspect whole diff and leave branch ready for review without deployment.
