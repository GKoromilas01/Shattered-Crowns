# v0.51 validation — From Village to Town

Candidate based on v0.50 PR #73 (`0dac78c`), not merged or deployed. Full final-head GitHub CI must pass before merge review.

## Evidence

- New charter, costs, current eligibility, all peaceful origins/reset, exact happiness boundary, pure progress reads, reservations, mixed cargo, phase saves, tampered state and native keyboard/narrow/held-restore controls: **8/8** passed after the independent-review fix.
- Resource-funded route: **1/1** passed twice using real gathering, paid construction, real builders and production, with the old supplier agreement at stage0. It reached the return in **776.3167 accelerated game seconds**. This is not a normal-clock opening playthrough.
- A ready-to-claim checkpoint from that route is included in `samples/v051/`; it uses the portable checkpoint envelope/checksum and should be imported through the normal Saved city controls.
- Earlier broader focused run: **61/64**, with three navigation timeouts (two legacy save tests at six seconds and one new test at seven seconds). All gameplay assertions that ran passed. The six-second failures were reproduced on unmodified v0.50. Navigation uses a separate 30-second budget, preserving existing action timeouts and assertions; save reload/import then passed **2/2**. New growth tests passed **8/8** with that budget.
- Packaged smoke on gameplay candidate `2566001`: **7/7**. Final package is rebuilt after the history-cap fix and must be smoked again before delivery.
- Asset embed/check passed. Paid `sc47Art`, `sc47Media`, `sc47MediaLoader` blocks are byte-identical to v0.50. No new media, art spending or external asset requests.
- PR #73 CI `44953974828` failed only the stale inline-pan-hint test; quick and live-smoke passed. v0.50 intentionally keeps guidance in the zoom tooltip to prevent HUD/camera shifts. v0.51's updated test checks the tooltip, hidden inline hint and actual panning at all four edges: **1/1** passed. No release safety checks or gameplay assertions removed.

## Independent review

A fresh read-only whole-branch reviewer found one Important save-capacity issue: an incoming save could contain 512 completed supplier orders and an active 513th order. Regression reproduced the acceptance before the fix. The validator now rejects it atomically, preventing a return that would create an unloadable save. Regression and the complete new growth suite passed **8/8**.

Deferred minors: atlas reuse can retain the previous Marches home's “your settlement” label after changing origins; chartered Brookstead's descriptive sentence still says village under its Town heading. Neither changes the authoritative origin, earned tier or gameplay. These need presentation polish in a later pass.

## Implementation rulings

- Preserve the existing `tests/growth.test.cjs` workplace suite; new tests use `settlement-growth.test.cjs`.
- Separate navigation allowance from action deadlines for a 21MB embedded page; do not change release safety checks or state/resource assertions.

## Remaining gates

Normal-clock cargo confirmation, final committed-package smoke and full final-head CI are recorded when complete. No passing CI or release readiness is claimed while those are pending.
