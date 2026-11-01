# Milestone 4: Living City

Implements issue #5 on `feat/living-city`. This builds on Milestone 2's economy and Milestone 3's protected release pipeline. It adds no new construction menu, building type or independent inventory.

## What changes

- **Measured production:** farm/fishery harvest and the existing 25% logistics bonus, bakery grain consumption, bread production and exports are recorded per building during the actual five-second cycle. The food ledger still conserves one shared reserve, including overflow, consumption and shortage. City Life distinguishes measured flows from forecasts at current staffing.
- **Household accounting:** Keep residents, occupied houses and displaced residents receive proportional shares of that cycle's actual demand, consumed food and shortage. These are accounting shares, not physical delivery carts. The table uses the residents present before migration at the end of the cycle.
- **Building feedback:** selecting the nearest building shows its existing inspector on the battlefield, with staffing, actual production, coverage and next action. Close dismisses it; larger information panels hide it. City Life adds expandable workplace diagnostics, preserving keyboard focus and open rows during updates.
- **Housing and Advisor:** existing occupancy, two-cycle food reserve, local services, 10-second upgrades and 30-second decline are retained. The inspector explains missing requirements. Advisor prioritizes measured shortages, idle workplaces, missing staff, overflow and broken supply bonuses, then housing and unemployment. It stays optional and never claims all tasks are completed.
- **Early balance:** normal/easy difficulty receives 300 seconds before offensive raids; hard receives 180. Later raid intervals are 240/300/120 seconds for normal/easy/hard. Enemy territory still defends itself. Starting resources, building costs, production rates, staffing priorities and all road costs/refunds are unchanged.
- **Small screens:** the toolbar scrolls horizontally beside Menu, keeping Pause accessible. Feedback panels clear the minimap; the bottom command bar fits narrow viewports.

## Verification

From a clean checkout with Node 24:

```sh
npm ci
npm test
```

On a restricted host with an existing Chromium installation:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm test
```

CI uses Playwright 1.57.0's pinned Chromium. The suite retains the original 28 gameplay regressions, 20 release-pipeline guards and five production smoke journeys. New Chromium scenarios cover per-building and household conservation, staffing and broken supply, shortages and gradual decline, selection feedback, the market's exact road range, 390/601/640px layout, five simulated minutes using original starting resources and actual gathering/construction controls, and hard-difficulty raids. Test clocks are injected into served test fixtures only.

Screenshots, uncaught errors, browser version, machine-readable results and failure traces use the existing CI artifact pipeline. The five-minute scenario executes the complete simulation including units and AI; it does not use defensive fortress fixtures, extra starting wealth or disable combat.

## Limits and release

Food remains a shared abstraction: a disconnected farm still harvests; road/depot connections grant the existing bonus. Markets reduce household waste rather than maintaining separate stock. Granary allocations are shares of the shared reserve, not inventories transported between buildings. Long campaigns and balance beyond the tested five-minute opening may need further tuning; no claim of exhaustive campaign balance is made.

The protected release workflows, production smoke, main approval boundaries and rollback archives are unchanged. This branch is a release candidate only. Merge and deployment require owner approval; this milestone does not activate Pages or protection settings.
