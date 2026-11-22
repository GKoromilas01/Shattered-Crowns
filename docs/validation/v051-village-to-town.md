# v0.51 validation — From Village to Town

Candidate based on v0.50 PR #73 (`0dac78c`), not merged or deployed. Full final-head GitHub CI must pass before merge review.

## Evidence

- New charter, costs, current eligibility, all peaceful origins/reset, exact happiness boundary, pure progress reads, reservations, mixed cargo, phase saves, tampered state and native keyboard/narrow/held-restore controls: **8/8** passed after the independent-review fix; the portable checkpoint adds a ninth test. The final UI priority/hidden-control pass passed **9/9**. Existing Workshop/Market native UI tests passed **2/2** with actual pause, priority, keyboard dispatch and restore checks retained.
- Resource-funded route: **1/1** passed twice using real gathering, paid construction, real builders and production, with the old supplier agreement at stage0. It reached the return in **776.3167 accelerated game seconds**. This is not a normal-clock opening playthrough.
- A ready-to-claim checkpoint from that route is included in `samples/v051/`; it uses the portable checkpoint envelope/checksum. Native portable import and claim passed **1/1**.
- Earlier broader focused run: **61/64**, with three navigation timeouts (two legacy save tests at six seconds and one new test at seven seconds). All gameplay assertions that ran passed. The six-second failures were reproduced on unmodified v0.50. Navigation uses a separate 30-second budget, preserving existing action timeouts and assertions; save reload/import then passed **2/2**. New growth tests passed **8/8** with that budget.
- Packaged smoke passed **7/7** on `2566001` and **7/7** on committed history-cap fix `9de62e7`. The last UI ordering change is packaged and smoked again before delivery.
- Asset embed/check passed. Paid `sc47Art`, `sc47Media`, `sc47MediaLoader` blocks are byte-identical to v0.50. No new media, art spending or external asset requests.
- PR #73 CI `44953974828` failed only the stale inline-pan-hint test; quick and live-smoke passed. v0.50 intentionally keeps guidance in the zoom tooltip to prevent HUD/camera shifts. v0.51's updated test checks the tooltip, hidden inline hint and actual panning at all four edges: **1/1** passed. No release safety checks or gameplay assertions removed.

## Independent review

A fresh read-only whole-branch reviewer found one Important save-capacity issue: an incoming save could contain 512 completed supplier orders and an active 513th order. Regression reproduced the acceptance before the fix. The validator now rejects it atomically, preventing a return that would create an unloadable save. Regression and the complete new growth suite passed **8/8**.

Deferred minors: atlas reuse can retain the previous Marches home's “your settlement” label after changing origins; chartered Brookstead's descriptive sentence still says village under its Town heading. Neither changes the authoritative origin, earned tier or gameplay. These need presentation polish in a later pass.

## Implementation rulings

- Preserve the existing `tests/growth.test.cjs` workplace suite; new tests use `settlement-growth.test.cjs`.
- Update stale Workshop stock expectations to the visible v0.50 native menu facts and explicitly verify the duplicate legacy stock stays hidden; retain actual pause/priority assertions.
- Separate navigation allowance from action deadlines for a 21MB embedded page; do not change release safety checks or state/resource assertions.

## Normal-clock segment

From the real resource-funded mixed-ready checkpoint (previously reached using accelerated ticks), a separate native animation-frame play segment took **124.425 wall seconds** for **120.0762 game seconds**, with no advance helper or resource grants. Pause froze the clock; returning-phase restore preserved the journey. Exactly one 110-gold receipt completed, with original supplier stage0. Chromium154.0.8037.57; no browser/console errors. This confirms normal-clock cargo behavior, not a normal-clock full opening route.

## Final presentation check

An additional visible-screen assertion caught the new order below optional older chapters. Earned Town commissions and their supplier controls now appear first in Neighbour trade; Village order is restored on a new game/load. Keyboard, narrow-screen and restore tests remain authoritative. The existing supplier button display rule also overrode native hidden flags; hidden agreement choices now remain hidden. Both issues were reproduced before their fixes. No economic change.

## Remaining gate

Full final-head GitHub CI runs on PR #74. No passing CI or release readiness is claimed while it is pending. Owner/Claude retains merge and production decisions.
