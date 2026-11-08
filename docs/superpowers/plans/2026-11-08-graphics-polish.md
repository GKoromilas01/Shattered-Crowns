# Graphics Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve buildings, units, terrain, and atmosphere in that order while preserving game behavior and mobile readability.

**Architecture:** Keep the existing single-canvas renderer and add deterministic drawing helpers around the current entity types. Rendering reads simulation state but never mutates it; decorative detail is capped or simplified at narrow viewports.

**Tech Stack:** Existing HTML5 Canvas, inline JavaScript, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-08-graphics-polish-design.md`

## Global Constraints

- No simulation, balance, save-schema, audio, or control changes.
- No new rendering dependency or external asset service.
- Preserve selection, placement validity, resources, ownership, health, and combat feedback.
- Use deterministic seeded variation and mobile-safe detail limits.

## Review Focus

- Building silhouettes remain distinct at 390px and desktop widths; browser screenshot assertions cover bounds and visibility.
- Unit ownership, selection, health, and action states remain readable; renderer tests assert state-dependent markers.
- Terrain decoration does not mutate entity arrays or simulation state; a snapshot comparison covers this.
- Atmosphere remains bounded on narrow viewports; a browser test checks frame timing and particle count.
- Existing canvas and regression tests remain green after each stage.

### Task 1: Building rendering

**Files:**
- Modify: `index.html` canvas rendering helpers and entity drawing section.
- Test: `tests/graphics.test.cjs`.

**Interfaces:**
- Consumes existing `buildings` entries (`type`, `team`, `hp`, `max`, `x`, `y`, `radius`) and current camera transform.
- Produces `drawBuilding(ctx, building, view)` and deterministic building detail helpers used by later renderer stages.

- [ ] Add a failing browser test that places representative houses, farms, markets, wells, and military buildings, then asserts each has a visible distinct silhouette, team-color cue, and damage cue at 390px and 1440px.
- [ ] Run the focused test and verify it fails against the current flat renderer.
- [ ] Implement `drawBuilding(ctx, building, view)` with type-specific silhouette layers, roof or top details, team accents, shadow, and a bounded damaged overlay.
- [ ] Run the focused building test and verify it passes.
- [ ] Commit `feat: polish building silhouettes`.

### Task 2: Unit rendering

**Files:**
- Modify: `index.html` unit rendering section.
- Test: `tests/graphics.test.cjs`.

**Interfaces:**
- Consumes existing `units` entries (`type`, `team`, `hp`, `max`, `selected`, `order`, `x`, `y`) and the building drawing helpers.
- Produces `drawUnit(ctx, unit, view)` with stable state markers.

- [ ] Add a failing test for worker, soldier, and archer silhouettes with selected, damaged, carrying, and attack-order markers.
- [ ] Run it and verify the expected visual-state assertions fail.
- [ ] Implement `drawUnit` using readable body shapes, team accents, selection rings, health bars, and minimal action indicators.
- [ ] Run the focused unit test and verify it passes at phone and desktop viewports.
- [ ] Commit `feat: clarify unit silhouettes and states`.

### Task 3: Terrain rendering

**Files:**
- Modify: `index.html` terrain/background drawing section.
- Test: `tests/graphics.test.cjs`.

**Interfaces:**
- Consumes canvas dimensions, camera transform, map bounds, roads, nodes, and existing building positions.
- Produces deterministic `drawTerrain(ctx, view)` and `drawTerrainDetails(ctx, view)` without mutating simulation collections.

- [ ] Add a failing test that captures simulation state before and after terrain rendering and checks visible ground variation, path treatment, water edges, and vegetation at 390px and 1440px.
- [ ] Run it and verify the state-immutability or visual assertions fail.
- [ ] Implement seeded ground patches, road/path integration, water-edge treatment, vegetation clusters, and construction shadows with mobile detail caps.
- [ ] Run the focused terrain test and verify it passes.
- [ ] Commit `feat: add layered terrain detail`.

### Task 4: Atmosphere and integration

**Files:**
- Modify: `index.html` animation/render loop and atmosphere helpers.
- Test: `tests/graphics.test.cjs` and existing browser suite.

**Interfaces:**
- Consumes elapsed render time, camera scale, terrain palette, and current visible entities.
- Produces `drawAtmosphere(ctx, view, time)` with bounded particles, lighting tint, depth haze, and optional weather variation.

- [ ] Add a failing test for bounded particle count, stable rendering while paused, and unobscured selection/placement controls.
- [ ] Run it and verify the new assertions fail.
- [ ] Implement subtle lighting, depth haze, particles, and ambient motion with reduced detail for narrow screens and no simulation-state writes.
- [ ] Run graphics tests, the full advisor suite, and the complete project suite.
- [ ] Inspect screenshots at 390px and 1440px for readability and visual balance.
- [ ] Commit `feat: finish graphics atmosphere pass`.

---
