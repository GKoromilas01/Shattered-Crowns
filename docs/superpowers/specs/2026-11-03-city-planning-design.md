# Milestone 8 — City planning and economy clarity

Build on verified Milestone 7 without changing simulation balance. Giannis delegated independent development, so the implementation choices below are Atlas's decisions within that scope.

## Approach

Use the existing City Life panel and authoritative city snapshot. A new economy simulation would risk save/balance compatibility; a renderer replacement would exceed this focused milestone. Extend the current green/cream/gold UI with consistent summary cards, section navigation and building-location actions. No dependencies, paid assets or network services.

## Behavior

- Put food, housing, employment and service coverage summaries before the detailed ledger. Label measured food balance as last-cycle net production minus demand, before storage overflow. Before the first cycle, show a waiting state rather than claiming measured production. Show shortages and overflow separately.
- Count water, healthcare and market readiness for all built homes, with explicit denominators. Housing capacity does not imply service-ready vacancies. Keep the engine's exact growth explanation visible.
- Add keyboard-accessible navigation to existing food, housing, employment and satisfaction sections. Keep navigation focus and expanded building details through live refresh.
- Add Locate buttons to house and workplace details. Resolve the current living, owned building by ID at activation, center at current zoom, close City Life, and retain Pause, selected units and armed construction. Stale targets leave the panel open with a status message. Location is navigation only, never placement or spending.
- Correct any reproducible M7 bug with a failing test first. Preserve approved ambient composition/mixing and all save formats/backup behavior.

## Constraints and acceptance

Preserve roads, existing controls, peaceful default and classic mode, economy arithmetic, save compatibility and release gates. No merge/deploy/spend. Validate at 390, 768 and 1440 pixels, keyboard navigation/live refresh, zero/deficit/surplus/overflow cycles, locate at non-default zoom, stale building IDs and unchanged game state. Run full automated suite and packaged smoke; create an open PR only after verification. Art assets, balance redesign, trade, AI and refined selection audio remain future milestones.
