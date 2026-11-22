# Slower Frontier Implementation Plan

Goal: three-times-slower real-time simulation and a warned local war loop. Architecture: native frame time conversion, new authoritative src/v060/war-engine.js, thin Keep presentation, strict schema17 integration. Spec: ../specs/2026-11-22-v060-slower-frontier-design.md.

- [ ] Write failing tests for native clock1/3 speed, no early war, warning/grace, real raid orders, attack/defend, victory/no more waves and save/invalid-state atomicity.
- [ ] Implement frame scaling and war engine; integrate init/tick/save/restore and schema17 enemy validation.
- [ ] Add Keep controls/status and current Advisor Tester. Run focused and existing relevant regressions, inspect screenshots, package committed source and update GitHub handoff. Do not claim remote CI verified while pending.

Review focus: no catch-up raids while paused/hidden, imported towns get warning before raids, no weakening old schemas, one-time fortress/spawns, music/story unaffected by slower simulation.
