# Village Growth & Prosperity Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans, test-driven-development and verification-before-completion. Execute inline, with one fresh final code review.

**Goal:** Give governors a simple staffing choice and clear achievable resident/housing progression.
**Architecture:** Existing single-city engine and City Life panel. Open workplaces keep the original food-first allocation; paused workplaces offer no jobs/output/services. Add derived migration readiness using the actual engine gates. No new currencies, technology trees, architecture or dependencies.
**Tech Stack:** Existing inline vanillaJS/HTML/CSS, Node24/Playwright1.57.
**Spec / design:** This document. User explicitly delegates routine design/implementation; no extra approval gate requested.

## Design and approaches
Atlas choice: one reversible Open/Pause control per existing workplace, rather than introducing employment priorities/quotas or another economic subsystem. This lets residents move from surplus production to services without demolition. Show next-resident checks and progress in existing Housing details; preserve rates/timings. Paused granaries retain physical storage but lose staffing/logistics. Closed farms/fisheries stop producing food. Reopening restores normal food-first allocation. No automatic orders for recruited map workers.

## Global Constraints
- Base mergedv0.11 main75f8abcee20d5df1b535bdb8144a96991415ebcf, separatebranchfeat/m12-village-growth. Monitor mainpostCI41899118870; no duplicate unchanged baseline suite.
- Preserve production rates, tax formula, 5second cycles, +1resident/15seconds, housing10second upgrade/30second decline, happiness45migration threshold, costs/undo/3x3roads/camera/selection/audio/peaceful/classic rules.
- Pausing uses optional boolean building.cityWorkPaused only on owned staffed workplaces; omit when absent. Legacy schemas1/2/3 accepted unchanged. Capture a genuinev011village fixture before editing. New paused-workplace saves requirev012+; older builds safely reject the unknown field. No schema renumbering or silent stripping.
- setWorkplaceOpen(id,open): strict boolean/id/live-owned-workplace validation and title/overview/ended guards. No money, population, clock, globalPause, selection/order/camera changes. Reassign staff immediately; production/satisfaction still only on existing cycles. Idempotent calls do not rewrite state.
- v0.12.0; draft PR only. No merge/deploy/purchase/services/config changes. Previous owner playtest feedback remains a separate backlog; avoid mixing audio/continent/defense rule changes into growth scope.

## Review Focus
- Paused sites must not produce, supply staffed services, sell goods or count as active job vacancies; physical granary capacity remains.
- All7staffed types, low population, multiple competing food producers and reopening retain conservation/food-first behavior.
- Strict optional-flag validation must reject malformed/enemy/nonworkplace flags before any restore mutation; legacy captures remain byte-equivalent in state.
- Current migration feedback must match actual reserve/water/roads/vacancy/displacement/happiness/last-meal gates; pause freezes timed progression.
- Native Space/pointer activation, focus under live refresh/removal, mobile scrolling and existing selection/camera/construction controls remain usable.

### Task1: Workplace operation and persistence
**Files:** index.html employment/save/snapshot/actions; tests/growth.test.cjs; tests/fixtures/city-v0110.json.
**Interfaces:** snapshot workforce sites include paused boolean; workforce jobs count open slots, pausedJobs separately. Building details expose workplace state and explicit reopening feedback. setWorkplaceOpen returns boolean. Optional saveflag bool, guarded toownedworkplace; delete on normal reopening, legacy fields untouched.
- [ ] Capture genuinev011fixture. Add failing tests for reallocation/production/services/storage, guards, paused portable/checkpoint roundtrip, atomic invalid flags and legacy restoration. Observe RED.
- [ ] Implement minimal operation/serialization changes. Targeted GREEN, commit.

### Task2: Resident progression feedback and integrated draft
**Files:** index.html growth/UI, tests/growth.test.cjs, metadata/current-version assertions, docs/MILESTONE12.md, screenshots/notes.
**Interfaces:** growth.readiness={ready,checks,eligibleVacancies,nextResidentSeconds}; same conditions as cityGrow. Existing Housing section gets readiness/progress; existing building feedback gets Open/Pause button, stable focus. Current pause state clearly distinguished from last-cycle output.
- [ ] Write RED tests for feedback/UI/native controls; implement using shared migration gates, preserve simulation timing. Add real resource-funded Brookstead gameplay journey to growing occupied Townhouse, staffed services and positive prosperity, without resource/population injection.
- [ ] Fresh whole-branch review. Fix confirmed Important issues RED/GREEN; record limits. One final full regression run, exact committed build/manifest/Git-source, five packaged smoke journeys; inspect desktop/phone screenshots.
- [ ] Push isolated branch and open draft PR against currentmain with exact commit/tests/CI/screenshot/limitations; no merge/deploy. Report for Alex/owner review.

## Execution notes
Reuse the already isolated linked worktree on new branch. Cloud skill helper scripts are not local executables; use ignored work/m12/progress.md and ordinary commands, without installing anything. Retain checkpoints as requested. Re-run broad tests only for changed code, failures or final verification.
