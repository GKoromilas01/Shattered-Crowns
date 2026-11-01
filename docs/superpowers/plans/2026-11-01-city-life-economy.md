# City Life & Economy implementation plan

Spec: ../specs/2026-11-01-city-life-economy.md
Execute inline as requested by the owner, with one final independent code review.

1. Verify the isolated baseline and write failing browser mechanics tests using response-only fixtures. Expected: 14 baseline passes; new snapshot/mechanics tests fail.
2. Extend the engine's existing cycle with persistent housing progress, migration, auditable food flows and prosperity factors. Publish read-only snapshot. Expected: mechanic browser tests pass; road planner and menu controller source hashes unchanged.
3. Reuse City Life/Advisor and correct Chronicle estimates to render this snapshot; ensure panel closing, viewport limits and no button overlap. Expected: UI and pause/reset tests pass.
4. Add five-minute actual tick simulation, recruitment/minimap protection and PR CI. Run all Chromium tests, investigate/fix failures, rerun the full suite. Capture screenshots and exact results.
5. Independent whole-branch review; fix important findings with regression coverage. Commit/push feat/city-life-economy, create PR against main referencing #1, report results and request release approval only.

Review focus: starvation recovery; destroyed housing/services; partly staffed bakeries; all stock arithmetic; stale legacy figures; pause/reset; short/narrow desktop windows; AI raids during multi-minute simulation. Existing road geometry, costs/refunds, recruitment and controller are immutable constraints.
