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

Pipeline unit checks: **22/22 passed**. Packaged smoke also checks native Valewatch survey payment, schema-11 persistence and reload when the prototype API is present; the older production game skips this new chapter check.

Normal-clock evidence on game source `f28eecd` (`index.html` SHA-256 `cb7747e06ddb1dec0263d31a456a9144ace1b0a4f51dfe44c145bdc9e7e3912d`): **60.263 wall / 60.081 game seconds** for the survey, then **120.693 wall / 120.062 game seconds** for manufactured cargo. One 12-plank deduction and one 60-gold return receipt; trust 2; prior supplier history unchanged; zero page errors. Node 24.19.0, Chromium 154.0.8037.57, Linux. Later keyboard-only shielding repair does not alter travel/economics; final packaged smoke covers the updated game bytes.

Fresh whole-branch review found one Important keyboard issue: Space on new disclosures/select leaked to the global Pause shortcut. A focused native regression reproduced it before the fix. One Minor is deferred: old supplier/charter buttons do not yet display the shared Valewatch cargo lock, although authoritative dispatch correctly rejects overlap without spending. No Critical or further Important issues were found. Visual quality and pacing remain part of owner prototype review, rather than reviewer claims.

## Reference rendering measurements

[Raw measurements](v028-prototype-evidence/performance.json), matched state/camera/zoom before/after against repaired v0.27. Synthetic scene fixtures, separate from funded and normal-clock play. Headless Chromium154.0.8037.57/Playwright1.57, Node24.19, Linux6.18.57, Xeon8573C/3 logical CPUs, SwiftShader,1440×1000/DPR1/reduced motion; zero page errors. Single reference run, not a claim about the owner’s GPU/device.

| Scene | v0.27 fps | Prototype fps | Frame p50 / p95 / p99 ms | Draw CPU p95 ms | JS heap used |
| --- | ---: | ---: | --- | ---: | ---: |
| Opening | 58.46 | 58.62 | 16.7 / 16.8 / 33.4 | 2.0 | 20.9 MB |
| Developed | 59.54 | 59.23 | 16.7 / 16.7 / 33.3 | 1.4 | 25.0 MB |
| Stress:222 buildings,248 deposits,120 units | 33.01 | 37.85 | 33.2 / 33.4 / 66.7 | 5.0 | 34.9 MB |

Ordinary scenes are near the 60fps target, not a strict measured60fps pass. Stress exceeds the30fps mean target but includes long-tail frames. Renderer cache accounting remains18.3–18.4MB. JS heap excludes decoded image/GPU/process memory; the separate37.7MB decoded asset figure must not be added as a measured total. Opening/developed comparison hashes match exactly across versions, as do camera and zoom. No new city render pass is introduced. Final budgets remain subject to owner prototype review.

[Normal-clock record](v028-prototype-evidence/normal-clock.json) · [Funded method](v028-prototype-evidence/funded-method.json) · [Earned pact save](v028-prototype-evidence/earned-pact-save.json) · [Ordinary introduction save](v028-prototype-evidence/ordinary-introduction-save.json).

## Playing the sample

1. Download the feature-branch source ZIP (or the locally verified three-file playable package supplied with the handoff), extract it, and open `index.html` in Chrome. The corner badge must show **V0.28.0**. Production still shows its separately deployed version.
2. Open **City Life → Diplomacy & Neighbour trade**. The Valewatch survey is the first chapter. Pay10gold, close panels and Resume for60running seconds, then review Mira’s two offers.
3. Gather40wood for the aid route, or use a staffed Carpenters’ Workshop to produce12planks. Cargo returns after120running seconds. Subsequent orders need a real loading yard and eligible Market; trust3 unlocks signing the improved pact.
4. For a shorter late-town review, download the existing [earned v0.26 town](../../tests/fixtures-envoy/city-v026-supplier.json), then use **Menu → Import save** in this prototype. This supplies the genuine earlier playtest town with a completed yard and produced planks; it does not pre-award Valewatch discoveries/trust. Follow manufactured introduction→basic order→sign pact→pact order. Pause/Resume as needed; the atlas intentionally freezes travel.
5. Review the original portrait, visible route discovery, choices and better-paying pact. Send feedback before Ashford expansion. No merge/deployment is included in this review.

Screenshots: [Mira’s offers](../screenshots/v028-prototype/mira-offers.png) · [Earned pact](../screenshots/v028-prototype/earned-pact.png) · [Survey atlas](../screenshots/v028-prototype/survey-atlas.png) · [Discovered route](../screenshots/v028-prototype/surveyed-atlas.png) · [390px offers](../screenshots/v028-prototype/offers-390.png).

Matched city comparisons: [opening before](../screenshots/v028-prototype/opening-before.png) / [after](../screenshots/v028-prototype/opening-after.png), [developed before](../screenshots/v028-prototype/developed-before.png) / [after](../screenshots/v028-prototype/developed-after.png). City artwork/footprints retain v0.27 behavior; the new original partner art and route knowledge are in the existing diplomacy/atlas surfaces.

Package launch verification uses HTTP, matching the deployed-site model. A separate direct-file launch attempt was blocked by this environment’s managed Chromium policy (`ERR_BLOCKED_BY_ADMINISTRATOR` for `file://`), before the game loaded. Direct-file launch is therefore not verified here. If a managed browser blocks opening the extracted `index.html`, serve its extracted folder with a local HTTP server (for example `python -m http.server 8000` where Python is installed), then visit `http://localhost:8000`. No browser-policy change is needed.

## Final local checks and CI handoff

Final combined relevant regression: **87/87 passed** on the keyboard-fixed game bytes (`b2f66eb`), covering frontier/native/funded routes, existing envoy/native/legacy suppliers, saves, asset integrity and release pipeline. [Full focused log](v028-prototype-evidence/focused-tests.txt). Exact committed three-file package (`index.html`, `release.json`, `release-manifest.json`) built and verified; **6/6 packaged smoke passed**, including Valewatch fee/schema11 real reload. [Smoke log](v028-prototype-evidence/packaged-smoke.txt). Package index SHA-256: `e643b7cf866953c789a9ae35b91bae1454b2b4ebb4ce6f05710314671a698dfd`. Remaining changes add documentation/evidence only.

Full GitHub CI is triggered by the final feature push and runs independently. **Its final result has not been observed and is not claimed green.** The local package has verification runID0, distinguishing it from a CI `verified-site` artifact. This is an owner prototype-review handoff, not merge/release approval. Preserve the feature worktree for feedback; production remains unchanged.
