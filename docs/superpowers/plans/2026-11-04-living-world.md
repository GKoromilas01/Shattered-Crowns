# The Living World Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Deliver a useful illustrated world/region atlas without changing the city simulation.
**Architecture:** Extend the existing inline kingdom controller and modal; immutable continent/kingdom/settlement/landmark catalog separate from transient UI selection. Reuse campaign IDs and lifecycle.
**Tech Stack:** HTML/CSS, original SVG, vanilla JS, Node24, Playwright1.57.
**Spec:** docs/superpowers/specs/2026-11-04-living-world-design.md

## Global Constraints
- No backend, dependencies, payments, deployment or merge.
- Existing city and audio behavior; save schemas 1/2 and five saved settlement IDs unchanged.
- v0.9.0 metadata; original inline deterministic art.

## Review Focus
- Keyboard focus survives periodic readiness refresh; world controls cannot trigger city hotkeys.
- Browse/return while city running or paused keeps previous Pause/camera/selection/resources.
- Restore/restart while atlas is open closes it and clears transient continent/landmark state.
- Small maps avoid marker overlap and remain usable without horizontal page scrolling.
- Future regions must not pretend to load, travel or change the governor's home.

### Task 1: Atlas and navigation
**Files:** index.html (kingdom styles/controller only), tests/world.test.cjs.
**Interfaces:** Existing scCampaign status/selectLocation/setOverview and scKingdomUI open/close remain. Add scWorldAtlas frozen catalog and scKingdomUI.openWorld(). Catalog has continents/kingdoms/settlements/landmarks with stable IDs and parents.
- [ ] Write browser tests for real continent→kingdom navigation, landmark inspection, focus continuity and city-state preservation.
- [ ] Run tests against v0.8.1; confirm missing atlas/controls fail.
- [ ] Implement catalog, original SVG maps, responsive markers, list/legend, scoped inspection and navigation using existing modal lifecycle.
- [ ] Run new world and existing kingdom tests. Inspect screenshots and fix actual problems.
- [ ] Commit coherent implementation and tests.

### Task 2: Release and evidence
**Files:** release.json, index.html createdWith, tests/planning.test.cjs expected current version, docs/MILESTONE9.md, RELEASE_NOTES.md, docs/screenshots/m9-*.png, docs/validation/m9-verification.md.
**Interfaces:** Task1 atlas UI, existing release.cjs build/verify/Git-source verification.
- [ ] Add compatibility/restore and responsive tests before changing metadata; retain all original assertions.
- [ ] Set 0.9.0 metadata and document boundaries, screenshot desktop/world/mobile.
- [ ] Run full regression suite, review final diff, address confirmed important findings with failing-then-passing tests.
- [ ] Commit; build/verify exact source and smoke-test package.
- [ ] Push feature branch, create PR with evidence/screenshots/download, inspect CI. Do not merge/deploy.
