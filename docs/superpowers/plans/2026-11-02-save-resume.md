# Save/resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline, with one independent final review. Track completion in work/progress.md.

**Goal:** Preserve an entire existing Shattered Crowns session across reloads and portable files, safely.
**Architecture:** Versioned plain JSON DTO and validated two-pass engine restore, plus a small local-checkpoint/file controller in the existing Game Menu. Existing simulation and control code remains authoritative.
**Tech Stack:** Existing JS/HTML, Web Storage/Blob/file input, Node 24 and Playwright Chromium; no new dependency.
**Spec:** docs/superpowers/specs/2026-11-02-save-resume-design.md

## Global Constraints

- Released base1540fd1; separate feat/save-resume branch.
- Preserve all84 tests, road/controller bytes, economic arithmetic, services/happiness and release safeguards.
- Unknown/bad saves must not mutate current state or overwrite good data; load paused, no offline progress.
- CI green before PR; no merge/deploy without Giannis approval.

## Review Focus

- Cyclic entity references, destroyed targets/stale undo, control groups and next IDs.
- Corrupt or oversized files, prototype/text injection, validation atomicity and truthful failures.
- Local storage failure/backup integrity and a fresh/restarted city overwriting the prior one.
- Policy hysteresis, timers/queues, ownership/health upgrades and measured-vs-current data.
- Multiple reloads, long runs, camera/selection/placement cancellation and narrow-menu accessibility.

### Task 1: Versioned simulation snapshot and restore

**Files:** index.html; tests/saves.test.cjs.
**Interfaces:** scCitySave.capture(), scCitySave.restore(data), scCitySave.status(); version1 DTO plus read-only status. References explicitly encode entity IDs/node indices.

- [x] Write/run failing real-engine round-trip, reference, policy and corrupt-input cases.
- [x] Implement bounded canonical validation and staged reference reconstruction; apply atomically and pause. Reuse existing policy and camera APIs, reset transient input/visual state; preserve undo and control groups.
- [x] Verify the new cases and existing economy/service/controls regressions; record actual failures/fixes.

### Task 2: Checkpoint storage and file UI

**Files:** index.html; tests/saves.test.cjs; docs/MILESTONE6.md; release metadata/notes/README.
**Interfaces:** scSavedCity.save(), resume(), exportText(), importText(text), info(); two versioned local keys, one primary and one valid backup. All results are explicit {ok,message} objects.

- [x] Write/run failing reload/resume, file, backup, storage-denied, previous-city protection and menu cases.
- [x] Implement one existing-menu section, atomic checkpoint rotation and guarded 30-game-second autosave/pagehide. Keep failed imports/storage recoverable and current state untouched. Add portable download/upload handling.
- [x] Test narrow controls, pause/camera/selection, and a ten-minute simulated save/restore/recovery with full AI; assert food/workforce/occupancy conservation and no JS errors. Capture screenshots and data evidence. Bump version0.6.0 and document storage scope/limits.

### Task 3: Candidate verification and PR

- [x] Independent whole-branch review; fix important findings with failing reproductions, then rerun full npm test.
- [ ] Commit, build/verify exact candidate and run packaged smoke. Push only feature branch.
- [ ] Wait for full/package/live required feature CI before creating PR with evidence/risks; confirm PR checks. Never merge/deploy.
