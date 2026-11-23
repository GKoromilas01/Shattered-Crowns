# v060 validation — 22 November 2026

Node24, Chromium154, existing Playwright installation. Embedded source check passes. No new media assets.

- Economy, saves, pipeline, open seas and settlement growth: 74/74 passed (`/tmp/v060-regressions.log`).
- Frontier/pacing suite: 8/8 passed (`/tmp/v060-final-frontier.log`): real frame clock, warning/grace, actual Keep controls, native combat for250 simulation seconds, pause/hidden timing, older import grace, strict save rejection, and unobstructed outpost placement.
- Prior current Tester check:1/1 passed. Current Tester additionally documents optional validated native `PLAYTEST_FRONTIER.json` import.
- Fresh review exposed a real defect: hold-position defenders watched enemies destroy the Keep. Confirmed with native combat, fixed with local engagement near home, regression now proves damage dealt and Keep survival. No other critical/important review findings.
- One earlier Playwright trace teardown failed; clean focused rerun passed8/8. Do not hide this transient tooling failure.
- Browser previews: normal painted renderer river, open sea, mobile ship controls and partner map captured without browser errors or ship inspector overflow. See v060/ images.

Final quick suite and committed-package smoke results are recorded in the PR/delivery. GitHub exact-commit CI is a separate requirement: pending is not verified. The v058 pre-release remains unchanged. Release API unavailable after browser device authorization/Forbidden CLI completion; do not repeat login.

Final focused rerun: frontier8/8 passed (`/tmp/v060-last-frontier.log`). Pace badge/native frame test1/1 passed after delayed-toolbar attachment fix (`/tmp/v060-badge.log`). Broad quick run reported a Keep menu timeout: screenshot confirms a click selected a worker during deferred opening camera layout, not a failed tax computation. Isolated tax check passed1/1. Menu fixture now waits for the actual painted renderer and two layout frames before using map coordinates.

After renderer-readiness fixture correction, complete building-menu suite3/3 passed (`/tmp/v060-menus-final.log`), preserving real mouse interactions and all tax/economy assertions. The earlier tax-only run also passed1/1. No tax gameplay change was needed.

Broad quick suite finished61/62, with only the documented pre-layout Keep click timeout. Corrected menu fixture then passed3/3, including that check. Packaged smoke finished6/7: economy-cycle wait retained the old12-second limit while a five-game-second cycle now takes15 real seconds. Its two cycle waits now use36 seconds; assertions and simulation speed are unchanged. Focused rerun evidence is linked in PR78. The other six packaged checks passed, including actual resource gathering and full road-cost/undo checks.
