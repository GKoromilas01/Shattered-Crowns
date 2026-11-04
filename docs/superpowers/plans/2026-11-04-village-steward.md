# Village Steward Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans with test-driven-development, systematic-debugging as needed, one final fresh review, and verification-before-completion.

**Goal:** Make the two existing playable villages easier to run: find idle map workers, locate gatherable deposits, and follow actual food, housing and service needs.
**Architecture:** Extend the existing engine's derived economy snapshot with map-worker/deposit data and two guarded actions. Add a Village section to City Life; use its existing navigation, focus and rendering conventions. No new simulation, dependencies or save fields.
**Tech Stack:** Existing inline vanilla JS/HTML/CSS, Node24, Playwright1.57.
**Spec:** Design below. User authorizes independent implementation and draft PR; no additional design approval requested under their explicit delegation.

## Design / approaches
Atlas choice: extend City Life rather than create another overlay (less navigation/overlap), or change employment allocation (unnecessary balance/save changes). A Village board precedes existing planning details. It distinguishes recruited map workers from civilian workplace staff. Show idle/gathering/other worker counts, current gold/wood/stone, gatherable deposit totals, recovering sites and nearest live deposit by distance to the player's Keep. Select idle workers selects only living friendly workers without orders/targets; never overrides busy workers. Locate centers a live deposit without issuing orders or changing selection. Player right-clicks to gather using existing controls. No automatic allocation.
Needs link to Food/Housing/Employment sections: last measured meal shortage or negative food balance; no food producer; no available housing; unstaffed workplaces; missing home water/health/market. Explicitly describe last-cycle vs current observations, vacant-home service counts and no unmeasured claims. No promises of stable long-term balance. Both origins and classic mode supported.

## Global Constraints
- PR15 remains open and unmerged at5c5141f; this branch depends on it and draft PR targets its feature branch until owner-approved integration.
- Preserve audio, controls, roads44-unit snap/3x3costs/undo, peaceful/classic rules, existing economy and save schemas1/2/3. Version0.11.0; actualv010villagefixture must restore unchanged.
- No merge/deploy/paid services/major architecture changes. Existing CI gates stay required.
- APIs reject unavailable/invalid/overview/title/ended actions without mutation. Snapshot/actions do not implicitly pause/resume.

## Review Focus
- Busy/attacking/moving/dead/enemy units must never be captured as idle.
- Resource depletion/recovery and unavailable Keep must not target a stale array index.
- Focus and native keyboard activation must survive live refresh without changing Pause/arming pan.
- No assignment or balance change from viewing the board; legacy and village saves remain exact.
- Narrow screens retain all controls; map overview/title must reject city actions.

### Task 1: Derived village state and guarded actions
**Files:** index.html engine citySnapshot/scCityEconomy; tests/steward.test.cjs; tests/fixtures/city-v0100.json.
**Interfaces:** snapshot().village={resources:{gold,wood,stone},workers:{total,idle,gathering:{wood,stone,gold},other},deposits:[{resource,remaining,active,recovering,nearest:{x,y}|null}]}. selectIdleWorkers() returns boolean, selects eligible workers and centers first, emits existing selection event; locateResource(resource) returns boolean, centers nearest active deposit to Keep; no orders/selection/pause changes.
- [ ] Capture genuine pausedBrooksteadv010 fixture from unchanged5c5141f. Write tests for snapshot/purity/idle eligibility/invalid guarded actions/realresourceclick/legacy roundtrip. Observe RED for missing APIs.
- [ ] Implement minimal helpers/snapshot and actions. GREEN focused tests. Commit.

### Task 2: Village board and verified draft
**Files:** index.html City Life rendering, tests/steward.test.cjs, metadata/current-version assertions, docs/MILESTONE11.md, release notes, screenshots.
**Interfaces:** Village navigation heading scPlanSectionVillage; board scVillageBoard; stable action data-steward; needs buttons navigate existing sections; real snapshot data only.
- [ ] Write UI/keyboard/refresh/responsive tests, observe RED. Implement board, feedback/status, stable focus restoration; GREEN targeted tests.
- [ ] One final fresh branch review; fix Important findings with RED/GREEN tests. One final full suite, exact committed build/manifest and packaged smoke; screenshots useful desktop/phone.
- [ ] Push feature branch, open stacked draft PR; include exact commit/evidence/known limits and PR15 dependency. Monitor PR15 gates alongside useful work; no duplicate full runs without changed code/failure.

## Rulings
- Existing linked worktree is reused on a new branch; PR15 remains intact.
- Skill helper scripts are cloud resources unavailable as local executables; use ignored work/m11/progress.md with task checkboxes/results and ordinary git commits. No framework install.
