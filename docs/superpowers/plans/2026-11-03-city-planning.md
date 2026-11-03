# City Planning Implementation Plan

> Execute inline using superpowers:executing-plans; request one whole-branch review after verification.
> Publication/check results after the source commit are recorded in the associated PR. Inspect that PR and branch history before resuming unchecked release steps; an unchecked source-document box does not imply missing active work.

**Goal:** Make city bottlenecks easier to understand and find without changing balance.
**Architecture:** Extend cityEconomyPresentation using scCityEconomy.snapshot(); add a read-only location method beside that API. Keep simulation/renderer/roads/audio unchanged except a separately reproduced bug fix.
**Tech Stack:** Existing single HTML/JS, Node 24, Playwright Chromium.
**Spec:** docs/superpowers/specs/2026-11-03-city-planning-design.md

## Global constraints
Preserve existing controls, roads, saves, peaceful mode and gentle ambience. No merge/deploy/spend. No new dependencies.

## Review focus
- Food summaries use the last cycle's demand, not current-population demand; overflow and shortage remain separate.
- Zero homes, zero jobs and pre-cycle states do not claim successful supply.
- Locate handles destroyed/stale buildings and non-default zoom without spending or changing selection/placement/Pause.
- Live refresh retains keyboard navigation/Locate focus and expanded details.
- All controls and summary cards fit 390/768/1440 widths.

## Task 1: Verify M7 and fix confirmed bugs
- [x] Run unmodified full suite and inspect failures.
- [x] Reproduce preview-control inconsistency with a regression; make minimal fix only if confirmed.

## Task 2: City planning panel
Files: index.html, tests/planning.test.cjs.
Interfaces: scCityEconomy.locate(id) -> boolean; returns false for stale/non-owned IDs without changing state; true centers live building at current zoom. Presentation consumes existing snapshot only.
- [x] Write/run failing browser tests for summary arithmetic, empty/overflow/shortage states, responsive navigation and live-focus retention, location and state preservation.
- [x] Add responsive summary cards, stable section navigation and Locate buttons using existing palette.
- [x] Run targeted browser tests and all existing regressions.

## Task 3: Review and release candidate
Files: docs/MILESTONE8.md, README.md, RELEASE_NOTES.md, release.json.
- [x] Document final behavior/limits and set v0.8.0.
- [x] Review full branch; fix confirmed important findings with reproductions.
- [x] Run full suite (141/141).
- [ ] Build/verify candidate and packaged smoke on committed source; results are recorded in the PR.
- [ ] Push feature branch and create PR with evidence; leave unmerged/undeployed.
