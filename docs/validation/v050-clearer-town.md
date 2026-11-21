# v0.50 candidate validation — 21 November 2026

Base: released main `e0b65bb92fced272db77eb66ab2463aae60075e9`. Branch: `ui/v050-clearer-town`. No merge/deployment performed. Scope and short owner steps: [Milestone 50](../MILESTONE50.md).

## Browser and functional evidence

Reference: managed Linux workspace, Node 24.19.0, Chromium 154.0.8037.57 (`/usr/bin/chromium`), Playwright from the existing workspace installation. Tests use HTTP, not a simulated DOM. Opening/developed walkthrough ran with the real clock; resource-funded fixture setup and explicit simulation stepping in legacy caravan tests are accelerated checks, not normal-clock playtime.

- Final acceptance: **15/15** — `quiet-town`, `clearer-menus`, `keyboard-help`, `asset-integrity`. Actual automatic event arrival ran for approximately 40 real seconds. Minimized expiry chose the original default once. Pause/World map froze its deadline. Detached choices could not charge a restored city, even after a new decision opened.
- Notice/trade regression: **24/24** — `caravan-ui`, `caravan-followup-ui`, `connect-town`. Retains both follow-up payment/return checks, real history, same-city restore, held Enter/Space protection, narrow trade layout, native disclosure and originating-menu/focus restoration. Old automatic-card/fade assertions now verify on-demand journal delivery; no transaction assertion was removed.
- Existing inspector/market/keyboard/asset regression: **26/26**. Native workplace pause, priority, stale restore and held-input checks passed. School scenarios and HUD checks at 320×740, 390×844, 430×932, 844×390, 1366×768 and 1920×1080 passed in the broader local run. A new immediate visibility assertion raced the 250 ms presentation refresh; waiting for the visible notification corrected that test, and the normal-clock rerun passed.
- **Packaged smoke: 6/6 passed**, including native gathering, road costs/Undo, camera/fullscreen, economy arithmetic and funded/persistent Valewatch survey. Final-head CI is recorded in the PR. The package uses the same index.html and release.json bytes as the acceptance run; final provenance is checked against its committed source.

The fresh independent review found same-type menu binding, Space activation, selected-site detection and Escape/native hidden-offer issues. Corrections use per-building/restore identity, native held-input guards, native worksite selection and close controls, and a logically closed automatic offer. Focus remains stable during refresh. Workshop operations reuse existing controls; the old redundant plank paragraph is suppressed while the new inspector menu is present.

## Presentation and compatibility

The opening has no floating Guide, chapter checklist or saying. Journal retains objectives and routine updates. Automatic decisions get an always-visible compact notice outside the horizontally scrolling toolbar. Native close controls prevent invisible logically-open panels or trading backdrops. Paused journal reading hides the large central Pause card while the top Resume control remains visible.

All new UI is presentation state. No schema or cost/reward change. Existing schemas 1–11 load through the unchanged validator. Journal entries reset on city start/restore; native persistent histories and acknowledgement state remain authoritative. Legacy checkpoint load and exact resource equality are tested. Paid painted art, music and videos remain embedded. Sound settings and audio-engine code are untouched.

## Measurements and media integrity

[Recorded measurements](v050/measurements.json) contain 180 animation-frame intervals per scene at 1366×768, 1× CPU, with no concurrent browser test suite. Opening and restored developed-town scenes were running, not paused. Median / p95 / p99 were **16.7 / 16.8 / 33.3 ms** opening and **16.7 / 16.8 / 33.4 ms** developed. JS heap samples were approximately **52.2 MB / 49.8 MB**; these exclude GPU/native decoded-media memory. This is a short UI regression measurement, not a new stress/performance claim.

The complete `sc47Art`, `sc47Media` and `sc47MediaLoader` source blocks match the released base byte-for-byte; SHA-256 values are in the measurements file. No asset files changed. The self-contained game grows by approximately 15 KB, with no new media requests or asset purchases.

Embedding check: `node scripts/embed-v026.cjs`, `node scripts/embed-v047.cjs`, `node scripts/embed-v026.cjs --check`. Final-head full CI remains a merge gate. Production approval stays with the owner.

## Owner opening follow-up

Replaced the obsolete journey tests with new-game video sequence, named local profile, latest-save return, reload, save restore and native world-map-origin selection checks. The old route/supply/death cards and separate journey button are removed. The existing portrait helper remains for saved rulers. The video-player source moves to src/v050/intro.js; embedded paid media bytes remain unchanged. Existing title/music and entry tests are rerun; new package/CI references are in PR73 after the correction.

The final owner-approved flow is New Game / Return to Game, with movies on every New Game. Nine focused entry/intro tests passed before the added confirmation case. The independent follow-up review identified fade cancellation, pause state, unreadable-slot preservation, rearming, menu resume, file-import generations and foreground timing; fixes are covered by focused regressions. Existing autosave tests now assert independent rotating slots rather than the retired 30-second manual-checkpoint overwrite. Final counts and final-head CI are recorded in PR73.

Final opening/save acceptance: **11/11** (`entry-flow`, `entry`, `journey`, `asset-integrity`) plus **2/2** asynchronous import generation tests. Updated independent-autosave/manual-protection case passed separately; the earlier legacy save/music run passed all unchanged cases, with its retired 30-second autosave assertion subsequently replaced and verified. Packaged smoke **7/7**, including a real New Game map selection and reload/Return path. A final latest-save summary display correction is checked by the same native entry/return smoke case before packaging. Active-minute tests advance a controlled clock and are explicitly accelerated; real gathering/road smoke and video decoding/sequencing use Chromium. All sc47 media blocks remain identical to the original v0.50 candidate.

## CI follow-up: camera and versioned smoke compatibility

Run 44945738109 exposed nine full-suite regressions and a live-stable compatibility failure. Reproduced locally before fixing. The journal button could wrap, while the delayed whole-map pan hint widened the zoom toolbar; both changed HUD height and therefore the captured map centre. Keep the journal label on one line and retain pan guidance in the existing zoom tooltip. No camera/save assertions were relaxed. All **9/9** previously failing capture/restore/zoom/Chronicle/priority cases now pass.

New save captures previously retained a hard-coded 0.28.0 createdWith tag. The native visible version and new captures now use the same runtime version; schemas and loaded simulation state remain unchanged. Genuine v0.7/v0.8.1 migration assertions pass.

The new entry-flow smoke case is mandatory for a packaged candidate and for v0.50-or-newer live metadata. It is skipped only when testing an older deployed stable release that lacks the feature. A local server serving the actual released e0b65bb bytes confirmed this compatibility path (one feature-specific skip, zero failures); the candidate's seven packaged smoke checks pass. Release scripts, digest checks and required CI gates are unchanged. Final-head CI is linked from PR73.
