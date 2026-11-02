# City Services & Citizen Happiness

Issue #7, based on released main `3843329a6297f6d40837f6cd8e01e88e246c2ba0`. Giannis has authorized independent implementation, testing and a PR; merge, deployment and production settings remain outside scope.

## Approach

Extend the existing engine and existing City Life/selected-building surfaces. A second simulation/inventory would conflict with measured food flows; a visual-only dashboard would leave happiness opaque. The chosen approach is one shared service resolver, used by housing eligibility, diagnostics and satisfaction. No new menu, service building, material requirement or tax policy.

## Services

Preserve strict existing ranges: wells/healers/markets reach homes within 190 map units. Wells need no civilian staff, materials or roads for water. Healers need at least half staffing and no consumed material. Markets need at least half staffing, a serviced road group within 135 map units and food in the shared reserve; baskets remain optional exports. Roads near wells/healers retain their optional civic benefit rather than becoming a new service gate. Expose absent/out-of-range, unstaffed, disconnected and empty-reserve states separately, selecting any working in-range provider rather than letting a nearer broken provider mask it.

## Satisfaction

Keep the single existing happiness value (0–100), initial 70. Replace stacked automatic additions with a measured target approached by at most 2 points per five-second cycle. Factors total 100: settlement foundation 5, food 35, water 25, healthcare 10, market access 10, employment 10, neighborhood amenity/culture 5. Food uses 80% last-cycle fulfillment and 20% two-cycle reserve. Water/health/market reflect actual residents (not vacant capacity); the first eight Keep residents have basic services, displaced residents do not. Amenities reuse gardens/plazas and existing theaters. Employment uses assigned civilian jobs, not map workers. Existing ration mood (-2/+1.5) is an explicit target modifier, with UI copy updated accordingly. Existing paid feast/festival changes stay explicit, bounded player actions.

Expose current factors/target separately from the measured last cycle (opening, applied target, closing, delta). Preserve happiness 45 for immigration, 15 seconds per immigrant, two-cycle food reserve, 10-second upgrades, 30-second downgrade and existing departures for shortage/displacement. Service loss pauses growth/risks housing; restoration recovers gradually. Prosperity retains its existing happiness contribution and bounded progression. Settlement tax income remains unchanged; the separate political demonstration is not a tax policy for this simulation.

## Feedback and verification

Add a compact service-status line to existing house details and inspection, service reach/staff/food diagnostics to providers, a satisfaction explanation/table in City Life and prioritized optional Advisor warnings. Preserve focus/open details and minimap/mobile separation. Show current reach separately from measured food delivery. Keep all 67 regressions and all deployment guards. New Chromium tests cover exact range boundaries, multiple-provider fallback, staff/road/food interruptions, bounded factor arithmetic, policy/events, migration/occupancy response, recovery, pause/reset and narrow feedback. Run at least 300 seconds including an induced shortage and recovery with full simulation/AI. Existing starting-resource M4 scenario remains mandatory.

Branch CI must succeed before PR creation. Connected GitHub tools do not expose workflow dispatch; use existing read-only verification on feature-branch pushes, retaining every release gate and permission. No production publish/settings changes. Record evidence and remaining abstraction/long-campaign balance risks in the PR.
