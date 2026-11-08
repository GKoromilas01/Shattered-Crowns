# City Construction and Pacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make city construction consume real map-worker time and bring gathering into proportion with costs.
**Architecture:** Engine-owned sites remain separate from operational buildings; build orders reference them. A native Worksites panel exposes the same engine operations.
**Tech Stack:** Existing inline JavaScript/canvas, Node tests, Playwright; no dependencies.
**Spec:** docs/superpowers/specs/2026-11-08-construction-pacing-design.md

## Global Constraints

- 2.5 city gathering, unchanged 17 skirmish gathering; food and civilian production unchanged.
- City civic buildings except roads require construction; basic 36, amenities 24, advanced 60 work-seconds; builder multipliers 1/1.6/2.1/2.5.
- Save schema 5 only for pending projects, legacy schemas readable; no merge/deployment without owner authorization.
- Native inline execution, one final fresh review, no CI polling.

## Review Focus

- Stale project references after cancel, undo, restore or restart must never affect another city.
- No unfinished building may provide housing, jobs, output or service.
- Cancellation/undo cannot create materials twice.
- Build orders must not serialize into invalid combat/gather references.
- Phone users must reach all project controls while paused.

### Task 1: Engine, pacing and persistence

**Files:** index.html, tests/construction.test.cjs
**Interfaces:** scConstruction.snapshot(), assign(id), release(id), cancel(id), locate(id); all mutations validate current site and selection.

- [ ] Write tests of actual placement and simulation, income and project roundtrip; run to confirm missing behaviour.
- [ ] Add sites, assignment, movement/work/completion, resource rate, cancellation, footprint and undo handling.
- [ ] Extend snapshot validation/rebuild atomically for schema 5 and references.
- [ ] Run construction tests and affected save/steward/economy suites; commit.

### Task 2: Native controls and validation

**Files:** index.html, tests/construction.test.cjs, docs/validation/construction-pacing.md
**Interfaces:** UI calls Task 1 engine APIs; no duplicated simulation state.

- [ ] Add failing phone/desktop panel interaction tests.
- [ ] Add Worksites panel with stable controls, canvas site artwork, right-click assignment and accurate placement guidance.
- [ ] Run focused tests; repeat opening measurements; record results and limitations.
- [ ] Run full repository suite once, resolve regressions, obtain one fresh whole-branch review, commit and create draft PR. Do not poll CI.
