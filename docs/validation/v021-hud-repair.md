# v0.21 responsive HUD repair

The 390×844 baseline at `9b5ed5b5` reproduces Food, Trade Goods and calendar overlap with Pause. The resource bar wraps while retaining a fixed height; other controls use independent viewport offsets.

The HUD now shares a wrapping flow. Its measured height reserves the playable map and supplies minimap/menu/panel clearance. Narrow City Life and Advisor panels also clear the minimap. Notifications stack above the command bar, dismissed messages leave the flow, and overflowing notices can scroll. Resize, fullscreen and deferred startup synchronize the map height.

## Verification history

- Fail-first 390×844 test reproduced resource/date/Pause overlap on the original v0.21 bytes. A later fail-first assertion reproduced the map starting underneath the taller HUD.
- Six HUD cases cover 320×740, 390×844, 430×932, 844×390, 1366×768 and 1920×1080. They check resource/date/control rectangles, map clearance, native Pause, Menu, Help/Chronicle close-button hit targets and House selection feedback.
- An earlier combined HUD/City Life/v0.21 layout batch passed 16/16. The six map-clearance HUD checks passed after correction. Counts overlap; required CI reruns all six on the final source.
- Initial CI [43032043433](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/43032043433) passed 400/408 and exposed eight real layout regressions: narrow panels overlapped the relocated minimap, the HUD intercepted road placement near the map top, and the map lost wheel-scroll overflow. Those findings caused the measured map/panel clearance corrections; that run is not green evidence.
- Preliminary local full and packaged runs also failed; concurrent browser runs caused additional startup/gathering timeouts. They are not passing evidence for the final source. Focused compatibility was rerun sequentially, preserving existing time limits and assertions.
- The final sequential compatibility batch passed **11/11**, with zero failures/skips/cancellations. It covers narrow City Life at 390/601/640, services at 390/768, 3×3/6×6/9×9 roads with exact costs and undo, and control hit targets at 1440/1024/768.
- Read-only review found no remaining critical or important issue after panel, map, fullscreen and startup corrections. All 128 inline scripts parse; `git diff --check` passes.

Local runtime: Node24.19.0, Playwright1.57.0, explicit system Chromium154.0.8037.57. Network policy blocked the pinned browser download. GitHub required CI independently uses the pinned browser, runs the complete regression/pipeline suite, packages the exact committed source, verifies it, runs packaged and deployed smoke, and gates `required-ci`. Consult PR #36's latest checks for the final result; earlier runs do not authorize merge.

## Corrected screenshots

Actual running gameplay and native House selection, without grants, injected buildings, replacement art or compositing:

![390×844 HUD and construction feedback](../screenshots/v021-hud-fixed-390.png)
![1366×768 HUD and construction feedback](../screenshots/v021-hud-fixed-1366.png)

No merge or deployment is performed by this repair.
