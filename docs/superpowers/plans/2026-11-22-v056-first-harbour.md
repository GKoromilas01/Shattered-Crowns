# First Harbour Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for native implementation.

**Goal:** Build a real paid shore shipyard and boat with persistent movement.
**Architecture:** Native construction/jobs plus isolated naval state/schema13. Presentation reads copies and invokes guarded transactions.
**Tech Stack:** Existing self-contained JavaScript/Canvas/Playwright; no dependencies/assets.
**Spec:** ../specs/2026-11-22-v056-first-harbour-design.md

## Global constraints

No main push/self-merge/deploy. Existing shipyard/ship artwork only. Scope and numerical rules are in the spec. Retain existing city/war/trade behavior and legacy schemas. User delegated routine choices; no extra confirmation loop.

## Review focus

Stale held action across restore; duplicate payment; orphan queue/boat; partial naval save corruption; legacy charter/trade schema interactions. Native tests below own these cases.

## Task 1: Authoritative harbour and native integration

Files src/v056/harbour-engine.js, native index registries/hooks, embed-v026, growth/trade schema extensions, tests/harbour.test.cjs.
- [x] RED: shipyard placement selected-only and real costs; boat staff/time/payment; water movement/stop/return; save/restore midway; invalid schemas/targets/IDs atomic rejection; old fixtures; deletion/refund and duplicate/stale calls.
- [x] Run new tests and observe absent API failures.
- [x] Implement scHarbour snapshot/arm/order/cancel/sail/stop/berth and naval prepare/tick, using real native guards and costs.
- [x] GREEN new tests plus existing construction/save/charter regressions.

## Task 2: Playable presentation and delivery

Files src/v056/presentation.js, renderer/overlays, native Construction button, current tester, docs/release metadata.
- [x] RED native Construction/Shipyard/Fleet controls, art, narrow layout, stale held activation; implement guarded UI and existing-art rendering.
- [x] GREEN native flow and relevant art/entry/audio checks, embed and media identity checks.
- [ ] Final delivery: fresh review completed and Important edge validation fixed; package committed-source smoke, draft PR and exact-head CI lookup remain. Provide ZIP and current Advisor Tester instructions. No merge/deployment.
