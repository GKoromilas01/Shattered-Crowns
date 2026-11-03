# Opening, Palette and Music Plan

> Execute inline using superpowers:executing-plans; one fresh whole-branch review. Publication results live in the associated PR; inspect PR/history before repeating unchecked release steps.

**Goal:** Fix the screenshot's clipped commands and startup flash; provide a fuller calm music preview.
**Architecture:** Scoped command-strip presentation controller; shared original score/voice helpers in existing audio controller; static early welcome dialog with embedded original title artwork. Existing engine remains authoritative.
**Tech:** HTML/JS/WebAudio, Node24/Playwright; no dependencies.
**Spec:** docs/superpowers/specs/2026-11-03-opening-palette-music-design.md

## Constraints
Preserve roads, placement/costs/undo, economy, peaceful/classic scenarios, saves and existing sound settings. Keep original ambience available. No merge/deploy/spend.

## Review focus
- Classic/native vs hidden scrollbars; full cards and last-page access; short/mobile viewport clearances.
- New arrow buttons Space activation must not reach game Pause; card focus survives responsive widths.
- Stopped future-scheduled notes, repeated style changes and hidden tabs must not leak voices or abruptly swell.
- Partial HTML paint and delayed initialization; title remains visible until entry; old saves remain protected.
- Embedded illustration must survive standalone packaging; preview uses shipped score, not another approximation.

## Task1: Palette
- [x] Write failing native-scrollbar geometry/arrow reach/Space tests in tests/presentation.test.cjs.
- [x] Repair strip with separate accessible arrow controls and stable full-card sizing; preserve engine/controller.
- [x] Run targeted layout/legacy controls tests.

## Task2: Music
- [x] Write failing actual scheduled-note variety/style persistence/stop tests in tests/audio.test.cjs.
- [x] Add shared16bar score and instrument envelopes; style selector/APIscAudio.setMusicStyle, separate style storage, bounded lookahead/voices. Keep original sound settings shape.
- [x] Run audio tests and render WAV using exact shipped helpers; measure peak/silence. Listening taste remains owner review.

## Task3: Opening
- [x] Write failing streamed-first-paint/reload/transition tests in tests/presentation.test.cjs.
- [x] Move actual dialog and critical CSS before engine; use optimized embedded existing illustration; enable controls only at end of initialization. Retain keyboard/modal behavior and save safeguards.
- [x] Adapt prior reload journeys to explicit Enter city as required by new user-requested entry behavior; retain existing assertions. Run affected tests.

## Task4: Review/candidate
- [x] Documentv0.8.1 behavior, no licensed assets, screenshot/preview evidence and limits.
- [x] Fresh whole-branch review; fix confirmed important issues RED→GREEN.
- [x] Run full suite (152/152, no failures/skips).
- [ ] Commit/build/verify exact candidate, packaged smoke, standalone file launch, push/openPR and provide playable download/preview; post-commit results are recorded in the PR. No merge/deploy.
