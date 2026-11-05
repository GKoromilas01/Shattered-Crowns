# Milestone13 verification

Baseline: PR17 merge `606abee3c0fff4320b347bc4704d8de5be05e0d4`. Its [post-merge CI](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/41925460499) completed successfully:220regressions,5packaged smokes,5read-only live smokes and the required-ci aggregate. The merged tree matches the approved M12 head. No second baseline full run was needed. Production remains unchanged.

Branch: `feat/m13-gameplay-polish`; draft review against main. No other open PR/development branch was found when planning began. The implementation follows [the scoped plan](../superpowers/plans/2026-11-05-gameplay-usability.md). Final source reference and CI links are recorded in the PR to avoid self-referential commit hashes.

## Targeted regressions

The initial14cases ran on the unchanged merge:13failed for missing usability changes and the genuinev0.12save compatibility case passed. A separate running-resource-guide case also failed before implementation. Tests exercise real pointer/keyboard UI, the real Web Audio graph and actual placement/resource spending/Undo. Funds/unit-position adapters are confined to private test fixtures; production has no test hooks.

Focused coverage includes native-radio home selection and preview/commit behavior; phone/laptop layout; Home/End/arrows/Space/Tab; one AudioContext and sustained music across repeated choices; explicit mute/zero volume; genuine paused-workplace restore; tower/fortress/wall placement without worker selection and with army selection; exact180boundary, missing/dead/enemy workers and post-arming budget checks; regional SVG features, future previews and guarded city-resource navigation; preserved origin, view, Pause and simulation state; continued running-city progress after atlas return.

The resource tests caught a first-open focus failure: existing City Life renders on the next task, so immediate section navigation preceded the heading. The bridge now navigates after that render. The camera tests caught HUD hover edge-panning away from the map boundary; HUD containers now join the existing terrain-pan exclusions. The focused regression requires actual nonzero scroll so clamping cannot hide drift.

## Full verification

Run `CHROMIUM_PATH=/usr/bin/chromium TEST_ARTIFACT_DIR=test-results/m13-full npm test` locally, followed by exact committed-source package build/manifest and Git-source verification and five packaged smoke journeys. Local browser version is Chromium154.0.8037.57/Playwright1.57.0/Node24.19; CI installs the Playwright-pinned browser. Exact final counts, source commit, CI runs and candidate ZIP are recorded in the PR after completion. Required GitHub CI independently runs the full suite, packages the committed game, validates its checksums and smoke-tests that package before publishing a candidate. No release/deployment is triggered.

Fresh read-only review found no Critical/Important issue and one stale generic invalid-placement hint saying selected worker. The hint now says friendly worker. Reviewer also recommended direct range-ring coverage; the browser test records the actual canvas180unit arc while moving the pointer between workers. Physical Windows audio and final owner/Alex acceptance remain outside automated review.

## Audio and human limits

The approved scAudioController script SHA256 remains `a3a8ddd688b8db41be126bddf36ac7efc50a9a79074d5f14f2cc3461a1be8c0b`, unchanged from M12. No gain, score, scheduling, ambience or effect changes. A Linux native-popup probe did not reproduce a multisecond interruption (68samples, largest observed wall gap230ms; context running). Removing the title's native popups removes that interaction path; it does not establish the Windows root cause. Automated RMS/context results cannot prove physical-speaker audibility. Owner Windows listening remains useful.

Only Marches home and Brookstead are playable. Other continents/kingdoms remain inspection-only; regional terrain remains illustrative. Defense range remains strictly180units and workers do not move automatically. Save formats and economic rules are unchanged; paused-workplace saves still requirev0.12+.
