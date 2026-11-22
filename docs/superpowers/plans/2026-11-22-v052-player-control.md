# v0.52 Player Control Implementation Plan

> Execute inline with superpowers:executing-plans; one fresh final branch review.

**Goal:** Player-selected builders, Leonardo-only playback and accurate in-game version tests.
**Architecture:** Native scStartConstruction assignment fix; preserve archived synth functions while limiting active audio playlist; source-embedded manual tester steps.
**Tech Stack:** Existing JavaScript/Canvas/DOM, Node/Playwright.
**Spec:** ../specs/2026-11-22-v052-player-control-design.md

## Global Constraints
No media changes, purchases, free goods, renderer progression changes, save-schema changes, main push, merge or deploy. Preserve existing sound controls, manual priorities and builder follow-up.

## Review Focus
- Production defaults, no selected worker, miners/woodcutters: orders preserved through placement and restore.
- Exactly selected friendly live workers can reassign; queued follow-up cannot steal unrelated gatherers or override new orders.
- Legacy music-style preference/API cannot reintroduce synthesized tracks; absent media remains silent.
- File playback remains audible, mute/music-off/zero volume and hidden-tab remain effective; diagnostics measure actual signal.
- Tester mode guides current version without mutating simulation or declaring automated passes; reinforcement remains real-cost and saved-state driven.

### Task1 — selected builders
- [ ] RED production-default real placement with three gatherers and no selection; only selected worker right-click assignment; orders through restore.
- [ ] Remove scStartConstruction fallback; GREEN targeted plus existing construction/follow-up checks. Commit.

### Task2 — active music and Advisor Tester
- [ ] RED four-file-only Next cycle including saved old style, mute/volume persistence; current tester actions/expected results.
- [ ] Keep synth archive, active Leo-only playlist and migration, file-aware diagnostics; data-only src/v052 tester steps embedded before core uses them. Update old style tests to new authorized behavior while retaining sound assertions.
- [ ] GREEN audio/opening/guide, existing reinforcement/camp checks. Commit.

### Task3 — delivery
- [ ] Record scope, tester steps, findings, validation and downgrade unchanged-schema notes; bump all runtime/release metadata0.52.
- [ ] Fresh reviewer once; Important fixes RED→GREEN; source/media integrity and committed package smoke.
- [ ] Push feature PR, start full CI on final head, provide verified ZIP and precise pending/passing status. No merge/deploy.
