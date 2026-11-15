# v0.27 envoy validation history

Feature candidate; production remains v0.26. This file preserves implementation methods and initial validation history. Final-head results, normal-clock measurements and the verified playable package are maintained in [PR #43](https://github.com/GKoromilas01/Shattered-Crowns/pull/43). No merge/deployment approval is inferred.

## Methods and failures retained

- The first seven real-engine tests failed against the absent API, then passed with authoritative state and shared cargo. Existing supplier/caravan/save integration was 40/41: a genuine post-trade schema-9 fixture had been placed among historical no-regional-progress fixtures. It was moved into `tests/fixtures-envoy`; the unchanged legacy test then passed. No historical expectation was weakened.
- Initial native UI run: 4/8. Legacy trade-panel keyboard capture intercepted the new controls; its exclusion now delegates to the envoy epoch guard. Native hidden tabs previously advanced city time; the frame guard now freezes the simulation while hidden. Focused held-input/hidden recheck: 4/4.
- Combined art/engine/UI run: 16/17. Atlas status first exposed only an action-unavailable reason instead of the visit phase; it now explicitly states the unvisited phase. Final atlas recheck: 1/1. Other engine, capacity, UI and asset checks passed in that combined run.
- Initial funded run: 2/3, including the full timber charter route and unchanged original supplier route. Provisions failed in test navigation: the helper toggled an already open City Life panel closed before clicking its trade action. Corrected visibility-aware native navigation; a funded recheck is required.
- Independent fresh-context whole-branch review examined state validation, transactions, UI guards and exact embedding. It found an in-flight final-history-slot payment edge and a hidden post-decision focus destination. Both were regraded Important: their new regression tests failed, then passed after the fixes. The complete focused engine/UI/art suite passed 18/18. Pipeline unit checks passed 22/22. Browser scheduling, visual/performance judgments, full CI and package readiness were explicitly left to runtime evidence.

## Evidence distinctions

`tests/envoy.test.cjs` and UI tests use controlled town fixtures for boundary coverage. `tests/envoy-route.test.cjs` starts from a new town, gathers resources and pays for construction, workshops and the yard, completes existing agreements, then pays for the visit and consumes actual charter cargo. Its simulation time is accelerated explicitly; no resource/population/building grants count as funded proof.

`scripts/playtest-v027-normal.cjs` serves the production index unchanged and loads the genuine earned v0.26 supplier save. It uses native controls and normal browser time, with no tick adapter, fake clock or grants. Its output records wall time separately from game time. Treasury totals include normal tax and basket sales, so the charter reward is verified from the actual shipment record rather than attributing all gold growth to it.

The reference local environment is Node 24, Playwright 1.57.0 and explicitly selected system Chromium 154 on Linux. It is not the lockfile-pinned CI browser. Final CI must run the complete suite and package smoke on the immutable final head before readiness is claimed.

## Captured interface

These are actual native UI captures from controlled late-supplier fixtures, not claims that those test towns were resource-funded. Final CI evidence includes fresh final-head captures and separate funded route outputs.

![Envoy travelling in Neighbour trade](v027/visit-travelling.png)
![Ironmere visit in the native atlas](v027/ironmere-visit.png)
![Native audience at 390px width](v027/audience-390.png)
