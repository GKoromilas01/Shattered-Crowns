# Peaceful City & Kingdom Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline; one fresh whole-branch reviewer at the end. Track evidence and rulings in work/progress.md.

**Goal:** Ship a peaceful home-city campaign and separate informational kingdom overview while retaining classic gameplay and saves.
**Architecture:** Small engine scenario/readiness/save hooks plus one appended overview/menu controller. Existing economy/control code remains authoritative.
**Tech Stack:** Existing HTML/JS, native dialog/SVG, Node 24, Playwright Chromium; no new dependency.
**Spec:** docs/superpowers/specs/2026-11-02-peaceful-city-kingdom-design.md

## Global Constraints

- Base c9b74a8; branch feat/peaceful-city-kingdom; v0.7.0.
- Preserve road/controller bytes, measured economics, checkpoint safety and release safeguards.
- Peaceful default; real classic mode; schema 1 compatibility; no multiplayer or warfare implementation in this milestone.
- Test and create PR; no merge/deploy without Giannis approval.

## Review Focus

- Classic saves loaded from a campaign URL and campaign saves from a classic URL restore their actual scenario.
- Map opens while paused, armed construction, selected troops, minimum zoom and narrow/mobile views: no unintended simulation/input/camera changes.
- Readiness reverses on shortages; a timer alone cannot activate war; restored counters are bounded and validated.
- Corrupt/hostile campaign data fails atomically; autosave and previous-good backups stay protected across scenario resets.
- Default game smoke covers the campaign; classic setup does not conceal campaign regressions.

### Task 1: Engine scenario, readiness and save compatibility

**Files:** index.html; tests/kingdom.test.cjs; existing test setup URLs only.
**Interfaces:** scCampaign.status() -> {scenario, stableCycles, selectedLocation, overview}; scCampaign.snapshot() -> readiness rows and phase; scCampaign.start(scenario); scCampaign.selectLocation(id); scCampaign.setOverview(bool).

- [x] Write and run failing default peace/classic/readiness/save validation tests in Chromium.
- [x] Add scenario-aware initialization, AI/victory gating, measured-cycle readiness and schema 2 campaign capture/restore. Preserve schema 1 for classic.
- [x] Explicitly choose ?scenario=skirmish in legacy regression setup; retain assertions. Verify classic remains playable and new city has no AI/false victory.
- [x] Verify save/reload/reset, invalid input, old-save scenario restoration and readiness reversal.

### Task 2: Kingdom overview and peaceful guidance

**Files:** index.html; tests/kingdom.test.cjs; tests/smoke/pages.test.cjs.
**Interfaces:** scKingdomUI.open()/close(); native dialog with selectable original settlements, readiness list, Return to city and Menu scenario selector.

- [x] Run failing map/zoom/camera/pause/focus/placement/scenario-confirmation tests.
- [x] Implement one responsive, keyboard-accessible controller; pause only while overview is open and restore exact camera/focus. Integrate Menu and min-zoom boundary through existing zoom controller.
- [x] Update campaign guidance and City Life peace copy; distinguish real readiness from future war/trade features.
- [x] Test 390/768/1440 widths, real roads/gathering, repeated navigation, fullscreen and reload; capture screenshots.

### Task 3: Selection audio and gentle ambience (Giannis's subsequent request)

**Files:** index.html; tests/audio.test.cjs; docs/MILESTONE7.md.
**Interfaces:** scAudio.status() read-only diagnostic state/settings/signal; configure(options) validates preferences; original Web Audio voices follow existing selection events and real controls.

- [x] Reproduce missing audio via failing activation/selection/mute/persistence/unsupported tests in Chromium.
- [x] Add one bounded Web Audio controller and existing-Menu sound section; synthesize original music/cues and require user activation. Do not alter game simulation, road/controller code or save schema for audio.
- [x] Verify signal/routing, worker/army interaction, persisted mute/settings and safe unavailable/storage-denied behavior. Review this added scope; rerun complete suite after any important fixes.

### Task 4: Candidate verification and PR

**Files:** docs/MILESTONE7.md; README.md; RELEASE_NOTES.md; release.json; source/test fixes from review.

- [x] Document controls, saves, balancing choices, informational world and remaining limits; set v0.7.0.
- [ ] Obtain whole-branch review, fix important findings using reproductions, run full source suite and exact packaged smoke.
- [ ] Commit/push only feature branch. Wait full/package/live required CI before PR. Create PR with evidence and limits; verify PR checks. Leave open for Giannis approval.

### Authorized start screen addition
Giannis requested a start screen with music and delegated its design. Reuse the existing first-visit welcome entry points: a full-screen original typographic title, Enter city, Advisor, and optional music preview. The city clock and gameplay hotkeys wait until entry; audio requires a gesture and respects browser sound preferences. Returning browsers retain the existing introductory-screen preference. No cinematic or external media dependencies. Verify keyboard entry, waiting clock, actual audio signal, and mobile/desktop bounds.

### Added defense-placement checks
- [x] Reproduce hidden failure feedback and affordability changes after arming.
- [x] Reuse engine rules while showing specific failure reasons in existing Construction details.
- [x] Verify no charge on rejected plots, exact charge on success, affordability recheck and narrow-screen feedback.

### Review evidence
Original whole-branch review found a floating-point minimum-zoom boundary issue; reproduced and fixed before the pre-audio 118-test pass. Added-scope review found Space reaching the hidden game's pause shortcut from the start screen; a real Chromium test reproduced it, then passed after isolating propagation while preserving native activation. Restore-origin selection events are excluded from audio cues. Minor preview-button state polish and duplicate legacy selection feedback remain bounded presentation follow-ups.
