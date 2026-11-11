# City-management and released Advisor integration

Base: verified PR28 source `69ee4399c2b5039f2992079c8ba5fd7548b3d091`.
Incoming: original PR26 `bcf82880fd12bbb83a78183d2021f03555d8b3ea`.

## Scope

The existing M19 Governor overview, direct workplace panels and extended economic verification merge cleanly with the released measured Advisor and five-origin governor/maps work. The released assessment, priorities and Advisor summary scripts remain byte-identical to PR28. The city-management UI uses existing workplace/trade operations. No rates, prices, jobs, new currency, industry or save-schema change is added.

This candidate remains stacked on unmerged PR28. Original PR25/26/28 branches and production are unchanged. A later approved main integration requires renewed main-base verification; this is not a deployable main candidate.

## Confirmed fixes and tests

Before the merge, the added integration tests reproduced the missing Governor UI and a genuine 1800-simulation-second starvation checkpoint exceeding the existing departure-timer bound. The existing M19 timer clamp fixes the latter without changing population behavior; malformed timers still reject atomically.

After integration, **53/53 focused functional checks passed** across Advisor/Governor/workplace controls and ten thirty-minute baseline/guided routes. Guided routes gather/build at real costs without injecting resources, people or buildings. Save continuation comparisons passed for all five origins.

Visual inspection found the existing global Pause card obscuring enlarged workplace controls at390x844. A new overlap/paint-order test failed before the correction and passed afterward. Only the expanded inspector's layer is raised above the Pause dimmer, below the toolbar and City Life/Advisor dialogs. **6/6 targeted checks passed after that CSS correction**, covering phone/laptop/desktop native controls, actual combined Advisor/workplace behavior, starvation save validity and the overlap reproduction. The six reruns overlap the earlier functional coverage; they are not claimed as additional distinct cases.

Screenshots use actual running Datehaven state after a real production cycle, paused through the UI: docs/screenshots/integration-governor-{390,1440}.png and integration-workplace-{390,1440}.png. No mock statistics or screenshot compositing.

Node24.19.0, Playwright1.57.0, explicit system Chromium154.0.8037.57 locally. Full regression, exact-source package smoke and CI results are recorded in the associated integration PR after completion. Real device/audio preference feedback and exhaustive balancing remain owner playtesting.


## Camera-test integration follow-up

Initial exact-head CI run42423330362 passed352/353 cases; one existing delayed-camera assertion differed by half a pixel in derived centreY (508→507.5), with city state unchanged. Local diagnostics demonstrate that changing viewport height by one pixel changes the captured centre by half a pixel without a scroll command. The test captured its baseline immediately after restore, before the browser could settle the restored layout.

The restored fixture was also Brookstead, which has a separate initial-camera skip and did not actually exercise the city-identity guard. The test now uses a genuine home-origin v0.7 checkpoint, settles two animation frames while the startup callback remains intercepted, captures state/view atomically, and asserts exact equality both immediately after callback invocation and after400ms. Layout/scroll metrics are included on failure. No tolerance or skipped assertion was added. A negative control serving the unchanged game with only the identity guard removed now fails with an80-unit horizontal camera jump; the guarded production game retains the view. This follow-up changes tests/documentation only; game/release bytes remain identical to eecf920.
