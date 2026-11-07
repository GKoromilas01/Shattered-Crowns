# Milestone 19 verification

Planning/implementation base: M18 `2c37c7838cfa7e3dc20e2b7b934a69cddb9d97a0`; its exact-head CI passed 299 cases and five packaged smokes. PR #25 was not modified or merged.

Local targeted evidence: 10 baseline/guided 30-simulation-minute cases passed across all five origins, including economic conservation and checkpoint continuations. Governor initial six cases and building-panel initial ten cases passed; service/prosperity navigation and unmeasured-market copy received additional test-first checks. Native focus/held-Space and camera-hover checks cover 390, 1366 and 1440 widths. A confirmed long-shortage save-timer failure was reproduced and corrected without changing schema or economic rules.

The draft PR reports **333/333 regression cases and 5/5 packaged smoke checks** for candidate head `f87e061d9545cc15b45d66a8002a4cbd36bdade1` in [exact-head CI](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/42366768036). These are the reported candidate-head results, not an independent rerun. Screenshots and exact-source package details are linked in PR #26. Test-only acceleration and instrumentation remain in test utilities; no gameplay setup injects resources, people or buildings for growth acceptance. Node24/Playwright1.57; local Chromium154.0.8037.57, CI lockfile-pinned Chromium143.

Fresh whole-branch review identified held actions surviving same-city restoration and keyboard focus lost during Advisor navigation. Both were reproduced before correction, including Space and pointer holds. Five follow-up regressions passed after lifecycle cancellation, inspector focus handoff and explicit current-base versus measured producer output. UI tests now use the specified heights as well as widths. These fixes reuse existing operations and add no saved state or production rule.

## Independent archive review (2026-11-07)

An independent source-archive inspection checked Governor/workplace controller logic, the departure-timer clamp and the saved-state upper bound. Syntax checks of 123 inline JavaScript blocks were reported passing. The separate Node 22 review environment reported 18 passing pipeline tests and four failures attributable to missing `yaml`; the project requires Node 24 and locked dependencies. Playwright browser regressions were not independently rerun in that environment. These limits neither prove a game defect nor replace the candidate-head CI evidence. Owner Windows audio/visual playtesting remains outstanding.

This documentation-only change creates a new branch head and must pass its own required CI checks before any merge review. No merge or deployment is authorized.
