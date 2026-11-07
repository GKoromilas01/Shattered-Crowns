# Measured City Advisor validation

Base: `46d3188` (v0.17.0). Development branch: `feat/m18-city-advisor`.

## Focused validation

`CHROMIUM_PATH=/usr/bin/chromium node --test tests/advisor-model.test.cjs tests/advisor.test.cjs`: **12 passed, zero failures** on the final implementation.

Six pure assessment tests cover precedence and immutability, last-cycle balance/demand and overflow, unmeasured food, no staffed harvest, full housing, paused-job exclusion and authoritative growth checks. Six browser scenarios cover three viewport widths (390/768/1440), visible Close and Review controls, first-open section focus, state/view/Pause preservation, live updates, held Space/pointer activation, focused control retention, voluntary workplace pauses, actual selected workers/armed house placement, and advice after save restoration.

Before implementation, six model tests failed for the missing assessment and browser tests failed for missing priority cards/evidence. Browser tests then reproduced the first-open section timing issue. A visual inspection and failing phone bounds assertion caught the Close control being pushed below the panel. Both reproductions pass after their fixes.

Phone and desktop screenshots: `docs/screenshots/m18-advisor-390.png`, `docs/screenshots/m18-advisor-1440.png`. Visual inspection confirmed readable evidence and native scrolling with the title and Close control above the priorities.

## Review and limits

Independent read-only review found no critical/important issues. It identified two coverage gaps (armed placement and restored-save refresh), addressed by the final browser scenario. The reviewer independently ran six model tests successfully; the implementer ran browser verification.

Node 24.19.0, Playwright 1.57.0, explicitly selected system Chromium 154.0.8037.57. This validates Linux Chromium including narrow viewports, not physical phones or other browser engines. No paid/external services, new dependencies, save schema changes, balance changes, merge or deployment.

The initial broad run was stopped during development and is not counted as a passing baseline.

## Complete regression and artifact results

- `CHROMIUM_PATH=/usr/bin/chromium npm test`: **290 passed, zero failures/skips**, 1,533.6 seconds. The runner enumerated the earlier advisor coverage before the additional armed-placement/restore scenario was added. The final focused rerun above includes that scenario and verifies the final Close-control correction; no subsequent production changes were made.
- `node scripts/release.cjs build work/m18-site` and `node scripts/release.cjs verify work/m18-site`: passed for source commit `6b531d39b67759d1ba2724afebfa65ecb908666c`.
- `CHROMIUM_PATH=/usr/bin/chromium SMOKE_DIR=work/m18-site EXPECTED_RELEASE_SHA=6b531d39b67759d1ba2724afebfa65ecb908666c TEST_ARTIFACT_DIR=test-results/m18-packaged npm run test:smoke`: **5 passed**, zero failures/skips. Actual packaged bytes and source provenance verified; startup, Advisor checklist, real gathering/road costs/undo, camera/fullscreen and economy progression exercised.
- Both new test files pass `node --check`; `git diff --check` passes.
- Script-body comparison against base shows only `sc1311AdvisorAndPause`, `sc1321AdvisorPriorities` and `cityEconomyPresentation` changed, plus new `cityAdvisorAssessment`. Simulation, save implementation, renderer and audio script bodies are unchanged.

Detailed full-run artifacts: `test-results/all/`; packaged smoke: `test-results/m18-packaged/`. These are local ignored artifacts. The retained package is local only; release identity remains v0.17.0 and no hosting action was taken.
