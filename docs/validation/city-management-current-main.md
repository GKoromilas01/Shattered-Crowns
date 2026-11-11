# City management with construction and graphics

9 November 2026. Base main after PR #33: `626f55e`. Incoming existing PR #29: `39f2c35`. Work occurs on a new branch; original candidates and production remain unchanged.

## Integration

Governor’s Hall and five detailed workplace panels consume the existing city snapshot and operations. Preserve construction controller, schema-five projects, current graphics/spacing and live detailed Advisor refresh. Save `createdWith` follows the incoming 0.19.0 release metadata, while schema choice/validation remain current main’s.

Pre-integration checks: all 15 current construction regressions passed. The three incoming integration tests reproduced the missing Governor/inspection and unbounded starvation departure timer. The merge retains the existing 15-second timer bound fix. The schema conflict was resolved by retaining unfinished-project schema five.

The incoming guided-growth helper first failed its immediate-farm assertion. Updated setup now gathers actual missing materials, asserts exact spending and non-operational foundations, assigns the same real map workers, and waits for completion. No resource grants or production/rate changes. Original thirty-minute population/occupied-upgrade/food/conservation/restore assertions remain.

## Verification in this session

Resumed 11 November after environment interruption. Saved focused results: 49/49 integration/workplace/Governor/construction/camera checks and 12/12 long-run/construction integration checks passed, zero failures/skips. The latter includes five thirty-minute baseline/continuation runs, five resource-funded guided-growth/continuation runs and phone/desktop foundation-to-workplace lifecycle tests. Full-suite and immutable-source package results are recorded below when complete. Historical reports are not evidence of the current combined source. Explicit system Chromium is used; its version is recorded by the runner. No CI result, physical-device coverage or deployment is claimed here.

## Independent source review

Read-only whole-branch review found no Critical/Important defects. It confirmed both controllers, construction schema-five handling, foundation/workplace separation, activation invalidation, live Advisor refresh and legitimate resource-funded setup. Reviewer did not independently run browsers or assess screenshots/package results. Deferred minor: guided-route cycle reports omit the intervals spent constructing, while end-state and checkpoint-continuation assertions still cover their effects.

Phone/desktop screenshots captured from the actual Datehaven game after a completed production cycle: `docs/screenshots/current-main-governor-{390,1440}.png` and `docs/screenshots/current-main-workplace-{390,1440}.png`. Capture recorded no browser errors. Inspected phone Governor and desktop workplace images: text, controls and panel boundaries remain readable; the workplace panel is above Pause.

## Final local verification — 11 November

Frozen game source: `6b2c55a18f52748f91b5e89f399bd1c43f184e1c`.

- `CHROMIUM_PATH=/usr/bin/chromium npm test`: **377/377 passed**, zero failures, skips or cancellations; 1,855.9 seconds. This includes the suite’s five smoke journeys.
- Separate exact-source packaged smoke: **5/5 passed**, zero failures/skips. Build, file checksums and `verifyGitSource` all passed. Manifest verificationRunId `0` identifies local verification, not a GitHub release approval.
- Node 24.19.0, Playwright 1.57.0, explicit Chromium 154.0.8037.57. Full runner environment and events are retained locally under `test-results/all`; packaged evidence under `test-results/packaged`.
- Game SHA256: `7a61dc7cb8b18923e6395783480c1c3a70efb5361e2f42d8730e5d946d876b6d`.
- Release metadata SHA256: `6be6ff5eb837fa387421956ed1cf975669e7f6ad51b1bf92ca4dc893c2924cf6`.
- All four phone/desktop images inspected. No new runtime issue found. Original visual controls, current construction and save behavior are retained.

This final documentation follow-up changes no game, release or test bytes. GitHub CI remains an independent merge gate; it is not polled and no CI result is claimed. No main merge, deployment or production-setting change occurred. Physical devices, other browser engines and Windows listening remain owner playtesting.

## Integration decisions

- Use a separate worktree and new branch, preserving existing candidates; the cost is extra local disk use.
- Use a task-local npm cache after the default cache proved unwritable; dependency versions remain unchanged.
- Keep both appended controllers and main’s schema-five capture, advancing only createdWith to 0.19.0; reverting this choice would lose construction controls or pending-project compatibility.
- Retain the incoming stronger startup-camera test, with a home-origin fixture and immediate state/view equality. Focused and full runs both passed; its stricter delayed assertion may need browser-layout diagnosis if another browser differs.
