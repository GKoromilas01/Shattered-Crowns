# v0.23 First Charter — verification record

Base: released main 99aeb738f2ede95d46fb33350845bd9d29a0b3c2. Feature branch: feat/v023-first-charter. No merge or deployment authorized. This record distinguishes controlled engine fixtures, resource-funded routes and final-head verification.

## Scope and baseline
The owner approved one optional Brookstead chapter, existing rates/costs, one granary/garden investment and saved Chronicle outcome. Main's already verified 418/418 exact-head CI is a baseline only, not verification of this feature. See the approved design and Milestone 23.

## Red/green evidence
- The original new controller test failed because scFirstCharter did not exist. The controller/schema cases then passed 5/5, covering non-enrollment, measured cycles, both outcomes, unfinished projects, corruption rejection and legacy checkpoints.
- Native title test failed because the chapter checkbox did not exist. Added the opt-in and existing-panel presentation.
- Keyboard choice tests caught Space reaching legacy Pause/pan handlers; scoped capture isolation fixed this and 3/3 UI tests passed.
- Independent read-only review caught repeated Enter after restore consuming the stale epoch guard. A native browser reproduction failed (garden chosen instead of null). Added release-aware activation protection and coverage for repeated and mixed input. The mixed pointer-release reproduction also failed before correction; activation tokens now retain input kind until matching release. Native Space/Enter and mixed-input checks passed after correction.

## Resource-funded routes
Both routes use actual gathering workers, normal-cost native placement and real construction work. Only simulation time is accelerated by test utilities; these are not claims of first-time human play duration. No grants, injected people/buildings, free completions or imported developed-city fixtures are used before completion. Checkpoint restore occurs after completion to verify persistence.

Initial route evidence before final keyboard refinement:

| Branch | Outcome at game second | Population / food | Spent wood / stone / gold | Earned wood / stone / gold |
|---|---:|---|---|---|
| Granary | 225.2 | 23 / 96 | 245 / 106 / 55 | 168.75 / 161.25 / 406 |
| Garden | 210.2 | 22 / 80 | 195 / 71 / 70 | 168.75 / 161.25 / 369 |

All recorded food cycles had zero shortfall and conserved the food ledger. Reports collect cycles from gathering, construction and waiting, including intervals omitted by the older balance helper's historical reports. Outcome, project identity and schema-six restore were asserted. Exact final-head reports/smoke remain a separate gate. Screenshots and detailed machine-readable route reports are retained as test artifacts.

## Review and limitations
Review covers engine/schema/UI/test differences against main. No rate, cost, additional origin, caravan, diplomacy or mobile expansion was added. The remaining paused overlay appearance and existing panels are inherited; no physical-device or Windows listening claim is made. Schema 6 is intentionally not readable by pre-v0.23 clients; schemas 1–5 still load unenrolled.

## Final candidate verification
Combined focused run: **13/13 passed**, zero failures/skips. Additional actual-reload and cancelled/distant-project cases: **2/2 passed**; the reload case overlaps the combined run, so these cover 14 distinct new tests. Native UI suite independently passed **5/5** after the input correction. Pipeline unit tests passed **22/22**; all 130 inline scripts parse; git diff --check passes.

Independent reviewer verified the final input-token fix read-only and found no remaining concrete Important issue; reviewer did not run the broad browser suite. A complete full local regression, immutable-source package validation, packaged smoke and pinned-browser CI remain separate final gates. Do not treat selective runs as a clean full-suite result. Every observed failure must be reported, including setup timeouts.
