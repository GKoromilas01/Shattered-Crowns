# First Winter Implementation Plan

> Implement sequentially with superpowers:executing-plans; owner already requested execution.

Goal: Optional saved24-minute readiness scenario inside existing Keep.
Architecture: Pure scenario rules plus small native-state adapter, native save integration, registered Keep menu. No new dependencies/media.
Spec: ../specs/2026-11-28-first-winter-design.md

Constraints: branch from main; no self-merge/deploy; reuse painted assets; keep building actions inside inspector; preserve1–17 saves; desktop first.
Review focus: unaffordable/repeated actions, paused/background time, malformed imports, city replacement/stale buttons, changing readiness after failed assessment.

- [x] Add pure rules in src/v068/first-winter-rules.js and tests/first-winter-rules.test.cjs; verify event order, exact costs, one-shot choices, thresholds, failure recovery and bounded validation (red then green).
- [x] Add native adapter in src/v068/first-winter-engine.js; embed before save; schema18 optional charter and nullable war, initialization/restore; tests/first-winter.test.cjs cover roundtrip, atomic rejection and old fixtures.
- [x] Add Keep registration src/v068/presentation.js; live readiness/countdown, explicit Start/assess, guarded decisions, gathering/employment links, Tester guide; exercise real desktop buttons and city replacement.
- [x] Rebuild both embedding scripts and check; run targeted gameplay/save regressions and packaging smoke. Record exact evidence/limits and PR in milestone/handoff. Push topic only; wait for remoteCI. Owner/Claude owns integration and approved release/hub update.
