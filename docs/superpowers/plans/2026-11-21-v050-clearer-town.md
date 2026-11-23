# A Clearer Town Implementation Plan

> Use superpowers:executing-plans inline. Owner said to proceed without pictures; retain the already established execution method and one final fresh review. No new plan-approval pause.

**Goal:** On-demand information plus useful Workshop/School menus in one release candidate.
**Architecture:** Small src/v050 presentation module reads existing authoritative APIs, coordinates native panels and informational journal. Minimal explicit producer hooks where needed; no new simulation/rendering pass or media edits.
**Tech Stack:** Existing JS/DOM/Canvas, Node24/Playwright.
**Spec:** ../specs/2026-11-21-v050-clearer-town-design.md

## Global Constraints
- Preserve painted art/media, simulation/camera/input, saves/schema11, real costs and workplace economics. Sources/embedding workflow only; no generated asset edits.
- Quiet opening: routine notices/journal, one main context, visible pending decision clock/default; original real transaction once-only behavior.
- Actual existing Workshop controls/School People data, no fake bonuses or new jobs. No main push, own merge or release.

## Review Focus
- Pending automatic event/held menu action across restore cannot affect another city; closed/minimized event still uses original default once.
- Programmatic API integration vs automatic producer: user-requested dialog opens; automatic story/event does not steal focus.
- Repeated refresh must not erase native keyboard focus; Escape closes details without global Pause/placement effects.
- No CSS-hidden modal leaves backdrop/focus trap; atlas/Pause/hidden freezes actual countdown.
- Narrow and crowded legacy towns keep placement, resource access, selected-site feedback and all media.

### Task1: On-demand presentation
**Files:** src/v050/presentation.js, scripts/embed-v026.cjs, minimal index hooks, tests/quiet-town.test.cjs.
**Interfaces:** window.sc50UI.{openJournal(),openDecision(),activate(kind),notify(title,text),snapshot()}; consumes existing scEvents/scStoryCards/scChapters/native buttons, no economic mutation.
- [x] Native RED: clean opening; queue simultaneous routine notices, browse objectives/history on request, automatic decision compact with clock and original expiry; explicit fire API still usable; focus/Escape/one-context/390px; restore discards stale choices.
- [x] Implement bounded journal and coordinator with stable nodes; selected-only construction detail. Preserve event semantics and add minimal overview/reset protections.
- [x] GREEN new and existing relevant event/panel/input/save tests, actual screenshots. Commit.

### Task2: Useful building menus
**Files:** src/v050/building-menus.js, embedding, tests/clearer-menus.test.cjs.
**Interfaces:** existing scBuildingMenus.register and scCityEconomy workplace APIs; scPeople.list/open; Task1 activate for context switching.
- [x] RED actual Workshop stock/staff/pause/priority/trade; actual School teacher/attending child data and People navigation; held input/restore guard/focus/narrow.
- [x] Implement inside existing inspector, preserve stable controls between updates, no fake School pause API or new bonuses.
- [x] GREEN relevant menus/school/workplace/trade tests; commit.

### Task3: Preview and final validation
- [x] Actual normal-clock opening/developed/event-pressure walkthrough, keyboard/narrow screenshots, essential feedback/performance and no lost deadlines/history; preserve media hashes/asset integrity, package smoke.
- [x] Update metadata0.50, tester steps, milestone/handoff/validation; one fresh whole-branch reviewer on most capable available model; Important/Critical fixes reproduced RED→GREEN, relevant suite green.
- [ ] Feature PR/playable immutable preview, full final-headCI independently (no repeated polling/unchanged runs); no merge/deploy. Report blockers/timing honestly.
