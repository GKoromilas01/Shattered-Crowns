# City Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Implement issue #7 with consequential, readable services and bounded citizen satisfaction.
**Architecture:** Extend the five-second engine in index.html; share a service resolver between housing, feedback and satisfaction. Preserve the measured food ledger and every control.
**Tech Stack:** Existing JavaScript/HTML, Node 24, Playwright 1.57 Chromium.
**Spec:** docs/superpowers/specs/2026-11-02-city-services-design.md

## Global Constraints

- Released base 3843329a6297f6d40837f6cd8e01e88e246c2ba0; separate feature branch.
- Keep 67 tests, roads/controller bytes, staffing priorities, food arithmetic, costs, housing timers, migration rules and release permissions/guards.
- No merge, deployment or production configuration without Giannis approval.
- CI green before PR; screenshots/errors captured by existing helper.

## Review Focus

- An operational farther provider must override a nearer broken provider; exact 190/135 boundaries remain strict.
- Vacant homes must not pretend to house residents or consume citizen service satisfaction.
- Current supply must not overwrite measured last-cycle delivery; preserve all food identities.
- Factor and ration/event changes must remain explainable, bounded and recoverable; no second happiness accumulator.
- Focus, camera blocking, minimap separation and no repeated full-city snapshot in inspector frames.

### Task 1: Shared service resolution and satisfaction engine

**Files:** index.html; new tests/services.test.cjs.
**Interfaces:** cityHomeService(type,home,context) -> {status,providerId,message,range}; citySatisfactionDetails(context) -> {score,target,factors,modifier,last}; snapshot houses.services and satisfaction, provider service status.

- [x] Add failing Chromium cases for service states/boundaries/provider fallback, factor arithmetic and five-second deltas, food/migration response, ration modifiers and explicit festivals. Inject clock/fixtures only in served tests.
- [x] Run the new file against baseline: failures must identify missing service/satisfaction state.
- [x] Implement shared resolver; derive houseTier from the same service result. Apply target on the existing cycle without changing ledger code. Expose last applied transition and reset it in init.
- [x] Run new cases and original economy/Living City regressions; investigate failures before changing code.

### Task 2: Service feedback and sustained recovery

**Files:** index.html; tests/services.test.cjs; docs/MILESTONE5.md; release.json/notes/README.
**Interfaces:** existing inspector and City Life use snapshot services/satisfaction; Advisor stays engine-owned.

- [x] Add failing UI/Advisor, pause/reset and 300-second shortage/recovery scenarios, including narrow layout/focus.
- [x] Implement concise service messages and existing-panel satisfaction table; preserve measured/current distinctions and optional Advisor behavior. Document tuning and existing systems retained.
- [x] Run all new tests, capture representative screenshots and errors; run entire npm test suite until green. Bump release to 0.5.0.

### Task 3: Reviewed candidate and CI before PR

**Files:** .github/workflows/chromium-regressions.yml; new guard test in tests/services-ci.test.cjs; docs/verification notes.

- [x] Add/run failing guard proving feature pushes verify while release remains main-only/manual/protected. Add feat/** to existing read-only verification push trigger; leave release workflows unchanged.
- [x] Request independent whole-branch review, fix important findings with reproductions, rerun full suite.
- [ ] Commit; build/verify exact candidate; run packaged smoke. Push feature branch and wait for full/packaged/live required CI green before creating PR.
- [ ] Create PR with exact results, screenshots and risks. Check PR CI too; never merge/deploy.
