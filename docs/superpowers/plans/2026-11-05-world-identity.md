# World Expansion & Kingdom Identity Implementation Plan

> Execute inline with Superpowers executing-plans/TDD/verification-before-completion and one fresh final review. Routine implementation is owner-authorized; no new design approval loop. No merge/deploy for M17.

**Goal:** Make the existing world explorable as 16 distinct kingdoms and 128 places.
**Architecture:** Extend existing `scKingdomController` catalogue and dialog, preserving legacy terrain and saved selections. Pure identity data, original SVG heraldry, transient dossier selections; no simulation changes.
**Tech stack:** Existing single-file HTML/Canvas/SVG, Node24, Playwright1.57.
**Spec:** `docs/superpowers/specs/2026-11-05-world-identity-design.md`.
**Base:** M16 merge `b7f3a7de351d23851cf0d3fafc68e2ab720424ce`; verify post-merge CI before completion. Existing isolated worktree on `feat/m17-world-identity`; no competing open PRs at start.

## Tasks

1. RED catalogue test in `tests/identity.test.cjs`: six continents,16 kingdoms,128 unique settlements/eight per kingdom, valid parents/relations/legacy IDs, frozen nested records, substantive lore and only home/brookstead starts. Implement catalogue in `index.html`; GREEN and commit.
2. RED navigation/dossier tests: all16/128 reachable through public buttons, banner/Politics/lore/location/starting availability visible, unsupported locations inspection-only. Implement scoped responsive dossier panel inside existing atlas and breadcrumb navigation; preserve regional map. GREEN and commit.
3. RED focus/state guards: keyboard activation, live refresh, title entry, running/paused city, save restore and camera invariance. Add screenshots and compare renderer/audio source to M16; no extra simulation or architecture. Verify focused suites, comprehensive exact-head CI and five local packaged smokes. Existing world tests update only intentional catalogue-count/navigation assumptions.
4. Fresh read-only whole-branch review; reproduce/fix confirmed blockers. Draft PR with exact commits, all tests/CI, before/after screenshots, limitations and downloadable verified package; no M17 merge/deploy.

## Review focus

Legacy selectedLocation save whitelist must stay unchanged. New dossiers cannot accidentally start cities. Async close/restore must clear browsing safely. Native controls/focus must survive periodic readiness refresh. Phone markers/long text must remain reachable without horizontal overflow. Relationships are lore, not active diplomacy. New banners/terrain art remain original and offline.
