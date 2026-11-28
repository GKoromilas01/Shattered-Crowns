# Owner Cinematics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add all seven owner-supplied media files to a reviewable0.70 game and record subsequent graphics/gameplay direction.
**Architecture:** Preserve source assets plus hashed inventory, existing embedded-media pipeline and cinematic player. Source the existing audio controller for maintainable playlist additions; native duration drives playback. Small media replay/parade presentation module consumes native war/city state without new simulation.
**Tech Stack:** JavaScript, FFmpeg VP9/WebM, MP3, Node/Playwright.
**Spec:** docs/superpowers/specs/2026-11-28-owner-cinematics-design.md

## Global Constraints
No main push/selfmerge/protected game deployment. Existing media and save format retained. No new generation/credits. Caption typography unchanged. Real durations:120s,120s,170s; clips7.292s/7.292s/7.292s/6.583s. Private Mode shown ON by owner; do not invent account plan or generation price for every file.

## Review Focus
- New files playable, unique and embedded with exact original music bytes; no accidental60/75second cutoffs.
- Multiple milestone arrivals: one film at a time, release pause/focus on completion; restore cancels stale queued films.
- Parade: no trigger before actual raid clearance or with destroyed Keep/remaining attackers; once per city.
- Existing controls/settings: mute, next track, hidden tab, restored city and old source tests remain coherent.
- Missing narration and future graphics are documented pending, not falsely presented as implemented.

### Task1: Assets and playback
Files: assets/v070/{originals,video,music,inventory.json}, src/v070/audio-controller.js, scripts/embed-v026.cjs, scripts/embed-v047.cjs, tests/owner-media.test.cjs.
- [ ] Write/read real browser tests for new clip keys/captions and three selectable tracks + decoded durations; run RED.
- [ ] Preserve originals; transcode four silent VP9 clips; record inventory/hashes and add media directories to embedding pipeline.
- [ ] Extract existing audio controller into source without behavioral rewrite; add three tracks/labels and actual-file duration status.
- [ ] Verify original bytes, signal, metadata, mute/next/old playlist behavior; commit integrated generated bundle with task2.

### Task2: Parade and owner replay
Files: src/v062/first-scenes.js, src/v069/milestones.js, src/v070/presentation.js, tests/owner-media.test.cjs, tests/milestones.test.cjs, tests/settlement-cinema.test.cjs.
- [ ] Test missing/fallback behavior and actual newly supplied clips, queue/restore cancellation, replay menu and correct parade eligibility/once-per-city.
- [ ] Add parade scene, guard chronological milestone playback from overlap, and a Menu films/new-music section using native player/playlist.
- [ ] Add per-city parade receipt based on real cleared-raid conditions; restore cancels media before newly queued playback.
- [ ] Run source/packaged feature and retained cinematic/audio/winter checks; review and commit.

### Task3: Handoff and next-version direction
Files: docs/{MILESTONE70,ASSET_LOG,HANDOFF,CONTINUATION,FUTURE_VISUAL_GAMEPLAY_UPGRADES}.md, RELEASE_NOTES.md, release.json, tester steps, shared Sand Labs catalogue/handoff.
- [ ] Record actual received media, duration mismatch, neutral approved track titles and pending narration.
- [ ] Document next graphics stages: coherent larger buildings + zoom first, then living settlement detail and consequential production/defence progression; record reference availability honestly.
- [ ] Publish source review PR and owner-authorized separate Sand Labs playtest after local artifact checks; leave protected game release untouched. Record exact hashes, evidence and pending required CI for Claude/other AI.

Execution ruling: existing sc62Scenes player handles all supplied film keys; the audio controller is sourced verbatim before narrowly adding tracks/duration status. Neutral titles owner-approved via chat. No new renderer work in this media slice. Review caught and RED reproduced fading cleanup race; fix separates done/cleaned and cancels timer with epoch/city guard. Native full regression will run in required source CI; local focused/package evidence must remain explicit.
