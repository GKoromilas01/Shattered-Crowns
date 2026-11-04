# Milestone 9 verification

Base: v0.8.1 main a76e3090e6998e7a555400841da3e9f17464ef37. GitHub post-merge run 41736016163 passed 160 regression cases and five packaged smoke cases on pinned Chromium 143 before this work. Latest main and absence of open PRs were checked before branching. Existing linked workspace reused on feat/m9-living-world; no other worktree changed.

## Test development

Eight new browser cases failed against v0.8.1 because the catalog, world views, landmarks and openWorld method did not exist. Implementation followed. The first combined run passed all twenty original kingdom cases and seven new cases; the remaining assertion incorrectly compared snapshot creation timestamps. It now compares state, view, campaign and city identity, retaining the invariants the feature must preserve. No runtime workaround was introduced for that test.

The new tests exercise actual continent/kingdom navigation and future-region boundaries, catalog relationships/immutability, landmarks, focus after live refresh, state and clock freeze while browsing, previous Pause restoration, schema-two restoration and responsive map geometry. Existing kingdom tests retain minimum-zoom entry, focus return, hotkey isolation, legacy schema-one import, peaceful mode, classic battles and readiness rules.

Exact-source package and smoke results are recorded in the PR with the pinned candidate SHA. Browser setup: Node24, Playwright1.57, explicit systemChromium154 locally; CI uses the lockfile browser. File:// navigation is blocked by managed browser policy, so HTTP package checks do not certify the owner's Windows local-file environment.

## Screenshots

- [Desktop regional map](../screenshots/m9-region-1440.png)
- [Desktop world overview](../screenshots/m9-world-1440.png)
- [Phone regional map](../screenshots/m9-region-390.png)
- [Phone world overview](../screenshots/m9-world-390.png)

Artwork is original inline SVG, deterministic and self-contained. Screenshots use the actual game and UI; no separate mockup is substituted for gameplay.

Focused final run: **20/20** (ten planning and ten world cases), zero failures or skips. The twenty existing kingdom cases passed in the earlier combined run. Responsive checks include 390×844, 768×900, 1366×606 and 1440×900 with all eight regional markers checked for overlap. `tests/fixtures/city-v081.json` was captured from the exact released main source a76e309, served without engine adapters; its measured state, schema, city ID and saved Ironmere selection restore unchanged. Only createdWith becomes 0.9.0.

Fresh read-only whole-branch review found no Critical, Important or Minor issues and no declined judgments. It inspected source, tests, compatibility boundaries and desktop/phone screenshots.

## Complete source regression

The uninterrupted full project command `CHROMIUM_PATH=/usr/bin/chromium TEST_ARTIFACT_DIR=test-results/m9-full npm test` passed **170/170**, with **0 failures, 0 skipped, 0 cancelled**, in 980.7 seconds. Tested commit: `9c4c5a927268d663350d3fadeb18ae1772a56be8`. All 160 existing regressions remain, with only the expected current createdWith version updated in the existing planning fixture assertion; ten Living World cases are added. Logs, environment metadata, browser errors, screenshots, JUnit and JSON-line results are in `test-results/m9-full`.

For the initial candidate, the final evidence commit changed documentation only; runtime and release metadata were unchanged after that run. The subsequent owner-playtest changes and their fresh verification are tracked in [the entry follow-up](m9-entry-followup.md). Source/index and release.json must remain byte-identical to the tested commit before exact-source build and package smoke. No merge, deployment, service purchase or paid infrastructure activation is authorized.
