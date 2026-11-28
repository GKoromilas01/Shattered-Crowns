# v0.69 verification — Settlement Cinema

28 November 2026. Base: v0.68 First Winter candidate `806398f`. No merge, release or deployment.

## Observed checks
- Baseline pure First Winter rules: 1/1 passed.
- New subtitle test initially failed on inconsistent color/font/background; inspector tests failed on absent controls/API. Optional milestone replacement test failed before hook added.
- Focused browser suite: `CHROMIUM_PATH=/usr/bin/chromium node --test tests/settlement-cinema.test.cjs tests/first-scenes.test.cjs tests/first-winter.test.cjs tests/cinematic-opening.test.cjs tests/clearer-menus.test.cjs tests/road-state.test.cjs` —22/22 passed before additional keyboard regression.
- Additional keyboard regression: chooses a direction with available viewport scroll; focusing road control and holding an arrow does not pan. 1/1 passed. Existing sc19GovernorController window capture protects all inspector buttons; no speculative camera rewrite made.
- Reviewed desktop 1366×768 inspector screenshot: needs/road action inside selected building, no floating road button or overlap with map controls.
- Rebuild and `node scripts/embed-v026.cjs --check` passed. No generated art/music/video changed.
- Full `CHROMIUM_PATH=/usr/bin/chromium npm test` started; long-running full-suite success NOT yet claimed.

## Independent review
Fresh read-only reviewer checked source/engine bridge/media fallback. Proposed keyboard-capture finding was checked against the full application: existing window capture handler protects inspector buttons before document camera handling, confirmed by scrollable-direction regression. No other blocking findings reported. Reviewer confirmed the existing handler and withdrew the finding; no actionable findings remain.

## Pending
Owner-approved three 6–7 second Leonardo clips and 120-second anthem: prompts only, no assets or spending. Missing clip keys retain old cards. Exact-head GitHub quick/live-smoke/verify must pass before owner/Claude release. Package/smoke results and PR recorded in follow-up evidence.

Pipeline regressions: `node --test tests/pipeline.test.cjs` —22/22 passed with required execution permissions. Both `sc47Art` and `sc47Media` embedded blocks compared byte-for-byte with base: unchanged.
Final feature + player-control run: `CHROMIUM_PATH=/usr/bin/chromium node --test tests/settlement-cinema.test.cjs tests/player-control.test.cjs` —11/11 passed, including all seven new feature tests and version-aware Advisor Tester guidance. Earlier 22-test cinematic/menu/winter/road run also passed. Focused union:27 unique tests, plus22 pipeline tests. The full suite remains running; do not describe it as passed.
