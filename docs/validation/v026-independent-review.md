# v0.26 independent review checkpoint

A fresh read-only reviewer inspected the production changes against released f98d187, the approved scope and implementation plan. It did not alter code or run browser suites during measurement.

Five P2 findings were accepted after checking the actual active paths:

| Finding | Resolution | Covering regression |
|---|---|---|
| Workshop preview absent from active overlay | Add workshop to the production placement whitelist and retain normal validity/reservation guides | Workshop shows the active production placement validity feedback |
| Map health indicators removed | Restore bounded health bars for damaged/selected entities and skirmish units | Damaged units and buildings retain map health bars |
| Enemy worker/building ownership invisible | Add enemy ground/flag cues without costly per-object Canvas filters | Hostile workers and buildings have visible ownership cues |
| New journey can predate old follow-up | Seed strict chronology from the prerequisite return, not zero | Supplier cargo cannot depart before the old Ironmere follow-up returned |
| Reduced-motion order target still pulses | Guard cosmetic marker motion with reduced-motion, Pause, overview and hidden-tab state | Reduced motion keeps selected order-target rings still |

All five failures were observed before their fixes. Their regressions passed afterward. The existing biome identity was also pinned by a failing regression and restored. A later partial-yard test initially asserted a Boolean return from the pre-existing void undo API; the test now asserts actual stock/yard/save invariants instead, and passed unchanged economic expectations.

The reviewer reported no Critical issue or deferred minor. It declined to judge performance/device evidence, screenshot quality, crowded-town interactions, hidden-tab behavior, packaged smoke, the full suite and final CI. These are not silently waived: performance/normal-clock records and native/legacy tests are retained, and package/full-CI gates remain explicit. Physical-device and other-engine performance are not claimed. The author's final integration validation must confirm the full suite and actual final-head CI after these fixes; a second source review is not substituted for covering tests.
