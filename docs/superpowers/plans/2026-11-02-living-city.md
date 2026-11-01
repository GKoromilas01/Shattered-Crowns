# Milestone 4: Living City

Issue #5 extends the existing five-second economy rather than introducing parallel inventories. Keep base costs, staffing priorities, housing timings, aggregate food arithmetic, roads, controls and release safeguards unchanged.

1. Add measured per-cycle producer harvest/logistics, bakery inputs/output/exports, and resident delivery shares. Retain the shared reserve and explicitly distinguish forecasts from last-cycle measurements.
2. Derive building inspections from that same state: staffing, connections, coverage, housing blockers and the next useful action. Reuse the existing inspector and City Life surface. Advisor prioritizes shortages, idle workplaces and missing supply links, without claiming everything is complete.
3. Allow a five-minute normal/easy settlement grace before offensive raids; retain hard difficulty and subsequent combat. Do not change construction costs or road mechanics.
4. Add Chromium coverage of conservation, staffing, supply interruptions, selection feedback, Advisor, narrow layouts and five minutes of city simulation. Keep the original regressions and pipeline guards. Run the whole suite, review changes, build and verify the immutable site, push the development branch and open a PR. Wait for required CI; never merge or deploy.

Validation includes an unmodified-resource early settlement scenario using real gathering/build controls, deterministic test-only clock advancement, plus isolated supplied-city fixtures for edge cases. Test adapters are injected by tests and never shipped.
