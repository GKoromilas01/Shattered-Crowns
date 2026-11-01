# Stabilization review — 1 November 2026

Base: `GKoromilas01/Shattered-Crowns`, commit `0939e63`.

## Changes

- Consolidated Construction/Units palette state and button handlers in `sc140UnifiedUI`. Removed overlapping Construction wrappers, bar capture interception, duplicate Units listeners, and three later Units patches. Compatibility calls use the same controller. Explicit Units/Escape transitions cancel the engine's armed placement tool; Units switching does not center the camera. The H shortcut still intentionally centers the Keep.
- Preserved the road planner and placement algorithms. Diagonal road gestures still produce perimeter dimensions of at least 3×3, rounded upward in multiples of three. Straight roads, continuing from existing endpoints, costs, atomic placement, and undo remain supported.
- Moved heraldry integration into the engine scope containing its atlas/lore functions and data. Dropdown changes now refresh the atlas heraldry too. This fixes `ReferenceError: showHistoricalRegion is not defined`.
- Renamed logistics and market economy snapshots to avoid collisions with browser globals generated from element IDs. This fixes the supply `toFixed` error before the first economy tick and the related market `undefined` display.
- Separated Menu from Pause, restored the existing atlas and fullscreen actions through Menu, and close Menu when toggling fullscreen.
- Added a Node test runner suite using Playwright and Chromium. It starts its own local HTTP server and rejects uncaught JavaScript errors in every scenario.

## Coverage

Repeated Construction → Units → Construction, nested button targets, camera position, rapid switching, armed-tool cancellation, Escape; house placement/costs/occupied ground/undo; 3×3, 6×6, 9×9 road dimensions, costs and refunds; straight extension and undo; insufficient-stone atomicity; advisor checklist persistence after close/reload; arrow/wheel/right-drag camera movement; actual fullscreen entry/exit; command scrolling and button hit targets at 1440, 1024 and 768 pixels; kingdom/settlement atlas rendering and supply updates after an economy tick.

Road tests use a Playwright response fixture that changes starting resources only. It does not modify production balance or bypass placement validation. Larger road tests use clear terrain; earlier failures over the Keep correctly demonstrated the blocked-perimeter rule.

## Reproduce

```sh
npm install
npx playwright install chromium
npm test
```

This managed environment already provides Playwright 1.57.0 and system Chromium, so verification uses:

```sh
NODE_PATH=/opt/codex/cua_node/lib/node_modules npm test
```

## Final validation

- Full Playwright/Chromium suite: **14 passed, 0 failed, 0 skipped**, 96.4 seconds (fresh pre-deployment rerun).
- Every scenario completed with zero uncaught JavaScript errors.
- `git diff --check` and `node --check tests/stability.test.cjs` passed.
- Real game rendering was visually inspected in Chromium after an economy tick; supply and market values rendered correctly. The inspection also found and corrected a stale Construction hint, with a failing regression captured before the fix.
- Independent static review found no important regressions.
- Full test transcript is retained locally in `work/deployment-tests.log`.

## Limits and release status

This is Chromium desktop coverage, including narrower desktop viewports; other browser engines, touch input, and long-running economy/battle balance have not been certified. Horizontal scrolling of the construction palette is intentional. The existing game still contains older unrelated UI and gameplay layers; this stabilization removes the conflicting menu handlers without attempting a wholesale rewrite.

The repository owner approved publishing this stabilization to `main` on 1 November 2026, conditional on a fresh successful 14-test rerun. That rerun passed before the release commit. Deployment uses the repository's existing GitHub Pages workflow; no new features or road planner changes are included.
