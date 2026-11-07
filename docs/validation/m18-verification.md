# Milestone 18 verification

Base: merged M17 `46d318857386a2da0df917a6e5479356648d1740`; post-merge run `42044740366` passed verify, live-smoke and required-ci. Separate documentation PR #23 remains unmerged by Atlas.

Targeted local evidence: 23 browser cases passed for origin/save/chooser journeys, deterministic geography, phone/desktop map controls, default/optional audio, painters and City Life focus/hit tests. Subsequent focused cases verify corrected five-start availability text, the optional audio mix and six actual economy cycles per new origin. Local browser: Chromium 154.0.8037.57, Playwright 1.57.0, Node 24.19.0. CI uses the lockfile-pinned Chromium build.

For candidate `2c37c7838cfa7e3dc20e2b7b934a69cddb9d97a0`, the PR reports **299/299 regressions and 5/5 packaged smoke tests** in [exact-head push CI](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/42056438891) and [PR CI](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/42056490802). Both reported verify, live-smoke and required-ci success. The playable artifact, source hashes and screenshots are linked in PR #25. These results belong to the original candidate head, not a rerun of this later documentation-only commit. No merge/deployment is performed by this verification.

Fresh review found one Important issue: the existing atlas key guard blocked native continent-map panning. The new real-scrolling assertion failed at 390 and 1440 before the fix and passed at both widths afterward. The guard now permits native scroll keys only within the continent viewport while stopping game input propagation. No Critical or other concrete Important findings remained. Musical aesthetics and longer-term balance are reserved for owner playtesting.

Additional local evidence: all ten governor cases passed, including thirty simulated seconds of real food production for every new origin; map/audio checks passed 6/6; an exact-source package at `5e4d924` passed all five packaged smoke journeys. The full suite initially caught an obsolete two-start wording assertion; it was updated to explicitly require five playable homes, and the title journey then passed. Final candidate/CI results in the PR supersede these intermediate commit references.

## Independent review checkpoint (2026-11-07)

Reviewed governor, living-map and optional-music test source plus branch ancestry. Tests assert five start identities, legacy save restoration, deterministic settlement locations, keyboard atlas panning without moving the city, and default/optional music preference behavior. No blocking defect was established by that source inspection, which does not substitute for an independent browser test run or a full implementation audit. Windows audio/visual playtesting remains for the owner. This documentation-only follow-up creates a new commit head; required checks should be verified again before merge consideration.
