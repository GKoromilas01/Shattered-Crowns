# Gameplay Usability & Polish Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans, test-driven-development, systematic-debugging and verification-before-completion. Execute inline with one fresh final review.

**Goal:** Resolve confusing title choices, construction selection and terrain/resource discovery while retaining the existing game.
**Architecture:** Existing vanilla browser game/City Life/world atlas. Replace title native select popups with two visible native-radio home cards and fixed continent/kingdom context. Auto-resolve a living friendly defense worker nearest the plot; retain180unitrange/costs/collision. Clarify world/regional geography and add a guarded return-to-city-resource-board action. No audio score/scheduler, economy, save-format or architectural change.
**Tech Stack:** Existing inline JS/HTML/CSS, Node24/Playwright1.57; no dependencies.
**Spec / design:** This document. Owner explicitly authorizes routine design/coding without repeated approval; scope follows provided M13 priorities.

## Decisions and boundaries
- Native title dropdown interruption is an owner report, not a confirmed Windows reproduction here. Remove that popup interaction path instead of speculatively altering audio gain/score. Verify one AudioContext, unchanged preferences and sustained real graph output through pointer/keyboard choices; physical Windows listening remains a limit.
- Show both real starts (Marches home and Brookstead) prominently. Aurelia/Marches are fixed current scope, not fake multiple choices. Future regions remain inspectable in the atlas, clearly unavailable for governor selection. Only Begin commits a home.
- All construction tools work without manually selecting units. Civilian placement remains council-led. Defenses automatically use the nearest living friendly worker, still requiring one within180units of the plot; no automatic movement/orders, teleportation or army-selection changes. Preserve no-worker, cost, occupied-plot and180-boundary rejection/atomicity. Preserve manual-selection controls too.
- Keep World map entry/world/continent/kingdom controls and IDs. Make regional terrain entry obvious, explain geographic layers and distinguish city deposits from illustrated world geography. Find city resources closes atlas then opens existing Village board, guarded before governor entry. Preserve origin, state, Pause and restored camera until an explicit Locate action.

## Global Constraints
- Base mergedmain606abee3c0fff4320b347bc4704d8de5be05e0d4 (PR17), branchfeat/m13-gameplay-polish. Verify postmergeCI41925460499 before implementation; avoid duplicate unchanged baseline full tests. No other active PRs found.
- Preserve existing keyboard/camera/selection/orders, 44unit snapping/3x3roads/costs/undo, full economic/growth/workplace rules, peaceful/classic scenarios, audio settings/approved score/mix, schemas1/2/3 including paused-workplace flags. v0.13.0.
- No merge/deploy/purchases/paid dependencies or major architecture changes. Final draft PR only; Alex independently reviews and owner retains integration/release authority.

## Review Focus
- Radio keyboard/Tab trap must not trigger city shortcuts, pan, start simulation or commit an unconfirmed home; restored pre-entry cities retain state/sound choices.
- Missing/dead/enemy workers, changing selection, exact180range and resources spent after arming must be rechecked without spending on rejection.
- Defense ghost/range/hints and final placement must use the same worker resolution; costs and undo remain exact for tower/fortress/wall.
- Map resource bridge cannot start/reinitialize a city or change origin/orders/Pause; unavailable regions remain descriptive only.
- Narrow/short viewports, native pointer/keyboard activation, live focus retention and save restoration must remain usable. Windows output audibility is an explicit human limit.

### Task1: Chooser and audio-consistent interaction
**Files:** index.html welcome markup/styles/input guard/ready/init handlers; tests/usability.test.cjs; affected entry/origins tests; tests/fixtures/city-v0120.json.
- [x] Capture actual paused-workplace v012Brooksave from unchanged merged source. Add RED tests for no native chooser popups, two visible homes, honest unavailable-region copy, keyboard focus, preview/commit, real audio/context continuity and restored save preservation.
- [x] Implement native radio cards/fixed region context; preserve score and all sound settings. Adapt only old assertions/selectOption interactions changed by requested UI semantics; focused GREEN and commit.

### Task2: Construction and discovery polish
**Files:** index.html defense resolver/arming/ghost/placement/hints and atlas navigation/presentation; tests/usability.test.cjs and affected defense expectations.
- [x] RED tests for no-selection/army-selection defense placement, no-worker/enemy/dead/range/cost rechecks, exact costs/undo; retain legacy controls tests. RED tests for visible regional geography/resources bridge, pre-entry guards, origin/state/Pause/camera preservation, narrow viewports.
- [ ] Minimal implementation; focused GREEN. Version metadata and only changed current-version assertions; docs/screenshots. One fresh review, Important fixes RED/GREEN, final full suite and exact package smoke; inspect screenshots.
- [ ] Push separate branch and open draft PR against main with exact head, both CI runs, test counts, screenshot/download links and limitations. No merge/deploy. Preserve checkpoints; coordinate following major milestone with Alex.

## Execution notes
Reuse existing isolated linked worktree on new branch; cloud helper scripts unavailable locally, so retain ignored work/m13/progress.md. No installation. Do not add a second simulation, fake playable continents or remove defense tactical restrictions to solve selection friction.
