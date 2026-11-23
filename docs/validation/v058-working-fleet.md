# v058 validation record

Mission tests cover actual sailing/catch unloading, trade escrow/recall/payout, coastal attack, protection against a route raider, mission save roundtrip, bad cargo rejection, legacy14 migration, hidden-tab freeze, Fleet controls, target death/return and sinking with non-reused IDs. See tests/working-fleet.test.cjs.

Review found target-death return reset and low-frequency fade stepping: reproduced/fixed, with regression and frame-driven fades. Fleet null-mission rendering error was caught by native UI tests and fixed. The older style assertion assumed one of two equivalent shared affordability classes; it now accepts either while still checking icon, cost and last position.

The first broad economy run had35/36 passing, including all22 pipeline cases. The housing case failed page.goto's6000ms load timeout before assertions; a baseline run passed. Navigation timeout increased to30000ms and the exact housing case passed. No growth behavior was changed. A transient Playwright trace-stream teardown failure on the attack-return case required a clean mission rerun; do not hide it as an application bug.

Cinematic suite4/4 passed (transparent caption, separate narration, hidden time, reduced motion, matching clip-end opacity). Earlier harbour/boat/growth regressions passed except the UI issues subsequently fixed and rerun. Final commands/results and package smoke are recorded in PR77 delivery; full remote CI is a separate pending check. Desktop/mobile Fleet previews are in v058/; narrow overflow and × close verified. No deployment.

Final clean mission suite:8/8 passed. Focused native UI/Tester rerun:10 passed plus sinking subsequently fixed and verified in the clean mission suite. Housing/protection follow-up:2/2 passed. No asset files changed.
