# Settlement Cinema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Consistent cinematic subtitles and useful building-local road/readiness controls, with explicit pending Leonardo media.
**Architecture:** Existing source bundles, scoped engine bridge for exact road plans, separate inspector presentation. Existing engine is authoritative; no duplicate economy or save state.
**Tech Stack:** Browser JavaScript, generated single-file HTML, Node tests and Playwright.
**Spec:** docs/superpowers/specs/2026-11-28-settlement-cinema-design.md

## Global Constraints
No main push, merge or deployment. No new generated assets or credits spent. Preserve existing story prose, simulation costs and save format. Private Mode ON for future Leonardo media.

## Review Focus
- Blocked paths: no partial road purchase or misleading connected state.
- Restored city / changed selection: invalidate prepared connection before spending.
- Panel input at viewport edge: no map pan or page scroll.
- Caption readability: same computed italic font/size/transparent surface across both players.
- Missing clips: retain cards; do not mark unseen video milestones complete.

### Task 1: Video typography
Files: src/v050/intro.js, src/v062/first-scenes.js, tests/settlement-cinema.test.cjs.
- [x] Add browser assertions for opening/achievement caption and subtitle computed style; run RED.
- [x] Use Georgia Italic 22px/1.5, ivory, shadow, transparent background in both players; preserve prose and timing.
- [x] Regenerate bundle; rerun targeted cinematic tests GREEN; commit.

### Task 2: Inspector roads and settlement needs
Files: src/v069/settlement-engine.js, src/v069/presentation.js, scripts/embed-v026.cjs, tests/settlement-cinema.test.cjs.
Interfaces: scSettlementAccess.plan(id) returns {id, cityId, cost, blocked, points, start, target} or null; connect(id, expected) revalidates exact prepared route and current city/selection. Inspector consumes city economy snapshot.buildings blockers/staff and existing winter/growth checks.
- [x] Add failing tests for inspector-only button, preview/confirm, insufficient stone, blocked route, stale plan, unchanged viewport, and Keep live checks.
- [x] Replace legacy floating-button source via build script; expose guarded road bridge in engine scope. Mount stable inspector panel outside rerendered menus; route schematic uses real plan coordinates.
- [x] Add read-only Needs and Keep next-goal sections; refresh existing facts without bonuses or new saves.
- [x] Run focused road/menu/winter tests GREEN; commit.

### Task 3: Media briefs and handoff
Files: docs/MILESTONE69.md, docs/LEONARDO_V069.md, docs/HANDOFF.md, docs/CONTINUATION.md, RELEASE_NOTES.md, src/v052/tester-steps.js.
- [x] Record approved title/subtitle pairs, 6–7s clip briefs and 120s instrumental anthem prompt, generation cost/privacy checks, pending status.
- [x] Add tester instructions; document exact implementation, checks and missing media for Claude/other AIs.
- [x] Generate bundles; run focused suite, quick checks and package verification, review diff; commit and open PR without merge/release.

Execution ruling: use one integrated candidate commit because the generated single-file bundle contains both presentation tasks; retain separate source modules/tests. Full-suite/remote CI and real media approval remain pending; checked task items mean implementation and focused checks, not release approval.
