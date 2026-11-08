# Governors and Released Advisor Integration Plan

> Execute inline with executing-plans, existing TDD and one fresh final review. Routine integration authorized by the owner's instruction to proceed. Keep existing PR branches unchanged; no merge to main or deployment.

**Goal:** Bring the already owner-authorized PR #25 governors/maps work up to date with released advisor PR #27 without losing either feature.
**Architecture:** Merge the existing governors branch into a fresh branch based on current main. Preserve its five starts/schema-four saves, maps and optional strings, alongside the released measured-advisor model, controls and tests. Resolve the two add/add documentation collisions by retaining separate descriptive advisor documents and the canonical M18 governor documents.
**Tech Stack:** Existing single HTML/Canvas/SVG, Node24, Playwright1.57; no dependencies.
**Specs:** docs/superpowers/specs/2026-11-05-governors-living-maps-design.md from PR #25 and docs/superpowers/specs/2026-11-07-city-advisor-design.md from main.

## Global Constraints
Do not rewrite or push to the original #25/#26 branches. Preserve supported start IDs, legacy save fixtures, rates, costs, renderer/audio choices, measured advisor arithmetic and native controls. PR #26 remains stacked and out of scope. No merge to main, hosting change or publication is authorized for this integration.

## Review Focus
- Advisor operates on all five starts and their restored saves.
- Measured advice never reverts to old count-based suggestions during integration.
- Review navigation retains Pause, city state and camera.
- Both conflicting documentation histories remain available with clear names.
- New-origin save schema changes preserve old-origin/old-fixture contracts.

## Tasks
- [ ] Add tests/advisor-governors.test.cjs covering all five starts, measured feedback, Review state/view preservation and restored-save advice. Run on main: new governor cases fail because those starts are unsupported.
- [ ] Merge origin/feat/m18-governors-living-maps locally. Keep map milestone/report at canonical M18 paths; retain released advisor docs as ADVISOR_UPDATE.md and advisor-update-verification.md and update internal links. Run focused advisor/governor/maps/save/audio suites.
- [ ] Run the full npm test suite, inspect new behavior on phone/desktop and obtain a fresh read-only review. Fix important confirmed issues with reproductions.
- [ ] Commit, build/verify exact source and run five packaged smokes; push only the new integration branch and open a reviewable draft PR with source provenance and evidence. Keep original PRs and production unchanged.
