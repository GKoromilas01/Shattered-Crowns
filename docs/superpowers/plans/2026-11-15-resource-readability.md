# Resource readability implementation plan

> **For agentic workers:** Use superpowers:executing-plans inline for this small follow-up.

**Goal:** Make deposit identity and top-bar resources readable at play scale.
**Architecture:** Add a two-cell deposit image to the existing locked/embedded atlas pipeline; replace only resource sprites and top-bar emoji prefixes with portable vector icons.
**Tech Stack:** Existing Canvas, JavaScript, inline SVG, Playwright and release verification.
**Spec:** ../specs/2026-11-15-resource-readability-design.md

## Constraints and review focus
No economic/save/input changes; preserve live value elements and labels/tooltips. Check depleted nodes, crowded resource access, narrow HUD wrapping, image readiness and unchanged paused state.

- [x] Capture baseline and create/review the two deposit sprites.
- [x] Embed sprites and five HUD icons; retain existing number nodes and textual names/tooltips.
- [x] Capture matched before/after and grayscale views; run existing HUD, art, graphics and gathering regressions.
- [ ] Commit/push focused change; run full CI and exact-source packaged smoke; link verified artifact and final evidence in PR #42. No merge/deploy.
