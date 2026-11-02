# Milestone 5: City Services & Citizen Happiness

Issue #7, built on released Milestone 4 (`3843329a6297f6d40837f6cd8e01e88e246c2ba0`). No new service building, inventory, control or menu is introduced.

## Existing mechanics retained

Wells, healers and markets serve homes strictly within 190 map units. Water needs no staff or road; healers need at least half staffing and consume no material. Markets need at least half staffing, a road group of three or more sections within 135 map units and food in the shared reserve. Baskets remain optional exports, not household requirements. Farms still harvest without a depot; existing logistics, bakery conversion, distribution savings and measured meal delivery remain unchanged.

Housing still upgrades after 10 seconds and declines after 30 seconds of sustained conditions. New residents need a food reserve, water, connected roads and happiness at least 45 for 15 seconds. Occupants stay through service lapses; food shortages/displacement retain their existing departure rules. Prosperity retains its existing bounded progression and happiness contribution. Staffing priorities, costs, Keep residents, roads/refunds, controls and raid grace are preserved.

## What changes

A shared resolver distinguishes absent/out-of-range providers, missing staff, missing market roads and an empty food reserve. It chooses a working provider (then greater staffing quality, then proximity), so a nearby inactive building cannot mask a working service. Full staffing improves the wellbeing quality of healers/markets; half staffing still meets the existing housing/service gate. Selected homes/providers, City Life and Advisor expose these same facts. The selected market map uses the same 190-unit reach and identifies empty reserves separately from missing staff/roads. Legacy Advisor, Chronicle/theater and emergency-ration descriptions now use the target model instead of advertising removed per-cycle bonuses. Geometric coverage is shown separately from currently supplied homes and last-cycle food consumption.

The old stack of automatic happiness bonuses is replaced with one explained satisfaction target:

| Factor | Maximum |
| --- | ---: |
| Settlement foundation | 5 |
| Food | 35 |
| Water | 25 |
| Healthcare | 10 |
| Market access | 10 |
| Employment | 10 |
| Amenities & culture | 5 |

Food uses 80% measured last-cycle fulfillment and 20% two-cycle reserve. Water, healthcare and market access weight actual residents and provider staffing quality. The first eight Keep residents have basic services; vacant capacity contributes no citizens, and displaced residents lack local services. Employment uses assigned civilian workers, not recruited map units. Amenities reuse occupied-home beauty, nearby theaters and existing road-connected civic/beauty care, capped at five points.

Existing conservation/generous meals apply −2/+1.5 to the target. Target and actual happiness remain in 0–100; automatic updates approach the target by at most two points every five seconds. Paid feasts/festivals retain their explicit immediate bonuses and costs. Current target/factors and the measured last satisfaction transition are distinguished in the snapshot and City Life. Displayed factor values are rounded before summing, keeping the table consistent. The existing fixed tax-income formula still uses happiness; no new tax policy or dissatisfaction penalty is invented from the separate political demo.

## Tests and evidence

Clean Node 24 checkout:

```sh
npm ci
npm test
npm run build:site
npm run verify:site
SMOKE_DIR=dist EXPECTED_RELEASE_SHA=$(git rev-parse HEAD) npm run test:smoke
```

Pinned Playwright 1.57.0 Chromium is installed by the runner. Linux hosts require `npx playwright install-deps chromium`. Restricted hosts can use `CHROMIUM_PATH=/usr/bin/chromium`; the actual browser version is recorded. All pre-existing 67 checks remain. New tests cover service distance, staffing/road/food blockers, provider fallback, factor conservation/bounds, migration gating, housing decline/recovery, vacant homes, ration/events, pause/reset, Advisor and keyboard/mobile feedback.

The complete 300.1-second service scenario runs full unit/AI simulation: supplied population 14, happiness 80.1; induced water loss holds population 14, lowers happiness to 68.2 and housing to Cottage; restoring water yields population 24, happiness 73.4, upgraded homes and 79 food. Fixtures isolate service behavior; the untouched Milestone 4 test separately builds a five-minute opening through real gathering/construction from original starting resources. Both are mandatory regressions.

Existing CI saves screenshots, uncaught errors, environment versions, JUnit/JSON reports and failure traces. Representative images and the three recovery snapshots are in `test-results/gallery/m5-*` in CI evidence. The PR links the verified run and artifacts.

Feature-branch pushes run the existing read-only CI, allowing a green full/package/live result before a PR opens. Release-candidate validation still rejects feature branches; approved main-only release workflows, environment gates, provenance and rollback are unchanged. No deployment or production setting is changed by this milestone.

## Remaining limits

Services and food remain local/shared abstractions, not physical delivery carts or a disease simulation. The Keep provides basic services to its original residents; outlying occupied homes need actual providers. Automatic happiness changes are bounded; paid events remain explicit exceptions. Longer campaigns and real touch hardware may need further balance/usability evaluation beyond the automated opening and viewport checks. Giannis must approve merge and deployment separately from these tests.
