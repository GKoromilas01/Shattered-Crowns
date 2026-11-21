# Release fallback query correction —21November2026

Owner approved implementing the diagnostic-backed correction. This is a release-controller bug fix on its own branch from main, not a gameplay/art/media version, merge, or deployment.

## Problem and evidence

Live v0.47 matched its published archive:13,666,996 bytes, SHA256`b65a3942c280981001f60b9bb09fae9a4574be0a512985f3dd3eafe8f6c6dfcf`. Its known successful release run is44864060304. Both GitHub API filters (`status=success` and PR70’s`status=completed`) omitted that run and selected older44777198395. The exact unfiltered workflow endpoint included44864060304, and client-side successful-run selection picked it. No truncation/gzip/20-second-timeout failure was reproduced.

[Read-only Actions proof44903683249](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/44903683249) · [Full diagnostic report and raw evidence](https://github.com/GKoromilas01/Shattered-Crowns/blob/617a46cf3dc4a3a705df878a012e00e3fc138f23/docs/validation/release-fallback-selection-2026-11-21.md).

## Change

Two controller lines relative to main: query workflow history without an API status filter; require`conclusion==='success'` in the existing client-side predicate. Keep the existing main/manual-run/current-run filters and`assertStableReleaseRun` completion/provenance checks. No changes to`payloads`, `assertLiveSite`, archive integrity, approval/environment protection, candidate verification, restore behavior, or release workflow. The existing100-record discovery bound is unchanged.

This supersedes PR70’s ineffective filtered-query proposal; PR70 is left open and unchanged for owner/Claude disposition. No rebase or force push of any other branch. No change to`index.html`, source rendering, graphics, audio/video, metadata versions, or`feat/v049-prep`.

## Validation

Added`tests/release-fallback-selection.test.cjs`. Watched the original filtered query fail before implementation, then **27/27** combined new regression and existing pipeline tests passed:

`NODE_PATH=/workspace/work/v026-art-sample/node_modules node --test tests/release-fallback-selection.test.cjs tests/pipeline.test.cjs`

Tests run the actual preflight with local API fixtures, never a real release. They require the unfiltered URL, select the known stable run over failed/current/PR/other-branch/older runs, reject foreign workflow/repository and unfinished success-looking records, and confirm an omitted release is not fabricated while the unchanged live-byte guard still rejects a wrong fallback.

Normal PR CI runs independently on the final feature head. No pending result is claimed green. Owner/Claude review and green required CI are prerequisites for any separate merge decision. This work does not authorize a release; the owner retains production approval.

## CI follow-up: live smoke Undo observer

Initial PR71 run44904383638 passed quick checks but live-smoke failed its6×6road Undo assertion (expected0, observed24). This job tests the unchanged deployed game, not the release-controller branch. The failing test read`window.scHoverBuildings`, a render/hover export refreshed on animation frames. Undo immediately reassigns the authoritative buildings array, leaving that export stale until the next frame.

A deterministic native-click regression observed`actual:0, hover:12, stone:500` in the same JavaScript task after undoing a12-road fixture. The original observer failed; the corrected observer passed with`observed:0` while`hover:12` remained stale. The500stone fixture is controlled test setup, not funded-play evidence. Browser cleanup runs after trace collection.

The smoke test now uses the existing authoritative`scCitySave.capture().state.buildings` through`tests/support/road-state.cjs`. Native placement and Undo, exact road counts, both geometric spans, full construction costs and exact refunds remain asserted. No sleeps, retries, skips, weaker expectations, gameplay changes or release-check changes were introduced.

Focused verification: `tests/road-state.test.cjs`1/1passed; the original real-resource/3×3/6×6smoke case1/1passed in41seconds. The27release/pipeline tests passed before this test-only follow-up. A single corrective commit triggers normal full CI on the new head; the initial in-progress run does not verify this changed test head.
