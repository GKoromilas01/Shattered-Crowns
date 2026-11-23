# Working Fleet Implementation Plan

Goal: useful typed fleet orders and cinematic fades. Architecture: authoritative harbour missions, ledger-based catch unloading, strict schema15 migration; presentation adds actions without media edits. Stack: existing browser JavaScript/Playwright. Spec: ../specs/2026-11-22-v058-working-fleet-design.md.

- [x] Add failing real-state mission tests: fish delivery, trade escrow/recall/payout, guard/attack real hostile damage, kind guards and save validation.
- [x] Implement mission state, movement, unloading, resource effects and migration in src/v056/harbour-engine.js; integrate unload after producer harvest capture in index.html.
- [x] Add Fleet actions/status, update current Advisor Tester and release metadata. Test fades over actual playback/hidden-tab pause and cancellation in src/v050/intro.js.
- [ ] Run relevant naval/economy/opening tests, embed checks and packaged smoke; document limits and screenshots; commit and push candidate, no merge/deployment.

Review focus: recall cannot duplicate cargo; no reward before return; lost home and invalid saves remain safe; only hostile coastal targets are damaged; background narrative clocks remain paused. Each is covered by mission/opening tests or recorded manual checks.

Implementation and fresh review completed. Review fixes and relevant browser/ledger/save checks recorded in docs/validation/v058-working-fleet.md. Package smoke and exact-head CI are recorded after committing the candidate.
