# v0.21 Room to Build — verification

11 November 2026. Base main c4454b2, released v0.20. Dedicated branch feat/v021-town-layout; PR36. No merge, release dispatch or deployment.

## Scope and source

Supply/Markets move into the stable optional City figures disclosure, retaining their original data writers. New civic plots share a physical-radius-plus-ten minimum against buildings and unfinished sites, retaining any larger existing threshold. Road and defense candidate formulas, shoreline/terrain rules, prices, rates and saves1–5 stay intact. Existing accepted towns are not relocated. Construction-only guides use the same spacing helper as canPlace.

Owner screenshot and browser probes confirmed the whole finite city was visible on the large display. Zooming in restores edge panning. No scrolling regression was reproduced or claimed fixed. Whole-map guidance is presentation only. Connected regional travel and server-authoritative multiplayer remain future directions in FUTURE_WORLD_DIRECTION.md.

Game/release bytes frozen in06a4bcfa5b87d44684fe619cf19372a92cfd604b; test synchronization follow-up7d1e662f710e1bcbdd7724f8bae3c611a2ed05f4 changes no game/release bytes. Final package uses7d1e662 provenance.

## Local checks

- Fail-first regressions reproduced permanent HUD diagnostics, insufficient house/primary-building clearance and missing map-fit guidance. Exact legacy restoration already passed.
- Focused construction/schema-five/graphics/layout batch27/27 passed. Positive connected-producer/served-home case1/1 passed separately. These overlap the full suite.
- All127 inline scripts parsed; git diff --check passed.
- Standard `CHROMIUM_PATH=/usr/bin/chromium npm test`: **402 tests exercised;398 passed,4 timed out,0 skipped/cancelled**,3463.8seconds. This is not a clean402/402 full-run result. All seven new layout tests passed, including the corrected asynchronous label wait.
- The four timeouts occurred in existing scenarios: City Life and Advisor reachable controls at1440px (Pause click completion6000ms); gathering-order save restore (page load6000ms); corrupt-state save validation (Enter city click6000ms);3×3 road costs/undo (Enter city click5000ms). No gameplay assertion failed in these cases. Pause screenshot showed the click applied; browser diagnostics had no uncaught JS errors.
- Explicit unchanged recheck of those exact four cases: **4/4 passed**,43202.8ms, with original assertions and time limits. Separate artifacts preserve the original failures. This is a recheck result, not a replacement for the full-run record.
- An earlier three-worker full-run attempt was stopped after a page-load timeout under parallel load; it is not used as passing verification evidence.

Runtime: Node24.19.0, Playwright1.57.0, explicit system Chromium154.0.8037.57. Standard full-run environment/events/JUnit/failure traces: test-results/all. Rechecks: test-results/timeout-recheck. Logs/ledger: work/v021. GitHub's pinned browser is a separate CI gate.

## Independent review and visuals

Read-only independent source review found no Critical/Important issues in shared preview/placement validation, road/defense exclusions, legacy handling, DOM startup/live updates or camera-fit state. Its minor request for a positive live-data case was implemented and passed.

Four screenshots from actual paid construction and resource gathering were captured and inspected at390×844 and1440×900: docs/screenshots/v021-spacing-*.png and v021-detail-*.png. No grants, injected buildings, fabricated statistics, external art or image compositing were used. Spacing images are captured during running gameplay to keep the reservation guides visible; details images show actual city metrics/checkpoint status. This is incremental readability work, not a renderer overhaul or the future harbour target.

## CI findings

Initial source06a4bc CI run43016108715 completed401/402: the new1440px diagnostic test raced the existing1000ms label refresh and read 'waiting for economy tick'. It now waits for the exact measured Supply/Markets text before preserving the original assertions. No production timing or economy was altered. That failed run is not green evidence. Check CI on the latest PR head before recommending merge.

## Package

Build, file checksums and verifyGitSource passed for work/v021/candidate-final at7d1e662. Local manifest verificationRunId0 is not release approval.

- Game SHA256: f71a161c76189ec826ad35af990b0ed6c97dda28120d7d545e827a8a1b3cc4bf.
- Release metadata SHA256:42e6142d4736268498aba96931986b5a2c388f765ec0a89b6c9e495aaac66771.

**Separate exact-source packaged smoke:5/5 passed**,0 failures/skips/cancellations,96.3seconds. Build/checksums/verifyGitSource all passed for the same7d1e662 candidate. Physical devices, other browser engines and owner preference/balance playtesting remain outside this local evidence.
