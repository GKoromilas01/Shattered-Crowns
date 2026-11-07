# M20 implementation handoff — verified source touchpoints

**Status:** source audit and test design, not an implemented feature. Based on the M19 PR #26 source archive at `f87e061d9545cc15b45d66a8002a4cbd36bdade1`; its later documentation-only head is `bcf82880`. Recheck line numbers and APIs after synchronizing with M18.

## Existing integration points

- `index.html` contains the Governor's Hall initializer near line 8467, which acquires `window.scCityEconomy` and `engine.snapshot()` rather than maintaining independent resource counters.
- `scGovernorUI.model()` already reports population, food, treasury, happiness, prosperity and up to three prioritized Advisor issues.
- The economy snapshot exposes `food.stock`, `food.demand`, `food.reserveSeconds`, `food.last` (harvest, logistics, bakery net, exports, overflow, demand and shortfall), `housing.houses`, `housing.capacity`, `workforce`, `buildings`, `growth.readiness` and `prosperity`.
- `scGovernorUI.refresh()` already presents last-cycle food accounting and per-household services. Do not add a second food ledger or falsely label last-cycle values as historical trends.
- `sc19BuildingControls` is an existing inspector extension for farm, fishery, granary, bakery and market. Reuse its open/pause, priority and trade-policy operations; avoid new policy state.
- Lifecycle events `sc-city-started`, `sc-city-restored`, `sc19-context-changed`, `sc-workplace-changed`, `sc-workplace-priority-changed` and `sc-trade-policy-changed` are already used for refresh/cancellation.
- The Governor UI currently refreshes on a 500 ms interval. Any M20 activity cues must be cheap, lifecycle-safe and not introduce a second unbounded per-frame update path.

## Narrow first implementation slice

Extend the existing Governor food-detail display with an optional *explain this cycle* view showing **exactly the existing snapshot fields**, with explicit labels for last-cycle amounts, current stock and current base demand. Link shortage/overflow explanations to existing Food planning and the relevant real producer/storage building when available. No new game rules, economy counters, save fields or resources.

## Test-first acceptance cases

1. With a controlled real snapshot containing food shortfall, the report names unmet demand and offers a reachable Food section; no invented production.
2. With reserves falling and zero current shortfall, last-cycle supply and stock remain distinct, and the report does not claim a forecast.
3. With overflow, display actual overflow and point to existing granary only if a granary exists.
4. After same-city restoration, all visible numbers come from the restored snapshot; no stale prior-city Advisor target or held activation remains.
5. Pause/priority/export actions use existing operations and update snapshot values; the report itself never changes resources.
6. At 390×844 and 1366×606, keyboard navigation, pointer targets, camera isolation and scrolling remain usable.
7. All five origins, schemas 1–4, selection controls and 3×3 roads pass unchanged regression checks.

## Environment / integration gate

The independent review container has Node 22 and no installed locked Playwright/YAML dependencies, so full browser regressions cannot be certified there. CI for M18's latest documentation commit was still in progress at this checkpoint; no confirmed new-head M19 CI was available. Do not treat planning-branch commits as gameplay test evidence. The M19 branch is stacked on M18 and must be synchronized before implementation or merging.

**Release policy:** separate owner approval for each merge and for deployment.
