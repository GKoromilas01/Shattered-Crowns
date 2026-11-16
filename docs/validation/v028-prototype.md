# v0.28 Valewatch prototype validation

Candidate work on `feat/v028-beyond-town-gates`, PR #44, stacked on repaired v0.27 `e7cffe5`. Prototype owner review precedes the Ashford pass. No merge or deployment.

## Focused evidence

- Authoritative frontier/legacy regression: **46/46 passed** (new frontier, envoy, supplier and save suites). Covers fees, both shared-envoy directions, literal cargo terms, independent ledger capacities, actual yard privilege, earned pact/batch thresholds, refusal/reopening, malformed atomic rejection, historical overlaps and legacy loading.
- Native interface plus asset integrity: **8/8 passed**. Every peaceful start exposes survey first; original portrait loads; Later preserves state; manufactured cargo and pact work with native keyboard controls; held Space/Enter/pointer across restore cannot charge another city; controls retain visible focus; 390px layout fits; actual Pause, atlas and hidden tabs suspend travel.
- Original source/runtime art and embedded modules are hash-locked. Mira adds 378,326 compressed / 6,290,064 decoded pixel bytes. Combined runtime packs: **2,859,746 compressed / 37,744,372 decoded bytes**. Compressed ceiling remains 4 MiB; decoded ceiling rises to 48 MiB for the planned two portraits. Decoded pixel accounting is not browser process memory.

The initial interface run failed before implementation. The first integrated run found two test assumptions: Playwright’s option helper contradicted the actual native `disabled` property, and the narrow focus check attempted to focus an unaffordable disabled order. Final assertions inspect native option state, check every control’s geometry and focus every enabled action. Resource requirements remain enforced.

## Resource-funded routes

`tests/frontiers-route.test.cjs` uses actual ordinary-city gathering, paid farm construction and builders for the timber introduction. The complete manufactured→basic→signed pact route uses the unchanged genuinely earned `tests/fixtures-envoy/city-v026-supplier.json`, with no resource/building/population grants. It checks outbound/returning/completed save-and-reload states for every order and preserves old receipts. Existing automatic basket sales and taxes continue, so total gold changes include those legitimate sources; immutable cargo receipts and isolated engine tests establish the exact reward.

These route tests accelerate simulation ticks and are not normal-clock playtesting. `scripts/playtest-v028-normal.cjs` separately serves unmodified production bytes, records the exact source hash and wall/game time, and uses native controls on the genuine earned save. Evidence results and package provenance are added after execution.

## Current limits

Valewatch only; Ashford remains disabled pending the approved prototype review. Full CI is submitted independently and must be reported from its actual final-head result. A locally checked package is not a completed GitHub CI verification artifact. Existing v0.27 failed-run history and the separate baseline repair are recorded in [v0.27 validation](v027-envoy.md).
