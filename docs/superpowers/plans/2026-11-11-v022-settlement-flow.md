# Settlement Flow Implementation Plan

> Execute inline; owner delegated choices and asked to proceed. Use executing-plans and test-driven-development.

**Goal:** smoother desktop play, automatic builders and a restrained artistic interlude.
**Architecture:** change existing engine construction completion and Canvas drawing; append a presentation controller using current panel/audio/campaign interfaces. No dependencies.
**Tech Stack:** single HTML/Canvas, Node 24, Playwright 1.57.
**Spec:** docs/superpowers/specs/2026-11-11-v022-settlement-flow-design.md

## Global constraints
Base 772b191; separate feature branch. Preserve costs, production, save schemas, road/defense rules, mute and pause. No merge/deploy. Mobile expansion deferred.

## Review focus
Manual orders and released/cancelled builders must never be stolen. Four-builder capacity includes travelling builders. Inspector must not reopen over Worksites. Interludes restore paused/running state and view even on restart/restore. Literary excerpts need exact attribution and inspected public-domain sources.

## Task 1: controls, overlays and builders
- [ ] Write tests in tests/settlement-flow.test.cjs for native contextmenu prevention, selection/escape cleanup, mutual panel clearance and sequential construction capacity/manual override.
- [ ] Watch fail with system Chromium; fix engine scConstructionTick, map contextmenu surface, duplicated Canvas inspector and selection notices.
- [ ] Run new tests and existing construction, HUD, selection and workplace compatibility tests.

## Task 2: artistic presentation
- [ ] Write failing tests for Chronicle literature and skippable vignette, exact view/state restoration and sound mute/cooldown.
- [ ] Add original bounded building shading, completion sound through scAudio, attributed poetry and original sayings, optional vignette through existing campaign overview.
- [ ] Verify new tests, audio, graphics, Chronicle, save and campaign tests; inspect real screenshots.

## Task 3: release evidence
- [ ] Set 0.22 release metadata and document scope/source/limitations.
- [ ] Run full suite, syntax/diff checks, exact-source package and five packaged smokes.
- [ ] Review final diff and record evidence; commit and open draft PR when possible. No merge/deployment.
