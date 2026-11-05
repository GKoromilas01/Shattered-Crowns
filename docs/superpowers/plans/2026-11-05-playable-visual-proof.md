# Playable 2.5D Visual Proof Implementation Plan

> Execute inline using Superpowers executing-plans, test-driven-development and verification-before-completion; one fresh whole-branch review. Owner authorized implementation of the preliminary proposal. No merge or deployment.

**Goal:** Improve real city readability and appeal through a small playable visual proof.
**Architecture:** Existing Canvas 2D renderer, same geometry and picking; pure drawing helpers and one cached ground surface. No simulation or save-schema changes, no dependencies or purchases.
**Spec:** `docs/MILESTONE16.md`; approved original reference `docs/visual-concepts/city-art-direction.png` and `docs/SAND_LABS_VISION.md`.
**Baseline:** M15 merge `96ca5ae067a8f541eefdd4ebb75ec48d40ba85d6`; verify post-merge CI before final handoff. Existing linked worktree reused on separate `feat/m16-playable-visuals` branch; no competing open PRs.

## Global constraints

Preserve economy, workers, growth, peaceful/classic modes, roads/Undo, controls, saves, approved artwork and audio. Do not introduce projection changes, permanent menus or large refactors.

## Tasks

1. Write failing browser tests for deterministic visible ground/tree/house/unit painters with restored context and immutable inputs. Implement the minimum pure drawing helpers in `index.html`, integrate into existing draw paths, and cache static ground. Verify paused city state remains unchanged at 390/1440; run focused tests.
2. Capture the same genuine old save before/after on desktop and phone. Measure frame intervals with the same browser and route; record limits of this local comparison. Inspect screenshots for readable roads, selection and buildings; do not claim concept-art fidelity or universal FPS.
3. Bump release metadata/capture version only; retain schemas. Run comprehensive regressions and exact committed-source package build/validation/five smokes. Fresh review for rendering-state leakage, resource geometry, input handling and save changes; fix confirmed issues with regression evidence.
4. Publish separate draft PR with exact head, CI, screenshots, measurements, limitations and tested ZIP. Keep unmerged pending Alex review and owner approval.

## Review focus

Tall vegetation must not imply changed collision; shaded houses must preserve tier readability and footprints. Drawing must not mutate entities or leak transforms/styles. Cache must remain valid for the fixed world size. Unit overlays must retain team identification and selection clarity. Measured performance is environment-specific; existing suites cover controls and economic behavior rather than judging artistic appeal.
