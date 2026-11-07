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

The initial broad run was stopped during development and is not counted as a passing baseline. The complete regression run and artifact checks are recorded below once finished.
