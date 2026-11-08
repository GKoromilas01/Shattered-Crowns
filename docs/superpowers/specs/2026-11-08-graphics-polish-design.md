# Graphics polish design

## Intent

Give Shattered Crowns a clearer medieval identity and improve readability during play. The pass follows the requested order: buildings, units, terrain, then atmosphere.

## Goals

- Make every building type recognizable from its silhouette, roofline, footprint, and team color.
- Make workers, soldiers, and archers readable at normal and narrow viewport scales, including selected, moving, gathering, attacking, and damaged states.
- Replace the flat field with layered terrain: ground variation, paths, water edges, vegetation, and restrained construction shadows.
- Add atmosphere through subtle lighting, depth, particles, and environmental motion without obscuring gameplay or reducing performance.

## Non-goals

- No simulation, balance, save-schema, audio, or control changes.
- No new rendering dependency or external asset service.
- No visual effect that hides selection, placement validity, resources, or combat state.

## Approach

Keep the existing single-canvas renderer and build reusable drawing helpers. Start with buildings, then units, terrain, and atmosphere. Use deterministic seeded variation so screenshots and tests remain stable. Reuse existing colors and dimensions as fallbacks, and cap particles and decorative detail for mobile viewports.

## Alternatives considered

- A full sprite and painted-asset system would provide a stronger art direction but adds asset production and loading complexity.
- Atmosphere-first would improve mood quickly but would leave the current buildings and units visually weak.

The targeted canvas polish pass is chosen because it improves the requested areas incrementally while preserving the game’s current architecture and behavior.

## Success criteria

- Existing gameplay and regression tests remain green.
- Buildings and units remain distinguishable at 390px and desktop widths.
- Selection, placement, health, ownership, and combat feedback remain obvious.
- New rendering helpers do not mutate simulation state.
